'use strict';
// prettier-ignore
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',    'October', 'November', 'December'];
let date = new Date();
let month = months[date.getMonth()];
let distance;
let duration;
let cadence;
let elevation;
let map;
let type;
let latit;
let lngit;
let id;
let workoutArr = [];

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(loadMap.bind(this), function(e){
        alert("Can't Get the Position")
    });
    form.addEventListener("submit", renderMarker.bind(this));
    inputType.addEventListener("change", toggleEvent.bind(this));
    containerWorkouts.addEventListener("click", setView.bind(this));    
}

function loadMap(e) {
    let { latitude, longitude } = e.coords;
    map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    map.on("click", renderPosition.bind(this));

    getLocalStorage();
}

function renderPosition(mapE){
    let {lat, lng} = mapE.latlng;
    latit = lat;
    lngit = lng;
    form.classList.remove("hidden");
    id = Date.now().toString(36) + Math.random().toString(36).substring(2);
}
function toggleEvent (){
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = "";
}
function renderMarker(e) {
    e.preventDefault();
    type = inputType.value;
    distance = Number(inputDistance.value);
    duration = Number(inputDuration.value);
    cadence = Number(inputCadence.value);
    elevation = Number(inputElevation.value);

    if (!distance || !duration || (type === "running" && !cadence) || (type === "cycling" && !elevation)) {
        alert("Write Positive Numbers");
    } else {
        let html = `<li class="workout workout--${type}" data-id="${id}">
            <h2 class="workout__title">${type[0].toUpperCase()}${type.slice(1)} on ${month} ${date.getDate()} </h2>
            <div class="workout__details">
                <span class="workout__icon">${type === "running" ? "🏃‍♂️" : "🚴‍♀️"}</span>
                <span class="workout__value">${distance}</span>
                <span class="workout__unit">km</span>
                </div>
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${duration}</span>
                <span class="workout__unit">min</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${type === 'running' ? (duration / distance).toFixed(1) : (distance / (duration / 60)).toFixed(1)}</span>
                <span class="workout__unit">${type === "running" ? "min/km" : "km/h"}</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">${type === "running" ? "🦶🏼" : "⛰"}</span>
                <span class="workout__value">${type === "running" ? cadence :   elevation}</span>
                <span class="workout__unit">${type === "running" ? "spm" : "m"}</span>
            </div>
        </li>`;

        form.insertAdjacentHTML("afterend", html);
        L.marker([latit, lngit])
            .addTo(map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${type}-popup`,
            })).setPopupContent(`${type[0].toUpperCase()}${type.slice(1)} on ${month} ${date.getDate()}`)
            .openPopup();

        form.classList.add("hidden");
        inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = "";
        workoutArr.push({
            id: id,
            latlng: [latit, lngit],
            type: type,
            distance: distance,
            duration: duration,
            cadence: cadence,
            elevation: elevation,
            paceSpeed: type === 'running' ? (duration / distance).toFixed(1) : (distance / (duration / 60)).toFixed(1)
        });
        setLocalStorage();
    }
}
function setLocalStorage(){
    localStorage.setItem("workouts", JSON.stringify(workoutArr));
}
function getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return; // function ba dalta stop shi

    workoutArr = data;
    workoutArr.forEach(workout => {
        latit = workout.latlng[0];
        lngit = workout.latlng[1];
        type = workout.type;
        id = workout.id;
        let html = `<li class="workout workout--${type}" data-id="${id}">
            <h2 class="workout__title">${type[0].toUpperCase()}${type.slice(1)} on ${month} ${date.getDate()} </h2>
            <div class="workout__details">
                <span class="workout__icon">${type === "running" ? "🏃‍♂️" : "🚴‍♀️"}</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
                </div>
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.paceSpeed}</span>
                <span class="workout__unit">${type === "running" ? "min/km" : "km/h"}</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">${type === "running" ? "🦶🏼" : "⛰"}</span>
                <span class="workout__value">${type === "running" ? workout.cadence : workout.elevation}</span>
                <span class="workout__unit">${type === "running" ? "spm" : "m"}</span>
            </div>
        </li>`;

        form.insertAdjacentHTML("afterend", html);
        L.marker([latit, lngit])
            .addTo(map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${type}-popup`,
            })).setPopupContent(`${type[0].toUpperCase()}${type.slice(1)} on ${month} ${date.getDate()}`)
            .openPopup();
    });
}
function setView(e){
    const workoutEl = e.target.closest(".workout");
    if(workoutEl){
    const valueId = workoutArr.find((work) =>{
        return work.id === workoutEl.dataset.id;
    })
    let [lat, lng] = valueId.latlng;

    map.setView([lat, lng], 13, {
        animate: true,
        pan: {
            duration: 2,
        }
    })
}
}