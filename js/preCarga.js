function precargarUsuarios(){
    miSistema.precargarUnUsuario("Gonzalo","Rojas","Gonza123", "GonRojas1212", "2591-2325-7054-8867", "152");
    miSistema.precargarUnUsuario("Pedro","Peralta","PedroPe", "Pe15444", "9305-0810-0610-6598", "526");
    miSistema.precargarUnUsuario("Micaela","Rodríguez","Micaaa15", "Micalove2", "7144-3534-4841-7944", "842");
    miSistema.precargarUnUsuario("Ivan","Tellechea","IVAN44", "Ivan4", "6566-1671-3657-1627", "963");
    miSistema.precargarUnUsuario("Vanesa","Izquierdo","Vanee22", "VaneIzquierdo1", "4026-3405-1796-3122", "254");
    miSistema.precargarUnAdministrador("Gonzalo", "Gentile1");
    miSistema.precargarUnAdministrador("Gabriel", "Grodriguez1");
    miSistema.precargarUnAdministrador("Ivan", "Itellechea1");
    miSistema.precargarUnAdministrador("Bedelia", "Bedelia1");
    miSistema.precargarUnAdministrador("Profe", "Profe1");
}

function precargarProductos() {
    miSistema.precargarUnProducto("Botella Deportiva",60, "Botella deportiva transparente 800ml", "1.jpg", 10);
    miSistema.precargarUnProducto("Inflador",250 , "Pelota NIVIA + inflador", "2.jpg", 5);
    miSistema.precargarUnProducto("Pelota fútbol australiano",120 , "Pelota SHERRIN AFL roja",  "3.jpg", 7);
    miSistema.precargarUnProducto("Bolso",450 , "Bolso OGIO Half Dome azul", "4.jpeg", 6);
    miSistema.precargarUnProducto("bicicleta",2500 , "bicicleta para adulto", "5.jpg", 4);
    miSistema.precargarUnProducto("Mesa multijuegos 4 en 1",6000 , "futbolito, ping pong, billar y tejo, MD Sports", "6.jpg", 9);
    miSistema.precargarUnProducto("Pelota de fútbol americano",140 , "Pelota Champion SPORTS RFB!", "7.jpg", 11);
    miSistema.precargarUnProducto("Mesa hockey de aire",2990 , "Mesa hockey de aire MD Sports", "8.jpg", 2);
    miSistema.precargarUnProducto("Combo pelotas",1500 , "pelotas de distintos deportes", "9.jpg", 23);
    miSistema.precargarUnProducto("Combo deportivo",2700 , "combo deportivo variado", "5.jpg", 1);
    miSistema.precargarUnProducto("Pelota original y Inflador",375 , "Inflador con pelota de Basquet", "2.jpg", 3);
}

function precargarOfertaEstado(){
    miSistema.modificarOferta("PROD_ID_1");
    miSistema.modificarOferta("PROD_ID_5");
    miSistema.modificarOferta("PROD_ID_6");
    miSistema.modificarOferta("PROD_ID_8");
    miSistema.modificarEstado("PROD_ID_7");
    miSistema.modificarEstado("PROD_ID_10");
}

function precargarEstadoCompra(){
    miSistema.agregarEstadoCompra("aprobado");
    miSistema.agregarEstadoCompra("cancelado");
    miSistema.agregarEstadoCompra("pendiente");
}

function precargarAprobadoCancelado(){
    miSistema.aceptarCompra(4);
    miSistema.aceptarCompra(6);
    miSistema.cancelarCompra(7);
}

function precargarCompras(){
    let unoUsuario = miSistema.obtenerObjetoUsuario("Ivan44");
    let unoProducto = miSistema.obtenerObjetoProducto("PROD_ID_2");
    miSistema.precargarUnaCompra(unoProducto, unoUsuario, 1);
   
    let dosUsuario = miSistema.obtenerObjetoUsuario("PedroPe");
    let dosProducto = miSistema.obtenerObjetoProducto("PROD_ID_3");
    miSistema.precargarUnaCompra(dosProducto, dosUsuario, 2);
   
    let tresUsuario = miSistema.obtenerObjetoUsuario("Vanee22");
    let tresProducto = miSistema.obtenerObjetoProducto("PROD_ID_9");
    miSistema.precargarUnaCompra(tresProducto, tresUsuario, 3);
    
    let cuatroProducto = miSistema.obtenerObjetoUsuario("Micaaa15");
    let cuatroUsuario = miSistema.obtenerObjetoProducto("PROD_ID_1");
    miSistema.precargarUnaCompra(cuatroUsuario, cuatroProducto, 3);
   
    let cincoProducto = miSistema.obtenerObjetoUsuario("Ivan44");
    let cincoUsuario = miSistema.obtenerObjetoProducto("PROD_ID_1");
    miSistema.precargarUnaCompra(cincoUsuario, cincoProducto, 1);
  
    let seisUsuario = miSistema.obtenerObjetoUsuario("PedroPe");
    let seisProducto = miSistema.obtenerObjetoProducto("PROD_ID_1");
    miSistema.precargarUnaCompra(seisProducto, seisUsuario, 2);

    let sieteUsuario = miSistema.obtenerObjetoUsuario("Ivan44");
    let sieteProducto = miSistema.obtenerObjetoProducto("PROD_ID_6");
    miSistema.precargarUnaCompra(sieteProducto, sieteUsuario, 2);
}

// como precargo : partiendo de esta precarga donde elijo todos los elementos para usuarios especificos tengo que saber
// que tengo que cargar precargaUsuarios() en el UI para q se carguen primero que nada, que voy a trabajar
// con una funcion precargarunusuario(donde van todos los elementos) que va a trabajar en el sistema, por eso misistema.
// a su vez esa funcion va a validar que este todo bien cargado y luego ir a registrar un usuario.
// de ese modo cargo sin tenes q interactuar con la pagina, como lo hace el nuevo usuario.
// a su vez el registro tiene que tener las funcionalidades requeridas, (ver en usuario).