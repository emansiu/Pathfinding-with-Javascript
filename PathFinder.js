var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

const map = [
                [1,1,1,1,0,],
                [0,1,0,0,0,],
                [0,1,0,0,0,],
                [0,1,1,1,0,],
                [0,0,0,1,1,],
            ];

// open list
let open = [];

// closed list
let closed = [];

const startX = 1;
const startY = 0;
const startPoint = map[startY][startX];

let endX = 4;
let endY = 4;
let endPoint = map[endY][endX];



// begin search of all nodes until you get to the goal
function pathSearch(map,startX,startY,endX,endY){

    let currentTile = map[startY][startX];
    // loop surrounding objects
    for (let i = 0; i > map.length; i++ ){
        
    };

};

// H value is the heuristic we will use (in this case manhattan). This is
// how many steps away the current marker is from the goal.
function manhattanDistance(currentX, currentY, goalX, goalY){
    let dx = Math.abs(goalX - currentX);
    let dy = Math.abs(goalY - currentY); 
    return dx + dy;
};

// G value is the cost of movement / also known as step cost
function cost(){
    let tileCost;

    if (currentTile === 0){
        tileCost = 0;
    }
    else {
        tileCost = 1;
    }
    return tileCost
};
// F value is G + H, or the total it takes from beginning point to end point

// Parent = node to reach node





const inventorySeed = [
    {
        name: "Toothpaste",
        location: "1",
        coordinates: [10,20],
        price: 2.5
    },
    {
        name: "Oatmeal",
        location: "2",
        coordinates: [100,200],
        price: 3.5
    },
    {
        name: "Shampoo",
        location: "3",
        coordinates: [300,80],
        price: 4.5
    },
    {
        name: "Rice",
        location: "4",
        coordinates: [600,300],
        price: 5.5
    },
    {
        name: "Light Bulbs",
        location: "5",
        coordinates: [500,90],
        price: 6.5
    }
];


// funciton to draw lines from whatever list is passed in
function createPath (inventory){

    const entrance = [100,30];
    let shortestPath;
    let currentPath = 0;

    shortestPath = distance (entrance[0],inventory[0].coordinates[0],entrance[1],inventory[0].coordinates[1])
    console.log(shortestPath);

        context.beginPath();
        context.moveTo(entrance[0],entrance[1]);

        // get shortest path
        // inventory.forEach(function(e){
        //     if (distance(e.coordinates[0],,e.coordinates[1]))
        //     context.lineTo(e.coordinates[0],e.coordinates[1]);

        // });
        inventory.forEach(function(e,index){
            console.log(inventory[index+1].coordinates[0]);
            // if (distance(e.coordinates[0],inventory[index+1].coordinates[0],e.coordinates[1],inventory[index+1].coordinates[1]) < shortestPath){
            //     shortestPath = distance(inventory[index+1].coordinates[0],inventory[index+1].coordinates[1]);
            // }
        });

        // looping through every element in the list
        inventory.forEach(function(e){
            context.lineTo(e.coordinates[0],e.coordinates[1]);

        });
        // finally draw the stroke
        context.stroke();
}







