class Sistema{
    constructor(){
        this.usuarios= new Array;
        this.logueado= new Array;
        this.productos= new Array;
        this.estadoCompra= new Array;
        this.compras= new Array;
    }

    //// funcionalidades del login ////
    
    login(pUsu, pContra) {
        let ok = false;
        let elUsu = this.obtenerObjetoUsuario(pUsu);
        if (elUsu !== null) {
            if (elUsu.contrasenia === pContra) {
                ok = true;
                this.logueado = elUsu;
            }
        }
        return ok;
    }

    logOut(){
        this.logueado = null;
    }

///////fincionalidades de registro//////

    validarContraseniaRegistro(contrasenia) { // valido que la contraceña tenga 5>caracteres , 1numero , 1 mayuscula , 1minuscula
        let tieneMayuscula=false;
        let tieneMinuscula=false;
        let tieneNumero=false;
        let contraseniaValida=false;
        if (contrasenia.length >= 5){
            for (let i = 0; i < contrasenia.length; i++) {
                let contraseniaX = contrasenia.charCodeAt(i);
                if (contraseniaX >= 65 && contraseniaX <= 90) {
                    tieneMayuscula = true;
                } else if (contraseniaX >= 97 && contraseniaX <= 122) {
                    tieneMinuscula = true;
                } else if (contraseniaX >= 48 && contraseniaX <= 57) {
                    tieneNumero = true;
                }
            }
        }
        if(tieneMayuscula && tieneMinuscula && tieneNumero){
            contraseniaValida = true;
        }      
        return contraseniaValida;
    }
   
    registrarUsuario(pNombre, pApellido, pNombredeUsuario, pContrasenia, pTarjetaCredito, pCVC) { // cargo un nuevo usuario
        let nuevoUsuario = new Usuario();
        nuevoUsuario.nombre = pNombre;
        nuevoUsuario.apellido = pApellido;
        nuevoUsuario.nombredeUsuario = pNombredeUsuario;
        nuevoUsuario.contrasenia = pContrasenia;
        nuevoUsuario.tarjetaCredito = pTarjetaCredito;
        nuevoUsuario.cvc = pCVC;
        nuevoUsuario.tipo = "COMPRADOR";
        this.usuarios.push(nuevoUsuario);
        return true;
    }

    precargarUnUsuario(pNombre, pApellido, pNombredeUsuario, pContrasenia, pTarjetaCredito, pCVC, pid) {    
        if (!this.nombredeUsuarioCoinside(pNombredeUsuario)) {         
            if (this.validarContraseniaRegistro(pContrasenia)) {         
                if (this.validarNumeroTarjeta(pTarjetaCredito)) {               
                    if (this.validarCVC(pCVC)) {                  
                        this.registrarUsuario(pNombre, pApellido, pNombredeUsuario, pContrasenia, pTarjetaCredito, pCVC, pid);
                    } else {
                        console.error("CVC inválido");
                    }
                } else {
                    console.error("Número de tarjeta de crédito inválido");
                }
            } else {
                console.error("Contraseña inválida");
            }
        } else {
            console.error("El nombre de usuario ya existe");
        }
    }


    registrarAdministrador(pNombredeUsuario, pContrasenia) { // precargo un nuevo admin , valido si se cargó
        if (this.campoCompleto(pNombredeUsuario) && this.campoCompleto(pContrasenia)){
            let nuevoAdministrador = new Usuario();
            nuevoAdministrador.nombredeUsuario = pNombredeUsuario;
            nuevoAdministrador.contrasenia = pContrasenia;
            nuevoAdministrador.tipo = "ADMINISTRADOR";
            this.usuarios.push(nuevoAdministrador);
            return true;
        }
        return false;
    }

    precargarUnAdministrador(pNombredeUsuario, pContrasenia) {//precargo administrador
        if (!this.nombredeUsuarioCoinside(pNombredeUsuario)){// coinside contraseña ?
            this.registrarAdministrador(pNombredeUsuario, pContrasenia);
        }
    }
    
    ////interfaz producto  

