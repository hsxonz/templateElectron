/* eslint-disable import/no-mutable-exports */
import { join } from 'path'
import { BrowserWindow, app, shell } from 'electron'
import { APP_CONSTANTS } from '@common/constants'
import { Nullable } from '@common/types'

const { APP_NAME, APP_VERSION, APP_MIN_HEIGHT, APP_MIN_WIDTH, IS_PROD } = APP_CONSTANTS

const isDev = !IS_PROD
export let win: Nullable<BrowserWindow> = null

export const createWindow = async () => {
  win = new BrowserWindow({
    title: `${APP_NAME} ${APP_VERSION}`,
    minHeight: APP_MIN_HEIGHT,
    minWidth: APP_MIN_WIDTH,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js'),
      devTools: isDev,
    },
    autoHideMenuBar: !isDev,
  })

  const URL = isDev ? process.env.DS_RENDERER_URL : `file://${join(app.getAppPath(), 'dist/render/index.html')}`

  win.loadURL(URL)

  if (isDev)
    win.webContents.openDevTools()
  else win.removeMenu()

  // External urls
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:') || url.startsWith('mailto:'))
      shell.openExternal(url)
    return { action: 'deny' }
  })

  win.once('ready-to-show', async () => {
    win.setAlwaysOnTop(false)
    win.maximize()
    win.show()
    win.focus()
  })

  win.on('closed', () => {
    win.destroy()
  })

  return win
}

export const restoreOrCreateWindow = async () => {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed())

  if (window === undefined)
    window = await createWindow()

  if (window.isMinimized())
    window.restore()

  window.focus()
}
