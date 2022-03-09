<template>
  <div class="container-thanks">
    <div class="contain">
      <p class="title">Bienvenido a</p>
      <p class="subtitle">FINTECH ECUADOR</p>
      <br />
      <p class="account-create">Cuenta creada con éxito</p>
      <p class="review">Revisa tu correo electrónico</p>
      <input
        type="button"
        @click="goHome"
        class="form-submit create"
        value="Ir a la Pagina Principal"
      />
    </div>

    <div id="footer">
      <p>Fintech Ecuador 2020. Todos los Derechos reservados.</p>
      <a :href="this.facebookPage" target="_blank">
        <i class="fa fa-facebook-official" aria-hidden="true"></i
      ></a>
      <a :href="this.twitterPage" target="_blank"
        ><i class="fa fa-twitter-square" aria-hidden="true"></i
      ></a>
      <a :href="this.instagramPage" target="_blank"
        ><i class="fa fa-instagram" aria-hidden="true"></i
      ></a>
      <a :href="this.youtubePage" target="_blank"
        ><i class="fa fa-youtube-play" aria-hidden="true"></i
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Thanks",
  props: {
    msg: String,
  },
  methods: {
    goHome() {
      location.href = "http://bancavirtual.kradac.com";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contain {
  height: 35.5vw;
  padding: 2vw 0vw 0vw 0vw;
}
.container-thanks {
  background-image: url(../assets/images/fondo_1.jpg);
  padding: 0vw;
  text-align: center;
  background-size: cover;
}
.account-create {
  font-size: 3.5vw;
  color: white;
}
.container-thanks .title {
  color: white;
  font-weight: 900;
  font-size: 6.5vw;
}
.container-thanks .subtitle {
  color: white;
  font-size: 3.5vw;
  font-weight: 760;
  margin-bottom: 4vw;
}
.container-thanks .review {
  color: white;
  font-size: 2vw;
  margin-bottom: 4vw;
}
.container-thanks input {
  width: 20%;
  display: inline;
  height: 3.5vw;
  font-size: 1.3vw;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
@media screen and (max-width: 768px) {
  .contain {
    height: 152.5vw;
  }
  .container-thanks {
    height: 179vw;
  }
  .container-thanks .title {
    font-size: 16vw;
  }
  .container-thanks .subtitle {
    font-size: 10vw;
  }
  .container-thanks .account-create {
    font-size: 8vw;
  }
  .container-thanks .review {
    font-size: 5vw;
  }
  .container-thanks input {
    width: 71%;
    display: inline;
    font-size: 4vw;
    margin: 11vw 0vw;
    height: 12vw;
  }
}
</style>
