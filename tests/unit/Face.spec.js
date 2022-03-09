import { shallowMount } from '@vue/test-utils'
//import HelloWorld from '@/components/HelloWorld.vue'
import Face from '@/components/Face.vue'


//TEST SUIT
describe('Face.vue', () => {
    it('Cargar libreria FaceApi con el html de Face.vue', () => {
        const wrapper = shallowMount(Face);
        expect(wrapper.html().replace(/[^\x20-\x7E]/gmi, "")).toBe('<div class="container-thanks">  <div class="cardvideo"><button id="ver">Volver a tomar la Foto</button>    <div class="video-wrap"><video id="video" width="200" height="200" muted="muted" autoplay="autoplay"></video></div> <canvas id="photoBio"></canvas>  </div>  <div class="controllervideo"><button hidden="hidden" id="ver">Volver a tomar la Foto</button>    <p id="msjSonrisa">Sonrisa no detectada</p> <br> <button hidden="hidden" id="btnCaptureHidden">Capture</button> <canvas id="canvas" width="640" height="480" style="display: none;"></canvas> <button id="capturarr">Capturar Selfie</button>    <div id="imagen"></div>  </div></div>')
    })
})