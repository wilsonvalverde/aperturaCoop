/*
    APIS[0] = Api para obtener todas 
    APIS[1] = Api para obtener datos 

*/
export const APIS = [
    { 
        name: "https://www.fintech.kradac.com:3006/dynamicform",
        metodo: "POST",
        descripcion: "Api para obtener campos de form dependiente de la entidad financiera"
    },
    { 
        name: "https://www.fintech.kradac.com:3006/entity", 
        metodo: "POST",
        descripcion: "Api para obtener caracteristicas de la Entidad Financiera"
    },
    {

        name: "https://www.fintech.kradac.com:3006/terms/only_entity",
        metodo: "POST",
        descripcion: "Api para obtener Terminos y condiciones"
    },
    {
        name: "https://www.fintech.kradac.com:3006/civil_registry/validate",
        metodo: "POST",
        descripcion: "Api para obtener datos del registro civil"
    },
    {
        name: "https://www.fintech.kradac.com:3006/recognition/comparate",
        metodo: "POST",
        descripcion: "Api para obtener comparacion de la cedula y selfie"
    },
    {
        name: "https://www.fintech.kradac.com:3006/sendregister",
        metodo: "POST",
        descripcion: "Api para guardar el registro del usuario"
    },
    {
        name: "https://www.fintech.kradac.com:3006/code/send",
        metodo: "POST",
        descripcion: "Api para enviar codigo de confirmación"
    },
    {
        name: "https://www.fintech.kradac.com:3006/code/check",
        metodo: "POST",
        descripcion: "Api para verificar codigo de confirmación ingresado por el usuario"
    },
    {
        name: "https://www.fintech.kradac.com:3006/monitoreo/find_total_caller_apis",
        metodo: "POST",
        descripcion: "Monitoreo - Busca en que paso se quedaron más usuarios"
    },
    {
        name: "https://www.fintech.kradac.com:3006/monitoreo/users_not_finished",
        metodo: "POST",
        descripcion: "Monitoreo - Busca la lista de usuarios que no completaron el proceso y en que paso se quedaron"
    }




]