const locationSearchForm = document.getElementById('locationSearchForm');
locationSearchForm.addEventListener('submit', getUserSearchLocation);

function getUserSearchLocation(event) {
    
    const locationInputField = document.getElementById('locationInputField');
    const searchLocation = locationInputField.value;

    fetch(`http://localhost:3000/forecast?locationName=${searchLocation}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log('Error!!!!!!!!');
        });
}