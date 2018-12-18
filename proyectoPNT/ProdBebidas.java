package proyectoPNT;

public class ProdBebidas extends Productos
{
	public ProdBebidas(String nombre,Double precio,Double contenido)
	{
		super(nombre,precio);
		Contenido=contenido;
	}

	private Double Contenido;

	public Double getContenido()
	{
		return Contenido;
	}

	public void setContenido(Double contenido)
	{
		Contenido=contenido;
	}

	@Override
	public String toString()
	{
		String a=null;
		if(getPrecio()-getPrecio().intValue()==0)
		{
			a=String.format("%.0f",getPrecio());
		}
		else
		{
			a=getPrecio().toString();

		}
		return "Nombre="+getNombre()+"///Litros:"+Contenido+"///Precio:$"+a;
	}
}
