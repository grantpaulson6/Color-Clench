# Color Clench | [Live](http://color-clench.herokuapp.com/)

A mobile friendly brain teaser game that tests and trains your ability at divided attention

## How to Play

Users touch or click intersections, depicted below as gray circles, to change the route.  The objective is to direct
moving circles to their matching colored square by toggling intersections as the circles move.  Score as many correct colors
as you can, or increase the difficulty settings, to get a high score!

Gameplay example:

![](https://media.giphy.com/media/WTpe69NJkI97bvfTFs/giphy.gif)

## Key Feautures

  Perhaps the most interesting part of the game is that there is virtually unlimited variation in gameplay; its algorithm
generates a level each time the user starts a game.  One of the difficulty settings (size) determines the number of leaf nodes, or squares,
that the algorithm targets for creating a binary node tree.

  It then uses a breadth first search to randomly generate the tree. Each node is associated with a point on the screen, and points to the next node.  Nodes with zero children are the leaf nodes, nodes with one child
are continuations of the track, and nodes with two children are the intersections.

Psuedo-code for algorithm to generate levels:
```c#
buildTrack() {

        rootNode = new TrackTile(randomPosition);
        nodeQueue = [rootNode];

        while (nodeQueue.length > 0) {

            currentNode = nodeQueue[0];
            validNodes = this.allValidNodes(currentNode.pos);
            nextNodePos = this.randomValidNode(validNodes);

            // generate leaf node if this isn't our sole branch
            if (randomChance && (branchCount - leafCount > 1) && validNodes.length > 0) {
                leafCount += 1;
                nextNode = new TrackTile({ pos: nextNodePos });
                currentNode.addNextTile(nextNode);
            } 
            
            // generate intersection if we haven't met our target number of branches
            else if (randomChance && branchCount < requiredLeaves && validNodes.length > 1) {
                branchCount += 1;
                
                nextNode = new TrackTile({ pos: nextNodePos });
                nextNode2 = new TrackTile({ pos: nextNodePos2 });

                currentNode.addNextTile(nextNode);
                currentNode.addNextTile(nextNode2);
                
                nodeQueue.push(nextNode);
                nodeQueue.push(nextNode2);
            }

            else {
            
                // if more than 1 remaing leaf, just add one child to extend the current track
                if (validNodes.length > 0 && requiredLeaves - leafCount > 1) {
                    nextNode = new TrackTile({ pos: nextNodePos });
                    currentNode.addNextTile(nextNode);
                    nodeQueue.push(nextNode);
                    
                // if only one remaing station, maybe turn into leaf node, otherwise extend track
                } else if (leafCount < requiredLeaves) {
                    if (randomChance && validNodes.length > 0) {
                        nextNode = new TrackTile({ pos: nextNodePos });
                        currentNode.addNextTile(nextNode);
                        nodeQueue.push(nextNode);
                    } else {
                        leafCount += 1;
                    }
                }
            }
            nodeQueue.shift();
        }

        // if track isn't as desired, try again
        if (this.stationCount != this.requiredStations) {
            this.buildTrack();
        }
    }
```

Auto-generation of levels example:

![](https://media.giphy.com/media/dY0MyiBnzIHQlYE7JJ/giphy.gif)

* The game uses straight forward object oriented programming to structure the game logic, with two main classes being tracks and trains.

* Rendering is achieved by using DOM canvas for painting the objects and the WebAPI’s asynchronous functions such as requestAnimationFrame and 
setTimeout for real-time animation

* The app is ideal for mobiel touch-screens as it is Built with responsive CSS using media queries and flex-box
