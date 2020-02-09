let mouseCursor = document.querySelector('.cursor');
let navLinks = document.querySelectorAll('.nav-links li');

window.addEventListener('mousemove', cursor);

function cursor(e) {
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';
}



navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        mouseCursor.classList.add('link-grow');
        link.classList.add('hovered-link');
    });
    link.addEventListener('mouseleave', () => {
        mouseCursor.classList.remove('link-grow');
        link.classList.remove('hovered-link');
    });

});

// WEATHER API 

window.addEventListener('load', () => {

    let long;
    let lat;
    let temperatureDescription = document.querySelector('.weather-descp');
    let temperatureDegree = document.querySelector('.weather');
    let locationTimezone = document.querySelector('.location');
    let temperatureSection = document.querySelector('.weather-box');
    let temperatureUnit = document.querySelector('.weather-span');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/5cea0bb03e84e17c1d41b40a875ef4c1/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {
                        temperature,
                        summary
                    } = data.currently;
                    //Formula for Celsius
                    let celsius = (temperature - 32) * (5 / 9);
                    // Setting DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    // Fahrenheit to Celsius

                    temperatureSection.addEventListener('click', () => {
                        if (temperatureUnit.textContent === 'F°') {
                            temperatureUnit.textContent = 'C°';
                            temperatureDegree.textContent = celsius.toFixed(2);

                        } else {

                            temperatureDegree.textContent = temperature;
                            temperatureUnit.textContent = 'F°';
                        }
                    });

                });
        });

    }
});