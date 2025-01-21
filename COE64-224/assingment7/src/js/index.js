const removeCat = (arr, name) => {
    const index = arr.indexOf(name);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

const swap = (arr, a, b) => {
    try {
        const indexA = arr.indexOf(a);
        const indexB = arr.indexOf(b);

        if (indexA > -1 && indexB > -1) {
            let temp = cats[indexA];
            cats[indexA] = cats[indexB];
            cats[indexB] = temp;
        } else {
            console.log("Not Find");
        }
    } catch (e) {
        console.log(e)
    }
}

let cats = ['Siamese Cat', 'British Shorthair', 'Ragdoll'];

cats.push('Maine Coon');

removeCat(cats, 'Ragdoll')

swap(cats, 'Siamese Cat', 'British Shorthair')

cats.unshift('Scottish Fold');

console.log(cats);
