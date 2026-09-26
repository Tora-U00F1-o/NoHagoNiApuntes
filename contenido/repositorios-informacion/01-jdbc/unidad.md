---
id: jdbc
asignatura: Repositorios de Información
unidad: 1
titulo: JDBC
orden: 1
resumen: De la conexión al ResultSet, las transacciones, JNDI y los pools.
fuente: JDBC_original.pdf
---

# JDBC, de la conexión al *ResultSet*

Teoría de las diapositivas reorganizada para estudiar, con ejemplos de código y una guía de los proyectos de prácticas. Sigue el índice o lee el tema de principio a fin.

::: cifras
8 | bloques de teoría
6 | mini-proyectos relacionados
60 | páginas del PDF disponibles
:::

::: aviso Nota
**Cómo leer los ejemplos** Los fragmentos identificados como «ejemplo didáctico» ilustran la API; no son transcripciones de los proyectos. De estos proyectos se facilitó un índice descriptivo, no sus archivos fuente.
:::

## Qué es JDBC y cómo se organiza {#fundamentos}

La aplicación programa contra una API común; el driver resuelve la comunicación concreta con el SGBD.

### Definición y paquetes

**JDBC (Java Database Connectivity)** es la API estándar de Java para acceder a bases de datos relacionales o fuentes tabulares: establecer conexiones, ejecutar SQL y recibir y procesar resultados y errores. `java.sql` contiene las interfaces y clases de acceso básicas; `javax.sql` añade características como `DataSource`. El proveedor del SGBD ofrece un driver que implementa las interfaces JDBC básicas.

::: proceso
Aplicación Java → API JDBC → DriverManager / DataSource → Driver → SGBD
:::

**Componentes de la arquitectura**

| Componente | Responsabilidad |
| --- | --- |
| Aplicación Java | Invoca los métodos de JDBC y procesa los datos. |
| API JDBC | Interfaz orientada a objetos para trabajar con bases SQL. |
| Driver JDBC | Establece conexiones, traduce llamadas a comandos del SGBD, convierte tipos SQL/Java y errores en excepciones Java. |
| `DriverManager` | Mantiene los drivers disponibles y elige el que entiende la URL solicitada, de modo transparente para el cliente. |
| Origen de datos | Base de datos relacional accesible mediante SQL. |

::: aviso Ojo
**Dos independencias diferentes.** La JVM aporta independencia de plataforma. Las interfaces JDBC y los drivers aportan independencia de los detalles de cada SGBD. Cambiar de SGBD puede requerir ajustar el SQL y la configuración, aunque se conserve la API.
:::

### Mapeo de tipos SQL ↔ Java

El driver convierte los valores entre ambos mundos. La tabla del tema recoge los tipos habituales:

| Tipo SQL | Tipo Java | Nota |
| --- | --- | --- |
| `CHAR`, `VARCHAR` | `String` | Texto |
| `NUMERIC`, `DECIMAL` | `java.math.BigDecimal` | Precisión exacta |
| `INTEGER` | `int` / `Integer` | Entero |
| `BIGINT` | `long` / `Long` | Entero grande |
| `FLOAT`, `DOUBLE` | `double` | Doble precisión |
| `DATE` | `java.sql.Date` | Fecha |
| `TIME` | `java.sql.Time` | Hora |
| `TIMESTAMP` | `java.sql.Timestamp` | Fecha y hora |

PDF original: diapositivas 3–10.

## De la conexión al resultado {#proceso}

Instalar driver → conectar → crear sentencia → ejecutar → recuperar → procesar → cerrar.

### `Connection` y URL JDBC

`Connection` representa una conexión y una sesión de trabajo con la base de datos. Es una interfaz implementada por el driver, sin constructor propio. Una aplicación puede mantener varias conexiones con una o distintas bases. No hace falta cerrar la conexión después de cada sentencia: se cierra al acabar el trabajo con ella.

