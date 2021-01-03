
//正射影像
const Orthophoto = new L.tileLayer("https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}", {
    attribution: " <a href='https://maps.nlsc.gov.tw/' target='_blank'>國土測繪中心</a>"
});

//臺灣通用電子地圖
const EMAP = new L.tileLayer("https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}", {
    attribution: "<a href='https://maps.nlsc.gov.tw/' target='_blank'>國土測繪中心</a>"
});

//OSM
const o_std = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

//Shadw20 
const S_20 = new L.tileLayer('https://landslide.geologycloud.tw/jlwmts/jetlink/Shadw20/GoogleMapsCompatible/{z}/{x}/{y}', {
    attribution: "<a href='https://landslide.geologycloud.tw/swagger/api-docs/api' target='_blank'>山崩雲</a>",
});

//1904-日治臺灣堡圖(明治版)-1:20,000
const JM20K_1904 = new L.tileLayer('https://gis.sinica.edu.tw/tileserver/file-exists.php?img=JM20K_1904-jpg-{z}-{x}-{y}', {
    attribution: "<a href='http://gissrv4.sinica.edu.tw/gis/twhgis/' target='_blank'>中央研究院</a>",
});

//陰影圖
const MOI_HILLSHADE = new L.tileLayer("https://wmts.nlsc.gov.tw/wmts/MOI_HILLSHADE/default/GoogleMapsCompatible/{z}/{y}/{x}", {
    attribution: "<a href='https://maps.nlsc.gov.tw/' target='_blank'>國土測繪中心</a>",
});

//MAP
const map = L.map('map', {
    center: [23.7, 121],
    zoom: 7,
    zoomControl: false, //false -> remove default zoom control
    layers: [Orthophoto]
});

//BaseLayer
const Map_BaseLayer = {
    "正射影像": Orthophoto,
    "通用電子地圖": EMAP
};

//AddLayer
const Map_AddLayer = {
    "Shadow_20m": S_20,
    "20公尺陰影圖":MOI_HILLSHADE,
    "1904台灣堡圖(明治)": JM20K_1904,
    "OSM": o_std
    
};

//LayerControl
L.control.layers(
    Map_BaseLayer,
    Map_AddLayer,
    {
    collapsed: true
    }
).addTo(map);

//OpacityControl
L.control.opacity(
    Map_AddLayer,
    {
    label: "Layers"<br>"Opacity",
    collapsed: true
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
      
//  measurement control button
 L.control.measure({
    //  control position
    position: 'topleft',
    //  weather to use keyboard control for this plugin
    keyboard: true,
    //  shortcut to activate measure
    activeKeyCode: 'M'.charCodeAt(0),
    //  shortcut to cancel measure, defaults to 'Esc'
    cancelKeyCode: 27,
    //  line color
    lineColor: 'red',
    //  line weight
    lineWeight: 2,
    //  line dash
    lineDashArray: '6, 6',
    //  line opacity
    lineOpacity: 1,
    //  distance formatter
    // formatDistance: function (val) {
    //   return Math.round(1000 * val / 1609.344) / 1000 + 'mile';
    // }
  }).addTo(map);

//leaflet-locatecontrol
  L.control.locate().addTo(map);

// Fullscreen
map.addControl(new L.Control.Fullscreen());