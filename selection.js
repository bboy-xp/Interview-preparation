// 选择排序
// 时间复杂度 O(n*n)

function checkArray(array) {
  if (!array) return;
}
function sawp(array, left, right) {
  let rightValue = array[right];
  array[right] = array[left];
  array[left] = rightValue;
}


function selection(array) {
  checkArray(array);
  for(let i = 0; i < array.length; i++) {
    // 设置索引
    let minIndex = i;
    for(let j = i + 1; j < array.length; j++) {
      minIndex = array[j] < array[minIndex] ? j : minIndex;
    }
    sawp(array, i , minIndex);
  }
  return array;
}

const testArr = [3,7,8,9,67,5,123,435,23,21,56,23,8,1,0];
console.log(selection(testArr));