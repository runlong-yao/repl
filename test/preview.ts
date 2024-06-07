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
    let mainFile = `
    <script setup>
      import {NButton} from "naive"
    </script>
    <template>
      <NButton>按钮</NButton>
    </template>
    `

    return () =>
      h(PreviewOnly, {
        importMap: {
          naive: `${location.origin}/naive-esm/naive-esm.js`,
        },
        css: [`${location.origin}/body.css`],
        files: {
          'src/App.vue': mainFile,
        },
      })
  },
}

createApp(App).mount('#app')
