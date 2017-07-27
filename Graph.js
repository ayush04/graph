/**
 * JS implementation of an undirected Graph.
 * TODOs: 1. Add weights for the edges. 
 *		  2. Add support for loops.
 */
function Graph(vertex) {
	var graph = {};
	_this = this;
	_this.graph = graph;
	_this.graph[vertex] = {};
	_this.getGraph = getGraph;
	_this.addVertex = addVertex;
	_this.numberOfVertices = numberOfVertices;
	_this.numberOfEdges = numberOfEdges;
	_this.addEdge = addEdge;
	_this.adjacentVertices = adjacentVertices;
	_this.getDegree = getDegree;
	_this.maxDegree = maxDegree;
	_this.averageDegree = averageDegree;

	/* Returns current graph */
	function getGraph() {
		return _this.graph;
	}

	/* Add a vertex to graph */
	function addVertex(vertex, connectedVerticesArr) {
		_this.graph[vertex] = {};
		if(connectedVerticesArr) {
			connectedVerticesArr.forEach(function(newVertex) {
				if(!_this.graph[newVertex]) {
					_this.graph[newVertex] = {};
				}
				_this.graph[newVertex][vertex] = '';
				_this.graph[vertex][newVertex] = '';
			});
		}
	}

	/* Returns the number of vertices in the graph */
	function numberOfVertices() {
		return Object.keys(_this.graph).length;
	}

	/* Returns the number of edges in the graph */
	function numberOfEdges() {
		var keys = Object.keys(_this.graph);
		var edges = 0;
		keys.forEach(function(key) {
			edges += Object.keys(_this.graph[key]).length;
		});

		return edges/2;
	}

	/* Adds a edge in the graph */
	function addEdge(fromVertex, toVertex) {
		if(!_this.graph[fromVertex] || !_this.graph[toVertex]) {
			console.log('One of the vertices, ' + fromVertex + ' or ' + toVertex + ' does not exist in graph. Please add that vertex first using addVertex method.');
		}
		else {
			_this.graph[fromVertex][toVertex] = '';
			_this.graph[toVertex][fromVertex] = '';
		}
	}

	/* Returns an array of edges adjacent to a vertex */
	function adjacentVertices(vertex) {
		return Object.keys(_this.graph[vertex]);
	}

	/* Returns degree of a vertex */
	function getDegree(vertex) {
		return Object.keys(_this.adjacentVertices(vertex)).length;
	}

	/* Returns maximum degree of a graph */
	function maxDegree() {
		var maxDeg = 0;
		var vertices = Object.keys(_this.graph);
		vertices.forEach(function(vertex) {
			var degOfVertex = _this.getDegree(vertex);
			if(degOfVertex > maxDeg) {
				maxDeg = degOfVertex;
			}
		});

		return maxDeg;
	}

	/* Returns average degree of the graph */
	function averageDegree() {
		return _this.numberOfEdges() / _this.numberOfVertices();
	}
}