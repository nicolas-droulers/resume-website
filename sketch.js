/////////////////////Global Variables////////////////////////////////
let start = -1000;
let end = 1000;
let step = 1;
let range;
let norm_range_x;
let norm_range_y;
let result;
let width = 1280;
let height = 720; 
let contour_range = [1, 5, 10 , 15, 20];
let pos_array;
//////////Function Definition ////////////////////////////////////// 

// Given x,y compute f(x,y)
function Hyperbola(x, y){
  return (x**2) + (y**2);
}

// Given an X and Y coordiantes return 2D vector that represents the gradient on (X, Y) of our point. 
// The gradient is created using p5js's vector class. 
function gradientVector(x,y){
  return createVector(2*x, 2*y);
}

// Function that returns an object containing the row and and column of an element in a matrix
function matLocation(i,j){
  return {i: i, j: j};
}

// This function returns an array representing the range between the start and end values.
// The default step is 1
// end must be greater than start
function calcRange(start, end, step = 1){
  let range = [];
  for(let i = start; i <= end; i += step){
    range.push(i);
  }
  return range;
}

// This function calculates the normalized version ([0,1] if scale is set to default --> 1) of the given range. 
function normRange(range, scale = 1){
  let norm_range = [];
  for(let val of range){
    norm_range.push(((val - range[0])/(range.length))*scale)
  }
  return norm_range;
}

// Given a range (array) for x and y, compute f(x,y) = z across the whole domain 
// end should always be greater than start !!!
function compute_all_points(range){
  // Start by creating n * n result matrix (square) and n * n gradient matrix.  
  let n = range.length;
  let result_mat = Array.from({length: n}, ()=> Array(n).fill(0));
  let grad_mat = Array.from({length: n}, ()=> Array(n).fill(0));
  
  // In the next loop we will compute f(x,y) and calculate the gradient for each point. 
  // i --> rows j --> cols
  for(let i = 0; i < n; i++){
    for(let j = 0; j < n; j++){
      result_mat[i][j] = Hyperbola(range[i], range[j]);
      grad_mat[i][j] = gradientVector(range[i], range[j]);
    }
  }
  const result = {
    result_mat: result_mat,
    grad_mat: grad_mat
  };
  return result;
}
// Given a constant c, t his function searches for all elements in the results matrix that which are equal to c.
// it returns an array which contains the indexes of each elements that is equal to c. 
function findPoints(result_mat, c){
  let n = result_mat.length;
  let pos_array = [];
  for(let i = 0; i < n; i++){
    for(let j = 0; j < n; j++){
      if(result_mat[i][j] == c){
        pos_array.push(matLocation(i, j));
      }
    }
  }
  return pos_array;
}

function drawContourLine(pos_array, norm_range_x, norm_range_y){
  push();
  beginShape();
  for(let pos of pos_array){
    vertex(norm_range_x[pos.i], norm_range_y[pos.j]);
  }
  endShape();
  pop();
}

/////////////////////// MAIN CODE ////////////////////////////////////////////

function setup() {
 let canvas = createCanvas(width, height);
 range = calcRange(start, end , step);
 result = compute_all_points(range);
 norm_range_x = normRange(range, width);
 norm_range_y = normRange(range, height);
 pos_array = findPoints(result.result_mat, 10000);
 
 drawContourLine(pos_array, norm_range_x, norm_range_y);
 console.log(result);
 console.log(norm_range_x);
 console.log(pos_array);
}

function draw() {
}

