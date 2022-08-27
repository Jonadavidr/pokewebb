const lists_pokemons =document.getElementById('lists_pokemons')
const buttons=document.getElementById('buttons')
let urlPokemon = 'https://pokeapi.co/api/v2/pokemon'

let btnNext;
let btnPrevious
let templatehtml;

console.log('⏮ ⏩')

const GetPokemons =async(url) => {
    try {
        const response = await fetch(url)
        const results = await response.json();
        console.log(results)
        DataPokemons(results.results)
        
        btnNext=results.next ? `<button class= "btn" data-url=${results.next}>⏩</button>`: " "
        btnPrevious=results.previous ? `<button class="btn" data-url= ${results.previous}> ⏮</button> ` : " "
        buttons.innerHTML=btnPrevious + " " + btnNext 
        
    } catch (error) {
        console.log(error)
    }

}
GetPokemons(urlPokemon)

const DataPokemons = async (data) => {
    lists_pokemons.innerHTML = '';
    try{
        for(let index of data){
            const resp=await fetch (index.url)
            const resul=await resp.json();
            console.log(resul)
            templatehtml=`
            <div class=" pokemon_img">
            
            <img src=${resul.sprites.other.dream_world.front_default} alt=${resul.name} />
            <h4 id="nombre1">Nombre</h4>
            <p> ${resul.name} </p>

            <div class="card-link">
                    <a href="#">Mas detalles</a>
                </div>
            </div>
            `
            lists_pokemons.innerHTML+=templatehtml
            
        }
        

    }catch (error){
        console.log(error)
    }
}

buttons.addEventListener('click',(e)=>{
    if(e.target.classList.contains('btn')){
        let value=e.target.dataset.url
        console.log(value)
        GetPokemons(value)
    }
})