    crearProducto(pNombre, pPrecio, pDescripcion, pUrlImagen, pCantidadStock) {
        let nuevoProducto = new Producto();
        nuevoProducto.nombre = pNombre;
        nuevoProducto.precio = pPrecio;
        nuevoProducto.descripcion = pDescripcion;
        nuevoProducto.urlImagen = pUrlImagen;
        nuevoProducto.cantidadStock = pCantidadStock;
        nuevoProducto.estado = "activo";
        nuevoProducto.oferta = false;
        this.productos.push(nuevoProducto);
    }

    mostrarTablaProductos() {//compra1// aqui en mi tabla tendre los botones de compra que aun no existen en el DOM , por eso creo una classe para seleccionar los botones y un atributo para identificar el id de compra
        let tabla = `<table border="1"><tr><th>Nombre</th><th>Precio</th><th>Descripción</th><th>Imagen</th><th>Cantidad Stock</th><th>Estado</th><th>Oferta</th><th>Cantidad</th></tr>`;
        for (let i = 0; i < this.productos.length; i++) {
            let productoX = this.productos[i];
            let mensajeOferta = "SI";
            let estado = productoX.estado;
            let stock = productoX.cantidadStock
            if(productoX.oferta === false){
                mensajeOferta = "NO";
            }
            if(this.activoOK(estado,stock)){
                tabla += `<tr><td>${productoX.nombre}</td><td>${productoX.precio}</td><td>${productoX.descripcion}</td>
                    <td><img src="Img/${productoX.urlImagen}" alt="${productoX.nombre}"/></td><td>${productoX.cantidadStock}</td><td>${productoX.estado}</td> <td>${mensajeOferta}</td>
                    <td><input type="text" id="txtCantCompra${productoX.idProducto}" value="0" /></td>
                    <td><input type="button" class="botones" idproductoX="${productoX.idProducto}" id="comprar" value="comprar"></td>
                    <td> <div id="txtMensajeCompra${productoX.idProducto}"></div></td>
                    
                     </tr>`;
            }
        }
        return tabla;
    }  

    obtenerNombreArchivoImagen(pTextoFile) { // obtengo el nombre del archivo para poder crear una imagen
        console.log(pTextoFile);
        let nombre = "";
        let posicionBarra = -1;
        let i = pTextoFile.length - 1;
        while (i > 0 && posicionBarra === -1) {
            let elCaracter = pTextoFile.charAt(i);
            if (elCaracter === "\\") {
                posicionBarra = i;
            }
            i--;
        }
        posicionBarra++;
        for (let i = posicionBarra; i < pTextoFile.length; i++) {
            nombre += pTextoFile.charAt(i);
        }

        console.log(nombre);
        return nombre;
    }

      precargarUnProducto(nombre, precio, descripcion, urlImagen, cantidadStock) {
        if(this.campoCompleto(nombre) && this.campoCompleto(descripcion) && this.campoCompleto(urlImagen)){
           if(this.esNumero(precio) && this.esNumero(cantidadStock)){
               this.crearProducto(nombre, precio, descripcion, urlImagen, cantidadStock);
           } 
        }
    }
    /// ofertas

