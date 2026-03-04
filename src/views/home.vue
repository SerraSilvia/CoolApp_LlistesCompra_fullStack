<template>
  <div class="home-container">
    <section class="hero">
      <div class="hero-content">
        <h1>Organitza't amb temps, <br /><span class="highlight">No oblidis res</span></h1>
        <p>Gestiona les teves llistes de la compra d'una manera fàcil, ràpida i organitzada.</p>
        <div class="hero-btns">
          <router-link to="/tasks" class="btn-primary">Començar ara</router-link>
          <router-link to="/login" class="btn-secondary">Iniciar sessió</router-link>
        </div>
      </div>
      <div class="hero-image">
        <img
          src="@/assets/comprar.jpg"
          alt="imatge de noia amb bosses de la compra"
          class="main-img"
        />
      </div>
    </section>

    <section class="features">
      <div class="feature-card">
         <img src="@/assets/compra.jpg" alt="Icona de comprar" class="f-icon" />
        <h3>Llistes ràpides</h3>
        <p>Afegeix productes en segons abans de sortir de casa.</p>
      </div>
      <div class="feature-card">
        <img src="@/assets/listaControl.webp" alt="Icona de checklist" class="f-icon" />
        <h3>Control total</h3>
        <p>Marca el que ja tens al carretó i no oblidis res.</p>
      </div>
      <div class="feature-card">
        <img src="@/assets/multiUser.jpg" alt="Icona de usuaris" class="f-icon" />
        <h3>Multiusuari</h3>
        <p>Cada membre de la família té les seves pròpies llistes.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Roboto, sans-serif;
}

/* --- HERO SECTION --- */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 2rem;
}

.hero-content h1 {
  font-size: 3.5rem;
  color: #2c3e50;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
}

.highlight {
  color: #e67e22;
}

.hero-content p {
  font-size: 1.2rem;
  color: #636e72;
  margin-bottom: 2.5rem;
  max-width: 500px;
}

.hero-btns {
  display: flex;
  gap: 1rem;
}

.btn-primary {
  background-color: #e67e22;
  color: white;
  padding: 1rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 700;
  transition: 0.3s;
}

.btn-secondary {
  border: 2px solid #e67e22;
  color: #e67e22;
  padding: 1rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 700;
  transition: 0.3s;
}

.btn-primary:hover {
  background-color: #d35400;
}
.btn-secondary:hover {
  background-color: #fdf2e9;
}

.main-img {
  width: 100%;
  max-width: 800px;
}

/* --- FEATURES SECTION --- */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 1rem;

}

.feature-card {
  background: white;
  padding: 2.5rem 1.5rem; /* Un poco más de aire */
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;         /* Usamos flex para asegurar que todo se alinee */
  flex-direction: column;
  align-items: center;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.f-icon {
  width: 100px;          /* Tamaño fijo para todas */
  height: 100px;         /* Altura fija para que sean iguales */
  margin: 0 auto 1.5rem; /* Centrado horizontal y margen inferior */
  display: block;
  object-fit: cover;    /* Recorta la imagen para que rellene el cuadrado sin deformarse */
  background-color: #fdf2e9; /* Un fondo suave por si la imagen tiene transparencias */
  padding: 5px;         /* Espacio entre la imagen y el borde */
  border: 2px solid #e67e22; /* Un borde fino naranja para unificar */
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #636e72;
  font-size: 0.95rem;
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
  }
  .hero-content h1 {
    font-size: 2.5rem;
  }
  .hero-content p {
    margin: 0 auto 2rem;
  }
  .hero-btns {
    justify-content: center;
  }
}
</style>
