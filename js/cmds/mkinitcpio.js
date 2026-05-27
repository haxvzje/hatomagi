export default function (output) {
  const args = Array.from(arguments).slice(1).join(' ');
  output.innerHTML += `<div><pre>`;
  output.innerHTML += `==> Building image from preset: 'default'\n`;
  output.innerHTML += `==> Using default configuration file: '/etc/mkinitcpio.conf'\n`;
  output.innerHTML += `==> ERROR: Permission denied\n`;
  output.innerHTML += `</pre></div>`;
}