var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');


const inventorySeed = [
    {
        name: "Toothpaste",
        location: "1",
        coordinates: [0,4],
        price: 2.5
    },
    {
        name: "Oatmeal",
        location: "2",
        coordinates: [1,0],
        price: 3.5
    },
    // {
    //     name: "Shampoo",
    //     location: "3",
    //     coordinates: [300,80],
    //     price: 4.5
    // },
    // {
    //     name: "Rice",
    //     location: "4",
    //     coordinates: [600,300],
    //     price: 5.5
    // },
    {
        name: "Light Bulbs",
        location: "5",
        coordinates: [4,4],
        price: 6.5
    }
];

// function to find if the coordinates are in the array
function isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        // This if statement depends on the format of your array
        if (array[i][0] == item[0] && array[i][1] == item[2]) {
            return i;   // Found it
        }
    }
    return false;   // Not found
}

// creating inventory queue to loop through later
let inventoryQueue = [];
inventorySeed.forEach(function(e){
    inventoryQueue.push(e.coordinates);
});

// Start location will be in the following format:
// [distanceFromTop, distanceFromLeft]
var findShortestPath = function(startCoordinates, grid) {
    var distanceFromTop = startCoordinates[0];
    var distanceFromLeft = startCoordinates[1];

    // Each "location" will store its coordinates
    // and the shortest path required to arrive there
    var location = {
        distanceFromTop: distanceFromTop,
        distanceFromLeft: distanceFromLeft,
        path: [],
        status: 'Start'
    };

    // Initialize the queue with the start location already inside
    var queue = [location];


    //Now looping through map to find the goal *********************&& inventoryQueue > 0
    while (queue.length > 0) {
        // Take the first location off the queue
        var currentLocation = queue.shift();

        // function directionHistory (direction){
        //     let newLocation = exploreInDirection(currentLocation,direction,grid);
        //     if (newLocation.status === 'Goal') {
        //     return newLocation.path;
        //     } else if (newLocation.status === 'Valid') {
        //     queue.push(newLocation);
        //     }
        // };

        // directionHistory('up');
        // directionHistory('right');
        // directionHistory('down');
        // directionHistory('left');

        // Explore up
        var newLocation = exploreInDirection(currentLocation, 'up', grid);
            if (newLocation.status === 'Goal') {
            return newLocation.path;
            } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
            }

        // Explore right
        var newLocation = exploreInDirection(currentLocation, 'right', grid);
            if (newLocation.status === 'Goal') {
            return newLocation.path;
            } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
            }

        // Explore down
        var newLocation = exploreInDirection(currentLocation, 'down', grid);
            if (newLocation.status === 'Goal') {
            return newLocation.path;
            } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
            }

        // Explore left
        var newLocation = exploreInDirection(currentLocation, 'left', grid);
            if (newLocation.status === 'Goal') {
                // get coordinates to draw later
                let coordinates = newLocation.distanceFromTop + ","+newLocation.distanceFromLeft
                // Find and remove item from an array
                inventoryQueue.splice(isItemInArray(inventoryQueue,coordinates), 1);
                return coordinates;

            } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
            }
    }

  // No valid path found
  return false;

};

// This function will check a location's status
// (a location is "valid" if it is on the grid, is not an "obstacle",
// and has not yet been visited by our algorithm)
// Returns "Valid", "Invalid", "Blocked", or "Goal"
function locationStatus(location, grid) {
  var gridSize = grid.length;
  var dft = location.distanceFromTop;
  var dfl = location.distanceFromLeft;

  if (  dfl < 0 ||
        dfl >= gridSize ||
        dft < 0 ||
        dft >= gridSize) {

    // location is not on the grid--return false
    return 'Invalid';
  } else if (grid[dft][dfl] === 'Goal') {
    grid[dft][dfl] = "Start";
    return 'Goal';
  } else if (grid[dft][dfl] !== 'Empty') {
    // location is either an obstacle or has been visited
    return 'Blocked';
  } else {
    return 'Valid';
  }
};


// Explores the grid from the given location in the given
// direction
var exploreInDirection = function(currentLocation, direction, grid) {
  var newPath = currentLocation.path.slice();
  newPath.push(direction);

  var dft = currentLocation.distanceFromTop;
  var dfl = currentLocation.distanceFromLeft;

  if (direction === 'up') {
    dft -= 1;
  } else if (direction === 'right') {
    dfl += 1;
  } else if (direction === 'down') {
    dft += 1;
  } else if (direction === 'left') {
    dfl -= 1;
  }

  var newLocation = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    path: newPath,
    status: 'Unknown'
  };
  newLocation.status = locationStatus(newLocation, grid);

  // If this new location is valid, mark it as 'Visited'
  if (newLocation.status === 'Valid') {
    grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
  }

  return newLocation;
};



var grid = [
    [1,1,1,1,1],
    [1,1,0,0,0],
    [0,1,0,0,0],
    [0,1,1,1,0],
    [0,0,0,1,1],
];

// assigning inventory elements into the grid-------------------
inventorySeed.forEach(function(e){
    grid[e.coordinates[0]][e.coordinates[1]] = "G";
});

// assigning dynamic values from the grid --------
for(var i = 0; i < grid.length; i++) {
    for(var j = 0; j < grid.length; j++) {
        
        if (grid[i][j] === 0) {
            grid[i][j] = "Obstacle";
        } else if (grid[i][j] === "G") {
        grid[i][j] = "Goal";
        } else {
        grid[i][j] = "Empty";
        }
    }
};

console.log(inventoryQueue);
console.log(grid[1][0])
console.log(findShortestPath([0,1], grid).split(","));
console.log(inventoryQueue);
    console.log(grid[1][0])
    console.log(findShortestPath([1,0],grid));

// while (inventoryQueue.length > 1) {
    
//     let newStart = findShortestPath([0,1], grid).split(",");
//     console.log(newStart);
//     console.log(findShortestPath(newStart,grid));

// }



// funciton to draw lines from whatever list is passed in
function createPath (inventory){

    const entrance = [100,30];
    let shortestPath;
    let currentPath = 0;


        context.beginPath();
        context.moveTo(entrance[0],entrance[1]);

        
     

        // looping through every element in the list
        inventory.forEach(function(e){
            context.lineTo(e.coordinates[0],e.coordinates[1]);

        });
        // finally draw the stroke
        context.stroke();
}

// createPath(inventorySeed);