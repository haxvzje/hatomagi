export default function(output) {
    output.innerHTML += `\
Here Is A List Of Commands:
    <span data-color="lime">help</span> <span data-color="grey">-</span> <span data-color="yellow">Displays This.</span>
    <span data-color="lime">gui</span> <span data-color="grey">-</span> <span data-color="yellow">Activate Graphical Mode.</span>
    <span data-color="lime">about</span> <span data-color="grey">-</span> <span data-color="yellow">Who Is This?</span>
    <span data-color="lime">quote</span> <span data-color="grey">-</span> <span data-color="yellow">Just Some Random Quotes.</span>
    <span data-color="lime">source</span> <span data-color="grey">-</span> <span data-color="yellow">Source Code For This Website.</span>
    <span data-color="lime">projects [name?]</span> <span data-color="grey">-</span> <span data-color="yellow">My Github Repos!</span>
    <span data-color="lime">socials [platform?]</span> <span data-color="grey">-</span> <span data-color="yellow">Contact Me Here!</span>
    <span data-color="lime">pacman [args]</span> <span data-color="grey">-</span> <span data-color="yellow">Arch package manager (simulated).</span>
    <span data-color="lime">yay [args]</span> <span data-color="grey">-</span> <span data-color="yellow">AUR helper (simulated).</span>
    <span data-color="lime">paru [args]</span> <span data-color="grey">-</span> <span data-color="yellow">AUR helper (simulated).</span>
    <span data-color="lime">systemctl [args]</span> <span data-color="grey">-</span> <span data-color="yellow">Systemd control (restricted).</span>
    <span data-color="lime">journalctl [args]</span> <span data-color="grey">-</span> <span data-color="yellow">System logs (restricted).</span>
    <span data-color="lime">makepkg [args]</span> <span data-color="grey">-</span> <span data-color="yellow">Build packages (restricted).</span>
    <span data-color="lime">mkinitcpio [args]</span> <span data-color="grey">-</span> <span data-color="yellow">Initramfs generator (restricted).</span>
    <span data-color="lime">uname [args]</span> <span data-color="grey">-</span> <span data-color="yellow">Kernel info.</span>
    <span data-color="lime">lsb_release [args]</span> <span data-color="grey">-</span> <span data-color="yellow">Distro info.</span>
<span data-color="grey">--------------------------------------------</span>
Extra Commands For Fun:
    <span data-color="lime">clear</span> <span data-color="grey">-</span> <span data-color="yellow">Clears The Terminal.</span>
    <span data-color="lime">whoami</span> <span data-color="grey">-</span> <span data-color="yellow">What's Your Name?</span>
    <span data-color="lime">neofetch</span> <span data-color="grey">-</span> <span data-color="yellow">Prints current system logo.</span>
    <span data-color="lime">history</span> <span data-color="grey">-</span> <span data-color="yellow">Prints Your Command History.</span>
    <span data-color="lime">hostname</span> <span data-color="grey">-</span> <span data-color="yellow">What Is This?</span>
    <span data-color="lime">echo [text]</span> <span data-color="grey">-</span> <span data-color="yellow">Prints [text].</span>
    <span data-color="lime">eval [code]</span> <span data-color="grey">-</span> <span data-color="yellow">Eval [code] As JS.</span>
    <span data-color="lime">search [query]</span> <span data-color="grey">-</span> <span data-color="yellow">Google It!</span>
`;
}
