from fastapi import FastAPI
from pydantic import BaseModel
from typing import Any, Dict, List
from fastapi.middleware.cors import CORSMiddleware
from collections import deque


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: Any 

class Edge(BaseModel):
    id: Any = None
    source: Any
    target: Any

class Pipeline(BaseModel):
    nodes: List[Node] = []
    edges: List[Edge] = []

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: Pipeline):
    # Basic counts
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # Defensive defaults
    if num_nodes == 0:
        return {"num_nodes": 0, "num_edges": num_edges, "is_dag": True}

    # Prepare adjacency map and indegree map
    node_ids = [n.id for n in pipeline.nodes]
    # Use dicts keyed by node id
    adj: Dict[Any, List[Any]] = {nid: [] for nid in node_ids}
    indeg: Dict[Any, int] = {nid: 0 for nid in node_ids}

    # Build adjacency / indegree using edges that reference node ids in node_ids
    for e in pipeline.edges:
        src = e.source
        tgt = e.target
        # Only consider edges where both endpoints are known node ids
        if src in adj and tgt in adj:
            adj[src].append(tgt)
            indeg[tgt] += 1
        else:
            # If source/target not in nodes list, skip or handle as needed
            pass

    # Kahn's algorithm to detect cycle (is DAG if topological ordering covers all nodes)
    q = deque([nid for nid, d in indeg.items() if d == 0])
    visited = 0
    while q:
        u = q.popleft()
        visited += 1
        for v in adj.get(u, []):
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)

    is_dag = (visited == num_nodes)

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}