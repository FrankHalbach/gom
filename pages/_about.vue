<template>
  <article>    
    <nuxt-content :document="about" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const about = await $content(params.about).fetch()
    return { about }
  }
}
</script>