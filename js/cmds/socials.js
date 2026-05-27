export default function(output, _hist, ...args) {
    let social = args[0];
    switch (social) {
        case 'github':
            window.open('https://github.com/haxvzje');
            break;
        case 'discord':
            window.open('https://discord.com/users/787936379199291392');
            break;
        case 'twitter':
            window.open('https://x.com/haxvzje');
            break;
        case 'email':
            window.open('mailto:haxvzje@hatomagi.site');
            break;
        default:
            output.innerHTML += `\
<span data-color="white">Github: <a href="https://github.com/haxvzje">@haxvzje</a></span>
<span data-color="MediumSlateBlue">Discord: <a href="https://discord.com/users/787936379199291392">@ch1zuru_</a></span>
<span data-color="cyan">Twitter: <a href="https://x.com/haxvzje">@haxvzje</a></span>
<span data-color="yellow">Email: <a href="mailto:haxvzje@hatomagi.site">haxvzje@hatomagi.site</a></span>

`;
        return;
    }
    if (social) output.innerHTML += '<span data-color="orange">Opening ' + social + '...</span>';
}