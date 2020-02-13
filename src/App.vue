<template>
  <div id="app">
    <Tabla :gps="gps" />
    <map-component @onChange="childCallBack" />
  </div>
</template>

<script>
import MapComponent from "@/components/MapComponent.vue";
import Tabla from "@/components/Tabla.vue";
export default {
  name: "app",
  components: {
    Tabla,
    MapComponent
  },
  data() {
    return {
      gps: { lat: 45.508, lng: -73.587 }
    };
  },
  methods: {
    childCallBack(event) {
      this.gps = event;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
