 arr = [[11, 2, 4], [4, 5, 6], [10, 8, -12]]

function diagonalDifference(arr) {
   let resultFirst = 0 ; let resultSecond = 0
   
   for(let i = 0 ; i < arr.length ; i++){
      resultFirst += arr[i][i]
      
   }
   
   for(let j = 0 ; j < arr.length ; j++ ){
       resultSecond += arr[j][arr.length-j - 1];
     
   }
   
   return Math.abs(resultFirst - resultSecond) ;
}


// diagonalDifference(arr);
console.log(diagonalDifference(arr)); // Output should be the absolute difference between the two diagonals