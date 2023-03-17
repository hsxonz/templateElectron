import Store, { Schema } from 'electron-store'
import type ElectronStore from 'electron-store'
import { Nullable } from '@common/types'

import { Injectable } from 'einf'

interface Settings {
  foo: number
  bar: string
  nested: {
    fooNested: string
  }
}

const schema: Schema<Settings> = {
  foo: {
    type: 'number',
    maximum: 100,
    minimum: 1,
    default: 50,
  },
  bar: {
    type: 'string',
    default: 'bar',
  },
  nested: {
    type: 'object',
    properties: {
      footNested: {
        type: 'string',
      },
    },
    default: {
      footNested: 'fooNested',
    },
  },
}

@Injectable()
export class SettingsService {
  store: Nullable<ElectronStore<Settings>> = null

  constructor() {
    this.store = new Store({
      schema,
    })
  }

  public getKeyValue(key: string) {
    return this.store.get(key)
  }

  public setKeyValue(key: string, value: unknown) {
    return this.store.set(key, value)
  }
}
