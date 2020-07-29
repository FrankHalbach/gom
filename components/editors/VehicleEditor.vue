<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="9">
        <v-text-field dense v-model="vehicle.title" name="Vehicle Title" label="Title"></v-text-field>
      </v-col>
    </v-row>

    <v-text-field dense label="YOY Status" readonly :value="yoyStatus"></v-text-field>

    <date-picker-dialog dense label="SOP" v-model="vehicle.sop"></date-picker-dialog>

    <date-picker-dialog label="EOP" v-model="vehicle.eop"></date-picker-dialog>

    <v-text-field
      dense
      label="Vehicle Volume"
      v-model.number="vehicle.volume"
      :min="0"
      :max="100000"
      type="number"
    ></v-text-field>

    <v-slider
      v-model.number="vehicle.iRate"
      label="IRate"
      class="align-center"
      max="100"
      min="0"
      hide-details
      thumb-label
    >
      <template v-slot:append>
        <v-text-field
          v-model.number="vehicle.iRate"
          class="mt-0 pt-0"
          hide-details
          single-line
          type="number"
          style="width: 60px"
        ></v-text-field>
      </template>
    </v-slider>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"
import { Vehicle, YOYOptions } from "~/logic/Interfaces"

export default Vue.extend({
  name: "VehicleEditor",
  props: {
    vehicle: {
      type: Object,
      required: true,
    } as PropOptions<Vehicle>,
  },
  computed: {
    yoyStatus() {
      const idx: YOYOptions = (this.vehicle as Vehicle).yoyStatus()
      return YOYOptions[idx]
    }
  }
})
</script>

<style>
</style>