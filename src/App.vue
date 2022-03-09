
<script>
import { APIS } from "./constantes/apis";
import $ from "jquery";
export default {
  data: function () {
    return {
      footer: true,
      APIS: APIS,
      statys: false,
      idEntidad: "id",
      titlePage: "",
      facebookPage: "https://www.facebook.com/",
      twitterPage: "https://www.twitter.com/",
      instagramPage: "https://www.instagram.com/",
      youtubePage: "https://www.youtube.com/",
      colorpPage: "",
      colorsPage: "",
      logovPage: "url",
      logohPage: "url",
      copyright: "",
      contacto: "",
      correo: "",
      favicon: "",
      lema: "Juntos como nunca",
      header: {
        latitud: "",
        longitud: "",
        idEntity: null,
        token: "",
      },
    };
  },
  beforeMount() {
    this.getLocate();
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    const body = { id_entity: 1 };
    this.$http
      .post(this.APIS[1].name, body)
      .then((response) => {
        this.header.token = response.data.token;
        response.data.results.forEach((element) => {
          this.logohPage = element.logo_horizontal;
          this.colorpPage = element.color_primario;
          this.colorsPage = element.color_secundario;
          this.copyright = element.copyright;
          this.contacto = element.contacto;
          this.correo = element.correo;
          this.facebookPage = element.facebook;
          this.twitterPage = element.twitter;
          this.favicon = element.favicon;
          this.header.idEntity = 1;
          window.document.title = element.titulo_pagina;
          $(":root").css("--colorP", this.colorpPage);
          $(":root").css("--colorS", this.colorsPage);
          link.href = this.favicon;
        });
      })
      .catch((error) => {
        console.log(error);
        this.$router.push("/error");
        return 404;
      });
  },
  methods: {
    async getLocate() {
      var globales = this;
      navigator.geolocation.getCurrentPosition(function (position) {
        globales.header.longitud = position.coords.longitude;
        globales.header.latitud = position.coords.latitude;
        //console.log(globales.header.latitud);
      });
    },

    listen(variable) {
      console.log(variable);
    },
    closeSesion() {
      this.$session.clear();
      this.$session.destroy();
      window.location.href = "/";
      this.$router.push("/");
    },
  },
  mounted: function () {},
};
</script>

<template>
  <div id="app">
    <div id="nav">
      <img
        class="icon-nav"
        src="	http://fte.edu.ec/wp-content/uploads/2021/09/Banco-de-Loja-300x86.png"
      />
      <!-- <router-link to="/registro">Registro</router-link> |
      <router-link to="/inicio">Login</router-link> -->
      <div v-show="this.$session.exists()" id="content-user">
        <div id="exit"><a href="#" @click="closeSesion">Salir</a></div>
      </div>
    </div>

    <router-view
      :APIS="APIS"
      :copyright="this.copyright"
      :header="this.header"
      @listening="listen"
    />
  </div>
</template>

<style scoped>
</style>
