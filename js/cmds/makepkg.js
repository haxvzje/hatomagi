export default function (output) {
  const args = Array.from(arguments).slice(1).join(' ');
  output.innerHTML += `<div><pre>`;
  output.innerHTML += `==> Making package: demo 1.0-1 (Thu 27 May 2026 08:15:00 UTC)\n`;
  output.innerHTML += `==> Checking runtime dependencies...\n==> Checking buildtime dependencies...\n`;
  output.innerHTML += `==> ERROR: Permission denied while preparing build directory\n`;
  output.innerHTML += `</pre></div>`;
}