    mostrarTablaOfertas() {
        let tabla = `<table border="1"><tr><th>Nombre</th>  <th>Descripción</th> <th>Precio</th> <th>Imagen</th> <th>Cantidad de stock</th> <th>Estado</th> <th>En oferta</th><th>Cantidad</th></tr>`;
        for (let i = 0; i < this.productos.length; i++) {
            let productoX = this.productos[i];
            let mensajeOferta = "SI";
            let estado = productoX.estado;
            let stock = productoX.cantidadStock
          if(productoX.oferta === false){
            mensajeOferta = "NO";
        }
            if (productoX.oferta === true) {
                if(this.activoOK(estado,stock)){
                tabla+=`<tr> <td>${productoX.nombre}</td> <td>${productoX.descripcion}</td> <td>${productoX.precio}</td> 
          <td><img src="Img/${productoX.urlImagen}" alt="${productoX.nombre}"/> <td>${productoX.cantidadStock}</td> <td>${productoX.estado}</td>
           <td>${mensajeOferta}</td>
           <td><input type="text" id="txtCantCompraOferta${productoX.idProducto}" value="0" /></td>
            <td><input type="button" class="botonesOferta" idproductoOf="${productoX.idProducto}" id="comprar" value="comprar"></td>
            <td> <div id="txtMensajeCompraOferta${productoX.idProducto}"></div></td></tr>`;
            }
        }
        }
        tabla += `</table> `;
        return tabla;
    }  

/// modificar producto
     mostrarTablaModificarProductos() {
        let tabla=`<table border="1"><tr><th>ID</th><th>Nombre</th> <th>imagen</th> <th>estado</th> <th>oferta</th> <th>cantidadStock</th></tr>`;
        for(let i=0 ; i<this.productos.length ; i++){
          let productoX = this.productos[i];
          let mensajeOferta = "SI";
          if(productoX.oferta === false){
            mensajeOferta = "NO";
          }
          tabla+=`<tr> <td><p>${productoX.idProducto}</p></td> <td>${productoX.nombre}</td> 
          <td><img src="Img/${productoX.urlImagen}" alt="${productoX.nombre}"/> 
           <td> Estado Actual: <strong>${productoX.estado}</strong> <br><input type="button" class="botonesEstado" atributoEstado=${productoX.idProducto} id="modificarEstado" value="Modificar Estado" ></td>
           <td> <strong>${mensajeOferta}</strong> esta en oferta <br><input type="button" class="botonesOferta" atributoOferta=${productoX.idProducto} id="modificarOferta" value="Modificar oferta" > 
            <td><input type="number" id="txtModificarStock${productoX.idProducto}" value="${productoX.cantidadStock}"></td>
            <td> <input type="button" class="botonesStock" value="Modificar Stock" atributoStock="${productoX.idProducto}"></td>
             <td><div id="txtMensajeModificarStock${productoX.idProducto}"></div></td></tr>`
        }
        tabla+=`</table> <input type="button" id="btnModificarTablaProductos" value="Modificar Productos">`;
        return tabla;
    }



//// compras

precargarUnaCompra(pObjetoProducto, pUsuario, pCantidad) {////////////nuevo
    let precargaOk = false;
    if (this.esNumero(pCantidad)) {
        if (pObjetoProducto !== null && pUsuario !== null) {
            let cantidadNumero = Number(pCantidad);
            if (this.agregarCompraPrecarga(pObjetoProducto, pUsuario, cantidadNumero) !== null) {
                precargaOk = true
            }
        }
    }
    return precargaOk;
}

    agregarCompra(pIdProducto, pCantidad) {//compra6// finalmente agrego la compra, y aqui decido como continuar, que sera mostrando la tabla
        let nuevaCompra = new Compra();
        nuevaCompra.cantidad = pCantidad;
        nuevaCompra.Usuario = this.logueado;  //validar
        let productoAuxiliar = this.obtenerObjetoProducto(pIdProducto);
        if(this.esNumero(pCantidad)){
           let pCantidadNro = Number(pCantidad)
            if (productoAuxiliar !== null ) {
            nuevaCompra.total = pCantidadNro * productoAuxiliar.precio;
            nuevaCompra.Producto = productoAuxiliar;
            nuevaCompra.id = this.compras.length + 1;
            nuevaCompra.estadoCompra = "pendiente";
            this.compras.push(nuevaCompra);        
            } else {
            return console.log("Cantidad no es numero")
            }
        }else{
        return console.log("No existe ese producto")
    }
}

mostrarTotaldeComprasySaldo(){
    let UsuarioLogeado = this.logueado;
    let saldoDisponible = UsuarioLogeado.saldo;
    let cantidaddeCompras = UsuarioLogeado.cantidadCompras;
    let mensaje = `Sus compras actuales son de (${cantidaddeCompras}) y su saldo es de $${saldoDisponible}`
    return mensaje;
}

agregarCompraPrecarga(pObjetoProducto, pUsuario, pCantidad) {////////// nuevo
    let agregada = null;
    if (pUsuario !== null && pUsuario.tipo === "COMPRADOR") {
        if (pObjetoProducto !== null && pCantidad > 0) {
            let nuevaCompra = new Compra();
            nuevaCompra.cantidad = pCantidad;
            nuevaCompra.Usuario = pUsuario;
            nuevaCompra.total = pCantidad * pObjetoProducto.precio;
            nuevaCompra.Producto = pObjetoProducto;
            nuevaCompra.id = this.compras.length + 1;
            nuevaCompra.estadoCompra = "pendiente";
            this.compras.push(nuevaCompra);
            agregada = nuevaCompra;
            }
    }
    return agregada;
}

