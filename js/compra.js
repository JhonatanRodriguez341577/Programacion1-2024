class Compra{
    static idCompras = 0;
    constructor(){
        this.id = Compra.idCompras++;
        this.Producto = null; //espera cargar un objeto producto
        this.cantidad =0;
        this.Usuario = null;
        this.estadoCompra = "";
        this.total = 0; 
    }
}