function ifContains(arr, elem){
    for (let i of arr){
        if (i[0] == elem[0]){
            if (i[1] == elem[1]){
                return true
            }
        }
    }
    return false
}