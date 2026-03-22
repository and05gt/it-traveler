<script setup>
import { onMounted, onUnmounted, Teleport } from 'vue'
import CrossIcon from '../icons/CrossIcon.vue'

const emit = defineEmits(['close'])

onMounted(() => {
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.body.style.overflow = 'initial'
})
</script>

<template>
  <component :is="Teleport" to="body">
    <div
      class="flex w-full h-full fixed top-0 left-0 overflow-auto bg-[rgba(30,30,30,0.5)]"
      @click.self="emit('close')"
    >
      <div class="relative bg-white min-w-87.5 m-auto text-black rounded-2xl px-10 pt-9.5 pb-10">
        <button class="absolute top-6 right-6 w-7 h-7">
          <CrossIcon @click="emit('close')" />
        </button>
        <slot></slot>
      </div>
    </div>
  </component>
</template>
