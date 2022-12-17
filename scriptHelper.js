// Write your helper functions here!
require("isomorphic-fetch");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  // Here is the HTML formatting for our mission target div.
  let div = document.getElementById("missionTarget");
  div.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
   `;
}

function validateInput(testInput) {
  //console.log("ti",testInput);
  let numberInput = Number(testInput);
  //console.log("string", typeof numberInput);
  if (testInput === "") {
    //console.log("e", testInput, numberInput);
    return "Empty";
  } else if (isNaN(numberInput)) {
    //console.log("NaN", testInput, numberInput);
    return "Not a Number";
  } else if (isNaN(numberInput) === false) {
    //console.log("Is", testInput, numberInput)
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  pilotStatus = document.getElementById("pilotStatus");
  copilotStatus = document.getElementById("copilotStatus");
  fuelStatus = document.getElementById("fuelStatus");
  cargoStatus = document.getElementById("cargoStatus");

  if (
    validateInput(pilot) === "Empty" ||
    validateInput(copilot) === "Empty" ||
    validateInput(fuelLevel) === "Empty" ||
    validateInput(cargoLevel) === "Empty"
  ) {
    alert("All fields are required");
  } else if (
    validateInput(pilot) === "Is a Number" ||
    validateInput(copilot) === "Is a Number" ||
    validateInput(fuelLevel) === "Not a Number" ||
    validateInput(cargoLevel) === "Not a Number"
  ) {
    alert("Please enter valid information");
  } else {
    list.style.visibility = "visible";
    let launchStatus = document.getElementById("launchStatus");
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

    if (fuelLevel < 10000 && cargoLevel < 10000) {
      fuelStatus.innerHTML = "Fuel level too low for launch";
      cargoStatus.innerHTML = "Cargo mass low enough for launch";
      launchStatus.innerHTML = "Shuttle Not Ready For Launch";
      launchStatus.style.color = "rgb(199, 37, 78)";
    } else if (fuelLevel > 10000 && cargoLevel > 10000) {
      fuelStatus.innerHTML = "Fuel level high enough for launch";
      cargoStatus.innerHTML = "Cargo mass too heavy for launch";
      launchStatus.innerHTML = "Shuttle Not Ready For Launch";
      launchStatus.style.color = "rgb(199, 37, 78)";
    } else if (fuelLevel < 10000 && cargoLevel > 10000) {
      fuelStatus.innerHTML = "Fuel level too low for launch";
      cargoStatus.innerHTML = "Cargo mass too heavy for launch";
      launchStatus.innerHTML = "Shuttle Not Ready For Launch";
      launchStatus.style.color = "rgb(199, 37, 78)";
    } else {
      fuelStatus.innerHTML = "Fuel level high enough for launch";
      cargoStatus.innerHTML = "Cargo mass low enough for launch";
      launchStatus.innerHTML = "Shuttle Ready For Launch";
      launchStatus.style.color = "rgb(65, 159, 106)";
    }
  }
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    if (!response.ok) {
        console.log(response);
        throw new Error(`Error! status: ${response.status}`);
      } else {
        return response.json();
      }
  });

  return planetsReturned;
}

function pickPlanet(planets) {
  let planet = Math.floor(Math.random() * planets.length);
  return planets[planet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
