// 插入排序
// 时间复杂度 O(n*n)

function checkArray(array) {
  if (!array) return;
}
function sawp(array, left, right) {
  let rightValue = array[right];
  array[right] = array[left];
  array[left] = rightValue;
}

function insertion(array) {
  checkArray(array);
  for (let i = 1; i < array.length; i++) {
    for (let j = i - 1; j >= 0 && array[j] > array[j + 1]; j--) {
      sawp(array, j, j + 1);
    }
  }
  return array;
}

const testArr = [3,7,8,9,67,5,123,435,23,21,56,23,8,1,0];
console.log(insertion(testArr));