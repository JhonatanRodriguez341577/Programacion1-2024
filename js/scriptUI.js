miSistema = new Sistema();

precargarUsuarios();
precargarProductos();
precargarOfertaEstado();
precargarEstadoCompra();
precargarCompras();
precargarAprobadoCancelado();
misEventos();
activarMenus();
mostrarLogin();

function misEventos(){// eventos de interaccion fuera del menu
    document.querySelector("#btnLogin").addEventListener("click",login);
    document.querySelector("#btnRegistrarse").addEventListener("click",registrarse);
    document.querySelector("#btnCrearProducto").addEventListener("click",agregarProducto);
    document.querySelector("#selEstadoCompra").addEventListener("change", mostrarTablaFiltrada);
    document.querySelector("#selEstadoCompraAdmin").addEventListener("change", mostrarTablaFiltradaAdmin);  
}

function activarMenus(){ // eventos de las listas del menu
    document.querySelector("#liMostrarLogin").addEventListener("click", mostrarLogin);
    document.querySelector("#liMostrarRegistrarse").addEventListener("click", mostrarRegistrarse);
    document.querySelector("#liComprarProductos").addEventListener("click", mostrarComprarProducto);
    document.querySelector("#liListadeComprasComprador").addEventListener("click", mostrarListadeComprasComprador);
    document.querySelector("#liListadeComprasAdmin").addEventListener("click", mostrarListadeComprasAdmin);
    document.querySelector("#liOfertas").addEventListener("click", mostrarOfertas);
    document.querySelector("#liCrearProducto").addEventListener("click", mostrarCrearProducto);
    document.querySelector("#liAdministrarProducto").addEventListener("click", mostrarModificarProducto);
    document.querySelector("#liGanancias").addEventListener("click",mostrarGanancias);
    document.querySelector("#liCerrarAdmin").addEventListener("click",cerrarSecion);
    document.querySelector("#liCerrarComprador").addEventListener("click",cerrarSecion);
}

/// seccion de display
function ocultarTodo(){ // oculto todo para ver solo lo q me interesa
    document.querySelector("#seccionLogin").style.display = "none";
    document.querySelector("#seccionRegistrarse").style.display = "none";
    document.querySelector("#head-inicio").style.display = "none";
    document.querySelector("#head-comprador").style.display = "none";
    document.querySelector("#head-administrador").style.display = "none";
    document.querySelector("#seccionComprarProductos").style.display = "none";
    document.querySelector("#seccionListadeComprasComprador").style.display = "none";
    document.querySelector("#seccionOfertas").style.display = "none";
    document.querySelector("#seccionCrearProducto").style.display = "none";
    document.querySelector("#seccionAdministrarProductos").style.display = "none";
    document.querySelector("#seccionInformedeGanancia").style.display = "none";
    document.querySelector("#seccionListadeComprasAdmin").style.display = "none";
}

//muestro o oculto interfazes
function mostrarInterfazComprador(){
    document.querySelector("#head-inicio").style.display = "none";
    document.querySelector("#head-comprador").style.display = "block";
    document.querySelector("#head-administrador").style.display = "none";
}
function mostrarInterfazInicio(){
    document.querySelector("#head-inicio").style.display = "block";
    document.querySelector("#head-comprador").style.display = "none";
    document.querySelector("#head-administrador").style.display = "none";
    
}function mostrarInterfazAdministrador(){
    document.querySelector("#head-inicio").style.display = "none";
    document.querySelector("#head-comprador").style.display = "none";
    document.querySelector("#head-administrador").style.display = "block";
}

// muestro una opcion del listado de interfaz
function mostrarLogin(){
    ocultarTodo();
    mostrarInterfazInicio();
    document.querySelector("#seccionLogin").style.display = "block";
    document.querySelector("#mensajeLogin").innerHTML = "";
    limpiarLogin();
}

function mostrarRegistrarse(){
    ocultarTodo();
    mostrarInterfazInicio();
    document.querySelector("#seccionRegistrarse").style.display = "block";
    limpiarRegistrarse();
}


