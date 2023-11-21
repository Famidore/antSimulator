function readParams(params) {
    var initData = initParams[params];
    var returnedData = [];

    for (let i = 0; i < initData.length; i++) {
        if (initData[i] != [null, null] && initData[i] != [null])
        returnedData.push(initData[i]);
    }

    return returnedData;
}