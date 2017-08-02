/**
 * JS implementation of an undirected Graph.
 * TODOs: 1. Add weights for the edges. 
 *  	  2. Add support for loops.
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
	_this.removeEdge = removeEdge;
	_this.areConnected = areConnected;
	_this.depthFirstSearch = depthFirstSearch;
	_this.breadthFirstSearch = breadthFirstSearch;
	_this.pathTo = pathTo;

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

	/* Adds an edge in the graph */
	function addEdge(fromVertex, toVertex) {
		if(!_this.graph[fromVertex] || !_this.graph[toVertex]) {
			console.log('One of the vertices, ' + fromVertex + ' or ' + toVertex + ' does not exist in graph. Please add that vertex first using addVertex method.');
		}
		else {
			_this.graph[fromVertex][toVertex] = '';
			_this.graph[toVertex][fromVertex] = '';
		}
	}

	/* Removes an edge from the graph */
	function removeEdge(fromVertex, toVertex) {
		if(!_this.graph[fromVertex] || !_this.graph[toVertex]) {
			console.log('One of the vertices, ' + fromVertex + ' or ' + toVertex + ' does not exist in graph. Please add that vertex first using addVertex method.');
		}
		else {
			delete _this.graph[fromVertex][toVertex];
			delete _this.graph[toVertex][fromVertex];
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

	/* Function to check if there is an edge between 2 vertices */
	function areConnected(fromVertex, toVertex) {
		var isPresent = false;
		var adjacent = _this.adjacentVertices(fromVertex);
		Object.keys(adjacent).forEach(function(vertex) {
			if(Number(adjacent[vertex]) === toVertex) {
				isPresent = true;
			}
		});

		return isPresent;
	}

	/* Implementation of depth first search. Returns the order in which elements are traversed */
	function depthFirstSearch(vertex) {
		var _isVisited = {};
		var order = [];
		return _dfs(vertex, _isVisited, order);
	}

	function _dfs(vertex, _isVisited, order, _edgeTo) {
		_isVisited[vertex] = true;
		if(order) {
			order.push(vertex);
		}
		var adjacentNodes = _this.adjacentVertices(vertex);
		Object.keys(adjacentNodes).forEach(function(adjVertex) {
			if(!_isVisited[adjacentNodes[adjVertex]] === true) {
				if(_edgeTo) {
					_edgeTo[adjacentNodes[adjVertex]] = vertex;
				}
				_dfs(adjacentNodes[adjVertex], _isVisited, order, _edgeTo);
			}
		});
		return _edgeTo ? _edgeTo : order;
	}

	/* Returns the path between 2 vertices in the graph. If path does not exists, then returns undefined.
	 * Uses DFS or BFS to find the path depending on isDfs param.
	 */
	function pathTo(fromVertex, toVertex, isDfs) {
		var _edgeTo = {};
		var _isVisited = {};
		var path = [];
		if(isDfs) {
			_edgeTo = _dfs(fromVertex, _isVisited, undefined, _edgeTo);
		}
		else {
			_edgeTo = _bfs(fromVertex, _isVisited, undefined, _edgeTo);
		}

		if(!_edgeTo[toVertex]) {
			return;
		}
		while(_edgeTo[toVertex] !== fromVertex) {
			path.push(toVertex);
			toVertex = _edgeTo[toVertex];
		}
		path.push(toVertex);
		path.push(fromVertex);
		return path.reverse();
	}

	/* Implementation of breadth first search */
	function breadthFirstSearch(vertex) {
		var _isVisited = {};
		var order = [];
		return _bfs(vertex, _isVisited, order);
	}

	function _bfs(vertex, _isVisited, order, _edgeTo) {
		_isVisited[vertex] = true;
		if(order) {
			order.push(vertex);
		}
		var queue = [];
		queue.push(vertex);
		while(queue.length > 0) {
			var element = queue.pop();
			var adjacentNodes = _this.adjacentVertices(element);
			Object.keys(adjacentNodes).forEach(function(adjVertex) {
				if(!_isVisited[adjacentNodes[adjVertex]]) {
					if(_edgeTo) {
						_edgeTo[adjacentNodes[adjVertex]] = element;
					}
					_isVisited[adjacentNodes[adjVertex]] = true;
					queue.push(adjacentNodes[adjVertex]);
					if(order) {
						order.push(adjacentNodes[adjVertex]);
					}
				}
			});
		}

		return _edgeTo ? _edgeTo : order;
	}
}