function mostrarOfertas(){
    ocultarTodo();
    mostrarInterfazComprador();
    let tabla = miSistema.mostrarTablaOfertas();
    document.querySelector("#ofertas").innerHTML=tabla;
    document.querySelector("#seccionOfertas").style.display = "block";
    cargarEventosAlBotonOferta();
}

function mostrarCrearProducto(){
    ocultarTodo();
    mostrarInterfazAdministrador();
    document.querySelector("#seccionCrearProducto").style.display = "block";
    limpiarProducto();
}

function mostrarGanancias(){
    ocultarTodo();
    mostrarInterfazAdministrador();
    document.querySelector("#seccionInformedeGanancia").style.display = "block";
    let mostrarInforme = miSistema.mostrarInformedeGanancia();
    document.querySelector("#informedeGanancia").innerHTML=mostrarInforme;
}

function mostrarComprarProducto(){//compra2// luego de cargar la tabla donde voy a comprar, cargo los eventos del boton
    ocultarTodo();
    mostrarInterfazComprador();
    document.querySelector("#seccionComprarProductos").style.display = "block";
    let tabla = miSistema.mostrarTablaProductos();
    document.querySelector("#seccionComprarProductos").innerHTML=tabla;
    cargarEventosAlBoton();
}

function mostrarListadeComprasComprador(){//desplegable 1 // tras el eventro click para mostrar, cargo las opciones en el desplegable
    ocultarTodo();
    mostrarInterfazComprador();
    document.querySelector("#seccionListadeComprasComprador").style.display = "block";
    document.querySelector("#selEstadoCompra").innerHTML = miSistema.obtenerOpcionesSelEstado();
    mostrarTablaFiltrada();
}

function mostrarModificarProducto(){
    ocultarTodo();
    mostrarInterfazAdministrador();
    document.querySelector("#seccionAdministrarProductos").style.display = "block";
    let tabla = miSistema.mostrarTablaModificarProductos();
    document.querySelector("#administrarProductos").innerHTML= tabla;
    cargarEventosBotonOferta();
    cargarEventosBotonEstado();
    cargarEventosBotonStock();
}

function mostrarListadeComprasAdmin(){
    ocultarTodo();
    mostrarInterfazAdministrador();
    document.querySelector("#seccionListadeComprasAdmin").style.display = "block"; 
    document.querySelector("#selEstadoCompraAdmin").innerHTML = miSistema.obtenerOpcionesSelEstado(); 
    mostrarTablaFiltradaAdmin();
}

function mostrarTablaFiltrada() {//desplegable 3 // tomo el valor del desplegable ya cargado
    let estado = document.querySelector("#selEstadoCompra").value;
    let tabla = miSistema.mostrarCompras(estado);// desplegable 4 // cargo la tabla que filtra por estado
    document.querySelector("#productosCompradosComprador").innerHTML = tabla;
    let mensaje = miSistema.mostrarTotaldeComprasySaldo();
    document.querySelector("#mensajeComprasySaldo").innerHTML = mensaje;
    cargarEventosAlBotonCancelar();
}

function mostrarTablaFiltradaAdmin() {
    let estadoadmin = document.querySelector("#selEstadoCompraAdmin").value;
    let mensaje = miSistema.mostrarCompras(estadoadmin);
    document.querySelector("#productosCompradosAdmin").innerHTML = mensaje;
    cargarEventosAlBotonAprobar(); 
}

function cargarEventosAlBoton(){//compra3// guardo los botones en una variable , y la recorro con un for of dandole el evento click a cada boton
    let losBotones = document.querySelectorAll(".botones"); //trae todas las filas que tiene esa clase
    for (let botonX of losBotones) {        
        //a cada fila le digo que al darle click ejecute procesarFilaElegida
        botonX.addEventListener("click", procesarBoton);
    }
}

