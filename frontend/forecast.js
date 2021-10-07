const locationSearchForm = document.getElementById('locationSearchForm');
locationSearchForm.addEventListener('submit', getUserSearchLocation);

function getUserSearchLocation(event) {
    const locationInputField = document.getElementById('locationInputField');
    const searchLocation = locationInputField.value;

    fetch(`http://localhost:3000/forecast?locationName=${searchLocation}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector("#results").innerHTML = resultHTMLTemplate(data);
        })
        .catch(err => {
            console.log('Error!!!!!!!!');
        });
}

function resultHTMLTemplate(jsonData) {
    let html = '';
    const locationWindDirection = jsonData.Location.Period[0].Rep[0].D;
    html += '<h2>Results</h2>';
    html += `<h3>${jsonData.Location.name} forecast today</h3>`;
    html += `<strong>${jsonData.Location.Period[0].value}</strong>`;
    html += `<ul>
                <li>Wind direction: ${windDirections[locationWindDirection]}</li> 
                <li>Chance of rain: ${jsonData.Location.Period[0].Rep[0].PPd}%</li>
            </ul>`

    html += `<h3>${jsonData.Location.name} forecast tomorrow</h3>`;
    html += `<strong>${jsonData.Location.Period[1].value}</strong>`;
    html += `<ul>
                <li>Wind direction: ${windDirections[locationWindDirection]}</li> 
                <li>Chance of rain: ${jsonData.Location.Period[1].Rep[0].PPd}%</li>
            </ul>`
    return html;
}

const windDirections = {
    'N' : 'North East',
    'NNE' : 'North North East',
    'NE' : 'North East',
    'ENE': 'East North East',
    'E' : 'East',
    'ESE' : 'East South East',
    'SE' : 'South East',
    'SSE' : 'South South East',
    'S' : 'South',
    'SSW' : 'South South West',
    'SW' : 'South West',
    'WSW' : 'West South West',
    'W' : 'West',
    'WNW' : 'West North West',
    'NW' : 'North West',
    'NNW' : 'North North West'
}