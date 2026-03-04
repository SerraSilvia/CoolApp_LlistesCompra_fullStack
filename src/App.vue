<script setup>
import navbar from './components/navbar.vue'
import footerComp from './components/footerComp.vue'

</script>
<template>
  <div class="app-container">
    <navbar />
    <main class="content">
      <router-view />
    </main>
    <footerComp /> 
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1; /* Empuja el footer hacia abajo */
}
</style>