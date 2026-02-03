type arrType = number | string | boolean;

export function useArrHook() {
  /* Array */

  const myArray: arrType[] = [1, 2, 3];
  const myArray2 = [1, 2, 3];

  myArray[2] = "abc";
  myArray[3] = 4;
  myArray[4] = true;

  const arr = myArray === myArray2;

  const myArray3 = myArray;

  const arr2 = myArray3 === myArray;

  const arrayLength = myArray.length;

  /* Array.push */

  const arrPush: arrType[] = [1, 2, 3];
  arrPush.push(4); // [1, 2, 3, 4]
  arrPush.push(true); // [1, 2, 3, 4]

  /* Array.pop */

  const arrPop = [1, 2, 3];
  arrPop.pop(); // [1, 2]
  const removedElementPop = arrPop.pop(); // 2

  /* Array.unshift */

  const arrUnshift: arrType[] = [1, 2, 3];
  arrUnshift.unshift(true); // [true, 1, 2, 3]
  arrUnshift.unshift("abc"); // ['abc', true, 1, 2, 3]

  /* Array.shift */

  const arrShift: arrType[] = [1, 2, 3];
  arrShift.shift(); // [2, 3]
  const removedElementShift = arrShift.shift(); // 2

  /* Array.forEach */

  const arrForEach = [1, 2, 3, 4];
  arrForEach.forEach((el) => el * 2); // [1, 2, 3, 4]
  arrForEach.forEach((el) => {
    arrForEach.push(el * 2); // [2, 4, 6, 8]
  });

  const arrFeStr = ["Frontend", "Backend", "FullStack"];
  arrFeStr.forEach(
    (item, index, array) => `In ${item} worked ${index} and ${array}`
  );
  const arrFeStrRes = arrFeStr.map(
    (item, index, array) => `In ${item} worked ${index} and ${array}`
  );

  /* Array.map */

  const arrMap = [1, 2, 3, 4];
  const arrMapObj = [
    { id: 1, name: "Frontend" },
    { id: 2, name: "Backend" },
    { id: 3, name: "FullStack" },
    { id: 4, name: "Frontend" },
  ];
  const mappedArray = arrMap.map((el) => el * 3);
  const mappedArrayObj = arrMapObj.map((item) => item.name);
  const mapArrPush = mappedArray.map((el) => {
    mappedArray.push(el * 3);
  });

  /* Array.splice */

  const arrSplice: arrType[] = [1, 2, 3, 4, 5];
  arrSplice.splice(0, 1, "Replaced string");
  arrSplice.splice(3, 0, "Added string");

  /* Array.slice */

  const arrSlice: arrType[] = ["t", "e", "s", "t", 1, 2, 3, 4];
  const arrSliceRes = arrSlice.slice(0, 2);

  /* Array.concat */

  const arrConcat: arrType[] = [1, 2];
  const arrConcatRes = arrConcat.concat([3, 4]);

  /* Array.indexOf,includes */

  const arrIndex = [1, 0, false];
  const arrIndexOf = arrIndex.indexOf(0); // 1
  const arrInclude = arrIndex.includes(1);
  console.log(arrInclude);

  /* Array.find и findIndex */

  const users = [
    { id: 1, name: "Frontend" },
    { id: 2, name: "Backend" },
    { id: 3, name: "FullStack" },
    { id: 4, name: "Frontend" },
  ];

  const arrFind = users.find((item) => item.id == 1);
  const arrFindIndex = users.findIndex((item) => item.name == "Frontend");

  /* Array.filter */

  const usersFilter = [
    { id: 1, name: "Frontend" },
    { id: 2, name: "Backend" },
    { id: 3, name: "FullStack" },
    { id: 4, name: "Frontend" },
  ];

  const arrFilter = usersFilter.filter((item) => item.id < 3);

  const army = {
    minAge: 18,
    maxAge: 27,
    canJoin(user: { name: string; age: number }): boolean {
      return user.age >= this.minAge && user.age <= this.maxAge;
    },
  };

  const usersArmy = [
    { name: "John", age: 16 },
    { name: "Pete", age: 20 },
    { name: "Mary", age: 23 },
    { name: "Kate", age: 30 },
  ];

  const soldiers = usersArmy.filter(army.canJoin, army);

  /* Array.sort */

  const arrSort = [3, 1, 4, 12, 2];
  arrSort.sort(); // [1, 12, 2, 3, 4] - incorrect default sorting
  arrSort.sort((a, b) => b - a); // [12, 4, 3, 2, 1] - correct sorting by descending order
  arrSort.sort((a, b) => a - b); // [1, 2, 3, 4, 12] - correct sorting by ascending order

  /* Array.reverse */

  const arrReverse = [1, 2, 3, 4, 5];
  const arrReverse2 = [3, 7, 8, 42, 53];
  arrReverse.reverse(); // [5, 4, 3, 2, 1]
  arrReverse2.reverse(); // [53, 42, 8, 7, 3]

  /* Array.split/join */

  const arrJoin = "Frontend,Backend,FullStack".split("").join(" | ");
  const arrSplit = "Frontend,Backend,FullStack";
  const arrSplitStr = "Frontend";
  arrSplit.split(", ");
  arrSplitStr.split(""); // ['F', 'r', 'o', 'n', 't', 'e', 'n', 'd']

  /* Array.reduce/reduceRight */

  const arrReduce = [1, 2, 3, 4];
  const resultReduce = arrReduce.reduce((acc, el) => acc * el, 1); // 24
  const resultReduceRight = arrReduce.reduceRight((acc, el) => acc * el, 2); // 10

  /* Array.isArray */

  const arrIsArray = Array.isArray([1, 2, 3]); // true
  const arrIsArray2 = Array.isArray("Frontend"); // false

  return {
    arr,
    arr2,
    arrPop,
    arrFind,
    arrPush,
    myArray,
    arrSort,
    arrJoin,
    soldiers,
    arrSplit,
    arrShift,
    arrFilter,
    arrSplice,
    arrReverse,
    arrForEach,
    arrIndexOf,
    arrInclude,
    arrUnshift,
    mapArrPush,
    arrIsArray,
    arrFeStrRes,
    arrIsArray2,
    arrSplitStr,
    arrReverse2,
    arrSliceRes,
    arrayLength,
    mappedArray,
    arrFindIndex,
    arrConcatRes,
    resultReduce,
    mappedArrayObj,
    removedElementPop,
    resultReduceRight,
    removedElementShift,
  };
}
