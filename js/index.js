
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
    let tags = [];

    const img = info.sprites.other.dream_world.front_default

    for (let i = 0; i < info.types.length; i++) {
        tags.push(`<p class="tag">${info.types[i].type.name || ""}</p>`)
    }


    let data = `
        <div class="cardPokemon">
            <h2 class="name">${pokemon.name}</h2>
            <img class="img" src="${img}" alt="" style="width: 100px">
            
            ${tags.join('\n')}
        </div>
    `;


    return data;
}




fetch(url).then((response) => {

    return response.json()
})
    .then((jsonBody) => jsonBody.results)
    .then(async (listaPokemon) => {
        sectionPokemon = document.getElementById('sectionPokemon')

        for (i = 0; i < limit; i++) {
            const pokemon = listaPokemon[i]
            const info = await selectPoke(pokemon)

            if (info) {

                sectionPokemon.innerHTML += convertPokemonHTMl(pokemon, info)

            }
            else {
                console.log("Pokemon não encontrado")
            }


        }
        

    })