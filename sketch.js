//Global Variables//

// Function Definition // 

// Given x,y compute f(x,y)
function Hyperbola(x, y){
  return (x**2) + (y**2);
}

// Given a the start and end of a domain for x and y, compute f(x,y) = z across the whole domain 
// end > start
function compute_all_points(start, end){
  // Start by creating n * n matrix (square)
  let n = (end - start) + 1;
  let result = Array.from({length: n}, ()=> Array(n).fill(0));
  let range = [];
  for(let i = start; i <= end; i += 1){
    range.push(i);
  }
  // In the next loop we will compute f(x,y) and calculate the gradient on each point
  for(let i = 0; i < n; i+=1){
    for(let j = 0; i < n; i+=1){
      result[i][j] = Hyperbola(i, j);
    }
  }
}

// MAIN CODE // 

function setup() {
 let canvas = createCanvas(1280, 720);
}

function draw() {
  background("lightblue"); 
}