<script setup lang="ts">
import { sendMsgToMainProcess } from '@render/api'
import { useIpc } from '@render/plugins/ipc'
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Vite + Electron & Esbuild',
  },
})

const log = ref('')
const msg = ref('')

const sendMsg = async () => {
  try {
    log.value += `[render]: ${msg.value} \n`
    const { data } = await sendMsgToMainProcess(msg.value)
    log.value += `[main]: ${data}  \n`
  }
  catch (error) {
    console.error(error)
  }
}

const ipc = useIpc()

ipc.on('reply-msg', (msg: string) => {
  log.value += `[main]: ${msg}  \n`
})
</script>

<template>
  <h1>{{ title }}</h1>

  <n-input v-model:value="log" type="textarea" cols="60" rows="10" disabled />

  <n-space class="mt-2" vertical>
    <n-input v-model="msg" type="text" placeholder="send msg to main process" />
    <n-button ghost @click="sendMsg">
      Send
    </n-button>
  </n-space>
</template>

<style>
</style>
