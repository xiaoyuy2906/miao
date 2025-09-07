


class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  plus(v) {
    var x = this.x + v.x
    var y = this.y + v.y
    return new Vector(x, y)
  }
  minus(v) {
    var x = this.x - v.x
    var y = this.y - v.y
    return new Vector(x, y)
  }
  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
}


var a = new Vector(1, 2)
var b = new Vector(4, 5)
var c = a.plus(b) //  new Vector(5, 7)
console.log(c.x) // 5
console.log(c.y) // 7
console.log(c.length) // results in Math.sqrt(5*5+7*7)




// Complex类表示一个复数
// 它有两个属性，real和imag分别表示实部和虚部
class Complex {
  #real
  #imag
  constructor(real, imag) {
    this.#real = real
    this.#imag = imag
  }
  get real() {
    return this.#real
  }
  get imag() {
    return this.#imag
  }
  get conj() {
    return new Complex(this.real, -this.imag)
  }
  plus(c) {
    var Re = this.real + c.real
    var Im = this.imag + c.imag
    return new Complex(Re, Im)
  }
  minus(c) {
    var Re = this.real - c.real
    var Im = this.imag - c.imag
    return new Complex(Re, Im)
  }
  mul(c) {
    var Re = this.real * c.real - this.imag * c.imag
    var Im = this.real * c.imag + this.imag * c.real
    return new Complex(Re, Im)
  }
  div(c) {
    var denominator = c.mul(c.conj)
    var numerator = this.mul(c.conj)
    return new Complex(numerator.real / denominator.real, numerator.imag / denominator.real)
  }
  toString() {
    return "(" + this.real + (this.imag >= 0 ? "+" : "") + this.imag + "j)"
  }
}


var d = new Complex(1, 2) // 1+2i
var e = new Complex(3, -4) // 3-4i

var f = d.plus(e) // 4-2i
var g = e.mul(f) // 4-22i
console.log(g.real) // 4
console.log(g.imag) // -22


// 实现一个类似js中Array的类型
// 即长度可变的数组
// 实现过程中只能通过new Array(n)创建出固定长度的数组
// 此后再也不能修改这个数组的长度
//    如push，pop，shift，unshift，修改length，给length及以上的下标赋值
class ArrayList {

  constructor(len = 8) {
    this._array = new Array(len)
    this._length = 0
    this._capacity = len
  }

  // 返回数组元素的数量
  get length() {
    return this._length
  }


  // 返回第idx位置的值
  at(idx) {
    if (idx >= this._length || idx < -this._length) {
      return undefined
    }
    if (idx < 0 && idx >= -this._length) {
      return this._array[idx + this._length]
    }
    return this._array[idx]
  }

  push(val) {
    if (this._length < this._capacity) {
      this._array[this._length] = val
      this._length++
    } else {
      this._capacity *= 2
      var newArray = new Array(this._capacity)
      for (var i = 0; i < this._length; i++) {
        newArray[i] = this._array[i]
      }
      this._array = newArray
      this._array[this._length] = val
      this._length++
    }
  }

  push(val) {
    if (this._length == this._capacity) {
      this._capacity *= 2
      var newArray = new Array(this._capacity)
      for (var i = 0; i < this._length; i++) {
        newArray[i] = this._array[i]
      }
      this._array = newArray
    }
    this._array[this._length++] = val
  }

  pop() {
    if (this._length == 0) {
      return undefined
    }
    var curVal = this._array[this._length - 1]
    this._array[this._length - 1] = undefined
    this._length--
    if (this._length < (this._capacity >> 2) && this._capacity >= 16) {
      this._capacity >>= 1
      var newArray = new Array(this._capacity)
      for (var i = 0; i < this._length; i++) {
        newArray[i] = this._array[i]
      }
      this._array = newArray
    }
    return curVal
  }

  set length(len) {
    if (len > this._length) {
      for (var i = this._length; i < len; i++) {
        this.push(undefined)
      }
    }
    if (len < this._length) {
      for (var i = this._length; i > len; i--) {
        this.pop()
      }
    }
  }

  set length(len) {
    if (len < this._length) {
      this._length = len
    }
  }

}


var h = new ArrayList()

for (var i = 0; i < 100; i++) {
  h.push(i)
}

console.log(h.at(15)) // 14
console.log(h.at(80)) // 79
console.log(h.length) // 100
console.log(h.pop()) // 99
console.log(h.length) // 99


