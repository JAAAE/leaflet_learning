
//MIERUNE Color
const m_color = new L.tileLayer("https://wmts.nlsc.gov.tw/wmts/PHOTO2/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}", {
    attribution: "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL."
});

//MIERUNE MONO
const m_mono = new L.tileLayer("https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png", {
    attribution: "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL."
});

//OSM
const o_std = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

//Shadw20 
const S_20 = new L.tileLayer('https://landslide.geologycloud.tw/jlwmts/jetlink/Shadw20/GoogleMapsCompatible/{z}/{x}/{y}', {
    attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>",
});

//1904-日治臺灣堡圖(明治版)-1:20,000
const JM20K_1904 = new L.tileLayer('https://gis.sinica.edu.tw/tileserver/file-exists.php?img=JM20K_1904-jpg-{z}-{x}-{y}', {
    attribution: "<a href='http://gissrv4.sinica.edu.tw/gis/twhgis/' target='_blank'>中央研究院</a>",
});

//MAP
const map = L.map('map', {
    center: [23.7, 121],
    zoom: 7,
    zoomControl: false, //false -> remove default zoom control
    layers: [m_mono]
});

//BaseLayer
const Map_BaseLayer = {
    "MIERUNE Color": m_color,
    "MIERUNE MONO": m_mono
};

//AddLayer
const Map_AddLayer = {
    "OSM": o_std,
    "Shadow_20": S_20,
    "1904台灣堡圖(明治)": JM20K_1904
};

//LayerControl
L.control.layers(
    Map_BaseLayer,
    Map_AddLayer,
    {
    collapsed: false
    }
).addTo(map);

//OpacityControl
L.control.opacity(
    Map_AddLayer,
    {
    label: "Layers Opacity"
    }
).addTo(map);

//add Scale
L.control.scale({
    metric: true,
    imperial: false,
    position: 'bottomleft'
}).addTo(map);

// add Geocoder
L.Control.geocoder({
    position: 'topleft',
    collapsed: false,
    placeholder: 'Search...',
    defaultMarkGeocode: true
      }).addTo(map);   

// moving zoom control to bottomright
L.control.zoom({
    position: 'bottomright'
    }).addTo(map);

// add geojson

axios.get("https://www.geologycloud.tw/api/v1/zh-tw/Fault50?t=.json")
        .then(function(result) {
            L.geoJSON(result.data, {
                onEachFeature: onEachFeature,
                style: {
                    weight: 1,
                    opacity: 1,
                    color: '#035BB2',
                    fillColor: '#035BB2',
                    fillOpacity: 0.5
                }
            }).addTo(map)
        }).catch(function(error) {
            console.log(error);
        });

    function onEachFeature(feature, layer) {
        var pro = feature.properties;
        var HTML = '';
        for (var q in pro) {
            HTML += q + ":" + pro[q] + '<br />';
        }
        layer.bindPopup(HTML);
    }
      