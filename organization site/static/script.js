const map = L.map('map').setView([22.9074872, 79.07306671], 5);

const titleUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tiles = L.tileLayer(titleUrl, { attribution });
let myList = [];
tiles.addTo(map);

// dropdown.value = "All";
const ngokaname = document.getElementById("ngokaname");
const ngoname = document.getElementById("ngoname").textContent;
ngokaname.textContent = ngoname;

const customPopup = L.popup({
  maxWidth: '200px',
  maxHeight: '100px',
  className: 'custom-popup'
});



function makePopupContent(data) {
  return `
    <div>
        <h4>${data[1]}</h4>
        <p>${data[9]}</p>
        <div class="phone-number">
            <a href="tel:"></a>
        </div>
    </div>
  `;
}



function flyToStore(data) {
  map.flyTo([data[2], data[3]], 14, {
    duration: 3
  });
  setTimeout(() => {
    L.popup({ closeButton: false, offset: L.point(0, -8) })
      .setLatLng([data[2], data[3]])
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
    if (data[5] == 1) {
      result.push("Food")
    } if (data[6] == 1) {
      result.push("Water")
    } if (data[7] == 1) {
      result.push("Medical")
    } if (data[8] == 1) {
      result.push("Sanitary")
    }
    p.innerText = "Requirement: " + result + "  ,  " + "     Status :" + data[8];

    div.appendChild(a);
    div.appendChild(p);
    li.appendChild(div);
    ul.appendChild(li);
  });
}



async function sanitaryselect() {
  fetch('/sanitary')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const lat = data[i][2];
        const lng = data[i][3];
        const category = "sanitary";
        let markerColor;

        switch (category) {
          case "sanitary":
            markerColor = "yellow";
            break;
          default:
            markerColor = "gray";
        }
        generateList(data)
        const marker = L.circleMarker([lat, lng], {
          color: markerColor,
          fillColor: markerColor,
          fillOpacity: 0.8,
          radius: 8
        });
        marker.bindPopup(`${data[i][0]}`).addTo(map);
        myList.push([marker]);
      }
    });
}

async function foodselect() {
  fetch('/food')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const lat = data[i][2];
        const lng = data[i][3];
        const category = "Food";
        let markerColor;
        generateList(data)
        switch (category) {
          case "Food":
            markerColor = "green";
            break;
          default:
            markerColor = "gray";
        }
        const marker = L.circleMarker([lat, lng], {
          color: markerColor,
          fillColor: markerColor,
          fillOpacity: 0.8,
          radius: 8
        });
        marker.bindPopup(`${data[i][0]}`).addTo(map);
        myList.push([marker]);
      }
    });
}

async function waterselect() {
  fetch('/water')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const lat = data[i][2];
        const lng = data[i][3];
        const category = "Water";
        let markerColor;
        generateList(data)
        switch (category) {
          case "Water":
            markerColor = "blue";
            break;
          default:
            markerColor = "gray";
        }
        const marker = L.circleMarker([lat, lng], {
          color: markerColor,
          fillColor: markerColor,
          fillOpacity: 0.8,
          radius: 8
        });
        marker.bindPopup(`${data[i][0]}`).addTo(map);
        myList.push([marker]);
      }
    });
}

async function medicsselect() {
  fetch('/medics')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        const lat = data[i][2];
        const lng = data[i][3];
        const category = "Medics";
        let markerColor;
        generateList(data)
        switch (category) {
          case "Medics":
            markerColor = "red";
            break;
          default:
            markerColor = "gray";
        }
        const marker = L.circleMarker([lat, lng], {
          color: markerColor,
          fillColor: markerColor,
          fillOpacity: 0.8,
          radius: 8
        });
        marker.bindPopup(`${data[i][0]}`).addTo(map);
        myList.push([marker]);
      }
    });
}

function removeAllMarkers() {

  for (const marker of myList) {
    map.removeLayer(marker[0]);
  }
  myList = [];
}

function addOption(value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.text = text;
  dropdown.appendChild(option);
}


const dropdown = document.getElementById("myDropdown");
const require = document.getElementById("requireee").textContent;
const values = require.split(",");
addOption("all", "ALL");
for (let i = 0; i < values.length; i++) {
  if (values[i] == "food&nutrition") {
    console.log("food")
    addOption(values[i], "Food");
    foodselect()
  } else if (values[i] == "water") {
    console.log("water")
    addOption(values[i], "Water");
    waterselect()
  } else if (values[i] == "sanitary") {
    console.log("sanitary")
    addOption(values[i], "Sanitary");
    sanitaryselect()
  } else if (values[i] == "medical") {
    console.log("medical")
    addOption(values[i], "Medical");
    medicsselect()
  }
}
dropdown.addEventListener("change", function () {
  const selectedValue = this.value;
  console.log("Selected value:", selectedValue);
  if (selectedValue == "all") {
    for (let i = 0; i < values.length; i++) {
      if (values[i] == "food&nutrition") {
        console.log("food")
        foodselect()
      } else if (values[i] == "water") {
        console.log("water")
        waterselect()
      } else if (values[i] == "sanitary") {
        console.log("sanitary")
        sanitaryselect()
      } else if (values[i] == "medical") {
        console.log("medical")
        medicsselect()
      }
    }
  } else if (selectedValue == "food&nutrition") {
    removeAllMarkers()
    foodselect()
  } else if (selectedValue == "water") {
    removeAllMarkers()
    waterselect()
  } else if (selectedValue == "medical") {
    removeAllMarkers()
    medicsselect()
  } else if (selectedValue == "sanitary") {
    removeAllMarkers()
    sanitaryselect()
  }

});

