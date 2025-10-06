# Bingo Binario

Aplicación web pensada para apoyar dinámicas de gamificación donde el alumnado refuerza la conversión entre números decimales y binarios mientras participa en un bingo. Proyecta la interfaz, ajusta el ritmo de la partida y deja que cada participante valide mentalmente si el número anunciado aparece en su cartón.

## Características

- **Dos modos de juego**: Binario → Decimal y Decimal → Binario, con mensajes guía adaptados a cada dinámica.
- **Temporizador flexible**: control deslizante de 3 a 120 segundos y campo manual para intervalos más largos (hasta 300 s).
- **Historial sin pistas**: muestra únicamente números ya cantados al pasar al siguiente turno, evitando ayudas accidentales.
- **Proyección clara**: números destacados a gran tamaño, contador regresivo visible y diseño listo para pantallas grandes.
- **Responsive**: interfaz optimizada para ordenadores, tablets y móviles; botones con tamaño uniforme.
- **Alternancia de soluciones**: conmutador opcional para mostrar la conversión opuesta cuando el docente lo estime oportuno.

## Estructura

```
BINGO BINARIO/
├─ index.html   # Vista principal y controles de la partida
├─ styles.css   # Estilos y diseño responsive
└─ app.js       # Lógica del bingo, temporizador y gestión de historial
```

## Puesta en marcha

1. Descarga o clona el repositorio.
2. Abre `index.html` en tu navegador preferido.
3. Selecciona el modo de juego y ajusta el intervalo entre números. Puedes usar el slider o escribir un valor manual.
4. Pulsa `Iniciar` para comenzar. Cada intervalo se anunciará un número sin repetición. Usa `Pausar`, `Siguiente` o `Reiniciar` según necesites.
5. Proyecta la pestaña del navegador para que el alumnado visualice el número en juego y el temporizador.

## Sugerencias de uso

- Configura el tiempo en función de la complejidad del grupo. Empieza con intervalos medios (15‑20 s) y ajústalos tras las primeras rondas.
- Desactiva “Mostrar conversion opuesta” para fomentar el cálculo mental; actívalo puntualmente al cerrar la actividad o durante repasos.
- Si quieres conservar el historial de una partida, copia los valores mostrados al finalizar la sesión.

## Desarrollo y personalización

- **Colores y tipografías**: edita las variables CSS definidas en `styles.css` (`:root`) para adaptar la estética a tu centro educativo.
- **Rango de números**: modifica `TOTAL_NUMBERS` en `app.js` si necesitas trabajar con un abanico distinto a 0‑255 (recuerda actualizar también los cartones físicos o digitales).
- **Accesibilidad**: el toggle y los controles están preparados para teclado. Verifica contraste y tamaños en el contexto donde vayas a proyectar.

## Créditos

Proyecto diseñado para actividades educativas de conversión numérica con un enfoque lúdico. Siente la libertad de ampliarlo o integrarlo en otros recursos didácticos. ¡Disfruta del bingo binario!*** End Patch
