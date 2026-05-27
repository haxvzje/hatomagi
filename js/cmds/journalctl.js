export default function (output) {
  const args = Array.from(arguments).slice(1).join(' ');
  output.innerHTML += `<div><pre>`;
  output.innerHTML += `-- Logs begin at Thu 2026-05-27 08:00:00 UTC, end at Thu 2026-05-27 08:12:00 UTC. --\n`;
  output.innerHTML += `May 27 08:00:01 archlinux systemd[1]: Starting Network Manager...\n`;
  output.innerHTML += `May 27 08:00:02 archlinux systemd[1]: Started Network Manager.\n`;
  output.innerHTML += `May 27 08:00:03 archlinux kernel: Linux version 6.9.1-arch1-1 (builder@archlinux)\n`;
  output.innerHTML += `\nHint: You are not permitted to read all logs.\nPermission denied\n`;
  output.innerHTML += `</pre></div>`;
}