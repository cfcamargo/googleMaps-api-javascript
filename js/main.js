let mapas = [];


myMaps = localStorage.getItem('myMaps');

if (myMaps) {
    mapas = JSON.parse(myMaps);

    listMaps()
}


let actualMap = {}

const buttonMapMenu = document.querySelector('#maps-list');
const asideMaps = document.querySelector('#maps-aside')


buttonMapMenu.addEventListener('click', () => {
    asideMaps.classList.toggle('active')
})


const formModal = document.querySelector('#form-modal')

const formModalInput = document.querySelector('#mapName')
mapName = formModalInput.value




const mapContainer = document.querySelector('#map')


var map;

const initDrawing = (map) => {
    let drawindManager = new google.maps.drawing.DrawingManager({
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

        const center = circle.getCenter()
        const radius = circle.getRadius()

        formModal.classList.add('active')


        actualMap = {
            type: 'circle',
            mapName: mapName,
            center: center,
            radius: radius,
        }

    })

    google.maps.event.addListener(drawindManager, 'rectanglecomplete', (rectangle) => {

        actualMap = {}


        const bounds = rectangle.getBounds()

        formModal.classList.add('active')


        actualMap = {
            type: 'rectangle',
            mapName: mapName,
            bounds: bounds
        }

    })

    google.maps.event.addListener(drawindManager, 'polygoncomplete', (polygon) => {

        actualMap = {}


        const encodedPath = google.maps.geometry.encoding.encodePath(polygon.getPath())

        formModal.classList.add('active')


        actualMap = {
            type: 'polygon',
            mapName: mapName,
            path: encodedPath
        }

    })


};

function initMap() {

    var mapOptions = {
        center: {
            lat: -20.77220, lng: -54.785153
        },
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        zoom: 10,
        styles: [
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

    map = new google.maps.Map(mapContainer, mapOptions);

    
}

function initDrawindInmap(){
    initDrawing(null)
    initMap()

    initDrawing(map) 
}


function saveMap() {
    actualMap.mapName = formModalInput.value
    mapas.push(actualMap)
    console.log(mapas)

    actualMap = {}

    localStorage.setItem('myMaps', JSON.stringify(mapas))


    formModalInput.value = ""
    formModal.classList.remove('active')

    listMaps()

    initDrawing(null)
    initMap()
    




}

function cancel() {
    formModalInput.value = ""
    formModal.classList.remove('active')
    initDrawing(null)
    initMap()
}



function listMaps() {

    const mapList = document.querySelector('#mapList')

    mapList.innerHTML = ''

    let i = 0

    for (mapa of mapas) {
        mapList.innerHTML += `<li onClick=writeMap(${i})>${mapa.mapName}</li>`

        i++
    }

}

function writeMap(i){    
    const mapaRecebido = mapas[i]

    if(mapaRecebido.type === 'circle'){
        initMap()
        createCircle(map, mapaRecebido)
    } else if(mapaRecebido.type === 'rectangle'){
        initMap()
        createRectangle(map, mapaRecebido)
    } else if(mapaRecebido.type === 'polygon'){
        
        initMap()
        createPolygon(map, mapaRecebido)
        console.log(mapaRecebido.path)
    }
}


function createCircle(map, obj){
    
    console.log(obj)
    console.log(map)
    const circleData = obj
    new google.maps.Circle({
        map: map,
        radius: circleData.radius,
        center : circleData.center,
    })


}


function createRectangle(map, obj){
    const rectangleData = obj
    new google.maps.Rectangle({
        map: map,
        bounds : rectangleData.bounds,
    })

}

function createPolygon(map, obj){

    const polygonData = obj
    console.log(polygonData.path)
    const path = google.maps.geometry.encoding.decodePath(polygonData.path)

    new google.maps.Polygon({
        map: map,
        path : path,
    })
}