function cargarEventosAlBotonCancelar(){
    let losBotonesCnc = document.querySelectorAll(".botonesCancelarCompra");
    for (let botonX of losBotonesCnc) {        
        botonX.addEventListener("click", procesarBotonCancelarCompra);
        }
    console.log("se cargaron los eventos del boton")
}

function cargarEventosAlBotonAprobar(){
    let losBotonesAcp = document.querySelectorAll(".botonesAceptarCompra");
    for (let botonX of losBotonesAcp) {        
        botonX.addEventListener("click", procesarBotonAceptarCompra);
        }
    console.log("se cargaron los eventos del boton")
}

function cargarEventosBotonOferta(){
    let losBotonesOf = document.querySelectorAll(".botonesOferta"); 
    for (let botonX of losBotonesOf) {        
        botonX.addEventListener("click", procesarBotonOferta);
    }
}

function cargarEventosBotonStock(){
    let losBotonesCS = document.querySelectorAll(".botonesStock"); 
    for (let botonX of losBotonesCS) {        
        botonX.addEventListener("click", procesarBotonStock);
    }
}

function cargarEventosAlBotonOferta(){
    let losBotonesOf = document.querySelectorAll(".botonesOferta");
    for (let botonX of losBotonesOf) {        
        botonX.addEventListener("click", procesarBotonCompraOferta);
    }
}

function cargarEventosBotonEstado(){
    let losBotonesEst = document.querySelectorAll(".botonesEstado");
    for (let botonX of losBotonesEst) {        
        botonX.addEventListener("click", procesarBotonEstado);
    }
}

function procesarBoton() {  //compra4// ya cargado el evento click traigo el id del producto que voy a comprar con el
    // atributo de la tabla y aqui elijo que es lo que quiero hacer, en este caso agregar una compra
    let atributoPersonalizado = this.getAttribute("idproductoX");
    let mensajeCompra ="";
    let idPProducto = atributoPersonalizado;
    let cantidad = document.querySelector(`#txtCantCompra${idPProducto}`).value;
    if(miSistema.esNumero(cantidad)){
        let prodCnt = Number(cantidad);
        miSistema.agregarCompra(idPProducto , prodCnt);
        mensajeCompra = "compra exitosa";
    }else{
        mensajeCompra ="Error de compra";
    }
    mostrarComprarProducto();
    document.querySelector(`#txtMensajeCompra${idPProducto}`).innerHTML = mensajeCompra;
}

function procesarBotonCancelarCompra() {      
    let atributoPersonalizado = this.getAttribute("atributoCancelarCompra");
    let idPCompra = Number(atributoPersonalizado);
    miSistema.cancelarCompra(idPCompra);
    mostrarTablaFiltrada();
    console.log("se cargaro el id")
}

function procesarBotonAceptarCompra() {      
    let atributoPersonalizado = this.getAttribute("atributoAceptarCompra");
    let idPCompra = Number(atributoPersonalizado);
    miSistema.aceptarCompra(idPCompra);
    mostrarTablaFiltradaAdmin();
}

function procesarBotonCompraOferta() {      
    let atributoPersonalizado = this.getAttribute("idproductoOf");
    let mensajeCompra ="";
    let idPProductoOf = atributoPersonalizado;
    let cantidad = document.querySelector(`#txtCantCompraOferta${idPProductoOf}`).value;
    if(miSistema.esNumero(cantidad)){
        let prodCnt = Number(cantidad);
        miSistema.agregarCompra(idPProductoOf , prodCnt);
        mensajeCompra = "compra exitosa";
    }else{
        mensajeCompra ="Error de compra";
    }
    mostrarOfertas();
    document.querySelector(`#txtMensajeCompraOferta${idPProductoOf}`).innerHTML = mensajeCompra;
}

function procesarBotonOferta() { 
    let atributoPersonalizado = this.getAttribute("atributoOferta");
    let idPProducto = atributoPersonalizado;
    miSistema.modificarOferta(idPProducto);
    mostrarModificarProducto();
}

