var xiaoyuy2906 = {
    compact: function (array) {
        return array.filter(item => item)
    },

    chunk: function (array, size) {
        var result = []
        var i = 0
        var remainder = array.length % size
        while (i + size <= array.length - remainder) {
            result.push(array.slice(i, i + size))
            i += size
        }
        if (i < array.length) {
            result.push(array.slice(array.length - remainder))
        }
        return result
    },

    fill: function (array, value, start = 0, end = array.length) {
        return array.slice(0, start).concat(array.slice(start, end).map(it => value)).concat(array.slice(end))
    }
}