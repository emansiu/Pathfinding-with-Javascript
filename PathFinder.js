// var canvas = document.getElementById('myCanvas');
// var context = canvas.getContext('2d');

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

    //Now looping through map to find the goal
    while (queue.length > 0) {
        // Take the first location off the queue
        var currentLocation = queue.shift();

        // Explore North
        var newLocation = exploreInDirection(currentLocation, 'up', grid);
            if (newLocation.status === 'Goal') {
            return newLocation.path;
            } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
            }

        // Explore East
        var newLocation = exploreInDirection(currentLocation, 'right', grid);
            if (newLocation.status === 'Goal') {
            return newLocation.path;
            } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
            }

        // Explore South
        var newLocation = exploreInDirection(currentLocation, 'down', grid);
            if (newLocation.status === 'Goal') {
            return newLocation.path;
            } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
            }

        // Explore West
        var newLocation = exploreInDirection(currentLocation, 'left', grid);
            if (newLocation.status === 'Goal') {
            return newLocation.path;
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
    [1,1,1,1,"G"],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,1,1,0],
    [0,0,0,1,"G"],
];
   
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


grid[0][0] = "Start";



console.log(findShortestPath([0,1], grid));

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

