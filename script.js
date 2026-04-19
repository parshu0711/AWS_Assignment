const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const modeBtns = document.querySelectorAll('.mode-btn');
const colon = document.querySelector('.colon');

let timer;
let isRunning = false;
let currentMode = 'pomodoro'; // pomodoro, shortBreak, longBreak
let timeLeft = 25 * 60; // default 25 minutes

const modes = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update document title
    document.title = `${minutesDisplay.textContent}:${secondsDisplay.textContent} - ZenFocus`;
}

function startTimer() {
    if (isRunning || timeLeft === 0) return;
    
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    colon.classList.remove('paused');
    
    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            clearInterval(timer);
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            colon.classList.add('paused');
            playNotificationSound();
        }
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    colon.classList.add('paused');
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    colon.classList.add('paused');
    timeLeft = modes[currentMode];
    updateDisplay();
}

function setMode(mode) {
    currentMode = mode;
    timeLeft = modes[mode];
    
    // Update active button styling
    modeBtns.forEach(btn => {
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    changeTheme(mode);
    resetTimer();
}

function changeTheme(mode) {
    const root = document.documentElement;
    if (mode === 'pomodoro') {
        root.style.setProperty('--bg-color-1', '#ff9a9e');
        root.style.setProperty('--bg-color-2', '#fecfef');
        root.style.setProperty('--bg-color-3', '#a1c4fd');
        root.style.setProperty('--bg-color-4', '#c2e9fb');
        root.style.setProperty('--primary-btn', '#ff7675');
        root.style.setProperty('--primary-btn-hover', '#d63031');
    } else if (mode === 'shortBreak') {
        root.style.setProperty('--bg-color-1', '#84fab0');
        root.style.setProperty('--bg-color-2', '#8fd3f4');
        root.style.setProperty('--bg-color-3', '#a1c4fd');
        root.style.setProperty('--bg-color-4', '#c2e9fb');
        root.style.setProperty('--primary-btn', '#00b894');
        root.style.setProperty('--primary-btn-hover', '#00cec9');
    } else if (mode === 'longBreak') {
        root.style.setProperty('--bg-color-1', '#a1c4fd');
        root.style.setProperty('--bg-color-2', '#c2e9fb');
        root.style.setProperty('--bg-color-3', '#e0c3fc');
        root.style.setProperty('--bg-color-4', '#8ec5fc');
        root.style.setProperty('--primary-btn', '#0984e3');
        root.style.setProperty('--primary-btn-hover', '#74b9ff');
    }
}

function playNotificationSound() {
    // Simple beep sound using Web Audio API
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
        
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
        console.log("Audio not supported or blocked");
    }
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

modeBtns.forEach(btn => {
    btn.addEventListener('click', () => setMode(btn.dataset.mode));
});

// Initialize
colon.classList.add('paused');
updateDisplay();
