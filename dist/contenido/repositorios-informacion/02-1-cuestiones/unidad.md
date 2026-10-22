---
id: transacciones-cuestionario
asignatura: Repositorios de Información
unidad: 2
parte: 1
titulo: Cuestionario de Transacciones
orden: 3
resumen: Cuestionario de repaso de la Unidad 2 sobre transacciones, ACID, planificación, serialización, anomalías y niveles de aislamiento.
fuente: Cuestiones_es.pdf
---

# Cuestionario de la Unidad 2: Transacciones

Cuestionario de repaso correspondiente a la **Unidad 2: Transacciones**. Las preguntas se han trasladado desde el documento original manteniendo sus enunciados, opciones, operaciones y planificaciones.

En esta versión se incluyen **únicamente las preguntas**. Las respuestas y resoluciones se añadirán más adelante.

[Abrir el documento original](Cuestiones_es.pdf).

::: cifras
23 | preguntas
8 | conceptos básicos y propiedades ACID
7 | planificación y serialización
4 | serializabilidad y anomalías
4 | niveles de aislamiento
:::

::: aviso Importante
Esta versión no incluye respuestas, soluciones ni indicaciones sobre cuál es la opción correcta.
:::

## 1. Transacciones y propiedades ACID

### 1. Para que un grupo de sentencias SQL sea una transacción debe

a) constar de una operación de lectura o escritura.

b) constar únicamente de operaciones de lectura o escritura.

c) no guardar en la bbdd valores intermedios, sólo los valores al terminar la ejecución de todas las sentencias.

d) durante su ejecución se debe impedir la ejecución de otras transacciones que utilicen los mismos datos.

### 2. El efecto del comando ROLLBACK en una txn es:

a) Deshacer todos los cambios en la base de datos resultantes de la ejecución de la transacción.

b) Deshacer los efectos de la última operación de actualización (insert, update, delete).

c) Restaurar el contenido de la base de datos a su estado al final del día anterior.

d) Asegurarse de que todos los cambios realizados por la transacción están reflejados en la base de datos.

### 3. Cuando se termina de ejecutar la última instrucción CRUD de una transacción, la txn entra en estado:

a) Activo

b) Committed

c) Partially committed

d) Abort

### 4. ¿Cuál de las siguientes propiedades previene que una txn use unos datos que usa otra txn durante la ejecución de ésta?

a) Consistencia

b) Durabilidad

c) Atomicidad

d) Aislamiento

### 5. ¿Cuál de las siguientes propiedades establece que sólo datos que cumplan las restricciones de la base de datos serán escritos a la base de datos?

a) Consistencia

b) Atomicidad

c) Durabilidad

d) Aislamiento

### 6. ¿Cuál de las siguientes propiedades establece que los datos generados por una transacción finalizada con éxito deben persistir ante fallos del sistema?

a) Consistencia

b) Atomicidad

c) Durabilidad

d) Todas las anteriores

### 7. Considere la siguiente acción:

```text
TRANSACCIÓN.....
Operaciones
COMMIT;
ROLLBACK;
```

¿Qué efecto tiene el `ROLLBACK`?

a) Deshace todas las operaciones realizadas

b) Fuerza la repetición de la ejecución de todas las operaciones

c) Impide la ejecución de otras transacciones

d) No tiene ningún efecto

### 8. Vincula las propiedades de las txns con su significado

Propiedades:

1. Atomicidad
2. Aislamiento
3. Durabilidad
4. Consistencia

Significados:

a) Cada txn ignora al resto de las txn que se ejecutan concurrentemente en el sistema.

b) Si la txn termina con éxito, los cambios permanecen en la BBDD aunque haya fallos en el sistema.

c) La ejecución de la txn conserva las restricciones de la bd.

d) Sólo si todas las operaciones de la txn terminan correctamente se hacen persistentes los cambios.

[Ver preguntas en el PDF](Cuestiones_es.pdf#page=1).

## 2. Planificación y serialización

### 1. Una planificación de las operaciones de las txn en las que todas las operaciones de una se ejecutan antes de cualquier operación de las otras se llama

a) Serializable

b) Serie

c) Planificable

d) Ninguna de las anteriores

### 2. Una planificación de las operaciones de las txn en las que las operaciones de una se ejecutan intercalando la ejecución con las operaciones de otras, se llama

a) Serializable

b) Serie

c) Planificable

d) Ninguna de las anteriores

### 3. Considere las siguientes transacciones

```text
T1: r1(X); r1(Z); w1(X); w1(Z)
T2: r2(Y); r2(Z); w2(Z)
```

¿Cuál de las siguientes es una planificación?

a) `R1(X); r2(Y); w1(x); r1(Z); w2(Z)`

b) `r1(X); w1(Z); r2(Y); r2(Z); r1(Z); w1(X); w2(Z)`

c) `r2(Y); r2(Z); r1(Z); w1(X); w2(Z); r1(X); w1(Z)`

d) Ninguna

### 4. Considere las siguientes transacciones

```text
T1: r(x); w(x)
T2: r(y); w(y); r(x); w(x)
T3: r(y); w(x)
```

¿Cuál de las siguientes es una planificación serie?

a) `T1 → T3 → T2`

b) `T2 → T1 → T3`

c) `T2 → T3 → T1`

d) `T3 → T1 → T2`

### 5. Operaciones R y W sobre datos

En una base de datos se dispone de las tablas **Accounts (A)** y **History (H)**. Ambas contienen las columnas `id` (PK) y `saldo`. Sean las transacciones siguientes:

