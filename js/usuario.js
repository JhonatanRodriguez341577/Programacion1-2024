class Usuario {
    static idUsuarios = 1;
    constructor() {
        this.id = Usuario.idUsuarios++;
        this.nombre = "";
        this.apellido = "";
        this.nombredeUsuario = "";
        this.contrasenia = "";
        this.tarjetaCredito = "";
        this.cvc = "";
        this.saldo="3000";
        this.tipo = "";
        this.cantidadCompras = 0;
    }
}

// la clase comprador es la estructura donde voy a recivir elementos simultaneos de un mismo comprador
// en este caso decidimos q el saldo va a ser siempre 3000, nunca vamos a pedirlo,
//y el  id sera autoincremental, de esta forma podremos crear un registro que va a tomar este objeto,
// y podremos guardarlo en un array de objetos.
// este array de objetos estara guardado en la clase sistema. y debemos recordar llamar cada js en el index.