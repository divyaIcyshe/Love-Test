let score = 0;
let currentQ = 0;

const questions = [
    { q: "What is my favorite color?", opts: ["Pink", "Black", "Red", "Maroon"], ans: 3 },
    { q: "Where did we first talk?", opts: ["WhatsApp", "Instagram", "College", "Mutual Friend"], ans: 1 },
    { q: "What's my favorite snack?", opts: ["Aditya", "Pani Puri", "Chocolate", "Chips"], ans: 0 },
    { q: "Which habit of you annoys me?", opts: ["No Updates", "Late replies", "Sleeping without saying GN", "Huh"], ans: 0 },
    { q: "What is my dream travel destination?", opts: ["Paris", "Maldives", "Switzerland", "Bali"], ans: 3 },
    { q: "Who is my favorite Dish?", opts: ["Momos", "Chocolate Cake", "Chicken", "Fish"], ans: 3 },
    { q: "What do i like the most to wear?", opts: ["Saree", "Jeans", "Dress", "one Piece"], ans: 0 }
];

// Event Listeners
document.getElementById('startBtn').addEventListener('click', startQuiz);
// Route the "see ahead" button to the password screen first
document.getElementById('seeAheadBtn').addEventListener('click', showPasswordScreen);
document.getElementById('yesBtn').addEventListener('click', celebrate);
const noBtn = document.getElementById('noBtn');
noBtn.addEventListener('pointerenter', moveButton);
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveButton(); });

function startQuiz() {
    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('quizScreen').classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    const feedback = document.getElementById('feedback');
    feedback.innerText = "";
    feedback.className = "";
    
    if (currentQ < questions.length) {
        document.getElementById('questionText').innerText = questions[currentQ].q;
        const container = document.getElementById('optionsContainer');
        container.innerHTML = '';
        
        questions[currentQ].opts.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.innerText = opt;
            btn.onclick = () => checkAnswer(i);
            container.appendChild(btn);
        });
    } else {
        showReport();
    }
}

function checkAnswer(i) {
    const feedback = document.getElementById('feedback');
    if (i === questions[currentQ].ans) {
        score++;
        feedback.innerText = "Correct! 💖";
        feedback.className = "correct-pop";
    } else {
        feedback.innerText = "Wrong! Huhhhhhhhhhhh.";
        feedback.className = "wrong-shake";
    }
    document.getElementById('currentScore').innerText = score;
    currentQ++;
    setTimeout(loadQuestion, 1200);
}

function showReport() {
    document.getElementById('quizScreen').classList.add('hidden');
    document.getElementById('reportScreen').classList.remove('hidden');
    document.getElementById('finalMarks').innerText = `${score}/7`;
    const evalText = document.getElementById('evaluationText');
    evalText.innerText = score >= 5 ? "Wow! You are a Pro Boyfriend! 🏆" : "Huhh 😅";
}

// UPDATE THIS FUNCTION
function showValentine() {
    // Hide any previous screens then show the valentine screen
    const screens = ['welcomeScreen','quizScreen','reportScreen','passwordScreen','letterScreen'];
    screens.forEach(id => { const el = document.getElementById(id); if(el) el.classList.add('hidden'); });
    const val = document.getElementById('valentineScreen'); if(val) val.classList.remove('hidden');
}

function moveButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

function celebrate() {
    document.getElementById('question').classList.add('hidden');
    document.getElementById('btnGroup').classList.add('hidden');
    document.getElementById('finalMessage').style.display = 'block';

    setInterval(() => {
        const item = document.createElement('div');
        item.classList.add('falling');
        item.innerText = ['❤️', '💋', '💖', '😘'][Math.floor(Math.random() * 4)];
        item.style.left = Math.random() * 100 + 'vw';
        item.style.fontSize = (Math.random() * 20 + 15) + 'px';
        item.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(item);
        setTimeout(() => item.remove(), 3000);
    }, 200);
}

// >>> ADD THESE NEW FUNCTIONS <<<

function showPasswordScreen() {
    document.getElementById('reportScreen').classList.add('hidden');
    document.getElementById('passwordScreen').classList.remove('hidden');
}

function checkPassword() {
    const pass = document.getElementById('passInput').value;
    const error = document.getElementById('passError');
    
    // Set your password here (e.g., 1210 for Oct 12)
    if (pass === "2828") { 
        document.getElementById('passwordScreen').classList.add('hidden');
        document.getElementById('letterScreen').classList.remove('hidden');
    } else {
        error.style.display = 'block';
        error.classList.add('wrong-shake');
        setTimeout(() => error.classList.remove('wrong-shake'), 500);
    }
}
/* Background floating emojis (hearts & kisses) */
(function backgroundParticles(){
    const canvas = document.createElement('canvas');
    canvas.id = 'bgParticles';
    canvas.style.position = 'fixed';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let DPR = window.devicePixelRatio || 1;
    let W = 0, H = 0;
    function resize(){
        DPR = window.devicePixelRatio || 1;
        W = Math.max(300, window.innerWidth);
        H = Math.max(300, window.innerHeight);
        canvas.width = Math.floor(W * DPR);
        canvas.height = Math.floor(H * DPR);
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    window.addEventListener('resize', resize);
    resize();

    const EMOJIS = ['❤️','💋','💖','💕','😘'];
    const particles = [];

    function createParticles(){
        particles.length = 0;
        const count = (window.innerWidth > 700) ? 28 : 12;
        for(let i=0;i<count;i++){
            const size = 10 + Math.random()*20; // small delicate
            particles.push({
                x: Math.random()*W,
                y: Math.random()*H,
                vx: (Math.random()-0.5)*0.2,
                vy: - (0.1 + Math.random()*0.3),
                size: size,
                emoji: EMOJIS[Math.floor(Math.random()*EMOJIS.length)],
                sway: Math.random()*2 + 1.5,
                phase: Math.random()*Math.PI*2,
                alpha: 0.6 + Math.random()*0.25
            });
        }
    }
    createParticles();

    let last = performance.now();
    function loop(now){
        const dt = Math.min(40, now - last) / 1000; last = now;
        ctx.clearRect(0,0,W,H);
        for(const p of particles){
            // gentle horizontal sway
            p.phase += dt * p.sway;
            p.x += p.vx + Math.sin(p.phase) * 0.2 * dt * 30;
            p.y += p.vy * (0.9 + Math.sin(p.phase)*0.05) * (dt*60);
            // wrap to bottom when goes off top
            if(p.y < -40) p.y = H + 20 + Math.random()*80;
            if(p.x < -40) p.x = W + 20;
            if(p.x > W + 40) p.x = -20;

            ctx.globalAlpha = p.alpha;
            ctx.font = `${p.size}px serif`;
            ctx.textAlign = 'center';
            ctx.fillText(p.emoji, p.x, p.y);
        }
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    // recreate particles on orientation change for better distribution
    window.addEventListener('orientationchange', ()=>{ setTimeout(createParticles,200); });
})();
