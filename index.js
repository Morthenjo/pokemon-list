async function getPokemonName() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=905");
  const data = await response.json();
  const allFetch = data.results.map((pokeLink) => fetch(pokeLink.url));
  const allResponse = await Promise.all(allFetch);
  const allJSONPromise = allResponse.map((res) => res.json());
  const allData = await Promise.all(allJSONPromise);
  allData.forEach((pokemon) => {
    renderPokemon(pokemon);
  });
}

function renderPokemon(data) {
  const li = document.createElement("li");
  const id = document.createElement("p");
  const image = document.createElement("img");
  const name = document.createElement("h2");
  const type1 = document.createElement("p");
  const type2 = document.createElement("p");
  let lolUl = document.getElementById("lol");
  id.textContent = `#${data.id}`;
  image.src = data.sprites.other["official-artwork"].front_default;
  name.textContent =
    data.species.name.charAt(0).toUpperCase() + data.species.name.substring(1);
  type1.textContent = data.types[0].type.name;
  type2.textContent = "";
  if (data.types[1]) {
    type2.textContent = data.types[1].type.name;
  }
  if (data.types[0].type.name && !data.types[1]) {
    li.classList.add(data.types[0].type.name);
    li.classList.add(data.types[0].type.name + "1");
  } else {
    li.classList.add(data.types[0].type.name);
    li.classList.add(data.types[1].type.name + "1");
    console.log(li);
  }
  li.append(id, image, name, type1, type2);
  lolUl.append(li);
  console.log(li);
}

getPokemonName();
