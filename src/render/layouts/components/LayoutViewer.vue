<script lang="ts" setup>
import { useLoadingBar } from 'naive-ui'
import router from '@render/router'

const loadingBar = useLoadingBar()

router.beforeEach(() => loadingBar?.start())

router.afterEach(() => loadingBar?.finish())
</script>

<template>
  <router-view />
</template>