```text
Connection conn = DriverManager.getConnection(url, usuario, clave);
```

La URL comienza por `jdbc:` e identifica la base y el protocolo/driver. Su forma concreta depende del controlador: `jdbc:[subprotocol]:[host[:port]]:[dbName][;attribute=value]*` es el esquema orientativo del PDF, no una plantilla literal universal. En el tema aparecen `oracle:thin`, `hsqldb:hsql` (servidor) y `hsqldb:mem` (memoria).

```java title="URLs JDBC" origen="ejemplo didáctico"
// Ejemplos didácticos de forma de URL; sustituye host y credenciales.
String oracle = "jdbc:oracle:thin:@//servidor:1521/servicio";
String hsqlServidor = "jdbc:hsqldb:hsql://localhost/miBD";
String hsqlMemoria = "jdbc:hsqldb:mem:test";
```

::: aviso Ojo
**Ejercicio de la diapositiva 15.** Construir las conexiones para Oracle (`thin`, host `156.35.94.98`, puerto `1521`, `desa19`, credenciales propias), HSQLDB servidor (`localhost`, puerto por defecto, usuario `sa`, contraseña vacía) y HSQLDB memoria (`test`, `sa`, contraseña vacía). Hay que distinguir SID de nombre de servicio al elegir la sintaxis real de Oracle.
:::

### `Statement` y sus tres ejecuciones

Una sentencia nace de una conexión. `executeQuery` devuelve un `ResultSet` para consultas; `executeUpdate` devuelve el número de filas afectadas por DML (y se emplea también para DDL, cuyo recuento habitual es 0); `execute` devuelve un booleano que indica si el primer resultado es un `ResultSet`, no si la operación tuvo éxito.

```java
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT id, name FROM TMechanics");
int filas = stmt.executeUpdate("DELETE FROM TMechanics WHERE id = 42");
boolean hayResultSet = stmt.execute("SELECT id FROM TMechanics");
```

### `ResultSet`: cursor y columnas

El resultado de una consulta se recorre fila a fila. El cursor nace **antes de la primera fila**; `next()` avanza y devuelve `false` al terminar. En el uso básico del tema el cursor es secuencial y de solo lectura. `getInt`, `getString`, `getFloat`, etc., leen una columna de la fila actual, por etiqueta o por posición. **La primera columna es la 1, no la 0.**

```java
try (Connection conn = DriverManager.getConnection(url, usuario, clave);
     Statement stmt = conn.createStatement();
     ResultSet rs = stmt.executeQuery("SELECT id, name FROM TMechanics")) {
    while (rs.next()) {
        int id = rs.getInt(1);       // Primera columna: índice 1.
        String nombre = rs.getString("name");
        System.out.println(id + " · " + nombre);
    }
} catch (SQLException e) {
    e.printStackTrace();
}
```

Ejemplo didáctico · cierre automático

El orden de los recursos en `try-with-resources` permite cerrarlos en orden inverso: `ResultSet`, `Statement`, `Connection`, también ante una excepción. El resultado y la sentencia pueden retener cursores y otros recursos limitados del servidor.

PDF original: diapositivas 12–21 y 23–24.

## NULL no equivale a `null` {#null-errores}

Una lectura con getter primitivo puede ocultar que la columna SQL no tenía valor.

El PDF distingue `ClassNotFoundException` al cargar explícitamente una clase de driver y `SQLException` al acceder a la base de datos. La carga manual del driver solo es relevante en el contexto en que se hace: el código básico anterior usa `DriverManager` con el driver instalado.

Al leer una columna SQL `NULL` con `getInt()`, se devuelve `0`; por sí solo ese valor no distingue un cero real de un `NULL`. Llama a `wasNull()` **inmediatamente después del getter que quieras comprobar**. Con `getString()` el resultado puede ser la referencia Java `null`; concatenarla con texto imprime los caracteres «null», que es el problema ilustrado por el primer ejemplo.

