# Ecosistema Digital VitaLink

## De una marca sin consolidar a una plataforma logística bilingüe y multiservicio

VitaLink comenzó sin una identidad digital consolidada ni una estructura de producto capaz de explicar el crecimiento de sus servicios. Lideré el trabajo de principio a fin: investigación, posicionamiento, dirección de marca, arquitectura de información, estrategia de contenido, UX/UI, planificación del Design System, arquitectura frontend, implementación, entrega del repositorio y coordinación del despliegue.

El resultado es un ecosistema digital coherente con dos experiencias relacionadas, pero claramente diferenciadas:

- **VitaLink Courier:** información de mensajería médica y logística para el sector salud en Greater Tampa Bay.
- **VitaLink Express:** información sobre entregas same-day, regionales, carga especializada, documentos y e-commerce.

## Resumen del proyecto

| Área | Detalle |
|---|---|
| Rol | Lead Product Designer & UX Engineer |
| Alcance | Marca, estrategia de producto, UX/UI, contenido, Design System, frontend, arquitectura SEO y entrega |
| Superficies | VitaLink Courier y VitaLink Express |
| Usuarios principales | Equipos de salud, organizaciones y clientes evaluando servicios de entrega |
| Idiomas | Inglés y español |
| Diseño | Figma, tokens documentados, modelo de componentes reutilizables y especificaciones responsive |
| Ingeniería | Angular, TypeScript, RxJS, Tailwind CSS, SSR/prerender y Express |
| Entrega | Flujo basado en Git y coordinación de despliegue cloud gestionado |

## El reto

La empresa necesitaba más que una renovación visual. Requería una arquitectura de servicios clara, una identidad confiable y una base técnica capaz de soportar tanto una propuesta especializada de mensajería médica como una oferta Express más amplia.

El producto debía resolver cuatro problemas conectados:

1. Explicar servicios complejos y sensibles a la confianza sin abrumar al visitante.
2. Diferenciar las ofertas médica y Express sin fragmentar la marca.
3. Soportar inglés y español desde una interfaz y estructura de contenido compartidas.
4. Garantizar metadata, canonical URLs y respuestas HTTP correctas en dos dominios productivos.

## Mi contribución

Asumí la dirección de producto y diseño desde el concepto inicial hasta la implementación. El cliente aportó su conocimiento operativo, catálogo de servicios y aprobaciones; yo transformé ese conocimiento del negocio en el producto digital.

Mi trabajo incluyó:

- Análisis de marca, dirección del logotipo, identidad visual y criterio fotográfico.
- Revisión competitiva, posicionamiento, organización de servicios y estrategia de contenido.
- Arquitectura de información para las experiencias principal y Express.
- User flows, estructuras responsive y copy bilingüe de interacción.
- Foundations en Figma, especificaciones de componentes reutilizables y documentación de handoff.
- Arquitectura e implementación frontend con Angular.
- Comportamiento multidominio, SSR/prerender y metadata SEO.
- Organización del repositorio, coordinación del despliegue y estabilización técnica final.

## Proceso

### 1. Discovery y posicionamiento

Consolidé los servicios, audiencias, requisitos de confianza y objetivos de crecimiento del cliente en un brief estructurado. Los artefactos de investigación cubrieron análisis de marca, competencia, captación, tono de voz, comunicación multicanal y alternativas técnicas.

La decisión central de posicionamiento fue conservar **VitaLink** como ancla de confianza y permitir que **Courier** y **Express** comunicaran contextos de servicio diferentes.

### 2. Arquitectura de información y contenido

La experiencia se organizó alrededor de las preguntas que los clientes necesitan resolver antes de contactar al despacho:

- ¿Qué tipo de entrega está disponible?
- ¿Es adecuada para mi organización o envío?
- ¿Dónde opera la empresa?
- ¿Qué credenciales y señales de confianza son relevantes?
- ¿Cómo paso de evaluar el servicio a establecer contacto directo?

El modelo resultante separa páginas estables de rutas dinámicas para servicios y sectores de Express.

### 3. Design System y comportamiento responsive

Definí un sistema visual reutilizable con:

