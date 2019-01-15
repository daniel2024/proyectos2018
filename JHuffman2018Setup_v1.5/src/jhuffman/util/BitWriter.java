package jhuffman.util;

import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import java.io.OutputStreamWriter;
import java.io.RandomAccessFile;

public class BitWriter {
    // @SuppressWarnings("unused")
    private RandomAccessFile raf = null;
    private FileOutputStream fos = null;
    private OutputStreamWriter os = null;
    private BufferedWriter bw = null;
    private int posicion = 0;

    public BitWriter(String filename) {
	try {
	    fos = new FileOutputStream(filename);
	    os = new OutputStreamWriter(fos);
	    bw = new BufferedWriter(os);
	    raf = new RandomAccessFile(filename, "rw");

	} catch (FileNotFoundException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	    throw new RuntimeException(e);
	}
    }

    public void writeBit(int bit) throws IOException {

	raf.write(bit);
    }

    public void writeCodigo(String cod) throws IOException {
	posicion = posicion + cod.length();
	raf.writeBytes(cod);
    }

    public void writeTamCod(Long cap) throws IOException

    {

	raf.writeLong(cap);
    }

    public int compresionBit(char bit, char d) {
	d = (char) (d << 1);
	if (bit == '1') {
	    d |= 0X01;

	}
	return d;
    }

    public void writeCodificado(String encriptado) throws IOException {
	int i = 0;
	char t = 0;
	// System.out.println(encriptado.length());
	while (i < encriptado.length()) {

	    for (int f = 0; f < 8; f++) {
		// System.out.print(encriptado.charAt(i));
		t = (char) compresionBit(encriptado.charAt(i), t);// va
								  // comprimiendo
								  // en 8 bits
		i++;

	    }

	    raf.write(t);// escribe en el archivo el byte comprimido
	    t = 0;

	    if (encriptado.length() - i < 8) {

		for (int f = 0; f < encriptado.length() - i; f++) {
		    t = (char) compresionBit(encriptado.charAt(i), t);

		}
		int resto = encriptado.length() - i;
		t = (char) (t << (8 - resto));
		raf.write(t);// escribe en el archivo el byte comprimido
		break;
	    }

	}
	raf.close();
    }

    public void flush() {
	// programar aqui
    }

    public void close() throws IOException {
	bw.close();
	os.close();
	fos.close();

    }
}
