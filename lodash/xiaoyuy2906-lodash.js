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

    findLastIndex: function (array, predicate, fromIndex = array.length - 1) {
        if (typeof predicate == 'function') {
            for (var i = fromIndex; i >= 0; i--) {
                if (predicate(array[i])) {
                    return i
                }
            }
            return -1
        }
        if (typeof predicate == 'string') {
            for (var i = fromIndex; i >= 0; i--) {
                if (array[i][predicate]) {
                    return i
                }
            }
            return -1
        }
        if (typeof predicate == 'object') {
            if (Array.isArray(predicate)) {
                for (var i = fromIndex; i >= 0; i--) {
                    if (array[i][predicate[0]] == predicate[1]) {
                        return i
                    }
                }
                return -1
            } else {
                for (var i = fromIndex; i >= 0; i--) {
                    if (this.isEqual(array[i], predicate)) {
                        return i
                    }
                }
                return -1
            }
        }
    },

    flatten: function (array) {//Flattens array a single level deep
        return array.reduce((acc, cur) => {
            if (Array.isArray(cur)) {
                // acc = acc.concat(cur)   // 重新创建并替换 acc
                acc.push(...cur)        //它直接修改 acc 本身，不会创建新数组
            } else {
                acc.push(cur)
            }
            return acc
        }, [])
    },

    flattenDeep: function (array) {//Recursively flattens array
        // var result = []
        // for (var i = 0; i < array.length; i++) {
        //     if (Array.isArray(array[i])) {
        //         result.push(...this.flattenDeep(array[i]))
        //     } else {
        //         result.push(array[i])
        //     }
        // }
        // return result

        return array.reduce((acc, cur) => {
            Array.isArray(cur) ? acc.push(...this.flattenDeep(cur)) : acc.push(cur)
            return acc
        }, [])//高阶函数写法
    },

    flattenDepth: function (array, depth = 1) {
        return array.reduce((acc, cur) => {
            (Array.isArray(cur) && depth > 0) ? acc.push(...this.flattenDepth(cur, depth - 1)) : acc.push(cur)
            return acc
        }, [])

        // return array.reduce((acc, cur) => {
        //     if (Array.isArray(cur) && depth > 0) {
        //         return acc.concat(flattenDepth(cur, depth - 1))
        //     } else {
        //         // 关键：若 cur 可能是数组且不应再展开，必须包一层
        //         return Array.isArray(cur) ? acc.concat([cur]) : acc.concat(cur)
        //     }
        // }, [])
    },

    fromPairs: function (pairs) {//paris 是类似这样的数组[['a', 1], ['b', 2]]
        return pairs.reduce((acc, cur) => {
            acc[cur[0]] = cur[1]
            return acc
        }, {})
    },

    toPairs: function (object) {
        var result = []
        for (var key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {//避免原型链污染、方法覆盖、Object.create(null)没有原型 报错等问题
                result.push([key, object[key]])
            }
        }
        return result
        //return Object.entries(object)
    },

    head: function (array) {
        if (Array.isArray(array) && array.length >= 1) {
            return array[0]
        } else {
            return undefined
        }
    },

    indexOf: function (array, value, fromIndex = 0) {
        if (Array.isArray(array) == false || array.length == 0 || fromIndex >= array.length) {
            return -1
        }
        var minVaildFromIdx = fromIndex >= 0 ? fromIndex : Math.max(fromIndex + array.length, 0)
        //如果 fromIndex 是负数，那么要从 array.length + fromIndex 开始找；但如果这个结果仍然 < 0，就从 0 开始
        for (var i = minVaildFromIdx; i < array.length; i++) {
            if (this.isEqual(array[i], value)) {
                return i
            }
        }
        return -1
    },

    lastIndexOf: function (array, value, fromIndex = array.length - 1) {
        if (Array.isArray(array) == false || array.length == 0) {
            return -1
        }
        var vaildFromIdx
        if (fromIndex > array.length - 1) {
            vaildFromIdx = array.length - 1
        } else if (fromIndex <= array.length - 1 && fromIndex >= 0) {
            vaildFromIdx = fromIndex
        } else if (fromIndex + array.length >= 0) {
            vaildFromIdx = fromIndex + array.length
        } else {
            return -1
        }
        for (var i = vaildFromIdx; i >= 0; i--) {
            if (this.isEqual(array[i], value)) {
                return i
            }
        }
        return -1
    },

    initial: function (array) {
        var result = []
        if (Array.isArray(array)) {
            var myArray = Array.from(array)
            var len = myArray.length
            if (len > 1) {
                for (var i = 0; i < len - 1; i++) {
                    result.push(myArray[i])
                }
            }
        }
        return result
    },

    join: function (array, separator = ',') {
        var myArray = Array.from(array).map((item) => item ?? '')
        if (myArray.length == 0) {
            return ''
        }
        if (myArray.length == 1) {
            return '' + myArray[0]
        }
        return myArray.reduce((acc, cur) => acc += '' + separator + cur)
    },

    last: function (array) {
        if (Array.isArray(array)) {
            return array[array.length - 1]
        }
    },

    pull: function (array, ...values) {
        return array.reduce((acc, cur) => {
            if (!values.includes(cur)) {
                acc.push(cur)
            }
            return acc
        }, [])
    },

    reverse: function (array) {
        // var result = []
        // var myArr = [...array]
        // for (var i = myArr.length; i >= 0; i--) {
        //     result.push(myArr.pop())
        // }
        // return result   //返回了一个新的数组

        const len = array.length
        var temp
        for (var i = 0; i < (len >> 1); i++) {
            temp = array[i]
            array[i] = array[len - 1 - i]
            array[len - 1 - i] = temp
        }
        return array
    },

    every: function (collection, predicate = Boolean) {
        if (typeof predicate == 'function') {
            for (var key in collection) {
                if (!predicate(collection[key], key, collection)) {
                    return false
                }
            }
            return true
        }
        if (typeof predicate == 'string') {
            for (var key in collection) {
                if (!collection[key][predicate]) {
                    return false
                }
            }
            return true
        }
        if (typeof predicate == 'object') {
            if (Array.isArray(predicate)) {
                for (var key in collection) {
                    if (collection[key][predicate[0]] != predicate[1]) {
                        return false
                    }
                }
                return true
            } else {
                for (var key in collection) {
                    if (!this.isEqual(collection[key], predicate)) {
                        return false
                    }
                }
                return true
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
    },
}

// export { xiaoyuy2906 }