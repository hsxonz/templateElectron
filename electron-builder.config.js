/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */

const pjson = require('./package.json')

const config = {
  directories: {
    output: 'release' + `/${pjson.version}`,
    buildResources: 'build',
  },
  publish: null,
  npmRebuild: false,
  buildDependenciesFromSource: true,
  files: [
    'build/**/*',
    'dist/main/**/*',
    'dist/preload/**/*',
    'dist/render/**/*',
  ],
}

module.exports = config
