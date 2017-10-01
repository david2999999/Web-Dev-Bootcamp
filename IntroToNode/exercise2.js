function average(arr){
    var sum = 0;
    arr.forEach(function(element){
       sum += element; 
    });
    
    return Math.round(sum / arr.length);
}

var scores = [90, 98, 89, 100, 100, 86, 94];
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

console.log(average(scores));
console.log(average(scores2));
