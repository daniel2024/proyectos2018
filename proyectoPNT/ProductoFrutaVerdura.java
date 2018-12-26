package proyectoPNT;

public class ProductoFrutaVerdura extends Producto {

    private Double cantidad;

    public ProductoFrutaVerdura(String nombre, Double precio, Double cantidad) {
	super(nombre, precio);
	this.cantidad = cantidad;
    }

    public Double getCantidad() {
	return cantidad;
    }

    @Override
    public String toString() {
	String a = null;
	if (getPrecio() - getPrecio().intValue() == 0) {
	    a = String.format("%.0f", getPrecio());
	} else {
	    a = getPrecio().toString();

	}
	return "Nombre: " + getNombre() + " /// Precio: $" + a + " /// Unidad de venta: kilo";
    }

    public void setCantidad(Double cantidad) {
	this.cantidad = cantidad;
    }

}
