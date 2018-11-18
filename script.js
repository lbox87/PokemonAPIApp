'use strict';

// const searchURL = 'https://pokeapi.salestock.net/api/v2/pokemon/';
// const searchURL = 'https://pokeapi.co/api/v2/pokemon/';
const searchURL = 'https://pokeapi-215911.firebaseapp.com/api/v2/pokemon/';
const searchURL2 = 'https://pokeapi-215911.firebaseapp.com/api/v2/move/';

function searchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val().toLowerCase();
        getPokemon(searchTerm);
    });
}

function getPokemon(query) {
    const url = searchURL + query;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            console.log(response);
            if (response.statusText == ""){
                throw new Error("Try Again");
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            console.log(err);
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function displayResults(responseJson) {
    console.log(responseJson);
    // $('.name-searched').html(`${responseJson.name}`);
    nameSearched(responseJson);
    displaySprites(responseJson);   
    // displayTypes(responseJson); 
    displayAbilities(responseJson);
    //display the results section  
    $('.results').removeClass('hidden');
    console.log(`testing flow`);
    clearError();
};

function nameSearched(responseJson) {
    $('.name-searched').html(`${responseJson.name}`);
    let pokemonNameLower = responseJson.name;
    let pokemonNameStyled = pokemonNameLower.charAt(0).toUpperCase() + pokemonNameLower.slice(1);
    $('.name-searched').html(`${pokemonNameStyled}`);
}

function displaySprites(responseJson) {
    // if there are previous results, remove them
    $('#sprites-list').empty();
  
    // ---this iterates all sprites, temporarily cut to review or pokemon with many sprites.
    // const sprites = Object.values(responseJson.sprites);
    // console.log(`${sprites}`);

    // for (let i = 0; i < sprites.length; i++) {
    //     $('#sprites-list').append(`<li><img id="spites" src="${sprites[i]}" alt=""></li>`);
    // };

    $('#sprites-list').append(`<li><img id="spites" src="${responseJson.sprites.front_default}" alt=""></li>`);
    $('#sprites-list').append(`<li><img id="spites" src="${responseJson.sprites.back_default}" alt=""></li>`);
}

// function displayTypes(responseJson) {
//     $('#pokemon-type').empty();
//     for (let i = 0; i < responseJson.types.length; i++) {
//         console.log($('#pokemon-type').html());
//         if ($('#pokemon-type').html() == "") {
//             $('#pokemon-type').append(`${responseJson.types[i].type.name}`);
//             console.log($('#pokemon-type').html());
//         }
//         else {
//             $('#pokemon-type').append(` & ${responseJson.types[i].type.name}`);
//         }
//     };
// }

function displayAbilities(responseJson) {
    // organizeMoves(responseJson);
    // console.log(`${organizeMoves(responseJson)[0]}`);
    $('#pokemon-abilities').empty();
    for (let i = 0; i < responseJson.moves.length; i++) {
        $('#pokemon-abilities').append(`<li class="col-6 pokemon-moves">${organizeMoves(responseJson)[i]}</li>`);
    };
}

function hoverMove() {
    $('#pokemon-abilities').on('mouseenter', 'li', event => {
        // const hoverTerm = $('li').val();
        const hoverTerm = event.target.textContent
        // console.log(event.target.textContent)
        // const hoverTerm = event.target.value;
        getMove(hoverTerm);
    });
}

function getMove(query) {
    const url = searchURL2 + query;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            console.log(response);
            throw new Error(response.statusText);
        })
        .then(responseJson => displayDescription(responseJson))
        .catch(err => {
            console.log(err);
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
            // $('#js-error-message').removeClass(`hidden`);
        });
}

function displayDescription(responseJson){
    $('.move-description').html(`
    <p class="move-description col-12">
    <h2>${responseJson.name}:</h2> 
    ${responseJson.effect_entries[0].short_effect}
    </p>`);
}

function organizeMoves(responseJson){
    let pokemonMoves = [];
    for (let i = 0; i < responseJson.moves.length; i++) {
       pokemonMoves.push(`${responseJson.moves[i].move.name}`);
    };
    return pokemonMoves.sort();
    // console.log(`${pokemonMoves}`);
}



$(searchForm);
$(hoverMove);

function clearError() {
    $('#js-error-message').html('');
    // $('#js-error-message').addClass(`hidden`);
}