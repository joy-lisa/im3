const $location = document.getElementById('orte');
const $date = document.getElementById('date');
const $canvas = document.getElementById('myAareChart');

//===== Fill location dropdown =====
function populateLocations() {
    const locations = [...new Set(apiData.map(row => row.orte))].sort();

    $location.innerHTML = '<option value="" disabled selected>Ort auswählen</option>';

    locations.forEach(loc => {
        const option = document.createElement('option');
        option.value = loc;
        option.textContent = loc;
        $location.appendChild(option);
    });

    // Auto-select first location
    if (locations.length > 0) {
        $location.value = locations[0];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Set today's date as default
        const today = new Date();
        $date.value = today.toISOString().split('T')[0];

        // Create chart
        createChart();

        // Fetch data and populate dropdown
        apiData = await fetchData();
        populateLocations();

        // Initial chart render
        updateChart();

        // Event listeners
        $location.addEventListener('change', updateChart);
        $date.addEventListener('change', updateChart);

    } catch (error) {
        console.error('Error:', error);
    }
});