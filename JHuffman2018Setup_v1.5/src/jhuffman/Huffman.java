package jhuffman;

import java.io.IOException;

//import java.io.IOException;

import java.util.Comparator;

import jhuffman.ds.Node;
import jhuffman.util.BitReader;
import jhuffman.util.BitWriter;
import jhuffman.util.SortedList;
import jhuffman.util.TreeUtil;
import jhuffman.util.Arbol;

public class Huffman {
    public static void main(String[] args) {
	System.out.println("inicio");
	String filename = "cocorito.txt";
	if (filename.endsWith(".huf")) {
	    descomprimir(filename);
	} else {
	    comprimir(filename);
	}
    }

    public static void comprimir(String filename) {
	try { // leo el archivo y cargo el vector
	    BitReader f = new BitReader(filename);
	    int vect[] = new int[257];
	    int i = 0;
	    long total = 0;// almaceno la cantidad total de bytes en el archivo
	    while (i < 257) {
		vect[i] = 0;
		i++;
	    }
	    i = 0;
	    while (f.eof()) {
		int pos = f.readBit();

		vect[pos] = vect[pos] + 1;
		i++;

	    }
	    System.out.println(i);
	    f.close();// cierro el archivo
	    SortedList<Node> lst = new SortedList<>();// creo la lista con el
						      // vector cargado

	    Comparator<Node> cmp = new CmpNode();
	    i = 0;

	    while (i < 256) {
		if (vect[i] != 0) {
		    Node aux = new Node(i, vect[i], null, null);
		    total += vect[i];

		    lst.add(aux, cmp);

		}

		i++;
	    }
	    int cantidadDeLetras = lst.size();
	    long contador = 0;
	    i = 0;
	    int t = 1;

	    while (contador < total) {

		Node aux = new Node(256 + t, (lst.get(i)).getN() + (lst.get(i + 1)).getN(), lst.get(i + 1), lst.get(i));
		lst.add(aux, cmp);
		contador = (lst.get(i)).getN() + (lst.get(i + 1)).getN();
		i = i + 2;
		t++;

	    }
	    StringBuffer sb = new StringBuffer();
	    TreeUtil ut = new TreeUtil(lst.get(i));
	    String codigos[] = new String[256];
	    // primera hoja
	    Node x = ut.next(sb);

	    BitWriter file = new BitWriter(filename + ".huf");// creo el archivo
							      // a
	    // escribir

	    file.writeBit(cantidadDeLetras);
	    while (x != null) {
		// muestro el codigo Huffman

		codigos[x.getC()] = sb.substring(0);
		// System.out.println((char)x.getC()+":"+sb);
		file.writeBit(x.getC());
		file.writeBit(codigos[x.getC()].length());
		file.writeCodigo(codigos[x.getC()]);

		// siguiente hoja
		x = ut.next(sb);
	    }
	    file.writeTamCod(total);
	    System.out.println(total);

	    f = new BitReader(filename);
	    StringBuilder codificado = new StringBuilder();// almacena el
							   // archivo
							   // codificado;

	    i = 0;
	    while (f.eof()) {

		int pos = f.readBit();
		if (pos < 256) {
		    codificado.append(codigos[pos]);
		} // System.out.print(codigos[po]);

	    }

	    file.writeCodificado(codificado.toString());

	    file.close();
	    f.close();

	    System.out.println("FINALIZO");

	} catch (Exception e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	    throw new RuntimeException();
	}

    }

    public static void descomprimir(String filename) {
	try {
	    BitReader f = new BitReader(filename);
	    int i = 0;
	    String caracteres[] = new String[256];

	    f.leoArbolDeArchivo(caracteres);
	    long tam = f.readTam();

	    i = 0;

	    Node raiz = new Node();
	    Arbol r = new Arbol(265);
	    raiz = r.creoArbol(caracteres);

	    // StringBuilder codificado=new StringBuilder();// almacena el
	    // archivo codificado;
	    String k = "";
	    i = 0;

	    while (f.eof()) {

		int pos = f.readBit();

		System.out.println(pos);
	    }

	    // f.decodifico(k,raiz, tam);

	    f.close();
	}

	catch (IOException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	}
    }

    static class CmpNode implements Comparator<Node> {
	@Override
	public int compare(Node a, Node b) {
	    return (int) (a.getN() - b.getN());
	}

    }

}