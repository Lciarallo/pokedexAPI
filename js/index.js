
let offset = 0
let limit = 20
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`


async function selectPoke(pokemon) {
    const selectURL = pokemon.url;
    try {
        const response = await fetch(selectURL);
        const jsonBody = await response.json();
       
        return jsonBody
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }
}

function convertPokemonHTMl(pokemon, info) {
    

    return `    <div class="cardPokemon">
                <h2 class='name'>
                    ${pokemon.name}
                </h2>
                <img class="img" src="/img/Bulbasaur.png" alt="" style="width: 100px; ">

                <p class="tag">${info.id}</p>
                <p class="tag">Teste</p>

            </div>`
}



fetch(url).then((response) => {

    return response.json()
})
    .then((jsonBody) => jsonBody.results)
    .then(async (listaPokemon) => {
        listpokemon = document.getElementsByClassName('listPokemon')

        for (i = 0; i < limit; i++) {
            const pokemon = listaPokemon[i]
            const info = await selectPoke(pokemon)

            if(info){

                listaPokemon.innerHTML += convertPokemonHTMl(pokemon, info)
                console.log(listaPokemon.innerHTML)
            }
            


        }
    })