class TextDecodeEffect {
    constructor(el) {
                    this.el = el;
                    this.chars = '!<>-_\\/[]{}—=+*^?#________';
                    this.update = this.update.bind(this);
                    this.init();
    }
    
    init() {
        this.currentText = this.el.getAttribute('data-text') || this.el.innerText;
        this.targetText = this.currentText;
        this.phase = 'decode';
        this.nextText = null;
        this.startDecode(this.currentText);
    }

    buildQueue(text) {
        this.frame = 0;
        this.queue = [];
        
        for (let i = 0; i < text.length; i++) {
            const from = Math.floor(Math.random() * 40);
            const to = from + Math.floor(Math.random() * 40);
            this.queue.push({
                from,
                to,
                char: text[i],
                current: ''
            });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frameRequest = requestAnimationFrame(this.update);
    }

    startDecode(text) {
        this.phase = 'decode';
        this.targetText = text;
        this.buildQueue(text);
    }

    startEncode(length) {
        this.phase = 'encode';
        const randomText = this.randomString(length);
        this.targetText = randomText;
        this.buildQueue(randomText);
    }

    transitionTo(text) {
        const length = Math.max(this.currentText.length, text.length);
        this.nextText = text;
        this.startEncode(length);
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0; i < this.queue.length; i++) {
            let { from, to, char, current } = this.queue[i];
            
            if (this.frame >= to) {
                complete++;
                output += char;
            } else if (this.frame >= from) {
                if (!current || Math.random() < 0.28) {
                    current = this.randomChar();
                    this.queue[i].current = current;
                }
                output += `<span style="color: #cad3f5;">${current}</span>`;
            } else {
                // Encode phase: show random characters from the start
                if (!current || Math.random() < 0.28) {
                    current = this.randomChar();
                    this.queue[i].current = current;
                }
                output += `<span style="color: #cad3f5;">${current}</span>`;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            cancelAnimationFrame(this.frameRequest);
            if (this.phase === 'encode' && this.nextText) {
                const next = this.nextText;
                this.nextText = null;
                this.startDecode(next);
                return;
            }
            if (this.phase === 'decode') {
                this.currentText = this.targetText;
            }
        } else {
            this.frame++;
            this.frameRequest = requestAnimationFrame(this.update);
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }

    randomString(length) {
        let str = '';
        for (let i = 0; i < length; i++) {
            str += this.randomChar();
        }
        return str;
    }
}

const elements = document.querySelectorAll('.decode-text');
const quotes = [
    "what's cookin', haxvzje?",
    'fomo homo',
    "khanhbel's gay af",
    'p3rfect b1t',
    'gudbye wxrd!'
];

elements.forEach((el) => {
    const effect = new TextDecodeEffect(el);
    let index = 0;

    setInterval(() => {
        index = (index + 1) % quotes.length;
        el.setAttribute('data-text', quotes[index]);
        effect.transitionTo(quotes[index]);
    }, 3500);
});