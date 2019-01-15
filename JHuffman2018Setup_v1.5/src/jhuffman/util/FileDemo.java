package jhuffman.util;

import java.io.IOException;
//import java.io.RandomAccessFile;

public class FileDemo 
{
	public static void main(String args[]) 
	{
		
		try {
			BitReader f=new BitReader("cocorito.txt");
			
			int c ;
			
			while(f.eof()) {
				 c =f.readBit();
				System.out.print((char)c);
			}
			f.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
}
}