- Roles de color navy, rojo, lavanda y colores semánticos.
- Montserrat para títulos e Inter para contenido.
- Escalas de espaciado, radios, elevación y tipografía.
- Patrones reutilizables de botones, inputs, cards, navegación, modales y contenido.
- Siete umbrales mobile-first desde teléfonos compactos hasta pantallas amplias.

El archivo fuente de Figma documenta la dirección visual y los componentes. La evidencia pública nodo por nodo se capturará durante el QA final porque el archivo compartido actualmente requiere una sesión iniciada en Figma.

### 4. Una arquitectura, dos superficies de producto

En lugar de mantener dos aplicaciones desconectadas, diseñé un código base Angular compartido con comportamiento consciente del hostname y de la ruta.

- Navegación, footer, localización y patrones de contacto compartidos reducen duplicación.
- Las rutas principal y Express mantienen orígenes canónicos e identidades diferentes.
- Las rutas estáticas conocidas se prerenderizan; los detalles parametrizados usan server rendering.
- Las rutas desconocidas retornan un HTTP `404` real y no un shell SPA exitoso.
- Los recursos en inglés y español contienen `478` valores finales coincidentes, con validación automática de paridad de claves.

Esta decisión mejoró la mantenibilidad sin perder separación para el cliente final.

### 5. Conversión sin falsos estados

La solicitud de cotización valida los datos en el navegador y después solicita elegir explícitamente WhatsApp o SMS. No afirma que la solicitud llegó a un backend cuando esa transmisión no existe.

Esta corrección es importante porque una UX confiable también debe representar honestamente el estado del sistema.

## Estabilización técnica

La edición de portafolio incorpora una fase dedicada de estabilización:

- La suite automática pasó de `1` a `27` pruebas aprobadas.
- El bundle inicial sin comprimir bajó de `665,64 kB` a `509,57 kB` mediante lazy loading por rutas: aproximadamente `23,5 %`.
- El build validado generó `21` rutas prerenderizadas.
- Se corrigieron estados HTTP en Express y canonical URLs multidominio.
- Se eliminaron dependencias declaradas sin uso y `npm audit` reportó `0` vulnerabilidades al momento de validación.
- El runtime previsto quedó fijado en Node.js `22.22.3 LTS`.

Estos son resultados de validación técnica; no son afirmaciones sobre conversión, ingresos, tráfico o satisfacción del cliente.

## Resultado

El trabajo convirtió un brief operativo amplio en un ecosistema digital bilingüe que conecta marca, Service Design y entrega frontend. VitaLink Courier y VitaLink Express muestran públicamente el producto, mientras este repositorio permite revisar las decisiones técnicas y los límites de la implementación.

### Referencias

- [VitaLink Courier](https://www.vitalinkcouriers.com/)
- [VitaLink Express](https://express.vitalinkcouriers.com/express)
- [Diseño en Figma](https://www.figma.com/design/ORBLgTs7eKP0TwfxmIa1uC/VitaLink?node-id=2-3)
- [Componentes en Figma](https://www.figma.com/design/ORBLgTs7eKP0TwfxmIa1uC/VitaLink?node-id=2-7)

## Autoría y workflow asistido por IA

Dirigí el proyecto y tomé las decisiones de producto, marca, diseño y tecnología. Builder.io, Claude, Codex y otras herramientas apoyaron tareas específicas de exploración, documentación e implementación bajo mi revisión. La IA aceleró la ejecución; no sustituyó el ownership del producto, la validación del cliente ni el criterio final.

El cliente conserva la propiedad de su negocio, información operativa, servicios e implementación aprobada de la marca. La edición de portafolio utiliza un historial público curado; el historial fuente privado permanece aislado como evidencia de atribución.

## Limitaciones actuales

- El repositorio no incluye envío de cotizaciones a backend, pagos, tracking ni integraciones operativas.
- No se afirman resultados de analytics, Lighthouse ni conformidad WCAG completa sin una auditoría final de producción.
- Los assets de marca aprobados que utiliza la interfaz están almacenados localmente en esta edición de portafolio.
- El UAT responsive, de accesibilidad y enlaces en navegador pertenece al gate de publicación.

Consulta el [Registro de evidencia](./evidence-register.md) para conocer la fuente y el nivel de confianza de cada afirmación importante.
