function pivot(arr, start = 0, end = arr.length - 1) {
    const swapValues = (a, b) => {
        [arr[a], arr[b]] = [arr[b], arr[a]];
    };

    const pivotValue = arr[start];
    let position = start;

    for (let i = start + 1; i <= end; i++) {
        if (arr[i] < pivotValue) {
            position++;
            swapValues(i, position);
        }
    }

    swapValues(start, position);
    return position;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left >= right) return arr;

    const pivotIdx = pivot(arr, left, right);
    quickSort(arr, left, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, right);

    return arr;
}

module.exports = { pivot, quickSort };
