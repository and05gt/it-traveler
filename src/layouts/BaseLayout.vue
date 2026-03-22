<template>
  <main class="flex h-screen">
    <section class="flex-1 flex items-center justify-center bg-primary">
      <div class="text-white max-w-125 w-full">
        <slot></slot>
      </div>
    </section>
    <section class="flex-1">
      <img class="h-full w-full object-cover" src="../assets/img/static-map.png" alt="Static map" />
    </section>
  </main>
</template>
