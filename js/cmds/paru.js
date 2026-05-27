export default function (output) {
  const args = Array.from(arguments).slice(1).join(' ');
  output.innerHTML += `<div><pre>`;
  if (/^-S|\b\-S\b/.test(args)) {
    output.innerHTML += `:: Resolving dependencies...\nerror: could not build AUR package (permission denied)\n`;
  } else if (/^-Ss|\b\-Ss\b/.test(args)) {
    output.innerHTML += `aur/google-chrome 125.0.6422.112-1 (+2550 18.2)\n    The popular web browser by Google\n`;
  } else {
    output.innerHTML += `error: operation restricted in this demo\nPermission denied\n`;
  }
  output.innerHTML += `</pre></div>`;
}