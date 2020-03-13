const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () => Array(150).fill().map((el, index) =>
  fetch(getPokemonUrl(index + 1)).then(response => response.json())
);

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {

    const [typeName = '', otherTypeName = ''] = types.map(({type}) => type.name);

    return (accumulator += `
      <li class="card ${typeName}">
        <img 
          class="card-image" 
          alt="${name}" 
          src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"
        >
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle">${typeName} ${otherTypeName ? '|' : ''} ${otherTypeName}</p>
      </li>
    `);

  }, "");

const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage);