```java
// Ejemplo didáctico basado en el caso invoice_id de TWorkorders.
int invoiceId = rs.getInt("invoice_id");
if (rs.wasNull()) {
    System.out.println("No invoice");
} else {
    System.out.println("Invoice: " + invoiceId);
}

String factura = rs.getString("invoice_id");
System.out.println(factura == null ? "No invoice" : factura);
```

::: practica unit1-manage-nulls
`Problem1.java` consulta `TWorkorders` por `vehicle_id`, filtra `mechanic_id` y muestra `invoice_id` sin tratar su posible NULL. `Problem2.java` comprueba `rs.wasNull()` tras leer `invoice_id` y muestra «No invoice». Compara ambos con una fila con y sin factura.
:::

::: aviso Ojo
**Precisión.** Un getter que devuelve un objeto puede devolver `null`; usar un wrapper como `Integer` requiere una lectura que realmente produzca ese objeto. `getInt()` siempre devuelve un `int`, aunque lo guardes después en un `Integer`.
:::

PDF original: diapositivas 21–23.

## `Statement` y `PreparedStatement` {#sentencias}

La consulta preparada separa la estructura SQL de los valores.

En la jerarquía JDBC, `PreparedStatement` amplía `Statement` y `CallableStatement` amplía `PreparedStatement`; este último se usa para procedimientos almacenados. `Statement` envía una sentencia SQL construida; `PreparedStatement` fija una plantilla con marcadores `?` y recibe después sus parámetros mediante `setXXX()`. Hay que asignar todos los parámetros necesarios antes de ejecutarla; sus índices también empiezan en 1.

| Aspecto | `Statement` | `PreparedStatement` |
| --- | --- | --- |
| Uso típico | Ejecución ocasional de SQL ya construido. | La misma forma de consulta repetida con otros valores. |
| SQL dinámico | Puede requerir concatenación. | Marcadores `?` y llamadas `setXXX()`. |
| Rendimiento repetido | Puede tener un coste mayor. | Puede mejorar; depende del driver y del SGBD. |
| DDL / DML | Puede ejecutar ambos. | Puede ejecutar ambos. |
| Datos del usuario | Concatenarlos en SQL permite inyección. | Los parámetros separan datos e instrucción. |

```java title="Consulta de clientes" origen="ejemplo didáctico"
// Ejemplo didáctico: consulta segura de clientes por población.
String sql = "SELECT nombre, apellidos FROM TCLIENTS WHERE town = ?";
try (PreparedStatement ps = conn.prepareStatement(sql)) {
    for (String town : List.of("LLANERA", "OVIEDO", "LUGONES")) {
        ps.setString(1, town);
        try (ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                System.out.println(rs.getString("nombre") + " "
                    + rs.getString("apellidos"));
            }
        }
    }
}
```

Ejemplo didáctico · nombres de tabla y columnas adaptables al esquema real

### ¿De dónde sale la posible mejora?

La diapositiva de fases muestra análisis y normalización (sintaxis, semántica, tablas y columnas), compilación, optimización, caché y ejecución. Su esquema explica que una consulta preparada puede reutilizar trabajo anterior al cambiar los parámetros. Es un modelo didáctico: la caché, la preparación efectiva y la ganancia concreta dependen del driver y del motor. Los valores suministrados a `?` son datos, no SQL ejecutable.

::: aviso Ojo
**Para el ejercicio de la diapositiva 30.** Consultar LLANERA y, después, una lista introducida por el usuario. En este último caso la plantilla preparada evita construir la condición concatenando cada población. Los `?` representan valores, no nombres de columnas o tablas.
:::

PDF original: diapositivas 26–30.

## Transacciones en una conexión {#transacciones}

Varias operaciones SQL deben completarse juntas o deshacerse juntas.