    mostrarCompras(pEstado) {
        let tabla = `<table border="1"><tr><th>ID</th><th>Nombre del Producto</th><th>Imagen</th><th>Cantidad</th><th>Estado</th><th>Total</th></tr>`;
        
        if (this.logueado.tipo === "COMPRADOR") {
            for (let i = 0; i < this.compras.length; i++) {
                let compraX = this.compras[i];
                if (compraX != null) {
                    if(this.logueado.nombre === compraX.Usuario.nombre){
                        if(compraX.estadoCompra === pEstado || pEstado === ""){//check
                            tabla += `<tr><td>${compraX.id}</td><td>${compraX.Producto.nombre}</td><td><img src="Img/${compraX.Producto.urlImagen}"/></td>
                            <td>${compraX.cantidad}</td><td>${compraX.estadoCompra}</td><td>$${compraX.total}</td>`
                        if(compraX.estadoCompra === "pendiente"){
                            tabla += `<td><input type="button" value="Cancelar" class="botonesCancelarCompra" atributoCancelarCompra="${compraX.id}"></td>
                            <tr>` 
                        }else{
                            tabla += `</tr>`;
                        }                              
                        }
                    }
                }
            }
        } else if (this.logueado.tipo === "ADMINISTRADOR") {
            for (let i = 0; i < this.compras.length; i++) {
                let compraX = this.compras[i];
                if(compraX.estadoCompra === pEstado || pEstado === ""){//check
                    tabla += `<tr><td>${compraX.id}</td><td>${compraX.Producto.nombre}</td><td><img src="Img/${compraX.Producto.urlImagen}"/></td>
                    <td>${compraX.cantidad}</td><td>${compraX.estadoCompra}</td><td>$${compraX.total}</td>`
                if(compraX.estadoCompra === "pendiente"){
                     tabla += `<td><input type="button" class="botonesAceptarCompra"  atributoAceptarCompra="${compraX.id}" value="Aceptar"></td><tr>` 
                }else{
                     tabla += `</tr>`;
                }      
                }
            }
        }
        
        tabla += `</table>`;
        return tabla;
    }

    agregarEstadoCompra(pEstado) {
        this.estadoCompra.push(pEstado);
    }

    cancelarCompra(idPCompra){
       let compraX = this.obtenerObjetoCompra(idPCompra);
       if (!compraX) {
        console.error("Error: La compra no existe.");
        return;
    }
       let estado = compraX.estadoCompra;
       if(estado === "pendiente"){
          compraX.estadoCompra = "cancelado"
       }
       console.log("compra cancelada");
    }

