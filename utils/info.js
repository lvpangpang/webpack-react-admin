const chalk = require("chalk");

function error(t, isExit = true) {
  console.log(chalk.red(`✖ ${t}`));
  isExit && process.exit();
}
function success(t, isExit) {
  console.log(chalk.green(`✔ ${t}`));
  isExit && process.exit();
}
function warning(t, isExit) {
  console.log(chalk.yellow(`⚠ ${t}`));
  isExit && process.exit();
}
function info(t, isExit) {
  console.log(chalk.blue(`ℹ ${t}`));
  isExit && process.exit();
}
function clearLog() {
  process.stdout.write(
    process.platform === "win32" ? "\x1B[2J\x1B[0f" : "\x1B[2J\x1B[3J\x1B[H"
  );
}
module.exports = {
  success,
  warning,
  info,
  clearLog,
  error,
};
