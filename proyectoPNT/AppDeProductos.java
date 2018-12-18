package proyectoPNT;

import java.util.Collection;

public class AppDeProductos
{

	public static void main(String arg[])
	{

		Collection<Productos> list=Productos.cargaDeProd();
		Productos.ProductoMostrar(list);

		Productos.ProductoMostrarMayorPrec(list);
		Productos.ProductoMostrarMenorPrec(list);

	}
}
