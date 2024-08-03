const map = L.map('map').setView([22.9074872, 79.07306671], 5);

const titleUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tiles = L.tileLayer(titleUrl, { attribution });
tiles.addTo(map);

tiles.addTo(map);

function flyToStore(data) {
  map.flyTo([data[5], data[6]], 14, {
    duration: 3
  });
  setTimeout(() => {
    L.popup({ closeButton: false, offset: L.point(0, -8) })
      .setLatLng([data[5], data[6]])
      .setContent(makePopupContent(store))
      .openOn(map);
  }, 3000);
}


function generateList(datalist) {
    const ul = document.querySelector('.list');
    datalist.forEach((data) => {
      const li = document.createElement('li');
      const div = document.createElement('div');
      const a = document.createElement('a');
      const p = document.createElement('p');
      a.addEventListener('click', () => {
        flyToStore(data);
      });
      div.classList.add('shop-item');
      a.innerText = data[0];
      a.href = '#';
      result = []
      if (data[2] == 1) {
        result.push("Transport")
      } if (data[3] == 1) {
        result.push("Medical")
      } if (data[4] == 1) {
        result.push("Critical")
      } 
      p.innerText = "Requirement: " + result + "  ,  " + "     No of People :" + data[1];
  
      div.appendChild(a);
      div.appendChild(p);
      li.appendChild(div);
      ul.appendChild(li);
    });
  }
async function emergencyyselect() {
    fetch('/emergencyy')
      .then(response => response.json())
      .then(data => {
        generateList(data)
        for (let i = 0; i < data.length; i++) {
          const lat = data[i][5];
          const lng = data[i][6];
          var marker = L.marker([lat, lng]).addTo(map);
          marker.bindPopup(`${data[i][0]}`).addTo(map);
        }
      });
  }

emergencyyselect()