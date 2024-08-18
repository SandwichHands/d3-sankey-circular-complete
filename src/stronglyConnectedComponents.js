// stronglyConnectedComponents.js

function tarjan(g) {
  var index = 0;
  var stack = [];
  var result = { components: [] };
  var vertexIndices = {};
  var vertexLowLinks = {};

  function strongconnect(v) {
    vertexIndices[v] = index;
    vertexLowLinks[v] = index;
    index += 1;
    stack.push(v);

    if (g[v]) {
      g[v].forEach(function (w) {
        if (!(w in vertexIndices)) {
          strongconnect(w);
          vertexLowLinks[v] = Math.min(vertexLowLinks[v], vertexLowLinks[w]);
        } else if (stack.indexOf(w) !== -1) {
          vertexLowLinks[v] = Math.min(vertexLowLinks[v], vertexIndices[w]);
        }
      });
    }

    if (vertexLowLinks[v] === vertexIndices[v]) {
      var component = [];
      var w;
      do {
        w = stack.pop();
        component.push(w);
      } while (w !== v);
      result.components.push(component);
    }
  }

  Object.keys(g).forEach(function (v) {
    if (!(v in vertexIndices)) {
      strongconnect(v);
    }
  });

  return result;
}

export { tarjan };
