import { shallowMount } from '@vue/test-utils'
import Login from '@/views/Login.vue'
//import Thanks from '@/components/Thanks.vue'
//TESTSUIT
describe('Login.vue', () => {
    //testUnit
    it('Mostrar html Login View', () => {
        //tener una instancia del componente, para poderla modificarla o probarla
        //instancia o lugar donde se monta el componente(wrapper)
        const wrapper = shallowMount(Login);
        const string = wrapper.html().replace(/[^\x20-\x7E]/gmi, "")
        const template = "<div class=\"container-login-register\">  <div class=\"container-register\">    <div class=\"register\">      <div class=\"content-title-register\">        <p>Deseas abrir una cuenta ?</p>      </div>      <form id=\"demo-form\" class=\"form-register\"><label for=\"#dni\" class=\"form-label-register\">Nmero de Cdula:</label> <input type=\"text\" maxlength=\"10\" name=\"dni\" id=\"dni\" class=\"form-input-register\"> <label for=\"#password\" class=\"form-label-register\">Cdigo dactilar          <a href=\"#\"><i aria-hidden=\"true\" class=\"fa fa-exclamation-circle\"></i></a></label> <input maxlength=\"10\" onpaste=\"return false\" type=\"text\" name=\"fingercode\" id=\"fingercode\" class=\"form-input-register\" style=\"text-transform: uppercase;\"> <label for=\"#email_user\" class=\"form-label-register\">Email </label> <input type=\"text\" name=\"email_user\" id=\"email_user\" onpaste=\"return false\" class=\"form-input-register\"> <i class=\"fas fa-fingercode\"></i> <input type=\"checkbox\" id=\"terminos\" name=\"terminos\" style=\"float: left;\"> <label for=\"terminos\" class=\"terminos-register\">Acepto los          <a href=\"#\">Trminos y condiciones</a></label> <input type=\"submit\" value=\"Abrir cuenta\" class=\"form-submit-register\"></form>      <div class=\"footer-register\">        <p>          Este sitio est protegido por reCAPTCHA bajo la          <a href=\"#\">poltica de privacidad </a> de          Google y sus          <a href=\"#\">trminos de servicio.</a></p>      </div>    </div>    <modal name=\"Error\" draggable=\"true\" scrollable=\"true\" width=\"40%\" height=\"auto\" resizable=\"true\" adaptive=\"true\">      <center class=\"modal-alert\">        <input value=\"Continuar\" class=\"form-submit alert\"></center>    </modal>    <modal name=\"Dactilar\" draggable=\"true\" scrollable=\"true\" width=\"40%\" height=\"auto\" resizable=\"true\" adaptive=\"true\">      <center class=\"modal-dactilar\">        <p class=\"title\">Como encontrar tu cdigo dactilar</p> <br>        <p>          Se encuentra en el reverso de tu cdula en la parte superior derecha        </p> <br> <img src=\"../assets/images/dactilar.png\"> <input value=\"Entendido\" class=\"form-submit alert\">      </center>    </modal>  </div>  <div id=\"footer\">    <p></p> <a target=\"_blank\"><i aria-hidden=\"true\" class=\"fa fa-facebook-official\"></i></a> <a target=\"_blank\"><i aria-hidden=\"true\" class=\"fa fa-twitter-square\"></i></a> <a target=\"_blank\"><i aria-hidden=\"true\" class=\"fa fa-instagram\"></i></a> <a target=\"_blank\"><i aria-hidden=\"true\" class=\"fa fa-youtube-play\"></i></a>  </div></div>";
        expect(string).toBe(template)
    })
    it('Mostrar Textos Login View', () => {
        const wrapper = shallowMount(Login);
        const strings = wrapper.text().replace(/[^\x20-\x7E]/gmi, "");
        expect(strings).toBe("Deseas abrir una cuenta ? Nmero de Cdula:  Cdigo dactilar            Email     Acepto los          Trminos y condiciones            Este sitio est protegido por reCAPTCHA bajo la          poltica de privacidad  de          Google y sus          trminos de servicio.                  Como encontrar tu cdigo dactilar            Se encuentra en el reverso de tu cdula en la parte superior derecha")

    })
})


