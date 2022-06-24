var stations = JSON.parse(str_stations);
var top_n_closest_stations = JSON.parse(str_top_n_closest_stations);

station_id = top_n_closest_stations[station_index-1];

var notif_txt = "";
var station_name = stations[station_id].name;
var station_distance = stations[station_id].distance_from_user*3280.84; // Convert to feet

var notif_title = station_name + " (" + Math.round(station_distance).toString() + " ft) - "+station_id;

let lat = stations[station_id].lat;
let lon = stations[station_id].lon; 
var notif_gmap_url = "https://www.google.com/maps?ll="+lat+","+lon+"&q="+lat+","+lon+"&z=20.5";
var notif_citibike_url = stations[station_id].rental_url;

var notif_txt_arr = []
notif_txt_arr.push("Bike: " + (stations[station_id].num_bikes_available-stations[station_id].num_ebikes_available));
notif_txt_arr.push("E-Bike: " + stations[station_id].num_ebikes_available);
notif_txt_arr.push("Docks: " + stations[station_id].num_docks_available);

if (stations[station_id].electric_bike_surcharge_waiver) {
    notif_txt_arr.push("Waiver Available");
} 
if (stations[station_id].valet) {
    notif_txt_arr.push("Valet Available");
}

notif_txt = notif_txt_arr.join("  ||  ")
