---
asignatura: Software y Estándares para la Web
titulo: Usabilidad Web - Parte 1
resumen: Usabilidad web (primera parte).
fuente: 1-Usabilidad-Web-parte1.pdf
---

# Usabilidad Web - Parte 1: resumen

Lectura inicial: **usabilidad significa facilidad de aprendizaje y de uso**. La experiencia de usuario es más amplia: engloba la relación de la persona con el producto y su contexto.

## Primera regla de Krug

**No me hagas pensar:** la página debe resultar evidente o, cuando no sea posible, autoexplicativa. Un enlace ambiguo, una etiqueta extraña o un botón irreconocible introducen preguntas innecesarias.

| Lo que suele hacer el usuario | Consecuencia para el diseño |
|---|---|
| Escanea en vez de leer palabra por palabra | Títulos claros, párrafos breves, listas y palabras relevantes |
| Elige la primera opción razonable | Hacer reconocibles destinos y acciones |
| Se las arregla sin entender todo el sistema | Ofrecer señales claras, no exigir conocer el modelo interno |

Una metáfora puede ayudar a entender una interfaz. Las **pruebas de usabilidad** comprueban si funciona con personas; no basta con que convenza al diseñador.

## Cinco criterios visuales

1. **Convenciones:** aprovechar lo que ya se reconoce.
2. **Jerarquía visual:** importancia mediante prominencia, relación y agrupación.
3. **Zonas definidas:** distinguir áreas de contenido.
4. **Acciones evidentes:** mostrar qué es pulsable.
5. **Menos ruido:** reducir lo que compite con la tarea.

No diseñar únicamente para la captura bonita: la persona necesita identificar la acción mientras recorre la página.

## Segunda y tercera reglas

- **Clics:** importa lo fácil y poco ambiguo de decidir cada uno, no contar clics de forma aislada. Varias decisiones evidentes pueden ser mejores que una difícil.
- **Palabras:** eliminar texto prescindible, bienvenidas vacías e instrucciones que la interfaz podría evitar. El ejemplo pasa de **103 a 43 palabras**: conserva lo útil y reduce ruido.

**Ejemplo didáctico** de texto con acción explícita:

```html
<p>Consulta los requisitos antes de solicitar la plaza.</p>
<a href="requisitos.html">Ver requisitos de admisión</a>
```

El objetivo es que el destino se entienda sin leer una explicación adicional. El marcado ilustra la acción; no certifica por sí solo la usabilidad.

## Siete atributos de usabilidad de Krug

**Útil · comprensible · recordable · eficaz · eficiente · deseable · delicioso.** Debe resolver una necesidad, entenderse, poder repetirse sin reaprender, completar la tarea con esfuerzo razonable y resultar agradable. **Eficacia** es conseguir el resultado; **eficiencia**, conseguirlo con tiempo y esfuerzo adecuados. Son los atributos de la página 16; UX abarca además otros factores de la interacción.

**Fecha bibliográfica:** **2014**, edición de *Don't Make Me Think, Revisited* citada. Los ejemplos históricos muestran principios y problemas; no son mediciones de uso actuales.

**Autocomprobación:** ¿qué dudas provoca esta página?, ¿qué destaca primero?, ¿qué texto puedo quitar sin perder contenido?, ¿se reconoce el enlace antes de pulsarlo?

[Uso real](1-Usabilidad-Web-parte1.pdf#page=26) · [Jerarquía](1-Usabilidad-Web-parte1.pdf#page=34) · [Clics](1-Usabilidad-Web-parte1.pdf#page=41) · [Texto](1-Usabilidad-Web-parte1.pdf#page=43).

## Fuente y ampliación

Síntesis del [PDF original](1-Usabilidad-Web-parte1.pdf) y de los [apuntes completos](?u=software-estandares-web%2Fseminarios-usabilidad-web-parte1). Las fechas se reproducen según el material docente.
