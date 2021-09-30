// Funcionamiento del juego del ahorcado

    //======================================================================
    // VARIABLES
    //======================================================================

    const listaPalabras = ["albañil", "mensajero", "abrochar", "paro", "plaqueta", "descubrir", "disparar", "carpa", "tigre", "significado",
    "macarrones", "paisaje ", "muelle", "juez", "perseguir", "hermosa", "oro", "realidad", "utilidad", "escandinavo",
    "activista", "biblioteca", "diminuto", "lavabo", "hilos", "pedal", "cerrado", "urgencia", "momia", "agujeros",
    "trepar", "alhajas", "tartamudear", "dichoso", "congreso", "blusa", "separar", "avergonzar", "ganado", "espuma",
    "libro", "servilleta", "camello", "mediano", "maleta", "metal", "nafta", "ruidoso", "microbio", "escuchar",
    "traducir", "aguacero", "carruaje", "verruga", "herradura", "novio", "este", "medialuna", "duelo", "retoque",
    "envolver", "fotocopiadora", "ecologista", "extractor", "modelar", "impresora", "africano", "departamento", "integral", "azotea",
    "navaja", "perderse", "músculo", "amigo", "confucio", "meses", "entrar", "viajar", "aviones", "ingenuo",
    "fideos", "amortiguar", "acuario", "eclipse", "estirar", "zapatillas", "juguetes", "lava", "metal", "colina",
    "curva", "hechizar", "holanda", "grapadora", "placas", "muebles", "manija", "consonantes", "arpa", "conquistar"];
    let palabraAdivinar = [];
    let palabraMostrar = [];
    let historialLetrasUsuario = [];
    let numIntentos = 6;
    let nodoLetra = document.getElementById('letra');
    let nodoBoton = document.getElementById('boton');
    let nodoResultado = document.getElementById('resultado');
    let nodoHistorial = document.getElementById('historial');
    let palabra = document.getElementById('palabra');

    //======================================================================
    // FUNCIONES
    //======================================================================


    /**
     * Método que prepara el juego para iniciarse
     */
    function prepararJuego () {
        //// 1 Selecciono una palabra aleatoria de listaPalabra
        //// 1.1 Obtengo la posicion aleatoria
        let posAleatoriaListaPalabras = Math.floor(Math.random() * 100);
        //// 1.2 Obtengo la palabra aleatoria
        let palabraAleatoria = listaPalabras[posAleatoriaListaPalabras];
        //// 1.3 Separo la palabra en letras y lo guardo
        palabraAdivinar = palabraAleatoria.split('');
        //// 2 Preparo el array que va a ver el usuario. Tendrá el mismo número de guiones que letras en palabraAdivinar
        for (let letra of palabraAdivinar) {
            palabraMostrar.push('_');
        }
        //// 3 Dibuja todo lo necesario
        dibujarJuego();
        //alert(palabraAleatoria);
    }

    /**
     * Método que redibuja lo que ve el usuario con los cambios
     */
    function dibujarJuego () {
        // Convertimos un array en un texto, separado por espacios, y lo mostramos en el div resultado
        nodoResultado.textContent = palabraMostrar.join(' ');
        // Mostramos el historial de letras
        nodoHistorial.textContent = historialLetrasUsuario.join(', ');
        // Mostramos los intentos con los gráficos
        switch (numIntentos) {
          case 5:
            head.style.display = "block";
            break;
          case 4:
            body.style.display = "block";
            break;
          case 3:
            rightArm.style.display = "block";
            break;
          case 2:
            leftArm.style.display = "block";
            break;
          case 1:
            rightLeg.style.display = "block";
            break;
          case 0:
            leftLeg.style.display = "block";
            lostPopUp.style.display = "block";
            palabra.textContent = palabraAdivinar.join('');
            break;
        }
    }

    /**
     * Método que comprueba la letra que ha introducido el usuario
     */
    function comprobarLetraUsuario () {
        //// 1 Sustituye los guiones por la letra acertada
        // Guardo la letra del input que ha escrito el usuario en una variable
        let letraUsuario = nodoLetra.value;
        // Vaciamos el input para que el usuario pueda volver a escribir
        nodoLetra.value = '';
        // Le devolvemos el foco al input para que pueda introducir otra letra
        nodoLetra.focus();
        // Recorremos todas las letras para saber si alguna esta bien
        for (const [posicion, letraAdivinar] of palabraAdivinar.entries()) {
            // Comprobamos si la letra del usuario es igual a la letra a adivinar
            if (letraUsuario == letraAdivinar) {
                // Sustituimos el guion por la letra acertada
                palabraMostrar[posicion] = letraAdivinar;
            }
        }
        //// 2 Comprobamos si se ha equivocado
        // ¿No esta la letra?
        if (!palabraAdivinar.includes(letraUsuario)) {
            // Restamos un intento
            numIntentos -= 1;
            // Guardamos en el historial la letra pulsada por el usuario
            historialLetrasUsuario.push(letraUsuario);
        }
        //// 3 Comprobamos si hay que terminar el juego
        acabarJuego();
        //// 4 Mostramos los cambios
        dibujarJuego();
    }

    /**
     * Método que comprueba si se ha pulsado la tecla Enter
     */
    function comprobarPulsadoEnter (evento) {
        if (evento.code == 'Enter') {
            comprobarLetraUsuario();
        }
    }

    /**
     * Método que verifica si se ha acabado el juego
     */
    function acabarJuego () {
        // Ha ganado: ¿Le queda guiones al jugador?
        if (!palabraMostrar.includes('_')) {
            //alert('Has ganado!!!');
            // Refrescamos la página para volver a jugar
            wonPopUp.style.display = "block";
        }
        // Ha perdido: ¿Tiene 0 intentos?
        if (numIntentos == 0) {
            //alert('Has Perdido!!! Era: ' + palabraAdivinar.join(''));
            // Refrescamos la página para volver a jugar
            lostPopUp.style.display = "block";
        }
    }

    //======================================================================
    // EVENTOS
    //======================================================================
    // Al hacer clic en el boton se llama la funcion comprobarLetraUsuario
    nodoBoton.addEventListener('click', comprobarLetraUsuario);
    // Al hacer Enter con el teclado se llama a la funcion comprobarLetraUsuario
    nodoLetra.addEventListener('keyup', comprobarPulsadoEnter);

    //======================================================================
    // INICIO
    //======================================================================
    prepararJuego();
