package jhuffman.util;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.RandomAccessFile;

import jhuffman.ds.Node;

public class BitReader {

    private RandomAccessFile raf = null;
    private FileInputStream fis = null;
    private InputStreamReader isr = null;
    private BufferedReader br = null;

    public BitReader(String filename) throws IOException {

	try {
	    fis = new FileInputStream(filename);
	    isr = new InputStreamReader(fis);
	    br = new BufferedReader(isr);
	    raf = new RandomAccessFile(filename, "r");
	} catch (FileNotFoundException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	    throw new RuntimeException(e);
	}
    }

    public int readBit() {
	int a = 0;
	try {
	    a = br.read();
	    if (a < 0 || a > 256) {

		a = 256;
	    }
	    return a;
	} catch (Exception e) {
	    e.printStackTrace();
	    throw new RuntimeException(e);
	}
    }

    public boolean eof() throws IOException {
	return br.ready();

    }

    public void close() throws IOException {
	br.close();
	isr.close();
	fis.close();
    }

    public long readTam() throws IOException {
	int i = 0;
	long d = raf.readLong();
	while (i < 8) {
	    br.read();
	    i++;
	}
	raf.close();
	return d;
    }

    public void leoArbolDeArchivo(String[] vector) throws IOException {
	int caracteres = raf.read();
	br.read();
	int i = 0;

	while (i < caracteres) {
	    int pos = raf.read();
	    br.read();
	    vector[pos] = "";
	    int cantCod = raf.read();
	    br.read();
	    for (int j = 0; j < cantCod; j++) {
		vector[pos] = vector[pos] + (char) raf.read();
		br.read();

	    }
	    i++;
	}

    }

    public static Node recorNode(Node padre, char bit) {

	// System.out.println(aux.hashCode());
	Node aux = padre;
	if (bit == '1') {

	    aux = aux.getDer();
	} else {
	    aux = aux.getIzq();
	}
	return aux;
    }

    public String decodifico(String trama, Node arbol, long tam) throws IOException {
	int l = 0;
	StringBuilder menz = new StringBuilder();
	Node aux = arbol;
	int c = 0;
	;
	// int f=0;System.out.println(trama.charAt(2));
	while (br.ready()) {

	    int pos = (char) br.read();

	    System.out.println(pos);
	}
	/*
	 * while(l<10) {
	 * 
	 * c=trama.charAt(l); // System.out.println((char)c); for(int
	 * i=7;i>=0;i--){
	 * 
	 * if(aux.getC()<256){ menz.append(aux.getC()); //
	 * System.out.println((char)aux.getC()); aux=arbol;l++; } else {
	 * f=((c>>i)%2); if (f==0){
	 * 
	 * aux= recorNode(aux,'0'); } else{ aux= recorNode(aux,'1'); }
	 * //System.out.println(f); } }
	 * 
	 * 
	 * }
	 */
	return menz.toString();
    }

}
