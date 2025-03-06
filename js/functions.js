const addToTeamImg = document.querySelector('#add-to-team img');
const addToTeamText = document.querySelector('#add-to-team span');

function typeColor() {
    const e = document.querySelectorAll('.pokemon-element');

                e.forEach((e) => {
                    if (e.textContent === 'normal') {
                        e.classList.add('normal');
                    } else if (e.textContent === 'grass') {
                        e.classList.add('plante');
                    } else if (e.textContent === 'fire') {
                        e.classList.add('feu');
                    } else if (e.textContent === 'water') {
                        e.classList.add('eau');
                    } else if (e.textContent === 'fighting') {
                        e.classList.add('combat');
                    } else if (e.textContent === 'flying') {
                        e.classList.add('vol');
                    } else if (e.textContent === 'poison') {
                        e.classList.add('poison');
                    } else if (e.textContent === 'ground') {
                        e.classList.add('sol');
                    } else if (e.textContent === 'bug') {
                        e.classList.add('insecte');
                    } else if (e.textContent === 'ghost') {
                        e.classList.add('spectre');
                    } else if (e.textContent === 'electric') {
                        e.classList.add('electrik');
                    } else if (e.textContent === 'psychic') {
                        e.classList.add('psy');
                    } else if (e.textContent === 'ice') {
                        e.classList.add('glace');
                    } else if (e.textContent === 'dragon') {
                        e.classList.add('dragon');
                    } else if (e.textContent === 'dark') {
                        e.classList.add('tenebres');
                    } else if (e.textContent === 'steel') {
                        e.classList.add('acier');
                    } else if (e.textContent === 'fairy') {
                        e.classList.add('fee');
                    }
                })
}
