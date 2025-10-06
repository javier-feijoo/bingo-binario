const TOTAL_NUMBERS = 256;

const elements = {
    modeSelect: document.getElementById("mode-select"),
    intervalInput: document.getElementById("interval-input"),
    intervalSlider: document.getElementById("interval-slider"),
    toggleSolution: document.getElementById("toggle-solution"),
    startButton: document.getElementById("start-btn"),
    pauseButton: document.getElementById("pause-btn"),
    nextButton: document.getElementById("next-btn"),
    resetButton: document.getElementById("reset-btn"),
    countdownTimer: document.getElementById("countdown-timer"),
    modeHint: document.getElementById("mode-hint"),
    currentNumber: document.getElementById("current-number"),
    currentTranslation: document.getElementById("current-translation"),
    drawnCount: document.getElementById("drawn-count"),
    remainingCount: document.getElementById("remaining-count"),
    historyList: document.getElementById("history-list"),
    historyEmpty: document.getElementById("history-empty")
};

const state = {
    mode: "bin2dec",
    pool: buildPool(),
    current: null,
    isRunning: false,
    intervalSeconds: Number(elements.intervalInput.value),
    remainingSeconds: Number(elements.intervalInput.value),
    timerId: null,
    history: []
};

init();

function init() {
    attachListeners();
    synchronizeIntervalControls(state.intervalSeconds);
    updateUiForMode();
    updateCountdownDisplay("--");
    updateProgress();
}

function attachListeners() {
    elements.modeSelect.addEventListener("change", () => {
        state.mode = elements.modeSelect.value;
        resetGame(true);
        updateUiForMode();
    });

    elements.intervalSlider.addEventListener("input", () => {
        const value = Number(elements.intervalSlider.value);
        applyIntervalChange(value);
    });

    elements.intervalInput.addEventListener("change", () => {
        const value = Number(elements.intervalInput.value);
        applyIntervalChange(value);
    });

    elements.toggleSolution.addEventListener("change", () => {
        updateTranslationVisibility();
    });

    elements.startButton.addEventListener("click", handleStart);
    elements.pauseButton.addEventListener("click", handlePause);
    elements.nextButton.addEventListener("click", handleNext);
    elements.resetButton.addEventListener("click", () => resetGame(true));
}

function handleStart() {
    if (!state.current) {
        drawNextNumber();
    }
    startTimer();
    elements.startButton.disabled = true;
    elements.pauseButton.disabled = false;
    elements.nextButton.disabled = false;
}

function handlePause() {
    stopTimer();
    elements.startButton.disabled = false;
    elements.pauseButton.disabled = true;
}

function handleNext() {
    drawNextNumber();
    if (state.isRunning) {
        restartTimer();
    }
}

function startTimer() {
    if (state.isRunning) return;
    state.isRunning = true;
    if (!Number.isFinite(state.remainingSeconds) || state.remainingSeconds <= 0) {
        state.remainingSeconds = state.intervalSeconds;
    }
    updateCountdownDisplay(state.remainingSeconds);
    state.timerId = window.setInterval(() => {
        state.remainingSeconds -= 1;
        updateCountdownDisplay(state.remainingSeconds);
        if (state.remainingSeconds <= 0) {
            drawNextNumber();
            state.remainingSeconds = state.intervalSeconds;
            updateCountdownDisplay(state.remainingSeconds);
        }
    }, 1000);
}

function restartTimer() {
    stopTimer();
    state.remainingSeconds = state.intervalSeconds;
    updateCountdownDisplay(state.remainingSeconds);
    startTimer();
}

function stopTimer() {
    state.isRunning = false;
    if (state.timerId) {
        window.clearInterval(state.timerId);
        state.timerId = null;
    }
}

function resetGame(clearHistory = false) {
    stopTimer();
    state.pool = buildPool();
    state.current = null;
    state.remainingSeconds = state.intervalSeconds;
    elements.startButton.disabled = false;
    elements.pauseButton.disabled = true;
    elements.nextButton.disabled = true;
    elements.currentNumber.textContent = "Listo para jugar";
    elements.currentNumber.classList.remove("number-ended");
    elements.currentTranslation.textContent = "";
    elements.currentTranslation.classList.add("hidden");
    updateCountdownDisplay("--");
    if (clearHistory) {
        state.history = [];
        renderHistory();
    }
    updateProgress();
}

