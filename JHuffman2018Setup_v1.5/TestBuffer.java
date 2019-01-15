package jhuffman;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.Reader;

public class TestBuffer
{
	public static void main(String[] args)
	{
		FileInputStream fis=null;
		BufferedReader br=null;
		InputStreamReader isr = null;
		try
		{
			fis=new FileInputStream("c:/temp/a.rar");// abre el archivo para leer
			isr = new InputStreamReader(fis);
			br=new BufferedReader(isr,1);
			
			long inicio = System.currentTimeMillis();
			
			long n=0;
			int c = br.read();
			while( c>=0 )
			{
				n++;
				c = br.read();
			}

			long fin = System.currentTimeMillis();

			
			System.out.println("Cantidad: "+n);
			
			long segs = (fin-inicio)/1000;
			System.out.println("Tardo: "+segs+" segundos");
			
			br.close();
			isr.close();
			fis.close();

		}
		catch(Exception e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
}
