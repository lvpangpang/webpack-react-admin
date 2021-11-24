const detectPort = require("detect-port");
const { error, warning } = require('./info.js')

function getUnoccupiedPort(port = 3000) {
  return new Promise((resolve) => {
    detectPort(port, (err, _port) => {
      if (err) {
        error(err);
      }
      if (port !== _port) {
        warning(`端口号: ${port} 已被占用, 已切换至端口号: ${_port}`);
      }
      resolve(_port);
    });
  });
}

module.exports = getUnoccupiedPort

