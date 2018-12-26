package proyectoPNT;

public class ProductoBebida extends Producto {

    private Double contenido;

    public ProductoBebida(String nombre, Double precio, Double contenido) {
	super(nombre, precio);
	this.contenido = contenido;
    }

    public Double getContenido() {
	return contenido;
    }

    public void setContenido(Double contenido) {
	this.contenido = contenido;
    }

    @Override
    public String toString() {
	String a = null;
	if (getPrecio() - getPrecio().intValue() == 0) {
	    a = String.format("%.0f", getPrecio());
	} else {
	    a = getPrecio().toString();

	}
	return "Nombre: " + getNombre() + " /// Litros: " + contenido + " /// Precio: $" + a;
    }
}
