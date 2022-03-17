const form = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const weatherIcon = document.querySelector(".weather-icon");

messageOne.textContent = "";
messageTwo.textContent = "";

const fetchForecast = (address) => {
  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        console.log(data);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecastData;
        weatherIcon.src = data.icon;
      }
    });
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = input.value;
  messageOne.textContent = "Loading...";
  fetchForecast(address);
});
