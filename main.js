const pokemonContainer = 
document.getElementById('pokemonContainer');
const pokemons_number = 800;
let counter =1;
const colors = {
   normal: '#EBC79E' ,
   fighting: '#BC8F8F' ,
   flying: '#8B81D5' ,
   poison: '#CF9DC9' ,
   ground: '#9F673A' ,
   rock: '#616161' ,
   bug: '#5D7F76' ,
   ghost: '#CFD8DC' ,
   steel: '#607D8B' ,
   fire: '#FFA911' ,
   water: '#A1DCF6' ,
   grass: '#8ADF00' ,
   electric: '#FFC047' ,
   psychic: '#B388FF' ,
   ice: '#BBDEFB' ,
   dragon: '#1B5E20' ,
   dark: '#363636' ,
   fairy: '#00E5FF' ,
   unknown: '#191919' ,
   shadow: '#ADADAD'
};
function emptypok(nr_page){
   counter = 1;
const fetchPokemons = async () => {
   for(let i=1; i<= pokemons_number; i++) 
   { await getPokemon(i);}
}

const getPokemon = async id => {
   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
   const res = await fetch(url);
   const pokemon = await res.json();
      if(counter>80*(nr_page-1) && counter<(80*nr_page)+1){
      createPokemonCard(pokemon);
      }
      else{
         counter++;
      }
   }
fetchPokemons();
}
emptypok(1);

const main_types = Object.keys(colors);
function getThemAll(x,nr_page){
   counter = 1;
const fetchPokemons = async () => {
   for(let i=1; i<= pokemons_number; i++) 
   { await getPokemon(i);}
}

const getPokemon = async id => {
   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
   const res = await fetch(url);
   const pokemon = await res.json();
   if(pokemon.types[0].type.name==x){
      if(counter>80*(nr_page-1) && counter<(80*nr_page)+1){
      createPokemonCard(pokemon);
      }
      else{counter++;}
   }
   }
fetchPokemons();

}
function createPokemonCard(pokemon) {
   const pokemonEl = document.createElement('div');
   pokemonEl.classList.add('pokemon')
   const poke_types = pokemon.types[0].type.name;
   const type = main_types.find(type => poke_types.indexOf(type) > -1);
   const poke_img = pokemon.sprites.front_default;
   const color = colors[type];
   pokemonEl.style.backgroundColor = color;

   const pokeInnerHTML = `
      <div class="pokename">${pokemon.name}</div>
      <div class="img-container"> <img src=${poke_img} width="90"></div>
      <div class="info">
         <span class="number"># ${pokemon.id}</span><br/><br/>
         <small class="type">Type: <span>${type}</span></small><br/>
         <small class="weight">Weight: <span>${pokemon.weight}</span></small>
      </div>
      `;
   pokemonEl.innerHTML = pokeInnerHTML;
   pokemonContainer.appendChild(pokemonEl);
   counter++;
}

function clicked(x){
   let numb=0;
   pokemonContainer.innerHTML="";
   const tab = document.getElementsByName("check");
   let k=0;
   for(let i=0;i<tab.length;i++){
      if(tab[i].checked){
         numb=numb+1;
      }
   }
   if(x.textContent=="Filter"){
      x=document.getElementsByClassName("page")[0];
   }
   if(numb==0){
      emptypok(x.textContent);
   }

   else{
      for(i=0;i<tab.length;i++){
      if(tab[i].checked){getThemAll(tab[i].id,x.textContent);}
      }
   }
}
let pages = document.getElementsByClassName("pagination")[0];

for (let j=1; j<=10; j++) {
   const paginationInnerHTML = `<span class="page" onclick="clicked(this)">${j}</span>`;
   pages.innerHTML += paginationInnerHTML;
}

var webyear = new Date();
   var year = webyear.getFullYear();
   document.getElementsByClassName("footer")[0].innerHTML=year;