function procesarBotonEstado() {  
    let atributoPersonalizado = this.getAttribute("atributoEstado");
    let idPProducto = atributoPersonalizado;
    miSistema.modificarEstado(idPProducto);
    mostrarModificarProducto();
}

function procesarBotonStock() {  
    mensaje=""
    let atributoPersonalizado = this.getAttribute("atributoStock");
    let idPProducto =atributoPersonalizado;
    let cantidad = document.querySelector(`#txtModificarStock${idPProducto}`).value;
    if(miSistema.esNumeroNatural(cantidad)){
        let cantStock = Number(cantidad);
        mensaje = miSistema.modificarStock(idPProducto, cantStock);
    }
    mostrarModificarProducto();
    document.querySelector(`#txtMensajeModificarStock${idPProducto}`).innerHTML = mensaje;
}
//////////////////////////////////////////////////////////////////////////////////

function loginAdmin(){
    ocultarTodo();
    mostrarInterfazAdministrador();
    mostrarCrearProducto();
}

function cerrarSecion(){
    miSistema.logOut();
    ocultarTodo();
    mostrarLogin();
  }

function login(){
    let mensaje="";
    let txtNombredeUsuario = document.querySelector("#txtNombredeUsuario").value;
    let nombredeUsuario = txtNombredeUsuario.trim();
    let txtContrasenia = document.querySelector("#txtContrasenia").value;
    let contrasenia = txtContrasenia.trim();
    if(miSistema.campoCompleto(nombredeUsuario) && miSistema.campoCompleto(contrasenia)){ 
        if(miSistema.login(nombredeUsuario, contrasenia)){
            mostrarOpcionesUsuario();    
        }else{
            mensaje=`Nombre de usuario o contraseña incorrectos`
        }
    }else{
        mensaje=`Debe completar los campos`;
    }
    document.querySelector("#mensajeLogin").innerHTML=mensaje;
}

function mostrarOpcionesUsuario(){
    ocultarTodo();
    let logueadoAux = miSistema.logueado;
    if(logueadoAux !== null){ //hay alguien en el sistema
        if(logueadoAux.tipo === "COMPRADOR"){
            loginUsuarioComprador();
        }
        if(logueadoAux.tipo === "ADMINISTRADOR"){
            loginAdmin();  
        }
    }
}

function loginUsuarioComprador(){
    ocultarTodo();
    mostrarInterfazComprador();
    mostrarComprarProducto();
}

function registrarse(){ //tomo los valores del usuario , valido y creo un nuevo usuario
    let mensaje="";
    let txtNombre = document.querySelector("#txtNombre").value;
    let nombre = txtNombre.trim();
    let txtApellido = document.querySelector("#txtApellido").value;
    let apellido = txtApellido.trim();
    let txtNombredeUsuario = document.querySelector("#txtNombredeUsuarioR").value;
    let nombredeUsuario = txtNombredeUsuario.trim();
    let txtContrasenia = document.querySelector("#txtContraseniaR").value;
    let contrasenia = txtContrasenia.trim();
    let txtTarjetaCredito = document.querySelector("#txtTarjetaCredito").value;
    let tarjetaCredito = txtTarjetaCredito.trim();
    let txtCVC = document.querySelector("#txtCVC").value;
    let cvc = txtCVC.trim();
    if(miSistema.campoCompleto(nombre) && miSistema.campoCompleto(apellido)
        && miSistema.campoCompleto(nombredeUsuario) && miSistema.campoCompleto(contrasenia)
        && miSistema.campoCompleto(tarjetaCredito) && miSistema.campoCompleto(cvc)) {
        if(!miSistema.nombredeUsuarioCoinside(nombredeUsuario)){
            if (miSistema.validarContraseniaRegistro(contrasenia)){
                if(miSistema.validarNumeroTarjeta(tarjetaCredito)){
                    if(miSistema.validarCVC(cvc)){
                        let tarjetaOk = miSistema.guardarSoloNumeros(tarjetaCredito);
                        let verificarLuhn = miSistema.algoritmoLuhn(tarjetaOk);
                        if (verificarLuhn === Number(tarjetaOk.charAt(tarjetaOk.length - 1))) {
                        miSistema.registrarUsuario(nombre, apellido, nombredeUsuario, contrasenia, tarjetaCredito, cvc);
                        registroExitoso();
                        limpiarRegistrarse();
                        } else {
                            mensaje = "El Numero de Tarjeta no es valido";
                        }
                    }else{mensaje=`cvc debe tener 3 caracteres numéricos`;  
                    }
                }else{
                    mensaje=`tarjeta de credito invalida, usar Formato 0000-0000-0000-0000`;
                }
            }else{
                mensaje=`la contraseña debe tener mas de 5 caracteres, una mayuscula, una minuscula y un numero`;
            }
        }else{
            mensaje=`el nombre de usuario ya esta en uso`;
        }
      }else{
        mensaje=`Debe completar todos los campos`;
    }
    document.querySelector("#pRegistroExitoso").innerHTML=mensaje;
    }

    function registroExitoso(){/// una vez registrado el usuario debera hacer login
        ocultarTodo();
       mostrarLogin();
       document.querySelector("#mensajeLogin").innerHTML="Registro exitoso, ya Puede hacer Login"
    }

