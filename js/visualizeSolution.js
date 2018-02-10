(function (root) {

    var lastElement;

    function deleteIsland(array, i, j, sequence) {
        if (i < 0 || j < 0 || i >= array.length || j > array[0].length || array[i][j] !== 1) {
            return;
        }

        lastElement = array[i][j] = root.WATER;

        sequence.push({
            name: 'changeElement',
            element: root.WATER,
            i: i,
            j: j
        });

        deleteIsland(array, i + 1, j, sequence);
        deleteIsland(array, i - 1, j, sequence);
        deleteIsland(array, i, j + 1, sequence);
        deleteIsland(array, i, j - 1, sequence);
        deleteIsland(array, i + 1, j + 1, sequence);
        deleteIsland(array, i - 1, j - 1, sequence);
        deleteIsland(array, i - 1, j + 1, sequence);
        deleteIsland(array, i + 1, j - 1, sequence);
    }

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    root.visualizeSolution = function visualizeSolution(map) {
        var islandsCount = 0;
        var sequence = [];

        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
                lastElement = map[i][j];

                sequence.push({
                    name: 'changeElement',
                    element: root.CURRENT,
                    i: i,
                    j: j
                });

                if (map[i][j] === root.ISLAND) {
                    deleteIsland(map, i, j, sequence);
                    islandsCount++;

                    sequence.push({
                        name: 'updateCount',
                        count: islandsCount
                    });
                }

                sequence.push({
                    name: 'changeElement',
                    element: lastElement,
                    i: i,
                    j: j
                });
            }
        }

        return {
            islandsCount: islandsCount,
            sequence: sequence
        };
    }
})(this.SHRI_ISLANDS);
