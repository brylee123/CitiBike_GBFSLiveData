var stations = {}; 
var stationlist_info = JSON.parse(global('STATIONINFO')).data.stations;
var stationlist_stat = JSON.parse(global('STATIONSTAT')).data.stations; 
var stationlength = stationlist_info.length;
    
for (var i = 0; i < stationlength; i++) { 
    var station_id = stationlist_info[i].station_id; 
    var name = stationlist_info[i].name; 
    var lat = stationlist_info[i].lat;
    var lon = stationlist_info[i].lon; 
    var rental_url = stationlist_info[i].rental_url;

    var num_bikes_available = stationlist_stat[i].num_bikes_available;
    var num_ebikes_available = stationlist_stat[i].num_ebikes_available;
    var num_docks_available = stationlist_stat[i].num_docks_available;
    var last_reported = stationlist_stat[i].last_reported;

    stations[station_id] = {};

    stations[station_id].name = name;
    stations[station_id].lat = lat;
    stations[station_id].lon = lon;
    stations[station_id].rental_url = rental_url;

    stations[station_id].num_bikes_available = num_bikes_available;
    stations[station_id].num_ebikes_available = num_ebikes_available;
    stations[station_id].num_docks_available = num_docks_available;
    stations[station_id].last_reported = last_reported;
    
}

var station_dir = JSON.stringify(stations);
