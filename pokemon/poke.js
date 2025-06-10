const pokemonContainer = document.getElementById("listaPokemon");
const habitatPokemonContainer = document.getElementById("habitatPokemonList");
const NombreHabitat = document.getElementById("habitNames");


const habitatButtons = document.querySelectorAll(".habitat");
const loadMoreButton = document.querySelector("button"); //curioso q en el html no se llama asi
let limit = 30;
let offset=0; 

///Codigo para la sec Habitat 

habitatButtons.forEach(button => {
        button.addEventListener("click", function () {
            const habitatName = this.id;
            fetchHabitatPokemon(habitatName);
        });
    });

function fetchHabitatPokemon(habitatName) {
        habitatPokemonContainer.innerHTML = ""; // <<--- LIMPIAR CONTENEDOR
        fetch(`https://pokeapi.co/api/v2/pokemon-habitat/${habitatName}/`)
            .then(response => response.json())
            .then(habitatData => {
                NombreHabitat.innerHTML = "<h1> " + habitatName + " pokémon </h1>";
                habitatData.pokemon_species.slice(0, 20).forEach(species => {
                    const pokemonName = species.name;
                    fetchPokemonByName(pokemonName);
                });
            })
    } 

function fetchPokemonByName(name) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => response.json())
            .then(pokemonData => mostrarPokemon(pokemonData, habitatPokemonContainer));
    }
    

/// Codigo para la seccion Princ
function fetchPokemonList(offset,limit) {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
            .then(res => res.json())
            .then( data => {
                data.results.forEach(result => {
                    fetch(result.url)
                        .then(res => res.json())
                        .then(pokemonData => mostrarPokemon(pokemonData, pokemonContainer));
                });
            });
    }

fetchPokemonList(offset,limit);

function mostrarPokemon(poke, container) {
        let tipoPrincipal = poke.types[0].type.name;

        const typeColors = {
            normal: "#A8A878", fire: "#F08030", water: "#6890F0", grass: "#78C850", 
            electric: "#F8D030", ice: "#98D8D8", fighting: "#C03028", 
            poison: "#A040A0", ground: "#E0C068", flying: "#A890F0", 
            psychic: "#F85888", bug: "#A8B820", rock: "#B8A038", ghost: "#705898", 
            dark: "#705848", dragon: "#7038F8", steel: "#B8B8D0", fairy: "#F0B6BC"
        };
        

        let tipos = [];
        poke.types.forEach( tipo=> {
            tipos.push(`<p class= "tipo ${tipo.type.name}" > ${tipo.type.name} </p>`);
            });
        tipos = tipos.join('');

        
        let pokeId = poke.id.toString();
        if (pokeId.length === 1) {
            pokeId = "00" + pokeId;
        } else if (pokeId.length === 2) {
            pokeId = "0" + pokeId;
        }

        const cries = `
            <audio controls>
                <source src="${poke.cries.latest}" type="audio/ogg">
            </audio>`
        ;


        //poke.sprites.other['showdown'].front_default --> Mostrarle a Javi las animaciones :O
        const div = document.createElement("div");
        div.classList.add("pokemon");
        div.innerHTML = `<p class="pokemon-id-back" style="color: ${typeColors[tipoPrincipal]}; opacity: 0.5;">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.front_shiny}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-roar">
                ${cries}
            </div>`;

        div.addEventListener("click", function () {reproducirSonido(poke.cries.latest);});
        container.appendChild(div);
    }

loadMoreButton.addEventListener("click", function () {
        offset += limit;
        fetchPokemonList(offset,limit);
    });


function reproducirSonido(url) {
    const audio = new Audio(url);
    audio.play();
}


