<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const llistes = ref([]);
// userData és ref per que el template reaccioni si cambia -> reactiu
const userData = ref(JSON.parse(localStorage.getItem('user')));
const userId = userData.value ? userData.value.id : null;

const showForm = ref(false);
const nouTitol = ref('');

const carregarLlistes = async () => {
    // Si no tenim userId, no fem la petició per a evitar errors 404/500
    if (!userId) return;

    try {
        const resposta = await axios.get(`http://localhost:3000/tasks/${userId}`);
        llistes.value = resposta.data;
    } catch (error) {
        console.error("Error:", error);
    }
};

const afegirLlista = async () => {
    if (nouTitol.value.trim() === '') return;
    try {
        const novaLlista = {
            userId: userId,
            titol: nouTitol.value,
            productes: []
        };
        const resposta = await axios.post('http://localhost:3000/tasks', novaLlista);
        llistes.value.push(resposta.data);
        nouTitol.value = '';
        showForm.value = false;
    } catch (error) {
        alert("Error al crear la llista");
    }
};

const eliminarLlista = async (id) => {
    if (!confirm("Segur que vols esborrar-la?")) return;
    try {
        await axios.delete(`http://localhost:3000/tasks/${id}`);
        llistes.value = llistes.value.filter(t => t.id !== id);
    } catch (error) {
        console.error(error);
    }
};

onMounted(carregarLlistes);
</script>

<template>
  <div class="tasks-container">
    
    <div v-if="userData">
      <header class="tasks-header">
        <h1>Hola, {{ userData.nom }}!</h1>
        <button @click="showForm = !showForm" class="btn-add">
          {{ showForm ? 'Cancel·lar' : '+ Nova Llista' }}
        </button>
      </header>

      <div v-if="showForm" class="add-form">
        <input 
          v-model="nouTitol" 
          type="text" 
          placeholder="Nom de la llista (ex: Sopar amics)" 
          @keyup.enter="afegirLlista"
        />
        <button @click="afegirLlista" class="btn-save">Guardar</button>
      </div>

      <div class="tasks-grid">
        <div v-for="llista in llistes" :key="llista.id" class="llista-card">
          <div class="card-body">
            <h3>{{ llista.titol }}</h3>
            <p>{{ llista.productes.length }} productes</p>
            <span :class="llista.comprat ? 'status-done' : 'status-pending'">
              {{ llista.comprat ? '✅ Completada' : '⏳ Pendent' }}
            </span>
          </div>
          <div class="card-actions">
            <router-link :to="'/task/' + llista.id" class="btn-detail">Detalls</router-link>
            <button @click="eliminarLlista(llista.id)" class="btn-delete">🗑️</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="restricted-access">
      <div class="lock-icon">🔒</div>
      <h2>Accés Restringit</h2>
      <p>Has d'iniciar sessió per poder gestionar les teves llistes de la compra.</p>
      <div class="auth-options">
        <router-link to="/login" class="btn-add">Inicia Sessió</router-link>
        <router-link to="/register" class="btn-detail-alt">Crea un compte</router-link>
      </div>
    </div>

  </div>
</template>

<style scoped>

.restricted-access {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  margin-top: 3rem;
  border: 1px solid #edf2f7;
}

.lock-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.restricted-access h2 {
  font-size: 2rem;
  color: #2d3436;
  margin-bottom: 1rem;
}

.restricted-access p {
  color: #718096;
  margin-bottom: 2rem;
}

.auth-options {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  align-items: center;
}

.btn-detail-alt {
  text-decoration: none;
  color: #e67e22;
  font-weight: 700;
  padding: 0.7rem 1.4rem;
  border: 2px solid #e67e22;
  border-radius: 10px;
  transition: all 0.3s;
}

.btn-detail-alt:hover {
  background: #fdf2e9;
}

/* --- TU CSS ORIGINAL ABAJO --- */
.tasks-container { max-width: 1000px; margin: 2rem auto; padding: 0 1.5rem; font-family: 'Inter', system-ui, -apple-system, sans-serif; }
.tasks-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; border-bottom: 2px solid #f1f3f5; padding-bottom: 1rem; }
.tasks-header h1 { font-size: 1.8rem; color: #2d3436; font-weight: 800; letter-spacing: -0.5px; }
.btn-add { background: #e67e22; color: white; border: none; padding: 0.7rem 1.4rem; border-radius: 10px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(230, 126, 34, 0.2); text-decoration: none; }
.btn-add:hover { background: #d35400; transform: translateY(-2px); box-shadow: 0 6px 15px rgba(230, 126, 34, 0.3); }
.add-form { background: #ffffff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2.5rem; display: flex; gap: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #edf2f7; animation: slideDown 0.4s ease-out; }
.add-form input { flex: 1; padding: 0.9rem 1.2rem; border: 2px solid #edf2f7; border-radius: 12px; font-size: 1rem; transition: border-color 0.3s; }
.add-form input:focus { outline: none; border-color: #e67e22; }
.btn-save { background: #27ae60; color: white; border: none; padding: 0 2rem; border-radius: 12px; font-weight: 700; cursor: pointer; transition: background 0.3s; }
.btn-save:hover { background: #219150; }
.tasks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
.llista-card { background: white; border-radius: 20px; padding: 1.8rem; border: 1px solid #f1f3f5; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
.llista-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
.card-body h3 { margin: 0 0 0.5rem 0; color: #1a202c; font-size: 1.3rem; }
.card-body p { color: #718096; font-size: 0.95rem; margin-bottom: 1rem; }
.status-done { background: #def7ec; color: #03543f; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
.status-pending { background: #fef3c7; color: #92400e; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
.card-actions { margin-top: 1.5rem; padding-top: 1.2rem; border-top: 1px solid #f8fafc; display: flex; justify-content: space-between; align-items: center; }
.btn-detail { text-decoration: none; color: #3182ce; font-weight: 700; font-size: 0.9rem; transition: color 0.2s; }
.btn-delete { background: #fff5f5; border: none; padding: 8px; border-radius: 8px; cursor: pointer; transition: all 0.2s; font-size: 1.1rem; }
@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
</style>