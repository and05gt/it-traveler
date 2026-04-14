<script setup>
import { useModal } from '@/composables/useModal'
import EditPlaceModal from '../EditPlaceModal/EditPlaceModal.vue'
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'
import IButton from '../IButton/IButton.vue'
import { computed, ref } from 'vue'
import { useMutation } from '@/composables/useMutation'
import { deleteFavoritePlace, updateFavoritePlace } from '@/api/favorite-places'

const props = defineProps({
  items: {
    required: true,
    type: Array
  },
  activeId: {
    required: true,
    type: [String, null]
  },
  isPlacesLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['place-clicked', 'create', 'updated'])

const idOfDeletedItem = ref(null)

const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal()
const {
  isOpen: isConfirmationModalOpen,
  openModal: openConfirmationModal,
  closeModal: closeConfirmationModal
} = useModal()

const {
  mutation: deletePlace,
  isLoading: isDeleting,
  error: deleteError
} = useMutation({
  mutationFn: (id) => deleteFavoritePlace(id),
  onSuccess: () => {
    closeConfirmationModal()
    idOfDeletedItem.value = null
    emit('updated')
  }
})

const selectedId = ref(null)
const selectedItem = computed(() => props.items.find((place) => place.id === selectedId.value))

const { mutation: updatePlace, isLoading } = useMutation({
  mutationFn: (formData) =>
    updateFavoritePlace(formData.id, {
      title: formData.title,
      description: formData.description,
      img: formData.img,
      coordinates: formData.coordinates
    }),
  onSuccess: () => {
    closeEditModal()
    emit('updated')
  }
})

const handleEditPlace = (id) => {
  selectedId.value = id
  openEditModal()
}

const handleSubmit = (formData) => {
  updatePlace(formData)
}

const handleOpenConfirmationModal = (id) => {
  idOfDeletedItem.value = id
  openConfirmationModal()
}

const handleDeletePlace = () => {
  deletePlace(idOfDeletedItem.value)
}
</script>

<template>
  <div class="px-6">
    <div class="text-sm text-gray font-normal leading-5 tracking-[-0.408px] mb-4.5">
      Додані маркери
    </div>
    <div v-if="items.length === 0 && !isPlacesLoading">Список порожній</div>
    <div class="flex flex-col gap-6">
      <FavoritePlace
        :key="place.id"
        v-for="place in props.items"
        :title="place.title"
        :description="place.description"
        :img="place.img"
        :is-active="place.id === props.activeId"
        @click="emit('place-clicked', place.id)"
        @edit="handleEditPlace(place.id)"
        @delete="handleOpenConfirmationModal(place.id)"
      />
    </div>
    <EditPlaceModal
      :is-open="isEditOpen"
      :place="selectedItem"
      :is-loading="isLoading"
      @close="closeEditModal"
      @submit="handleSubmit"
    />
    <ConfirmationModal
      :is-open="isConfirmationModalOpen"
      :is-loading="isDeleting"
      :has-error="deleteError"
      @cancel="closeConfirmationModal"
      @confirm="handleDeletePlace"
      title="Ви дійсно хочете видалити улюблене місце?"
    />
    <IButton class="w-full mt-10" variant="gradient" @click="emit('create')">
      Додати маркер
    </IButton>
  </div>
</template>
