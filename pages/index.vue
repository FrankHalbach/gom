<template>
  <v-tabs fixed-tabs>
    <v-tab>Forecast</v-tab>
    <v-tab>Actual</v-tab>
    <v-tab>Reports</v-tab>
    <v-tab-item>
      <variant-editor :variant="forecast" title="Forecast"></variant-editor>
    </v-tab-item>
    <v-tab-item>
      <variant-editor :variant="actual" title="Actual"></variant-editor>
    </v-tab-item>
    <v-tab-item>
      <v-card elevation="10">
        <v-card-title primary-title>Variance Report</v-card-title>
        <variance-report :forecast="forecast" :actual="actual"></variance-report>
      </v-card>    
      <v-card elevation="10" class="mt-2">
        <v-card-title primary-title>GOM Report</v-card-title>
        <gom-report :forecast="forecast" :actual="actual"></gom-report>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import { forecast, actual } from "~/static/launchData";

export default Vue.extend({
  data: () => ({
    forecast: forecast,
    actual: actual
  })
})
</script>
