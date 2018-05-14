// var canvas = document.getElementById('myCanvas');
// var context = canvas.getContext('2d');

const map = [
                [1,1,1,1,0,],
                [0,1,0,0,0,],
                [0,1,0,0,0,],
                [0,1,1,1,0,],
                [0,0,0,1,1,],
            ];

let frontier = [];
let startPoint = [0,0];
let endPoint = [4,4];


function getShortestPath(startCoordinates,map){
    let distanceFromTop = startPoint[0];
    let distanceFromLeft = startPoint[1];

    let location = {
        distanceFromTop: distanceFromTop,
        distanceFromLeft: distanceFromLeft,
        path:[],
        status:'start'
    };

    // initializing start location into queue:
    let frontier = [location];

    //Now looping through map to find the goal
    while (frontier.length > 0){
        // get 1st element from array while removing it simultaneously.
        let currentCell = frontier.shift();

        let directions = ['up','right','down','left'];

        directions.forEach(function(d){
            let newCell = exploreInDirection(currentCell, directions[d], map);

            if(newCell.status === 'Goal'){
                return newCell.path;
            } else if (newCell.status === 'Valid'){
                frontier.push(newCell);
            };
        });

    };

    // if no valid path found
    return false;
};


function cellStatus(location, map){

    let dft = location.distanceFromTop;
    let dfl = location.distanceFromLeft;

    if (    dfl < 0 ||
            dfl >= map[0].length ||
            dft < 0 ||
            dft >= map.length) {

            // location is not on the map
            return "Invalid";

            } else if (map[dft][dfl] === "Goal") {
                return "Goal";
            } else if (map[dft][dfl] !== "Empty") {
                // either visted or obstacle
                return "Blocked";
            } else {
                return "Valid";
            }

};

function exploreInDirection(currentCell, direction, map){

    let newPath = currentCell.path.slice();
    newPath.push(direction);

    let dft = currentCell.distanceFromTop;
    let dfl = currentCell.distanceFromLeft;

    switch (direction) {
        case "up":
            dft -= 1;
            break;
        case "right":
            dfl += 1;
            break;
        case "down":
            dft += 1;
            break;
        case "left":
            dfl -= 1;
            break;
    }

    let newLocation = {
        distanceFromTop: dft,
        distanceFromLeft: dfl,
        path: newPath,
        status: "unknown"
    };
    newLocation.status = cellStatus(newLocation,map);

    if (newLocation.status === "Valid") {
        map[newLocation.distanceFromTop][newLocation.distanceFromLeft] = "Visited";
    }

    return newLocation;
};




// heuristic if we go down A* route
function manhattanDistance(currentX, currentY, goalX, goalY){
    let dx = Math.abs(goalX - currentX);
    let dy = Math.abs(goalY - currentY); 
    return dx + dy;
};


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

        context.beginPath();
        context.moveTo(entrance[0],entrance[1]);


        // looping through every element in the list
        inventory.forEach(function(e){
            context.lineTo(e.coordinates[0],e.coordinates[1]);

        });
        // finally draw the stroke
        context.stroke();
}





console.log(getShortestPath([0,0], map));



