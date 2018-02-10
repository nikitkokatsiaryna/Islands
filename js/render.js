(function (root) {

    root.visualizeSequence = function (sequence) {
        var i = 0;

        var intervalId = setInterval(function () {
            if (i >= sequence.length - 1) {
                clearInterval(intervalId);
            }

            switch (sequence[i].name) {
                case 'changeElement':
                    root.changeMapElement(sequence[i].element, sequence[i].i, sequence[i].j);
                    break;
                case 'updateCount':
                    root.updateCount(sequence[i].count);
                    break;
            }

            i++;
        }, 100);
    };

    root.updateCount = function (count) {
        var countElement = document.getElementsByClassName('map__res')[0];
        countElement.innerHTML = 'Count: ' + count;
    };

    root.changeMapElement = function (elementType, i, j) {
        var row = document.getElementsByClassName('map__row')[i];
        var element = row.getElementsByClassName('map__cell')[j];

        element.className = '';
        element.classList.add('map__cell');
        switch (elementType) {
            case 0:
                element.classList.add('map__cell_water');
                break;
            case 1:
                element.classList.add('map__cell_island');
                break;
            case 2:
                element.classList.add('map__cell_current');
                break;
        }
    };

    /**
     * Создает HTML элемент заданного типа с заданным CSS классом
     *
     * @param {string} type тип создаваемого HTML элемента
     * @param {string} className CSS класс
     * @param {string} [text] текст
     * @returns {HTMLElement} HTML элемент
     */
    function element(type, className, text) {
        var elem = document.createElement(type);
        elem.className = className;

        if (text) {
            elem.innerText = text;
        }

        return elem;
    }

    /**
     * Создает визуализацию карты по его схеме
     *
     * @param {number[][]} map карта островов
     * @param {number} count кол-во островов
     * @returns {HTMLElement} HTML элемент
     */
    function render(map, count) {
        var containerElem = element('div', 'map'),
            rowElem,
            type,
            row,
            cell,
            x,
            y;

        containerElem.appendChild(element('div', 'map__res', 'Count: ' + Number(count)));

        for (y = 0; y < map.length; y++) {
            row = map[y];
            rowElem = element('div', 'map__row');

            for (x = 0; x < row.length; x++) {
                cell = row[x];

                switch (cell) {
                    case root.WATER:
                        type = 'water';
                        break;

                    case root.ISLAND:
                        type = 'island';
                        break;

                    default:
                        type = undefined;
                }

                rowElem.appendChild(
                    element('div', 'map__cell' + (type ? ' map__cell_' + type : ''))
                );
            }

            containerElem.appendChild(rowElem);
        }

        return containerElem;
    }

    root.render = render;
})(this.SHRI_ISLANDS);
