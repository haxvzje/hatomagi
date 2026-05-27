// Map simple token names to Catppuccin Macchiato palette tokens (dark)
const PALETTE = {
    rosewater: '#f4dbd6',
    flamingo: '#f0c6c6',
    pink: '#f5bde6',
    mauve: '#c6a0f6',
    red: '#ed8796',
    maroon: '#ee99a0',
    peach: '#f5a97f',
    yellow: '#eed49f',
    green: '#a6da95',
    teal: '#8bd5ca',
    sky: '#91d7e3',
    sapphire: '#7dc4e4',
    blue: '#8aadf4',
    lavender: '#b7bdf8',
    text: '#cad3f5',
    subtext1: '#b8c0e0',
    subtext0: '#a5adcb',
    overlay2: '#939ab7',
    overlay1: '#8087a2',
    overlay0: '#6e738d',
    surface2: '#5b6078',
    surface1: '#494d64',
    surface0: '#363a4f',
    base: '#24273a',
    mantle: '#1e2030',
    crust: '#181926',
    // Common semantic names mapped to palette
    lime: '#a6da95', // map lime -> green token
    grey: '#a5adcb',
    yellowAlt: '#eed49f',
    cyan: '#8bd5ca'
};

setInterval(() => {
    document.querySelectorAll('span').forEach((el) => {
        let color = el.getAttribute('data-color') || '';
        // If the attribute already contains a hex value, use it
        if (/^#/.test(color)) {
            el.style.color = color;
            return;
        }
        // normalize token name
        const key = color.toLowerCase();
        if (PALETTE[key]) {
            el.style.color = PALETTE[key];
        } else if (PALETTE[key + 'Alt']) {
            el.style.color = PALETTE[key + 'Alt'];
        } else {
            // fallback: use the raw value (may be a CSS color name)
            el.style.color = color;
        }
    });

    // help button behavior (kept from original)
    document.querySelectorAll('.help').forEach((el) => {
        el.onclick = () => {
            let inputs = document.querySelectorAll('input');
            inputs[inputs.length - 1].value = 'help';
            window?.onkeydown({
                key: 'Enter',
            });
        };
    });
});