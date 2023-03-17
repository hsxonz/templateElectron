<script lang="ts" setup>
import { NLayout } from 'naive-ui'
import { LayoutContent, LayoutHeader, LayoutSidebar } from './components'
</script>

<template>
  <NLayout position="absolute" has-sider>
    <LayoutSidebar />
    <NLayout>
      <LayoutHeader />
      <LayoutContent />
    </NLayout>
  </NLayout>
</template>
