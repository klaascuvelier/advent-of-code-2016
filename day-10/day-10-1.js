

// make 5 bots, initialize array
const bots = Array(5).fill().map(() => []);


function gameLoop () {
    
    let moves = run();
    while (moves > 0) {
        moves = run();
    }

    function run () {
        let moves = 0;

         bots.forEach(processors => {
            if (processors.length === 2) {
                moves++;

                const high = Math.max(processors[0], processors[1]);
                const low = Math.max(processors[0], processors[1]);

                
            }
        });

        return moves;
    }
}

function test () {
    bots[1] = [3];
    bots[2] = [5, 2]
}