import path from 'path'
import os from 'os'
import { app } from 'electron'
import pjson from '../../package.json'

const { name: appName, version: appVersion } = pjson

const USER_DATA_PATH = app.getPath('home')
export const APP_DATA_PATH = path.resolve(USER_DATA_PATH, '.genlogin')

export const APP_CONSTANTS = {
  IS_PROD: app.isPackaged,
  APP_NAME: appName,
  APP_VERSION: appVersion,
  APP_MIN_HEIGHT: 900,
  APP_MIN_WIDTH: 1600,
}

// OS
export const getPlatform = () => os.platform()
export const IS_MAC = getPlatform() === 'darwin'
export const IS_WINDOWS = getPlatform() === 'win32'
export const IS_LINUX = getPlatform() === 'linux'
