/* eslint-disable */

const displayMap = (myLocation) => {
  const coordinate = JSON.parse(myLocation);
  coordinate.map((el) => {
    el.coordinates.reverse();
  });

  var map = L.map('map').setView(coordinate[0].coordinates, 6);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map);

  coordinate.map((el) => {
    var marker = L.marker(el.coordinates).addTo(map);
    marker.bindPopup(`day${el.day}: ${el.description}`).openPopup();
  });
};
const leafMap = document.getElementById('map');

if (leafMap) {
  const myLocation = document.getElementById('map').dataset.locations;
  displayMap(myLocation);
}
