console.log("Client side javascript file");

const form = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "";
messageTwo.textContent = "";

//
// Goal: Render content to paragraphs
//
// 1. Select the second message p from javascript
// 2. Just before fetch, render loading message and empty p
// 3. If error, render error
// 4. If no error, render location and forecast
// 5. Test your work! Search for errors and for valid information

const fetchForecast = (address) => {
  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecastData;
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
