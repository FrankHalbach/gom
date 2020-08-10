<template>
  <v-app dark>
    <v-app-bar clipped fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-btn text color="primary" to="/" nuxt>Simulator</v-btn>
      <v-btn text color="primary" to="/about" nuxt>About</v-btn>
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
      title: "Variance Caclulation and Growth Over Market Simulator",
    };
  },
};
</script>
