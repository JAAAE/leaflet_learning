
//MIERUNE Color
const m_color = new L.tileLayer("https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png", {
    attribution: "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL."
});

//MIERUNE MONO
const m_mono = new L.tileLayer("https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png", {
    attribution: "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL."
});

//1956_Landuse(台灣百年歷史地圖)
const Landuse_1956 = new L.tileLayer('https://gis.sinica.edu.tw/tileserver/file-exists.php?img=1956_Landuse-png-{z}-{x}-{y}', {
    attribution: ' <a href="https://gis.sinica.edu.tw/tileserver/">台灣百年歷史地圖</a> contributors'
});

//1904-日治臺灣堡圖(明治版)(台灣百年歷史地圖)
const JM20K_1904 = new L.tileLayer('https://gis.sinica.edu.tw/tileserver/file-exists.php?img=JM20K_1904-jpg-{z}-{x}-{y}', {
    attribution: '<a href="https://gis.sinica.edu.tw/tileserver/">台灣百年歷史地圖</a> contributors',
});

//1921-日治地形圖-1:25,000(台灣百年歷史地圖)
const JM25K_1921 = new L.tileLayer('https://gis.sinica.edu.tw/tileserver/file-exists.php?img=JM25K_1921-png-{TileMatrix}-{z}-{x}-{y}}', {
    attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>",
});

//MAP
const map = L.map('map', {
    center: [23.7, 121],
    zoom: 7,
    zoomControl: true,
    layers: Landuse_1956
});

//BaseLayer
const Map_BaseLayer = {
    "臺灣土地利用及林型圖_1956": Landuse_1956
    
};

//AddLayer
const Map_AddLayer = {
    "1904日治臺灣堡圖(明治版)": JM20K_1904,
    "1921日治臺灣堡圖(大正版)": JM25K_1921,
    "GSI Ort": t_ort
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
