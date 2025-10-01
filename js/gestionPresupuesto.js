// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(value) {
    if(value > 0){
        presupuesto = value;
        return value;
    }
        return -1;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}
//
function CrearGasto(descripcion,valor,fecha, ...etiquetas){
    this.descripcion = descripcion;
    this.valor = (valor > 0) ? valor : 0;
    this.etiquetas = (etiquetas.length === 0) ? [] : etiquetas;
    this.fecha = isValidDate(fecha)? Date.parse(fecha) : new Date();


    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`
    }
    
    this.mostrarGastoCompleto = function(){
        let str =`Gasto correspondiente a ${descripcion} con valor ${valor} €.`+"\n"; 
        str += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        str += `Etiquetas:`+"\n";
        for(let i = 0; i < etiquetas.length; i++){
            str += "- "+etiquetas[i]+"\n";
        }
        return str;
    }
    this.actualizarFecha = function(fecha){
        if(isValidDate(fecha))
            this.fecha = Date.parse(fecha);
    }
    this.anyadirEtiquetas = function(...etiquetas) {
        this.etiquetas.push(...etiquetas);
        this.etiquetas = [...new Set(this.etiquetas)];
    }
    this.borrarEtiquetas = function(...etiquetas){
        for(let i = this.etiquetas.length; i >= 0; i--){
            for(let j = 0; j < etiquetas.length; j++){
                if(this.etiquetas[i] === etiquetas[j])
                {
                    this.etiquetas.splice(i,1);
                }
            }
        }
    }
    this.actualizarDescripcion = function(value){
        this.descripcion = value;
    }
    this.actualizarValor = function(value){
        this.valor = (value > 0) ? value : this.valor;
    }
}   

function isValidDate(dateStr){
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
}


function listarGastos(){
    return gastos;
}

function borrarGasto(id){

    for(let i = gastos.length - 1; i >= 0; i--){
        if(gastos[i].id === id)
        {
            gastos.splice(i, 1);
            break;
        }
    }
}
function calcularTotalGastos(){
    let count = 0;
    for(let i = 0; i < gastos.length; i++){
        count += gastos[i].valor;
    }
    return count;
}
function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
