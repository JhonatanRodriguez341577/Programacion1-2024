class Producto {
    static idProductos = 1;
    constructor() {
        this.idProducto = `PROD_ID_${Producto.idProductos++}`;
        this.nombre = "";
        this.precio = 0;
        this.descripcion = "";
        this.urlImagen = "";
        this.cantidadStock = 0;
        this.estado = "";
        this.oferta = false;
        this.cantidadVentas =0;
    }
}