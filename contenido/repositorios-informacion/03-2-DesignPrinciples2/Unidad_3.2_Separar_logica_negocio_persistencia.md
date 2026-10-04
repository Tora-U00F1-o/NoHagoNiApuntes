---
id: separar-logica-negocio-persistencia
asignatura: Repositorios de Información
unidad: 3.2
titulo: Separar la Lógica de Negocio de la Persistencia
orden: 3.2
resumen: Separación entre negocio y persistencia mediante DAO, Row Data Gateway, Table Data Gateway, factorías, Transaction Scripts y Command.
fuente: 3.2.DesignPrinciplesES.pdf
---

# Separar la Lógica de Negocio de la Persistencia

Esta unidad continúa la separación de responsabilidades iniciada con el patrón **Layers**. El problema que se estudia ahora es que la capa `service` sigue conteniendo tanto **lógica de negocio** como **detalles de persistencia**: SQL, conexiones, nombres de tablas y columnas y dependencias con una tecnología concreta.

La solución propuesta consiste en dividir esa responsabilidad en dos partes:

- **Lógica de negocio:** capa `service`.
- **Acceso a datos:** capa `persistence`.

A partir de esta separación, el documento introduce patrones para ambas capas:

- **Persistencia:** DAO, Row Data Gateway y Table Data Gateway.
- **Creación de gateways:** Abstract Factory, Factory Method y Simple Factory.
- **Negocio:** Transaction Script y Command.

[Abrir el documento original](3.2.DesignPrinciplesES.pdf).

::: cifras
2 | capas que se separan: service y persistence
3 | formas de implementar o estructurar el acceso mediante gateways
3 | alternativas de factoría consideradas
2 | patrones de negocio desarrollados: Transaction Script y Command
46 | diapositivas
:::

## Ideas principales de la unidad {#ideas-principales}

- La capa de negocio no debería depender directamente de JDBC, SQL ni del esquema físico de la base de datos.
- El patrón **DAO** separa la lógica de negocio del acceso a los datos.
- **Row Data Gateway** representa una fila mediante un objeto.
- **Table Data Gateway** organiza las operaciones alrededor de una tabla o vista.
- DAO y TDG no organizan el acceso exactamente igual: uno gira alrededor de conceptos del dominio y el otro alrededor de tablas.
- Las factorías permiten centralizar la creación de implementaciones concretas de gateways.
- **Transaction Script** organiza cada operación de negocio como un procedimiento o script transaccional.
- **Command** encapsula los Transaction Scripts en objetos y permite centralizar código común, especialmente la gestión de transacciones.

::: proceso
Service con negocio + persistencia → Service + Persistence → DAO / Gateways → Factoría → Transaction Scripts → Command
:::

## 1. Problema de la capa `service` actual {#problema-service}

El documento comienza mostrando que la capa `service` todavía conoce demasiados detalles de persistencia.

