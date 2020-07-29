<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="event"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";

export default Vue.extend({
  name: "DatePickerDialog",
  props: {
    value: {
      type: Date,
      required: true,
    } as PropOptions<Date>,
    label:{
      type:String,
      required:true
    } as PropOptions<String>
  },
  data: () => ({
    menu: false,
  }),
  computed: {
    date: {
      get() {
        return (this as any).$getISODate(this.value);        
      },
      set(val: Date) {
        (this as any).$emit("input", new Date(val))
      },
    },
  },
})
</script>

<style>
</style>