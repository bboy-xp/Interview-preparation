const request = new XMLHttpRequest(); // 新建XMLHttpRequest对象
request.onreadystatechange = function() {
  // 状态发生变化时，函数被回调
  console.log(request.readyState);
  if(request.readyState === 4) {
    // 成功完成
    // 判断响应结果
    if(request.status === 200) {
      // 成功， 通过responseText拿到响应的文本
      return console.log(request.responseText);
    }else {
      // 失败，根据响应码判断失败原因
      return console.log(requset.status);
    }
  }else {
    // HTTP请求还在继续
  }
}

// 发送请求:
request.open('GET', 'https://www.baidu.com/');
request.send();
