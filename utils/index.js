const getAdminConfig = require('./getAdminConfig')
const checkPackageJsonVersion = require('./checkPackageJsonVersion')
const checkAdminVersion = require('./checkAdminVersion')
const getUnoccupiedPort = require('./getUnoccupiedPort')
const info = require('./info')
const open = require('./open')
const paths = require('./paths')
const env = require('./env')
const createRoutes = require('./init/createRoutes')
const createIndex = require('./init/createIndex')
const beautifyBuild = require('./beautyBuild')

module.exports = {
  getAdminConfig,
  checkPackageJsonVersion,
  checkAdminVersion,
  getUnoccupiedPort,
  ...info,
  open,
  ...paths,
  ...env,
  createRoutes,
  createIndex,
  beautifyBuild,
}
