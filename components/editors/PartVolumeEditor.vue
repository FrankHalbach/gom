<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-subheader>Override Part Volume</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field
          dense
          type="number"
          v-model.number="value.partVolumeForecast.override"
          label="Volume"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Forecast/EDI Part Volume</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field
          dense
          type="number"
          v-model.number="value.partVolumeForecast.forecast"
          label="Volume"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Actual Part Volume</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field dense type="number" v-model.number="value.actuals.volume" label="Volume"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Actual Sales</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field dense type="number" v-model.number="value.actuals.netSales" label="Sales"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { Variant } from "~/logic/Interfaces";

export default Vue.extend({
  name: "VariantPartVolumeEditor",
  props: {
    value: {
      type: Object,
      required: true,
    } as PropOptions<Variant>,
  },
});
</script>