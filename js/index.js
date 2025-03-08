/* DOM */
const pokemons = document.querySelector("#pokemons");
const morePokemonsBtn = document.querySelector("#more-pokemons button");
const region = document.querySelector("#region");
const type = document.querySelector("#type");
const searchButton = document.querySelector("#search-button");
const search = document.querySelector("#search-bar input");

let pokemonDisplay = 23;
let pokemonsIds = [];

/* initie un tableau region et type */
let types = [];
let regions = [];

getRegions("https://pokeapi.co/api/v2/region/");
getTypes("https://pokeapi.co/api/v2/type/");

/* recuperer les pokemons de l'api pokeApi et creer une carte pour chacun d'entre eux */
function getPokemons(url) {
  fetch(url)
    .then((r) => {
      if (!r.ok) {
        console.log("pokemon not found");
        return;
      }

      return r.json();
    })
    .then((d) => {

      /* Creation de carte de pokemons */
      const pokemonCard = document.createElement("div");
      pokemonCard.className = "pokemon-card";

      const pokemonSprite = document.createElement("div");
      pokemonSprite.className = "pokemon-sprite";
      const spriteImg = document.createElement("img");
      spriteImg.src = `${d.sprites.other.home.front_default}`;
      pokemonSprite.appendChild(spriteImg);

      /* ajoute les infos du pokemon dans la carte */

      const pokemonInfos = document.createElement("div");
      pokemonInfos.className = "pokemon-infos";

      const pokemonId = document.createElement("span");
      pokemonId.className = "pokemon-id";
      pokemonId.textContent = "N° ";
      const nId = document.createElement("span");
      nId.className = "nId";
      nId.textContent = `${d.id}`;

      pokemonsIds.push(d.id);

      pokemonId.appendChild(nId);
      pokemonInfos.appendChild(pokemonId);


      function createNewEelement() {
        const pokemonElement = document.createElement("span");
        pokemonElement.className = "pokemon-element";
        pokemonElement.textContent = `${d.types[0].type.name}`;
        pokemonInfos.appendChild(pokemonElement);
      }

      if (d.types.length > 1) {
        createNewEelement();

        const secondPokemonElement = document.createElement("span");
        secondPokemonElement.className = "pokemon-element";
        secondPokemonElement.textContent = `${d.types[1].type.name}`;

        pokemonInfos.appendChild(secondPokemonElement);
      } else {
        createNewEelement();
      }

     /* ajoute le nom et l'id du pokemon */

      const pokemonName = document.createElement("span");
      pokemonName.className = "pokemon-name";
      pokemonName.textContent = `${d.name}`;

      /* ajoute un bouton qui envoie vers la page détails avec un param url */

      const seeMore = document.createElement("a");
      seeMore.href = `details.html?id=${d.id}`;
      seeMore.className = "see-more";
      seeMore.id = `${d.id}`;
      seeMore.textContent = `More details`;

      /* ajoute tous les éléments créer a la carte */

      pokemonCard.appendChild(pokemonSprite);
      pokemonCard.appendChild(pokemonInfos);
      pokemonCard.appendChild(pokemonName);
      pokemonCard.appendChild(seeMore);

      /* Attribution des cartes au DOM */
      pokemons.appendChild(pokemonCard);

      /* donne une couleur au elements selon leurs types */

      typeColor();

      /* -------------------------------- */

      const allTypes = document.querySelectorAll(".pokemon-element");

      allTypes.forEach((e) => {
        if (!types.includes(e.textContent)) {
          types.push(e.textContent);
        }
      });

      /* -------------------------------- */
    })
    .catch((e) => {
      console.log(e);
    });
}

/* afficher 20 pokemons en plus de ceux initialement afficher */
morePokemonsBtn.addEventListener("click", () => {
  pokemonDisplay += 20;

  for (let i = 1; i < pokemonDisplay; i++) {
    pokemons.innerHTML = "";
    getPokemons(`https://pokeapi.co/api/v2/pokemon/${i}/`);
  }

  setTimeout(() => {
      document.querySelector('footer').scrollIntoView();
  }, 100)
});

