<template>
  <v-form>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="vehicle.title"
            name="Vehicle Title"
            label="Title"
            :id="vehicle.title"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          
          <v-text-field
            label="Vehicle Volume"
            v-model="vehicle.volume"             
            :min="0"
            :max="100000"
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="5">
          <v-slider thumb-label="always" v-model="vehicle.iRate" min="0" max="100" label="IRate"></v-slider>
        </v-col>
          <v-col cols="12" md="1">
          <v-btn small  color="error" @click="$emit('delete',$event)"> delete</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { Vehicle } from "../logic/Interfaces";

export default Vue.extend({
  name: "VehicleEditor",
  props: {
    vehicle: {
      type: Object,
      required: true,
    } as PropOptions<Vehicle>,
  },
});
</script>

<style>
</style>