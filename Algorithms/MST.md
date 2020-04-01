# MST (Minimum Spanning Tree)

> 최소 신장 트리

## Prim Algorithm
* heapq 갱신
* O(ElogV)
```python
# weighted graph `G`, edge `w`, root `r`
def MST-Prim(G, w, r):
    for u in G.V: # vertex `u`
        u.key = float('inf')
        u.parent = None # setting the parent doesn't really matter
    r.key = 0
    Q = G.V # type(Q) == heapq
    while Q:
        u = heappop(Q)
        for v in G.Adj[u]: # Adjacency matrix `Adj`
            if (v is in Q and w(u, v) < v.key):
                v.parent = u
                v.key = w(u, v)
```

## Kruskal Algorithm
* union-find 및 rank 유지
* O(ElogV)
```python
parent = {}
rank = {}

def makeSet(v):
    parent[v] = v
    rank[v] = 0

def find(): # recursive method to find the parent
    if parent[v] != v:
        parent[v] = find(parent[v])
    return parent[v]

def union(u, v):
    root1 = find(u)
    root2 = find(v)
    if root1 != root2:
        if rank[root1] > rank[root2]: # higher rank is better off to be the main root
            parent[root2] = root1
        else:
            parent[root1] = root2
            if rank[root1] == rank[root2]:
                rank[root2] += 1

# weighted graph `G`, edge `w`
def MST-Kruskal(G, w):
    A = None # MST Set
    for v in G.V:
        makeSet(v)
    for w(u, v) in sorted(G.E):
        if find(u) != find(v): # different parent node
            union(u, v)
            A.append(w(u, v))
    return A
```