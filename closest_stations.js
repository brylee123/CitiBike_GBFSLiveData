var stations = {}; 
var stationlist_info = JSON.parse(global('STATIONINFO')).data.stations;
var stationlist_stat = JSON.parse(global('STATIONSTAT')).data.stations; 
var stationlength = stationlist_info.length;

function distanceToStation(slat, slon) {

    let clat = gl_latitude; // Get Location v2
    let clon = gl_longitude; // Get Location v2

    let slatradians = parseFloat(slat)*(Math.PI/180);
    let clatradians = parseFloat(clat)*(Math.PI/180);
    let deltalat = (parseFloat(clat)-parseFloat(slat))*(Math.PI/180);
    let deltalon = (parseFloat(clon)-parseFloat(slon))*(Math.PI/180);
    let a = Math.pow(Math.sin(deltalat/2),2) + Math.cos(slatradians) * Math.cos(clatradians) * Math.pow(Math.sin(deltalon/2),2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return 6371*c;
}

function closestStations(stations) {

    var orderStations = {};
    let dkm = 999999999999999;

    Object.keys(stations).forEach(function(key) {
        if (stations[key].station_status != "active") {
            // Out of Service Station
        } else { // Active Station
            var slat = stations[key].lat;
            var slon = stations[key].lon;

            dkm = distanceToStation(slat, slon);

            if (dkm in orderStations) {
                orderStations[dkm] = orderStations[dkm].push(key);
            } else {
                orderStations[dkm] = [key];
            }
        }
    });
    //flash("# Active Stations: "+ Object.keys(orderStations).length);

    var orderByDistance = Array.from(Object.keys(orderStations));
    orderByDistance = orderByDistance.map(Number).sort(function (a, b) {return a - b;}); // keys were strings.
    //console.log("Ordered Distances: "+orderByDistance);
    
    var orderByStation = [];
    for (var i = 0; i < orderByDistance.length; i++) {
        dkm = orderByDistance[i];
        while (orderStations[dkm].length > 0) {
            orderByStation.push(orderStations[dkm].pop());
        }
    }

    return orderByStation;
}
    
for (var i = 0; i < stationlength; i++) { 
    var station_id = stationlist_info[i].station_id; 

    stations[station_id] = {};

    stations[station_id].name = stationlist_info[i].name; 
    stations[station_id].lat = stationlist_info[i].lat;
    stations[station_id].lon = stationlist_info[i].lon; 
    stations[station_id].rental_url = stationlist_info[i].rental_uris.android;

    stations[station_id].station_status = stationlist_stat[i].station_status;

    stations[station_id].num_bikes_available = stationlist_stat[i].num_bikes_available;
    stations[station_id].num_bikes_disabled = stationlist_stat[i].num_bikes_disabled;
    stations[station_id].num_ebikes_available = stationlist_stat[i].num_ebikes_available;
    stations[station_id].num_docks_available = stationlist_stat[i].num_docks_available;
    

    stations[station_id].num_docks_disabled = stationlist_stat[i].num_docks_disabled;
    stations[station_id].valet = ("valet" in stationlist_stat[i]) ? true : false;
    
    //stations[station_id].electric_bike_surcharge_waiver = stationlist_info[i].electric_bike_surcharge_waiver; // Seems to be depreciated
    stations[station_id].electric_bike_surcharge_waiver = (((stationlist_stat[i].num_bikes_available == stationlist_stat[i].num_ebikes_available) && (stationlist_stat[i].num_ebikes_available > 0))) ? true : false;
    
    stations[station_id].last_reported = stationlist_stat[i].last_reported;
    stations[station_id].distance_from_user = distanceToStation(stations[station_id].lat, stations[station_id].lon);
}

var str_stations = JSON.stringify(stations);

var closest_stations = closestStations(stations);

var top_n_closest_stations = closest_stations.slice(0, num_results);
var str_top_n_closest_stations = JSON.stringify(top_n_closest_stations);
