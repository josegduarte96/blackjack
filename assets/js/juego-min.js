const miModulo=(()=>{"use strict";let e=[],t=["C","D","H","S"],a=["A","J","K","Q"],r=0,d=0,n=document.querySelector("#btnIniciar"),o=document.querySelector("#btnPedir"),s=document.querySelector("#btnDetener"),l=document.querySelector("#puntosJugador"),i=document.querySelector("#puntosComputadora"),c=document.querySelector("#jugador-cartas"),u=document.querySelector("#computadora-cartas"),m=document.querySelector("h4"),p=m.firstElementChild;const b=()=>{e=f(),l.innerText=0,i.innerText=0,r=0,d=0,u.innerText="",c.innerText=""},f=()=>{e=[];for(let a=2;a<=10;a++)for(let r of t)e.push(a+r);for(let r of a)for(let a of t)e.push(r+a);return _.shuffle(e)},g=e=>{let t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t},h=t=>{let a=(()=>{if(0===e.length)throw"No hay mas cartas para pedir";return e.pop()})();"jugador"===t?(r+=g(a),l.innerText=r):(d+=g(a),i.innerText=d);const n=document.createElement("img");n.classList.add("carta"),n.src=` /assets/cartas/${a}.png `,"jugador"===t?c.append(n):u.append(n)},y=e=>{do{if(h("computadora"),d>e)break}while(d<=e&&e<=21);setTimeout(()=>{r>21?alert("Gana la computadora"):r===d?alert("Nadie gana :("):d>21?alert("Ganaste!!!"):alert("Gana la computadora")},600)};return o.disabled=!0,s.disabled=!0,m.addEventListener("click",e=>{p.classList.add("visible")}),o.addEventListener("click",()=>{h("jugador"),r>21?(o.disabled=!0,s.disabled=!0,y(r)):21===r&&(o.disabled=!0,s.disabled=!0,y(r))}),s.addEventListener("click",()=>{o.disabled=!0,s.disabled=!0,y(r)}),n.addEventListener("click",()=>{b(),o.disabled=!1,s.disabled=!1,p.classList.remove("visible")}),{nuevoJuego:b}})();