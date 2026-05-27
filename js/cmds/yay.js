export default function (output) {
  const args = Array.from(arguments).slice(1).join(' ');
  output.innerHTML += `<div><pre>`;
  if (/^-S|\b\-S\b/.test(args)) {
    output.innerHTML += `:: Searching AUR...\n:: Parsing SRCINFO...\nerror: permission denied while building package\n`;
  } else if (/^-Ss|\b\-Ss\b/.test(args)) {
    output.innerHTML += `aur/visual-studio-code-bin 1.91.1-1 (+1200 12.3)\n    Visual Studio Code (binary release)\n`;
  } else {
    output.innerHTML += `error: operation restricted in this demo\nPermission denied\n`;
  }
  output.innerHTML += `</pre></div>`;
}