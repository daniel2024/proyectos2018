package proyectoPNT;

import java.util.ArrayList;

public class ProductosApp
{

	public static void main(String arg[])
	{

		ArrayList<Producto> list=Producto.cargaDeProductos();
		Producto.mostrarProducto(list);

		Producto.mostrarProductoMayorPrecio(list);
		Producto.mostrarProductoMenorPrecio(list);

	}
}
