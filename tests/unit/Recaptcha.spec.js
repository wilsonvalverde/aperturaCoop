import { shallowMount } from '@vue/test-utils'
//import HelloWorld from '@/components/HelloWorld.vue'
import Recaptcha from '@/components/Recaptcha.vue'


//TEST SUIT
describe('Recaptcha.vue', () => {
    it('Cargar recapcha V3 con un sitekey', () => {
        const wrapper = shallowMount(Recaptcha);
        expect(wrapper.html().replace(/[^\x20-\x7E]/gmi, "")).toContain('<div id="g-recaptcha" data-sitekey="6Lcisz0aAAAAAIxRO3lo9yqejOZRtyzk1jWVb1Xs" class="g-recaptcha"></div>')

    })
})