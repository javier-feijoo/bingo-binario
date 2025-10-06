# Bingo Binario

Aplicación web creada para dinamizar sesiones de conversión entre binario y decimal mediante partidas de bingo. Permite proyectar números grandes y claros, controlar el ritmo del juego y decidir cuándo mostrar la conversión opuesta, favoreciendo que el alumnado practique cálculo mental dentro de una dinámica lúdica.

## Objetivos educativos

- Reforzar la agilidad en la conversión entre base 2 y base 10.
- Facilitar actividades colectivas donde cada participante valida mentalmente los números de su cartón.
- Ofrecer al profesorado un recurso listo para proyectar, configurable en tiempo y grado de ayuda mostrada.

## Características principales

- **Dos modos equivalentes**: binario → decimal y decimal → binario, con mensajes guía adaptados a cada dinámica.
- **Temporizador configurable**: control deslizante (3‑120 s) y campo manual (hasta 300 s) para ajustar el ritmo del juego.
- **Historial limpio**: registra únicamente números ya cantados y permite mostrar u ocultar la conversión complementaria.
- **Interfaz de alta visibilidad**: contador centrado, número principal a gran escala y diseño responsive para aula, tablet o móvil.
- **Controles accesibles**: barra de botones uniforme, conmutadores tipo toggle y soporte completo para teclado.

## Estructura del proyecto

```
BINGO BINARIO/
├── index.html   # Vista principal con controles y secciones auxiliares
├── styles.css   # Hoja de estilos con diseño responsive y variables personalizables
└── app.js       # Lógica del bingo, temporizador, historial y modo de juego
```

## Puesta en marcha

1. Clona o descarga este repositorio.
2. Abre `index.html` en un navegador moderno (no requiere servidor ni compilación).
3. Selecciona el modo de juego y ajusta el intervalo deseado.
4. Pulsa `Iniciar` para comenzar la partida. Usa `Pausar`, `Siguiente` o `Reiniciar` según la dinámica de aula.
5. Proyecta la pestaña del navegador para que el grupo siga el temporizador y el número activo.

## Ideas de uso en el aula

- Empieza con intervalos amplios (15‑20 s) y redúcelos conforme el grupo gana soltura.
- Mantén desactivada la opción “Mostrar conversión opuesta” para potenciar el cálculo mental y actívala al cerrar la sesión o en rondas de repaso.
- Cierra la actividad recopilando el historial mostrado para revisar los números trabajados o generar ejercicios adicionales.

## Personalización rápida

- **Colores y tipografías**: edita las variables definidas en `styles.css`.
- **Rango numérico**: ajusta `TOTAL_NUMBERS` en `app.js` si necesitas trabajar con intervalos distintos (actualiza también los cartones físicos).
- **Textos**: modifica las cadenas en `index.html` para adaptar mensajes o traducir la interfaz.

## Autor

Proyecto educativo mantenido por **Javier Feijóo López** (Docente de informática). Puedes contactar a través de [LinkedIn](https://www.linkedin.com/in/javier-feijoo-lopez/).

## Licencia

Este recurso se publica bajo la licencia **Creative Commons CC BY-SA 4.0**. Si lo reutilizas o adaptas, cita la autoría original y comparte las mejoras bajo la misma licencia.


