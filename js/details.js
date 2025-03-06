/* DOM */
const pokemonName = document.querySelector('#pokemon-name');
const pokemonId = document.querySelector('#pokemon-id');
const pokemonSprite = document.querySelector('#pokemon-sprite');
const types = document.querySelector('#type');
const stats = document.querySelector('#stats');
const evolutions = document.querySelector('#evolutions');

const pokeballImgs = ['imgs/grey-pokeball.svg', 'imgs/pokeball.svg'];
addToTeamImg.src = pokeballImgs[0];


const id = localStorage.getItem('id');
team = JSON.parse(localStorage.getItem('pokemonTeam'));

try {
    if (team.includes(id)){
        addToTeamImg.src = pokeballImgs[1];
        addToTeamText.textContent = "Ce pokémon est dans mon équipe !"
    }
} catch(error) {console.log(error)}

function getPokemonData(url) {
    fetch(url)
        .then((r) => r.json())
        .then((d) => {
            
            pokemonName.textContent = `${d.name}`;
            pokemonId.textContent = `N° ${d.id}`;

            /* ------------------------------------- */

            pokemonSprite.src = `${d.sprites.other.home.front_default}`;


            /* ------------------------------------- */

            function createNewEelement () {
                const pokemonElement = document.createElement('span');
                pokemonElement.className = "pokemon-element";
                pokemonElement.textContent = `${d.types[0].type.name}`;
                types.appendChild(pokemonElement);
            }


            if (d.types.length > 1) {

                createNewEelement()

                const secondPokemonElement = document.createElement('span');
                secondPokemonElement.className = "pokemon-element";
                secondPokemonElement.textContent = `${d.types[1].type.name}`;

                types.appendChild(secondPokemonElement);
            } else {
                createNewEelement()
            }

            typeColor()

            /* ------------------------------------- */

            statsHtml = `
                <div>
                        <span>hp</span>
                        <span id="stats-info">${d.stats[0].base_stat}</span>
                    </div>
                    <div>
                        <span>Attaque</span>
                        <span id="stats-info">${d.stats[1].base_stat}</span>
                    </div>
                    <div>
                        <span>Défense</span>
                        <span id="stats-info">${d.stats[2].base_stat}</span>
                    </div>
                    <div>
                        <span>Attaque spécial</span>
                        <span id="stats-info">${d.stats[3].base_stat}</span>
                    </div>
                    <div>
                        <span>Défense spécial</span>
                        <span id="stats-info">${d.stats[4].base_stat}</span>
                    </div>
                    <div>
                        <span>Vitesse</span>
                        <span id="stats-info">${d.stats[5].base_stat}</span>
                    </div>
            `;

            stats.innerHTML = statsHtml;

            /* ------------------------------------- */

            fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
                .then((r) => r.json())
                .then((d) => {

                    evolHtml = `
                        <h2>Évolutions</h2>
                            <span><a href="#">></a></span>
                            <span><a href="#">></a></span>
                            <span><a href="#"></a></span>
                        `

                    evolutions.innerHTML = evolHtml;

                }).catch(error => {console.log(error)})

        }).catch(e => {console.log(e)})
}


getPokemonData(`https://pokeapi.co/api/v2/pokemon/${id}/`);

addToTeamImg.addEventListener('click', () => {
    let pokemonTeam = [];

    if (addToTeamImg.src.includes(pokeballImgs[0])){

        addToTeamImg.src = pokeballImgs[1];
        addToTeamText.textContent = "Ce pokémon est dans mon équipe !"

        if (!pokemonTeam.includes(id)) {
            pokemonTeam.push(id);
        }

    } else {
        addToTeamImg.src = pokeballImgs[0];
        addToTeamText.textContent = "Cliquez ici pour ajouter a votre équipe"

        if (pokemonTeam.includes(id)) {
            for (let i = 0; i < pokemonTeam.length; i++) {
                if (pokemonTeam[i] === id) {
                    pokemonTeam.splice(pokemonTeam[i] - 1, 1)
                }
            }
        }
    }

    let pokemonTeamIds = JSON.stringify(pokemonTeam);
    localStorage.setItem('pokemonTeam', pokemonTeamIds);
    console.log(JSON.parse(localStorage.getItem('pokemonTeam')));
})
