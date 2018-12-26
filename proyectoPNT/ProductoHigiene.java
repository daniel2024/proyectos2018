package proyectoPNT;

public class ProductoHigiene extends Producto {

    private int contenido;

    public ProductoHigiene(String nombre, Double precio, int contenido) {
	super(nombre, precio);
	this.contenido = contenido;
    }

    public int getContenido() {
	return contenido;
    }

    public void setContenido(int contenido) {
	this.contenido = contenido;
    }

    @Override
    public String toString() {
	String a = null;// se hace esto para ver si el producto a mostrar lleva
			// numeros despues de la coma
	if (getPrecio() - getPrecio().intValue() == 0) {
	    a = String.format("%.0f", getPrecio());
	} else {
	    a = getPrecio().toString();

	}
	return "Nombre: " + getNombre() + " /// Contenido: " + contenido + "ml /// Precio: $" + a;
    }

}
