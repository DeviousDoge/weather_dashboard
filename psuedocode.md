## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
    //Do i need some kind of form inpout?
       //if i am using a form did i preventDefault()
    //Need a bbutton for click/submit eventlistener

    //fetch OpenWeatherAPI

THEN I am presented with current and future conditions for that city and that city is added to the search history
 //TODO Parse data from succesful api call to openweather
    //read openweathermap doc on using API keys and then click the link on finding latitude and longitude for more information. 
       //latitiude and longitude need to be dynamic variables
   
    //make a fetch request and a nested fetch request to get the location itself and the individual data points
       // On review one there is already an example of how to do a nested fetch request
    //what data points do i need
        //city
        //date
        //icons
        //temp
        //wind
        //humidy
        //uv index
    
    //and that city is added to the search history
        //Whatever value that was input is now made in the button
        //These buttons are pushed unto an array that is saved into local storage so these buttons are filled on page refresh
        //these buttons and the values that they show should all be put into dynamically generated HTML elements. Event.target the section with the button instead of targetting the buttons individually. 


WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    //There is guidance points in documentation for when to present certain colors for uv

WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
    //openweathermap.org/forecast5 is an option

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
    //
```

index.html: sctrutured similarly to review_1. Need an input field and clickable buttons
-make drop down buttons that fill out underneath the texbox that link to weather information of an applicable information