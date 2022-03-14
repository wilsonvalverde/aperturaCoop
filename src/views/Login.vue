<script>
import $ from "jquery";
//import InvisibleRecaptcha from "vue-invisible-recaptcha";
//import Recaptcha from "recaptcha";
//6Lcisz0aAAAAAIxRO3lo9yqejOZRtyzk1jWVb1Xs
//import Recaptcha from "../components/Recaptcha";
//import VueRecaptcha from "vue-recaptcha";
import VueProgrammaticInvisibleGoogleRecaptcha from "vue-programmatic-invisible-google-recaptcha";
import { APIS } from "../constantes/apis";
export default {
  components: {
    VueProgrammaticInvisibleGoogleRecaptcha,
  },
  data: function () {
    return {
      estado: false,
      camera: false,
      valid: 5,
      name: "wilson",
      email_user: "",
      dni: "",
      fingercode: "",
      errorRegister: false,
      msgError: "",
      terminos: "",
    };
  },
  props: ["APIS", "header", "copyright"],
  beforeMount() {
    $("#dni").val("");
    $("#fingercode").val("");
  },
  mounted: function () {
    this.$color = "blue";
    $("#dni").val("");
    $("#fingercode").val("");
    $("#terminos").val("");
    $("#email_user").val("");
    this.$session.destroy();
    // Prefer camera resolution nearest to 1280x720.
    console.log("estado camera ", this.getCamera(), this.camera);
    // this.$session.set('globa', 25);
  },
  methods: {
    getCamera: function (action = false) {
      var globales = this;
      var constraints = {
        video: { width: { min: 2.048 }, height: { min: 1.082 } },
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          stream.oninactive = false;

          stream.getVideoTracks()[0].stop();
          //console.log("restricciones --", constraints);
          //console.log("todo correcto ---", stream);
          globales.camera = true;
          action && globales.submitRegister();
        })
        .catch(function (err) {
          globales.camera = false;
          console.log(err.name + ": " + err.message);
        });
    },
    validate: function (a, b) {
      var e = $("#" + a).val();
      var reg = /^\d+$/;
      if (b == 1) {
        if (!reg.test(e)) {
          $("#" + a).val("");
        }
      } else {
        if (reg.test(e)) {
          $("#" + a).val("");
        }
      }
    },
    validarcedula(a) {
      var cad = a;
      var total = 0;
      var longitud = cad.length;
      var longcheck = longitud - 1;
      for (var i = 0; i < longcheck; i++) {
        if (i % 2 === 0) {
          var aux = cad.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(cad.charAt(i));
        }
      }
      total = total % 10 ? 10 - (total % 10) : 0;
      if (cad.charAt(longitud - 1) == total) {
        return false;
      } else {
        this.msgError =
          "La cédula o/y código dactilar no se pueden usar para acceder a la cuenta. Vuelva a intentarlo.";
        return true;
      }
    },

    openWindow() {
      window.open("http://www.iiit.kit.edu/publ/aidima2006.pdf", "_blank");
    },
    recaptchaCallback(recaptchaToken) {
      console.log(recaptchaToken);
    },
    submitButtonClicked() {
      // Do whatever you want here (probably some validation). After
      // that's done (or passed your expectations) you can then invoke the reCAPTCHA.
      this.$refs.invisibleRecaptcha1.execute();
    },
    submitLogin: function (event) {
      event.preventDefault();
      const formData = new FormData(this.$refs["data-login"]);
      const data = {}; // need to convert it before using not with XMLHttpRequest
      for (let [key, val] of formData.entries()) {
        Object.assign(data, { [key]: val });
      }
      this.$session.start();
      this.$router.push("/banca");
    },
    submitRegister: function () {
      console.log("llegamos a funcion");
      var variables = this;
      const formData = new FormData(this.$refs["data-register"]); // reference to form element
      const data = {}; // need to convert it before using not with XMLHttpRequest
      for (let [key, val] of formData.entries()) {
        Object.assign(data, { [key]: val });
      }
      if (this.dni != "") {
        this.errorRegister = this.validarcedula(this.dni);
      } else {
        this.msgError =
          "La cédula o/y código dactilar no se pueden usar para acceder a la cuenta. Vuelva a intentarlo.";
        this.errorRegister = true;
      }
      if (!this.errorRegister) {
        if (this.fingercode == "") {
          this.errorRegister = true;
          this.msgError =
            "La cédula o/y código dactilar no se pueden usar para acceder a la cuenta. Vuelva a intentarlo.";
        }
      }
      if (!this.errorRegister) {
        if (this.email_user == "") {
          this.errorRegister = true;
          this.msgError = "Ingrese un correo electrónico válido";
        } else {
          var emailRegex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; /* eslint-disable-line */
          if (!emailRegex.test(this.email_user)) {
            /* eslint-disable-line */
            this.errorRegister = true;
            this.msgError = "Ingrese un correo electrónico válido";
          }
        }
      }
      if (!this.errorRegister) {
        if (this.terminos != true) {
          this.errorRegister = true;
          this.msgError = "Acepte los Términos y condiciones";
        }
      }

      if (!this.errorRegister) {
        const body = {
          dni: this.dni,
          fingercode: this.fingercode,
          id_entity: this.header.idEntity,
          email_user: this.email_user,
        };
        const headers = {
          lat: this.header.latitud,
          long: this.header.longitud,
          Authorization: "Bearer " + this.header.token,
        };

        this.$http
          .post(APIS[3].name, body, { headers })
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              if (response.data.status) {
                this.$session.start();
                this.$session.set("dni", this.dni);
                this.$session.set("email", this.email_user);
                this.$session.set("number", 1);
                this.$session.set("name", response.data.data.nombre);
                this.$router.push("/registro");
              } else {
                variables.msgError = response.data.error_message;
                this.$modal.show("Error");
              }
            } else {
              this.msgError = "Fallo en la conexión con el servidor";
              this.$modal.show("Error");
            }
          })
          .catch((error) => {
            if (error) {
              this.msgError = "Error en el servicio";
              this.$modal.show("Error");
            }
          });
      } else {
        this.$modal.show("Error");
      }
    },

    cambio() {
      this.estado = false;
      //document.documentElement.style.setproperty('--colorP',this.$variableGlobal );
      //estado = 3;
    },
  },
};
</script>
<template>
  <div class="container-login-register">
    <div v-show="this.estado == false" class="container-register">
      <div class="register">
        <div class="content-title-register">
          <p>¿Deseas abrir una cuenta ?</p>
        </div>
        <form
          ref="data-register"
          id="demo-form"
          @submit.prevent="getCamera((action = true))"
          class="form-register"
        >
          <label class="form-label-register" for="#dni"
            >Número de Cédula:</label
          >
          <!--
          <input
            v-model="dni"
            type="text"
            maxlength="10"
            onpaste="return false"
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
            class="form-input-register"
            name="dni"
            id="dni"
          />-->
          <input
            v-model="dni"
            type="text"
            maxlength="10"
            class="form-input-register"
            name="dni"
            id="dni"
          />

          <!--  <h3 v-show="this.errorRegister != null" class="error">Cédula Inválida</h3> -->

          <label class="form-label-register" for="#password"
            >Código dactilar
            <a href="#" @click="$modal.show('Dactilar')">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i></a
          ></label>
          <input
            v-model="fingercode"
            maxlength="10"
            style="text-transform: uppercase"
            onpaste="return false"
            class="form-input-register"
            type="text"
            name="fingercode"
            id="fingercode"
          />

          <label class="form-label-register" for="#email_user">Email </label>
          <input
            v-model="email_user"
            type="text"
            name="email_user"
            id="email_user"
            onpaste="return false"
            class="form-input-register"
          />

          <i class="fas fa-fingercode"></i>

          <input
            v-model="terminos"
            style="float: left"
            type="checkbox"
            id="terminos"
            name="terminos"
          />
          <label class="terminos-register" for="terminos"
            >Acepto los
            <a href="#" @click="openWindow()">Términos y condiciones</a></label
          >
          <input
            class="form-submit-register"
            @click="camera == false && getCamera()"
            :type="camera == false ? 'button' : 'submit'"
            :value="
              camera == false
                ? 'Active la cámara para continuar'
                : 'Abrir cuenta'
            "
          />

          <vue-programmatic-invisible-google-recaptcha
            ref="invisibleRecaptcha1"
            :sitekey="'6Lcisz0aAAAAAIxRO3lo9yqejOZRtyzk1jWVb1Xs'"
            :elementId="'invisibleRecaptcha1'"
            :badgePosition="'rigth'"
            :showBadgeMobile="true"
            :showBadgeDesktop="true"
            @recaptcha-callback="recaptchaCallback"
            >hola</vue-programmatic-invisible-google-recaptcha
          >
        </form>

        <div class="footer-register">
          <p>
            Este sitio está protegido por reCAPTCHA bajo la
            <a @click="openWindow()" href="#">política de privacidad </a> de
            Google y sus
            <a href="#" @click="openWindow()">términos de servicio.</a>
          </p>
        </div>
      </div>
      <modal
        name="Error"
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
            @click="$modal.hide('Error')"
            class="form-submit alert"
            value="Continuar"
          />
        </center>
      </modal>
      <modal
        name="Dactilar"
        :draggable="true"
        :scrollable="true"
        width="40%"
        height="auto"
        :resizable="true"
        :adaptive="true"
      >
        <center class="modal-dactilar">
          <p class="title">Como encontrar tu código dactilar</p>
          <br />
          <p>
            Se encuentra en el reverso de tu cédula en la parte superior derecha
          </p>
          <br />
          <img src="../assets/images/dactilar.png" />
          <input
            @click="$modal.hide('Dactilar')"
            class="form-submit alert"
            value="Entendido"
          />
        </center>
      </modal>
    </div>

    <!--<div v-show="!this.$session.exists()" id="footer"> -->
    <div v-show="true" id="footer">
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
.alert {
  width: 32%;
  text-align: center;
  margin-top: 1vw;
}
.modal-dactilar {
  padding: 2vw 1vw;
}

.modal-dactilar .title {
  color: var(--colorP);
}
.modal-alert {
  color: rgb(74, 157, 36);
  font-size: 1.5vw;
  padding: 3vw 1vw;
}

.modal {
  width: 2vw !important;
}
.vm--modal {
  width: 1vw !important;
}
.error {
  color: red;
  margin: red;
}

.container-login-register {
  background-image: url(../assets/images/fondo_1.jpg);
  background-size: cover;
}
</style>