class ListNode {
  constructor(val) {
    this.next = null
    this.val = val
  }
}

/**
 * 用单向链表实现一个先进先出的队列
 * 
 */
class Queue {
  constructor() {
    this._head = this._tail = null
    this._size = 0
  }
  // 返回队列的长度
  get size() {
    return this._size
  }
  // 将值val放进队列，放进队列的元素会先进先出
  enqueue(val) {
    var node = new ListNode(val)
    if (!this._head) {
      this._head = this._tail = node
    } else {
      this._tail.next = node
      this._tail = node
    }
    this._size++
    return this
  }
  // 返回队头元素，当队列为空时，返回undefined
  dequeue() {
    if (this._size == 0) {
      return undefined
    }
    var curNode = this._head
    this._head = this._head.next
    this._size--
    return curNode.val
  }
  // 返回但不删除队头元素
  peek() {
    if (this._size == 0) {
      return undefined
    }
    return this._head.val
  }
}


var q = new Queue()

q.enqueue(5)
q.enqueue(6)

console.log(q.dequeue()) // 5

q.enqueue(8)
q.enqueue(9)

console.log(q.dequeue()) // 6
console.log(q.dequeue()) // 8
console.log(q.size) // 1



// 表达一个“集合”
// 即元素不重复的合集
class MySet {
  constructor() {
    this._myElements = []
    this._size = 0
  }
  // 往集合中增加一个元素，但元素如果已经在集合里，则不用增加了
  add(val) {
    if (!this.has(val)) {
      this._myElements.push(val)
      this._size++
    }
    return this
  }
  // 判断集合中是否有val
  has(val) {
    /* return this._myElements.indexOf(val) >= 0 */
    for (var i = 0; i < this._myElements.length; i++) {
      if (this._myElements[i] === val) {
        return true
      }
    }
    return false
  }
  // 从集合中删除val
  delete(val) {
    // var idx = this._myElements.indexOf(val)
    // if (idx >= 0) {
    // this._myElements.splice(idx, 1)
    // this._size--
    // }
    // return this
    for (var i = 0; i < this._myElements.length; i++) {
      if (this._myElements[i] === val) {
        this._myElements.splice(i, 1)
        this._size--
        break
      }
    }
    return this
  }
  // 清空集合中的元素
  clear() {
    this._myElements = []
    this._size = 0
    return this
  }
  // 返回集合中元素的数量
  get size() {
    return this._size
  }
}

var s = new MySet()
s.add(1)
s.add(1)
console.log(s.size) // 1
s.add(2)
console.log(s.size) // 2
s.delete(1)
console.log(s.size) // 1
console.log(s.has(2))  // true
console.log(s.has(1)) // false



// 表达一个映射
// 每组映射有一个key和一个value确定
// 增删改查：
// 实现过程中不能将对象做为映射来使用（意思是不能使用对象“随意增减属性”的功能）
class MyMap {

  constructor() {
    this._keys = []
    this._vals = []
    this._size = 0
  }
  // 把key的值设置为val
  // 如果存在key，将其值由旧的映射为新的
  // 如果不存在key，则新增这一组映射
  set(key, val) {     //   obj[key] = val
    for (var i = 0; i < this._keys.length; i++) {
      if (this._keys[i] === key) {
        this._vals[i] = vals
        return this
      }
    }
    this._keys.push(key)
    this._vals.push(val)
    this._size++
    return this
  }
  // 获取key的映射目标    obj[key]
  get(key) {
    // var idx = this._keys.indexOf(key)
    // return idx >= 0 ? this._vals[idx] : undefined

    for (var i = 0; i < this._keys.length; i++) {
      if (this._keys[i] === key) {
        return this._vals[i]
      }
    }
    return undefined
  }
  // 判断当前map中是否存在key     key in obj
  has(key) {
    /* return this._keys.indexOf(key) > -1 */

    for (var i = 0; i < this._keys.length; i++) {
      if (this._keys[i] === key) {
        return true
      }
    }
    return false
  }
  // 删除key对应的映射对
  delete(key) {   //    delete   obj[key]
    for (var i = 0; i < this._keys.length; i++) {
      if (this._keys[i] === key) {
        this._keys.splice(i, 1)
        this._vals.splice(i, 1)
        this._size--
        return true
      }
    }
    return false
  }
  clear() {
    this._keys = []
    this._vals = []
    this._size = 0
  }

  // 返回当前map中映射对的数量
  get size() {
    return this._size
  }
}
