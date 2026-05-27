export default function (output) {
  const args = Array.from(arguments).slice(1).join(' ');
  output.innerHTML += `<div><pre>`;
  if (/^-a|\b\-a\b/.test(args)) {
    output.innerHTML += `Linux archlinux 6.9.1-arch1-1 #1 SMP PREEMPT_DYNAMIC Fri, 24 May 2026 11:11:11 +0000 x86_64 GNU/Linux\n`;
  } else if (/^-r|\b\-r\b/.test(args)) {
    output.innerHTML += `6.9.1-arch1-1\n`;
  } else {
    output.innerHTML += `Linux\n`;
  }
  output.innerHTML += `</pre></div>`;
}