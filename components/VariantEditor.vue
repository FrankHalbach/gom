<template>
  <v-row>
    <v-col cols="12" md="9">
      <v-card elevation="10" min-height="500">
        <v-card-title primary-title>Inputs</v-card-title>

        <v-tabs vertical >
          <v-tab>Sales Prices</v-tab>
          <v-tab>Vehicles</v-tab>
          <v-tab>Part Volume</v-tab>

          <v-tab-item>
            <v-btn small color="success" @click="addPrice">Add Price</v-btn>
            <sales-price-editor
              v-for="(sp,i) in variant.salesPrice"
              :key="i"
              :salesPrice="sp"
              @delete="deletePrice(i)"
            ></sales-price-editor>
            
          </v-tab-item>
          <v-tab-item>            
            <v-btn small color="success" @click="addVehicle">Add Vehicle</v-btn>            
            <v-alert  type="error" :value="!vehiclesTitlesUnique">
            Vehicle titles must be UNIQUE, don't use same title multiple times.
            </v-alert>
            
            <v-data-iterator :items="variant.vehicles">
              <template v-slot:default="props">
                <v-row>
                  <v-col v-for="(item,i) in props.items" :key="i" cols="12" sm="6" md="4" lg="3">
                    <v-card>
                      <v-card-title class="subheading font-weight-bold">
                        {{ item.title }}
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
          
          </v-tab-item>
          <v-tab-item>
            <part-volume-editor v-model="variant"/>           
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card elevation="10">
        <v-card-title primary-title>Volume Accounts</v-card-title>
        <account-report :variant="variant"></account-report>
      </v-card>
    </v-col>
  </v-row>
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
    title: {
      type: String,
      default: "tbd",
    } as PropOptions<String>,
  },  
  computed:{
    vehiclesTitlesUnique(){
      const uniqueValues = new Set(this.variant.vehicles.map(v => v.title.toLowerCase()));
      return uniqueValues.size == this.variant.vehicles.length               
    }
  },
  methods: {
    
    addVehicle() {
      this.variant.addVehicle("tbd",0,1,new Date(),new Date(new Date().getFullYear() + 6, 0, 1)
      );
    },
    deleteVehicle(i: number) {
      this.variant.vehicles.splice(-1);
    },
    addPrice() {
      this.variant.addSalesPrice(new Date(), ReasonCode.LTA, 0);
    },
    deletePrice(i: number) {
      this.variant.salesPrice.splice(-1);
    },
  },
});
</script>

<style>
</style>