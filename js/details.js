/* DOM */
const pokemonName = document.querySelector("#pokemon-name");
const pokemonId = document.querySelector("#pokemon-id");
const pokemonSprite = document.querySelector("#pokemon-sprite");
const types = document.querySelector("#type");
const stats = document.querySelector("#stats");
const evolutions = document.querySelector("#evolutions");
const desc = document.querySelector("#desc");
const addToTeam = document.querySelector("#add-to-team");

const pokeballImgs = ["imgs/grey-pokeball.svg", "imgs/pokeball.svg"];
addToTeamImg.src = pokeballImgs[0];

const id = getUrlParamName("id");

let pokemonTeam = JSON.parse(localStorage.getItem("pokemonTeam")) || [];

document.addEventListener("DOMContentLoaded", () => {
  if (pokemonTeam.includes(id)) {
    addToTeamImg.src = pokeballImgs[1];
    addToTeamText.textContent = "This Pokémon is on my team!";
  }
});

function getPokemonData(url) {
  fetch(url)
    .then((r) => r.json())
    .then((d) => {
        console.log(d)
      pokemonName.textContent = `${d.name}`;
      pokemonId.textContent = `N° ${d.id}`;

      /* ------------------------------------- */

      pokemonSprite.src = `${d.sprites.other.home.front_default}`;

      /* ------------------------------------- */

      function createNewEelement() {
        const pokemonElement = document.createElement("span");
        pokemonElement.className = "pokemon-element";
        pokemonElement.textContent = `${d.types[0].type.name}`;
        types.appendChild(pokemonElement);
      }

      if (d.types.length > 1) {
        createNewEelement();

        const secondPokemonElement = document.createElement("span");
        secondPokemonElement.className = "pokemon-element";
        secondPokemonElement.textContent = `${d.types[1].type.name}`;

        types.appendChild(secondPokemonElement);
      } else {
        createNewEelement();
      }

      typeColor();


      /* ------------------------------------- */

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

      /* ------------------------------------- */

      fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        .then((r) => r.json())
        .then((b) => {
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
            .then((r) => r.json())
            .then((e) => {
              fetch(e.evolution_chain.url)
                .then((r) => r.json())
                .then((c) => {
                  evolHtml = `
                                <h2>Évolutions</h2>
                                    <span class="evolution"><a href="">${c.chain.species.name}</a></span>
                                    <span> > </span>
                                    <span class="evolution"><a href="">${c.chain.evolves_to[0].species.name}</a></span>
                                    <span> > </span>
                                    <span class="evolution"><a href="">${c.chain.evolves_to[0].evolves_to[0].species.name}</a></span>
                                `;

                  evolutions.innerHTML = evolHtml;

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

addToTeamImg.addEventListener("click", () => {
  if (addToTeamImg.src.includes(pokeballImgs[0])) {
    addToTeamImg.src = pokeballImgs[1];
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
