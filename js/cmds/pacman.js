export default async function (output) {
  // Simulated Arch pacman-like outputs. Complex operations are denied.
  const argText = Array.from(arguments).slice(1).join(' ');
  output.innerHTML += `<div><pre>`;

  if (/^-Syu|\b\-Syu\b/.test(argText)) {
    output.innerHTML += `:: Synchronizing package databases...\n core.db failed to download\n extra.db failed to download\n community.db failed to download\nerror: failed to synchronize all databases (permission denied)\n`;
  } else if (/^-Syy|\b\-Syy\b/.test(argText)) {
    output.innerHTML += `:: Refreshing package databases...\nerror: failed to update core (permission denied)\n`;
  } else if (/^-Ss|\b\-Ss\b/.test(argText)) {
    output.innerHTML += `community/htop 3.3.0-2\n    Interactive process viewer\nextra/neofetch 7.1.0-2\n    A CLI system information tool\n`;
  } else if (/^-Qs|\b\-Qs\b/.test(argText)) {
    output.innerHTML += `local/pacman 6.1.0-1\n    A library-based package manager with dependency support\n`;
  } else if (/^-Qi|\b\-Qi\b/.test(argText)) {
    output.innerHTML += `Name            : pacman\nVersion         : 6.1.0-1\nDescription     : A library-based package manager with dependency support\nArchitecture    : x86_64\n`;
  } else if (/^-S\s+/i.test(argText)) {
    output.innerHTML += `resolving dependencies...\nlooking for conflicting packages...\nerror: failed to commit transaction (permission denied)\n`;
  } else if (/^-R|-Rn|--remove/.test(argText)) {
    output.innerHTML += `checking dependencies...\nerror: could not remove packages (permission denied)\n`;
  } else if (/^-U|\b\-U\b/.test(argText)) {
    output.innerHTML += `loading packages...\nerror: could not access local package (permission denied)\n`;
  } else {
    output.innerHTML += `error: invalid or restricted operation\nPermission denied\n`;
  }

  output.innerHTML += `</pre></div>`;
}
