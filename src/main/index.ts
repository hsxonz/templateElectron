import { app } from 'electron'
import { createEinf } from 'einf'
import { APP_CONSTANTS } from '@common/constants'
import { AppController } from './controllers/app.controller'
import { createWindow, restoreOrCreateWindow } from './windows/main.window'
import './logger'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
app.disableHardwareAcceleration()

const { IS_PROD } = APP_CONSTANTS
const isDev = !IS_PROD

const electronAppInit = async () => {
  // Single instance
  if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
  }
  else {
    app.on('second-instance', async () => {
      await restoreOrCreateWindow()
    })
  }

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
      app.exit()
  })

  app.on('activate', async () => {
    try {
      await restoreOrCreateWindow()
    }
    catch (error) {}
  })

  if (isDev) {
    if (process.platform === 'win32') {
      process.on('message', (data) => {
        if (data === 'graceful-exit')
          app.exit()
      })
    }
    else {
      process.on('SIGTERM', () => {
        app.exit()
      })
    }
  }
}

const bootstrap = async () => {
  try {
    await electronAppInit()

    await createEinf({
      window: createWindow,
      controllers: [AppController],
      injects: [
        {
          name: 'IS_DEV',
          inject: isDev,
        },
      ],
    })
  }
  catch (error) {
    app.quit()
  }
}

bootstrap()
