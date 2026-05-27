export default function (output) {
  const args = Array.from(arguments).slice(1).join(' ');
  output.innerHTML += `<div><pre>`;
  if (/^-a|\b\-a\b/.test(args)) {
    output.innerHTML += `LSB Version:    n/a\nDistributor ID: Arch\nDescription:    Arch Linux\nRelease:        rolling\nCodename:       n/a\n`;
  } else {
    output.innerHTML += `Arch Linux\n`;
  }
  output.innerHTML += `</pre></div>`;
}