El caso del PDF factura órdenes de trabajo: buscarlas, verificar que estén terminadas y sin facturar, actualizarlas para impedir otra facturación y crear la factura. La transacción se ejecuta **dentro de una misma `Connection`**. Con el `autoCommit` activado por defecto, cada sentencia se confirma automáticamente; para agruparlas se llama a `setAutoCommit(false)`, se ejecutan y se hace `commit()` o `rollback()` si falla algo.

```java
// Ejemplo didáctico: adaptar esquema, estados y reglas reales.
try (Connection conn = DriverManager.getConnection(url, usuario, clave)) {
    conn.setAutoCommit(false);
    try {
        try (PreparedStatement update = conn.prepareStatement(
                "UPDATE TWORKORDERS SET invoice_id = ? " +
                "WHERE id = ? AND status = 'FINISHED' AND invoice_id IS NULL")) {
            update.setInt(1, invoiceId);
            update.setInt(2, workorderId);
            if (update.executeUpdate() != 1) {
                throw new SQLException("Orden no facturable");
            }
        }
        try (PreparedStatement insert = conn.prepareStatement(
                "INSERT INTO TINVOICES (id, amount) VALUES (?, ?)")) {
            insert.setInt(1, invoiceId);
            insert.setBigDecimal(2, total);
            insert.executeUpdate();
        }
        conn.commit();
    } catch (SQLException e) {
        try { conn.rollback(); }
        catch (SQLException rollbackError) { e.addSuppressed(rollbackError); }
        throw e;
    }
}
```

Ejemplo didáctico · muestra el límite transaccional, no reproduce el esquema del PDF

::: aviso Ojo
**Pregunta clave.** Si abres otra conexión para el `INSERT`, ya no pertenece automáticamente a la transacción de la primera. Cerrar recursos no sustituye el `commit()` ni el `rollback()` explícitos del ejemplo.
:::

PDF original: diapositivas 31–33.

## Navegar, observar y modificar {#resultset}

Son tres dimensiones distintas: tipo de cursor, sensibilidad a cambios y concurrencia de lectura/escritura.

### Tipos y modos

`Connection.createStatement(rsType, rsConcurrency)` solicita cómo será el `ResultSet` producido por esa sentencia. También existen sobrecargas para otros modos de creación. El driver puede limitar o ajustar las capacidades disponibles: hay que observar el comportamiento real.

| Tipo (`rsType`) | Navegación | Cambios externos |
| --- | --- | --- |
| `TYPE_FORWARD_ONLY` | Secuencial hacia delante; sin posicionamiento arbitrario. | Insensible en la tabla del tema. |
| `TYPE_SCROLL_INSENSITIVE` | Adelante, atrás y posicionamiento. | No refleja cambios externos hasta volver a ejecutar la consulta. |
| `TYPE_SCROLL_SENSITIVE` | Adelante, atrás y posicionamiento. | Puede reflejar cambios externos según driver, operación y caché. |

| Concurrencia (`rsConcurrency`) | Efecto |
| --- | --- |
| `CONCUR_READ_ONLY` | Solo lectura. |
| `CONCUR_UPDATABLE` | Permite pedir cambios en filas a través del propio cursor. |

```java
// Ejemplo didáctico: solicitar cursor desplazable y actualizable.
try (Statement stmt = conn.createStatement(
        ResultSet.TYPE_SCROLL_INSENSITIVE,
        ResultSet.CONCUR_UPDATABLE);
     ResultSet rs = stmt.executeQuery(
        "SELECT id, name FROM TMechanics")) {
    while (rs.next()) System.out.println(rs.getString("name"));
    while (rs.previous()) System.out.println(rs.getString("name"));
}
```

Ejemplo didáctico · la compatibilidad efectiva depende del driver y la consulta

### Restricciones de la consulta

El material pide, para un cursor sensible o actualizable, **una tabla, sin `JOIN` y sin `SELECT *`**. Para poder insertar, incluye las columnas obligatorias sin valor por defecto; para actualización, no proyectes agregados o columnas derivadas (`SUM`, `MAX`, etc.), solo columnas de la tabla. Comprueba las capacidades del SGBD y del driver. Estas son las condiciones expuestas para las prácticas del tema, no una garantía universal de que toda consulta que las cumpla sea actualizable.

