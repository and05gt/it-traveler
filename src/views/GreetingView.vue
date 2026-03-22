<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import IButton from '../components/IButton/IButton.vue'
</script>

<template>
  <BaseLayout
    ><div class="text-center">
      <img class="inline mb-6" src="../assets/img/map-pin.svg" alt="Map pin" />
      <h1 class="font-bold text-[38px] leading-10 tracking-[-0.408px] mb-7">IT traveler</h1>
      <p class="text-lg leading-6 mb-11 w-127">
        Простий і зручний веб додаток, який дозволить тобі відмічати твої улюблені місця, а також
        ті, в яких би ти дуже хотів побувати. Тож не зволікай і спробуй сам.
      </p>
      <IButton to="/auth/login">Почати роботу</IButton>
    </div>
  </BaseLayout>
</template>
