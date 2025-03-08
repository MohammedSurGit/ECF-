const team = JSON.parse(localStorage.getItem("pokemonTeam"));

const id = getUrlParamName("id");

function getPokemons(url) {
  fetch(url)
    .then((r) => r.json())
    .then((d) => {
      /* Creation de carte de pokemons */
      const pokemonCard = document.createElement("div");
      pokemonCard.className = "pokemon-card";

      const pokemonSprite = document.createElement("div");
      pokemonSprite.className = "pokemon-sprite";
      const spriteImg = document.createElement("img");
      spriteImg.src = `${d.sprites.other.home.front_default}`;
      pokemonSprite.appendChild(spriteImg);

      /* -------------------------------- */

      const pokemonInfos = document.createElement("div");
      pokemonInfos.className = "pokemon-infos";

      const pokemonId = document.createElement("span");
      pokemonId.className = "pokemon-id";
      pokemonId.textContent = "N° ";
      const nId = document.createElement("span");
      nId.className = "nId";
      nId.textContent = `${d.id}`;

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

      /* -------------------------------- */

      const pokemonName = document.createElement("span");
      pokemonName.className = "pokemon-name";
      pokemonName.textContent = `${d.name}`;

      const seeMore = document.createElement("a");
      seeMore.href = `details.html?id=${d.id}`;
      seeMore.className = "see-more";
      seeMore.id = `${d.id}`;
      seeMore.textContent = `More details`;

      /* -------------------------------- */

      pokemonCard.appendChild(pokemonSprite);
      pokemonCard.appendChild(pokemonInfos);
      pokemonCard.appendChild(pokemonName);
      pokemonCard.appendChild(seeMore);

      /* Attribution des cartes au DOM */
      pokemons.appendChild(pokemonCard);

      /* -------------------------------- */

      typeColor();

      /* -------------------------------- */
    })
    .catch((e) => {
      console.log(e);
    });
}

for (let i = 0; i < team.length; i++) {
  getPokemons(`https://pokeapi.co/api/v2/pokemon/${team[i]}/`);
}
