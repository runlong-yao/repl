<script setup lang="ts">
import Preview from './Preview.vue'
import { injectKeyStore } from '../../src/types'
import { provide, ref, computed, watch, watchEffect } from 'vue'
import { useStore, File } from '../store'
import type { Props } from '../Repl.vue'
import { useVueImportMap } from '../import-map'

const { importMap: builtinImportMap, vueVersion } = useVueImportMap({
  runtimeDev: import.meta.env.PROD
    ? undefined
    : `${location.origin}/src/vue-dev-proxy`,
  serverRenderer: import.meta.env.PROD
    ? undefined
    : `${location.origin}/src/vue-server-renderer-dev-proxy`,
  vueVersion: '3.4.27',
})

const theme = ref<'light' | 'dark'>('dark')
const previewTheme = ref(false)
const clearConsole = ref(true)

const importMap = computed(() => {
  return {
    imports: {
      ...builtinImportMap.value.imports,
      'naive-esm': `${location.origin}/naive-esm/naive-esm.js`,
    },
  }
})

let code = `<script setup>
<\/script>

<template>
  <NInput>hello</NInput>
</template>
`

const file = new File('src/App.vue', code)

const store = useStore({
  vueVersion: vueVersion,
  builtinImportMap: importMap,
})

store.addFile(file)

store.init()

provide(injectKeyStore, store)!
provide('clear-console', clearConsole)
provide('theme', theme)
provide('preview-theme', previewTheme)
provide('preview-options', {
  bodyHTML: '',
} as Props['previewOptions'])
</script>

<template>
  <Preview :ssr="false" :show="true" />
</template>
