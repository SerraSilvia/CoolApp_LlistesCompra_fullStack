<template>
  <div class="detail-page">
    <router-link to="/tasks" class="btn-back">⬅ Tornar a les llistes</router-link>

    <div v-if="llista" class="detail-card">
      <header class="detail-header">
        <div>
          <h1>{{ llista.titol }}</h1>
          <span :class="['badge', llista.comprat ? 'status-done' : 'status-pending']">
            {{ llista.comprat ? 'Completada' : 'Pendent' }}
          </span>
        </div>
        <button @click="toggleEstatLlista" class="btn-toggle">
          {{ llista.comprat ? 'Reobrir llista' : 'Finalitzar compra' }}
        </button>
      </header>

      <hr />

      <div class="add-product-box">
        <input 
          v-model="nouProducte" 
          type="text" 
          placeholder="Afegir un nou producte..." 
          @keyup.enter="afegirProducte"
        />
        <button @click="afegirProducte" class="btn-add-prod">Afegir</button>
      </div>

      <ul class="product-list">
        <li v-for="(prod, index) in llista.productes" :key="index" class="product-item">
          <span>{{ prod }}</span>
          <button @click="eliminarProducte(index)" class="btn-remove">✕</button>
        </li>
      </ul>

      <div v-if="llista.productes.length === 0" class="empty-list">
        No hi ha productes en aquesta llista.
      </div>
    </div>

    <div v-else class="loading">
      <p>Carregant dades de la llista...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const llista = ref(null);
const nouProducte = ref('');

// 1. Carregar la llista des del servidor
const carregarDetall = async () => {
  try {
    const id = route.params.id;
    const resposta = await axios.get(`http://localhost:3000/task/${id}`);
    llista.value = resposta.data;
  } catch (error) {
    console.error("Error al carregar:", error);
  }
};

// 2. Afegir producte a l'array i guardar al servidor (PUT)
const afegirProducte = async () => {
  if (nouProducte.value.trim() === '') return;
  
  const llistaActualitzada = { ...llista.value };
  llistaActualitzada.productes.push(nouProducte.value);

  try {
    await axios.put(`http://localhost:3000/tasks/${llista.value.id}`, llistaActualitzada);
    llista.value.productes = llistaActualitzada.productes;
    nouProducte.value = '';
  } catch (error) {
    alert("Error al guardar el producte");
  }
};

// 3. Eliminar producte de l'array
const eliminarProducte = async (index) => {
  const llistaActualitzada = { ...llista.value };
  llistaActualitzada.productes.splice(index, 1);

  try {
    await axios.put(`http://localhost:3000/tasks/${llista.value.id}`, llistaActualitzada);
    llista.value.productes = llistaActualitzada.productes;
  } catch (error) {
    console.error("Error eliminant producte");
  }
};

// 4. Canviar l'estat (Completada/Pendent)
const toggleEstatLlista = async () => {
  try {
    // Aquesta crida utilitza la ruta PUT que ja tens feta al server.js
    const resposta = await axios.put(`http://localhost:3000/tasks/${llista.value.id}`);
    llista.value.comprat = resposta.data.comprat;
  } catch (error) {
    console.error("Error canviant l'estat");
  }
};

onMounted(carregarDetall);
</script>

<style scoped>
.detail-page { max-width: 600px; margin: 2rem auto; padding: 0 1rem; }
.btn-back { display: inline-block; margin-bottom: 1rem; color: #3498db; text-decoration: none; font-weight: bold; }
.detail-card { background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
.detail-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
h1 { margin: 0; font-size: 1.8rem; color: #2d3436; }

.badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 5px; font-size: 0.8rem; margin-top: 0.5rem; }
.status-done { background: #e2fbe8; color: #27ae60; }
.status-pending { background: #fff4e5; color: #e67e22; }

.add-product-box { display: flex; gap: 10px; margin: 1.5rem 0; }
.add-product-box input { flex: 1; padding: 0.7rem; border: 1px solid #ddd; border-radius: 8px; }
.btn-add-prod { background: #3498db; color: white; border: none; padding: 0 1rem; border-radius: 8px; cursor: pointer; }

.product-list { list-style: none; padding: 0; }
.product-item { display: flex; justify-content: space-between; padding: 0.8rem; border-bottom: 1px solid #eee; align-items: center; }
.btn-remove { background: none; border: none; color: #ff7675; cursor: pointer; font-size: 1.1rem; }
.btn-toggle { background: #2d3436; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-size: 0.9rem; }
.empty-list { text-align: center; color: #b2bec3; margin-top: 1rem; }
.loading { text-align: center; margin-top: 5rem; font-style: italic; }
</style>