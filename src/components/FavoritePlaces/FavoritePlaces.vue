<script setup>
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'
import IButton from '../IButton/IButton.vue'

const props = defineProps({
  items: {
    required: true,
    type: Array
  },
  activeId: {
    required: true,
    type: [Number, null]
  }
})

const emit = defineEmits(['place-clicked', 'create'])
</script>

<template>
  <div class="px-6">
    <div class="text-sm text-gray font-normal leading-5 tracking-[-0.408px] mb-4.5">
      Додані маркери
    </div>
    <div v-if="items.length === 0">Список порожній</div>
    <FavoritePlace
      :key="place.id"
      v-for="place in props.items"
      :title="place.title"
      :description="place.description"
      :img="place.img"
      :is-active="place.id === props.activeId"
      @click="emit('place-clicked', place.id)"
    />
    <IButton class="w-full mt-10" variant="gradient" @click="emit('create')">Додати маркер</IButton>
  </div>
</template>
