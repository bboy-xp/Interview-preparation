/**
 * 发布订阅器构造函数
 */
let Publisher = (
  function () {
    function Publisher() {
      this._subs = {}; // 维护一个订阅器列表
    }

    /**
     * 添加订阅者
     * 若订阅者需要插入的订阅器不存在，则新创建一个
     * @param { string } type - 需要添加订阅者的订阅器名
     * @param { function } func - 订阅者
     */

    Publisher.prototype.addSub = function (type, func) {
      if (!this._subs[type]) {
        this._subs[type] = [];
        this._subs[type].push(func);
      }
    }

    /**
     * 发布通告
     * 通知指定订阅器执行其中的每个订阅者
     * @param { String } type - 需要通知其发布消息的订阅器名
     */

    Publisher.prototype.notify = function (type) {
      if (!this._subs[type]) return;
      // 将函数传入的参数转换为数组对象。
      let args = Array.prototype.slice.call(arguments, 1);
      this._subs[type].forEach(function (item) {
        item.apply(this, args);
      }, this);
    };

    /**
     * 删除订阅者
     * @param { string } type - 指定操作的订阅器名
     * @param { function } func - 指定需要删除的订阅者
     */

    Publisher.prototype.destory = function (type, func) {
      this._subs[type].forEach(function (item, index, array) {
        (item === func) && array.splice(index, 1);
      }, this);
    }
    return Publisher;
  }()
);