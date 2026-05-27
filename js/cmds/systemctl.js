export default function (output) {
  const args = Array.from(arguments).slice(1).join(' ');
  output.innerHTML += `<div><pre>`;

  if (!args || /status/.test(args)) {
    output.innerHTML += `System has not been booted with systemd as init system (PID 1).\nFailed to connect to bus: Permission denied\n`;
  } else if (/start|stop|restart|enable|disable/.test(args)) {
    output.innerHTML += `Failed to ${args.split(' ')[0]} unit: Permission denied\n`;
  } else if (/list-units/.test(args)) {
    output.innerHTML += `UNIT                          LOAD   ACTIVE SUB     DESCRIPTION\ngetty@tty1.service           loaded active running Getty on tty1\nssh.service                  loaded active running OpenSSH Daemon\n`;
    output.innerHTML += `\nerror: permission denied reading all units\n`;
  } else {
    output.innerHTML += `error: operation restricted in this demo\nPermission denied\n`;
  }

  output.innerHTML += `</pre></div>`;
}