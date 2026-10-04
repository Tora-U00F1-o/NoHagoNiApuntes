---
id: patrones-estandares-acceso-datos
asignatura: Repositorios de Información
unidad: 3
titulo: Patrones y estándares de acceso a datos
orden: 4
resumen: Atributos de calidad, diagnóstico de CWS0 y aplicación de Layers, Fachada y Factoría Simple.
fuente: 3.DesignPrinciplesES (1).pdf
---

# Patrones y estándares de acceso a datos

Esta unidad estudia cómo determinados problemas de diseño afectan a la **mantenibilidad, reusabilidad, extensibilidad y escalabilidad** de una aplicación, y cómo pueden abordarse mediante patrones y decisiones de organización del software.

El documento parte del proyecto **CWS0**, donde la interacción con el usuario, la lógica de negocio y el acceso a datos aparecen mezclados en las mismas clases. A partir de ese diagnóstico se introducen, en este orden, el patrón arquitectónico **Layers**, el patrón **Fachada** y la **Factoría Simple**.

[Abrir el documento original](3.DesignPrinciplesES%20(1).pdf).

::: cifras
4 | atributos de calidad estudiados
3 | capas principales
3 | patrones o soluciones de diseño desarrollados
49 | diapositivas
:::

## Ideas principales de la unidad {#ideas-principales}

- Analizar un diseño no solo por si funciona, sino también por los **atributos de calidad** que facilita o dificulta.
- Detectar responsabilidades mezcladas, código disperso y dependencias con implementaciones concretas.
- Relacionar cada problema de diseño con el atributo de calidad afectado.
- Separar responsabilidades mediante **Layers**.
- Reducir el conocimiento que el cliente tiene del subsistema mediante **Fachada**.
- Encapsular la creación de implementaciones concretas mediante **Simple Factory**.
- Evaluar no solo las ventajas de una solución, sino también el coste o complejidad que introduce.

::: proceso
Problema de diseño → Atributo de calidad → Cambio que se quiere facilitar → Patrón → Consecuencias
:::

## 1. Atributos de calidad para el software {#atributos-calidad}

El documento utiliza cuatro atributos para evaluar el diseño: **mantenibilidad, reusabilidad, extensibilidad y escalabilidad**. No describen exactamente lo mismo; cada uno responde a un tipo distinto de cambio o crecimiento del sistema.

