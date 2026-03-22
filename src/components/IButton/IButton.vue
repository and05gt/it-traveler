<script setup>
import { defineProps, computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  variant: {
    default: 'primary',
    type: String,
    validator: (value) => {
      return ['primary', 'gradient', 'outlined'].includes(value)
    }
  },
  to: String,
  isLoading: {
    default: false,
    type: Boolean
  }
})

const bgStyles = computed(() => {
  return props.variant === 'gradient'
    ? 'bg-gradient-to-r from-[#ffa279] to-[#f3743d]'
    : 'bg-[#ffa279]'
})

const isLink = computed(() => !!props.to)

const componentName = computed(() => {
  return isLink.value ? RouterLink : 'button'
})

const link = computed(() => {
  return isLink.value ? props.to : undefined
})
</script>

<template>
  <component
    :is="componentName"
    class="rounded-xl py-3.5 px-10 text-white font-bold tracking-[-0.408px]"
    :class="bgStyles"
    :to="link"
  >
    <template v-if="props.isLoading">Loading...</template>
    <template v-else>
      <slot></slot>
    </template>
  </component>
</template>
