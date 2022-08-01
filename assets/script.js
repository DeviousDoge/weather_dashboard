// Core API Variables
var APIkey = 'a229376db52ddc31adc7815e1540dc49';
var city = '';
//Global Time Variables
var todaysDate = moment().format('MM-DD')
//DOM queries
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
//Local storage key
var keyNum = 0;
//Set Time Globally
$('.todays-date').html('Todays Date: ' + todaysDate);
$('.date0').html(moment().add(1, 'days').format('MM-DD'));
$('.date1').html(moment().add(2, 'days').format('MM-DD'));
$('.date2').html(moment().add(3, 'days').format('MM-DD'));
$('.date3').html(moment().add(4, 'days').format('MM-DD'));
$('.date4').html(moment().add(5, 'days').format('MM-DD'));

//Function when city is initially searched for
var citySearchInput = function(event) {
    event.preventDefault();
    //makes the city query parameter in the openweathmap API equal to the userinput 
    city = searchInput.val();
    var queryURL ="http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
   console.log(queryURL);
    //using AJAX and jquery to make this less painful
    $.ajax({
        url: queryURL,
        method: 'GET',
      }).then(function (response) {
        console.log(response);
        //math responsible for making temp in Farenheit 
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        //setting component of todays weather in city header card
        cityName.html(response.name);
        $('.todays-temp').html('Temp(F): ' + (tempF).toFixed(1));
        $('.todays-wind').html('Wind: ' + response.wind.speed + 'mph' );
        $('.todays-humidity').html('Humidity: ' + response.main.humidity);
        //creating a button capable of performing cityDataPopulate() to redo most of this function when pressed 
        var newCityBtn = $('<btn>'+ city + '</btn>');
        newCityBtn.attr('class', 'city-btn');
        newCityBtn.attr('type', 'button');
        newCityBtn.attr('style', 'text-align:center')
        userCities.append(newCityBtn);
        //run code to fetch the data to populate the five forecast cards in a nested function
        cityForecast(response.id);
        //set Store the city name in a number starting at one and incrementing each time this function is called until page is refreshed.
        keyNum++;
        console.log(keyNum);
        localStorage.setItem(keyNum, city);
      });
};  
//function responsible for recalling prior searches via clicking on the buttons spawned under the search bar
var cityDataPopulate = function(event) {
  event.preventDefault();
  if (event.target.matches(".city-btn")){
  //city in this case is equal to the name of the specific button clicked
  city = event.target.textContent;
  console.log(city)
  //much of the code is then repeated from the last function but no button is spawned and no data is added to local storage
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
//fetch data from openweathermaps 40 day forecast API instead of using onecall
function cityForecast(cityid) {
  //(cityid) is pulled from openweathermaps initial response from  the 'id' property when this function is called in that response.
  var forecastURL='https://api.openweathermap.org/data/2.5/forecast?id='+ cityid + '&appid=' + APIkey;
  $.ajax({
    url:forecastURL,
    method:'GET'
}).then(function(response){
    console.log(response);
    //grab the first five forecasts and apply the chosen properties to the five queried classes relative to each forecast. 
    for (i=0;i<5;i++){
      //set variables using above logic 
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
//If there is a city stored in local storage in a key 1-5, set the city to a button with the id 1-5. If not, console log no city found
if (localStorage.getItem('1') === null) {
  console.log('No City Found!')
} else {$('#1').html(localStorage.getItem('1'))};
if (localStorage.getItem('2') === null) {
  console.log('No City Found!')
} else {$('#2').html(localStorage.getItem('2'))};
if (localStorage.getItem('3') === null) {
  console.log('No City Found!')
} else {$('#3').html(localStorage.getItem('3'))};
if (localStorage.getItem('4') === null) {
  console.log('No City Found!')
} else {$('#4').html(localStorage.getItem('4'))};
if (localStorage.getItem('5') === null) {
  console.log('No City Found!')
} else {$('#5').html(localStorage.getItem('5'))};
//listen for submission or clicking
userForm.on('submit', citySearchInput);
userCities.on('click', cityDataPopulate);




