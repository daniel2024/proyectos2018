package jhuffman;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.RandomAccessFile;

public class TestBuffer
{
	public static void main(String[] args)
	{
		FileInputStream fis=null;
		BufferedReader br=null;
		InputStreamReader isr = null;
		
		 FileOutputStream fos=null;
		 OutputStreamWriter os= null;
		 BufferedWriter bw=null;
		 RandomAccessFile raf=null;
		try
		{
			fis=new FileInputStream("cocorito.txt.huf");// abre el archivo para leer
			isr = new InputStreamReader(fis);
			br=new BufferedReader(isr,1);
			fos =new FileOutputStream("yin_yan.bmp");
			os=new  OutputStreamWriter (fos);
			bw=new BufferedWriter(os,1);
		
			
			long inicio = System.currentTimeMillis();
			
			long n=0;
			int c =br.read();
			while( br.ready() )
			{System.out.println(c);
				bw.write(c);
				n++;
				c =(char)br.read();
				
				
			}
			System.out.println(c);
			long fin = System.currentTimeMillis();

			
			System.out.println("Cantidad: "+n);
			
			long segs = (fin-inicio)/1000;
			System.out.println("Tardo: "+segs+" segundos");
			
			br.close();
			isr.close();
			fis.close();
			bw.close();
			os.close();
			fos.close();

		}
		catch(Exception e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
}
