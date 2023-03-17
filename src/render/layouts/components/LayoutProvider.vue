<script lang="ts" setup>
import { computed } from 'vue'
import {
  NConfigProvider,
  NDialogProvider,
  NGlobalStyle,
  NLoadingBarProvider,
  NMessageProvider,
  darkTheme,
  useOsTheme,
} from 'naive-ui'
const osTheme = useOsTheme()

const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : null))
</script>

<template>
  <NConfigProvider :theme="theme">
    <NGlobalStyle />
    <NLoadingBarProvider>
      <NMessageProvider>
        <NDialogProvider>
          <slot />
        </NDialogProvider>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>
