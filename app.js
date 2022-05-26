

function initMap() {
    const apiKey = '';
     const map = new google.maps.Map(document.getElementById('map'), {
         zoom: 7,
         center: { lat: 35.7596, lng: -79.0193 }, // NC
        });
        
        for(let i = 0; i < jso.features.length; i++) {
            new google.maps.Marker({
                    position: { lat: jso.features[i].geometry.coordinates[0], lng: jso.features[i].geometry.coordinates[1] },
                    map: map
                })
        }

        const infoWindow = new google.maps.InfoWindow();
        
        map.data.addListener('click', (event) => {
            const category = event.feature.getProperty('category');
            const name = event.feature.getProperty('name');
            const description = event.feature.getProperty('description');
            const hours = event.feature.getProperty('hours');
            const phone = event.feature.getProperty('phone');
            const position = event.feature.getGeometry().get();
            const content = `
              <h2>${name}</h2><p>${description}</p>
              <p><b>Open:</b> ${hours}<br/><b>Phone:</b> ${phone}</p>
            `; // use html in content

            infoWindow.setContent(content);
            infoWindow.setPosition(position);
            infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
            infoWindow.open(map);
        })
        
    }
    window.initMap = initMap;
