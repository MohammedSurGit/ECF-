/* DOM */
const pokemonName = document.querySelector("#pokemon-name");
const pokemonId = document.querySelector("#pokemon-id");
const pokemonSprite = document.querySelector("#pokemon-sprite");
const types = document.querySelector("#type");
const stats = document.querySelector("#stats");
const evolutions = document.querySelector("#evolutions");
const desc = document.querySelector("#desc");
const addToTeam = document.querySelector("#add-to-team");

/* liste les images de la pokeball et initie l'image au chargement de la page */

const pokeballImgs = ["imgs/grey-pokeball.svg", "imgs/pokeball.svg"];
addToTeamImg.src = pokeballImgs[0];

/* recupere l'id du parametre */

const id = getUrlParamName("id");

/* recupere la liste de l'equipe en local storage */

let pokemonTeam = JSON.parse(localStorage.getItem("pokemonTeam")) || [];

/* affiche si le pokemon est ajouter a l'équipe */

document.addEventListener("DOMContentLoaded", () => {
  if (pokemonTeam.includes(id)) {
    addToTeamImg.src = pokeballImgs[1];
    addToTeamText.textContent = "This Pokémon is on my team!";
  }
});

/* recupere les data du pokemon passer en parametre api */
function getPokemonData(url) {
  fetch(url)
    .then((r) => r.json())
    .then((d) => {
      /* affiche l'id et le nom du pokemon */

      pokemonName.textContent = `${d.name}`;
      pokemonId.textContent = `N° ${d.id}`;

      /* affiche l'image du pokemon */

      pokemonSprite.src = `${d.sprites.other.home.front_default}`;

      /* cree et affiche le type du pokemon */

      function createNewEelement() {
        const pokemonElement = document.createElement("a");
        pokemonElement.href = `../index.html?type=${d.types[0].type.name}`;
        pokemonElement.className = "pokemon-element";
        pokemonElement.textContent = `${d.types[0].type.name}`;
        types.appendChild(pokemonElement);
      }

      /* si plusieurs types cree et affiche le deuxieme type  */

      if (d.types.length > 1) {
        createNewEelement();

        const secondPokemonElement = document.createElement("a");
        secondPokemonElement.href = `../index.html?type=${d.types[1].type.name}`;
        secondPokemonElement.className = "pokemon-element";
        secondPokemonElement.textContent = `${d.types[1].type.name}`;

        types.appendChild(secondPokemonElement);
      } else {
        createNewEelement();
      }

      /* donne une couleur au type selon sa valeur */

      typeColor();

      /* affiche les stats du pokemon */

      statsHtml = `
                <div>
                        <span>hp</span>
                        <span id="stats-info">${d.stats[0].base_stat}</span>
                    </div>
                    <div>
                        <span>Attack</span>
                        <span id="stats-info">${d.stats[1].base_stat}</span>
                    </div>
                    <div>
                        <span>Defense</span>
                        <span id="stats-info">${d.stats[2].base_stat}</span>
                    </div>
                    <div>
                        <span>Special attack</span>
                        <span id="stats-info">${d.stats[3].base_stat}</span>
                    </div>
                    <div>
                        <span>Special defense</span>
                        <span id="stats-info">${d.stats[4].base_stat}</span>
                    </div>
                    <div>
                        <span>Speed</span>
                        <span id="stats-info">${d.stats[5].base_stat}</span>
                    </div>
            `;

      stats.innerHTML = statsHtml;

      /* si il existe des évolutions, afficher les évolutions */

      fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        .then((r) => r.json())
        .then((b) => {
          /* recupere les données du pokemon */

          fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
            .then((r) => r.json())
            .then((e) => {
              /* récupere la chaine d'évolution du pokemon */

              fetch(e.evolution_chain.url)
                .then((r) => r.json())
                .then((c) => {
                  /* crée et affiche les évolutions du pokemon  */

                  evolHtml = `
                                <h2>Évolutions</h2>
                                    <span class="evolution"><a href="">${c.chain.species.name}</a></span>
                                    <span> > </span>
                                    <span class="evolution"><a href="">${c.chain.evolves_to[0].species.name}</a></span>
                                    <span> > </span>
                                    <span class="evolution"><a href="">${c.chain.evolves_to[0].evolves_to[0].species.name}</a></span>
                                `;

                  evolutions.innerHTML = evolHtml;

                  /* ajoute un lien a toutes les evolutions */

                  evolListUrls = [
                    c.chain.species.url,
                    c.chain.evolves_to[0].species.url,
                    c.chain.evolves_to[0].evolves_to[0].species.url,
                  ];

                  for (let i = 0; i < evolListUrls.length; i++) {
                    fetch(evolListUrls[i])
                      .then((r) => r.json())
                      .then((d) => {
                        const evolution =
                          document.querySelectorAll(".evolution a");

                        evolution.forEach((e) => {
                          if (e.textContent === d.name) {
                            e.href = `details.html?id=${d.id}`;
                          }
                        });
                      })
                      .catch((e) => console.log(e));
                  }

                  fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
                    .then((r) => r.json())
                    .then((d) => {
                      /* verifie l'id de la page pokemon et affiche le lien du pokemon en rouge  */

                      desc.textContent = d.flavor_text_entries[3].flavor_text;

                      const evolution =
                        document.querySelectorAll(".evolution a");

                      evolution.forEach((e) => {
                        if (e.textContent === d.name) {
                          e.classList.add("red");
                        }
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((e) => {
                  console.log(e);
                });
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((e) => {
      console.log(e);
    });
}

getPokemonData(`https://pokeapi.co/api/v2/pokemon/${id}/`);

/* boutton ajouter a mon équipe */

addToTeamImg.addEventListener("click", () => {
  if (addToTeamImg.src.includes(pokeballImgs[0])) {
    addToTeamImg.src = pokeballImgs[1];

    /* récuperer le cri du pokémon */

    getCry(id);

    addToTeamText.textContent = "This Pokémon is on my team!";

    if (!pokemonTeam.includes(id)) {
      pokemonTeam.push(id);
    }
  } else {
    addToTeamImg.src = pokeballImgs[0];
    addToTeamText.textContent = "Click here to add to your team";

    let i = pokemonTeam.indexOf(id);
    if (i !== -1) {
      pokemonTeam.splice(i, 1);
    }
  }

  localStorage.setItem("pokemonTeam", JSON.stringify(pokemonTeam));
});

/* easter egg */
if (id == 151) {
  setTimeout(() => {
    addToTeam.innerHTML = "";
    pokemonName.innerHTML = "MissingNo";
    pokemonId.innerHTML = "???";
    pokemonSprite.src = "./imgs/missingNo.png";
    types.innerHTML = "???";
    stats.innerHTML = "ERROR";
    evolutions.innerHTML = "N/A";
    desc.innerHTML = "The data appears to be corrupted...";
  }, 3000);
}
