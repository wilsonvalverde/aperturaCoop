<template>
  <div class="container-thanks">
    <!-- 
    <div >
        <button id="ver">Volver a tomar la Foto</button>
        <video id="video" width="720" height="560" autoplay muted></video>
        <h1 id="msjSonrisa" >Sonrisa no detectada</h1> <br>
        <button hidden  id="btnCaptureHidden">Capture</button>
        <canvas id="canvas2"  width="640" height="480"></canvas> 
        <canvas id="canvas" hidden  width="640" height="480"></canvas> 
        <button @click="stop"  id="stop">Stop</button>
    </div>
    -->

    <div class="cardvideo">
              <button id="ver">Volver a tomar la Foto</button>
              <div class="video-wrap">
                <video id="video" width="200" height="200" muted autoplay></video>
              </div>
                <canvas id="photoBio"  ></canvas>
              
            </div>

            <div class="controllervideo">
             
              <button hidden id="ver">Volver a tomar la Foto</button>
              
              <p id="msjSonrisa" >Sonrisa no detectada</p> <br>
              <button hidden  id="btnCaptureHidden">Capture</button>
              <canvas id="canvas" style=" display: none;" width="640" height="480"></canvas> 
  
              <button @click="data" id="capturarr">Capturar Selfie</button>
              <div id="imagen"></div>

            </div>
  </div>
</template>

<script>
//import $ from 'jquery' 
//import faceapi from '.././'
import $ from 'jquery'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
      stop() {
          const video = document.getElementById('video');
             video.srcObject.getTracks()[0].stop(); 
          
      },
      data(){
        var canvas = document.getElementById("photoBio");
        // convert it to a usable data URL
        const dataURL = canvas.toDataURL();

        var img = document.createElement("img");
        img.src = dataURL;
        $("#imagen").html(img);
        var strImage = dataURL.replace(/^data:image\/[a-z]+;base64,/, "");
        console.log(strImage);
        console.log(dataURL);
      }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