::: practica ResultSet-Mejorado-HSQLDB
`ResultSetExample.java` crea un `Statement` con tipo y concurrencia configurables, recorre `TMechanics` hacia delante y atrás. Las variantes de scroll y actualización, y las llamadas a `insert()` y `update()` en `run()`, están comentadas para activarlas al experimentar. Modifica una variable por vez y observa qué permite HSQLDB.
:::

### Fetch size: la ventana de filas

El `ResultSet` no obliga a almacenar íntegramente en memoria todas las filas de la consulta. El driver decide cuántas recupera y cachea; `rs.setFetchSize(25)` solicita lotes de 25. Si una ventana cacheada se agota, puede obtener otra. **Es una indicación al driver, no una promesa de uso exacto de memoria ni de red.** En el experimento Oracle, la ventana importa porque una fila ya cacheada puede comportarse de manera distinta a otra pendiente de recuperar.

```java
rs.setFetchSize(25);
while (rs.next()) {
    // El driver gestiona la recuperación de filas en bloques.
}
```

### Visibilidad de operaciones propias y ajenas

La tabla siguiente es la que presenta el PDF para **su implementación Oracle JDBC**. «Interno» significa cambios hechos a través del propio `ResultSet`; «externo», cambios hechos por otra transacción sin repetir la consulta. «Visible» no significa que una operación sea necesariamente compatible en cualquier consulta.

| Tipo | DELETE propio | UPDATE propio | INSERT propio | DELETE ajeno | UPDATE ajeno | INSERT ajeno |
| --- | --- | --- | --- | --- | --- | --- |
| Forward-only | No | Sí | No | No | No | No |
| Scroll-sensitive | Sí | Sí | No | No | Sí | No |
| Scroll-insensitive | Sí | Sí | No | No | No | No |

::: aviso Ojo
**Experimento propuesto en el PDF.** En `ResultSet-Sensitivity`, elegir opción 8 (UPDATE externo, sensible, actualizable), cambiar desde SQL Developer la primera y la última fila y reanudar. Repetir tras descomentar la línea 16 de `Sensitive.java` y comparar `ojdbc6` con `ojdbc8`. Según el índice facilitado, `Sensitive.java` usa `fetchSize = 1` e `Insensitive.java`, `fetchSize = 100`; la referencia a «descomentar» reproduce la consigna del PDF, no asegura el estado actual del fichero.
:::

### INSERT, DELETE y UPDATE desde el cursor

Para las tres operaciones se necesita un `ResultSet` actualizable. La modificación de una fila del resultado llega a la tabla subyacente y queda sometida a la transacción; su permanencia definitiva requiere `commit()` cuando la confirmación es manual.

#### INSERT

1. `moveToInsertRow()` sitúa el cursor en el área de nueva fila.
2. `updateXXX()` establece columnas.
3. `insertRow()` inserta en la tabla.

#### DELETE

1. Posicionarse en la fila.
2. `deleteRow()` elimina la fila actual; no puede llamarse desde la fila de inserción.
3. Para asegurar que el resultado refleje la eliminación, cerrar y volver a ejecutar la consulta.

#### UPDATE

1. Posicionarse en la fila.
2. `updateXXX()` prepara valores.
3. `updateRow()` aplica el cambio; no desde la fila de inserción.
4. `cancelRowUpdates()` descarta cambios pendientes antes de aplicarlos.

```java
// Ejemplos didácticos: cada bloque requiere un ResultSet actualizable.
rs.moveToInsertRow();
rs.updateInt("id", 100);
rs.updateString("name", "Ana");
rs.insertRow();
rs.moveToCurrentRow();

if (rs.first()) {
    rs.updateString("name", "Ana María");
    rs.updateRow();        // O cancelRowUpdates() antes de aplicarlo.
}
if (rs.last()) rs.deleteRow();
```

