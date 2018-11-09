// https://pokeapi.co/api/v2/pokemon

'use strict';

// const apiKey = '1xl6uJG7Qu1IqQpzU77pxeMFeAWRBTpkjFXjtdmy';
const searchURL = 'http://pokeapi.salestock.net/api/v2/pokemon/';


// function formatQueryParams(params) {
//     const queryItems = Object.keys(params)
//         .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//     return queryItems.join('&');
// }

function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();
    $('#results-list').append(`<li><h3>${responseJson.name}</h3></li>`);
    
    const sprites = Object.values(responseJson.sprites);
    console.log(`${sprites}`);
    
    for (let i = 0; i < sprites.length; i++) {
        $('#results-list').append(`<li><img src="${sprites[i]}" alt=""></li>`);
    };
    //display the results section  
    $('#results').removeClass('hidden');
};

function getPokemon(query) {
    // const params = {
    //     key: apiKey,
    //     q: query,
    //     limit: maxResults,
    // };
    // const queryString = formatQueryParams(params)
    const url = searchURL + query;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        // .then(response => {
        //     response.json();
        //     console.log(response);
        // })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            console.log(err);
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        // const maxResults = $('#js-max-results').val();
        getPokemon(searchTerm);
    });
}

$(watchForm);