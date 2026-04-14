<script setup>
import { onMounted } from 'vue'
import { useMutation } from '@/composables/useMutation'
import { getUserInfo } from '@/api/auth'
import UserIcon from './UserIcon.vue'

const {
  data: userInfo,
  mutation: getUser,
  isLoading
} = useMutation({
  mutationFn: () => getUserInfo()
})

onMounted(() => {
  getUser()
})
</script>

<template>
  <div
    class="flex sticky top-0 items-center text-[#2c2c2c] text-lg font-medium gap-3.5 bg-[#ffe6dc] border-solid border-b-2 border-primary rounded-bl-2xl rounded-br-2xl px-6 py-4.5 mb-11"
  >
    <div class="w-11 h-11 flex items-center justify-center rounded-full color-primary bg-primary">
      <UserIcon class="text-white" />
    </div>
    <span v-if="isLoading">Loading...</span>
    <span v-if="userInfo">{{ userInfo.data.data.name }}</span>
  </div>
</template>
