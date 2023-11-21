function ifContains(arr, elem) {
    for (let i of arr) {
        if (i[0] == elem[0]) {
            if (i[1] == elem[1]) {
                return true
            }
        }
    }
    return false
}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
  }