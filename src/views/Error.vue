<template>
  <v-container fluid >
    <h1>Error 404</h1>
    <hr>
    <h2>Page "{{url}}" not found.</h2>
  </v-container>
</template>

<script>
  export default {
    name: 'Error',
    computed: {
      url () {
        return window.location.href
      }
    }
  }
</script>

<style scoped>

</style>
