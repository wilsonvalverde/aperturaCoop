import { shallowMount } from '@vue/test-utils'
//import HelloWorld from '@/components/HelloWorld.vue'
import Thanks from '@/components/Thanks.vue'


//TEST SUIT
describe('Thanks.vue', () => {
  it('Mostrar html de Thanks view', () => {
    const wrapper = shallowMount(Thanks);
    expect(wrapper.html().replace(/[^\x20-\x7E]/gmi, "")).toBe('<div class="container-thanks">  <div class="contain">    <p class="title">Bienvenido a</p>    <p class="subtitle">FINTECH ECUADOR</p> <br>    <p class="account-create">Cuenta creada con xito</p>    <p class="review">Revisa tu correo electrnico</p> <input type="button" value="Ir a la Pagina Principal" class="form-submit create">  </div>  <div id="footer">    <p>Fintech Ecuador 2020. Todos los Derechos reservados.</p> <a target="_blank"><i aria-hidden="true" class="fa fa-facebook-official"></i></a> <a target="_blank"><i aria-hidden="true" class="fa fa-twitter-square"></i></a> <a target="_blank"><i aria-hidden="true" class="fa fa-instagram"></i></a> <a target="_blank"><i aria-hidden="true" class="fa fa-youtube-play"></i></a>  </div></div>')
  })
  it('Mostrar mensaje de Thanks view', () => {
    const msg = 'Bienvenido a FINTECH ECUADOR  Cuenta creada con éxito Revisa tu correo electrónico  Fintech Ecuador 2020. Todos los Derechos reservados.'
    const wrapper = shallowMount(Thanks, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
