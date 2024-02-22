//VARIABLES

let gastos = []
let sueldo = []
let gastosParciales = []

const muestraDatos = document.getElementById("muestraDatos")
const muestraGastoTotal = document.getElementById("muestraGastoTotal")
const campoSueldo = document.getElementById("sueldo")
const inputText = document.getElementById("inputsText")
const buttonIngresarSueldo = document.getElementById("buttonIngresarSueldo")
const buttonAgregarGasto = document.getElementById("buttonAgregarGasto")
const campoGasto = document.getElementById('gasto')
const campoValorGasto = document.getElementById("valorGasto")
const filtroAll = document.getElementById("todos")
const mediosPago = document.getElementById("mediosPago")
const filtroEfectivo = document.getElementById("efectivo")
const filtroDebito = document.getElementById("debito")
const filtroTransferencia = document.getElementById("transferencia")
const filtroCredito = document.getElementById("credito")
const filtroBilleteraVirtual = document.getElementById("mp")
const eliminarGastos = document.getElementById("buttonEliminarGastos")
const eliminarSueldo = document.getElementById("buttonEliminarSueldo")
const modificarElSueldo = document.getElementById("buttonModificarSueldo")


//FUNCIONES

//CHEQUAMOS QUE LOS GASTOS y SUELDO ESTEN VACIO SINO MOSTRAMOS LO QUE TENGA GUARDADO EN STORAGE
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('gastos') || gastos.length !== 0){ // HAY DATA GUARDADA
        gastos = JSON.parse(localStorage.getItem('gastos'))
        document.getElementById("contenedorFiltros").classList.add('contenedorFiltroON')
        muestraGastoParcial()
        campoSueldo.disabled = false

    } else { //NO HAY DATA GUARDADA
        document.getElementById("contenedorFiltros").classList.replace('contenedorFiltroON','contenedorFiltro')
    }
})

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('sueldo') || sueldo.length !== 0){
        sueldo = JSON.parse(localStorage.getItem('sueldo'))
        mostrarCamposYBotones()
    } else {
        campoSueldo.disabled = false
        eliminarSueldo.disabled = true
        buttonIngresarSueldo.disabled = false
    }
})

//VACIAR SUELDO EN STORAGE
const checkSueldo = () =>{
    if(sueldo.length === 0){
        eliminarSueldo.disabled = true
    } else {
        eliminarSueldo.disabled = false
        campoSueldo.disabled = false
    }
}

const vaciarSueldo = () =>{
    localStorage.clear()
    sueldo = []

    muestraGastoTotal.classList.add("inputsTexto")
    Toastify({
        text: "Sueldo Eliminado",
        duration: 1500,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: false,
        gravity: "top",
        position: "center",
        stopOnFocus: true, 
        style: {
        background: "linear-gradient(to right, #00b049, #00b049)",
    },
        onClick: function(){}
    }).showToast();
    eliminarSueldo.disabled = true
    buttonIngresarSueldo.disabled = false
    campoSueldo.value = ""
    campoSueldo.disabled = false
    ocultarCamposYBotones()
}


//VACIAR GASTOS EN STORAGE
const vaciarGastos = () =>{
    localStorage.removeItem("gastos")
    gastos = []
    gastosParciales = []
    document.getElementById("contenedorFiltros").classList.replace('contenedorFiltroON', 'contenedorFiltro')
    muestraGastoTotal.classList.add("inputsTexto")
    document.getElementById("table").classList.replace('table-container',"inputsTexto")
    muestraGastoParcial()
    Toastify({
        text: "Gastos Eliminados",
        duration: 1500,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: false,
        gravity: "top",
        position: "center",
        stopOnFocus: true, 
        style: {
        background: "linear-gradient(to right, #00b049, #00b049)",
    },
        onClick: function(){}
    }).showToast();
}

//GUARDAR VARIABLE SUELDO
const sueldoTotal = () =>{
    const sueldoIngresado = Number(document.getElementById("sueldo").value)
    if(sueldoIngresado == 0 || ""){
        Toastify({
            text: "Ingresar sueldo valido",
            duration: 1500,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: false,
            gravity: "top",
            position: "center",
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(to right, #b00000, #b00000)",
        },
            onClick: function(){}
        }).showToast();
    } else {
        Toastify({
            text: "Sueldo guardado",
            duration: 1500,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: false,
            gravity: "top",
            position: "center",
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(to right, #00b049, #00b049)",
        },
            onClick: function(){}
        }).showToast();
        sueldo.push(sueldoIngresado)
        localStorage.setItem('sueldo', JSON.stringify(sueldo))
        modificarElSueldo.disabled = false
        mostrarCamposYBotones()
        checkSueldo()
    }
}

//MODIFICAR SUELDO
const modificarSueldo = () =>{
    let sueldoModificado = parseInt(prompt("Ingrese sueldo nuevo"))
    if(isNaN(sueldoModificado)){
        alert("Debe ingresar un sueldo valido")
    } else {
        alert("Sueldo Modificado")
        sueldo.splice(0,1, sueldoModificado)
        localStorage.setItem('sueldo', JSON.stringify(sueldo))
    }
}



