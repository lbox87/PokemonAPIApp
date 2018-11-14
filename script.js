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
  
    // ---this iterates all sprites, temporarily cut to review or pokemon with many sprites.
    // const sprites = Object.values(responseJson.sprites);
    // console.log(`${sprites}`);

    // for (let i = 0; i < sprites.length; i++) {
    //     $('#sprites-list').append(`<li><img id="spites" src="${sprites[i]}" alt=""></li>`);
    // };

    $('#sprites-list').append(`<li><img id="spites" src="${responseJson.sprites.front_default}" alt=""></li>`);
    $('#sprites-list').append(`<li><img id="spites" src="${responseJson.sprites.back_default}" alt=""></li>`);
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

function hoverMove() {
    $('ul').on('mouseenter', 'li', event => {
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
        .then(responseJson => console.log(responseJson))
        .catch(err => {
            console.log(err);
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

$(searchForm);
$(hoverMove);