<script setup>
import { useRouter } from 'vue-router'
import LoginForm from '../components/Auth/LoginForm/LoginForm.vue'
import { useMutation } from '../composables/useMutation'
import { authService } from '@/api/authService'

const router = useRouter()

const {
  isLoading,
  error,
  mutation: handleLoginUser
} = useMutation({
  mutationFn: (data) => authService.login(data),
  onSuccess: () => router.replace('/map')
})
</script>

<template>
  <LoginForm @submit="handleLoginUser" :is-loading="isLoading" />
  <div v-if="error" class="text-red-500">{{ error.message }}</div>
</template>
