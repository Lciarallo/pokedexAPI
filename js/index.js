let offset = 0 
let limit = 20



async function selectPoke(pokemon) {
    const selectURL = pokemon.url;
    try {
        const response = await fetch(selectURL)
        const jsonBody = await response.json()
        return jsonBody
    } catch (error) {
        console.error("Erro ao buscar os dados:", error)
    }
}

function convertPokemonHTMl(pokemon, info, index) {
    let tags = [];

    const img = info.sprites.other.dream_world.front_default

    for (let i = 0; i < info.types.length; i++) {
        tags.push(`<p class="tag">${info.types[i].type.name || ""}</p>`)
    }


    let data = `
        <div class="cardPokemon" style="--index: ${index}>
            <h2 class="name">${pokemon.name}</h2>
            <img class="img" src="${img}" alt="" style="width: 100px">
            
            ${tags.join('\n')}
        </div>
    `;


    return data;
}


async function APILoad(offset,limit) {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    console.log(url)
    await fetch(url).then((response) => {

        return response.json()
    })
        .then((jsonBody) => jsonBody.results)
        .then(async (listaPokemon) => {
            sectionPokemon = document.getElementById('sectionPokemon')

            for (i = 0; i < limit; i++) {
                const pokemon = listaPokemon[i]
                const info = await selectPoke(pokemon)

                if (info) {

                    sectionPokemon.innerHTML += convertPokemonHTMl(pokemon, info, i)
                     

                }
                else {
                    console.log("Pokemon não encontrado")
                }


            }


        })
        
}


function deleteCards(){
    const legacyCards = document.getElementsByClassName('cardPokemon')
    Array.from(legacyCards).reverse().forEach(card => {
        card.remove()
    });

    while (legacyCards.length > 0) {
        legacyCards[0].remove();
    }
}

async function movePage(limit, next) {
        deleteCards()
        
        offset = Number(offset)

        if(next == true){
            offset += limit
        }else if(offset >= 20 && next == false){
            offset -= limit
            if(0 > offset){
                offset = 0
            }
        }
        

        
        APILoad(offset, limit)
    
    
}


async function changeLimit() {
    deleteCards()
    limit = Number(document.getElementById('options').value)
    APILoad(offset,limit)
    
}



window.onload =  () => {
    APILoad(offset,limit);
}
