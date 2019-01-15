package jhuffman.util;

import jhuffman.ds.Node;

public class Arbol
{

	Node raiz=null;
	  /* Contructories */    
    public Arbol( int valor ) {
        this.raiz = new Node( valor );
    }
 
    public Arbol( Node raiz ) {
        this.raiz = raiz;
    }
 
    /* Setters y Getters */
    public Node getRaiz() {
        return raiz;
    }
 
    public void setRaiz(Node raiz) {
        this.raiz = raiz;
    }
 

    public static Node addNode(Node padre,char bit){
    	
    	Node aux=new Node(265);
    //	System.out.println(aux.hashCode());
    		
    	
    	if('1'==bit){
    		if(padre.getDer()==null)
    		{padre.setDer(aux);}
    		else{
    			
    			return padre.getDer(); }
    	}
    	else{
    		if(padre.getIzq()==null)
    		{padre.setIzq(aux);}
    		else{return padre.getIzq(); }
    		
    	}
    	return aux;
    	
    }


public  Node creoArbol(String codigos[]){
	
	Arbol r=new Arbol(265);
	Node aux=r.raiz;
	int d=0;
	while(d<codigos.length)
	{
		if(codigos[d]!=null){
		for(int i=0;i<codigos[d].length();i++)
	{
		aux=addNode(aux,codigos[d].charAt(i));
	}
	aux.setC(d);

	aux=r.raiz;
		}
	d++;
	}
//	System.out.println(r.raiz.getDer().getIzq().getIzq());
//	System.out.println(r.raiz.getDer().hashCode());
	return r.raiz;
}
	
}