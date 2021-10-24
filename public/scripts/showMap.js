const coordinates = campground.geometry.coordinates;
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'show-map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)