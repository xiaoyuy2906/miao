var xiaoyuy2906 = {
    compact: function (array) {
        /* return array.filter(item => item) */

        var result = []
        for (var item of array) {
            if (item) {
                result.push(item)
            }
        }
        return result   //不用slice实现
    },

    chunk: function (array, size) {
        var result = []
        var s = Math.floor(size)
        if (s < 1) {
            return result
        } else if (array.length <= s) {
            result.push(array)
            return result
        } else {
            // for (var i = 0; i < array.length; i += s) {
            //     result.push(array.slice(i, i + s))
            // }
            var currentArr = []
            for (var i = 0; i < array.length; i++) {
                if ((i + 1) % s == 0) {
                    currentArr.push(array[i])
                    result.push(currentArr)
                    currentArr = []
                } else {
                    currentArr.push(array[i])
                }
            }
            if (currentArr.length > 0) {
                result.push(currentArr)
            }
            return result   //不用slice实现
        }
    },

    fill: function (array, value, start = 0, end = array.length) {
        var myArr = Array.from(array)
        return myArr.slice(0, start).concat(myArr.slice(start, end).map(it => value)).concat(myArr.slice(end))
    }
}