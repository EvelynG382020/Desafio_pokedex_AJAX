$(document).ready(function () {
    //llamado de listado de pokemons
    getPokemon("https://pokeapi.co/api/v2/pokemon")
});

function getPokemon(url){
    //extraemos cada pokemon y asignamos url de los proximos 20 pokemones
    $.ajax(url)
    .done(function(data){
        data.results.forEach(function(pokemon){
            addPokemon(pokemon);
        });
        $('#more-pokemons').attr('data-next', data.next)
    })
}

function addPokemon(pokemon){
    //mostramos el nombre de cada pokemon y el boton de ver mas 
    $('#pokedex').append('<li>' + pokemon.name + '</li>' + 
                         '<button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#pokemon-data" data-pokemon='+ pokemon.name +'> Quiero saber más de este Pokémon' + '</button>')
}

function getPokemonData(pokemon){
    //traemos la info de cada pokemon al click
    let url_pok = "https://pokeapi.co/api/v2/pokemon/"
    $.ajax(url_pok + pokemon)
     .done(function(data){
        $('#pokemon-data-name').text(data.name)
        data.types.forEach(function(tipo){
            $('#pokemon-types').append('<li>' + tipo.type.name + '</li>')
            getPokemonGeneration(tipo.type.url);
            
        })
        data.abilities.forEach(function(habilidad){
            $('#pokemon-abilities').append('<li>' + habilidad.ability.name + '</li>')
        })
        let count = 0
        data.moves.forEach(function(move){
           count++;
           if(count < 6 ){
               $('#pokemon-moves').append('<li>' + move.move.name + '</li>')
            }
        })
    })

    function getPokemonGeneration(url){
        $.ajax(url)
            .done(function(data){
               // Array.push(data.generation.name)
                //let arr=[]
                $('#pokemon-generations').append('<li>' + data.generation.name + '</li>')
            })

    }
    $('#pokemon-moves').empty()
    $('#pokeemon-data-name').empty()
    $('#pokemon-types').empty()
    $('#pokemon-generations').empty()
    $('#pokemon-abilities').empty()
    

}

$('#more-pokemons').click(function(){
    //recibimos el click para traer los proximos pokemones
    getPokemon(this.dataset.next) 
})

$('#pokedex').click(function(event){
    //recibimos el click del div general para identificar el pokemon target
    if(event.target.dataset.pokemon){
        getPokemonData(event.target.dataset.pokemon)
    }
})

//1. traer datos preliminares de los pokemones para mostrar 20 pokemones en cards con su boton
//2. dar funcionamineto al boton que trae los sgtes. pokemons(listo)
//3. crear modal 
//4. crear funcion que traiga info de los pokemons  (tipo, habilidades, movimientos, generaciones)