```sql
-- T1
UPDATE A SET saldo = saldo + 100 WHERE id = 'A';
UPDATE A SET saldo = saldo - 100 WHERE id = 'B';
COMMIT;
```

```sql
-- T2
UPDATE A SET saldo = saldo * 2;
COMMIT;
```

```sql
-- T3
SELECT saldo as x FROM A WHERE id = 'B';
UPDATE H SET saldo = saldo + x WHERE id = 'C';
COMMIT;
```

Escribe las transacciones como secuencias de operaciones R y W sobre datos: `R(X)`, `W(X)`.

### 6. Pon un ejemplo de planificación serializable.

### 7. Pon un ejemplo de planificación no serializable.

[Ver preguntas en el PDF](Cuestiones_es.pdf#page=1).

## 3. Serializabilidad y anomalías

### 1. ¿Es la siguiente una planificación serializable?

| Orden | T1 | T2 | T3 |
| ---: | --- | --- | --- |
| 1 | `R(X)` |  |  |
| 2 |  | `R(Y)` |  |
| 3 |  |  | `R(Y)` |
| 4 |  | `W(Y)` |  |
| 5 | `W(X)` |  |  |
| 6 |  |  | `W(X)` |
| 7 |  | `R(X)` |  |
| 8 |  | `W(X)` |  |

**Verdadero / Falso**

### 2. ¿Es la siguiente una planificación serializable?

| Orden | T1 | T2 | T3 |
| ---: | --- | --- | --- |
| 1 |  | `R(Z)` |  |
| 2 |  | `R(Y)` |  |
| 3 |  | `W(Y)` |  |
| 4 |  |  | `R(Y)` |
| 5 |  |  | `R(Z)` |
| 6 | `R(X)` |  |  |
| 7 | `W(X)` |  |  |
| 8 |  |  | `W(Y)` |
| 9 |  |  | `W(Z)` |
| 10 |  | `R(X)` |  |
| 11 | `R(Y)` |  |  |
| 12 | `W(Y)` |  |  |
| 13 |  | `W(X)` |  |

**Verdadero / Falso**

### 3. ¿Es la siguiente una planificación serializable?

| Orden | T1 | T2 | T3 |
| ---: | --- | --- | --- |
| 1 |  |  | `R(Y)` |
| 2 |  |  | `R(Z)` |
| 3 | `R(X)` |  |  |
| 4 | `W(X)` |  |  |
| 5 |  |  | `W(Y)` |
| 6 |  |  | `W(Z)` |
| 7 |  | `R(X)` |  |
| 8 | `R(Y)` |  |  |
| 9 | `W(Y)` |  |  |
| 10 |  | `R(Y)` |  |
| 11 |  | `W(Y)` |  |
| 12 |  | `R(X)` |  |
| 13 |  | `W(X)` |  |

**Verdadero / Falso**

### 4. Transferencia e interés

Supongamos que los valores iniciales son:

- Cuenta A = 500
- Cuenta B = 800

La transacción T1 transfiere 200 de A a B y la T2 aplica un interés del 5 % a A.

| T1 | T2 |
| --- | --- |
| `x = R(A)` | `z = R(A)` |
| `x = x - 200` | `temp = z * 1,05` |
| `W(A = x)` | `W(A = temp)` |
| `y = R(B)` |  |
| `y = y + 200` |  |
| `W(B = y)` |  |
| `COMMIT` | `COMMIT` |

Sea la siguiente planificación:

```text
i11, i12, i21, i22, i13, i14, i23, i24, i15, i16, i17
```

Preguntas:

- ¿Cuáles serían los resultados si las txn se ejecutaran en serie?
- ¿Es serializable?
- En caso de que no lo sea, ¿qué anomalía se produce?

[Ver preguntas en el PDF](Cuestiones_es.pdf#page=2).

## 4. Niveles de aislamiento y anomalías

### 1. ¿Qué anomalía se evita en el nivel de aislamiento Repeatable Read pero no en Read Committed?

a) Lectura sucia

b) Lectura no repetible

c) Lectura fantasma

d) Perdida de actualización

### 2. ¿Qué nivel de aislamiento garantiza la ausencia de todas las anomalías clásicas (lectura sucia, no repetible, fantasma)?

a) Read Uncommitted

b) Read Committed

c) Repeatable Read

d) Serializable

### 3. ¿Cuál de las siguientes anomalías ocurre cuando dos transacciones leen el mismo valor, lo modifican de forma independiente y luego ambas escriben?

a) Lectura sucia

b) Perdida de actualización

c) Lectura fantasma

d) Lectura no repetible

### 4. ¿Cuál es la anomalía que puede ocurrir incluso en Repeatable Read, pero no en Serializable?

a) Lectura sucia

b) Lectura no repetible

c) Lectura fantasma

d) Perdida de actualización

[Ver preguntas en el PDF](Cuestiones_es.pdf#page=2).

## Resumen

Este cuestionario reúne preguntas de repaso sobre:

- concepto y ciclo de vida de las transacciones;
- propiedades ACID;
- `COMMIT` y `ROLLBACK`;
- planificaciones serie y serializables;
- representación mediante operaciones `R` y `W`;
- comprobación de serializabilidad;
- anomalías de concurrencia;
- niveles de aislamiento.

Las respuestas y resoluciones quedan pendientes para una versión posterior.

## Referencia

[Cuestiones_es.pdf](Cuestiones_es.pdf)
