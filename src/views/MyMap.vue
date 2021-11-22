<template>
  <l-map style="height: 400px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
     <l-marker class="marker"
        :lat-lng="markerLatLng"
        :icon="icon"
      ></l-marker>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { icon } from "leaflet";

export default {
  props: ["element"],
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [this.element.latitude, this.element.longitude],
       markerLatLng: [this.element.latitude, this.element.longitude],
       icon: icon({
        iconUrl: 'https://img.icons8.com/fluency/48/000000/marker-storm.png',
        iconSize: [32, 37],

      }),
    };
    
  },
};
</script>
