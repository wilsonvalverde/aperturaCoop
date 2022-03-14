<template>
  <div class="container-thanks">
    <div class="video-wrap" style="display: flex">
      <video id="video" autoplay></video>
      <canvas id="canvas"></canvas>
    </div>
    <div class="controller">
      <button id="snap">Capture</button>
    </div>
    <div id="holi"></div>
  </div>
</template>

<script>
//import $ from 'jquery'
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted: function () {
    console.log(this.$session.exists());
    const video = document.getElementById("video");
    const snap = document.getElementById("snap");
    const canvas = document.getElementById("canvas");
    //const errorMsgElement = document.querySelector('span#errorMsg');

    const constraints = {
      audio: false,
      video: true,
    };

    // Acceso a la webcam
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        window.stream = mediaStream;
        video.srcObject = mediaStream;
      })
      .catch(function (err) {
        console.log(err);
      });
    /*
      async function init() {
        var mediaDevices = navigator.mediaDevices;
        try {
        const stream = await mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
        
        } catch (e) {

      //  errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
        console.log("error");
        console.log(e)

        }
      }
      // Correcto!
      function handleSuccess(stream) {
        window.stream = stream;
        video.srcObject = stream;
      }

      // Load init
      init();*/
    // Dibuja la imagen\

    /* var context = canvas.getContext('2d');
      snap.addEventListener("click", function() {
        this.numbersteps = 2;
        this.imagenSelfie = 'serfie';
        console.log("pasamos"+this.numbersteps );
        context.drawImage(video, 0, 0, 150, 150);
      });*/

    snap.addEventListener("click", function () {
      //Pausar reproducción
      video.pause();

      //Obtener contexto del canvas y dibujar sobre él
      let contexto = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
      console.log(
        "CARACTERISTICAS DE VIDEO----",
        video.videoWidth,
        video.height
      );
      let foto = canvas.toDataURL(); //Esta es la foto, en base 64

      let enlace = document.createElement("a"); // Crear un <a>
      enlace.download = "foto_parzibyte.me.png";
      enlace.href = foto;
      //  enlace.click();

      //Reanudar reproducción
      video.play();
      var img = canvas.toDataURL("image");
      var item_image = img.replace(/^data:image\/(png|jpg);base64,/, "");
      var src = "data:image/jpeg;base64,";
      src += item_image;
      var newImage = document.createElement("img");
      newImage.src = src;
      document.querySelector("#holi").innerHTML = newImage.outerHTML;
      console.log("componentes item camera ", item_image);
      alert("item_image" + item_image);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer {
  display: none;
}
#snap {
  color: red;
}
</style>