function drawNextNumber() {
    if (state.current !== null) {
        state.history.unshift(state.current);
    }

    if (!state.pool.length) {
        state.current = null;
        elements.currentNumber.textContent = "Numeros agotados";
        elements.currentTranslation.textContent = "";
        elements.currentTranslation.classList.add("hidden");
        elements.modeHint.textContent = "Has recorrido los 256 numeros.";
        stopTimer();
        elements.startButton.disabled = true;
        elements.pauseButton.disabled = true;
        elements.nextButton.disabled = true;
        updateCountdownDisplay("--");
        renderHistory();
        updateProgress();
        return;
    }

    const index = Math.floor(Math.random() * state.pool.length);
    const value = state.pool.splice(index, 1)[0];
    state.current = value;

    const binary = toBinary(value);
    const decimal = value.toString(10);

    if (state.mode === "bin2dec") {
        elements.currentNumber.textContent = binary;
        elements.modeHint.textContent = "Busca el numero decimal correspondiente.";
        elements.currentTranslation.textContent = `Decimal: ${decimal}`;
    } else {
        elements.currentNumber.textContent = decimal;
        elements.modeHint.textContent = "Busca el codigo binario correspondiente.";
        elements.currentTranslation.textContent = `Binario: ${binary}`;
    }

    updateTranslationVisibility();
    renderHistory();
    updateProgress();
}

function updateTranslationVisibility() {
    const shouldShow = elements.toggleSolution.checked && state.current !== null;
    elements.currentTranslation.classList.toggle("hidden", !shouldShow);
}

function renderHistory() {
    elements.historyList.innerHTML = "";
    if (!state.history.length) {
        elements.historyEmpty.classList.remove("hidden");
        return;
    }
    elements.historyEmpty.classList.add("hidden");

    state.history.forEach((value) => {
        const item = document.createElement("li");
        const binary = toBinary(value);
        const decimal = value.toString(10);

        const primary = document.createElement("span");
        primary.className = "history-label";
        const secondary = document.createElement("span");
        secondary.className = "history-value";

        if (state.mode === "bin2dec") {
            primary.textContent = `BIN ${binary}`;
            secondary.textContent = `DEC ${decimal.padStart(3, " ")}`;
        } else {
            primary.textContent = `DEC ${decimal.padStart(3, " ")}`;
            secondary.textContent = `BIN ${binary}`;
        }

        item.append(primary, secondary);
        elements.historyList.appendChild(item);
    });
}

function updateProgress() {
    const drawn = state.history.length + (state.current !== null ? 1 : 0);
    elements.drawnCount.textContent = drawn;
    elements.remainingCount.textContent = `Restan ${state.pool.length} numeros`;
}

function updateCountdownDisplay(value) {
    elements.countdownTimer.textContent = value;
}

function updateUiForMode() {
    elements.modeHint.textContent =
        state.mode === "bin2dec"
            ? "Busca el numero decimal correspondiente."
            : "Busca el codigo binario correspondiente.";
}

function applyIntervalChange(value) {
    const minInput = Number(elements.intervalInput.min) || 3;
    const maxInput = Number(elements.intervalInput.max) || 300;
    const clamped = clamp(value, minInput, maxInput);
    state.intervalSeconds = clamped;
    if (!state.isRunning) {
        state.remainingSeconds = clamped;
        updateCountdownDisplay(clamped);
    }
    synchronizeIntervalControls(clamped);
}

function synchronizeIntervalControls(value) {
    elements.intervalInput.value = value;
    const sliderMin = Number(elements.intervalSlider.min) || 3;
    const sliderMax = Number(elements.intervalSlider.max) || 120;
    const sliderValue = clamp(value, sliderMin, sliderMax);
    elements.intervalSlider.value = sliderValue;
}

function buildPool() {
    return Array.from({ length: TOTAL_NUMBERS }, (_, i) => i);
}

function toBinary(value) {
    return value.toString(2).padStart(8, "0");
}

function clamp(value, min, max) {
    if (Number.isNaN(value)) {
        return min;
    }
    return Math.min(Math.max(value, min), max);
}
