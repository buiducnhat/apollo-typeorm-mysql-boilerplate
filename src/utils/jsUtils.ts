export const AsyncForEach = async function (array: Array<any>, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
