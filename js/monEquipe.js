/* recuperer la liste des pokemons en local storage */

const team = JSON.parse(localStorage.getItem("pokemonTeam")) || [];

/* recuperer l'id donner en parametre */

const id = getUrlParamName("id");

/* recuperer les pokemons et les afficher en carte sur la page */

function getPokemons(url) {
  fetch(url)
    .then((r) => r.json())
    .then((d) => {
      /* Creation de carte de pokemons */
      const pokemonCard = document.createElement("div");
      pokemonCard.className = "pokemon-card";

      const pokemonSprite = document.createElement("div");
      pokemonSprite.className = "pokemon-sprite";
      const onMyTeam = document.createElement("img");
      onMyTeam.src = "./imgs/pokeball.svg";
      onMyTeam.className = "on-my-team";
      onMyTeam.title = `${d.id}`;
      pokemonSprite.appendChild(onMyTeam);
      const spriteImg = document.createElement("img");
      spriteImg.src = `${d.sprites.other.home.front_default}`;
      pokemonSprite.appendChild(spriteImg);

      /* -------------------------------- */
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

/* verifier si il ya eu des changements sur la page et permettre de supprimer ou ajouter un pokemon a la team */

const observer = new MutationObserver(() => {
  const onMyTeamIcons = document.querySelectorAll(".on-my-team");

  onMyTeamIcons.forEach((element) => {
    if (!element.dataset.listener) {
      element.dataset.listener = "true";
      element.addEventListener("click", () => {
        if (element.src.includes("grey-pokeball.svg")) {
          element.src = "./imgs/pokeball.svg";
          if (!team.includes(element.title)) {
            team.push(element.title);
            localStorage.setItem("pokemonTeam", JSON.stringify(team));
          }
        } else {
          element.src = "./imgs/grey-pokeball.svg";
          if (team.includes(element.title)) {
            const index = team.indexOf(element.title);
            team.splice(index, 1);
            localStorage.setItem("pokemonTeam", JSON.stringify(team));
          }
        }
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
