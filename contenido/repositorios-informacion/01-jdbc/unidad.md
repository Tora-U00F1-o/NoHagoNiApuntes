---
id: transacciones
asignatura: Repositorios de Información
unidad: 2
titulo: Transacciones
orden: 2
resumen: ACID, serialización, anomalías, control de concurrencia, aislamiento y JDBC.
fuente: Transacciones_original.pdf
---

# Transacciones

Una transacción agrupa operaciones que deben tratarse como una unidad lógica. Este tema explica por qué hacen falta frente a fallos y acceso concurrente, cómo reconocer una planificación correcta, qué anomalías pueden aparecer y cómo gestionar el aislamiento y la confirmación desde JDBC.

Los apuntes siguen las 55 diapositivas de *Transacciones* (Escuela de Ingeniería Informática, curso 2026–2027). El material indica que está adaptado principalmente del curso CS145 de Christopher Ré en Stanford. Los ejemplos de Java añadidos aquí están señalados como didácticos; los ejercicios, valores y tablas del PDF se distinguen de ellos. [Abrir las diapositivas originales](Transacciones_original.pdf).

::: cifras
4 | propiedades ACID
3 | fases del esquema optimista
4 | niveles de aislamiento
55 | diapositivas de origen
:::

## Por qué hacen falta transacciones {#introduccion}

### Memoria, disco y fallos

