<template>
  <v-row>
    <v-col cols="12" md="9">
      <v-card min-height="500">
        <v-card-title primary-title>Inputs</v-card-title>

        <!-- <v-row>
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
        </v-row>-->

        <v-tabs>
          <v-tab>Sales Prices</v-tab>
          <v-tab>Vehicles</v-tab>
          <v-tab>Part Volume</v-tab>

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
            <v-data-iterator :items="variant.vehicles">
              <template v-slot:default="props">
                <v-row>
                  <v-col
                    v-for="(item,i) in props.items"
                    :key="i"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                  >
                     <v-card>
              <v-card-title class="subheading font-weight-bold">{{ item.title }}
                  <v-spacer></v-spacer>
                  <v-btn x-small color="error" @click="deleteVehicle(i)">delete</v-btn>

              </v-card-title>

              <v-divider></v-divider>
                    <vehicle-editor :vehicle="item" @delete="deleteVehicle(i)"></vehicle-editor>
                     </v-card>
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
            <!-- <vehicle-editor
              v-for="(v,i) in variant.vehicles"
              :key="i"
              :vehicle="v"
              @delete="deleteVehicle(i)"
            ></vehicle-editor>-->
            <v-btn small color="success" @click="addVehicle">Add Vehicle</v-btn>
          </v-tab-item>

          <v-tab-item>
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
            <v-text-field
              v-model.number="variant.actuals.volume"
              type="number"
              name="Actual Volume"
              label="Actual Volume"
            ></v-text-field>

            <v-text-field
              v-model="variant.actuals.netSales"
              name="Actual NetSales"
              label="Actual NetSales"
            ></v-text-field>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card>
        <v-card-title primary-title>Volume Accounts</v-card-title>
        <account-report :variant="variant"></account-report>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { Variant, ReasonCode } from "../logic/Interfaces";
import datepickerDialogVue from "./infrastucture/datepickerDialog.vue";

export default Vue.extend({
  name: "VariantEditor",
  props: {
    variant: {
      type: Object,
      required: true,
    } as PropOptions<Variant>,
    title: {
      type: String,
      default: "tbd",
    } as PropOptions<String>,
  },
  methods: {
    addVehicle() {
      this.variant.addVehicle(
        "tbd",
        0,
        0,
        new Date(2020, 1, 1),
        new Date(2025, 12, 1)
      );
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