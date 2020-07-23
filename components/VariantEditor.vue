<template>
  <v-container fluid>
    <v-card width="850" min-height="500">
      <v-card-title primary-title>{{variant.id}} - {{variant.title}}</v-card-title>
      <v-row no-gutters>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="variant.id"
            name="Variant Id"
            label="Variant ID"
            :id="`${variant.id}`"
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="10">
          <v-text-field
            v-model="variant.title"
            name="Variant Title"
            label="Variant Title"
            :id="variant.title"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-tabs>
        <v-tab>Sales Prices</v-tab>
        <v-tab>Vehicles</v-tab>
        <v-tab>Actuals/Override/Forecast Volume</v-tab>

        <v-tab-item>
          <sales-price-editor
            v-for="(sp,i) in variant.salesPrice"
            :key="i"
            :salesPrice="sp"
            @delete="deletePrice(i)"
          ></sales-price-editor>
          <v-btn small color="success" @click="addPrice">Add Price</v-btn>
        </v-tab-item>
        <v-tab-item>
          <vehicle-editor
            v-for="(v,i) in variant.vehicles"
            :key="i"
            :vehicle="v"
            @delete="deleteVehicle(i)"
          ></vehicle-editor>
          <v-btn small color="success" @click="addVehicle">Add Vehicle</v-btn>
        </v-tab-item>

        <v-tab-item>
          <v-text-field label="Vehicle Part Volume" readonly :value="variant.partVolumeVehicle()"></v-text-field>
          <v-text-field
            type="number"
            v-model.number="variant.partVolumeForecast.override"
            name="Override Part Volume"
            label="Override Part Volume"
          ></v-text-field>
          <v-text-field
            type="number"
            v-model.number="variant.partVolumeForecast.forecast"
            name="Forecast/EDI Part volume"
            label="Forecast/EDI Part volumes"
          ></v-text-field>
          <v-text-field v-model.number="variant.actuals.volume"  type="number" name="Actual Volume" label="Actual Volume"></v-text-field>
          <v-text-field label="Valid Volume" readonly :value="variant.validPartVolume()"></v-text-field>

          <v-text-field
            v-model="variant.actuals.netSales"
            name="Actual NetSales"
            label="Actual NetSales"
          ></v-text-field>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>

  <!-- 
      vehicle editor
      sales price editor
      variant master data
      actual editor
  -->
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { Variant, ReasonCode } from "../logic/Interfaces";

export default Vue.extend({
  name: "VariantEditor",
  props: {
    variant: {
      type: Object,
      required: true,
    } as PropOptions<Variant>,
  },
  methods: {
    addVehicle() {
      this.variant.addVehicle("tbd", 0, 0);
    },
    deleteVehicle(i: number) {
      this.variant.vehicles.splice(-1);
    },
    addPrice() {
      this.variant.addSalesPrice(new Date(2020, 1, 1), ReasonCode.LTA, 0);
    },

    deletePrice(i: number) {
      this.variant.salesPrice.splice(-1);
    },
  },
});
</script>

<style>
</style>