    aceptarCompra(idPCompra){
        let compraX = this.obtenerObjetoCompra(idPCompra);
        if (!compraX) {
         console.error("Error: La compra no existe.");
         return;
        }
        let precioCompra = compraX.Producto.precio * compraX.cantidad;
        let saldoUsuLogueado = Number(compraX.Usuario.saldo);
        let cantidadCompra = Number(compraX.cantidad);
        let cantidadStockProducto = Number(compraX.Producto.cantidadStock);
        let estadodelProducto = compraX.Producto.estado;
        if(saldoUsuLogueado>=precioCompra){
            if(cantidadCompra<=cantidadStockProducto){//validar ===0
                let nuevoStock = cantidadStockProducto - cantidadCompra
                let nuevoSaldo =saldoUsuLogueado - precioCompra
                if(estadodelProducto === "activo"){
                    compraX.estadoCompra = "aprobado"
                    let productoAux = this.obtenerObjetoProducto(compraX.Producto.idProducto);
                    productoAux.cantidadVentas+=Number(cantidadCompra)
                    productoAux.cantidadStock = nuevoStock;
                    let usuarioAux = this.obtenerObjetoUsuario(compraX.Usuario.nombredeUsuario);
                    this.logueado.saldo = nuevoSaldo;
                    usuarioAux.saldo = nuevoSaldo
                    console.log("compra aceptada");
                    if(productoAux.cantidadStock<=0){
                        productoAux.estado = "pausado";
                    }
                }else{
                    compraX.estadoCompra = "cancelado";
                    console.log("compra cancelada por que el producto no está activo");
                }
            }else{
                compraX.estadoCompra = "cancelado";
                console.log("compra cancelada por falta de stock");
            }
        }else{
            compraX.estadoCompra = "cancelado";
            console.log("compra cancelada por falta de saldo");
        }
    }

    obtenerOpcionesSelEstado() { // desplegable 2 // muestro las opciones que precargue en el array de estados
        let opciones = `<option value="">Elija el Estado</option>`;
        for (let i = 0; i < this.estadoCompra.length; i++) {
            let estadoX = this.estadoCompra[i];
            opciones += `<option value="${estadoX}"> ${estadoX}</option>`;

        }
        return opciones;
    }

///modificaciones de estado

    modificarOferta(idPProducto){
      let productoX = this.obtenerObjetoProducto(idPProducto);
      let oferta = productoX.oferta;
      if (oferta === true) {
        productoX.oferta = false;
      } else if (oferta === false) {
        productoX.oferta = true;
      }
    }

    modificarEstado(idPProducto){
        let productoX = this.obtenerObjetoProducto(idPProducto);
        let estado = productoX.estado;
        if (estado === "activo") {
          productoX.estado = "pausado";
        } else if (estado === "pausado") {
          productoX.estado = "activo";
        }
      }

      modificarStock(idPProducto, cantStock){
        let productoX = this.obtenerObjetoProducto(idPProducto);
        let mensaje = "";
        if(productoX.cantidadStock === cantStock){
          mensaje = "Error";
        }else if(productoX.cantidadStock !== cantStock){
            if(cantStock < 0){
                mensaje = "Error";
            }else if (cantStock >=0){
              productoX.cantidadStock = cantStock;
              mensaje = "Stock modificado"
              if(cantStock===0){
                productoX.estado = "pausado";
              }
            }
        }
        return mensaje;
      }

    /////////ganancia
    mostrarInformedeGanancia(){
        let mensaje = ""
        let acumuladorTotal=0;
        for (let i = 0; i < this.productos.length; i++) {
            let productoX = this.productos[i];
            if (productoX != null){
                mensaje += `Del producto ${productoX.idProducto}   se vendieron ${productoX.cantidadVentas} productos.   nombre: (${productoX.nombre})<br>`
            }
        }
        for (let i = 0; i < this.compras.length; i++) {
            let compraX= this.compras[i];
            if(compraX.estadoCompra==="aprobado"){
                acumuladorTotal += compraX.total;
            }
        }
        mensaje+= `<br><br> la ganancia total por todas las compras realizadas por los usuarios es $${acumuladorTotal} `
        return mensaje;
    }
////////// obtener objeto
    obtenerObjetoUsuario(pUsu) { 
        let usuarioX = null;
        let i = 0;
        while (i < this.usuarios.length && usuarioX === null) {
            let elUsu = this.usuarios[i];
            let pUsuInsensitive = pUsu.toLowerCase();
            if (elUsu.nombredeUsuario.toLowerCase() === pUsuInsensitive) { //encontr'e  el usuario                
                usuarioX = elUsu;
            }
            i++;
        }
        return usuarioX;
    }

