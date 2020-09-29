# Dijkstra

> 최단 경로 알고리즘

* 네트워크 라우터가 최단 경로로 종점을 찾을 때 유용
* O((V+E)logV)

```python
from heapq import heapify, heappush, heappop

def dijkstra(graph, root):
    heapQ = heapify(list(graph.vertices))

    distance ={vertex: float('inf') for vertex in graph.vertices} # initalize the distances to infinity
    distance[root] = 0 # root vertex reset to 0

    previous = {vertex: None for vertex in graph.vertices} # the parent vertex of the current evaluating node

    while heapQ is not empty:
        u = heapQ.heappop() # logV
        for v in u.adjacentVertices: # E
            temp = distance[v] + edge(u, v)
            if temp < distance[v]:
                distance[v] = temp
                previous[v] = u
                heappush(heapQ, v) # V
    
    return distance, previous
```