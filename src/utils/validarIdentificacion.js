export default function validarIdentificacion(numero = '', soloCedula = false) {
    numero = String(numero).trim();
    if (!/^\d+$/.test(numero)) return false;
    if (/^(\d)\1+$/.test(numero)) return false; // evita números repetidos
    const provincia = parseInt(numero.substring(0, 2), 10);
    if ((provincia < 1 || provincia > 24) && provincia !== 30) return false;
    if (soloCedula) {
        return numero.length === 10;
    }
    if (numero.length === 10) {
        return true;
    }
    if (numero.length === 13) {
        const establecimiento = numero.substring(10, 13);
        return establecimiento === '001';
    }
    return false;
}