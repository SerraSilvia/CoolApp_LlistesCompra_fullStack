<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await axios.post('http://localhost:3000/login', {
      email: email.value,
      password: password.value
    });

    // Guardem l'usuari sencer al navegador (id, nom, tipus)
    localStorage.setItem('user', JSON.stringify(res.data));
    
    // Anem a la llista de tasques
    router.push('/tasks');
  } catch (err) {
    error.value = err.response?.data?.message || 'Error al connectar';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Benvingut/da</h1>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="usuari@mail.com" required />
        </div>
        <div class="input-group">
          <label>Contrasenya</label>
          <input v-model="password" type="password" placeholder="••••••••" required />
        </div>
        
        <button type="submit" :disabled="loading" class="btn-login">
          {{ loading ? 'Entrant...' : 'Iniciar Sessió' }}
        </button>

        <div class="register-footer">
          <span>No tens compte?</span>
          <router-link to="/register" class="link-register">Registra't aquí</router-link>
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container { display: flex; justify-content: center; align-items: center; height: 80vh; }
.login-card { background: white; padding: 2.5rem; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
.input-group { margin-bottom: 1.5rem; }
.input-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; }
.input-group input { width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 10px; box-sizing: border-box; }

.btn-login { 
  width: 100%; 
  padding: 1rem; 
  background: #e67e22; 
  color: white; 
  border: none; 
  border-radius: 10px; 
  font-weight: 700; 
  cursor: pointer; 
  transition: background 0.3s ease;
}

.btn-login:hover {
  background: #d35400;
}

.btn-login:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* ESTILS PEL LINK DE REGISTRE */
.register-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #636e72;
}

.link-register {
  margin-left: 5px;
  color: #e67e22;
  text-decoration: none;
  font-weight: 600;
}

.link-register:hover {
  text-decoration: underline;
}

.error-msg { color: #e74c3c; margin-top: 1rem; text-align: center; font-size: 0.9rem; }
</style>