var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');


const inventorySeed = [
    {
        name: "Toothpaste",
        location: "1",
        coordinates: [19,5],
        price: 2.5
    },
    {
        name: "Oatmeal",
        location: "2",
        coordinates: [8,11],
        price: 3.5
    },
    {
        name: "Shampoo",
        location: "3",
        coordinates: [15,4],
        price: 4.5
    },
    {
        name: "Rice",
        location: "4",
        coordinates: [10,15],
        price: 5.5
    },
    {
        name: "Light Bulbs",
        location: "5",
        coordinates: [20,7],
        price: 6.5
    },
    {
        name: "1",
        location: "5",
        coordinates: [20,29],
        price: 6.5
    },
    {
        name: "2",
        location: "5",
        coordinates: [1,26],
        price: 6.5
    },
    {
        name: "3",
        location: "5",
        coordinates: [1,1],
        price: 6.5
    }
];

// *****ALL DIRECTIONS WILL BE PUSHED INTO THIS ARRAY**********
let masterPath = [];


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

        

        // Explore up
        var newLocation = exploreInDirection(currentLocation, 'up', grid);
            if (newLocation.status === 'Goal') {

                // get coordinates to draw later
                let coordinates = [newLocation.distanceFromTop,newLocation.distanceFromLeft];
                // Find and remove item from an array
                inventoryQueue.splice(isItemInArray(inventoryQueue,coordinates), 1);
                resetPaths();
                newLocation.path.forEach(function (e) {  
                    masterPath.push(e);
                });
                masterPath.push(coordinates);
                // console.log(masterPath);
                return findShortestPath(coordinates,grid);

            } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
            }

        // Explore right
        var newLocation = exploreInDirection(currentLocation, 'right', grid);
            if (newLocation.status === 'Goal') {

                    // get coordinates to draw later
                    let coordinates = [newLocation.distanceFromTop,newLocation.distanceFromLeft];
                    // Find and remove item from an array
                    inventoryQueue.splice(isItemInArray(inventoryQueue,coordinates), 1);
                    resetPaths();
                    newLocation.path.forEach(function (e) {  
                        masterPath.push(e);
                    });
                    masterPath.push(coordinates);
                    // console.log(masterPath);
                    return findShortestPath(coordinates,grid);

            } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
            }

        // Explore down
        var newLocation = exploreInDirection(currentLocation, 'down', grid);
            if (newLocation.status === 'Goal') {

                // get coordinates to draw later
                let coordinates = [newLocation.distanceFromTop,newLocation.distanceFromLeft];
                // Find and remove item from an array
                inventoryQueue.splice(isItemInArray(inventoryQueue,coordinates), 1);
                resetPaths();
                newLocation.path.forEach(function (e) {  
                    masterPath.push(e);
                });
                masterPath.push(coordinates);
                // console.log(masterPath);
                return findShortestPath(coordinates,grid);

            } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
            }

        // Explore left
        var newLocation = exploreInDirection(currentLocation, 'left', grid);
            if (newLocation.status === 'Goal') {
                

                // get coordinates to draw later
                let coordinates = [newLocation.distanceFromTop,newLocation.distanceFromLeft];
                // Find and remove item from an array
                inventoryQueue.splice(isItemInArray(inventoryQueue,coordinates), 1);
                resetPaths();
                newLocation.path.forEach(function (e) {  
                    masterPath.push(e);
                });
                masterPath.push(coordinates);
                // console.log(masterPath);
                return findShortestPath(coordinates,grid);
                

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
  var dft = location.distanceFromTop;
  var dfl = location.distanceFromLeft;

  if (  dfl < 0 ||
        dfl >= grid[0].length ||
        dft < 0 ||
        dft >= grid.length) {

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
    

    var dft = currentLocation.distanceFromTop;
    var dfl = currentLocation.distanceFromLeft;

    newPath.push([dft,dfl]);

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
        //assign new status
    newLocation.status = locationStatus(newLocation, grid);

  // If this new location is valid, mark it as 'Visited'
  if (newLocation.status === 'Valid') {
    grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
  }

  return newLocation;
};


var grid = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],
    [0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,1,0,0,0,1,1,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,1,0,0,1,1,1,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,1,1,1,1,1,1,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0],
    [0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,1,1,1,1,1,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,1,0,1,0,1,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,1,0,1,1,1,0,0,0,0],
    [0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,1,1,0],
    [0,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,1,1,0],
    [0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,1,1,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,1,1,0],
    [0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
];

// assigning inventory elements into the grid-------------------
inventorySeed.forEach(function(e){
    grid[e.coordinates[0]][e.coordinates[1]] = "G";
});

// assigning dynamic values from the grid --------
for(var i = 0; i < grid.length; i++) {
    for(var j = 0; j < grid[0].length; j++) {
        
        if (grid[i][j] === 0) {
            grid[i][j] = "Obstacle";
        } else if (grid[i][j] === "G") {
        grid[i][j] = "Goal";
        } else {
        grid[i][j] = "Empty";
        }
    }
};


function resetPaths(){

    for(var i = 0; i < grid.length; i++) {
        for(var j = 0; j < grid.length; j++) {
            
            if (grid[i][j] === 0) {
                grid[i][j] = "Obstacle";
            } else if (grid[i][j] === "Visited") {
            grid[i][j] = "Empty";
            } 
        }
    };

}


function scaleCoordinates(scaleNumber){
    let scaledCoordinates = [];

    scaledCoordinates = masterPath.slice();
    console.log(scaledCoordinates);
        scaledCoordinates.forEach(function(e){
            e[0] *= scaleNumber;
            e[1] *= scaleNumber;
        })
    
}


findShortestPath([21,20],grid);
scaleCoordinates(27);


// funciton to draw lines from whatever list is passed in
function createPath (inventory){

    const entrance = inventory[0];

        context.beginPath();
        context.moveTo(entrance[1],entrance[0]);

        // looping through every element in the list
        inventory.forEach(function(e){
            context.lineTo(e[1],e[0]);

        });
        // finally draw the stroke
        context.strokeStyle="#11d902";
        context.lineWidth= 5;
        context.stroke();
        

        inventorySeed.forEach(function(e){
            console.log(e.coordinates[1]);
            context.beginPath();
            context.arc(e.coordinates[1]*27,e.coordinates[0]*27,20,0,2 * Math.PI);
            context.strokeStyle="#11d902";
            context.lineWidth= 5;
            context.stroke();
        });
        
}

createPath(masterPath)
console.table(grid);

