fetch('videogame.json') 
 .then(response => response.json())
 .then(data => { 
 const row = document.querySelector('.row');
 data.forEach(game => { 
 const gameCard = `
 <div class="col-lg-4 col-md-6 col-12 mb-4 card-item" 
data-category="${game.genero.toLowerCase()}">
 <div class="card h-100 bg-dark text-white">
 <img src="${game.imagen}" class="card-img-top" 
alt="${game.nombre}" height=600px>
 <div class="card-body">
 <h5 class="card-title">${game.nombre}</h5>
 <i class="fas fa-gamepad fa-2x"></i>
 <div class="row">
 <div class="col-8">
 <p class="cardtext">${game.descripcion}</p>
 </div>
 <p>Género: 
${game.genero}</p>
 <p>Calificación: 
${game.calificacion}</p>
<p>Plataforma: 
${game.plataforma}</p>
</div>
<a href="#" class="btn btn-danger mt-3" 
data-bs-toggle="modal" data-bs-target="#modalVideojuego${game.id}">Ver 
más</a>
 </div>
 </div>
 </div>
 `; 
 row.innerHTML += gameCard; 
 });
 })
 .catch(error => console.error('Error al cargar el archivo JSON:', 
error));