<template>
  <div>
    <h1>{{ statue.person }}</h1>
    <p>Height: {{ statue.height }}</p>
    <p>Price: {{ statue.price }} Ft</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statue: []
    }
  },
  methods: {
    async loadData() {
      let id = this.$route.params.id
      console.log(id)
      let Response = await fetch(`http://127.0.0.1:8000/api/statues/${id}`)
      let data = await Response.json()
      this.statue = {...data};
    },
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style>
p {
  color: white;
}
</style>