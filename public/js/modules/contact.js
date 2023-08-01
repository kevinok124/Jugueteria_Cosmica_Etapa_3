
console.warn('🆗: Módulo PageContact cargado.');

class PageContact {

    static async init () {
        console.log('PageContact.init()');
        console.log('-');
        console.log('--');
        console.log('---');
    }
}

const enviar = document.getElementById('enviar');
const nombre = document.getElementById('name');
const email = document.getElementById('email');
const comment = document.getElementById('comment');


nombre.addEventListener('input', validarFormulario);
email.addEventListener('input', validarFormulario);
comment.addEventListener('input', validarFormulario);

function validarFormulario() {
    if (nombre.value.trim() !== '' && email.value.trim() !== '' && comment.value.trim() !== '') {
        enviar.disabled = false;
    } else {
        enviar.disabled = true;
    }
} 

export default PageContact;