    obtenerObjetoCompra(pIdCompra) {
        let laCompra = null;
        let i = 0;
        while (i < this.compras.length && laCompra === null) {
            let compraX = this.compras[i];
            if (compraX.id === pIdCompra) {
                laCompra = compraX;
            }
            i++;
        }
        return laCompra;
    }

    obtenerObjetoProducto(pIdProducto) {//compra5// obtengo el objeto producto
        let objetoProducto = null;
        let i = 0;
        while (i < this.productos.length && objetoProducto === null) {
            let elProducto = this.productos[i];
            if (elProducto.idProducto === pIdProducto) {
                objetoProducto = elProducto;
            }
            i++;
        }
        return objetoProducto;
    }

    ////////// validaciones generales

    campoCompleto(pTexto){/// valido campo completo
        let campoLleno=false;
        if(pTexto.length>0){
         campoLleno=true;
        }
        return campoLleno;
     }

     esNumero(pNumero){
        let numeroOk = false;
        if(!isNaN(pNumero) && pNumero>0){
          numeroOk=true;
        }
        return numeroOk;
      }

      esNumeroNatural(pNumero){// valida que solo sea numero incluye 0 y negativos, en cuyo caso habra un mensaje personalizado que avise de esto
        let numeroOk = false;
        if(!isNaN(pNumero)){
          numeroOk=true;
        }
        return numeroOk;
      }

    nombredeUsuarioCoinside(pNombredeUsuario){// valido si username esta en la lista de usuarios
        let coincide =false;
          for(let i = 0 ; i< this.usuarios.length ; i++){
            let usuarioX = this.usuarios[i];
             if(pNombredeUsuario.toLowerCase() === usuarioX.nombredeUsuario.toLowerCase()){
            coincide=true
           }
          }
          return coincide ;
        }

        validarNumeroTarjeta(numeroTarjeta) { // Tarjeta luhn 1// valido que el formato sea correcto xxxx-xxxx-xxxx-xxxx
            if (numeroTarjeta.length !== 19) {
                return false;
            }
    
            let digitos = 0;
            for (let i = 0; i < numeroTarjeta.length; i++) {
                let caracterX = numeroTarjeta.charAt(i);
                if (caracterX === '-') {
                    if ((i + 1) % 5 !== 0) {
                        return false;
                    }
                } else if (caracterX >= '0' && caracterX <= '9') {
                    digitos++;
                } else {
                    return false;
                }
            }
            return true;
        }
    
         guardarSoloNumeros(pTarjeta){ // Tarjeta luhn 2// necesito solo los numeros para validar luhn
            let tarjetaconguiones = pTarjeta;
            let nrosSeparados = tarjetaconguiones.split("-"); //array
            let tarjetasinGuiones = `${nrosSeparados[0]}${nrosSeparados[1]}${nrosSeparados[2]}${nrosSeparados[3]}`;
            return tarjetasinGuiones;
        }
    
          algoritmoLuhn(numero) { // Tarjeta luhn 3//
            let suma = 0;
            let num = ""
            let pos = 0;
            for (let i = numero.length - 2; i >= 0; i--){
                num = numero.charAt(i);
                if (isNaN(num)) {
                    return -1;
                }
                num = Number(num)
                if (pos % 2 === 0) {
                    num = this.duplicarPar(num)
                }
                suma+=num
                pos++
            }
            let ultimoDigito = (suma*9)%10
            return ultimoDigito;
        }
        
         duplicarPar(pNumero) { // Tarjeta luhn 4//
            pNumero *= 2;
            if (pNumero > 9) {
              pNumero = 1 + (pNumero - 10);
            }
            return pNumero;
        }
    
        validarCVC(cvc) { // el cvs tiene que tener 3 caracteres
            if (cvc.length !== 3) {
                return false;
            }
            for (let i = 0; i < cvc.length; i++) {
                if (isNaN(cvc[i])) {
                    return false;
                }
            }
            return true;
        }

        activoOK(pEstado,pStock){
            let activook = false;
            if(pEstado === `activo` && pStock>0){
              activook = true;
            }
            return activook;
          }

}