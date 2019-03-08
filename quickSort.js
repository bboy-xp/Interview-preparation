// 快速排序
// 时间复杂度 O(lofN)

function checkArray(array) {
  if (!array) return;
}

function quickSort(array) {
  checkArray(array);
  // 如果数组长度小于等于1，直接返回
  if(array.length <= 1) return array;
  let pivotIndex = Math.floor(array.length/2);
  // 找基准，并把基准从原数组删除
  let pivot = array.splice(pivotIndex, 1)[0];
  // 定义左右数组
  let left = [];
  let right = [];

  // 比基准小的放在left中，比基准大的放在right中
  for(let i = 0; i < array.length; i++) {
    if(array[i] <= pivot) {
      left.push(array[i]);
    }else {
      right.push(array[i]);
    }
  }
  // 递归
  return quickSort(left).concat([pivot], quickSort(right));
}

const testArr = [3,7,8,9,67,5,123,435,23,21,56,23,8,1,0];
console.log(quickSort(testArr));

