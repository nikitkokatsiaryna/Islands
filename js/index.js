(function (root) {
    var map = root.MAP;

    document.querySelector('.outer').appendChild(root.render(map, 0));

    var solutionResult = root.visualizeSolution(map);
    root.visualizeSequence(solutionResult.sequence);

})(this.SHRI_ISLANDS);
