export function findFirestoreIndex(index, arr) {
    return arr.find((val) => {
        if (val.id === index) return val;
    })
}