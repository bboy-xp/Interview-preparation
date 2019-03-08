

function observe(obj) {
  //判断类型
  if (!obj || typeof obj !== 'object') {
    return;
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key]);
  })
}

function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val);
  let dp = new Dep();
  Object.defineProperty(obj, key, {
    // 可枚举
    enumerable: true,
    // 可配置
    configurable: true,
    // 自定义函数
    get: function reactiveGetter() {
      console.log('get value');
      // 将Watcher添加到订阅
      if(Dep.target) {
        dp.addSub(Dep.target);
      }
      return val;
    },
    set: function reactiveSetter(newVal) {
      console.log('change value');
      val = newVal;
      // 执行watcher的update方法
      dp.notify();
    }
  })
}

// var data = {
//   name: 'sxp'
// };
// observe(data);
// let name = data.name;
// data.name = 'xp';

// 通过Dep解耦属性的依赖和更新操作
class Dep {
  constructor() {
    this.subs = [];
  }
  // 添加依赖
  addSub(sub) {
    this.subs.push(sub);
  }
  // 更新
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    })
  }
}
// 全局属性， 通过该属性配置Watcher
Dep.target = null;

class Watcher {
  constructor(obj, key, cb) {
    // 将Dep.target指向自己
    // 然后触发属性的getter添加监听
    // 最后将Dep.target置空
    Dep.target = this;
    this.cb = cb;
    this.obj = obj;
    this.key = key;
    this.value = obj[key];
    Dep.target = null;

  }
  update() {
    // 获取新值
    this.value = this.obj[this.key];
    // 调用update方法更新dom
    this.cb(this.value);
  }
}