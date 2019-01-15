package jhuffman.util;

import jhuffman.ds.Node;
import java.util.Comparator;
import java.util.LinkedList;

@SuppressWarnings("serial")
public class SortedList<T> extends LinkedList<T> {

    public void add(T t, Comparator<T> cmpTT) {
	int i = 0;
	while (i < size() && cmpTT.compare(get(i), t) <= 0) {
	    i++;
	}

	add(i, t);
    }

    static class CmpInteger implements Comparator<Integer> {
	@Override
	public int compare(Integer a, Integer b) {
	    return a - b;
	}

	static class CmpNode implements Comparator<Node> {
	    @Override
	    public int compare(Node a, Node b) {
		return (int) (a.getN() - b.getN());
	    }

	}

    }
}