El SGBD combina **memoria principal**, de acceso rápido pero limitada y volátil, con **disco**, de mayor capacidad y persistente pero más lento. El material distingue memoria **local** (privada de cada proceso), **global o compartida** (accesible por varios procesos), **disco** (al que pueden volcarse datos desde memoria) y **log**. Que un cambio exista en memoria no implica por sí mismo que haya sobrevivido a una caída. Estas ideas motivan el uso de mecanismos para recuperar un estado correcto tras un fallo. [Diapositivas 5–6](Transacciones_original.pdf#page=5).

En una transferencia entre cuentas o un pago de intereses se exige: resistir fallos de hardware o del sistema, conservar la consistencia de los datos y garantizar que, una vez confirmada la operación, el resultado perdure. No sirve cargar una cuenta y fallar antes de abonar la otra. [Diapositiva 7](Transacciones_original.pdf#page=7).

### Definición y ciclo de vida

Una **transacción** (*txn*) es una secuencia de una o más operaciones SQL que se ejecutan como **una unidad lógica de trabajo**. El esquema del tema sitúa un inicio implícito al establecer una conexión o al terminar la transacción anterior. `COMMIT` hace permanentes los cambios y da paso a una transacción nueva; `ROLLBACK` descarta los cambios pendientes y también da paso a la siguiente. El cierre de la conexión y los fallos terminan la transacción en curso; **no debe suponerse que cerrar equivalga a confirmar**. En JDBC, el modo `autoCommit` cambia cómo se delimitan estas unidades. [Diapositivas 8–9 y 52](Transacciones_original.pdf#page=8).

| Estado del esquema | Qué significa | Salida |
| --- | --- | --- |
| Activa | Se ejecutan lecturas y escrituras. | Puede llegar a parcialmente confirmada o fallar. |
| Parcialmente confirmada | Terminó el trabajo, pero aún no se garantiza el estado permanente. | Confirmada si se consolida; fallida si ocurre un error. |
| Confirmada | Sus efectos quedan permanentes. | Termina la transacción. |
| Fallida | No puede completarse correctamente. | Se deshacen sus cambios. |
| Abortada | El rollback ha dejado atrás los cambios pendientes. | Termina la transacción. |

El [diagrama de ciclo de vida de la diapositiva 9](Transacciones_original.pdf#page=9) muestra las transiciones **inicio → activa → parcialmente confirmada → confirmada → fin** y el camino de fallo **activa/parcialmente confirmada → fallida → abortada → fin**.

## Propiedades ACID {#acid}

**ACID** reúne cuatro propiedades esperadas: **atomicidad, consistencia, aislamiento y durabilidad**. Son propiedades diferentes: una se refiere al «todo o nada» de una transacción; otra, a las reglas de validez; otra, a los efectos de la concurrencia; la última, a sobrevivir a fallos tras confirmar. [Diapositivas 11–15](Transacciones_original.pdf#page=11).

| Propiedad | Idea central | Pregunta para comprobarla |
| --- | --- | --- |
| Atomicidad | Todas las operaciones se completan o no queda ninguna. | ¿Puede confirmarse solo la mitad de una transferencia? |
| Consistencia | La transacción lleva la base de un estado válido a otro válido. | ¿Se mantienen las restricciones y reglas de negocio? |
| Aislamiento | La concurrencia no debe producir un resultado incorrecto. | ¿Qué observa otra transacción antes y después de `COMMIT`? |
| Durabilidad | Lo confirmado perdura incluso tras una caída posterior. | ¿Se conserva un cambio ya confirmado al reiniciar? |

### Atomicidad

Si la transacción falla, el estado final debe ser como si ninguna de sus operaciones se hubiera ejecutado. Si termina correctamente, deben completarse todas. En la figura del PDF, T1 ya hizo `COMMIT`, mientras T2 escribió pero todavía no confirmó cuando ocurre una caída: el sistema debe **deshacer T2**, no T1. [Diapositiva 12](Transacciones_original.pdf#page=12).

### Consistencia

El SGBD puede imponer restricciones como **número de cuenta único** o **saldo no negativo**. La aplicación aporta reglas de negocio que la base no puede imponer directamente, por ejemplo que una transferencia no cree ni destruya dinero. Durante el trabajo de una transacción pueden existir estados intermedios que no cumplan la regla global; al confirmar debe llegarse a un estado válido. [Diapositiva 13](Transacciones_original.pdf#page=13).

### Aislamiento

Varias transacciones pueden entrelazarse sin que el efecto final sea incorrecto: idealmente debe equivaler a ejecutar alguna secuencia válida de ellas una detrás de otra. El material enuncia que los cambios de una transacción no son visibles para otra hasta `COMMIT`; más adelante estudia **Read Uncommitted**, nivel que sí permite lecturas de datos no confirmados. Por eso hay que interpretar la visibilidad según el **nivel de aislamiento** aplicado. [Diapositivas 14 y 48](Transacciones_original.pdf#page=14).

### Durabilidad

Una vez que una transacción hace `COMMIT`, sus efectos deben mantenerse aunque después falle el sistema. Los cambios todavía en curso no tienen esa garantía; si la transacción falla se restaura un estado consistente. El tema diferencia así la confirmación de una operación que solo ha avanzado parcialmente. [Diapositiva 15](Transacciones_original.pdf#page=15).

::: pregunta Si T2 escribió antes de una caída, pero no hizo COMMIT, ¿qué exige la atomicidad?
Deshacer sus efectos: el estado final debe ser como si T2 no se hubiera ejecutado. Una transacción que sí confirmó antes de la caída debe mantener sus efectos por durabilidad.
:::

## Operaciones y planificaciones {#planificaciones}

### Modelar SQL como lecturas y escrituras

Para estudiar concurrencia, representamos una operación como **Rᵢ(X)** (la transacción *i* lee el objeto X) o **Wᵢ(X)** (lo escribe). Por ejemplo, T1 puede ejecutar `R(V), R(Y), W(V), W(C)`. La correspondencia didáctica de la diapositiva 17 es:

| SQL | Lecturas y escrituras implícitas |
| --- | --- |
| `SELECT X FROM ...` | `R(X)` |
| `INSERT INTO tabla (X) VALUES (...)` | `W(X)`: crea un registro. |
| `UPDATE tabla SET X = ... WHERE ...` | `R(X), W(X)`: localiza y actualiza. |
| `DELETE FROM tabla WHERE ...` | `R(X), W(X)`: localiza y elimina. |

Una **planificación** (*schedule*) intercala las operaciones de varias transacciones. Puede alternar T1 y T2, pero **debe respetar el orden interno** de las operaciones de cada una. [Diapositiva 18](Transacciones_original.pdf#page=18).

### Serie, serializable y equivalente

Una planificación **serie** ejecuta todas las operaciones de una transacción antes de comenzar la siguiente. Una planificación **serializable** puede intercalarlas, pero tiene el mismo efecto que alguna planificación serie. Permitir entrelazado correcto mejora el aprovechamiento de los recursos respecto a ejecutar siempre todo en serie. Un entrelazado que deja un resultado no equivalente a ninguna ejecución serie es incorrecto para el criterio expuesto en el tema. [Diapositivas 19–21](Transacciones_original.pdf#page=19).

El ejemplo de las diapositivas usa dos transacciones sobre cuentas: **T1** transfiere 100 de B a A (`A += 100`, `B -= 100`) y **T2** aplica un 6 % de interés a ambas (`A *= 1,06`, `B *= 1,06`). Si T1 termina antes que T2, el interés se calcula tras transferir; si T2 termina antes, el interés precede a la transferencia. Ambos órdenes serie son válidos, pero pueden dar resultados diferentes. En una planificación serializable cada operación observa valores compatibles con **uno** de esos órdenes, aunque las instrucciones se hayan intercalado. [Diagramas 20–22](Transacciones_original.pdf#page=20).

| Grupo de planificaciones del PDF | Clasificación | Equivalencia |
| --- | --- | --- |
| S1 y S2 | Serie | T1→T2 y T2→T1, respectivamente. |
| S3 y S4 | Serializables, con operaciones intercaladas | S3 equivale a S1; S4 equivale a S2. |
| S5 y S6 | No serializables | No equivalen a los órdenes serie mostrados. |

### Grafo de precedencia

El **grafo de precedencia** tiene una transacción por nodo y una arista **Tᵢ → Tⱼ** cuando una operación de Tᵢ aparece antes que una operación conflictiva de Tⱼ. Dos operaciones entran en conflicto si son de **transacciones distintas**, acceden al **mismo objeto** y **al menos una es una escritura**. Por tanto, `R₁(X)` y `R₂(X)` no conflictúan; `R₁(X)` y `W₂(X)`, sí. [Diapositiva 23](Transacciones_original.pdf#page=23).

| Operación de T1 | Operación de T2 sobre X | ¿Conflicto? |
| --- | --- | --- |
| `R₁(X)` | `R₂(X)` | No: son dos lecturas. |
| `R₁(X)` | `W₂(X)` | Sí. |
| `W₁(X)` | `R₂(X)` | Sí. |
| `W₁(X)` | `W₂(X)` | Sí. |

**Procedimiento:** escribe la secuencia global, localiza pares conflictivos, dibuja una arista desde el que ocurre primero hacia el que ocurre después y comprueba si hay un ciclo. Un grafo **sin ciclos** permite ordenar las transacciones topológicamente y demuestra que la planificación es *serializable por conflictos*. Un grafo **con ciclos** no lo es. La diapositiva 24 lo expresa abreviadamente como «serializable si no hay ciclos», y su imagen usa explícitamente *conflict serializable*: no hay que confundir este criterio con todas las nociones posibles de equivalencia. [Diapositiva 24](Transacciones_original.pdf#page=24).

::: practica Ejercicio de las dos planificaciones (diapositiva 25)
La diapositiva compara:

| Paso | Planificación 1 | Planificación 2 |
| --- | --- | --- |
| 1 | `R₁(X)` | `R₁(X)` |
| 2 | `R₃(X)` | `R₃(X)` |
| 3 | `W₁(X)` | `W₃(X)` |
| 4 | `R₂(X)` | `W₁(X)` |
| 5 | `W₃(X)` | `R₂(X)` |

Traza las aristas antes de abrir la respuesta siguiente. [Ver en el PDF](Transacciones_original.pdf#page=25).
:::

::: pregunta ¿Cuál de las dos planificaciones del ejercicio es serializable por conflictos?
**Ninguna.** En la primera, `R₃(X)` precede a `W₁(X)` (T3→T1), mientras `R₁(X)`/`W₁(X)` preceden a `W₃(X)` (T1→T3): hay ciclo. En la segunda, `R₁(X)` precede a `W₃(X)` (T1→T3) y `R₃(X)`/`W₃(X)` preceden a `W₁(X)` (T3→T1): también hay ciclo.
:::

## Anomalías de concurrencia {#anomalias}

Las siguientes anomalías se explican con transacciones intercaladas sobre un mismo dato o sobre un conjunto de filas. La diferencia clave es **qué se leyó o escribió, cuándo hizo `COMMIT` la otra transacción y si una escritura oculta otra**. [Diapositivas 27–31](Transacciones_original.pdf#page=27).

### Lectura sucia (*dirty read*)

T2 lee un valor escrito por T1 **antes de que T1 confirme**. Si T1 hace `ROLLBACK`, la decisión de T2 estaba basada en un dato que nunca llegó a ser válido. El ejemplo del tema: T1 escribe A; T2 lee A, escribe A y confirma; después T1 aborta. [Diapositiva 27](Transacciones_original.pdf#page=27).

### Lectura no repetible (*unrepeatable read*)

T1 lee A dos veces dentro de su transacción y obtiene valores diferentes porque T2 modifica A y confirma entre ambas lecturas. Cambia **el valor de una fila que T1 ya había leído**. [Diapositiva 28](Transacciones_original.pdf#page=28).

### Lectura fantasma (*phantom read*)

T1 ejecuta de nuevo una consulta con el mismo predicado y cambia el **número o la identidad de las filas** devueltas porque otra transacción insertó, eliminó o modificó filas que cumplen la condición y confirmó. A diferencia de la lectura no repetible, aquí importa el **conjunto de resultados**. [Diapositiva 29](Transacciones_original.pdf#page=29).

### Lectura de cambios parciales

T2 observa **solo parte** de las escrituras de T1 antes de su `COMMIT`: T1 escribe A; T2 lee A y B y calcula usando esa combinación; después T1 escribe B. El resultado de T2 mezcla estados incompatibles de una misma operación lógica. [Diapositiva 30](Transacciones_original.pdf#page=30).

### Pérdida total o parcial de una actualización

Dos transacciones modifican los mismos datos y una escritura **sobrescribe** el efecto de la otra. En el ejemplo de la diapositiva 31, T1 escribe A; T2 escribe A y B; T1 escribe B. El estado final toma el A de T2 y el B de T1, de modo que no equivale a ninguna de las dos ejecuciones serie. [Diapositiva 31](Transacciones_original.pdf#page=31).

| Anomalía | Señal distintiva |
| --- | --- |
| Lectura sucia | Se leyó un valor todavía no confirmado, que puede deshacerse. |
| Lectura no repetible | La misma fila tiene otro valor en una segunda lectura. |
| Lectura fantasma | Cambia el conjunto de filas de una consulta repetida. |
| Lectura parcial | Se combinan escrituras parciales de otra transacción. |
| Actualización perdida | Una escritura tapa el cambio de otra. |

### Ejercicio: transferencia y retirada del 10 %

Se parte de **A=1000, B=1000**. T1 transfiere 50 de A a B; T2 retira el 10 % del saldo de A. Las operaciones son las de la diapositiva 32:

| T1 | T2 |
| --- | --- |
| `i11: x = R(A)` | `i21: y = R(A)` |
| `i12: x = x - 50` | `i22: temp = y * 0,1` |
| `i13: W(A = x)` | `i23: aux = y - temp` |
| `i14: y = R(B)` | `i24: W(A = aux)` |
| `i15: y = y + 50` | `i25: COMMIT` |
| `i16: W(B = y)` |  |
| `i17: COMMIT` |  |

En serie, **T1→T2** deja A=855, B=1050; **T2→T1** deja A=850, B=1050. La planificación indicada en el PDF es `i11, i12, i21, i22, i23, i13, i14, i24, i25, i15, i16, i17`: T1 calcula A=950 pero T2 escribe después A=900, y el resultado final es **A=900, B=1050**. Se pierde la disminución de 50 en A hecha por T1. [Diapositiva 32](Transacciones_original.pdf#page=32).

### Ejercicio: interés calculado sobre un dato sin confirmar

De nuevo **A=1000, B=1000**. T1 transfiere 50 de A a B; T2 añade a A un interés del **10 %** de A. En la planificación de la diapositiva 33, T1 escribe A=950, T2 lee ese A y calcula un interés de 95, T2 escribe A=1045 y confirma, y **T1 hace `ROLLBACK`**. T2 confirmó un resultado calculado a partir de un cambio de T1 que se deshizo: es una **lectura sucia** y muestra por qué pueden producirse efectos en cascada. El ejercicio original presenta los pasos `i11, i12, i13, i21, i22, i23, i24, i25` antes del rollback de T1. [Diapositiva 33](Transacciones_original.pdf#page=33).

## Control de concurrencia {#control-concurrencia}

El objetivo es impedir anomalías incluso cuando las operaciones de varias transacciones se intercalan. El PDF contrasta un enfoque basado en **bloqueos** con otro basado en **versiones y validación**. La aplicación normalmente solicita un nivel de aislamiento y el SGBD aplica sus mecanismos internos. [Diapositivas 34–46](Transacciones_original.pdf#page=34).

### Bloqueos: enfoque pesimista

Para leer se solicita un **bloqueo compartido** `S(X)`: otros lectores pueden seguir leyendo X, pero un escritor debe esperar. Para escribir se solicita un **bloqueo exclusivo** `X(X)`: no se permiten otras lecturas ni escrituras concurrentes del objeto bloqueado. Los compartidos pueden liberarse explícitamente o al final de la transacción; el esquema del tema mantiene el exclusivo hasta el final. `U(X)` significa liberar el bloqueo. [Diapositivas 35–36](Transacciones_original.pdf#page=35).

| Bloqueo ya existente | Otro lector pide S(X) | Otro escritor pide X(X) |
| --- | --- | --- |
| S(X) | Compatible: varios lectores. | Incompatible: espera. |
| X(X) | Incompatible: espera. | Incompatible: espera. |

En la [planificación con bloqueos explícitos](Transacciones_original.pdf#page=36), T1 obtiene `X(B)`, escribe B y lo libera; T2 toma `S(A)`, lee A y después solicita `X(B)` antes de escribir B y liberar sus bloqueos. Los conflictos pueden obligar a esperar. La **granularidad** del bloqueo (fila, página, tabla, etc.) y la competencia por recursos afectan a la escalabilidad. El PDF menciona esta granularidad sin detallar una política concreta.

### Versiones y validación: enfoque optimista presentado en el PDF

El material titula este enfoque **MVCC** y lo explica suponiendo que no habrá conflictos: las transacciones leen **versiones consistentes** y escriben en una copia o espacio privado; al confirmar se comprueba si lo leído y modificado sigue siendo válido. Describe tres fases: [diapositivas 37–44](Transacciones_original.pdf#page=37).

1. **Simulación.** Lecturas sobre la versión consistente y escrituras privadas; los cambios aún no son globalmente visibles.
2. **Validación.** Se examinan los conjuntos de lectura y escritura (*read set* / *write set*) y las transacciones que confirmaron durante la ejecución. Si hay conflicto relevante, la transacción debe abortar.
3. **Escritura o commit.** La versión local válida pasa a ser visible; la persistencia física en disco puede realizarse después según el mecanismo del SGBD.

Los diagramas comienzan con `a=5`. T1 y T2 leen 5 y preparan, respectivamente, **`W₁(a=15)`** y **`W₂(a=25)`** en sus áreas privadas. T2 llega a validación sin que otra transacción haya confirmado durante su trabajo, por lo que puede consolidar 25. Cuando T1 intenta confirmar, su conjunto de escritura sobre `a` se cruza con el de T2, ya confirmado: el ejemplo de la diapositiva 44 muestra **fallo de validación** para T1. [Secuencia gráfica 38–44](Transacciones_original.pdf#page=38).

::: aviso Matiz del ejemplo
El PDF agrupa estos pasos bajo «MVCC, enfoque optimista». Son las fases del **esquema de validación que dibujan esas diapositivas**; no debe concluirse que todas las implementaciones de MVCC usen exactamente esa misma política. En la figura final, una transacción que sigue leyendo su instantánea puede continuar viendo el valor antiguo; el propio material contrasta esa situación con una nueva lectura en `Read Committed`.
:::

## Niveles de aislamiento {#aislamiento}

Un nivel de aislamiento establece **qué efectos de otras transacciones concurrentes puede observar una transacción**. La aplicación no necesita operar directamente los bloqueos o versiones: pide un nivel al SGBD. En sistemas basados en bloqueos, influye en las operaciones concurrentes permitidas; en sistemas de versiones, en qué versiones resultan visibles. El nivel se configura **por transacción o conexión** en el modelo del tema; condiciona sobre todo las **lecturas de esa transacción**, no modifica por sí solo las otras que están ejecutándose. [Diapositivas 46–47](Transacciones_original.pdf#page=46).

### Los cuatro niveles del tema

1. **Read Uncommitted** (lectura no confirmada, menos restrictiva): puede leer cambios que todavía no hicieron `COMMIT` y que quizá luego se deshagan.
2. **Read Committed** (lectura confirmada): no lee cambios sin confirmar; dos consultas sucesivas del mismo dato pueden obtener valores distintos, siempre confirmados.
3. **Repeatable Read** (lectura repetible): las lecturas repetidas de los mismos registros devuelven los mismos valores; según la tabla del material todavía pueden aparecer filas nuevas en una consulta repetida.
4. **Serializable** (más restrictivo): las transacciones concurrentes deben producir el mismo resultado que alguna ejecución serie.

### Qué fenómenos permite cada nivel según la tabla del PDF

| Nivel de aislamiento | Lectura sucia | Lectura no repetible | Lectura fantasma |
| --- | --- | --- | --- |
| Read Uncommitted | Sí | Sí | Sí |
| Read Committed | No | Sí | Sí |
| Repeatable Read | No | No | Sí |
| Serializable | No | No | No |

Esta es **la tabla didáctica de la diapositiva 49**. Los comportamientos concretos de un SGBD pueden depender de su implementación; para el examen de este material conserva la tabla tal como aparece. La tabla se refiere a esos tres fenómenos y no enumera por sí sola todas las formas de pérdida de actualización. [Ver tabla original](Transacciones_original.pdf#page=49).

### Ejercicio `W(name, pay)` de la diapositiva 50

Partimos de `pay=50` para `Amy`. Cada instrucción SQL individual se ejecuta atómicamente. T1 hace `S1: pay=2*pay`, luego `S2: pay=3*pay`; T2 hace `S3: pay=pay-20`, luego `S4: pay=pay-10`. Las dos transacciones comienzan, realizan sus dos sentencias en ese orden interno y después confirman. El PDF pregunta por los valores posibles si ambas son Serializable, ambas Read Committed, T1 Read Committed y T2 Read Uncommitted, ambas Read Uncommitted, y si ambas son Serializable pero T2 aborta después de S3. [Enunciado completo](Transacciones_original.pdf#page=50).

```text title="Operaciones del ejercicio"
Inicial: pay = 50
T1: S1 (×2)  →  S2 (×3)   → COMMIT
T2: S3 (−20) →  S4 (−10)  → COMMIT
```

::: pregunta ¿Qué dos resultados corresponden a los órdenes completamente serie con ambas transacciones confirmadas?
T1→T2: `50×2×3−20−10 = 270`. T2→T1: `(50−20−10)×2×3 = 120`. Para razonar sobre otros entrelazados o abortos hay que respetar el orden de instrucciones de cada transacción y las garantías del nivel indicado; no basta con permutar libremente los cuatro cálculos.
:::

## Gestionar transacciones con JDBC {#jdbc}

La interfaz `Connection` ofrece las operaciones del tema. Por defecto **`autoCommit = true`**: cada sentencia SQL queda confirmada automáticamente tras ejecutarse. Con **`autoCommit = false`**, varias sentencias forman la transacción en curso hasta llamar a `commit()` o `rollback()`. Tras acabar una transacción, la conexión puede iniciar la siguiente. [Diapositivas 52–53](Transacciones_original.pdf#page=52).

| Método de `Connection` | Para qué sirve |
| --- | --- |
| `getAutoCommit()` | Consultar el modo de confirmación. |
| `setAutoCommit(boolean)` | Cambiar entre confirmación automática y manual. |
| `commit()` | Confirmar los cambios de la transacción actual. |
| `rollback()` | Descartar los cambios de la transacción actual. |
| `isClosed()` | Comprobar si la conexión está cerrada. |
| `getTransactionIsolation()` | Consultar el nivel de aislamiento de la conexión. |
| `setTransactionIsolation(int)` | Solicitar otro nivel de aislamiento. |

### Ejemplo: dos operaciones como una sola unidad

El siguiente fragmento **ilustra** una transferencia; no procede literalmente del PDF ni presupone sus tablas. Ambas sentencias usan **la misma conexión**. Si falla una, se deshace la transacción completa. Se comprueba además el número de filas afectadas para no confirmar una transferencia parcial.

```java title="Transferencia.java" origen="ejemplo didáctico"
try (Connection con = DriverManager.getConnection(url, usuario, clave)) {
    con.setAutoCommit(false);
    try {
        try (PreparedStatement cargo = con.prepareStatement(
                 "UPDATE cuentas SET saldo = saldo - ? WHERE id = ?");
             PreparedStatement abono = con.prepareStatement(
                 "UPDATE cuentas SET saldo = saldo + ? WHERE id = ?")) {
            cargo.setBigDecimal(1, importe);
            cargo.setInt(2, cuentaOrigen);
            abono.setBigDecimal(1, importe);
            abono.setInt(2, cuentaDestino);

            if (cargo.executeUpdate() != 1 || abono.executeUpdate() != 1) {
                throw new SQLException("No se actualizaron ambas cuentas");
            }
        }
        con.commit();
    } catch (SQLException error) {
        try { con.rollback(); }
        catch (SQLException falloRollback) { error.addSuppressed(falloRollback); }
        throw error;
    }
}
```

::: aviso Importante en el ejemplo
Las restricciones del esquema y las reglas de negocio, como no permitir saldo negativo, han de establecerse aparte. Una transacción agrupa los cambios, pero el ejemplo por sí solo no implementa todas las reglas de consistencia de una aplicación real.
:::

### Ejemplo: consultar y configurar el aislamiento

`getTransactionIsolation()` devuelve una de las constantes de `Connection`. El cambio con `setTransactionIsolation(...)` debe plantearse **antes de iniciar las operaciones de la transacción**; la admisión efectiva de cada nivel depende del driver y del SGBD.

```java title="Aislamiento.java" origen="ejemplo didáctico"
try (Connection con = DriverManager.getConnection(url, usuario, clave)) {
    int anterior = con.getTransactionIsolation();
    con.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
    con.setAutoCommit(false);
    try {
        // Consultas y actualizaciones de esta transacción.
        con.commit();
    } catch (SQLException error) {
        con.rollback();
        throw error;
    }
    // Si se reutiliza esta conexión, restaurar su configuración cuando proceda.
    con.setTransactionIsolation(anterior);
}
```

| Constante JDBC | Nivel estudiado |
| --- | --- |
| `TRANSACTION_READ_UNCOMMITTED` | Read Uncommitted |
| `TRANSACTION_READ_COMMITTED` | Read Committed |
| `TRANSACTION_REPEATABLE_READ` | Repeatable Read |
| `TRANSACTION_SERIALIZABLE` | Serializable |

::: pregunta ¿Qué cambia al llamar a `setAutoCommit(false)`?
Las siguientes sentencias sobre esa conexión pasan a formar parte de la transacción en curso y necesitan `commit()` para confirmarse o `rollback()` para deshacerse. No basta con cerrar cada `Statement`.
:::

## Guía de repaso y fuentes {#repaso}

### Comprobaciones rápidas

- **Atomicidad / durabilidad:** ¿qué se deshace tras un fallo y qué se conserva si ya hubo `COMMIT`?
- **Serialización:** ¿se mantiene el orden interno de cada T? ¿Qué aristas del grafo producen las parejas conflictivas? ¿Hay un ciclo?
- **Anomalía:** ¿se leyó algo sin confirmar, cambió el valor de una fila, cambió el conjunto de filas o se sobrescribió una escritura?
- **Aislamiento:** ¿qué fenómeno evita cada fila de la tabla del PDF? ¿Qué nivel permite `dirty read`?
- **JDBC:** ¿están todas las instrucciones de la operación en la misma conexión y se gestiona la ruta de error con `rollback()`?

::: pregunta ¿Por qué S3 puede equivaler a S1 aunque las transacciones estén intercaladas?
Porque serializable no significa «sin intercalado»: exige que el efecto de las operaciones intercaladas sea equivalente al de alguna planificación serie. En las diapositivas 20–22, S3 equivale a S1 y S4 a S2.
:::

### Material original y lecturas

- [PDF completo de la unidad](Transacciones_original.pdf), con los gráficos originales y los enunciados de ejercicios.
- [Curso CS145 de Stanford](https://cs145-fa18.github.io/), indicado como fuente principal de adaptación en la portada.
- El PDF recomienda tres vídeos de Jennifer Widom sobre transacciones ([1](https://www.youtube.com/watch?v=-NPyRXCysW0), [2](https://www.youtube.com/watch?v=usgUgO8xNDY), [3](https://www.youtube.com/watch?v=zz-Xbqp0g0A)) y un [vídeo sobre el enfoque de validación](https://www.youtube.com/watch?v=SGR-WR4w-Jk).
- Las [diapositivas 54–55](Transacciones_original.pdf#page=54) enumeran otras lecturas y vídeos adicionales sobre conflictos de concurrencia, aislamiento y control de concurrencia.
