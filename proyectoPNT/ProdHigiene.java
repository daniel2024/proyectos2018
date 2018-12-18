package proyectoPNT;

public class ProdHigiene extends Productos
{

	private int Contenido;

	public ProdHigiene(String nombre,Double precio,int contenido)
	{
		super(nombre,precio);
		Contenido=contenido;
	}

	public int getContenido()
	{
		return Contenido;
	}

	public void setContenido(int contenido)
	{
		Contenido=contenido;
	}

	@Override
	public String toString()
	{
		String a=null;// se hace esto para ver si el producto a mostrar lleva
						// numeros despues de la coma
		if(getPrecio()-getPrecio().intValue()==0)
		{
			a=String.format("%.0f",getPrecio());
		}
		else
		{
			a=getPrecio().toString();

		}
		return "Nombre="+getNombre()+"///Contenido:"+Contenido+"ml///Precio:$"+a;
	}
	
}
