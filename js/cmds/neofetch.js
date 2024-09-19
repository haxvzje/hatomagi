const welcome = `<div class="nomobile">
<span data-color="lime">
██╗  ██╗<span data-color="pink">  █████╗ ████████╗ ██████╗ ███╗   ███╗ █████╗  ██████╗ ██╗</span>
██║  ██║<span data-color="pink"> ██╔══██╗╚══██╔══╝██╔═══██╗████╗ ████║██╔══██╗██╔════╝ ██║</span>
███████║<span data-color="pink"> ███████║   ██║   ██║   ██║██╔████╔██║███████║██║  ███╗██║</span>
██╔══██║<span data-color="pink"> ██╔══██║   ██║   ██║   ██║██║╚██╔╝██║██╔══██║██║   ██║██║</span>
██║  ██║<span data-color="pink"> ██║  ██║   ██║   ╚██████╔╝██║ ╚═╝ ██║██║  ██║╚██████╔╝██║</span>
╚═╝  ╚═╝<span data-color="pink"> ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝</span>                                                    
===> haxvzje about me (cli website) | forked from <a href="https://github.com/SX-9/term-port">SX-9/term-port</a>                                        
</span>
</div>`;

export default function(output) {
    output.innerHTML += welcome;
}