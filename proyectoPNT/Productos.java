package proyectoPNT;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public abstract class Productos implements Comparable<Productos>
{
	//De existir mas variacion de productos se ira agregando mas clases hijas de esta
	
	private String Nombre;
	private Double Precio;

	public Productos(String nombre,Double precio)
	{

		Nombre=nombre;
		Precio=precio;
	}

	public String getNombre()
	{
		return Nombre;
	}

	public void setNombre(String nombre)
	{
		Nombre=nombre;
	}

	public Double getPrecio()
	{
		return Precio;
	}

	public void setPrecio(Double precio)
	{
		Precio=precio;
	}

	public static Collection<Productos> cargaDeProd()
	{

		ArrayList<Productos> v=new ArrayList<Productos>();

		// se carga la lista con los productos(harcodeado esta vez) ,de ser
		// posible que los productos
		// vengan de un archivo o un base de datos solo se tendria que modificar
		// la insercion
		// de los elementos agregando un metodo sin modificar los demas
		v.add(new ProdBebidas("Coca-cola Zero",20.0,1.5));
		v.add(new ProdBebidas("Coca-cola ",18.0,1.5));
		v.add(new ProdHigiene("Shampoo Sedal",19.0,500));
		v.add(new ProdFrutas_Verdurasn("Frutillas",64.0,1.0));

		return v;
	}

	public static void ProductoMostrar(Collection<Productos> list)
	{

		for(Productos a:list)
		{

			System.out.println(a.toString());
		}
	}

	public static void ProductoMostrarMayorPrec(Collection<Productos> list)
	{

		System.out.println("================");
		Collections.sort((ArrayList<Productos>)list);
		System.out.println("Producto mas caro:"+((ArrayList<Productos>)list).get(0).getNombre());

	}

	public static void ProductoMostrarMenorPrec(Collection<Productos> list)
	{

		Collections.sort((ArrayList<Productos>)list);
		int ultimo=((ArrayList<Productos>)list).size()-1;
		System.out.println("Producto mas barato:"+((ArrayList<Productos>)list).get(ultimo).getNombre());

	}

	@Override
	public int compareTo(Productos o)
	{
		// es ordenado por precio de menor a mayor
		return (o.getPrecio()-this.Precio>0)?1:(o.getPrecio()-this.Precio<0)?-1:0;
	}

}
