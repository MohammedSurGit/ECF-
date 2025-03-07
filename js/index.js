/* DOM */
const pokemons = document.querySelector('#pokemons');
const morePokemonsBtn = document.querySelector('#more-pokemons button');
const region = document.querySelector('#region');
const type = document.querySelector('#type');
const searchButton = document.querySelector('#search-button');
const search = document.querySelector('#search-bar input');

let pokemonDisplay = 23;
let pokemonsIds = [];

let types = [];
let regions = [];

getRegions('https://pokeapi.co/api/v2/region/');
getTypes('https://pokeapi.co/api/v2/type/');


/* fetch les pokemons */  /* -------------------------------- */
function getPokemons(url) {
    fetch(url)
        .then((r) => r.json())
        .then((d) => {
            /* Creation de carte de pokemons */
            const pokemonCard = document.createElement('div');
            pokemonCard.className = "pokemon-card";

            const pokemonSprite = document.createElement('div');
            pokemonSprite.className = "pokemon-sprite";
            const spriteImg = document.createElement('img');
            spriteImg.src = `${d.sprites.other.home.front_default}`;
            pokemonSprite.appendChild(spriteImg);

            /* -------------------------------- */

            const pokemonInfos = document.createElement('div');
            pokemonInfos.className = "pokemon-infos";

            const pokemonId = document.createElement('span'); 
            pokemonId.className = "pokemon-id";
            pokemonId.textContent = 'N° '
            const nId = document.createElement('span'); 
            nId.className = 'nId';
            nId.textContent = `${d.id}`;

            pokemonsIds.push(d.id);
           

            pokemonId.appendChild(nId)
            pokemonInfos.appendChild(pokemonId);


            function createNewEelement () {
                const pokemonElement = document.createElement('span');
                pokemonElement.className = "pokemon-element";
                pokemonElement.textContent = `${d.types[0].type.name}`;
                pokemonInfos.appendChild(pokemonElement);
            }


            if (d.types.length > 1) {

                createNewEelement()

                const secondPokemonElement = document.createElement('span');
                secondPokemonElement.className = "pokemon-element";
                secondPokemonElement.textContent = `${d.types[1].type.name}`;

                pokemonInfos.appendChild(secondPokemonElement);
            } else {
                createNewEelement()
            }

            /* -------------------------------- */


            const pokemonName = document.createElement('span');
            pokemonName.className = "pokemon-name";
            pokemonName.textContent = `${d.name}`;


            const seeMore = document.createElement('a');
            seeMore.href = 'details.html'
            seeMore.className = "see-more";
            seeMore.id = `${d.id}`;
            seeMore.textContent = `Plus de détails`;

            /* -------------------------------- */

            pokemonCard.appendChild(pokemonSprite);
            pokemonCard.appendChild(pokemonInfos);
            pokemonCard.appendChild(pokemonName);
            pokemonCard.appendChild(seeMore);


  
            /* Attribution des cartes au DOM */
            pokemons.appendChild(pokemonCard);


            /* -------------------------------- */

            typeColor()

            /* -------------------------------- */

            const allTypes = document.querySelectorAll('.pokemon-element');

            allTypes.forEach((e) => {
                    if (!types.includes(e.textContent)) {
                        types.push(e.textContent)
                    }
            })
            
            

            /* -------------------------------- */

            const seeMoreBtn = document.querySelectorAll('.see-more');

            seeMoreBtn.forEach((c) => {
                c.addEventListener('click', () => {
                    localStorage.setItem('id', c.id)
                })
            })

            /* -------------------------------- */
        })
        .catch(e => {console.log(e)})
}

/* Afficher les pokemons */  /* -------------------------------- */
for (let i = 1; i < pokemonDisplay; i++) {
    getPokemons(`https://pokeapi.co/api/v2/pokemon/${i}/`);
}

/* Afficher plus de pokemons*/  /* -------------------------------- */
morePokemonsBtn.addEventListener('click', () => {
    pokemonDisplay += 50;

    for (let i = 1; i < pokemonDisplay; i++) {
        pokemons.innerHTML = "";
        getPokemons(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
})

/* filtres */  /* -------------------------------- */
function getRegions (url){
    fetch(url)
        .then((r) => r.json())
        .then((d) => {
            let allRegions = d.results;

            for(let i = 0; i < allRegions.length; i++) {
                if (!regions.includes(allRegions[i].name)) {
                    regions.push(allRegions[i].name)
                }
            }

            for (let i = 0; i < regions.length; i++) {
                let option = document.createElement('option');
                option.value = regions[i];
                option.textContent = regions[i];

                region.appendChild(option);
            }

            /* -------------------------------- */
        }).catch(e => {console.log(e)})
}

function getTypes (url){
    fetch(url)
        .then((r) => r.json())
        .then((d) => {
            let allTypes = d.results;

            for(let i = 0; i < allTypes.length; i++) {
                if (!types.includes(allTypes[i].name)) {
                    types.push(allTypes[i].name)
                }
            }

            for (let i = 0; i < types.length - 1; i++) {
                let option = document.createElement('option');
                option.value = types[i];
                option.textContent = types[i];

                type.appendChild(option);
            }

            /* -------------------------------- */

            type.addEventListener('change', (e) => {
                for(let i = 1; i < 1026; i++) {
                    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
                    .then((r) => r.json())
                    .then((d) => {
                        if(d.types.length > 1) {
                            if (e.target.value === d.types[0].type.name || 
                                e.target.value === d.types[1].type.name) {
                                pokemons.innerHTML = "";
                                getPokemons(`https://pokeapi.co/api/v2/pokemon/${i}/`)
                            } 
                        } else {
                            if (e.target.value === d.types[0].type.name) {
                                pokemons.innerHTML = "";
                                getPokemons(`https://pokeapi.co/api/v2/pokemon/${i}/`)
                            } 
                        }
                    })
                }
            })

        }).catch(e => {console.log(e)})
}

searchButton.addEventListener('click', () => {
    pokemons.innerHTML = "";
    getPokemons(`https://pokeapi.co/api/v2/pokemon/${search.value.toLowerCase()}/`);
})