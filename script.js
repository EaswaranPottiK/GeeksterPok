
  
// first i need to get types of pokemon like window, fire etc (for the drop down in top of the page)

const pokemonTypes = async ()=>{
    try{
        const response = await fetch('https://pokeapi.co/api/v2/type',{
            method:'GET'
        })
        const pokTypes  = await response.json();
        const pokCategory = pokTypes.results.map(
            (category) => category.name
        );
        return pokCategory;
    }
    catch(e){
        console.log(e)
    }
}

async function renderPokemonTypes(){
    const itemsTOBeAdded =await pokemonTypes()
   
    itemsTOBeAdded.forEach((element) => {
        let htmlElementTOBeAdded = `<option value="${element}">${element}</option>`
        document.getElementById('pokTypes').innerHTML += htmlElementTOBeAdded
    });
}

renderPokemonTypes()


//check form here
const createPokemonCard = (pokemon) => {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");
    card.innerHTML = `  
    <p>#${pokemon.id}</p>
    <div class="front">
      <img src="${pokemon.sprites.front_default}" alt="Pokemon Image" />
      <h3>${pokemon.name}</h3>
      <h5>${pokemon.types[0].type.name}</h5>
    </div>
    <div class="back">
      <p>Abilities : ${pokemon.abilities
        .map((ability) => ability.ability.name)
        .join(", ")}</p>
    </div>`;
    return card;
  };



const fetchPokemonDetails = (id) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
      response.json()
    );
  };
  
  const arrayOfPokemonDetailPromises = [];
  
  for (let i = 1; i <= 50; i++) {
    const pokemonPromise = fetchPokemonDetails(i);
    arrayOfPokemonDetailPromises.push(pokemonPromise);
  }
  
  let pokemonList = [];
  const pokemonContainer = document.getElementById("pokemonContainer");
  
  Promise.all(arrayOfPokemonDetailPromises).then((pokemonDetails) => {
    //console.log(pokemonDetails);
    pokemonList = pokemonDetails;
    // console.log(window.location.search)
    // const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("pokemonType")) {
      console.log(pokemonList);
      // filter(some to match type of pokemon in the array)
      // pokemonList.filter(pokemon => pokemon.)
    }
  
    pokemonList.forEach((pokemon) => {
      const pokemonCard = createPokemonCard(pokemon);
      pokemonContainer.append(pokemonCard);
    });
  });
  
  const searchInput = document.getElementById("pokemon-search-input");
  searchInput.addEventListener("keyup", (e) => {
    //   console.log(e.target.value);
    //   console.log(pokemonList);
    const filteredPokemonList = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    pokemonContainer.innerHTML = "";
    filteredPokemonList.forEach((pokemon) => {
      const pokemonCard = createPokemonCard(pokemon);
      pokemonContainer.append(pokemonCard);
    });
    //   console.log(filteredPokemonList);
  });
  
  // console.log(window.location.search);