<script setup>
import { computed, reactive } from 'vue'
import IButton from '../IButton/IButton.vue'
import MarkerIcon from '../icons/MarkerIcon.vue'
import IInput from '../IInput/IInput.vue'
import IModal from '../IModal/IModal.vue'
import InputImage from '../InputImage/InputImage.vue'

const props = defineProps({
  isOpen: {
    default: false,
    type: Boolean
  }
})

const emit = defineEmits(['close', 'submit'])
const formData = reactive({
  title: '',
  description: '',
  img: ''
})

const uploadText = computed(() => {
  return formData.img ? 'Натисніть тут, щоб змінити фото' : 'Натисніть тут, щоб додати фото'
})

const handleUpload = (url) => {
  formData.img = url
}
</script>

<template>
  <IModal v-if="props.isOpen" @close="emit('close')">
    <form class="min-w-105" @submit.prevent="emit('submit', formData)">
      <div class="flex justify-center items-center gap-2 font-bold mb-10.5">
        <MarkerIcon /> Додати маркер
      </div>
      <IInput class="mb-4.5" label="Локація" v-model="formData.title" />
      <IInput
        class="mb-4"
        label="Опис"
        type="textarea"
        placeholder="Введіть текст"
        v-model="formData.description"
      />
      <div class="flex gap-2 items-center mb-10.5">
        <img
          v-if="formData.img"
          :src="formData.img"
          alt="Place Image"
          class="w-8 h-8 object-cover"
        />
        <InputImage @uploaded="handleUpload">{{ uploadText }}</InputImage>
      </div>
      <IButton class="w-full" variant="gradient">Додати</IButton>
    </form>
  </IModal>
</template>
