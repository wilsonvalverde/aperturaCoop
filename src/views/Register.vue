<script>
import LogoCedula from "../assets/icons/cedula.png";
import LogoSelfie from "../assets/icons/selfie.png";
import { MglMap, MglMarker, MglNavigationControl } from "vue-mapbox";

import Mapbox from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import $ from "jquery";
export default {
  name: "Reconocimiento",
  components: {
    MglMap,
    MglMarker,
    MglNavigationControl,
  },
  created() {
    this.mapbox = Mapbox;
  },
  props: ["APIS", "header", "copyright"],

  data: function () {
    return {
      estado: "",
      selfieError: false,
      modalmessage: "",
      msgError: "Datos incorrectos intente de nuevo",
      accessToken:
        "pk.eyJ1Ijoid2lsc29uMTkiLCJhIjoiY2tqdWZjcWF3MHBlNTJ6bzhqMDYwZ3J3YyJ9.1_-bLdTUoGGuj7dZ276Sjg", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/mapbox/streets-v11", // your map style
      coordinates: [this.header.longitud, this.header.latitud], //-78.183406,-1.831239
      geoUser: {},
      name_lastname_user: this.$session.get("name"),
      email_user: this.$session.get("email"),
      tlf_user: "",
      tlf_user_text: "",
      nro_house_user: "",
      province: "",
      city: "",
      reference_house_user: "",
      sendCodeStatus: false,
      dni: this.$session.get("dni"),
      numbersteps: 1,
      card1: true,
      card2: true,
      imagenCedula: "echo",
      imagenSelfie: null,
      action1: 1,
      action2: 1,
      elemetsForm: [],
      elemetsTerm: [],
      dataFormOnly: [],
      dataForm: [],
      dataTerm: [],
      dataCode: [],
      img1: LogoCedula,
      img2: LogoSelfie,
      msj1: "Toma una fotografía del Frente y Revés de tu cédula",
      msj2: "Click aquí para capturar una selfie con tu dispositivo",
      msjuno: "Toma una fotografía del Frente y Revés de tu cédula",
      msjdos: "Click aquí para capturar una selfie con tu dispositivo",
      msj3: "+ Subir Foto",
      msj4: "Activar Camara",
      rutaDestino: "/",
      rutaInicio: "/",
      rutaRegistro: "/registro",
      Terms: "Terminos Y Condiciones dependiente de cada Entidad ",
    };
  },
  mounted: function () {
    if (this.$session.exists()) {
      // console.log(this.$session.get("number"));
      if (this.$session.get("number") == 1) {
        location.reload();
      }
      this.$session.remove("number");
      this.coordinates = [this.header.longitud, this.header.latitud];
      $("html, body").animate({ scrollTop: $("#footer").offset() }, 2000);
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    viewcards() {
      var x = document.getElementById("icons-targets");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    },
    ponercard: function (variable) {
      for (let index = 0; index < 3; index++) {
        $("#type-target option[value=" + "'" + index + "'" + "]").attr(
          "selected",
          false
        );
      }
      $("#type-target option[value=" + "'" + variable + "'" + "]").attr(
        "selected",
        true
      );
      var x = document.getElementById("icons-targets");
      x.style.display = "none";
    },
    async addOptions() {
      var array = new Array();
      var nombres = this.name_lastname_user.split(" ", 5);
      array.push(nombres[2] + " " + nombres[0]);
      array.push(nombres[3] + " " + nombres[1]);
      array.push(nombres[2] + " " + nombres[3] + " " + nombres[0]);
      setTimeout(() => {
        var select = document.getElementsByName("name_target")[0];
        for (var value in array) {
          var option = document.createElement("option");
          option.value = array[value];
          option.text = array[value];
          select.add(option);
        }
        setTimeout(() => {
          $("#name_target option[value=" + "'" + array[0] + "'" + "]").attr(
            "selected",
            true
          );
        }, 1000);
      }, 2000);
    },

    // Rutina para agregar opciones a un <select>

    showsencode() {
      this.$modal.show("sendCode");
    },
    closeModal() {
      this.$modal.hide("modalError");
      if (this.numbersteps == 1) {
        location.href = this.rutaRegistro;
      }
    },
    cleanphotobio: function () {
      const canvas = document.getElementById("photoBio");
      var context = canvas.getContext("2d");
      context.drawImage(0, 0, 0, 0);
    },
    handleBlur(e) {
      if ($("#email_user").val() != e.target.value) {
        $("#" + e.target.name).val("");
      }
    },
    submit: function () {
      const formData = new FormData(this.$refs["data-personal"]); // reference to form element
      const data = {}; // need to convert it before using not with XMLHttpRequest
      for (let [key, val] of formData.entries()) {
        Object.assign(data, { [key]: val });
      }
      this.dataFormOnly = data;
      this.tlf_user_text =
        593 + this.tlf_user.substr(1, 1) + "xxxxxx" + this.tlf_user.substr(-1);
      const headers = {
        lat: this.header.latitud,
        long: this.header.longitud,
        dni: this.dni,
        Authorization: "Bearer " + this.header.token,
      };

      //URL DE OBTENCIÓN DE TERMINOS

      const body = {
        id_entity: this.header.idEntity,
        data: data,
        email_user: this.email_user,
        dni: this.dni,
      };

      if (this.elemetsForm.length == 0) {
        this.elemetsForm = [];
        this.$http
          .post(this.APIS[0].name, body, { headers })
          .then((response) => {
            response.data.forEach((element) => {
              this.elemetsForm.push(element);
            });
            this.numbersteps = 3;
            $("html, body").animate(
              { scrollTop: $("#navs").offset().top },
              2000
            );
          })
          .catch((error) => {
            console.error(error);
            this.$modal.show("modalError");
          });
      } else {
        this.numbersteps = 3;
      }
    },
    submitForm: function () {
      const formData = new FormData(this.$refs["data-personal2"]); // reference to form element
      const data = {}; // need to convert it before using not with XMLHttpRequest
      for (let [key, val] of formData.entries()) {
        Object.assign(data, { [key]: val });
      }
      this.dataForm = data;
      const headers = {
        lat: this.header.latitud,
        long: this.header.longitud,
        Authorization: "Bearer " + this.header.token,
      };
      const body = {
        id_entity: this.header.idEntity,
        email_user: this.email_user,
        dni: this.dni,
      };
      //URL DE OBTENCIÓN DE TERMINOS
      this.elemetsTerm = [];
      this.$http
        .post(this.APIS[2].name, body, { headers })
        .then((response) => {
          if (response.status == 200) {
            response.data.forEach((element) => {
              this.elemetsTerm.push(element);
            });
            this.numbersteps = 4;
            $("html, body").animate(
              { scrollTop: $("#navs").offset().top },
              2000
            );
          } else {
            this.$modal.show("modalError");
          }
        })
        .catch((error) => {
          console.error(error);
          this.$modal.show("modalError");
        });
    },
    submitTerms: function () {
      const formData = new FormData(this.$refs["data-terms"]); // reference to form element
      const data = {}; // need to convert it before using not with XMLHttpRequest
      for (let [key, val] of formData.entries()) {
        Object.assign(data, { [key]: val });
      }
      this.dataTerm = data;
      let tlf_user = this.tlf_user;
      if (tlf_user.length == 10) {
        tlf_user = this.tlf_user.substr(1);
      }
      const headers = {
        lat: this.header.latitud,
        long: this.header.longitud,
        Authorization: "Bearer " + this.header.token,
      };
      const body = {
        id_entity: this.header.idEntity,
        email_user: this.email_user,
        dni: this.dni,
        tlf_user: "593" + tlf_user,
        transaction_type: "Apertura de cuenta",
      };

      this.$http
        .post(this.APIS[6].name, body, { headers })
        .then((response) => {
          if (response.status == 200) {
            this.numbersteps = 5;
            this.sendCodeStatus = true;
          } else {
            this.$modal.show("modalError");
          }
        })
        .catch((error) => {
          if (error) {
            this.$modal.show("modalError");
          }
        });
    },
    submitCode: function () {
      const formData = new FormData(this.$refs["code-data"]);
      const data = {}; // need to convert it before using not with XMLHttpRequest
      for (let [key, val] of formData.entries()) {
        Object.assign(data, { [key]: val });
      }
      this.dataCode = data;
      const dataFinal = [];
      dataFinal.push(this.dataFormOnly);
      dataFinal.push(this.dataForm);
      // dataFinal.push(this.dataTerm);
      let code = "";
      let tlf_user = this.tlf_user;
      if (tlf_user.length == 10) {
        tlf_user = this.tlf_user.substr(1);
      }
      for (let i = 1; i < 7; i++) {
        code += $("#digit" + i).val();
      }
      dataFinal.push(data);
      const headers = {
        lat: this.header.latitud,
        long: this.header.longitud,
        Authorization: "Bearer " + this.header.token,
      };
      const body = {
        id_entity: this.header.idEntity,
        email_user: this.email_user,
        dni: this.dni,
        tlf_user: "593" + tlf_user,
        transaction_type: "Apertura de cuenta",
        code: code,
      };

      this.$http
        .post(this.APIS[7].name, body, { headers })
        .then((response) => {
          if (response.data.status == true) {
            const headers = {
              lat: this.header.latitud,
              long: this.header.longitud,
              Authorization: "Bearer " + this.header.token,
            };
            const body = {
              id_entity: this.header.idEntity,
              data: dataFinal,
              email_user: this.email_user,
              dni: this.dni,
              tlf_user: "593" + tlf_user,
            };

            this.$http
              .post(this.APIS[5].name, body, { headers })
              .then((response) => {
                if (response.status == 200) {
                  //this.$router.push('/registrado')
                  window.location.href = "/registrado";
                } else {
                  //this.$router.push('/registrado')
                  window.location.href = "/registrado";
                }
              })
              .catch((error) => {
                if (error) {
                  this.msgError == "Error de Red";
                  this.$modal.show("modalError");
                }
              });
          } else {
            this.msgError = response.data.message;
            this.$modal.show("modalError");
            if (response.data.reply) {
              this.$modal.show("sendCode");
            }
            //  this.msgError="Datos incorrectos intente de nuevo";
          }
        })
        .catch((error) => {
          if (error) {
            this.$modal.show("modalError");
          }
        });
    },
    sendCode() {
      let tlf_user = $("#sendcode").val();
      this.tlf_user = tlf_user;
      this.tlf_user_text =
        593 + this.tlf_user.substr(1, 1) + "xxxxx" + this.tlf_user.substr(-1);
      this.tlf_user = tlf_user;
      if (tlf_user.length == 10) {
        tlf_user = this.tlf_user.substr(1);
        const headers = {
          lat: this.header.latitud,
          long: this.header.longitud,
          Authorization: "Bearer " + this.header.token,
        };
        const body = {
          id_entity: this.header.idEntity,
          email_user: this.email_user,
          dni: this.dni,
          tlf_user: "593" + tlf_user,
          transaction_type: "Apertura de cuenta",
        };

        this.$http
          .post(this.APIS[6].name, body, { headers })
          .then((response) => {
            if (response.status == 200) {
              this.$modal.hide("sendCode");
            } else {
              this.$modal.show("modalError");
            }
          })
          .catch((error) => {
            console.error(error);
            this.$modal.show("modalError");
          });
      } else {
        this.msgError = "Ingrese un número de Celular válido";
        this.$modal.show("modalError");
      }
    },
    async onMapLoad(event) {
      this.coordinates = [this.header.longitud, this.header.latitud];
      const { map } = event;
      map.addControl(
        new MapboxGeocoder({
          accessToken: this.accessToken,
          mapboxgl: this.mapbox,
        })
      );
      const geolocate = new this.mapbox.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });
      map.addControl(geolocate);
      geolocate.trigger();
      this.geoUser = geolocate;
    },
    coordStreet(component) {
      const { marker } = component;
      console.log(marker._lngLat);
    },
    localUser() {
      try {
        const lngLat = Object.values(
          this.geoUser._userLocationDotMarker._lngLat
        );
        const lng = lngLat[0] + 0.00029;
        const lat = lngLat[1] + 0.00029;
        this.coordinates = [lng, lat];
      } catch (error) {
        console.log(error);
      }
    },
    regresar: function (variable) {
      switch (variable) {
        case 1:
          if (this.imagenCedula != null || this.imagenSelfie != null) {
            if (this.msjuno != this.msj3) {
              window.location.href = this.rutaDestino;
            } else {
              this.rutaDestino = this.rutaInicio;
              (this.img1 = LogoCedula),
                (this.img2 = LogoSelfie),
                (this.msjuno = this.msj1),
                (this.msjdos = this.msj2),
                (this.card1 = true),
                (this.card2 = true),
                (this.action1 = 3),
                (this.action2 = 1);
              this.estado = "";
            }
          } else {
            this.$session.clear();
            this.$session.destroy();
            this.$router.push("/");
          }
          break;
        case 2:
          this.numbersteps = 1;
          window.location.href = "/registro";
          $("html, body").animate({ scrollTop: $("#navs").offset().top }, 500);
          break;
        case 3:
          this.numbersteps = 2;
          $("html, body").animate({ scrollTop: $("#navs").offset().top }, 500);
          break;
        case 4:
          this.numbersteps = 3;
          break;
        case 5:
          this.numbersteps = 4;
      }
    },
    subir: function (variable) {
      switch (variable) {
        case 1:
          this.card1 = false;
          this.card2 = false;
          this.estado = "avatarvideo";
          $("#ver").click();
          break;
        case 2:
          $("#avatar").click();
          break;
        case 4:
          this.modalmessage = "Ingrese la Cédula porfavor";
          this.$modal.show("hola");
          break;
        default:
          this.modalmessage =
            "Ya SUBIO su fotografia en caso de cancelar seleccione regresar";
          this.$modal.show("hola");
          break;
      }
    },
    getImage(event) {
      this.imagenCedula == null
        ? (this.imagenCedula = event.target.files[0])
        : (this.imagenSelfie = event.target.files[0]);
      this.card1 = false;
      this.card2 = false;
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#vistaprevia").attr("src", e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);

      this.estado = "avatar";
    },
    getSelfieError() {
      if (this.selfieError == false) {
        this.selfieError = true;
        $("#btnCaptureHidden").click();
      }
    },

    getSelfie() {
      var canvas = document.getElementById("photoBio");
      const dataURL = canvas.toDataURL();
      var strImage = dataURL.replace(/^data:image\/[a-z]+;base64,/, "");
      const video = document.getElementById("video");
      video.srcObject.getTracks()[0].stop();
      $("#msjSonrisa").html("Identicando su rostro....");
      var filename = "faceScript.js";
      var filetype = "js";
      let targetelement =
        filetype == "js" ? "script" : filetype == "css" ? "link" : "none"; //determine element type to create nodelist from
      let targetattr =
        filetype == "js" ? "src" : filetype == "css" ? "href" : "none"; //determine corresponding attribute to test for
      let allsuspects = document.getElementsByTagName(targetelement);
      for (var i = allsuspects.length; i >= 0; i--) {
        //search backwards within nodelist for matching elements to remove
        if (
          allsuspects[i] &&
          allsuspects[i].getAttribute(targetattr) != null &&
          allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1
        )
          allsuspects[i].parentNode.removeChild(allsuspects[i]); //remove element by calling parentNode.removeChild()
      }
      const headers = {
        lat: this.header.latitud,
        long: this.header.longitud,
        Authorization: "Bearer " + this.header.token,
      };
      const body = {
        id_entity: this.header.idEntity,
        dni: this.dni,
        selfie_base64: strImage,
        email_user: this.email_user,
      };
      console.log("IMAGEN TOMADO------ ", body.selfie_base64);
      this.$http
        .post(this.APIS[4].name, body, { headers })
        .then((response) => {
          console.log("respuesta-------------", response);
          if (response.status == 200) {
            if (response.data.confidence > 70) {
              this.imagenSelfie = strImage;
              this.numbersteps = 2;
              this.modalmessage =
                "Reconocimiento Satisfactorio " +
                response.data.confidence +
                " Persona Real: " +
                response.data.livenessPerson;
              this.$modal.show("modalmessage");
              this.addOptions();
              $("html, body").animate(
                { scrollTop: $("#navs").offset().top },
                2000
              );
            } else {
              this.msgError =
                "Datos incorrectos, intente de nuevo " +
                response.data.confidence;
              this.$modal.show("modalError");
            }
          } else {
            this.msgError =
              "Datos incorrectos intente de nuevo " + response.data.confidence;
            this.$modal.show("modalError");
          }
        })
        .catch((error) => {
          console.error(error);
          this.rutaDestino = this.rutaInicio;
          (this.img1 = LogoCedula),
            (this.img2 = LogoSelfie),
            (this.msjuno = this.msj1),
            (this.msjdos = this.msj2),
            (this.card1 = true),
            (this.card2 = true),
            (this.action1 = 3),
            (this.action2 = 1);
          this.estado = "";
          this.$modal.show("modalError");
        });
    },

    updateData() {
      switch (this.numbersteps) {
        case 2:
          this.localUser();
          $("#firstform").click();
          break;
        case 3:
          $("#Secondform").click();
          break;
        case 4:
          $("#threeform").click();
          break;
        case 5:
          $("#fourthform").click();
          break;
      }
    },
    /* 1 = sololetras , 2 = solo Numeros*/
    validate: function (a, b) {
      var e = $("#" + a).val();
      var reg = /^\d+$/;
      if (b == 1) {
        if (!reg.test(e)) {
          $("#" + a).val("");
        }
      } else {
        var numeros = "0123456789";
        for (var i = 0; i < e.length; i++) {
          if (numeros.indexOf(e.charAt(i), 0) != -1) {
            $("#" + a).val("");
          }
        }
      }
    },
    openModal: function (id) {
      var newloc = id;
      window.open(newloc, "TERMINOS", "width=800, height=800");
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="slider">
      <ul>
        <li><img src="../assets/images/carr_1.png" /></li>
        <li><img src="../assets/images/carr_2.png" /></li>
        <li><img src="../assets/images/carr_3.png" /></li>
        <li><img src="../assets/images/carr_4.png" /></li>
      </ul>
    </div>

    <div id="navs" class="content-steps">
      <hr class="linestep" />
      <div
        style="margin: auto"
        v-bind:class="[numbersteps >= 1 ? 'activate' : 'desactive']"
      >
        <circule
          ><number><pc>1</pc></number></circule
        >
        <ps>Identificación</ps>
      </div>

      <div
        style="margin: auto"
        v-bind:class="[numbersteps >= 2 ? 'activate' : 'desactive']"
      >
        <circule
          ><number><pc>2</pc></number></circule
        >
        <ps>Datos personales</ps>
      </div>
      <div
        style="margin: auto"
        v-bind:class="[numbersteps >= 3 ? 'activate' : 'desactive']"
      >
        <circule
          ><number><pc>3</pc></number></circule
        >
        <ps>Profesión</ps>
      </div>
      <div
        style="margin: auto"
        v-bind:class="[numbersteps >= 4 ? 'activate' : 'desactive']"
      >
        <circule
          ><number><pc>4</pc></number></circule
        >
        <ps>Términos y Condiciones</ps>
      </div>
      <div
        style="margin: auto"
        v-bind:class="[numbersteps >= 5 ? 'activate' : 'desactive']"
      >
        <circule
          ><number><pc>5</pc></number></circule
        >
        <ps>Confirmación</ps>
      </div>
    </div>

    <div class="container-registers">
      <div v-show="numbersteps == 1">
        <img class="step" src="../assets/icons/paso_1.png" />
        <p class="steps-descriptions">
          Por su seguridad, comprobaremos su identidad
        </p>
      </div>
      <div v-show="numbersteps == 2">
        <img class="step" src="../assets/icons/paso_2.png" />
        <p class="steps-descriptions">
          Recuerda que al información que has proporcionado, es confidencial.
        </p>
      </div>
      <div v-show="numbersteps == 3">
        <img class="step" src="../assets/icons/paso_3.png" />
        <p class="steps-descriptions">
          Recuerda que al información que has proporcionado, es confidencial.
        </p>
      </div>
      <div v-show="numbersteps == 4">
        <img class="step" src="../assets/icons/paso_4.png" />
        <p class="steps-descriptions">
          Recuerda que al información que has proporcionado, es confidencial.
        </p>
      </div>
      <div v-show="numbersteps == 5">
        <img class="step5" src="../assets/icons/paso_5.png" />
        <p class="steps-descriptions">
          Ingresa el código que te enviamos al {{ this.tlf_user_text }} espera 3
          min para recibirlo
        </p>
        <!--  <span id="minutes"></span> minutos - <span id="seconds"></span> segundos para ingresarlo</p>
       <button @click="accountant()">aqui</button>-->
      </div>

      <div v-show="numbersteps == 1" class="container-options">
        <div v-show="this.card2" class="card">
          <img class="img-options" v-on:click="subir(action2)" :src="img2" />
          <p>{{ msjdos }}</p>
        </div>

        <div v-show="this.estado == 'avatar'" class="card">
          <img class="img-options" /><img
            class="vistaprevia"
            id="vistaprevia"
          />
        </div>

        <div
          v-show="this.estado == 'avatarvideo'"
          style="display: block"
          class="card"
        >
          <p
            id="msjSonrisa2"
            style="margin: 2vw auto; height: 10px; padding: 0px"
          >
            Sonría para tomar la foto
          </p>
          <div class="cardvideo">
            <div v-show="this.imagenSelfie == null" class="video-wrap">
              <video id="video" width="960" height="720" muted autoplay></video>
            </div>
            <canvas style="display: none" id="photoBio"></canvas>
          </div>

          <div class="controllervideo">
            <button hidden id="ver">Volver a tomar la Foto</button>

            <p id="msjSonrisa">Sonrisa no detectada</p>
            <br />
            <button hidden id="btnCaptureHidden">Capture</button>
            <canvas
              id="canvas"
              style="display: none"
              width="640"
              height="480"
            ></canvas>
            <button @click="getSelfieError" hidden id="capturarError"></button>
            <button @click="getSelfie" hidden id="capturar">
              Capturar Selfie
            </button>
          </div>
        </div>

        <input
          hidden
          id="avatar"
          type="file"
          name="image"
          @change="getImage"
          accept="image/*"
        />
      </div>
      <div v-if="numbersteps == 2" class="container-data-personal">
        <form ref="data-personal" id="data-personal" @submit.prevent="submit">
          <div class="param-data-personal">
            <label>Nombres y Apellidos Completos</label>
            <!-- @keydown="sololetras(event);"-->
            <input
              v-model="name_lastname_user"
              type="text"
              name="name_lastname_user"
              id="name_lastname_user"
              v-on:keyup="validate('holi', 0)"
              required
              readonly
            />
          </div>

          <!--   <div  class="param-data-personal"> 
            <label>Apellidos Completos</label>                                       
            <input  type="text" name="lastname_user" id="lastname_user" v-on:keyup="validate('holi',0)" required  placeholder="Ejm. Cuenca Padilla" >
          </div>
         
 -->
          <div class="param-data-personal">
            <label>Correo electrónico</label>
            <!-- @keydown="sololetras(event);"-->
            <input
              v-model="email_user"
              readonly
              type="email"
              name="email_user"
              id="email_user"
              v-on:keyup="validate('holi', 0)"
              required
            />
          </div>

          <!--
          <div  class="param-data-personal"> 
            <label>Confirmación de correo electrónico</label>                                       
            <input @blur="handleBlur"  type="email" name="confirm_email_user" id="confirm_email_user" v-on:keyup="validate('holi',0)" required  placeholder="Ejm. hola@dominio.com" >
          </div> -->

          <div class="param-data-personal">
            <label>Celular</label>
            <!-- @keydown="sololetras(event);"-->
            <input
              v-model="tlf_user"
              type="text"
              name="tlf_user"
              minlength="9"
              maxlength="10"
              id="tlf_user"
              onkeypress="return event.charCode >= 48 && event.charCode <= 57"
              required
            />
          </div>

          <div class="param-data-personal">
            <label>Provincia</label>
            <select
              v-model="province"
              name="province"
              id="province"
              required
              placeholder="item.placeholder"
            >
              <option value="" selected disabled>Seleccione Provincia</option>
              <option value="Loja">Loja</option>
            </select>
          </div>
          <div class="param-data-personal">
            <label>Ciudad</label>
            <select
              v-model="city"
              name="city"
              id="city"
              required
              placeholder="item.placeholder"
            >
              <option value="" selected disabled>Seleccione Ciudad</option>
              <option value="Loja">Loja</option>
            </select>
          </div>
          <div class="param-data-personal">
            <label>Nombre en Tarjeta de débito</label>
            <select
              v-model="name_target"
              name="name_target"
              id="name_target"
              required
            ></select>
          </div>
          <div class="param-data-personal">
            <label>Tipo de Tarjeta</label>
            <select
              name="type-target"
              id="type-target"
              @click="viewcards()"
              required
            >
              <option value="" disabled selected>Seleccione un tipo</option>
              <option style="display: none" value="3">Roja</option>
              <option style="display: none" value="1">Azul</option>
              <option style="display: none" value="2">Amarilla</option>
            </select>
          </div>
          <div style="display: none" id="icons-targets" class="icons-targets">
            <div v-on:click="ponercard(1)">
              <img
                src="https://www.fintech.kradac.com:3006/storage/uploads/fintech/icon-card-1.png"
              />
              <p>Azul</p>
            </div>
            <div v-on:click="ponercard(2)">
              <img
                src="https://www.fintech.kradac.com:3006/storage/uploads/fintech/icon-card-2.png"
              />
              <p>Amarilla</p>
            </div>
            <div v-on:click="ponercard(3)">
              <img
                src="https://www.fintech.kradac.com:3006/storage/uploads/fintech/icon-card-3.png"
              />
              <p>Roja</p>
            </div>
          </div>

          <div style="width: 100%" class="param-data-personal">
            <label>Ubicación</label>
            <div id="map">
              <MglMap
                :accessToken="accessToken"
                :mapStyle.sync="mapStyle"
                :center="coordinates"
                :trackResize="true"
                :minZoom="15"
                :maxZoom="15"
                @load="onMapLoad"
                @click="localUser"
              >
                <MglNavigationControl position="top-right" />
                <MglMarker
                  :coordinates="coordinates"
                  color="green"
                  :backgroundImage="'www.fintech.kradac.com:3006/storage/uploads/fintech/favicon.png'"
                  :draggable="true"
                  :scale="4"
                  @drag="coordStreet"
                />
              </MglMap>
            </div>
          </div>
          <div class="param-data-personal">
            <label>Número de Casa</label>
            <!-- @keydown="sololetras(event);"-->
            <input
              v-model="nro_house_user"
              type="text"
              name="nro_house_user"
              id="nro_house_user"
              v-on:keyup="validate('holi', 0)"
              required
              placeholder="Ejm 608-44"
            />
          </div>
          <div class="param-data-personal">
            <label>Referencia</label>
            <!-- @keydown="sololetras(event);"-->
            <input
              v-model="reference_house_user"
              type="text"
              name="reference_house_user"
              maxlength="30"
              id="reference_house_user"
              v-on:keyup="validate('holi', 0)"
              required
              placeholder="Ejm. Frente al parque principal"
            />
          </div>

          <p>
            Al continuar, estas confirmando que la información proporcionada es
            <strong
              >correcta, veridica, comprobable y autorizas a Fintech
              Ecuador</strong
            >
            a enviar a tu teléfono celular y/o correo electrónico, los codigos
            correspondes para validar el ingreso y aceptación de condiciones.
          </p>
          <br />
          <br />

          <input hidden type="submit" id="firstform" />
        </form>
      </div>
      <div v-show="numbersteps == 3" class="container-data-personal">
        <form
          ref="data-personal2"
          id="data-personal2"
          @submit.prevent="submitForm"
        >
          <div
            v-for="item in elemetsForm"
            v-bind:key="item.id"
            class="param-data-personal"
          >
            <label :for="item.key">{{ item.nombre }}</label>
            <!-- @keydown="sololetras(event);"-->
            <input
              v-if="item.tipo != 'combobox'"
              :name="item.identificador"
              v-on:keyup="validate(item.identificador, item.validador)"
              :type="item.tipo"
              :id="item.identificador"
              onpaste="return false"
              :max="item.max"
              :required="item.requerido"
              :placeholder="item.placeholder"
            />

            <div v-else>
              <select
                :name="item.identificador"
                :id="item.identificador"
                :required="item.requerido"
                :placeholder="item.placeholder"
              >
                <option value="" selected disabled>
                  {{ item.placeholder }}
                </option>
                <option
                  v-for="datacombo in item.datacombo"
                  v-bind:key="datacombo.id"
                  :value="datacombo.valor"
                >
                  {{ datacombo.nombre }}
                </option>
              </select>
            </div>
          </div>

          <input hidden type="submit" id="Secondform" />
        </form>
      </div>
      <div v-show="numbersteps == 4" class="container-data-personal">
        <form
          class="threeform"
          ref="terms"
          id="data-terms"
          @submit.prevent="submitTerms"
        >
          <div v-for="item in elemetsTerm" v-bind:key="item.id">
            <input
              type="checkbox"
              required
              :id="item.id_entidad"
              :name="item.id_entidad"
            />
            <label>
              <!-- He leído y aceptado los  <p v-on:click="(openModal(item.titulo))"> <strong>{{item.titulo}}</strong> </p>
              -->
              He leído y aceptado los
              <a
                style="cursor: pointer"
                v-on:click="openModal(item.descripcion)"
              >
                <strong>{{ item.titulo }}</strong>
              </a>
            </label>

            <modal
              width="40%"
              height="300"
              style="overflow: auto"
              draggable=".window-header"
              :adaptive="true"
              class="modal"
              :id="item.id_entidad"
              :name="item.titulo"
            >
              <p>{{ item.descripcion }}</p>
            </modal>
          </div>

          <input hidden type="submit" id="threeform" />
        </form>
      </div>
      <div v-show="numbersteps == 5" class="container-data-personal">
        <form ref="code-data" id="code-data" @submit.prevent="submitCode">
          <input
            class="code"
            maxlength="1"
            onkeyup="if (this.value.length == 1) digit2.focus()"
            name="digit1"
            id="digit1"
            type="text"
            required
          />
          <input
            class="code"
            maxlength="1"
            onkeyup="if (this.value.length == 1){digit3.focus()}else{digit1.focus()}"
            name="digit2"
            id="digit2"
            type="text"
            required
          />
          <input
            class="code"
            maxlength="1"
            onkeyup="if (this.value.length == 1){digit4.focus()}else{digit2.focus()}"
            name="digit3"
            id="digit3"
            type="text"
            required
          />
          <input
            class="code"
            maxlength="1"
            onkeyup="if (this.value.length == 1){digit5.focus()}else{digit3.focus()}"
            name="digit4"
            id="digit4"
            type="text"
            required
          />
          <input
            class="code"
            maxlength="1"
            onkeyup="if (this.value.length == 1){digit6.focus()}else{digit4.focus()}"
            name="digit5"
            id="digit5"
            type="text"
            required
          />
          <input
            class="code"
            maxlength="1"
            onkeyup="if (this.value.length == 0) digit5.focus()"
            name="digit6"
            id="digit6"
            type="text"
            required
          />
          <input hidden type="submit" id="fourthform" />
        </form>
        <a href="#code-data" @click="$modal.show('sendCode')"
          >No me llega el código</a
        >
        <p class="warning">
          Al confirmar firmas Aelectrónicamente, de acuerdo con la ley, el
          convenio de relación comercial, contrato de cuenta y Formulario de
          Residencia Fiscal con Fintech Ecuador con plena validez y efectos
          jurídicos, sin necesidad de rectificación o solemnidad posterior.
        </p>
        <br />
        <br />
      </div>

      <div style="display: flex">
        <input
          v-show="this.imagenCedula != null && this.sendCodeStatus != true"
          class="form-submit create btnRegister"
          type="button"
          v-on:click="regresar(numbersteps)"
          value="Regresar"
        />
        <input
          v-show="this.imagenCedula != null && this.imagenSelfie != null"
          class="form-submit continue btnRegister"
          type="button"
          @click="updateData"
          value="Continuar"
        />
      </div>

      <modal
        name="modalmessage"
        :draggable="true"
        :scrollable="true"
        width="40%"
        height="auto"
        :resizable="true"
        :adaptive="true"
      >
        <center class="modal-alert">
          {{ modalmessage }}
          <input
            @click="$modal.hide('modalmessage')"
            class="form-submit alert"
            value="Continuar"
          />
        </center>
      </modal>
      <modal
        name="sendCode"
        :draggable="true"
        :scrollable="true"
        width="40%"
        height="auto"
        :resizable="true"
        :adaptive="true"
      >
        <center class="modal-sendcode">
          Código enviado a
          <input
            class="number"
            id="sendcode"
            name="sendcode"
            type="number"
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
            :value="this.tlf_user"
          />
          <p>Puede modificar su número de celular</p>
          <br />
          <input
            @click="sendCode"
            class="form-submit alert"
            value="Enviar Código de nuevo"
          />
        </center>
      </modal>
      <modal
        id="modalError"
        name="modalError"
        :draggable="true"
        :scrollable="true"
        width="40%"
        height="auto"
        :resizable="true"
        :adaptive="true"
      >
        <center class="modal-alert">
          {{ msgError }}
          <input
            @click="closeModal"
            class="form-submit alert"
            value="Entendido"
          />
        </center>
      </modal>
    </div>
    <div class="footer-create-account" id="footer">
      <p>{{ this.copyright }}</p>
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

<style scoped>
.icons-targets {
  width: 14%;
  position: absolute;
  margin: -6vw 0vw 1vw 38vw;
  background: #f7f7f7 0% 0% no-repeat padding-box;
  box-shadow: 6px 6px 6px #00000029;
  border-radius: 12px;
  opacity: 1;
}
.icons-targets div {
  display: flex;
  margin: 1vw;
  cursor: pointer;
}
.icons-targets div:hover {
  background: #e0dfdf;
}
.icons-targets img {
  width: 3vw;
}

.icons-targets p {
  margin: auto;
}
.slider {
  width: 100%;
  margin: auto;
  overflow: hidden;
}
.slider ul {
  display: flex;
  padding: 0;
  width: 400%;
  animation: cambio 20s infinite alternate linear;
}
.slider li {
  width: 100%;
  list-style: none;
}
.slider img {
  width: 100%;
}
@keyframes cambio {
  0% {
    margin-left: 0;
  }
  20% {
    margin-left: 0;
  }

  25% {
    margin-left: -100%;
  }
  45% {
    margin-left: -100%;
  }

  50% {
    margin-left: -200%;
  }
  70% {
    margin-left: -200%;
  }

  75% {
    margin-left: -300%;
  }
  100% {
    margin-left: -300%;
  }
}
.alert {
  width: 32%;
  text-align: center;
  margin-top: 1vw;
}

.modal-alert {
  color: var(--colorP);
  font-size: 1.5vw;
  padding: 3vw 1vw;
}
.modal-sendcode {
  color: var(--colorP);
  font-size: 1.5vw;
  padding: 3vw 1vw;
}
.modal-sendcode .number {
  font-size: 1.3vw;
  width: 27%;
}
.modal-sendcode p {
  font-size: 1.1vw;
}

.desactive circule {
  background: white;
}
.desactive > number,
ps,
pc {
  color: #b5b5b5;
}
.activate circule > number > pc {
  color: white;
}
.activate ps {
  color: black;
}

.vm--modal {
  overflow: auto !important  ;
}
.vistaprevia {
  width: 18vw;
  margin: auto;
}
.step {
  width: 65vw;
}
.step5 {
  width: 65vw;
}
.warning {
  font-size: 1vw;
}
.code {
  height: 6vw;
  width: 6vw;
  border-radius: 9px;
  margin: 3vw 1vw;
  border: solid;
  border-color: gray;
  font-size: 6vw;
  text-align: center;
}

.threeform label {
  display: flex;
  margin-left: 2vw;
  margin-bottom: 2vw;
  margin-top: 3vw;
  font-size: 1.2vw;
}
.threeform input {
  float: left;
  margin: auto 2vw;
  width: 3vw;
  height: 2vw;
}
.threeform p {
  cursor: pointer;
  font-weight: 200;
}
#map {
  width: 92%;
  height: 355px;
  margin: 3vw 3vw 3vw 1vw;
}
.container {
  background-image: linear-gradient(45deg, #ffffff, #ffffffad),
    url(../assets/images/fondo_2.png);
}
.create {
  width: 15%;
  margin: auto;
}
.continue {
  width: 15%;
  margin: auto;
}
.img-options {
  width: 10vw;
  margin: auto;
}
.steps-descriptions {
  margin: 3vw 0vw 3vw 2vw;
}
.form-data-personal {
  display: inline;
}
.param-data-personal {
  display: inline-grid;
  width: 40%;
  margin: 1vw 7vw 1vw 1vw;
}
.param-data-personal input,
select {
  width: 100%;
  margin: 1vw 0.2vw;
  height: 2.5vw;
  border-radius: 6px;
  border-color: #31353552;
  padding: 0px 0px 0px 14px;
  border-style: solid;
}
.param-data-personal select {
  width: 105% !important;
}
.param-data-personal input:focus {
  outline: 0;
  border-color: #1ab188;
}
.param-data-personal label {
  font-weight: bold;
}

@media screen and (max-width: 768px) {
  .icons-targets {
    width: 45%;
    margin: 2vw 1vw 3vw 20vw;
    border-radius: 6px;
    opacity: 1;
    position: inherit;
  }
  .icons-targets div {
    margin: 2vw;
  }
  .icons-targets img {
    width: 8vw;
  }

  .icons-targets p {
    margin: auto;
  }
  .vistaprevia {
    width: 36vw;
  }
  .btnRegister {
    width: 40%;
    height: 14vw;
    font-size: 5vw;
  }
  .modal-sendcode {
    font-size: 5.5vw;
  }
  .modal-sendcode input {
    font-size: 5.3vw;
    width: 97% !important;
    margin: 4vw 0vw;
  }
  .modal-sendcode .number {
    font-size: 5.3vw !important;
    width: 83% !important;
    margin: 4vw 0;
  }
  .modal-sendcode p {
    font-size: 4.1vw;
  }
  .step {
    width: 83vw;
  }
  .step5 {
    width: 85vw;
  }

  .param-data-personal {
    width: 100%;
  }
  .param-data-personal input,
  select {
    height: 45px;
    border-radius: 8px;
    margin-bottom: 4vw;
  }
  .content-steps {
    width: 100% !important;
  }
  circule {
    width: 8vw !important;
    height: 8vw !important;
    border-radius: 5vw !important;
  }
  pc {
    font-size: 4.5vw !important;
  }
  ps {
    font-size: 2.2vw !important;
  }
  .threeform label {
    font-size: 4vw;
  }
  .threeform input {
    margin: 2vw 4vw;
    width: 6vw;
    height: 6vw;
  }
  .threeform {
    margin: 13vw 0vw;
  }
  .code {
    height: 10vw;
    width: 10vw;
  }
  .warning {
    font-size: 2vw;
  }
  .img-options {
    width: 33vw;
  }
  .linestep {
    width: 87vw !important;
    margin: 4vw 0vw 1vw 6vw !important;
  }
  .card canvas {
    width: 59vw !important;
    height: 32vw !important;
    margin: auto !important;
    float: right !important;
  }
  .video-wrap video {
    display: flex;
    width: 63% !important;
    margin: auto;
  }
  .video-wrap {
    margin: auto auto !important;
  }
  .controllervideo {
    width: 100% !important;
  }
}

.video-wrap video {
  width: 100%;
  height: 100%;
}
.video-wrap {
  margin: auto 3.5vw;
}
.card canvas {
  width: 12vw;
  height: 9vw;
  display: flex;
  margin: 3vw auto auto auto;
  float: right;
}
.cardvideo {
  display: flex;
}
.controllervideo {
  display: flex;
  width: 100%;
}
.controllervideo button {
  margin: auto;
}
.linestep {
  height: 1px;
  background-color: #00000070;
  width: 49vw;
  margin: 1.2vw 0vw 1vw 6vw;
  position: absolute;
}

.container-registers {
  width: 84%;
  margin: auto;
  width: 84%;
  margin: auto;
  padding: 0vw 0vw 7vw 0px;
}
.title-steps {
  color: black;
  font-weight: bolder;
  font-size: 2.5vw;
  margin-bottom: 1vw;
}
number {
  margin: auto;
  color: white;
}
circule {
  background: var(--colorP);
  display: flex;
  width: 2.5vw;
  height: 2.5vw;
  border-radius: 3vw;
  margin: auto;
  border: solid;
  border-width: thin;
  border-color: #00000047;
  margin-bottom: 1vw;
  position: sticky;
}
pc {
  font-size: 1.5vw;
  font-weight: 700;
}
ps {
  font-size: 1.2vw;
  font-weight: 700;
}
.content-steps {
  margin: 5vw auto;
  width: 61%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5vw;
  display: flex;
}

.img-nav {
  width: 100%;
}
.cambios {
  color: red;
}
.icon-nav {
  width: 15vw !important;
  margin-left: 20vw;
}

#footer {
  border-top-color: none;
}
#footer p {
  color: black;
}
#footer i {
  color: black;
}
</style>


