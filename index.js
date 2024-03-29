const pokemonArr = [];
const button = document.getElementById("search");
const top = document.getElementById("top");
const button2 = document.getElementById("submit");
const results = document.getElementById("result");

async function getPokemonName() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1200");
  const data = await response.json();
  const allFetch = data.results.map((pokeLink) => fetch(pokeLink.url));
  const allResponse = await Promise.all(allFetch);
  const allJSONPromise = allResponse.map((res) => res.json());
  const allData = await Promise.all(allJSONPromise);
  allData.forEach((pokemon) => {
    pokemonArr.push(pokemon);
  });
  renderPokemon(pokemonArr[122]);
  renderPokemon(pokemonArr[161]);
  renderPokemon(pokemonArr[721]);
  renderPokemon(pokemonArr[830]);
  renderPokemon(pokemonArr[841]);
}

top.addEventListener("click", (e) => {
  window.scrollTo(0, 0);
});

window.addEventListener("scroll", (e) => {
  if (window.scrollY > 400) {
    top.style.bottom = "0";
  } else {
    top.style.bottom = "-500px";
  }
});

button.addEventListener("keyup", (e) => {
  const newArr = pokemonArr.filter((pokemon) => {
    return pokemon.id.toString() == e.target.value
      ? true
      : pokemon.species.name.includes(e.target.value.toLowerCase()) ||
          pokemon.types[0].type.name.includes(e.target.value.toLowerCase());
  });
  document.querySelector("#lol").replaceChildren();
  if (e.target.value === "") {
    renderPokemon(pokemonArr[122]);
    renderPokemon(pokemonArr[161]);
    renderPokemon(pokemonArr[721]);
    renderPokemon(pokemonArr[830]);
    renderPokemon(pokemonArr[841]);
  } else if (e.target.value == "all") {
    pokemonArr.forEach((arr) => {
      renderPokemon(arr);
    });
    results.textContent = `${pokemonArr.length} Results found`;
  } else
    newArr.forEach((poke) => {
      renderPokemon(poke);
      results.textContent = `${newArr.length} Results found`;
    });
});

function submit(e) {
  e.preventDefault();
  document.querySelector("#lol").replaceChildren();
  const input = document.querySelector("#search").value;
  const newArr = pokemonArr.filter((pokemon) => {
    return pokemon.id.toString() == input
      ? true
      : pokemon.species.name.includes(input.toLowerCase()) ||
          pokemon.types[0].type.name.includes(input.toLowerCase());
  });
  newArr.forEach((poke) => {
    renderPokemon(poke);
  });
  results.textContent = `${newArr.length} Results found`;
}

button2.addEventListener("touchend", submit);

function renderPokemon(data) {
  const li = document.createElement("li");
  const id = document.createElement("p");
  const image = document.createElement("img");
  const name = document.createElement("a");
  const type1 = document.createElement("p");
  const type2 = document.createElement("p");
  let lolUl = document.getElementById("lol");
  id.textContent = `#${data.id}`;
  id.classList.add("id");
  image.src = data.sprites.other["official-artwork"].front_default;
  name.textContent =
    data.species.name.charAt(0).toUpperCase() + data.species.name.substring(1);
  name.href = `https://bulbapedia.bulbagarden.net/wiki/${name.textContent}_(Pok%C3%A9mon)`;
  name.target = "_blank";
  name.classList.add("name");
  type1.textContent =
    data.types[0].type.name.charAt(0).toUpperCase() +
    data.types[0].type.name.substring(1);
  type1.classList.add("type1");
  type2.textContent = "";
  if (data.types[1]) {
    type2.textContent =
      data.types[1].type.name.charAt(0).toUpperCase() +
      data.types[1].type.name.substring(1);
  }
  if (data.types[0].type.name && !data.types[1]) {
    li.classList.add(data.types[0].type.name);
    li.classList.add(data.types[0].type.name + "1");
  } else {
    li.classList.add(data.types[0].type.name);
    li.classList.add(data.types[1].type.name + "1");
  }
  type2.classList.add("type2");
  li.append(id, image, name, type1, type2);
  lolUl.append(li);
}

getPokemonName();
