function selectionSort(list) {
    const swap = (i, j) => {
        [list[i], list[j]] = [list[j], list[i]];
    };

    for (let i = 0; i < list.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < list.length; j++) {
            if (list[j] < list[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            swap(i, minIndex);
        }
    }

    return list;
}

module.exports = selectionSort;