//CREA OBJETO GASTO Y GUARDA GASTO EN ARRAY
const crearGasto = () => {
    
        let nombre = document.getElementById('gasto').value;
        let valor = document.getElementById('valorGasto').value;
        let medioPago = document.getElementById("mediosPago").value

        const gasto = {
            nombre,
            valor: parseInt(valor),
            id: Math.random(),
            pago: medioPago
        }
    
        if(nombre == "" || valor == ""){
            Toastify({
                text: "Debe Completar ambos campos",
                duration: 1500,
                newWindow: true,
                close: false,
                gravity: "top",
                position: "center",
                stopOnFocus: true, 
                style: {
                background: "linear-gradient(to right, #b00000, #b00000)",
            },
                onClick: function(){}
            }).showToast();
        } else if (medioPago == "default") {
            Toastify({
                text: "Debe seleccionar metodo de pago",
                duration: 1500,
                newWindow: true,
                close: false,
                gravity: "top",
                position: "center",
                stopOnFocus: true, 
                style: {
                background: "linear-gradient(to right, #b00000, #b00000)",
            },
                onClick: function(){}
            }).showToast();
        } else {
            gastos.push(gasto)
            campoGasto.value = ""
            campoValorGasto.value = ""
            document.getElementById("contenedorFiltros").classList.add('contenedorFiltroON')
            muestraGastoParcial()
            validarDineroDisponible()
            eliminarGastos.disabled = false
            document.getElementById("table").classList.replace("inputsTexto",'table-container')
            muestraGastoTotal.classList.replace("inputsTexto","gastosFinalStyle" )
        }
    }


//VALIDAR DISPONIBLE TRAS INGRESAR GASTO

const validarDineroDisponible = () =>{
    const restoDisponibleValue = sumaGastosParciales()
    if (sueldo[0] < restoDisponibleValue){
        Toastify({
                text: "El Gasto supera el monto disponible",
                duration: 1500,
                newWindow: true,
                close: false,
                gravity: "top",
                position: "center",
                stopOnFocus: true, 
                style: {
                background: "linear-gradient(to right, #b00000, #b00000)",
            },
                onClick: function(){}
            }).showToast();
    }
}

// MOSTRAR GASTOS EN HTML
const muestraGastoParcial = () =>{
    muestraDatos.innerHTML = ""
    const table = document.createElement("table");
    table.classList.add("gastosTable");
    //HEADER
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Nombre</th><th>Valor</th><th>Pago</th>";
    table.appendChild(headerRow);
    gastos.forEach(gasto => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${gasto.nombre}</td>
            <td>$${gasto.valor}</td>
            <td>${gasto.pago}</td>
            <td><button class="inputButton" onclick="eliminarGasto(${gasto.id})">Eliminar</button></td>
        `
        table.appendChild(row)
    })
    muestraDatos.appendChild(table)
    localStorage.setItem('gastos', JSON.stringify(gastos))
    document.getElementById("table").classList.replace('tableOf','table-container')
}


// RENDER PRODUCTOS FILTRADOS
const renderGastosFiltrados = (gasto) =>{
    muestraDatos.innerHTML = ""
    const table = document.createElement("table");
    table.classList.add("gastosTable");
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Nombre</th><th>Valor</th><th>Pago</th>";
    table.appendChild(headerRow);
    gasto.forEach(gasto => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${gasto.nombre}</td>
                <td>$${gasto.valor}</td>
                <td>${gasto.pago}</td>
                <td><button class="inputButton" onclick="eliminarGasto(${gasto.id})">Eliminar</button></td>
            `
            table.appendChild(row);
    })
    muestraDatos.appendChild(table);
}

//SUMA DE GASTOS INGRESADOS

const sumaGastosParciales = () => {
    const gastosParciales = []
    const suma = gastos.reduce((total, gasto) => {
        const valor = gasto.valor;
        gastosParciales.push(valor);
        return total + valor; 
    }, 0);

    const restoDisponible = sueldo[0] - suma;

    if(gastosParciales.length === 0){
        muestraGastoTotal.innerHTML = ""
        const div = document.createElement("div")
        div.classList.add("resutaldosStyle")
        div.innerHTML = `
        <h3 class="gastosFinalStyle">Su gasto total es de $0</h3>
        <h3 class="gastosFinalStyle">El resto disponible es de $${sueldo[0]}`
        muestraGastoTotal.append(div)
    } else if(restoDisponible < 0){
        Toastify({
            text: "Excede monto disponible",
            duration: 1500,
            newWindow: true,
            close: false,
            gravity: "top",
            position: "center",
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(to right, #b00000, #b00000)",
        },
            onClick: function(){}
        }).showToast();
        muestraGastoTotal.innerHTML = ""
        const div = document.createElement("div")
        div.classList.add("resutaldosStyle")
        div.innerHTML = `
        <h3 class="gastosFinalStyle">Su gasto total es de $${suma}</h3>
        <h3 class="gastosFinalStyle">El resto disponible es de $${restoDisponible}`
        muestraGastoTotal.append(div)
        return restoDisponible;
    } else {
        muestraGastoParcial()
        muestraGastoTotal.innerHTML = ""
        const div = document.createElement("div")
        div.classList.add("resutaldosStyle")
        div.innerHTML = `
        <h3 class="gastosFinalStyle">Su gasto total es de $${suma}</h3>
        <h3 class="gastosFinalStyle">El resto disponible es de $${restoDisponible}`
        muestraGastoTotal.append(div)
        return suma;
    }
}


