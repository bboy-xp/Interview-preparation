//但是这样每次判断都需要重新写这个x和MyPromise的关系，所以，我们需要将这块代码给抽象出来，这块代码在Promise/A+规范中叫做resolvePromise。
function resolvePromise(promise, x, resolve, reject) {
  let then,thenCalledOrThrow = false
  //如果promise 和 x 指向相同的值, 使用 TypeError做为原因将promise拒绝。
  if (promise === x) {
    return reject(new TypeError('Chaining cycle detected for promise!'))
  }

  //判断x是否是一个Promise，如果是，那么就直接把MyPromise中的resolve和reject传给then;
  //返回值是一个Promise对象，直接取它的结果做为promise2的结果
  if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      then = x.then
      if (typeof then === 'function') { // typeof 

        //x.then(resolve, reject);
        then.call(x, function rs(y) {

          if (thenCalledOrThrow) return

          thenCalledOrThrow = true

          return resolvePromise(promise, y, resolve, reject)

        }, function rj(r) {

          if (thenCalledOrThrow) return

          thenCalledOrThrow = true

          return reject(r)

        })
      } else {

        return resolve(x)
      }
    } catch(e) {
      if (thenCalledOrThrow) return

      thenCalledOrThrow = true

      return reject(e)
    }
  } else {

    return resolve(x)
  }

}

const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';



function MyPromise(fn) {
  const that = this;
  that.state = PENDING;
  that.value = null;
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];

  function resolve(value) {
    //当state为pending时，定义Javascript值，定义其状态为fulfilled
    if(that.state === PENDING) {
      that.value = value;
      that.state = RESOLVED;
      that.resolvedCallbacks.forEach((func) => {
        func(that.value);
      });
    }
  }

  //定义reject
  function reject(reason) {
    //当state为pending时，定义reason值，定义其状态为rejected
    if(that.state === PENDING) {
      that.reason = reason;
      that.state = REJECTED;
      that.rejectedCallbacks.forEach((func) => {
        func(that.reason);
      });
    }
  }
  //捕获callback是否报错
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}



//实现then函数
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  let that = this;
  let promise2;
  // 根据标准，如果then的参数不是function，则我们需要忽略它
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(f) { return f};
  onRejected = typeof onRejected === 'function' ? onRejected : function(r) {throw r};
  //需要修改下，解决异步问题，即当Promise调用resolve之后再调用then执行onFulfilled(that.value)。
  //用两个数组保存下onFulfilledArray
  if(that.state === PENDING) {
    return promise2 = new Promise(function(resolve, reject) {
      that.resolvedCallbacks.push((value) => {
        try {
          let x = onFulfilled(value);
          resolvePromise(promise2, x, resolve, reject)
        } catch(e) {
          return reject(e)
        }
      });
      
      that.rejectedCallbacks.push((value) => {
        try {
          let x = onRejected(value);
          resolvePromise(promise2, x, resolve, reject)
        } catch(e) {
          return reject(e)
        }
      });
    })
  }

  if(that.state === RESOLVED) {
    return promise2 = new MyPromise(function(resolve, reject) {
      try {
        let x = onFulfilled(that.value);
        //处理then的多种情况
        resolvePromise(promise2, x, resolve, reject)
      } catch (error) {
        reject(error);
      }
    })
  }

  if(that.state === REJECTED) {
    return new MyPromise(function(resolve, reject) {
      try {
        let x = onRejected(that.value);
        //处理then的多种情况
        resolvePromise(promise2, x, resolve, reject);
      } catch (error) {
        reject(error)
      }
      
    })
    
  }
}

// 测试
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000)
}).then((data) => {
  console.log(data);
  return new MyPromise((res) => {
    setTimeout(() => {
      res(2);
    },1000)
  })
}).then((res) => {
  console.log(res);
})


