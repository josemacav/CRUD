<template>
  <div class="container">
    <h1>Agrega las direcciones</h1>
    <section class="form">
      <form action class="text-center">
        <input
          v-model="calle"
          @keyup.enter="crearPaciente"
          type="text"
          class="form-control"
          placeholder="Calle"
        />
        <input
          v-model="poblacion"
          @keyup.enter="crearPaciente"
          type="text"
          class="form-control"
          placeholder="Poblacion"
        />
        <input
          v-model="provincia"
          @keyup.enter="crearPaciente"
          type="text"
          class="form-control"
          placeholder="Provincia"
        />
        <input @click="crearDireccion" type="button" value="Añadir" class="btn btn-success" />
      </form>
    </section>

    <section class="data">
      <h3>Direcciones, (coordenadas actuales, Lat: {{ gps.lat }}, Lng {{ gps.lng }})</h3>
      <table class="table" border="1px" style="margin: 0 auto;">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Calle</th>
            <th scope="col">Poblacion</th>
            <th scope="col">Provincia</th>
            <th scope="col">Latitud</th>
            <th scope="col">Longitud</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(direccion, index) in direcciones" v-bind:key="index">
            <td>{{ direccion.id }}</td>
            <td>
              <span v-if="formActualizar && idActualizar == index">
                <input v-model="calleActualizar" type="text" class="form-control" />
              </span>
              <span v-else>{{ direccion.calle }}</span>
            </td>
            <td>
              <span v-if="formActualizar && idActualizar == index">
                <input v-model="poblacionActualizar" type="text" class="form-control" />
              </span>
              <span v-else>{{ direccion.poblacion }}</span>
            </td>
            <td>
              <span v-if="formActualizar && idActualizar == index">
                <input v-model="provinciaActualizar" type="text" class="form-control" />
              </span>
              <span v-else>{{ direccion.provincia }}</span>
            </td>
            <td>
              <span v-if="formActualizar && idActualizar == index"></span>
              <span v-else>{{ direccion.lat }}</span>
            </td>
            <td>
              <span v-if="formActualizar && idActualizar == index"></span>
              <span v-else>{{ direccion.lng }}</span>
            </td>
            <td>
              <span v-if="formActualizar && idActualizar == index">
                <button @click="guardarActualizacion(index)" class="btn btn-success">Guardar</button>
              </span>
              <span v-else>
                <button @click="verFormActualizar(index)" class="btn btn-warning">Actualizar</button>
                <button @click="borrarDireccion(index)" class="btn btn-danger">Borrar</button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  name: "Tabla",
  data() {
    return {
      calle: "",

      poblacion: "",

      provincia: "",

      formActualizar: false,

      idActualizar: -1,

      calleActualizar: "",

      poblacionActualizar: "",

      provinciaActualizar: "",

      latActualizar: "",

      lngActualizar: "",

      direcciones: []
    };
  },

  methods: {
    crearDireccion: function() {
      // eslint-disable-next-line no-console
      console.log(this);
      if (this.calle == "" || this.poblacion == "" || this.provincia == "") {
        this.$toasted.show("Por favor ingrese datos");
        return;
      }
      this.direcciones.push({
        id: +new Date(),
        calle: this.calle,
        poblacion: this.poblacion,
        provincia: this.provincia,
        lat: this.gps.lat,
        lng: this.gps.lng
      });
      this.calle = "";
      this.poblacion = "";
      this.provincia = "";
    },
    verFormActualizar: function(direccion_id) {
      this.idActualizar = direccion_id;
      this.calleActualizar = this.direcciones[direccion_id].calle;
      this.poblacionActualizar = this.direcciones[direccion_id].poblacion;
      this.provinciaActualizar = this.direcciones[direccion_id].provincia;
      this.latActualizar = this.gps.lat;
      this.lngActualizar = this.gps.lng;
      this.formActualizar = true;
    },
    borrarDireccion: function(direccion_id) {
      this.direcciones.splice(direccion_id, 1);
    },
    guardarActualizacion: function(direccion_id) {
      this.formActualizar = false;
      this.direcciones[direccion_id].calle = this.calleActualizar;
      this.direcciones[direccion_id].poblacion = this.poblacionActualizar;
      this.direcciones[direccion_id].provincia = this.provinciaActualizar;
      this.direcciones[direccion_id].lat = this.gps.lat;
      this.direcciones[direccion_id].lng = this.gps.lng;
    }
  },
  props: {
    gps: {
      type: Object,
      default: function() {
        return { lat: 45.508, lng: -73.587 };
      }
    }
  }
};
</script>
