<script setup lang="ts">
import type { Node } from '~/types/FileTree'

const props = withDefaults(
  defineProps<{
    selected: Node
    node: Node
    depth?: number
    selectDir?: boolean
    disabled?: boolean
  }>(),
  { depth: 0 },
)
const emit = defineEmits(['update:selected'])
const isFileSelected = computed(
  () => props.node.filepath === props.selected.filepath,
)
const isDirectory = computed(() => !!props.node.nodes)
// TODO: config default open from templates
const isDirectoryOpen = ref(true)
const isDisabled = computed(() => props.disabled || props.node.disabled)
function handleClick() {
  if (isDisabled.value) return
  if (isDirectory.value) {
    isDirectoryOpen.value = !isDirectoryOpen.value
    if (props.selectDir) emit('update:selected', props.node)
  } else if (props.node) emit('update:selected', props.node)
}
</script>

<template>
  <div>
    <button
      v-if="node.name"
      class="flex w-full items-center gap-1 rounded px-2 py-1 text-left text-sm"
      :style="{
        paddingLeft: `${0.2 + 0.8 * props.depth}rem`,
      }"
      :class="[
        isDisabled
          ? 'cursor-default text-gray-600'
          : 'hover:bg-gray-500 hover:bg-opacity-50',
        isFileSelected
          ? 'bg-gray-500 bg-opacity-50 text-gray-300'
          : 'text-gray-500',
      ]"
      role="treeitem"
      :aria-expanded="isDirectory ? isDirectoryOpen : undefined"
      :aria-disabled="isDisabled"
      @click="handleClick"
    >
      <Icon
        v-if="isDirectory"
        :class="isDirectoryOpen && 'rotate-90'"
        class="h-4 w-4 opacity-50 transition-transform duration-300"
        name="ph:caret-right"
      />
      <div v-else class="h-4 w-4"></div>
      <FileIcon
        class="h-4 w-4"
        :path="node.name"
        :is-directory="isDirectory"
        :is-directory-open="isDirectoryOpen"
      />
      <span class="ml-1">{{ node.name }}</span>
    </button>
    <div v-if="isDirectory" v-show="isDirectoryOpen">
      <FileTree
        v-for="(child, index) in node.nodes"
        :key="index"
        :selected="selected"
        :select-dir="selectDir"
        :node="child"
        :depth="depth + 1"
        :disabled="isDisabled"
        @update:selected="emit('update:selected', $event)"
      />
    </div>
  </div>
</template>
