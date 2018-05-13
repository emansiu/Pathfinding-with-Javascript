while (queue.length > 0) {
    // Take the first location off the queue
    var currentLocation = queue.shift();
    
    var directions = ["North", "East", "South", "West"];

        for( dir in directions){

        var newLocation = exploreInDirection(currentLocation, directions[dir], grid);
        
            if (newLocation.status === 'Goal') {
                return newLocation.path;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            };
        
        }
    
    return false;
    
};