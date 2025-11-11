import * as Js1 from "./gestionPresupuesto.js";


function mostrarDatoEnId(id, valor){
    document.getElementById(id).innerHTML = valor;
}
function mostrarGastoWeb(idElemento, gasto) {
   const contenedor = document.getElementById(idElemento);

   if(Array.isArray(gasto)) {
       gasto.forEach(g => mostrarGastoWeb(idElemento, g));
       return;
 }

   const divGasto = document.createElement("div");
   divGasto.className = "gasto";

   const divDescripcion = document.createElement("div");
   divDescripcion.className = "gasto-descripcion";
   divDescripcion.textContent = `${gasto.descripcion}`;
   console.log(gasto.descripcion)

   const divFecha = document.createElement("div");
   divFecha.className = "gasto-fecha";
   divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();

   const divValor = document.createElement("div");
   divValor.className = "gasto-valor";
   divValor.textContent = `${gasto.valor} €`;

   const divEtiquetas = document.createElement("div");
   divEtiquetas.className = "gasto-etiquetas";

   const etiquetas = Array.isArray(gasto.etiquetas) ? gasto.etiquetas : [];
   for (let i = 0; i < etiquetas.length; i++) {
       const span = document.createElement("span");
       span.className = "gasto-etiquetas-etiqueta";
       span.textContent = `${gasto.etiquetas[i]}`;
       divEtiquetas.appendChild(span);
   }

   divGasto.append(divDescripcion, divFecha, divValor, divEtiquetas);

   contenedor.appendChild(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const contenedor = document.getElementById(idElemento);
    if (!contenedor || !agrup) return;
  
    const divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";
  
    const h1Periodo = document.createElement("h1");
    h1Periodo.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.appendChild(h1Periodo);
  
    for (const clave of Object.keys(agrup)) {
      const valor = agrup[clave];
  
      const divAgrupacionDato = document.createElement("div");
      divAgrupacionDato.className = "agrupacion-dato";
  
      const spanClave = document.createElement("span");
      spanClave.className = "agrupacion-dato-clave";
      spanClave.textContent = clave;
  
      const spanValor = document.createElement("span");
      spanValor.className = "agrupacion-dato-valor";
      spanValor.textContent = valor;
  
      divAgrupacionDato.appendChild(spanClave);
      divAgrupacionDato.appendChild(spanValor);
      divAgrupacion.appendChild(divAgrupacionDato);
    }
  
    contenedor.appendChild(divAgrupacion);
  }
  
  function repintar(){
    mostrarDatoEnId("presupuesto",Js1.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales",Js1.calcularTotalGastos());
    mostrarDatoEnId("balance-total",Js1.calcularBalance());
    document.getElementById("listado-gastos-completo").innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo",Js1.listarGastos());    
  }

  function actualizarPresupuestoWeb(){
    let presupuesto = +prompt("Introduce un presupuesto");
    Js1.actualizarPresupuesto(presupuesto);
    repintar();
    let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
    botonActualizarPresupuesto.addEventListener('click',Js1.mostrarPresupuesto());

  }

export {
   mostrarDatoEnId,
   mostrarGastoWeb,
   mostrarGastosAgrupadosWeb,
   repintar,
   actualizarPresupuestoWeb
}