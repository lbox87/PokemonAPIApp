'use strict';

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
    nameSearched(responseJson);
    displaySprites(responseJson);   
    displayAbilities(responseJson);
    $('.results').removeClass('hidden');
    clearError();
};

function nameSearched(responseJson) {
    $('.name-searched').html(`${responseJson.name}`);
    let pokemonNameLower = responseJson.name;
    let pokemonNameStyled = pokemonNameLower.charAt(0).toUpperCase() + pokemonNameLower.slice(1);
    $('.name-searched').html(`${pokemonNameStyled}`);
}

function displaySprites(responseJson) {

    $('#sprites-list').empty();
    $('#sprites-list').append(`<li><img id="spites" src="${responseJson.sprites.front_default}" alt=""></li>`);
    $('#sprites-list').append(`<li><img id="spites" src="${responseJson.sprites.back_default}" alt=""></li>`);
}

function displayAbilities(responseJson) {
    $('#pokemon-abilities').empty();
    for (let i = 0; i < responseJson.moves.length; i++) {
        $('#pokemon-abilities').append(`<li class="col-6 pokemon-moves">${organizeMoves(responseJson)[i]}</li>`);
    };
}

function hoverMove() {
    $('#pokemon-abilities').on('mouseenter', 'li', event => {
        const hoverTerm = event.target.textContent
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
}

function docReady() {
    searchForm();
    hoverMove();
}

$(docReady);
// $(searchForm);
// $(hoverMove);

function clearError() {
    $('#js-error-message').html('');
}