function agregarProducto(){
    let mensaje="";
    let txtNombre = document.querySelector("#txtNombreProducto").value;
    let nombre = txtNombre.trim();
    let txtPrecio = document.querySelector("#txtPrecio").value;
    let precioSE = txtPrecio.trim();
    let txtDescripcion = document.querySelector("#txtDescripcion").value;
    let descripcion = txtDescripcion.trim();
    let imagen = document.querySelector("#filImagen").value;
    let txtCantidadStock = document.querySelector("#txtCantidadStock").value;
    let cantidadStockSE = txtCantidadStock.trim();
    let nomImagen = miSistema.obtenerNombreArchivoImagen(imagen);
    if(miSistema.campoCompleto(nombre) && miSistema.campoCompleto(precioSE)
        && miSistema.campoCompleto(descripcion) && miSistema.campoCompleto(imagen) && miSistema.campoCompleto(cantidadStockSE)) {
        if(miSistema.esNumero(precioSE) && miSistema.esNumero(cantidadStockSE)){
           let precio = Number(precioSE);
           let cantidadStock = Number(cantidadStockSE);
           miSistema.crearProducto(nombre,precio,descripcion,nomImagen,cantidadStock);
           limpiarProducto();
           mensaje = `El articulo ${nombre} se agregó correctamente`
        }else{
            mensaje="precio y stock deben ser números mayores que 0"
        }                 
        }else{
        mensaje=`Debe completar todos los campos`;
    }
    document.querySelector("#ProductoCreado").innerHTML=mensaje;
}

function comprarProducto(idProducto) {
    if(idProducto != 0){
        let txtCantidad = document.querySelector(`#txtCantCompra${idProducto}`).value;
        if(miSistema.esNumero(txtCantidad)){
            let cantidad = Number(txtCantidad);
            miSistema.agregarCompra(idProducto, cantidad)
        }
}
}

// limpiar

function limpiarLogin(){
    document.querySelector("#txtNombredeUsuario").value = "";
    document.querySelector("#txtContrasenia").value = "";
}

function limpiarRegistrarse(){
document.querySelector("#txtNombre").value = "";
document.querySelector("#txtApellido").value = "";
document.querySelector("#txtNombredeUsuarioR").value = "";
document.querySelector("#txtContraseniaR").value = "";
document.querySelector("#txtTarjetaCredito").value = "";
document.querySelector("#txtCVC").value = "";
}

function limpiarProducto(){
document.querySelector("#txtNombreProducto").value = "";
document.querySelector("#txtPrecio").value = "";
document.querySelector("#txtDescripcion").value = "";
document.querySelector("#filImagen").value = "";
document.querySelector("#txtCantidadStock").value = "";
document.querySelector("#ProductoCreado").innerHTML = "";
}