Ejemplo didáctico · probar por separado y con los campos obligatorios de la tabla real

¿Cuándo compensa? Si ya recorres filas y vas a modificar las que cumplan una condición, actualizar el cursor evita escribir otro `UPDATE` e indicar de nuevo la clave de cada fila. El PDF destaca **comodidad y encapsulación**, no que sea siempre más rápido.

::: practica ResultSet-Sensitivity-Oracle
`DatabaseOperations.java` consulta `TPRUEBA`, muestra la tabla, lee capacidades mediante `DatabaseMetaData`, aplica una operación y vuelve a recorrer hacia atrás. Las estrategias `Sensitive`/`Insensitive` eligen el cursor; `InternalUpdate/Insert/Delete` ejecutan sobre el cursor y `ExternalUpdate/Insert/Delete` esperan una modificación desde SQL Developer. `UserInterface` y `Menu` presentan 12 combinaciones (2 sensibilidades × 3 operaciones × 2 orígenes). Los métodos de metadatos correspondientes son `ownUpdatesAreVisible`, `ownInsertsAreVisible`, `ownDeletesAreVisible` y sus versiones `others…`. Compara previsión y observación, atendiendo al fetch size.
:::

PDF original: diapositivas 35–47.

## DataSource y JNDI {#datasource}

El cliente pide conexiones a un recurso lógico cuya configuración vive en el entorno.

`javax.sql.DataSource` ofrece otra vía para obtener `Connection`. Puede entregar conexiones directamente o administrar un pool. La aplicación ya no tiene que llamar a `DriverManager.getConnection()` ni conocer en su código el driver y la URL. La configuración concreta del `DataSource` depende del entorno.

```java
DataSource ds = /* configurado por la aplicación o el servidor */;
try (Connection conn = ds.getConnection()) {
    // Ejecutar sentencias con normalidad.
}
```

### Servicio de nombres JNDI

**JNDI** permite buscar un recurso por un nombre lógico. Primero se crea y configura el `DataSource` con host, base, puerto y propiedades del driver; después se registra con un nombre. El cliente obtiene un `Context`, hace `lookup(nombre)`, convierte el recurso en `DataSource` y llama a `getConnection()`. Cambiar los parámetros de conexión en el servidor no obliga a cambiar el código de consulta del cliente.

```java
// Ejemplo didáctico del mecanismo mostrado en el tema.
Context ctx = new InitialContext();
DataSource ds = (DataSource) ctx.lookup("MyDB");
try (Connection conn = ds.getConnection()) {
    // La conexión se usa como cualquier Connection JDBC.
}
```

::: proceso
Servidor configura DataSource → registra «ejemplo» → JNDI → cliente hace lookup
:::

::: practica JNDI-DataSource-Client / Server
El cliente `Client.java` carga credenciales desde `config.properties`, crea un contexto inicial sobre un registro RMI, busca `"ejemplo"`, obtiene un `DataSource` y consulta `TPRUEBA`. `Main.java` lo arranca; `Conf.java` es un singleton genérico de propiedades, aunque el cliente descrito usa `FileInputStream` directamente. Del servidor se han descrito únicamente dos copias de `config.properties` (`src` y `bin`): **no se ha proporcionado su implementación Java**. El esquema de registro procede del PDF, no de un servidor cuya fuente hayamos leído.
:::

PDF original: diapositivas 49–54.

## Pool de conexiones {#pool}

Una reserva de conexiones físicas reutilizables reduce el coste de abrirlas repetidamente.

Cuando el cliente solicita una conexión al `DataSource`, el pool puede prestar una libre; si necesita otra y su configuración lo permite, crea una nueva. Al cerrar la conexión lógica obtenida, esta normalmente vuelve al pool y queda disponible para otro cliente. Por eso `try-with-resources` sigue siendo esencial incluso con pooling. Un pool no elimina límites de tamaño ni garantiza una mejora idéntica en toda carga.