//ELIMINAR GASTO

const eliminarGasto = (gastoDelete) =>{
    const gastoBorrado = gastos.find((gasto) => gasto.id === gastoDelete)
    const indice = gastos.indexOf(gastoBorrado)
    gastos.splice(indice, 1)
    muestraGastoParcial()
    sumaGastosParciales()
    if(gastos.length === 0 ){
        muestraGastoTotal.innerHTML = ""
        localStorage.removeItem("gastos")
        document.getElementById("contenedorFiltros").classList.replace('contenedorFiltroON', 'contenedorFiltro')
        document.getElementById("table").classList.replace('table-container', 'tableOf')
    }
}


//FILTRAR GASTOS POR TIPO DE MEDIO DE PAGO
const filtroPagoEfectivo = () =>{
    const efectivo = gastos.filter((gasto) => gasto.pago === "Efectivo" )
    renderGastosFiltrados(efectivo)
}
const filtroPagoCredito = () =>{
    const credito = gastos.filter((gasto) => gasto.pago === "Tarjeta de Credito" )
    renderGastosFiltrados(credito)
}
const filtroPagoBilleteraVirtual = () =>{
    const mp = gastos.filter((gasto) => gasto.pago === "Billeta Virtual" )
    renderGastosFiltrados(mp)
}
const filtroPagoDebito = () =>{
    const debito = gastos.filter((gasto) => gasto.pago === "Tarjeta de Debito" )
    renderGastosFiltrados(debito)
}
const filtroPagoTransferencia = () =>{
    const transferencia = gastos.filter((gasto) => gasto.pago === "Transferencia Bancaria" )
    renderGastosFiltrados(transferencia)
}
const pagoDefault = () =>{
    Toastify({
        text: "Debe seleccionar metodo de pago",
        duration: 1500,
        newWindow: true,
        close: false,
        gravity: "top",
        position: "center",
        stopOnFocus: true, 
        style: {
        background: "linear-gradient(to right, #b00000, #b00000)",
    },
        onClick: function(){}
    }).showToast();
}

//MOSTAR CAMPOS Y BOTONES EN HTML
const mostrarCamposYBotones = () =>{
        campoSueldo.disabled = true
        buttonIngresarSueldo.disabled = true
        buttonAgregarGasto.disabled = false
        campoGasto.disabled = false
        campoValorGasto.disabled = false
        mediosPago.disabled = false
        campoGasto.classList.replace('inputsTexto', 'inputContent')
        campoValorGasto.classList.replace('inputsTexto', 'inputContent')
        buttonAgregarGasto.classList.replace('inputsTexto', 'inputButton')
        mediosPago.classList.replace('inputsTexto', 'medioDePago')
        eliminarGastos.classList.replace('inputsTexto', 'inputButton')
}


const ocultarCamposYBotones = () =>{
    campoGasto.classList.replace('inputContent','inputsTexto' )
    campoValorGasto.classList.replace('inputContent','inputsTexto' )
    buttonAgregarGasto.classList.replace('inputButton','inputsTexto' )
    mediosPago.classList.replace('medioDePago','inputsTexto' )
    eliminarGastos.classList.replace('inputButton','inputsTexto' )
    document.getElementById("contenedorFiltros").classList.replace('contenedorFiltroON', 'contenedorFiltro')
    document.getElementById("table").classList.replace('table-container', 'tableOf')
}

//EVITAR NUMBERS EN INPUT TEXT
function Solo_Texto(e) {
    var code;
    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    var character = String.fromCharCode(code);
    var AllowRegex  = /^[a-zA-Z\s-]+$/;
    if (AllowRegex.test(character)) return true;     
    return false; 
}

//INGRESAR SOLO NUMEROS
function Solo_Numeros(e) {
    const code = e.keyCode || e.which;
    const character = String.fromCharCode(code);
    const AllowRegex  = /^[0-9]+$/;
    
    if (AllowRegex.test(character)) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}


//SELECTORES
buttonIngresarSueldo.addEventListener("click", sueldoTotal)
buttonAgregarGasto.addEventListener("click", crearGasto)
filtroAll.addEventListener('input', muestraGastoParcial)
filtroEfectivo.addEventListener('input', filtroPagoEfectivo)
filtroDebito.addEventListener('input', filtroPagoDebito)
filtroTransferencia.addEventListener('input', filtroPagoTransferencia)
filtroCredito.addEventListener('input', filtroPagoCredito)
filtroBilleteraVirtual.addEventListener('input', filtroPagoBilleteraVirtual)
eliminarGastos.addEventListener("click", vaciarGastos)
eliminarSueldo.addEventListener("click", vaciarSueldo)
modificarElSueldo.addEventListener('click', modificarSueldo)












