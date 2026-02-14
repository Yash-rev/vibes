let body=document.querySelector("body");
let flag=1;
const chill = document.querySelector('.chill');
const rock=document.querySelector(".rock");
const RoomController = {
    state: {
        currentThemeIndex: 0,
        isPlaying: true,
        isLightOn: true,
        themes: [
            {
                name: 'lofi',
                audio: 'chill.mp3',
                gif: 'url("chill.gif")' // Fixed to match your uploaded file
            },
            {
                name: 'cyber',
                audio: 'lovers_rock.mp3',
                gif: 'url("cyber.gif")' 
            }
        ]
    },

    audio: new Audio(),
    analyser: null,
    ctx: null,
    audioCtx: null,

    init() {
        // Add this to create floating hearts on the entry overlay
const overlay = document.getElementById('entry-overlay');
for (let i = 0; i < 15; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-bg';
    heart.innerText = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    overlay.appendChild(heart);
}
        this.audio.crossOrigin = "anonymous";
        this.audio.loop = true;
        this.setupVisualizer();
        this.bindEvents();
        this.updateRoom();
    },

    async updateRoom() {

        
        const theme = this.state.themes[this.state.currentThemeIndex];
        
        // Update the theme attribute for CSS styling
        document.getElementById('experience-wrapper').setAttribute('data-theme', theme.name);
        
        // Update the window background
        document.querySelector('.window-view').style.backgroundImage = theme.gif;
        
        
    },

    setupVisualizer() {
        const canvas = document.getElementById('visualizer');
        this.ctx = canvas.getContext('2d');
        
        // Initialize AudioContext only once
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = this.audioCtx.createMediaElementSource(this.audio);
        this.analyser = this.audioCtx.createAnalyser();
        
        source.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
        this.analyser.fftSize = 64;
        
        this.draw();
    },

    draw() {
        requestAnimationFrame(() => this.draw());
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(dataArray);

        // Clear based on actual canvas dimensions
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        const barWidth = (this.ctx.canvas.width / bufferLength) * 2.5;
        let x = 0;

        dataArray.forEach(item => {
            const barHeight = (item / 255) * this.ctx.canvas.height;
            // Theme-based colors
            this.ctx.fillStyle = this.state.currentThemeIndex === 1 ? '#0ff' : '#8b5e3c';
            this.ctx.fillRect(x, this.ctx.canvas.height - barHeight, barWidth - 1, barHeight);
            x += barWidth;
        });
    },

    bindEvents() {
        document.getElementById('plant').addEventListener('click', () => {
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.className = 'click-sparkle'; // Reuses your existing sparkle style
        heart.innerText = '🌸';
        heart.style.left = (event.pageX + (Math.random() - 0.5) * 50) + 'px';
        heart.style.top = (event.pageY - 20) + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
});
        // Add this inside your RoomController.bindEvents or at the bottom
document.getElementById('enter-btn').addEventListener('click', () => {
    const overlay = document.getElementById('entry-overlay');
    overlay.classList.add('fade-out');
    
    // Resume AudioContext and play initial music
    if (RoomController.audioCtx.state === 'suspended') {
        RoomController.audioCtx.resume();
    }
    
    // Play the lofi track by default
    const chill = document.querySelector('.rock');
    rock.volume = 0.5;
    rock.play().catch(err => console.log("Playback error:", err));
});
        // Record Player: Switch Theme
        document.getElementById('record-player').addEventListener('click', () => {
            this.state.currentThemeIndex = (this.state.currentThemeIndex + 1) % this.state.themes.length;
            this.state.isPlaying = true;
            this.updateRoom();
            
             if(flag==1){
                body.style.backgroundColor="#0d0221";
                if (chill.pause) {
                    chill.volume = 0.5;
rock.volume = 0.5
                    chill.play().then(() => {
                     rock.pause();
                    }).catch(err => console.log("Playback blocked: ", err));
               } else {
                     chill.pause();
            
                }
                flag=0;

            }else{
               body.style.backgroundColor="#fdf6e3";
               if (rock.pause) {
                chill.volume = 0.5;
rock.volume = 0.5
                    rock.play().then(() => {
                    chill.pause();
                    }).catch(err => console.log("Playback blocked: ", err));
               } else {
                     rock.pause();
            
                }
               flag=1;
            } 
           
        });

        // Lamp: Toggle Light
       document.getElementById('lamp').addEventListener('click', () => {
    this.state.isLightOn = !this.state.isLightOn;
    
    // 1. Darken/Lighten the whole room
    document.querySelector('.room-container').classList.toggle('light-off');
    
    // 2. Toggle the actual glow around the lamp
    document.getElementById('lamp-wrapper').classList.toggle('glow');
});

        

        // Close Modal
        document.querySelector('.close-btn').addEventListener('click', () => {
            document.getElementById('portfolio-modal').classList.remove('open');
        });
    }
};


document.addEventListener('DOMContentLoaded', () => RoomController.init());

document.addEventListener('click', (e) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'click-sparkle';
    sparkle.style.left = `${e.pageX}px`;
    sparkle.style.top = `${e.pageY}px`;
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
});

document.addEventListener('click', (e) => {
    // Create the sparkle element
    const sparkle = document.createElement('div');
    sparkle.className = 'click-sparkle';
    
    // Position it at the mouse coordinates
    sparkle.style.left = `${e.pageX}px`;
    sparkle.style.top = `${e.pageY}px`;
    
    // Add a heart icon
    sparkle.innerText = '❤';
    
    // Add to the body
    document.body.appendChild(sparkle);
    
    // Remove from DOM after animation finishes (1 second)
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
});