::: proceso
Pedir → Prestar o crear → Usar → Devolver al pool
:::

| Alternativa del PDF | Descripción |
| --- | --- |
| Servidor de aplicaciones | Configura grupos de conexiones JDBC y expone un `DataSource`, frecuentemente por JNDI. |
| Standalone | `BasicDataSource` o `HikariCP` sin servidor de aplicaciones. |
| Otros ejemplos mencionados | `OracleConnectionCacheManager` (Oracle), `c3p0`, `BoneCP` y `Jakarta DBCP`. |

::: practica HSQLdb-ConnectionPool
`Main.java` mide 100 iteraciones de consultas a `tmechanics` con `JDBCPool` (tamaño 5) y otras 100 con `DriverManager`. La observación debe interpretarse como medición de ese programa y entorno: influyen calentamiento, servidor, consultas y conexiones. El contraste conceptual es reutilizar conexiones frente a crearlas cada vez.
:::

PDF original: diapositivas 55–57.

## Mapa de los seis mini-proyectos {#laboratorios}

Qué demuestra cada uno, dónde mirar y qué comparar al ejecutarlo.

::: proyecto unit1-manage-nulls
01 · HSQLDB

**Archivos:** `Problem1.java`, `Problem2.java`. **Pregunta:** ¿qué se muestra cuando `invoice_id` es SQL NULL? Compara lectura directa con `wasNull()`, sin perder de vista el filtro por `vehicle_id`/`mechanic_id`.

