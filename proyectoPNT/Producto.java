package proyectoPNT;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public abstract class Producto implements Comparable<Producto> {
    // De existir mas variacion de productos se ira agregando mas clases hijas
    // de esta

    private String nombre;
    private Double precio;

    public Producto(String nombre, Double precio) {

	this.nombre = nombre;
	this.precio = precio;
    }

    public String getNombre() {
	return nombre;
    }

    public void setNombre(String nombre) {
	this.nombre = nombre;
    }

    public Double getPrecio() {
	return precio;
    }

    public void setPrecio(Double precio) {
	this.precio = precio;
    }

    public static ArrayList<Producto> cargaDeProductos() {

	ArrayList<Producto> v = new ArrayList<Producto>();

	// se carga la lista con los productos(harcodeado esta vez) ,de ser
	// posible que los productos
	// vengan de un archivo o un base de datos solo se tendria que modificar
	// la insercion
	// de los elementos agregando un metodo sin modificar los demas
	v.add(new ProductoBebida("Coca-cola Zero", 20.0, 1.5));
	v.add(new ProductoBebida("Coca-cola ", 18.0, 1.5));
	v.add(new ProductoHigiene("Shampoo Sedal", 19.0, 500));
	v.add(new ProductoFrutaVerdura("Frutillas", 64.0, 1.0));

	return v;
    }

    public static void mostrarProducto(Collection<Producto> list) {

	for (Producto a : list) {

	    System.out.println(a.toString());
	}
	System.out.println("================================");
    }

    public static void mostrarProductoMayorPrecio(ArrayList<Producto> list) {

	Collections.sort( list);
	System.out.println("Producto mas caro: " + list.get(0).getNombre());

    }

    public static void mostrarProductoMenorPrecio(ArrayList<Producto> list) {

	Collections.sort( list);
	int ultimo = list.size() - 1;
	System.out.println("Producto mas barato: " + list.get(ultimo).getNombre());

    }

    @Override
    public int compareTo(Producto o) {
	// es ordenado por precio de menor a mayor
	return (o.getPrecio() - this.precio > 0) ? 1 : (o.getPrecio() - this.precio < 0) ? -1 : 0;
    }

}
