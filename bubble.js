// 冒泡排序 
// 时间复杂度 O(n*n)

function checkArray(array) {
  if (!array) return;
}
function sawp(array, left, right) {
  let rightValue = array[right];
  array[right] = array[left];
  array[left] = rightValue;
}

function bubble(array) {
  checkArray(array);
  for (let i = array.length - 1; i > 0; i--) {
    // 从0到 length-1 遍历
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        sawp(array, j, j + 1);
      }
    }
  }

  return array;
}

const testArr = [3,7,8,9,67,5,123,435,23,21,56,23,8,1,0];
console.log(bubble(testArr));