<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon color="grey lighten-1">info</v-icon>
      </v-btn>
    </template>
    <div v-if="value && typeof value === 'object'">      
      <p  v-for="(p,i) in value" :key="i">{{value[i]}}</p>    
    </div>
    <p v-else>{{value}}</p>
  </v-tooltip>
</template>

<script>
export default {
  name:'ToolTip',
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>