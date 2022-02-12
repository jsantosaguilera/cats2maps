var fact = 'https://cat-fact.herokuapp.com/facts';
var factDisplay = document.getElementById("catFact");
var userLat;
var userLng;
var map;

/**
 * Returns coordinates for a 3 word address
 * @param {string} words - The 3 word address words to convert to coordinates
 * @returns {Promise} - Promise coordinates response
 */
what3words.api.convertToCoordinates("tugging.owls.racked")
    .then(function (response) {
        console.log(response.coordinates);
        userLat = parseFloat(response.coordinates.lat);
        userLng = parseFloat(response.coordinates.lng);
        console.log(userLng, userLat);

        map = L.map('map', {
            center: [userLat, userLng],
            zoom: 13
        });

        // create map
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWx0b2lkaWFuIiwiYSI6ImNrejZoNnVmMTBrajUyb3FucHFyYmZ5b3oifQ.7vJzATafyBzcbJ4K14w7Ow', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token'
        }).addTo(map);

    });


document.getElementById("startW3W").addEventListener("click", function (event) {
    var userInput = document.getElementById("words").value;
    console.log(userInput);
    document.getElementById("instructions").textContent = "";
    what3words.api.convertToCoordinates(userInput)
        .then(function (response) {
            console.log(response.coordinates);
            map.setView(response.coordinates);  
            document.getElementById('coordinates').textContent = userLat + ',' + userLng;
        })
        .catch(function (error) {
            console.log(error.message);
            document.getElementById("instructions").textContent=error.message;
        })
    savedLocationsArray.push(userInput);
    saveLocations ();
});

// initialize the map on the "map" div with a given center and zoom
// var map = L.map('map', {
//     center: [userLng, userLat],
//     zoom: 13
// });

// // create map
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWx0b2lkaWFuIiwiYSI6ImNrejZoNnVmMTBrajUyb3FucHFyYmZ5b3oifQ.7vJzATafyBzcbJ4K14w7Ow', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'your.mapbox.access.token'
// }).addTo(map);



// array to hold the stored locations
var savedLocationsArray = [];

// function to add locations into localStorage
var saveLocations = function () {
    localStorage.setItem('location', JSON.stringify(savedLocationsArray));
};



//generate a random number
var RNG = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
}

// generate random cat fact
fetch(fact)
    .then(function (response) {
        // console.log(response);
        return response.json();
    })
    .then(function (data) {
        // console.log(data)
        factDisplay.textContent = data[RNG(0, 4)].text
    })