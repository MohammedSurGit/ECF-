const addToTeamImg = document.querySelector("#add-to-team img");
const addToTeamText = document.querySelector("#add-to-team span");
const cry = document.querySelector('#cry');

/* donne une class css selon l'element */

function typeColor() {
  const e = document.querySelectorAll(".pokemon-element");

  e.forEach((e) => {
    if (e.textContent === "normal") {
      e.classList.add("normal");
    } else if (e.textContent === "grass") {
      e.classList.add("plante");
    } else if (e.textContent === "fire") {
      e.classList.add("feu");
    } else if (e.textContent === "water") {
      e.classList.add("eau");
    } else if (e.textContent === "fighting") {
      e.classList.add("combat");
    } else if (e.textContent === "flying") {
      e.classList.add("vol");
    } else if (e.textContent === "poison") {
      e.classList.add("poison");
    } else if (e.textContent === "ground") {
      e.classList.add("sol");
    } else if (e.textContent === "bug") {
      e.classList.add("insecte");
    } else if (e.textContent === "ghost") {
      e.classList.add("spectre");
    } else if (e.textContent === "electric") {
      e.classList.add("electrik");
    } else if (e.textContent === "psychic") {
      e.classList.add("psy");
    } else if (e.textContent === "ice") {
      e.classList.add("glace");
    } else if (e.textContent === "dragon") {
      e.classList.add("dragon");
    } else if (e.textContent === "rock") {
      e.classList.add("roche");
    } else if (e.textContent === "dark") {
      e.classList.add("tenebres");
    } else if (e.textContent === "steel") {
      e.classList.add("acier");
    } else if (e.textContent === "fairy") {
      e.classList.add("fee");
    }
  });
}

/* recupere un parametre url */
function getUrlParamName(name) {
  let params = new URLSearchParams(window.location.search);
  return params.get(name);
}


function getCry (pokemonIdOrName){
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}/`)
          .then((r) => r.json())
          .then((d) => {
            cry.src = `${d.cries.latest}`;
            cry.currentTime = 0;
            cry.play();
          })
          .catch(e => {console.log(e)})
}