[Ir a NULL y errores ↑](#null-errores)
:::

::: proyecto ResultSet-Mejorado-HSQLDB
02 · HSQLDB

**Archivo:** `ResultSetExample.java`. **Pregunta:** ¿puedes avanzar, retroceder e insertar/actualizar con el tipo y modo configurados? Los cambios de configuración y las operaciones están comentados en el punto de entrada según el índice recibido.

[Ir a ResultSet mejorado ↑](#resultset)
:::

::: proyecto ResultSet-Sensitivity-Oracle
03 · ORACLE

**Entrada:** `Main.java` → `UserInterface.java`/`Menu.java` → `DatabaseOperations.java`. **Estrategias de cursor:** `Sensitive`, `Insensitive`. **Operaciones:** `InternalUpdate`, `InternalInsert`, `InternalDelete`, `ExternalUpdate`, `ExternalInsert`, `ExternalDelete`. `CreateStatementStrategy` y `ExecuteOperationStrategy` son las interfaces; `Internal` y `External` son las bases, `Console` maneja la consola. **Pregunta:** ¿coincide lo observado con los metadatos `own…AreVisible` y `others…AreVisible`? Prueba las 12 combinaciones.

[Ir a sensibilidad ↑](#resultset)
:::

::: proyecto HSQLdb-ConnectionPool
04 · HSQLDB

**Archivo:** `Main.java`. **Pregunta:** ¿cuánto tardan 100 consultas usando `JDBCPool` de tamaño 5 y otras 100 abriendo conexiones con `DriverManager`? Anota condiciones de la medición.

[Ir a pool ↑](#pool)
:::

::: proyecto JNDI-DataSource-Client
05 · JNDI

**Archivos:** `Main.java`, `Client.java`, `Conf.java`. **Pregunta:** ¿de dónde sale el `DataSource` que permite consultar `TPRUEBA`? Sigue el `InitialContext`, el lookup `"ejemplo"`, las credenciales y `getConnection()`.

[Ir a JNDI ↑](#datasource)
:::

::: proyecto JNDI-DataSource-Server
06 · JNDI

**Archivos disponibles en el índice:** `src/config.properties` y `bin/config.properties`, con host, puerto, SID `desa19` y driver Oracle thin. No hay archivos `.java` del servidor en el material descrito; para estudiar su implementación hará falta incorporarlos.

[Ir a registro de DataSource ↑](#datasource)
:::

## Ejercicios del tema y preguntas guía {#ejercicios}

Las actividades que aparecen en las diapositivas, agrupadas para repasarlas después de estudiar.

1. **Conexiones.** Construye URL y `Connection` para los tres escenarios de Oracle/HSQLDB de la diapositiva 15. ¿Qué parte de la URL escoge el protocolo?
2. **Sentencias.** Recupera todas las filas y columnas de la tabla propuesta, recupera solo las que tengan estado `FINISHED` e inserta una fila (diapositiva 17). Decide entre `executeQuery` y `executeUpdate`.
3. **Lectura.** Recorre los resultados de las dos consultas e imprime identificadores e importe a pagar (diapositiva 20). ¿Dónde está el cursor antes del primer `next()`?
4. **Parámetros.** Recupera nombre y apellidos de clientes de LLANERA y de una lista de localidades recibida en tiempo de ejecución (diapositiva 30). ¿Por qué un `?` no ejecuta el texto de una población como SQL?
5. **Transacción.** Convierte la facturación de `TWORKORDERS` y `TINVOICES` en una sola transacción (diapositiva 33). ¿Qué queda confirmado si falla la inserción con `autoCommit` activado?
6. **Cursor.** Cambia tipo y concurrencia en el proyecto HSQLDB y explica las operaciones que pasan o fallan (diapositiva 40). ¿Basta con solicitar `CONCUR_UPDATABLE`?
7. **Sensibilidad.** Prueba UPDATE externo en la primera y última fila del proyecto Oracle; altera el fetch size y, en casa, compara `ojdbc6` con `ojdbc8` (diapositivas 40–43). ¿Por qué importa la ventana de filas?

### Comprobación rápida

::: pregunta ¿`getInt()` permite detectar por sí solo SQL NULL?
No. Tras leer la columna, usa `wasNull()` antes de leer otra.
:::

::: pregunta ¿Qué indica el booleano de `Statement.execute()`?
Que el primer resultado es un `ResultSet`; `false` no es sinónimo de fallo.
:::

::: pregunta ¿`TYPE_SCROLL_SENSITIVE` equivale a `CONCUR_UPDATABLE`?
No. El primero solicita desplazamiento y sensibilidad; el segundo, capacidad de modificación.
:::

::: pregunta ¿Se puede ver siempre un INSERT ajeno sin repetir SELECT?
Según la tabla Oracle del tema, no para ninguno de sus tres tipos de cursor.
:::

::: pregunta ¿Cerrar una conexión de pool destruye siempre la conexión física?
No. Normalmente libera la conexión lógica y devuelve la física al pool.
:::

## Fuente y alcance de estos apuntes {#fuentes}



El contenido teórico sigue [*JDBC*, Repositorios de Información, Escuela de Ingeniería Informática, curso 2026–2027](JDBC_original.pdf) (60 páginas de archivo, numeración interna de las diapositivas hasta 60/66). Se han preservado las condiciones, la tabla de visibilidad y los ejercicios; se han añadido aclaraciones técnicas donde una afirmación dependía del driver o del esquema. En el PDF la numeración de secciones salta de 3 a 5. La fuente original se puede consultar íntegra desde esta web.

La correspondencia con los seis proyectos procede del índice aportado en la conversación. No se han recibido sus 26 archivos para verificar líneas de código, dependencias, instrucciones exactas de compilación ni resultados de ejecución. Los bloques Java de esta web son ejemplos didácticos independientes, claramente identificados.

### Lecturas complementarias citadas en el PDF

El material incluye referencias sobre carga de drivers, `ResultSet` Oracle, `DataSource` y `RowSet`. Para estudiar el examen, las diapositivas son la fuente principal. Puedes encontrar los enlaces completos en sus páginas 58–60; la [lectura de Oracle sobre DataSource](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html) es la referencia [8] que recomienda para JNDI.
