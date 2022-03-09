<template>
  <div class="container-error">
    <h5>ERROR 404</h5>
    <h3>Error de red local</h3>
    <button @click="goHome">Volver a cargar</button>
  </div>
  
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    goHome(){
        this.$router.push('/');
        location.reload();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
