function merge(arrA, arrB) {
    const sorted = [];
    let a = 0, b = 0;

    while (a < arrA.length && b < arrB.length) {
        if (arrA[a] <= arrB[b]) {
            sorted.push(arrA[a]);
            a++;
        } else {
            sorted.push(arrB[b]);
            b++;
        }
    }

    // Append leftovers
    while (a < arrA.length) sorted.push(arrA[a++]);
    while (b < arrB.length) sorted.push(arrB[b++]);

    return sorted;
}

function mergeSort(arr) {
    if (arr.length < 2) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

module.exports = { merge, mergeSort };