[Ver diapositivas 3–5](3.DesignPrinciplesES%20(1).pdf#page=3).

### Mantenibilidad

La **mantenibilidad** es la facilidad para **localizar y realizar cambios sin tener que modificar partes no relacionadas del sistema**.

La pregunta de referencia del tema es:

> **¿Es fácil cambiar lo que ya existe?**

### Reusabilidad

La **reusabilidad** es la capacidad de utilizar un componente en diferentes partes del código **sin tener que modificarlo**.

El PDF utiliza como ejemplo las bibliotecas, como `Math`.

La pregunta de referencia es:

> **¿Puedo utilizar lo que ya tengo en otro contexto?**

### Extensibilidad

La **extensibilidad** es la facilidad de adaptar el software a cambios de especificación **afectando lo menos posible al software ya existente**.

El documento plantea dos formas de representar un tipo de vehículo:

```java title="Ejemplo Vehicle" origen="diapositiva 4"
class Vehicle {
    String vType;
    // ...
}
```

frente a representar el tipo mediante una clase como `VehicleType`.

La pregunta que propone el PDF es qué cambios exige cada alternativa cuando aparece **un nuevo tipo de vehículo**.

La pregunta de referencia es:

> **¿Es fácil incorporar algo nuevo?**

### Escalabilidad

La **escalabilidad** es la capacidad de manejar el crecimiento del sistema, por ejemplo:

- mayor volumen de datos;
- más usuarios;
- mayor complejidad.

El material relaciona este atributo con ejemplos como **bloqueos frente a MVCC** y con la evolución de la arquitectura de Twitter.

La pregunta de referencia es:

> **¿Qué ocurre cuando el sistema crece?**

### Comparación de los cuatro atributos

| Atributo | Pregunta que plantea el PDF |
| --- | --- |
| Mantenibilidad | ¿Es fácil cambiar lo que ya existe? |
| Reusabilidad | ¿Puedo utilizar lo que ya tengo en otro contexto? |
| Extensibilidad | ¿Es fácil incorporar algo nuevo? |
| Escalabilidad | ¿Qué ocurre cuando el sistema crece? |

::: pregunta ¿Por qué se distinguen estos cuatro atributos?
Porque cada uno analiza un problema diferente: modificar lo existente, reutilizar componentes, incorporar nuevas variantes o soportar el crecimiento del sistema. El PDF los utiliza como criterios para diagnosticar el proyecto inicial y valorar posteriormente los patrones aplicados.
:::

## 2. Diagnóstico del proyecto inicial CWS0 {#diagnostico-cws0}

El punto de partida de la unidad es **CWS0**.

[Ver diapositivas 6–14](3.DesignPrinciplesES%20(1).pdf#page=6).

### Organización inicial

El proyecto está estructurado mediante **paquetes por actores**. Cada paquete contiene:

- menús de texto;
- un subpaquete `action`;
- clases `Action` que implementan las acciones necesarias.

El documento muestra tanto el árbol de paquetes como el diagrama de clases y el diagrama de secuencia de **Gestión de Mecánicos**.

[Ver estructura del proyecto](3.DesignPrinciplesES%20(1).pdf#page=7).

[Ver diagrama de clases](3.DesignPrinciplesES%20(1).pdf#page=8).

[Ver diagrama de secuencia](3.DesignPrinciplesES%20(1).pdf#page=9).

### Ejemplo: `UpdateMechanicAction`

La diapositiva 10 muestra que una misma clase se ocupa de varias tareas:

- pedir datos al usuario;
- comprobar si el mecánico existe;
- actualizarlo;
- abrir conexiones JDBC;
- preparar y ejecutar SQL;
- mostrar el resultado.

El fragmento mostrado en el documento es:

```java title="UpdateMechanicAction.java" origen="diapositiva 10"
public class UpdateMechanicAction
        implements Action {

    private static final String FINDBYID =
        " select * from TMechanics where id = ?";

    private static final String UPDATE =
        " update TMechanics set name =? , surname =? , "
        + " version = version + 1 , updatedat = ?"
        + " where id = ?";

    @Override
    public void execute()
            throws BusinessException {

        // Get info
        String id = Console
            .readString("mechahic id");

        // check mechanic exists
        checkMechanicExists(id);

        // Ask for new data
        String name = Console.readString("Name");
        String sname = Console.readString("Surname");

        // update
        updateMechanic(id, name, sname);

        // Print result
        Console.println("Mechanic updated");
    }

    private void updateMechanic(
            String id,
            String name,
            String surname) {

        try (Connection c = DriverManager
                .getConnection(URL, USER, PASS);
             PreparedStatement pst = c
                .prepareStatement(UPDATE)) {

            pst.setString(1, name);
            pst.setString(2, surname);
            pst.setTimestamp(3, new Timestamp(...));
            pst.setString(4, id);
            pst.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    private void checkMechanicExists(String id)
            throws BusinessException {

        try (Connection c = DriverManager
                .getConnection(URL, USER, PASS);
             PreparedStatement pst = c
                .prepareStatement(FINDBYID)) {

            pst.setString(1, id);

            try (ResultSet rs = pst.executeQuery()) {
                if (!rs.next()) {
                    throw new BusinessException("...");
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
```

El código conserva los puntos suspensivos que aparecen en la propia diapositiva; no se completan con contenido inventado.

[Ver código original](3.DesignPrinciplesES%20(1).pdf#page=10).

### Problemas de mantenibilidad

El PDF identifica dos causas principales:

- **Código enmarañado:** las responsabilidades están mezcladas dentro de las clases.
- **Código disperso:** una misma responsabilidad o regla aparece repartida entre varias clases.

Como ejemplos de cambios que pueden afectar al sistema se citan:

- cambiar el acceso a datos: **HSQLDB → Oracle** o **JDBC → Hibernate**;
- cambiar la interfaz de usuario;
- cambiar reglas de negocio, por ejemplo: **si un mecánico tiene un contrato vigente, no se puede modificar ni eliminar**.

Las consecuencias son:

- una misma clase tiene múltiples motivos para cambiar;
- un solo cambio puede afectar a varias clases;
- resulta más difícil localizar y verificar los cambios.

### Problemas de reusabilidad

La causa señalada es que hay **lógica útil para varios casos encerrada dentro de cada caso de uso**.

Ejemplos del documento:

- `UpdateMechanic` usa `Scanner`, por lo que resulta difícil reutilizarlo desde una GUI;
- `UpdateMechanic::checkMechanicExists` está encerrado en ese caso de uso;
- el acceso a base de datos se encuentra dentro de las clases `Action`.

Consecuencias:

- la lógica no está disponible como componente reutilizable;
- es necesario modificar el diseño para poder reutilizarla.

### Problemas de extensibilidad

Las causas indicadas son:

- código acoplado a una implementación concreta;
- variantes resueltas mediante condiciones.

El ejemplo del documento añade una nueva especificación:

> «Los vehículos eléctricos tienen un coste de carga adicional».

Se comparan dos posibilidades:

1. modificar `VehicleType` incorporando una nueva variante del cálculo;
2. extender el modelo con una nueva clase `ElectricVehicleType` con `chargingCost`.

Las consecuencias señaladas son:

- añadir una nueva variante requiere modificar código existente;
- los cambios pueden afectar a funcionalidades ya existentes.

### Problemas de escalabilidad

La causa es la **dependencia de recursos limitados**.

El ejemplo del PDF es el acceso a la base de datos:

1. cada `Action` crea su propia conexión;
2. aumenta el número de usuarios concurrentes;
3. las conexiones se convierten en un cuello de botella.

El documento plantea entonces esta pregunta:

> ¿Podemos incorporar un *connection pool* sin modificar gran parte del código existente?

Las consecuencias del diseño inicial pueden ser:

- mayor tiempo de respuesta;
- degradación del rendimiento al crecer el sistema;
- cambios importantes para adaptar el sistema al crecimiento.

### Diagnóstico conjunto

| Atributo | Problema observado en CWS0 | Consecuencia destacada |
| --- | --- | --- |
| Mantenibilidad | Responsabilidades mezcladas y dispersas | Cambios difíciles de localizar y verificar |
| Reusabilidad | Lógica encerrada dentro de casos de uso | No puede reutilizarse como componente |
| Extensibilidad | Acoplamiento y variantes mediante condiciones | Añadir variantes obliga a modificar lo existente |
| Escalabilidad | Dependencia de recursos limitados | El crecimiento puede degradar el rendimiento |

## 3. Patrones {#patrones}

[Ver diapositivas 15–17](3.DesignPrinciplesES%20(1).pdf#page=15).

### Qué es un patrón de diseño

El documento recoge primero la idea de Christopher Alexander:

> Un patrón describe un problema que ocurre una y otra vez, así como la solución a ese problema.

En software distingue:

- **Patrones arquitectónicos:** definen la estructura y organización general del sistema.
- **Patrones de diseño:** describen clases y objetos relacionados para resolver problemas generales de diseño.

La segunda definición está atribuida a **Gamma, Helm, Johnson y Vlissides**.

La idea que resume el tema es:

> **Un patrón es una respuesta a un problema de diseño.**

### Del problema al patrón

El proceso presentado es:

1. detectar un problema de diseño;
2. identificar el atributo de calidad que se quiere mejorar;
3. determinar el cambio que se quiere facilitar;
4. buscar un patrón de diseño que ayude;
5. evaluar qué se gana y qué coste se introduce.

::: proceso
Problema → Objetivo → Patrón → Consecuencias
:::

::: aviso Importante
El PDF no presenta los patrones como soluciones gratuitas: después de aplicar uno también hay que evaluar las consecuencias y el coste que introduce.
:::

## 4. Patrón arquitectónico Layers {#layers}

[Ver diapositivas 18–32](3.DesignPrinciplesES%20(1).pdf#page=18).

### Problema que intenta resolver

En el diseño inicial están mezcladas:

- interacción con el usuario;
- lógica de negocio;
- acceso a datos.

Esto dificulta la evolución de la aplicación.

Los atributos afectados que identifica el documento son:

- **mantenibilidad**;
- **reusabilidad**;
- **extensibilidad**.

El objetivo es **separar las responsabilidades**.

### Idea fundamental de Layers

El patrón arquitectónico **Layers** organiza el sistema en capas, asignando a cada una **responsabilidades relacionadas** y estableciendo **dependencias controladas** entre ellas.

### Capas seleccionadas

El documento emplea tres capas:

::: proceso
Presentación → Negocio → Acceso a datos
:::

#### Presentación

Responsabilidades:

- interacción con el usuario;
- recoger las solicitudes;
- mostrar los resultados.

#### Negocio

Responsabilidades:

- implementar las reglas del problema;
- coordinar las operaciones del sistema.

#### Acceso a datos

Responsabilidades:

- recuperar y almacenar datos;
- ocultar los detalles de persistencia.

El PDF establece que **cada capa utiliza únicamente los servicios proporcionados por la capa inferior**.

[Ver selección de capas](3.DesignPrinciplesES%20(1).pdf#page=21).

### Qué se consigue

El documento destaca tres beneficios:

1. **Separación de responsabilidades:** cada capa tiene un propósito concreto.
2. **Mantenibilidad:** los cambios quedan más localizados dentro de cada capa.
3. **Reusabilidad:** la lógica de negocio puede ser utilizada por distintos clientes.

### Costes y limitaciones

Layers también introduce costes:

- no siempre es posible una separación estricta entre capas;
- las capas adicionales pueden introducir coste de rendimiento;
- una arquitectura estricta obliga a establecer y limitar las dependencias entre capas;
- en sistemas pequeños puede introducir complejidad innecesaria.

::: aviso Ojo
La separación en capas mejora determinados atributos de calidad, pero el propio documento advierte de que también puede introducir coste de rendimiento y complejidad.
:::

### Ejemplo: separar `AddMechanic`

Antes de la separación, `AddMechanic` realiza:

- interacción con el usuario;
- validación de datos;
- comprobación de reglas de negocio;
- gestión de conexiones;
- acceso a la BBDD.

Después, el documento distribuye las responsabilidades:

::: proceso
AddMechanic UI → Mechanic Service → Mechanic Data Access
:::

- **AddMechanic UI:** deja de conocer los detalles de persistencia.
- **Mechanic Service:** la lógica de negocio no conoce la UI.
- **Mechanic Data Access:** el acceso a datos queda aislado.

La dependencia queda en una única dirección:

```text
AddMechanic → MechanicService → MechanicDAO
```

[Ver refactorización por capas](3.DesignPrinciplesES%20(1).pdf#page=25).

### Estructura de paquetes mostrada

La diapositiva 26 presenta esta organización:

- **UI:** las clases `ui.***.action` implementan la interacción con el usuario, las validaciones de datos e invocan las clases de negocio. Los paquetes se organizan por actores.
- **Business:** contiene lógica de negocio + persistencia y se organiza por entidad.

Esta es la estructura concreta mostrada por el documento en ese punto de la refactorización.

[Ver estructura de paquetes](3.DesignPrinciplesES%20(1).pdf#page=26).

### Diagrama de clases del CRUD de mecánicos

El diagrama de la diapositiva 27 separa visualmente:

- una zona de **Presentación / Interacción con Usuario**;
- una zona de **Lógica de negocio / persistencia**.

El propio PDF avisa de que en este y los siguientes diagramas UML **puede haber errores tipográficos relacionados con nombres de paquetes, clases o métodos**.

[Ver diagrama UML](3.DesignPrinciplesES%20(1).pdf#page=27).

### Refactorización de `AddMechanicAction`

La diapositiva 28 propone escribir `AddMechanicAction` tras la refactorización. El esquema visual desplaza la lógica relacionada con persistencia fuera de la parte dedicada a la interacción con el usuario.

[Ver comparación de código](3.DesignPrinciplesES%20(1).pdf#page=28).

### Ejemplo `InvoiceWorkorder`

El documento utiliza también el caso de creación de facturas para mostrar el problema de responsabilidades mezcladas.

La diapositiva 29 presenta el diagrama de clases y la 30 el diagrama de secuencia.

[Ver diagrama de clases de factura](3.DesignPrinciplesES%20(1).pdf#page=29).

[Ver diagrama de secuencia](3.DesignPrinciplesES%20(1).pdf#page=30).

En `InvoiceWorkOrdersAction::execute()` se distinguen visualmente tres grupos de código:

- **azul:** interacción con el usuario;
- **rojo:** lógica de negocio;
- **verde:** acceso a datos.

La finalidad del ejemplo es localizar dentro del mismo método qué parte corresponde a cada responsabilidad antes de separarlas.

[Ver código coloreado](3.DesignPrinciplesES%20(1).pdf#page=31).

::: practica Refactorizar UpdateMechanic
El ejercicio de la diapositiva 32 pide:

1. señalar en `UpdateMechanic` la interacción con el usuario, la lógica de negocio y el acceso a datos;
2. identificar las dependencias;
3. revisar el nuevo diagrama de clases;
4. escribir el nuevo código.
:::

## 5. Patrón Fachada {#fachada}

[Ver diapositivas 33–41](3.DesignPrinciplesES%20(1).pdf#page=33).

### Problema que queda después de aplicar Layers

Aunque las responsabilidades se hayan separado, el cliente todavía:

- crea instancias de las clases que implementan los servicios;
- conoce las clases y métodos que proporcionan las funcionalidades;
- puede verse afectado por cambios en la interfaz o en la forma de utilizar esos servicios.

El atributo afectado es la **mantenibilidad**.

El objetivo es proporcionar **un punto de acceso simplificado al subsistema**.

### Definición de Fachada

El patrón **Fachada** proporciona una **interfaz sencilla y unificada** a un sistema complejo formado por un conjunto de objetos existentes.

El documento lo compara con una fachada en arquitectura.

Características importantes:

- los clientes interactúan con el subsistema a través de la fachada;
- utilizar la fachada **no impide** acceder directamente a las clases del subsistema;
- puede haber **más de una fachada para el mismo subsistema**.

[Ver definición y esquema](3.DesignPrinciplesES%20(1).pdf#page=35).

### Ventajas

#### Menor acoplamiento

El cliente deja de conocer y depender directamente de las clases que forman el subsistema.

El PDF contrapone estos dos esquemas:

```java title="Acceso directo al subsistema" origen="diapositiva 36"
public class AddMechanicAction ... {
    public void execute() {
        ...
        AddMechanic a = new AddMechanic();
        a.execute(nif, name, ...);
    }
}
```

frente a:

```java title="Acceso mediante fachada" origen="diapositiva 36"
public class AddMechanicAction ... {
    public void execute() {
        ...
        MechanicFacade f = new MechanicFacade();
        f.addMechanic(nif, name, ...);
    }
}
```

#### Simplicidad

La fachada proporciona un **punto de acceso único y de alto nivel** a las funcionalidades del subsistema.

#### Mantenibilidad

Los cambios en la implementación del subsistema quedan localizados en la fachada y no afectan al cliente.

El documento ilustra que, aunque la implementación interna cambie de `AddMechanic` a `AddMechanic2`, el cliente puede seguir utilizando la misma operación de la fachada.

### Participantes del diagrama

| Elemento | Responsabilidad |
| --- | --- |
| Cliente | Sistema que interactúa con la fachada |
| Interfaz fachada | Declara las operaciones ofrecidas al cliente |
| Implementación de la interfaz | Implementa esas operaciones y accede a las clases del subsistema |
| Subsistema | Clases que implementan la funcionalidad |

[Ver diagrama de clases](3.DesignPrinciplesES%20(1).pdf#page=37).

### Fachada en Gestión de Mecánicos

Para aplicar Fachada al caso de uso se propone:

1. crear una interfaz `MechanicService`;
2. implementar esa interfaz mediante `MechanicServiceImpl`;
3. identificar el papel de cada clase dentro del diagrama.

[Ver estructura del proyecto](3.DesignPrinciplesES%20(1).pdf#page=38).

Las diapositivas 39 y 40 muestran el nuevo diagrama de clases y el diagrama de secuencia.

[Ver diagrama de clases](3.DesignPrinciplesES%20(1).pdf#page=39).

[Ver diagrama de secuencia](3.DesignPrinciplesES%20(1).pdf#page=40).

::: practica Refactorizar las clases con Fachada
La diapositiva 41 pide:

- escribir el código de las clases `Action`;
- escribir los `commands`;
- escribir `MechanicService`;
- escribir `MechanicServiceImpl`;
- revisar las dependencias (`imports`).
:::

## 6. Factoría Simple {#simple-factory}

[Ver diapositivas 42–49](3.DesignPrinciplesES%20(1).pdf#page=42).

### Problema después de aplicar Fachada

Fachada desacopla la capa de interacción del **uso** de los servicios, pero todavía no de su **creación**.

El cliente sigue haciendo algo equivalente a:

```java title="Creación directa del servicio" origen="diapositiva 43"
MechanicService s = new MechanicServiceImpl();
s.addMechanic();
```

Aunque el cliente utilice la interfaz `MechanicService`, todavía tiene que:

- conocer `MechanicServiceImpl`;
- instanciar esa implementación concreta.

Por tanto:

- existe dependencia de `MechanicServiceImpl`;
- cambiar la implementación puede afectar al cliente.

El atributo afectado vuelve a ser la **mantenibilidad**.

El objetivo es **encapsular la creación de objetos para que el cliente no dependa directamente de sus implementaciones concretas**.

### Definición de Simple Factory

Una **Simple Factory** encapsula la creación de objetos y oculta al cliente qué clase concreta se instancia.

Sin factoría:

::: proceso
UI → `new` → MechanicServiceImpl
:::

Con factoría:

::: proceso
UI → Factory → `new` → MechanicServiceImpl
:::

El documento señala dos detalles importantes:

- la factoría suele exponerse mediante **métodos estáticos**;
- la factoría **no elimina** el acoplamiento con `MechanicServiceImpl`: lo **concentra en un único lugar**.

[Ver esquema](3.DesignPrinciplesES%20(1).pdf#page=44).

### Ventajas

#### Desacoplamiento

El cliente no depende de la implementación concreta, sino de su interfaz.

#### Centralización

La creación de objetos y la dependencia con las implementaciones quedan localizadas en la factoría.

### Estructura con `ServiceFactory`

En el ejemplo de Gestión de Mecánicos:

1. la UI solicita una clase *service* mediante `getMechanicService` a `ServiceFactory`;
2. `ServiceFactory` retorna una instancia de una clase que implemente la interfaz solicitada, en el ejemplo `MechanicServiceImpl`;
3. las clases UI conocen `ServiceFactory` y las interfaces de los servicios, como `MechanicService`, pero **no las clases concretas que implementan el servicio**.

[Ver estructura de paquetes](3.DesignPrinciplesES%20(1).pdf#page=46).

### Diagrama de clases

La diapositiva 47 muestra la incorporación de `ServiceFactory` junto a la fachada.

Dos ideas se señalan expresamente:

- `ServiceFactory` retorna una fachada;
- cambiar la implementación del servicio solo implica cambiar el método `getMechanicService`.

[Ver diagrama de clases](3.DesignPrinciplesES%20(1).pdf#page=47).

### Diagrama de secuencia

La diapositiva 48 muestra la secuencia completa con `ServiceFactory` entre la acción de UI y el servicio.

[Ver diagrama de secuencia](3.DesignPrinciplesES%20(1).pdf#page=48).

::: practica Refactorizar con Simple Factory
La diapositiva 49 pide:

- escribir el código de `ServiceFactory`;
- identificar los cambios en `Action`, `MechanicService` y `MechanicServiceImpl`;
- reescribir el código;
- revisar las dependencias (`imports`).
:::

## 7. Evolución del diseño a lo largo de la unidad {#evolucion}

La unidad sigue una evolución incremental. Cada paso resuelve un problema concreto, pero deja visible el siguiente.

| Situación | Problema principal | Solución introducida | Resultado |
| --- | --- | --- | --- |
| CWS0 inicial | UI, negocio y datos mezclados | Layers | Separación de responsabilidades |
| Después de Layers | El cliente conoce múltiples clases y métodos del subsistema | Fachada | Punto de acceso simplificado |
| Después de Fachada | El cliente sigue creando una implementación concreta | Simple Factory | Creación concentrada en la factoría |

::: proceso
CWS0 → Layers → Fachada → Simple Factory
:::

### Relación con los atributos de calidad

- **Layers** se introduce para mejorar principalmente mantenibilidad, reusabilidad y extensibilidad mediante la separación de responsabilidades.
- **Fachada** se introduce porque el cliente continúa acoplado al conocimiento del subsistema; el atributo señalado es la mantenibilidad.
- **Simple Factory** se introduce porque el cliente todavía está acoplado a la creación de la implementación concreta; el atributo señalado vuelve a ser la mantenibilidad.

## 8. Errores frecuentes y advertencias {#advertencias}

::: aviso Capas
Aplicar Layers no significa que la separación sea siempre perfecta. El PDF indica expresamente que una separación estricta no siempre es posible y que puede introducir coste de rendimiento y complejidad.
:::

::: aviso Fachada
La fachada simplifica el acceso al subsistema, pero **no impide** acceder directamente a sus clases. El documento indica que ese acceso directo sigue siendo posible.
:::

::: aviso Factoría
La Simple Factory **no elimina** la dependencia con la clase concreta. La dependencia sigue existiendo dentro de la factoría; lo que hace es **centralizarla** para que los clientes no la conozcan.
:::

::: aviso Diagramas UML
El documento advierte de que algunos diagramas UML pueden contener errores tipográficos en nombres de paquetes, clases o métodos.
:::

## 9. Preguntas de repaso {#repaso}

::: pregunta ¿Qué diferencia hay entre mantenibilidad y extensibilidad?
Según las definiciones del tema, la mantenibilidad pregunta por la facilidad para cambiar lo que ya existe; la extensibilidad pregunta por la facilidad para incorporar algo nuevo afectando lo menos posible al software existente.
:::

::: pregunta ¿Qué problema de CWS0 motiva la aplicación de Layers?
Las responsabilidades de interacción con el usuario, lógica de negocio y acceso a datos están mezcladas, lo que dificulta la evolución y afecta a mantenibilidad, reusabilidad y extensibilidad.
:::

::: pregunta ¿Cuál es la regla de dependencia entre las capas mostradas?
Cada capa utiliza únicamente los servicios proporcionados por la capa inferior.
:::

::: pregunta ¿Qué problema sigue existiendo después de aplicar Layers?
El cliente todavía tiene que conocer las clases y métodos concretos que proporcionan las funcionalidades del subsistema.
:::

::: pregunta ¿Qué aporta Fachada?
Una interfaz sencilla y unificada, de alto nivel, que reduce el conocimiento que el cliente necesita tener sobre las clases del subsistema.
:::

::: pregunta ¿Qué problema queda después de aplicar Fachada?
El cliente puede seguir teniendo que conocer e instanciar la implementación concreta del servicio, como `MechanicServiceImpl`.
:::

::: pregunta ¿Qué aporta Simple Factory?
Encapsula la creación de objetos para que los clientes trabajen con la interfaz del servicio y no tengan que conocer la clase concreta que se instancia.
:::

::: pregunta ¿La factoría elimina por completo el acoplamiento con la implementación concreta?
No. El documento indica que lo concentra en un único lugar: la factoría.
:::

## 10. Resumen final {#resumen}

La unidad comienza estableciendo cuatro criterios para evaluar el software: **mantenibilidad, reusabilidad, extensibilidad y escalabilidad**. Al estudiar CWS0 se observa que la interacción con el usuario, la lógica de negocio y el acceso a datos aparecen mezclados, lo que provoca código enmarañado, lógica difícil de reutilizar, dependencia de implementaciones concretas y problemas para adaptar el sistema al crecimiento.

Para abordar estos problemas se introduce primero **Layers**, que separa presentación, negocio y acceso a datos y controla las dependencias entre esas responsabilidades. Después se aplica **Fachada**, que proporciona al cliente un punto de acceso sencillo y unificado al subsistema. Finalmente, **Simple Factory** encapsula la creación de las implementaciones concretas, evitando que la UI tenga que conocerlas directamente.

La evolución presentada en el documento es:

::: proceso
Responsabilidades mezcladas → Separación en capas → Acceso mediante fachada → Creación mediante factoría
:::

Cada patrón responde a un problema de diseño determinado y debe evaluarse por las mejoras que introduce y por sus costes.

## Referencias al documento original {#referencias}

- [Portada e índice](3.DesignPrinciplesES%20(1).pdf#page=1)
- [Atributos de calidad](3.DesignPrinciplesES%20(1).pdf#page=3)
- [Diagnóstico de CWS0](3.DesignPrinciplesES%20(1).pdf#page=6)
- [Patrones](3.DesignPrinciplesES%20(1).pdf#page=15)
- [Layers](3.DesignPrinciplesES%20(1).pdf#page=18)
- [Fachada](3.DesignPrinciplesES%20(1).pdf#page=33)
- [Factoría Simple](3.DesignPrinciplesES%20(1).pdf#page=42)
- [Abrir el documento completo](3.DesignPrinciplesES%20(1).pdf)
