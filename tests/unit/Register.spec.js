import { shallowMount } from '@vue/test-utils'
import Register from '@/views/Register.vue'
//import Thanks from '@/components/Thanks.vue'

test('Mostrar Register View', () => {
    //tener una instancia del componente, para poderla modificarla o probarla
    //instancia o lugar donde se monta el componente(wrapper)
    const wrapper = shallowMount(Register);
    console.log(wrapper.html().replace(/[^\x20-\x7E]/gmi, ""));
    //expect(wrapper.html().replace(/[^\x20-\x7E]/gmi, "")).toBe("")
})