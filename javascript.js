String.prototype.replaceAt = function(index, character) {
  return this.substr(0, index) + character + this.substr(index + character.length);
};

const palabras = ['refrigerador', 'archipielago', 'indecente', 'prostibulo', 'almacenamiento', 'altruista', 'generador', 'patrimonio'];
const palabra = palabras[Math.floor(Math.random() * palabras.length)];
let palabraConGuiones = palabra.replace(/./gi, "_ ");
let contadorFallos = 0;
document.querySelector('#output').innerHTML = palabraConGuiones;

const enviarLetra = () => {
  const letra = document.querySelector('#letra').value.toLowerCase();
  if (letra.length !== 1 || !letra.match(/^[a-z]$/i)) {
    alert("Ingresa una Letra Genio.....???");
    return;
  }

  let haFallado = true;

  for (const i in palabra) {
    if (letra == palabra[i]) {
      palabraConGuiones = palabraConGuiones.replaceAt(i * 2, letra);
      haFallado = false;
    }
  }

  if (haFallado) {
    contadorFallos++;
    if (contadorFallos === 1)
      alert("Te quedan 3 intentos");
    else if (contadorFallos === 2)
      alert("Te quedan 2 intentos");
    else if (contadorFallos === 3)
      alert("Te quedan 1 intento");
    else if (contadorFallos === 4) {
      alert("Perdiste");
      document.querySelector('#letra').removeEventListener('keypress', enviarLetraEnter);
    }
  } else {
    if (palabraConGuiones.indexOf('_') < 0) {
      alert("Ganaste");
      document.querySelector('#letra').removeEventListener('keypress', enviarLetraEnter);
    }
  }

  document.querySelector('#output').innerHTML = palabraConGuiones;
  document.querySelector('#letra').value = '';
  document.querySelector('#letra').focus();
};

const enviarLetraEnter = (event) => {
  if (event.key === 'Enter') {
    enviarLetra();
  }
};

document.querySelector('#calcular').addEventListener('click', enviarLetra);
document.querySelector('#letra').addEventListener('input', function(event) {
  if (this.value.length > 1) {
    this.value = this.value.slice(0, 1);
  }
});
document.querySelector('#letra').addEventListener('keypress', enviarLetraEnter);

document.querySelector('#letra').style.textAlign = 'center';

