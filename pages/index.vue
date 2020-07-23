<template>
<div>  
<v-row no-gutters>
  <v-col cols="12" md="6">
    <variant-editor :variant="forecast"></variant-editor>
  </v-col>
  <v-col cols="12" md="6">
    <variant-editor :variant="actual"></variant-editor>
  </v-col>

</v-row>

<v-card>
  {{forecast}}
</v-card>
<v-card>
  {{actual}}
</v-card>

</div>


  <!-- <v-layout column justify-center align-center>
    <v-row>
      <v-col cols="12" md="6">
        <variant-editor :variant="forecast"></variant-editor>
      </v-col>
      <v-col cols="12" md="6">
        <variant-editor :variant="actual"></variant-editor>
      </v-col>
    </v-row>

<v-card>
  {{forecast}}
</v-card>
<v-card>
  {{actual}}
</v-card>
    
    
  </v-layout> -->
</template>

<script lang="ts">
import Vue from "vue";

import { ReasonCode, Variant } from "~/logic/Interfaces";
import { createVariant } from "~/logic/Variant";

export default Vue.extend({
  data() {
    let dialog = false;
    let forecast: Variant = createVariant(1, "Variant A - Forecast");
    let actual: Variant = createVariant(1, "Variant A - Actual");

    forecast.addVehicle("Vehicle A", 1000, 5);
    forecast.addVehicle("Vehicle B", 1500, 10);
    forecast.addVehicle("Vehicle C", 500, 50);

    forecast.addSalesPrice(new Date(2019, 1, 1), ReasonCode.BasePrice, 100);
    forecast.addSalesPrice(new Date(2020, 1, 1), ReasonCode.LTA, -2);
    forecast.addSalesPrice(new Date(2020, 2, 1), ReasonCode.LTAP, -1);

    actual.addVehicle("Vehicle A", 1050, 5);
    actual.addVehicle("Vehicle B", 1560, 10);
    actual.addVehicle("Vehicle C", 535, 45);

    actual.addSalesPrice(new Date(2019, 1, 1), ReasonCode.BasePrice, 100);
    actual.addSalesPrice(new Date(2020, 1, 1), ReasonCode.LTA, -2);

    return {
      forecast,
      actual,
      dialog,
    };
  },
  // data: () => ({
  //   variant: {} as Variant,
  // }),
  methods: {
    setDialog() {
      console.log("dialog set");
      this.dialog = true;
    },
  },
});
</script>
