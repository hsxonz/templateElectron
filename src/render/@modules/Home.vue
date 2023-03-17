<script lang="ts">
import HelloWorld from '@render/components/HelloWorld.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ViewHome',
  components: {
    HelloWorld,
  },
})
</script>

<template>
  <HelloWorld title="Vite + Electron & Esbuild" />
</template>

<style scoped></style>
