let mapas = [];


myMaps = localStorage.getItem('myMaps');

if(myMaps){
    mapas = JSON.parse(myMaps);
}




let actualMap = {}

let overlayType = 0;

const buttonMapMenu = document.querySelector('.maps-menu');
const asideMaps = document.querySelector('#maps-aside')


buttonMapMenu.addEventListener('click', () => {
    asideMaps.classList.toggle('active')
})


const formModal = document.querySelector('#form-modal')

const formModalInput = document.querySelector('#mapName')
mapName = formModalInput.value




const mapContainer = document.querySelector('#map')


const initDrawing = (map) => {
   let drawindManager =  new google.maps.drawing.DrawingManager({
        map: map,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.CIRCLE,
              google.maps.drawing.OverlayType.POLYGON,
              google.maps.drawing.OverlayType.RECTANGLE,
            ],
            
        },

    })

    google.maps.event.addListener(drawindManager, 'circlecomplete', (circle) => {

        actualMap = {}

        circle.setEditable(true)
        circle.setDraggable(true)

        const center = circle.getCenter()
        const radius = circle.getRadius()

        overlayType = 1

        formModal.classList.add('active')
        

        actualMap = {
            type : 'circle',
            mapName : mapName,
            center : center, 
            radius : radius,
        }

    })

    google.maps.event.addListener(drawindManager, 'rectanglecomplete', (rectangle) => {

        actualMap = {}

        rectangle.setEditable(true)
        rectangle.setDraggable(true)

        const bounds = rectangle.getBounds()
        

        overlayType = 2

        formModal.classList.add('active')
        

        actualMap = {
            type : 'rectangle',
            mapName : mapName,
            bounds: bounds
        }

    })

    google.maps.event.addListener(drawindManager, 'polygoncomplete', (polygon) => {

        actualMap = {}

        polygon.setEditable(true)
        polygon.setDraggable(true)

        const encodedPath = google.maps.geometry.encoding.encodePath( polygon.getPath() )
        

        overlayType = 3

        formModal.classList.add('active')
        

        actualMap = {
            type : 'polygon',
            mapName : mapName,
            path: encodedPath
        }

    })


};



function saveMap(){
    actualMap.mapName = formModalInput.value
    mapas.push(actualMap)
    console.log(mapas)

    actualMap = {}

    localStorage.setItem('myMaps', JSON.stringify(mapas))


    formModalInput.value = ""
    formModal.classList.remove('active')

   
}






function initMap() {

  var mapOptions = {
    center: {lat: -20.77220, lng: -54.785153
    },
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    zoom : 10,
    styles : [
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#7c93a3"
              },
              {
                  "lightness": "-10"
              }
          ]
      },
      {
          "featureType": "administrative.country",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#a0a4a5"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#62838e"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#dde3e3"
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#3f4a51"
              },
              {
                  "weight": "0.30"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "poi.attraction",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi.business",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.government",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi.place_of_worship",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.school",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.sports_complex",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": "-100"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#bbcacf"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "lightness": "0"
              },
              {
                  "color": "#bbcacf"
              },
              {
                  "weight": "0.50"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#a9b4b8"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "invert_lightness": true
              },
              {
                  "saturation": "-7"
              },
              {
                  "lightness": "3"
              },
              {
                  "gamma": "1.80"
              },
              {
                  "weight": "0.01"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#a3c7df"
              }
          ]
      }
  ]
  }

  const map = new google.maps.Map(mapContainer, mapOptions);

  initDrawing(map)
}


// botoes do menu


