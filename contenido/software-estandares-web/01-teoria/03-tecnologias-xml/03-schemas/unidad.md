---
asignatura: Software y Estándares para la Web
titulo: Schemas
resumen: Validación de XML con XML Schema (XSD).
---

# Schemas

## Conceptos

XML Schema describe estructura y tipos de datos, y es más expresivo que una DTD.

## Ejemplos

```xml title="biblioteca.xsd"
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="biblioteca">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="libro" maxOccurs="unbounded">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="titulo" type="xs:string"/>
              <xs:element name="autor" type="xs:string"/>
            </xs:sequence>
            <xs:attribute name="isbn" type="xs:string" use="required"/>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>
```
