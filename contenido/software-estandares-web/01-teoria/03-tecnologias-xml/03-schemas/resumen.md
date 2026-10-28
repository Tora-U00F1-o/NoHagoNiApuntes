---
asignatura: Software y Estándares para la Web
titulo: Schemas
resumen: Validación de XML con XML Schema (XSD).
fuente: 03-Schemas.pdf
---

# Schemas: resumen

Lectura inicial: **XML Schema añade tipos y restricciones a la estructura**. Un XSD también es XML y debe distinguirse de la instancia que valida.

## Estructura y asociación

- `xs:schema`: raíz; `xmlns:xs`: vocabulario de Schema.
- `targetNamespace`: vocabulario definido por el XSD.
- `xsi:schemaLocation`: pares namespace + archivo; `xsi:noNamespaceSchemaLocation`: caso sin namespace.
- DTD `*`, `+`, `?` se traducen a límites `minOccurs/maxOccurs`; coma a `sequence`, alternativa a `choice`.

## Tipos y restricciones

| Construcción | Uso |
|---|---|
| `simpleType` | Valor sin hijos ni atributos |
| `complexType` | Hijos, atributos, texto o combinaciones |
| `simpleContent` | Valor simple acompañado de atributos |
| `mixed="true"` | Texto mezclado con elementos |
| `sequence / choice / all` | Orden / alternativa / grupo en cualquier orden según el ejemplo |
| `restriction` | Restringir un tipo base |
| `list / union` | Varios ítems / un valor de una alternativa de tipos |

**Ejemplo del PDF, con cierres explícitos:**

```xml
<xs:simpleType name="Edad">
  <xs:restriction base="xs:integer">
    <xs:minInclusive value="0"/>
    <xs:maxInclusive value="140"/>
  </xs:restriction>
</xs:simpleType>
```

Es una definición dentro de un esquema, no un XSD completo. Las facetas importantes son límites inclusivos/exclusivos, `enumeration`, `pattern`, longitudes, `whiteSpace`, `totalDigits` y `fractionDigits`.

**RGB:** componente 0–255 → lista → longitud de tres **ítems**, no tres caracteres. Véanse [XSD](03-Ejemplos/ComponentesRGB.xsd) y [XML](03-Ejemplos/rgb.xml).

## Ausencia, identidad y reutilización

| Distinción | Idea |
|---|---|
| Opcional | `minOccurs="0"`: puede faltar |
| Nulo | `nillable="true"` permite `xsi:nil="true"` |
| Vacío | Sin contenido; depende del tipo que sea válido |
| `unique / key / keyref` | Unicidad / clave obligatoria / referencia |
| `include / import / redefine` | Mismo namespace / otro namespace / redefinición |

`extension` deriva tipos; `abstract` impide uso directo; `xsi:type` identifica el derivado. `any/anyAttribute` abren contenido y `strict/lax/skip` controlan su comprobación. `annotation/documentation/appinfo` documentan.

## Fechas, validación y límites

- `xs:date`: `2018-10-20`; `dateTime`: `2018-10-20T12:30:00`.
- `duration`: `PT7H` son siete horas; `P1Y7M29DT12H` combina fecha y tiempo. Son valores de ejemplo, no fechas del estándar.
- El PDF **no proporciona una cronología de publicación de XSD**.

```bash
xmllint --schema pizzas.xsd pizzas-xsd.xml --noout
```

Revisar tipos y opcionalidad al generar XSD automáticamente; probar varios validadores. El mecanismo estudiado no resuelve todas las relaciones aritméticas/contextuales y puede ser extenso. Los [artículos](03-Ejemplos/articulos.xsd) y [recetas](03-Ejemplos/recetas.xsd) conservan los casos resueltos.

[Tipos](03-Schemas.pdf#page=38) · [Listas](03-Schemas.pdf#page=57) · [Complejos](03-Schemas.pdf#page=62) · [Claves](03-Schemas.pdf#page=81).

## Fuente y ampliación

Síntesis del [PDF original](03-Schemas.pdf) y de los [apuntes completos](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas). Las fechas se reproducen según el material docente.
