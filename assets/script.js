var APIkey = 'a229376db52ddc31adc7815e1540dc49';
var city = '';
var todaysDate = moment().format('MM-DD')
var userForm = $("#user-form");
var searchBtn = $(".search-btn");
var searchInput = $('#city-search');
var userCities = $('.cities');
var cityBtn = $('.city-btn');
var cityHeader = $('.city-header');
var cityName = $('.city-name');
var statsToday = $('.today');
var fiveDay = $('.fivedays');
var forecast = $('.forecast');
var forecastDate = $('.date');
var statsProjected = $('.projected');

$('.todays-date').html('Todays Date: ' + todaysDate);


var citySearchInput = function(event) {
    event.preventDefault();

    city = searchInput.val();
    var queryURL ="http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
   console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: 'GET',
      }).then(function (response) {
        console.log(response);
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        cityName.html(response.name);
        $('.todays-temp').html('Temp(F): ' + (tempF).toFixed(1));
        $('.todays-wind').html('Wind: ' + response.wind.speed + 'mph' );
        $('.todays-humidity').html('Humidity: ' + response.main.humidity);
        var newCityBtn = $('<btn>'+ city + '</btn>');
        newCityBtn.attr('class', 'city-btn');
        newCityBtn.attr('type', 'button');
        userCities.append(newCityBtn);
        cityForecast(response.id);

        localStorage.setItem(city, city);
      });
};  

var cityDataPopulate = function(event) {
  event.preventDefault();
  if (event.target.matches(".city-btn")){
 
  city = event.target.textContent;
  console.log(city)
  var queryURL ="http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
 console.log(queryURL);
  $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function (response) {
      console.log(response);
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      cityName.html(response.name);
      $('.todays-temp').html('Temp(F): ' + (tempF).toFixed(1));
      $('.todays-wind').html('Wind: ' + response.wind.speed + 'mph' );
      $('.todays-humidity').html('Humidity: ' + response.main.humidity);
      cityForecast(response.id);
    });
};
};

function cityForecast(cityid) {
  var forecastURL='https://api.openweathermap.org/data/2.5/forecast?id='+ cityid + '&appid=' + APIkey;
  $.ajax({
    url:forecastURL,
    method:'GET'
}).then(function(response){
    console.log(response);
    for (i=0;i<5;i++){
      var icon = response.list[((i+1)*8)-1].weather[0].icon
      var iconURL = "https://openweathermap.org/img/wn/"+icon+".png";
      var tempKel=response.list[((i+1)*8)-1].main.temp;
      var tempFar= (((tempKel-273.5)*1.80)+32).toFixed(1);
      var windSpeed=response.list[((i+1)*8)-1].wind.speed.toFixed(1);
      var humidityPercent= response.list[((i+1)*8)-1].main.humidity;
      $('#weather-icon'+i).html("<img src="+iconURL+">");
      $('#temp'+i).html(tempFar);
      $('#wind'+i).html(windSpeed);
      $('#humidity'+i).html(humidityPercent);
      
    }
    
});
};
userForm.on('submit', citySearchInput);
userCities.on('click', cityDataPopulate);