[Ver diapositivas 1–3](3.2.DesignPrinciplesES.pdf#page=1).

En el código aparecen elementos como:

```java title="Fragmento de la capa service actual" origen="diapositiva 2"
private static final String ADDMECHANIC =
    " insert into TMechanics ... ";

...

public MechanicDto execute()
        throws BusinessException {
    ...
    c = Jdbc.getConnection(...);
    pst = c.prepareStatement(ADDMECHANIC);
    pst.setString(1, mechanic.id);
    pst.setString(2, mechanic.nif);
    ...
    pst.executeUpdate();
    ...
}
```

También aparecen los datos y la creación de la conexión:

```java title="Creación de conexión" origen="diapositiva 2"
URL = ConnectionProperties
    .getProperty("DB_URL");
USER = ConnectionProperties
    .getProperty("DB_USER");
PASS = ConnectionProperties
    .getProperty("DB_PASS");

Connection createThreadConnection()
        throws SQLException {

    Connection con = DriverManager
        .getConnection(URL, USER, PASS);

    threadConnection.set(con);
    return con;
}
```

El PDF plantea qué ocurre si:

- cambia la tecnología;
- se añade un *pool* de conexiones;
- cambian los datos de conexión de la BBDD;
- cambia el nombre de la tabla o de las columnas.

El problema común es que **la capa de negocio conoce detalles que pertenecen al acceso a datos**.

### Separación propuesta

La diapositiva 3 propone dividir la capa actual:

| Responsabilidad | Capa |
| --- | --- |
| Lógica de negocio | `service` |
| Acceso a datos | `persistence` |

Para la capa de acceso a datos se introducen:

- **DAO (Data Access Object)**: interfaz de acceso a datos independiente de la tecnología.
- **Table Data Gateway**: posible implementación basada en tablas.

Para la capa de negocio se introducen:

- **Transaction Scripts**.
- **Command**.

[Ver separación propuesta](3.2.DesignPrinciplesES.pdf#page=3).

## 2. Persistencia: patrón DAO {#dao}

[Ver diapositivas 4–9](3.2.DesignPrinciplesES.pdf#page=4).

### Fuentes de patrones de acceso a datos

El documento remite a:

- Martin Fowler, *Patterns of Enterprise Application Architecture*.
- J2EE Patterns.

La diapositiva muestra dentro de los patrones de fuente de datos:

- **Table Data Gateway**.
- **Row Data Gateway**.
- **Active Record**.
- **Data Mapper**.

La unidad desarrolla especialmente DAO, Row Data Gateway y Table Data Gateway.

### Definición de DAO

El patrón **DAO (Data Access Object)** separa la lógica de negocio del acceso a los datos.

La aplicación trabaja con objetos DAO y son esos objetos los que se encargan de comunicarse con la fuente de datos.

La consecuencia fundamental es:

> **La capa de negocio no necesita saber cómo se accede a la base de datos.**

[Ver definición de DAO](3.2.DesignPrinciplesES.pdf#page=6).

### Responsabilidades de un DAO

Los objetos DAO:

1. **Abstraen y centralizan el acceso a la fuente de datos.**
2. Ofrecen una interfaz con operaciones de acceso y manipulación de datos **independiente de su implementación**.
3. Transforman los datos obtenidos en **objetos Java**.
4. Desacoplan la capa `service` de los detalles de **almacenamiento y recuperación**.

### Participantes del patrón

El diagrama de la diapositiva 8 identifica:

| Participante | Función |
| --- | --- |
| Cliente | Necesita acceso a la fuente de datos |
| DAO | Separa el acceso a datos de la fuente |
| DataSource | Fuente de datos |
| Resultado de la consulta | Datos obtenidos de la fuente |
| `ResultSet` | Resultado en una implementación JDBC |
| Transfer Object | Información devuelta a la aplicación |

[Ver diagrama de clases](3.2.DesignPrinciplesES.pdf#page=8).

### Principales ventajas de DAO

#### 1. Separación de responsabilidades

- La lógica de negocio no necesita conocer los detalles del acceso a datos.
- El DAO centraliza las operaciones de persistencia.

#### 2. Desacoplamiento y mantenimiento

- Es posible modificar la implementación del acceso a datos sin afectar a la lógica de negocio.
- El documento pone como ejemplo cambiar la tecnología de persistencia manteniendo la misma interfaz.

#### 3. Reutilización y centralización

- Las operaciones de acceso a datos quedan concentradas en un único componente.
- Se evita duplicar código en distintos puntos de la aplicación.

#### 4. Pruebas unitarias

- Pueden utilizarse implementaciones simuladas (*mock*) del DAO.
- La lógica de negocio puede probarse sin depender de una base de datos real.

::: pregunta ¿Qué consigue DAO respecto a la capa service?
Hace que `service` trabaje contra una interfaz de acceso a datos y deje de conocer los detalles concretos de almacenamiento, recuperación y tecnología de persistencia.
:::

## 3. Posibles implementaciones de DAO {#implementaciones-dao}

El documento estudia dos patrones de gateway como posibles formas de estructurar el acceso:

- **Row Data Gateway**.
- **Table Data Gateway**.

[Ver diapositiva 10](3.2.DesignPrinciplesES.pdf#page=10).

## 4. Row Data Gateway {#row-data-gateway}

[Ver diapositivas 11–14](3.2.DesignPrinciplesES.pdf#page=11).

### Idea principal

Un objeto **Row Data Gateway** representa **una única fila de una tabla**.

El documento establece:

- cada fila se representa mediante exactamente un objeto en memoria;
- cada atributo del objeto corresponde a una columna;
- sus métodos permiten crear, actualizar o eliminar esa fila;
- un **Finder** ejecuta las consultas y crea los objetos Row Data Gateway correspondientes;
- el gateway **no contiene lógica de negocio**, únicamente código de acceso y persistencia.

::: proceso
Fila de tabla ↔ Objeto Row Data Gateway
:::

### Finder

La consulta y creación de los objetos se separa mediante un objeto **Finder**.

El Finder:

1. ejecuta la consulta;
2. localiza la fila o filas;
3. crea los objetos gateway correspondientes.

El diagrama de la diapositiva 12 muestra esta colaboración entre `PersonFinder`, la base de datos y los objetos `PersonGateway`.

[Ver diagrama](3.2.DesignPrinciplesES.pdf#page=12).

### Ejemplo `MechanicGateway` en CWS

El PDF muestra una adaptación de Row Data Gateway para mecánicos:

```java title="MechanicGateway" origen="diapositiva 13"
public class MechanicGateway {

    private final String id; // read-only!
    private long version;
    private String nif;
    ...

    public MechanicGateway(String nif, ...) {
        this.id = UUID.randomUUId();
        ...
        this.version = 1L;
    }

    public void add() {
        try (Connection c = ...;
             PreparedStatement pst = ...) {

            pst.setString(1, id);
            ...
            pst.executeUpdate();

        } catch (SQLException e) {
            ...
        }
    }

    public void delete() {
        try (Connection c = ...;
             PreparedStatement ps = ...) {

            ps.setString(1, id);
            ps.executeUpdate();
        }
    }

    public void update() {
        try (Connection c = ...;
             PreparedStatement ps = ...) {

            ps.setString(1, nif);
            ps.setString(2, name);
            ps.executeUpdate();
        }
    }
}
```

El Finder aparece separado:

```java title="FindMechanic" origen="diapositiva 13"
class FindMechanic {

    private String findAll =
        "SELECT * from TMechanics ...";

    public MechanicGateway findById(int id) {

        try (Connection c = ...;
             PreparedStatement pst = ...;
             ResultSet rs = pst.executeQuery()) {

            if (rs.next()) {
                return new MechanicGateway(
                    rs.getString(),
                    rs.getString(),
                    ...
                );
            }

            return result;

        } catch (SQLException ex) {
            throw new RuntimeException(ex.Message);
        }
    }
}
```

Los puntos suspensivos forman parte del fragmento mostrado en la diapositiva.

### Ventajas

- Está centrado en el acceso a datos.
- Su estructura es similar a la tabla.
- Es fácil de implementar en dominios sencillos.

### Inconvenientes

- Existe un **fuerte acoplamiento entre objetos y esquema de la BBDD**.
- Resulta difícil de escalar en dominios complejos.
- La capa de servicio necesita conocer cómo están organizados los datos:
  - qué tablas existen;
  - cómo se relacionan;
  - qué campos necesita.

El documento pone como ejemplo el caso de **borrar un mecánico**.

## 5. Table Data Gateway {#table-data-gateway}

[Ver diapositivas 15–19](3.2.DesignPrinciplesES.pdf#page=15).

### Definición

El patrón **Table Data Gateway (TDG)** organiza el acceso a los datos mediante **una clase asociada a una tabla o vista**.

Esa clase concentra las operaciones de consulta y modificación.

### Interfaz del gateway

Un TDG ofrece:

- un único método para cada operación de:
  - inserción;
  - actualización;
  - eliminación;
- varios métodos de consulta, incluso para consultas complejas.

El documento pone como ejemplo:

> encontrar mecánicos con intervenciones pendientes.

Cada método:

1. recibe parámetros;
2. ejecuta la sentencia SQL correspondiente;
3. puede devolver un resultado utilizando el patrón **DTO**.

El TDG **no contiene lógica de negocio**: su única responsabilidad es acceder a los datos de la tabla.

### Diferencia entre DAO y TDG

El PDF resume la diferencia así:

| DAO | TDG |
| --- | --- |
| Organiza el acceso alrededor de conceptos del dominio | Organiza el acceso alrededor de tablas de la BBDD |
| `MechanicDao`, `WorkOrderDao`, `InvoiceDao` | `MechanicsGateway`, `WorkOrdersGateway`, `InvoicesGateway` |

[Ver comparación DAO–TDG](3.2.DesignPrinciplesES.pdf#page=16).

### Estructura

La diapositiva 17 muestra un `PersonGateway` relacionado directamente con la tabla `person`, con métodos de consulta, inserción, actualización y borrado.

[Ver diagrama](3.2.DesignPrinciplesES.pdf#page=17).

### Ventajas

- Centraliza el acceso a la base de datos.
- Facilita el mantenimiento y evolución del código.
- Proporciona una interfaz sencilla para trabajar con la tabla.
- Su implementación sencilla puede acelerar el desarrollo inicial.

### Inconvenientes

- Está muy acoplado al esquema de la base de datos.
- Puede crecer demasiado si concentra demasiadas consultas.
- Tiene escalabilidad limitada si provoca que la lógica de aplicación conozca detalles de persistencia.

### Secuencia de funcionamiento

El diagrama de la diapositiva 19 muestra la colaboración entre:

- cliente;
- TDG;
- `DataSource`;
- `ResultSet`;
- `TransferObject`.

De forma general:

::: proceso
Cliente → TDG → DataSource → ResultSet → Transfer Object → Cliente
:::

[Ver diagrama de secuencia](3.2.DesignPrinciplesES.pdf#page=19).

## 6. Ejercicio de refactorización con DAO/TDG {#ejercicio-dao-tdg}

La diapositiva 20 plantea un ejercicio amplio que después se reorganiza en las diapositivas 21–23.

[Ver ejercicio original](3.2.DesignPrinciplesES.pdf#page=20).

::: practica Aplicar DAO/TDG a UpdateMechanic y DeleteMechanic

### 1. Identificar participantes

A partir del diagrama del patrón DAO, identificar en el código:

- `Client`;
- `Data Access Object`;
- `DataSource`;
- `Transfer Object`.

### 2. Detectar acceso directo a la BBDD

En `DeleteMechanic` y `UpdateMechanic`:

- localizar las instrucciones que realizan operaciones directas de acceso a datos;
- determinar qué responsabilidad debería trasladarse a la capa de persistencia.

### 3. Diseñar los TDG

Suponiendo un TDG por tabla, determinar cuáles son necesarios para las operaciones de `UpdateMechanic` y `DeleteMechanic`.

Para cada uno indicar:

- qué tabla representa;
- qué métodos proporciona;
- qué parámetros recibe cada método;
- qué devuelve.

### 4. Implementar `MechanicGateway`

Implementar los métodos necesarios para sustituir el acceso directo a datos de `UpdateMechanic` y `DeleteMechanic`.

Los métodos del gateway:

- **no deben contener reglas de negocio**;
- solo deben encargarse del acceso a la fuente de datos.

### 5. Diseñar otros gateways

A partir de las consultas de `DeleteMechanic` y `UpdateMechanic`, determinar los métodos necesarios en:

- `InterventionGateway`;
- `WorkOrderGateway`.

Para cada método indicar:

- nombre;
- parámetros;
- valor devuelto.

El ejercicio plantea además:

- si es necesario recuperar todos los registros;
- o si basta con comprobar si existe alguno;
- qué método debería diseñarse para cada caso.

### 6. Objetos de transferencia

Determinar qué objetos de transferencia son necesarios para representar los registros obtenidos.

Analizar si pueden reutilizarse los DTO existentes en CWS y justificarlo.

### 7. Ubicación de los DTO

Indicar:

- en qué capa debería definirse cada tipo de DTO;
- qué información debería contener.

### 8. Refactorizar `DeleteMechanic`

Reescribir `DeleteMechanic` aplicando DAO/TDG.

Debe:

- mantener las mismas reglas de negocio;
- dejar de realizar directamente operaciones sobre la base de datos.

Hay que identificar:

- qué código permanece en `DeleteMechanic`;
- qué código se traslada a los gateways.

### 9. Comparar el acoplamiento

Comparar la versión original y la basada en DAO/TDG.

Analizar:

- qué dependencias con la base de datos tenía `DeleteMechanic`;
- cuáles conserva después;
- qué tipo de acoplamiento se ha reducido.

### 10. Cambio de tecnología

Responder qué ocurriría si JDBC se sustituyera por otra tecnología de persistencia:

- qué clases deberían modificarse;
- qué clases no deberían modificarse.
:::

Las diapositivas 21–23 vuelven a presentar esta actividad agrupándola en siete apartados:

1. identificación del patrón;
2. responsabilidades;
3. diseño de los TDG;
4. implementación de `MechanicGateway`;
5. DTO;
6. refactorización;
7. análisis del acoplamiento.

## 7. Interfaces de gateway y DTO de persistencia {#interfaces-gateway}

La diapositiva 24 muestra una interfaz genérica `Gateway<T>`.

[Ver código](3.2.DesignPrinciplesES.pdf#page=24).

```java title="Gateway.java" origen="diapositiva 24"
public interface Gateway<T> {

    void add(T t)
        throws PersistenceException;

    void remove(String id)
        throws PersistenceException;

    void update(T t)
        throws PersistenceException;

    Optional<T> findById(String id)
        throws PersistenceException;

    List<T> findAll()
        throws PersistenceException;
}
```

A partir de ella se especializa `MechanicGateway`:

```java title="MechanicGateway.java" origen="diapositiva 24"
public interface MechanicGateway
        extends Gateway<MechanicRecord> {

    Optional<MechanicRecord>
        findByNif(String nif)
        throws PersistenceException;

    public static class MechanicRecord {
        public String id;
        public Long version;
        public LocalDateTime createdAt;
        public LocalDateTime updatedAt;
        public String entityState;

        public String nif;
        public String name;
        public String surname;
    }
}
```

La idea destacada en la diapositiva es:

> **El DTO es una copia del contenido de la base de datos.**

En este ejemplo, `MechanicRecord` representa la información de persistencia utilizada por el gateway.

## 8. Creación de los TDG: factorías {#factorias-gateway}

Cuando existen varios gateways, por ejemplo:

- `MechanicGateway`;
- `WorkOrderGateway`;
- otros gateways del sistema;

el documento plantea cómo crearlos de manera flexible.

[Ver diapositiva 25](3.2.DesignPrinciplesES.pdf#page=25).

Se consideran:

1. **Abstract Factory**.
2. **Factory Method**.
3. **Class Factory o Simple Factory**, marcada como **opción preferida**.

También se menciona la posibilidad de una **estrategia de generación automática del código TDG**.

## 9. Abstract Factory {#abstract-factory}

[Ver diapositivas 26–28](3.2.DesignPrinciplesES.pdf#page=26).

### Definición

**Abstract Factory** es un patrón creacional que proporciona una interfaz para crear **familias de objetos relacionados** sin especificar sus clases concretas.

El documento señala que resulta útil si la base de datos puede cambiar:

- de tecnología;
- de proveedor.

El acoplamiento queda concentrado y el cliente sufre cambios mínimos.

### Ejemplo con gateways

Sin Abstract Factory:

```java title="Sin Abstract Factory" origen="diapositiva 27"
OracleMechanicGateway m = new OracleMechanicGatewayImpl();
OracleInterventionGateway i = new OracleInterventionGatewayImpl();
```

Un cambio a HSQL obliga a cambiar las implementaciones conocidas por el cliente:

```java title="Cambio de implementación" origen="diapositiva 27"
HsqlMechanicGateway m = new HsqlMechanicGatewayImpl();
HsqlInterventionGateway i = new HsqlInterventionGatewayImpl();
```

Con Abstract Factory:

```java title="Con Abstract Factory - Oracle" origen="diapositiva 27"
GatewayFactory factory = new OracleFactory();
Gateway m = factory.createMechanicGateway();
Gateway i = factory.createInterventionGateway();
```

y para HSQL:

```java title="Con Abstract Factory - HSQL" origen="diapositiva 27"
GatewayFactory factory = new HsqlFactory();
Gateway m = factory.createMechanicGateway();
Gateway i = factory.createInterventionGateway();
```

La diferencia principal es que el cliente solicita los gateways a una factoría común.

La diapositiva 28 muestra el diagrama UML de esta organización.

[Ver diagrama](3.2.DesignPrinciplesES.pdf#page=28).

## 10. Factory Method {#factory-method}

[Ver diapositiva 29](3.2.DesignPrinciplesES.pdf#page=29).

El **Factory Method** es un patrón de diseño creacional que:

- define una interfaz para crear un objeto;
- deja que las subclases decidan qué clase concreta instanciar.

El diagrama del documento muestra una jerarquía de factorías de `MechanicGateway`, con factorías concretas para diferentes implementaciones.

## 11. TDG y Simple Factory {#tdg-simple-factory}

La diapositiva 30 aplica **Simple Factory** a la creación de los gateways.

[Ver diagrama](3.2.DesignPrinciplesES.pdf#page=30).

En el diagrama aparecen:

- comandos o clases de negocio;
- una factoría de persistencia;
- la interfaz `MechanicGateway`;
- la implementación concreta del gateway;
- la configuración necesaria para decidir qué implementación proporcionar.

El documento había indicado en la diapositiva 25 que **Class Factory o Simple Factory es la opción preferida** entre las alternativas presentadas para este caso.

## 12. Separar la lógica de negocio: patrones de `service` {#patrones-negocio}

[Ver diapositivas 31–34](3.2.DesignPrinciplesES.pdf#page=31).

Una vez separada la persistencia, la pregunta pasa a ser:

> **¿Cómo organizar el código dentro de la capa de negocio?**

El documento enumera tres posibles patrones:

- **Transaction Scripts**, indicado como el más simple.
- **Domain Model**.
- **Table Module**.

::: aviso Alcance del documento
En estas diapositivas se enumeran `Domain Model` y `Table Module`, pero el desarrollo posterior de la unidad se centra en **Transaction Scripts** y **Command**.
:::

## 13. Transaction Script {#transaction-script}

### Definición

Un **Transaction Script** organiza la lógica de negocio en procedimientos o *scripts*.

Cada uno implementa **una operación de negocio completa ejecutada de forma transaccional**.

Un Transaction Script:

1. recibe los datos necesarios;
2. valida y procesa los datos;
3. accede a la base de datos mediante patrones de acceso a datos;
4. devuelve el resultado.

### Formas de organizar los scripts

El PDF propone dos posibilidades:

- agruparlos en una misma clase, donde cada script es un procedimiento;
- colocar cada script en su propia clase, por ejemplo utilizando **Command**.

### Ventajas

- Ideal para sistemas con poca lógica de negocio.
- Modelo procedimental simple y fácil de entender.
- Baja sobrecarga de rendimiento.
- Funciona bien con capas de datos simples, como:
  - Row Data Gateway;
  - Table Data Gateway.

### Desventajas

- Es difícil asegurar que la invocación sea transaccional.
- Existe riesgo de duplicar código relacionado con transacciones.
- No resulta adecuado para modelos de dominio complejos.

### Ejercicio: identificar los Transaction Scripts

La diapositiva 35 pregunta, para la gestión de mecánicos:

- cuáles son los Transaction Scripts;
- qué es necesario para que su ejecución sea transaccional.

Se recuerdan estas operaciones JDBC:

```java
conn.setAutoCommit(boolean autoCommit);
conn.commit();
conn.rollback();
```

[Ver ejercicio](3.2.DesignPrinciplesES.pdf#page=35).

### Separación entre script y gateway

La diapositiva 36 muestra la división conceptual:

```java title="AddMechanic" origen="diapositiva 36"
class AddMechanic {

    private MechanicGateway mg = ...;
    private MechanicDto dto;

    public AddMechanic(MechanicDto arg) {
        ...
    }

    public MechanicBLDto execute()
            throws ... {

        checkNotExist();
        // mg.findByNif();

        checkCanBeDeleted();

        insertMechanic();
        // mg.add(m);

        return dto;
    }
}
```

Mientras que el gateway se ocupa del acceso a datos:

```java title="MechanicGateway" origen="diapositiva 36"
class MechanicGateway {

    public Optional<MechanicRecord>
        findByNif(nif) {

        // connect
        // exec query
        // return dto
    }

    public void add(MechanicRecord m) {

        // connect
        // exec insert
    }
}
```

La separación pretende que el Transaction Script conserve las **reglas de negocio** y delegue la persistencia en los gateways.

## 14. Problema repetido: gestión de transacciones {#gestion-transacciones}

Los Transaction Scripts tienen una estructura parecida y tienden a repetir el mismo código:

1. obtener una conexión;
2. desactivar `autocommit`;
3. ejecutar las operaciones;
4. hacer `commit`;
5. hacer `rollback` si ocurre un error.

La diapositiva 37 lo ejemplifica:

```java title="Gestión repetida de transacción" origen="diapositiva 37"
class AddMechanic {

    public MechanicDto execute() {

        try (Connection c = ...) {

            c.setAutoCommit(false);

            gateway.findByNif();
            gateway.add();

            c.commit();

        } catch (SQLException e) {
            c.rollback();
            ...
        }

        return dto;
    }
}
```

Este código común repetido motiva la introducción del patrón **Command**.

## 15. Patrón Command {#command}

[Ver diapositivas 37–43](3.2.DesignPrinciplesES.pdf#page=37).

### Idea principal

El patrón **Command** permite encapsular cada operación de negocio, es decir, cada Transaction Script, en un objeto.

Además permite **delegar la ejecución del código común**, evitando repetirlo.

El documento destaca:

- cada operación se encapsula en un objeto `Command`;
- las operaciones se ejecutan mediante una **interfaz común**;
- la gestión de la transacción se **centraliza**.

### Clases principales

| Clase / elemento | Responsabilidad |
| --- | --- |
| `Command` | Interfaz con un método común `execute()` |
| Comandos concretos | Implementan `execute()` con la lógica de cada operación |
| `CommandExecutor` | Recibe un `Command` y lo ejecuta |
| Cliente | Crea el `Command` y lo entrega al executor |

`CommandExecutor` puede centralizar lógica común como:

- transacciones;
- control de errores;
- logs;
- otras tareas comunes.

El diagrama del documento muestra como comandos concretos:

- `AddMechanic`;
- `DeleteMechanic`;
- `ListAllMechanics`.

[Ver diagrama](3.2.DesignPrinciplesES.pdf#page=38).

### Relación con la fachada

El diagrama de la diapositiva 40 muestra `MechanicCrudServiceImpl` utilizando un `CommandExecutor`, que a su vez ejecuta comandos concretos como:

- `AddMechanic`;
- `DeleteMechanic`;
- `CreateInvoice`.

[Ver diagrama](3.2.DesignPrinciplesES.pdf#page=40).

### Implementación de `CommandExecutor`

El documento proporciona esta implementación:

```java title="CommandExecutor.java" origen="diapositiva 41"
public class CommandExecutor {

    public <T> T execute(Command<T> cmd)
            throws BusinessException {

        try (Connection c =
                Jdbc.createThreadConnection()) {

            try {
                c.setAutoCommit(false);

                T res = cmd.execute();

                c.commit();
                return res;

            } catch (BusinessException e) {
                c.rollback();
                throw e;
            }

        } catch (SQLException |
                 PersistenceException e) {

            throw new RuntimeException(e);
        }
    }
}
```

Aquí la apertura de conexión, desactivación de `autocommit`, `commit` y `rollback` quedan concentrados en el executor.

[Ver código original](3.2.DesignPrinciplesES.pdf#page=41).

### Ventajas

El PDF señala dos:

1. **Desacoplamiento:** separa las clases que invocan una operación de la clase que sabe cómo realizarla.
2. **Extensibilidad:** puede añadirse un nuevo `Command` sin modificar el código existente.

[Ver ventajas](3.2.DesignPrinciplesES.pdf#page=42).

::: practica Refactorización con Command
Suponiendo el `CommandExecutor` de la diapositiva 41:

1. reescribe un Transaction Script;
2. reescribe el código de la fachada que llama a ese Transaction Script.
:::

[Ver ejercicio](3.2.DesignPrinciplesES.pdf#page=43).

## 16. Evolución completa del diseño {#evolucion}

La unidad puede seguirse como una secuencia de problemas y soluciones:

| Situación | Problema | Solución |
| --- | --- | --- |
| `service` inicial | Negocio y persistencia mezclados | Separar `service` y `persistence` |
| Negocio accede directamente a JDBC | Acoplamiento con tecnología y esquema | DAO |
| Necesidad de organizar persistencia | Representar filas o tablas | Row Data Gateway / Table Data Gateway |
| Existen muchos gateways concretos | El cliente conoce implementaciones | Factorías |
| Operaciones de negocio separadas | Cada operación necesita estructura transaccional | Transaction Script |
| Los scripts repiten `commit`/`rollback` | Código transversal duplicado | Command + `CommandExecutor` |

::: proceso
Negocio + JDBC → DAO/TDG → Factoría → Transaction Script → CommandExecutor
:::

## 17. Comparaciones importantes {#comparaciones}

### DAO frente a TDG

| Aspecto | DAO | Table Data Gateway |
| --- | --- | --- |
| Organización | Conceptos del dominio | Tablas o vistas |
| Ejemplo | `MechanicDao` | `MechanicsGateway` |
| Objetivo | Abstraer acceso a datos | Centralizar operaciones sobre una tabla |
| Dependencia del esquema | Puede ocultarse detrás de la interfaz | El patrón está orientado explícitamente a la tabla |

### Row Data Gateway frente a Table Data Gateway

| Aspecto | Row Data Gateway | Table Data Gateway |
| --- | --- | --- |
| Representación | Un objeto por fila | Una clase por tabla o vista |
| Operaciones | Sobre una fila concreta | Sobre el conjunto de filas de la tabla |
| Consultas | Se apoyan en un Finder | Métodos de consulta en el propio gateway |
| Adecuación | Dominios sencillos | Acceso centralizado por tablas |

### Transaction Script frente a Command

| Aspecto | Transaction Script | Command |
| --- | --- | --- |
| Qué representa | Una operación de negocio | Un objeto que encapsula esa operación |
| Organización | Procedimiento/script | Clase que implementa interfaz común |
| Gestión transaccional | Puede repetirse en cada script | Puede centralizarse en `CommandExecutor` |
| Extensibilidad | Añadir scripts puede repetir estructura | Nuevo comando sin cambiar el executor |

## 18. Errores frecuentes y advertencias {#advertencias}

::: aviso DAO
DAO no significa que la lógica de negocio desaparezca. La lógica permanece en `service`; lo que se extrae es el acceso y manipulación de los datos.
:::

::: aviso Gateways
Tanto Row Data Gateway como Table Data Gateway deben contener **acceso a datos**, no reglas de negocio.
:::

::: aviso TDG
Table Data Gateway organiza el código alrededor de tablas. El propio documento advierte de que esto puede producir un acoplamiento fuerte con el esquema de la BBDD.
:::

::: aviso DTO
En la diapositiva 24 el DTO de persistencia se describe como una copia del contenido de la base de datos. No debe confundirse automáticamente con cualquier DTO utilizado en otras capas; el ejercicio del tema pide precisamente analizar si los DTO ya existentes pueden reutilizarse.
:::

::: aviso Factorías
La unidad considera Abstract Factory, Factory Method y Simple Factory. Para la creación de TDG, la diapositiva 25 señala **Class Factory o Simple Factory como opción preferida**.
:::

::: aviso Transaction Script
El documento enumera también `Domain Model` y `Table Module`, pero no los desarrolla en esta unidad. No se añaden aquí explicaciones externas sobre ellos.
:::

## 19. Preguntas de repaso {#repaso}

::: pregunta ¿Qué problema se pretende resolver al separar `service` y `persistence`?
Evitar que la lógica de negocio conozca detalles como JDBC, SQL, conexiones, nombres de tablas y columnas o la tecnología concreta utilizada para persistir.
:::

::: pregunta ¿Cuál es la responsabilidad fundamental de un DAO?
Centralizar y abstraer el acceso a los datos para que la capa de negocio no conozca cómo se realiza la persistencia.
:::

::: pregunta ¿Qué representa un Row Data Gateway?
Una única fila de una tabla mediante un objeto cuyos atributos corresponden a columnas de esa fila.
:::

::: pregunta ¿Qué representa un Table Data Gateway?
Una tabla o vista mediante una clase que concentra las operaciones de consulta y modificación sobre ella.
:::

::: pregunta ¿Cuál es la diferencia principal entre DAO y TDG según el documento?
DAO organiza el acceso alrededor de conceptos del dominio; TDG lo organiza alrededor de tablas de la base de datos.
:::

::: pregunta ¿Por qué se introduce una factoría para los gateways?
Porque suelen existir varios gateways y se quiere evitar que los clientes dependan directamente de sus implementaciones concretas.
:::

::: pregunta ¿Qué es un Transaction Script?
Un procedimiento o script que implementa una operación de negocio completa ejecutada de forma transaccional.
:::

::: pregunta ¿Qué problema motiva la aplicación de Command?
La repetición del código común de gestión de transacciones: conexión, `setAutoCommit(false)`, ejecución, `commit` y `rollback`.
:::

::: pregunta ¿Qué centraliza `CommandExecutor`?
La ejecución de los comandos y la lógica común, especialmente la gestión transaccional, además de poder centralizar control de errores o logs.
:::

## 20. Resumen final {#resumen}

El punto de partida de la unidad es una capa `service` que todavía mezcla **negocio y persistencia**. El código de negocio conoce SQL, JDBC, conexiones y estructura de tablas, por lo que cambios de tecnología o esquema pueden propagarse por la aplicación.

Para corregirlo se introduce una capa `persistence` y el patrón **DAO**, que abstrae el acceso a datos. La unidad estudia dos formas de estructurar ese acceso: **Row Data Gateway**, donde un objeto representa una fila, y **Table Data Gateway**, donde una clase concentra las operaciones de una tabla o vista.

Como suelen existir varios gateways y diferentes implementaciones, se presentan **Abstract Factory**, **Factory Method** y **Simple Factory**, siendo esta última la opción preferida indicada por el documento para el caso estudiado.

En la capa de negocio, cada operación puede organizarse mediante **Transaction Script**. Como estos scripts repiten la misma gestión de transacciones, se introduce **Command**, que encapsula cada operación de negocio en un objeto y permite delegar la lógica transversal en un `CommandExecutor`.

La evolución completa queda:

::: proceso
Service acoplado a JDBC → DAO/TDG → Factorías → Transaction Scripts → Command
:::

Cada patrón responde a un problema concreto de separación de responsabilidades y reducción del acoplamiento.

## Referencias al documento original {#referencias}

- [Problema inicial y separación de capas](3.2.DesignPrinciplesES.pdf#page=1)
- [DAO](3.2.DesignPrinciplesES.pdf#page=6)
- [Row Data Gateway](3.2.DesignPrinciplesES.pdf#page=11)
- [Table Data Gateway](3.2.DesignPrinciplesES.pdf#page=15)
- [Ejercicios DAO/TDG](3.2.DesignPrinciplesES.pdf#page=20)
- [Interfaces de gateways y DTO](3.2.DesignPrinciplesES.pdf#page=24)
- [Factorías para TDG](3.2.DesignPrinciplesES.pdf#page=25)
- [Abstract Factory](3.2.DesignPrinciplesES.pdf#page=26)
- [Factory Method](3.2.DesignPrinciplesES.pdf#page=29)
- [Simple Factory](3.2.DesignPrinciplesES.pdf#page=30)
- [Transaction Scripts](3.2.DesignPrinciplesES.pdf#page=33)
- [Command](3.2.DesignPrinciplesES.pdf#page=37)
- [CommandExecutor](3.2.DesignPrinciplesES.pdf#page=41)
- [Ejercicio final](3.2.DesignPrinciplesES.pdf#page=43)
- [Lecturas complementarias](3.2.DesignPrinciplesES.pdf#page=44)
- [Abrir el documento completo](3.2.DesignPrinciplesES.pdf)
