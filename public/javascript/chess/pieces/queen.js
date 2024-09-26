var Queen = function(config) {
    this.type = 'queen';
    this.constructor(config);
};

// Inherit from Piece
Queen.prototype = new Piece({});

// Define the queen's move logic
Queen.prototype.moveTo = function(targetPosition) {
    const currentCol = this.position[0];
    const currentRow = parseInt(this.position[1], 10);
    const targetCol = targetPosition.col;
    const targetRow = parseInt(targetPosition.row, 10);

    const colDiff = Math.abs(currentCol.charCodeAt(0) - targetCol.charCodeAt(0));
    const rowDiff = Math.abs(currentRow - targetRow);

    // The queen can move in straight lines (row, column, or diagonal)
    if (colDiff === rowDiff || currentCol === targetCol || currentRow === targetRow) {
        if (!this.isValidMove(targetPosition)) {
            console.warn("Invalid move! Path is blocked.");
            return false;
        }

        // Check for valid move (implement collision detection or other rules here)
        const targetPiece = this.board.getPieceAt(targetPosition);
        if (targetPiece) {
            if (targetPiece.color !== this.color) {
                // If target piece is of opposite color, capture it
                this.kill(targetPiece);
                console.log(`Captured ${targetPiece.type} at ${targetPosition.col}${targetPosition.row}`);
            } else {
                console.warn("Invalid move! You can't capture your own piece.");
                return false;
            }
        }
        // Move the queen to the new position
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        this.board.toggle();
    } else {
        console.warn("Invalid move for a queen!");
    }
};

// Function to check if the move is valid (no piece blocking the path)
Queen.prototype.isValidMove = function(targetPosition) {
    const currentCol = this.position[0];
    const currentRow = parseInt(this.position[1], 10);
    const targetCol = targetPosition.col;
    const targetRow = parseInt(targetPosition.row, 10);

    const colDiff = Math.abs(currentCol.charCodeAt(0) - targetCol.charCodeAt(0));
    const rowDiff = Math.abs(currentRow - targetRow);

    let stepCol = 0;
    let stepRow = 0;

    // Determine the step for the column and row
    if (colDiff > 0) {
        stepCol = currentCol < targetCol ? 1 : -1;
    }
    if (rowDiff > 0) {
        stepRow = currentRow < targetRow ? 1 : -1;
    }

    // Check each position along the path for obstacles
    let checkCol = currentCol.charCodeAt(0);
    let checkRow = currentRow;

    while (true) {
        checkCol += stepCol;
        checkRow += stepRow;

        if (String.fromCharCode(checkCol) === targetCol && checkRow === targetRow) {
            break;
        }

        const intermediatePosition = {
            col: String.fromCharCode(checkCol),
            row: checkRow.toString(),
        };

        if (this.board.getPieceAt(intermediatePosition)) {
            return false; // Path is blocked
        }
    }

    return true; // No obstacles found
};
