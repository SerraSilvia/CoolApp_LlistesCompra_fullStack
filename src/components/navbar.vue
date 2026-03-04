<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const user = ref(null);

const checkUser = () => {
  const savedUser = localStorage.getItem('user');
  user.value = savedUser ? JSON.parse(savedUser) : null;
};

// Al montar el component, verifiquem si tenim sessió
onMounted(checkUser);

// revisem el canvi de ruta per a actualitzar l'estat de l'usuari (per exemple, després de login/logout)
watch(() => route.path, () => {
  checkUser();
});

const logout = () => {
  localStorage.removeItem('user'); // Borrem l'usuari del localStorage
  user.value = null;               // Netegem l'estat de l'usuari a Vue que és reactiu
  router.push('/login');           // Enviem al usuari al login
};
</script>

<template>
  <nav class="navbar">
    <router-link to="/" class="nav-logo">
      <img src="@/assets/logo.png" alt="Logo" class="logo-img">
      <h1 class="title">Cool App</h1>
    </router-link>

    <ul class="nav-links">
      <li><router-link to="/">Inici</router-link></li>
      <li><router-link to="/tasks">Llistes</router-link></li>
    </ul>

    <div class="nav-auth">
      <template v-if="user">
        <span class="user-name">Hola, {{ user.nom }}</span>
        <button @click="logout" class="btn-logout">Logout</button>
      </template>
      
      <router-link v-else to="/login" class="btn-login">Login</router-link>
    </div>
  </nav>
</template>

<style scoped>

.nav-auth {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  font-size: 0.9rem;
  color: #636e72;
  font-weight: 500;
}

/* Reutilizamos el estilo del botón pero con color diferente para el Logout */
.btn-logout {
  background-color: #f1f2f6;
  color: #2d3436;
  border: 1px solid #dfe6e9;
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-logout:hover {
  background-color: #ff7675;
  color: white;
  border-color: #ff7675;
}

/* Estilos originales que ya tenías */
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 1.5rem; background-color: #ffffff; box-shadow: 0 1px 5px rgba(0, 0, 0, 0.08); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
.nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
.logo-img { height: 60px; width: auto; }
.title { font-size: 2rem; color: #2c3e50; margin: 0; font-weight: 700; }
.nav-links { display: flex; list-style: none; gap: 1.2rem; margin: 0; padding: 0; }
.nav-links a { text-decoration: none; color: #636e72; font-size: 1.3rem; font-weight: 500; transition: color 0.3s; }
.nav-links a:hover, .nav-links a.router-link-active { color: #e67e22; }
.btn-login { background-color: #e67e22; color: white; padding: 0.4rem 1rem; font-size: 0.85rem; border-radius: 15px; text-decoration: none; font-weight: 600; transition: transform 0.2s, background-color 0.2s; }
.btn-login:hover { background-color: #d35400; transform: scale(1.03); }
</style>