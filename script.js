'use strict';

const pokemonEndpoint = 'https://pokeapi-215911.firebaseapp.com/api/v2/pokemon/';
const moveEndpoint = 'https://pokeapi-215911.firebaseapp.com/api/v2/move/';

// capture search term
function searchForm() {
    $('#js-form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val().toLowerCase();
        getPokemon(searchTerm);
    });
}

// "Pokemon" search endpoint created, GET call to API
function getPokemon(query) {
    const url = pokemonEndpoint + query;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            console.log(response);
            if (response.statusText == "") {
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

// Display results of Pokemon search GET
function displayResults(responseJson) {
    nameSearched(responseJson);
    displaySprites(responseJson);
    displayMoves(responseJson);
    $('.results').removeClass('hidden');
    // clear error
    $('#js-error-message').html('');
};

// Format name searched with uppercase first letter
function nameSearched(responseJson) {
    $('.name-searched').html(`${responseJson.name}`);
    let pokemonNameLower = responseJson.name;
    let pokemonNameStyled = pokemonNameLower.charAt(0).toUpperCase() + pokemonNameLower.slice(1);
    $('.name-searched').html(`${pokemonNameStyled}`);
}

// Display pictures of searched Pokemon
function displaySprites(responseJson) {
    $('#sprites-list').empty();
    $('#sprites-list').append(`<li><img id="sprites" src="${responseJson.sprites.front_default}" alt=""></li>`);
    $('#sprites-list').append(`<li><img id="sprites" src="${responseJson.sprites.back_default}" alt=""></li>`);
}

// Display all moves of searched Pokemon
function displayMoves(responseJson) {
    $('#js-pokemon-moves').empty();
    for (let i = 0; i < responseJson.moves.length; i++) {
        $('#js-pokemon-moves').append(`<li class="col-6 pokemon-moves">${organizeMoves(responseJson)[i]}</li>`);
    };
}

// Organize moves alphabetically
function organizeMoves(responseJson) {
    let pokemonMoves = [];
    for (let i = 0; i < responseJson.moves.length; i++) {
        pokemonMoves.push(`${responseJson.moves[i].move.name}`);
    };
    return pokemonMoves.sort();
}

// Capture move name when hovered over
function hoverMove() {
    $('#js-pokemon-moves').on('mouseenter', 'li', event => {
        const hoverTerm = event.target.textContent
        getMove(hoverTerm);
    });
}

// "Move" search endpoint created, GET call to API
function getMove(query) {
    const url = moveEndpoint + query;
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

// Display move description
function displayDescription(responseJson) {
    $('.move-description').html(`
    <p class="move-description col-12">
    <h2>${responseJson.name}:</h2> 
    ${correctMovePercentage(responseJson)}
    </p>`);
}

// API returns "$effect_chance" in move description instead of the actual percentage, 
// this corrects based on the percentage listed in the response.
function correctMovePercentage(responseJson) {
    let moveEffect = responseJson.effect_entries[0].short_effect;
    let movePercentage = responseJson.effect_chance;
    if (moveEffect.includes("$effect_chance")) {
        moveEffect = moveEffect.replace("$effect_chance", `${movePercentage}`);
    }
    return moveEffect;
}

function docReady() {
    searchForm();
    hoverMove();
}

$(docReady);