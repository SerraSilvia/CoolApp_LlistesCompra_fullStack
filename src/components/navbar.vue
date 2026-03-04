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
      <router-link to="/login" class="btn-login">Login</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* Padding reducido: 0.5rem arriba/abajo y 1.5rem a los lados */
  padding: 0.5rem 1.5rem; 
  background-color: #ffffff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none; /* Para que el link no subraye el título */
}

.logo-img {
  height: 60px; /* Logo más pequeño (antes era por defecto o 40px) */
  width: auto;
}

.title {
  font-size: 2rem; /* Título más pequeño */
  color: #2c3e50;
  margin: 0;
  font-weight: 700;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1.2rem; /* Menos espacio entre enlaces */
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: #636e72;
  font-size: 1.3rem; /* Texto del menú más pequeño */
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover, 
.nav-links a.router-link-active {
  color: #e67e22;
}

.btn-login {
  background-color: #e67e22;
  color: white;
  padding: 0.4rem 1rem; /* Botón más estrecho */
  font-size: 0.85rem;    /* Texto del botón más pequeño */
  border-radius: 15px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s, background-color 0.2s;
}

.btn-login:hover {
  background-color: #d35400;
  transform: scale(1.03);
}
</style>