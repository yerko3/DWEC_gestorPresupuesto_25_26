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
   const buttonEdicion = document.createElement("button");
   buttonEdicion.type = "button";
   buttonEdicion.className = "gasto-editar";
   buttonEdicion.textContent = "Editar Gasto";
   let objEditar = new EditarHandle();
   objEditar.gasto = gasto;
   buttonEdicion.addEventListener("click", objEditar);
   contenedor.append(divGasto,buttonEdicion);
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
  }

  function nuevoGastoWeb(){
    let descripcion = prompt("Introdice la descripción");
    let valor = +prompt("Introduce el valor");
    let fecha = prompt("Introduce la fecha en formato (yyyy-mm-dd)");
    let etiquetas = prompt("Introduce las etiquetas y sepralas por comas");
    let ArrayEtiquetas = etiquetas.split(',');

    let gasto = new Js1.CrearGasto(descripcion,valor,fecha,...ArrayEtiquetas);
    Js1.anyadirGasto(gasto);
    repintar();
  }

  function EditarHandle(){
    this.handleEvent = function(evento){
      //this.gasto 
      let descripcion = prompt("Introduce la descripcion");
      let valor = +prompt("Introduce el valor");
      let fecha = prompt("Introduce la fecha en formato (yyyy-mm-dd)");
      let etiquetas = prompt("Introduce las etiquetas y sepralas por comas");
      let ArrayEtiquetas = etiquetas.split(',');

      this.gasto.actualizarValor(valor);
      this.gasto.actualizarDescripcion(descripcion);
      this.gasto.actualizarFecha(fecha);
      this.gasto.anyadirEtiquetas(ArrayEtiquetas);

      repintar();
      }
  }

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);

let botonAyadirGasto = document.getElementById("anyadirgasto");
botonAyadirGasto.addEventListener('click',nuevoGastoWeb);

export {
   mostrarDatoEnId,
   mostrarGastoWeb,
   mostrarGastosAgrupadosWeb,
   repintar,
   actualizarPresupuestoWeb,
   nuevoGastoWeb,
   EditarHandle
}