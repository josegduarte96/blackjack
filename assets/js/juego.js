
const miModulo = (() =>{
    'use strict'
    let deck = [];
    let tipos = ['C', 'D', 'H', 'S',];
    let especiales = ['A','J','K','Q'];
    let puntosJugador = 0, puntosComputadora = 0;

    //Referencias HTML
    let btnIniciar           = document.querySelector('#btnIniciar');
    let btnPedir             = document.querySelector('#btnPedir');
    let btnDetener           = document.querySelector('#btnDetener')
    let smallJugador         = document.querySelector('#puntosJugador')
    let smallComputadora     = document.querySelector('#puntosComputadora')
    let divCartasJugador     = document.querySelector('#jugador-cartas')
    let divCartasComputadora = document.querySelector('#computadora-cartas')
    let btnReglas            = document.querySelector('h4')
    let ul                   = btnReglas.firstElementChild
    //Esta funcion sirve para iniciar el juego.
    const inicializarJuego   = () => {
        deck = crearDeck();
        smallJugador.innerText = 0, smallComputadora.innerText = 0;
        puntosJugador = 0, puntosComputadora = 0;
        divCartasComputadora.innerText = "";
        divCartasJugador.innerText = "";
    }
    //Crear el deck y barajar el mazo.
    const crearDeck = () => {
        deck = []
        for(let i = 2; i <= 10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo)
            }
        }
        for(let esp of especiales){
            for(let tipo of tipos){
                deck.push(esp + tipo)
            }
        }
        return _.shuffle(deck)
    }

    //Funcion que pide las cartas 

    const pedirCarta = () =>{    
        if (deck.length === 0){
            throw "No hay mas cartas para pedir" 
        }
        return deck.pop()
    }

    //Funcion regresa valor de las cartas

    const valorCarta = ( carta ) =>{
        let valor = carta.substring(0, carta.length -1);

        return ( isNaN(valor) ) ?
            (valor === "A")  ? 11 : 10
            : valor * 1;
    }

    //funcion para crear la carta en el DOM y asignar el puntaje a cada jugador
    const pintarCarta = (turno) => {
        let carta = pedirCarta();

        if (turno === "jugador") { 
        puntosJugador = puntosJugador + valorCarta(carta)
        smallJugador.innerText = puntosJugador
        }else{
        puntosComputadora = puntosComputadora + valorCarta(carta);
        smallComputadora.innerText = puntosComputadora;
        }   

        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta');
        imgCarta.src = ` ./assets/cartas/${carta}.png `;
        (turno === "jugador") ? divCartasJugador.append(imgCarta) : divCartasComputadora.append(imgCarta)
    }

    const determinarGanador = () => {
        setTimeout(() => {
            if((puntosJugador > 21) ){
                alert("Gana la computadora")
            }else if( puntosJugador === puntosComputadora){
                alert("Nadie gana :(")
            }else if(puntosComputadora > 21){
                alert("Ganaste!!!")
            }else{
                alert("Gana la computadora")
            }
        }, 600);
    }
    // FUNCION TURNO PARA LA COMPUTADORA

    const turnoComputadora = (puntosMinimos) => {

        do{
        pintarCarta("computadora");
        if(puntosComputadora > puntosMinimos) break;
        }while( (puntosComputadora <= puntosMinimos) && (puntosMinimos <= 21) );
        determinarGanador();
    }

    //Eventos
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    
    btnReglas.addEventListener('click', (e) => {
        ul.classList.add('visible')
    })

    btnPedir.addEventListener('click', () => {   
        //Agregar la carta al DOM cuando el jugador haga click en el boton pedir
        pintarCarta("jugador")
        //detener el juego cuando llegue a 21 puntos y darle el turno a la computadora
        if ( puntosJugador > 21){
            btnPedir.disabled = true
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador)
        }else if( puntosJugador === 21){
            btnPedir.disabled = true
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador)
        }

    })

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador)        
    })

    btnIniciar.addEventListener('click', () => {
        inicializarJuego();
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        ul.classList.remove('visible')
        
    })

    return {
        nuevoJuego: inicializarJuego
    }
})();