/* afficher les pokemons filtrer par region */
function getRegions(url) {
  fetch(url)
    .then((r) => r.json())
    .then((d) => {

      /* recupere toutes les régions et les ajoute au filtre région */

      let allRegions = d.results;

      for (let i = 0; i < allRegions.length; i++) {
        if (!regions.includes(allRegions[i].name)) {
          regions.push(allRegions[i].name);
        }
      }

      for (let i = 0; i < regions.length; i++) {
        let option = document.createElement("option");
        option.value = regions[i];
        option.textContent = regions[i];

        region.appendChild(option);
      }

      /* affiche tous les pokémons a la selection */

      region.addEventListener("change", (e) => {
        for (let i = 0; i < allRegions.length; i++) {
          if (allRegions[i].name === e.target.value) {
            fetch(allRegions[i].url)
              .then((r) => r.json())
              .then((d) => {
                fetch(d.pokedexes[0].url)
                  .then((r) => r.json())
                  .then((d) => {
                    pokemonsOfRegion = d.pokemon_entries;
                    for (let i = 1; i < pokemonsOfRegion.length; i++) {
                      pokemons.innerHTML = "";
                      getPokemons(
                        `https://pokeapi.co/api/v2/pokemon/${pokemonsOfRegion[i].pokemon_species.name}/`,
                      );
                    }
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

/* afficher les pokemons filtrer par type */

function getTypes(url) {
  fetch(url)
    .then((r) => r.json())
    .then((d) => {

      /* récupere et affiche toutes les types dans le filtre */

      let allTypes = d.results;

      for (let i = 0; i < allTypes.length; i++) {
        if (!types.includes(allTypes[i].name)) {
          types.push(allTypes[i].name);
        }
      }

      for (let i = 0; i < types.length - 1; i++) {
        let option = document.createElement("option");
        option.value = types[i];
        option.textContent = types[i];

        type.appendChild(option);
      }

      /* affiche tout les pokémons a la séléction */

      type.addEventListener("change", (e) => {
        displayPerType(e.target.value);
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

/* afficher les pokemons d'un type */

function displayPerType(obj) {
  for (let i = 1; i < 1026; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      .then((r) => r.json())
      .then((d) => {
        if (d.types.length > 1) {
          if (obj === d.types[0].type.name || obj === d.types[1].type.name) {
            pokemons.innerHTML = "";
            getPokemons(`https://pokeapi.co/api/v2/pokemon/${i}/`);
          }
        } else {
          if (obj === d.types[0].type.name) {
            pokemons.innerHTML = "";
            getPokemons(`https://pokeapi.co/api/v2/pokemon/${i}/`);
          }
        }
      });
  }
}

/* afficher les pokemons d'un type au chargement de la page si non affiche les 20 premiers pékemon selon leurs ids*/

const typeParam = getUrlParamName("type");

if (typeParam != null) {
  document.addEventListener("DOMContentLoaded", () => {
    displayPerType(typeParam);
  });
} else {
  pokemons.innerHTML = '';
  for (let i = 1; i < pokemonDisplay; i++) {
  getPokemons(`https://pokeapi.co/api/v2/pokemon/${i}/`);
}
}


/* affiche un pokemon dont l'id ou le nom est passé en valeur */


searchButton.addEventListener("click", () => {
  pokemons.innerHTML = "";
  getPokemons(
    `https://pokeapi.co/api/v2/pokemon/${search.value.toLowerCase()}/`,
  );
  setTimeout(() => {
    if (pokemons.innerHTML === '') {
      pokemons.innerHTML = 'No Pokemon found with this Name or Id';
    }
  }, 100)
});


search.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    pokemons.innerHTML = "";
    getPokemons(
      `https://pokeapi.co/api/v2/pokemon/${search.value.toLowerCase()}/`,
    );
    setTimeout(() => {
      if (pokemons.innerHTML === '') {
        pokemons.innerHTML = 'No Pokemon found with this Name or Id';
      }
    }, 100)
  }
});