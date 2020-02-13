<template>
  <div>
    <div>
      <h2>Agrega tu ubicación</h2>
      <!-- <label>
        <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
        <button @click="addMarker">Agregar</button>
      </label>-->
      <br />
    </div>
    <br />
    <gmap-map
      ref="mapRef"
      :center="center"
      :zoom="12"
      @click="probando"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "MapComponent",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    probando(event) {
      this.markers = [];
      this.markers.push({
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }
      });
      this.$emit("onChange", {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      });
    },
    addMarker() {
      if (this.currentPlace) {
        this.places.push({
          name: this.currentPlace,
          coordinates: this.markers[0].position
        });
        this.center = {
          lat: this.markers[0].position.lat,
          lng: this.markers[0].position.lng
        };
      } else {
        this.$toasted.show("No puedo agrager una direccion sin nombre");
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.markers.push({ position: this.center });
      });
    }
  }
};
</script>
