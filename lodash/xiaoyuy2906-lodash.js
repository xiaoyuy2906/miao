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
    },

    drop: function (array, n = 1) {
        if (n <= 0) {
            return array.slice()
        }
        var result = []
        for (var i = n; i < array.length; i++) {
            result.push(array[i])
        }
        return result
    },

    findIndex: function (array, predicate, fromIndex = 0) {
        if (typeof predicate == 'function') {
            for (var i = fromIndex; i < array.length; i++) {
                if (predicate(array[i])) {
                    return i
                }
            }
            return -1
        }
        if (typeof predicate == 'string') {
            for (var i = fromIndex; i < array.length; i++) {
                if (array[i][predicate]) {
                    return i
                }
            }
            return -1
        }
        if (typeof predicate == 'object') {
            if (Array.isArray(predicate)) {
                for (var i = fromIndex; i < array.length; i++) {
                    if (array[i][predicate[0]] == predicate[1]) {
                        return i
                    }
                }
                return -1
            } else {
                for (var i = fromIndex; i < array.length; i++) {
                    if (this.isEqual(array[i], predicate)) {
                        return i
                    }
                }
                return -1
            }
        }
    },

    isEqual: function (object, other) {
        if (object === other) {//判断 string, boolean, undefined, null, regexp, number(不包含NaN)
            return true
        }
        if (typeof object === typeof other) {    //判断类型
            if (typeof object == 'number') {
                if (Number.isNaN(object) && Number.isNaN(other)) {//number类型处理 NaN
                    return true
                }
            }
            if (typeof object == 'object') { //array,object
                if (Array.isArray(object) == true && Array.isArray(other) == true) {//都是array
                    let objectDense = Array.from(object)
                    let otherDense = Array.from(other)
                    if (objectDense.length == otherDense.length) {    //都是数组先判断长度
                        for (var i = 0; i < objectDense.length; i++) {
                            if (!this.isEqual(objectDense[i], otherDense[i])) {
                                return false
                            }
                        }
                        return true
                    } else {
                        return false
                    }
                }
                if (Array.isArray(object) == false && Array.isArray(other) == false) {//都是object
                    let objectKeys = Object.keys(object)
                    let otherKeys = Object.keys(other)  //Object.keys()过滤原型属性
                    if (objectKeys.length == otherKeys.length) {
                        for (var k of objectKeys) {
                            if (otherKeys.includes(k)) {
                                if (!this.isEqual(object[k], other[k])) {
                                    return false
                                }
                            } else {
                                return false
                            }
                        }
                        return true
                    }
                    return false
                }
                return false    // 一个是object，一个array
            }
        }
        return false
    }
}

// export { xiaoyuy2906 }