<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const nom = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleRegister = async () => {
  try {
    await axios.post('http://localhost:3000/register', {
      nom: nom.value,
      email: email.value,
      password: password.value
    });
    alert("Compte creat! Ara ja pots iniciar sessió.");
    router.push('/login');
  } catch (err) {
    error.value = err.response?.data?.message || 'Error al registrar';
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Crea el teu compte</h1>
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label>Nom Complet</label>
          <input v-model="nom" type="text" placeholder="El teu nom" required />
        </div>
        <div class="input-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="usuari@mail.com" required />
        </div>
        <div class="input-group">
          <label>Contrasenya</label>
          <input v-model="password" type="password" placeholder="••••••••" required />
        </div>
        <button type="submit" class="btn-login">Registrar-me</button>
        <p v-if="error" class="error-msg">{{ error }}</p>
        <p class="switch-auth">Ja tens compte? <router-link to="/login">Inicia sessió</router-link></p>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal centrado */
.login-container { 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  height: 85vh; /* Un poco más alto para dar aire al formulario de registro */
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Tarjeta del formulario */
.login-card { 
  background: white; 
  padding: 2.5rem; 
  border-radius: 20px; 
  box-shadow: 0 10px 25px rgba(0,0,0,0.1); 
  width: 100%; 
  max-width: 400px; 
  border: 1px solid #f1f3f5;
}

/* Título */
h1 {
  color: #2d3436;
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: -0.5px;
}

/* Grupos de input */
.input-group { 
  margin-bottom: 1.2rem; 
}

.input-group label { 
  display: block; 
  margin-bottom: 0.5rem; 
  font-weight: 600; 
  color: #4a5568;
  font-size: 0.9rem;
}

.input-group input { 
  width: 100%; 
  padding: 0.8rem 1rem; 
  border: 2px solid #edf2f7; 
  border-radius: 12px; 
  box-sizing: border-box; 
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: #e67e22;
  background-color: #fffaf5;
}

/* Botón de Registro */
.btn-login { 
  width: 100%; 
  padding: 1rem; 
  background: #e67e22; 
  color: white; 
  border: none; 
  border-radius: 12px; 
  font-weight: 700; 
  font-size: 1rem;
  cursor: pointer; 
  margin-top: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(230, 126, 34, 0.2);
}

.btn-login:hover { 
  background: #d35400; 
  transform: translateY(-1px);
  box-shadow: 0 6px 15px rgba(230, 126, 34, 0.3);
}

.btn-login:active {
  transform: translateY(0);
}

/* Enlace para volver al login */
.switch-auth {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #718096;
}

.switch-auth a {
  color: #e67e22;
  text-decoration: none;
  font-weight: 700;
  margin-left: 5px;
}

.switch-auth a:hover {
  text-decoration: underline;
}

/* Mensajes de error */
.error-msg { 
  color: #e74c3c; 
  background-color: #fff5f5;
  padding: 0.8rem;
  border-radius: 8px;
  margin-top: 1.2rem; 
  text-align: center; 
  font-size: 0.85rem; 
  font-weight: 500;
  border: 1px solid #feb2b2;
}

/* Ajustes para móviles */
@media (max-width: 480px) {
  .login-card {
    padding: 1.5rem;
    box-shadow: none;
  }
}
</style>
