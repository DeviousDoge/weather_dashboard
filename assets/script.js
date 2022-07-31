var APIkey = 'a229376db52ddc31adc7815e1540dc49';
var city;

var userForm = document.querySelector('#user-form');
var searchBtn = document.querySelector('.search-btn');
var searchInput = document.querySelector('#city-search');
var userCities = document.querySelector('.cities');
var cityBtn = document.querySelector('.city-btn');
var cityHeader = document.querySelector('.city-header');
var cityName = document.querySelector('.city-name');
var statsToday = document.querySelector('.today');
var fiveDay = document.querySelector('.fivedays');
var forecast = document.querySelector('.forecast');
var forecastDate = document.querySelector('.date');
var statsProjected = document.querySelector('.projected');

function cityDataPopulate() {

};

var citySearchInput = function(event) {
    event.preventDefault();

    city = searchInput.value;
    var queryURL ="http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;

    fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
        });
        };
    });
    cityDataPopulate();
};  

userForm.addEventListener('submit', citySearchInput);





