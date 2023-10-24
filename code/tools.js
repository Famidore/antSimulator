function ifContains(arr, elem){
    for (let i of arr){
        if (JSON.stringify(i) == JSON.stringify(elem)){
            return true
        }
    }
    return false
}