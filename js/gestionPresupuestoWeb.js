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

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    const contenedor = document.getElementById(idElemento);

    const divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";

    const h1Periodo = document.createElement("h1");
    h1Periodo.textContent = `Gastos agrupados por ${periodo}`;

    



}

export {
   mostrarDatoEnId,
   mostrarGastoWeb,
   mostrarGastosAgrupadosWeb
}