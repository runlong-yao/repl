/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { createApp, h, ref, watchEffect, provide } from 'vue'
import { type OutputModes, Repl, useStore, useVueImportMap } from '../src'
import { default as PreviewOnly } from '../src/output/PreviewOnly.vue'
import {} from '../src/types'
// @ts-ignore
import MonacoEditor from '../src/editor/MonacoEditor.vue'
// @ts-ignore
import CodeMirrorEditor from '../src/editor/CodeMirrorEditor.vue'

const window = globalThis.window as any
window.process = { env: {} }

const App = {
  setup() {
    return () => h(PreviewOnly)
  },
}

createApp(App).mount('#app')
