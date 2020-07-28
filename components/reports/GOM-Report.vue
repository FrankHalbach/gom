<template>
  <h1>test</h1>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"
import { Variant } from '~/logic/Interfaces'
export default Vue.extend({
    name: "GOM-Report",
    props: {
    forecast: {
      type: Object,
      required: true,
    } as PropOptions<Variant>,
    actual: {
      type: Object,
      required: true,
    } as PropOptions<Variant>
  }
})
</script>