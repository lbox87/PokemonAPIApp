'use strict';

const searchURL = 'http://pokeapi.salestock.net/api/v2/pokemon/';
// const searchURL = "http://pokeapi.co/api/v2/pokemon/";


function displayResults(responseJson) {
    console.log(responseJson);
    $('.name-searched').html(`${responseJson.name}`);
    displaySprites(responseJson);   
    displayTypes(responseJson); 
    displayAbilities(responseJson);
    //display the results section  
    $('#results').removeClass('hidden');
};

function displaySprites(responseJson) {
    // if there are previous results, remove them
    $('#sprites-list').empty();
  
    const sprites = Object.values(responseJson.sprites);
    console.log(`${sprites}`);

    for (let i = 0; i < sprites.length; i++) {
        $('#sprites-list').append(`<li><img id="spites" src="${sprites[i]}" alt=""></li>`);
    };
}

function displayTypes(responseJson) {
    $('#pokemon-type').empty();
    for (let i = 0; i < responseJson.types.length; i++) {
        console.log($('#pokemon-type').html());
        if ($('#pokemon-type').html() == "") {
            $('#pokemon-type').append(`${responseJson.types[i].type.name}`);
            console.log($('#pokemon-type').html());
        }
        else {
            $('#pokemon-type').append(` & ${responseJson.types[i].type.name}`);
        }
    };
}

function displayAbilities(responseJson) {
    $('#pokemon-abilities').empty();
    for (let i = 0; i < responseJson.moves.length; i++) {
        $('#pokemon-abilities').append(`<li>${responseJson.moves[i].move.name}</li>`);
    };
}

function getPokemon(query) {
    const url = searchURL + query;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            console.log(err);
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val().toLowerCase();
        getPokemon(searchTerm);
    });
}

$(watchForm);