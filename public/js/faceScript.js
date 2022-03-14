
var promisifiedOldGUM = function (constraints, successCallback, errorCallback) {

    // First get ahold of getUserMedia, if present
    var getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia);

    // Some browsers just don't implement it - return a rejected promise with an error
    // to keep a consistent interface
    if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
    return new Promise(function (successCallback, errorCallback) {
        getUserMedia.call(navigator, constraints, successCallback, errorCallback);
    });

}

// Older browsers might not implement mediaDevices at all, so we set an empty object first
if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
}

// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
} else {
    console.log('navegador actualizado-----')
}



$("#ver").click(function () {
    iniciaVideo();
    $("#msjSonrisa").html('Sonrisa no detectada');
    let risa = 1;


    const video = document.getElementById('video');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    const canvass = document.getElementById('photoBio');

    //Carga los modelos del directorio models e inicia el video cuando estén cargados.
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('js/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('js/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('js/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('js/models')
    ]).then(
        console.log('promesa en ejecucion face api------')
    );

    //Inicia el streaming desde la webcam.
    function iniciaVideo() {
        /*
        navigator.getUserMedia({
                video: {}
            },
            stream => video.srcObject = stream,
            err => console.error(err)
        );
        */
        navigator.getUserMedia = (
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia
        );

        if (typeof navigator.mediaDevices.getUserMedia === 'undefined') {

            navigator.getUserMedia({
                video: { facingMode: 'user' }
            }, stream => video.srcObject = stream,
                err => console.error(err));

        } else {
            navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' }
            }).then(stream => video.srcObject = stream).catch(err => console.error(err));
        }

    }

    //Una vez iniciado el video se inicia la detección.
    video.addEventListener('play', () => {

        //Se crea el canvas a partir del video y se agrega al DOM.
        //const canvas = faceapi.createCanvasFromMedia(video);
        //document.body.append(canvas);
        //$("#canvas2").append(canvas);

        //Dimensiones del video.
        const dimensiones = {
            width: video.width,
            height: video.height
        };

        var context = canvass.getContext('2d');
        btnCaptureHidden.addEventListener("click", function () {
            setTimeout(function () {
                $("#msjSonrisa").html('Foto tomada');
                console.log('atributos video,', dimensiones.width, dimensiones.height)
                context.drawImage(video, 0, 0, dimensiones.width, dimensiones.height);
                $("#capturar").click();
                clearInterval(smileDetection);
            }, 3000);
        });


        faceapi.matchDimensions(canvass, dimensiones);

        //Dibuja cada 100ms
        const smileDetection = setInterval(async () => {
            console.log('Funcionando')
            //Detecta rostros.
            //withFaceLandmarks para detectar los puntos sobre el rostro (ojos, naríz, boca, cejas y contorno). A partir de los puntos se usa withFaceExpressions para detectar expresiones.
            const rostros = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

            //Área donde se detecta el rostro.
            const area = faceapi.resizeResults(rostros, dimensiones);

            //Se obtiene el contexto (canvas 2d) y se limpia el canvas para volver a dibujar.
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

            //Indica los rostros detectados.
            faceapi.draw.drawDetections(canvas, area);

            //Dibuja los puntos sobre el rostro (ojos, naríz, boca, cejas y contorno).
            faceapi.draw.drawFaceLandmarks(canvas, area);

            //Indica las expresiones detectadas.
            faceapi.draw.drawFaceExpressions(canvas, area);
            if (risa == 1) {
                rostros.forEach(rostro => {
                    //console.log(rostro.expressions.happy);
                    if (rostro.expressions.happy > 0.9) {
                        risa = 0;
                        //LISTA EL MENSAJE EN LA VISTA
                        $("#msjSonrisa2").html('Listo!');
                        $("#msjSonrisa").html('Deje de sonreir y espere..');
                        //SE ESPERA N SEGUNDOS PARA CAPTURAR LA IMG
                        $("#btnCaptureHidden").click();
                        faceapi.stop();
                    }

                });
            }
        }, 500);


    });
});