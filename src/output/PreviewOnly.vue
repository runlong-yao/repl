<script setup lang="ts">
import Preview from './Preview.vue'
import { injectKeyStore } from '../../src/types'
import { provide, ref, computed, watch, watchEffect } from 'vue'
import { useStore, File } from '../store'
import type { Props } from '../Repl.vue'
import { useVueImportMap } from '../import-map'

interface PreviewProps {
  importMap: Record<string, string>
  css?: string[]
  files: Record<string, string>
  vueVersion?: string
}

const props = withDefaults(defineProps<PreviewProps>(), {
  vueVersion: '3.4.27',
})

const { importMap: builtinImportMap, vueVersion } = useVueImportMap()
watchEffect(() => (vueVersion.value = props.vueVersion))

const theme = ref<'light' | 'dark'>('dark')
const previewTheme = ref(false)
const clearConsole = ref(true)
const importMap = computed(() => {
  return {
    imports: {
      ...builtinImportMap.value.imports,
      ...props.importMap,
    },
  }
})

const store = useStore({
  vueVersion: vueVersion,
  builtinImportMap: importMap,
})

watchEffect(() => {
  for (let key in props.files) {
    store.addFile(new File(key, props.files[key]))
  }
})

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
