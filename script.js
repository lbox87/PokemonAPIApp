'use strict';

const searchURL = 'http://pokeapi.salestock.net/api/v2/pokemon/';
// const searchURL = "http://pokeapi.co/api/v2/pokemon/";


function displayResults(responseJson) {
    console.log(responseJson);
    // if there are previous results, remove them
    $('#results-list').empty();

    $('.name-searched').html(`${responseJson.name}`);
    
    const sprites = Object.values(responseJson.sprites);
    console.log(`${sprites}`);

    for (let i = 0; i < sprites.length; i++) {
        $('#results-list').append(`<li><img src="${sprites[i]}" alt=""></li>`);
    };
    //display the results section  
    $('#results').removeClass('hidden');
};

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