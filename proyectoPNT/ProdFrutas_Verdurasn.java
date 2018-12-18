package proyectoPNT;

public class ProdFrutas_Verdurasn extends Productos
{
	private Double Cantidad;

	public ProdFrutas_Verdurasn(String nombre,Double precio,Double cantidad)
	{
		super(nombre,precio);
		Cantidad=cantidad;
	}

	public Double getCantidad()
	{
		return Cantidad;
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
		return "Nombre="+getNombre()+"///Precio:$"+a+"///Unidad de venta:kilo";
	}

	public void setCantidad(Double cantidad)
	{
		Cantidad=cantidad;
	}

}
