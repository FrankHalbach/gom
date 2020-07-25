<template>
  <v-app dark>
    <v-app-bar clipped fixed app>
      <v-toolbar-title v-text="title" />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: "Growth Over Market Simulator",
    };
  },
};
</script>
