<script setup>
import FavoritePlaceIconButton from './FavoritePlaceIconButton.vue'
import EditIcon from './EditIcon.vue'
import DeleteIcon from './DeleteIcon.vue'

const props = defineProps({
  title: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  img: String,
  isActive: {
    required: true,
    type: Boolean
  }
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <section class="text-gray">
    <div class="flex gap-3.5">
      <img class="w-19 h-19 shrink-0 rounded-md" :src="props.img" alt="Place image" />
      <div class="w-full">
        <div class="flex items-center justify-between mb-2">
          <h2 class="font-medium text-sm leading-5 tracking-[-0.408px] text-[#2c2c2c]">
            {{ props.title }}
          </h2>
          <div class="flex gap-2">
            <FavoritePlaceIconButton @click="emit('edit')">
              <EditIcon />
            </FavoritePlaceIconButton>
            <FavoritePlaceIconButton @click.stop="emit('delete')">
              <DeleteIcon />
            </FavoritePlaceIconButton>
          </div>
        </div>
        <p class="text-xs font-normal leading-4 tracking-[-0.408px] line-clamp-3">
          {{ props.description }}
        </p>
      </div>
    </div>

    <div
      class="h-px w-full bg-[#ececec] mt-4.5"
      :class="{ 'bg-primary': props.isActive, 'bg-[#ececec]': !props.isActive }"
    ></div>
  </section>
</template>
