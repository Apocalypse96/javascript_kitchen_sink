var Rook = function(config) {
    this.type = 'rook';
    this.constructor(config);
};

Rook.prototype = new Piece({});

Rook.prototype.isValid = function(targetPosition) {
    // Convert current position to row and column
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    // Ensuring it's the player's turn
    if (this.color !== this.board.currentPlayer) {
        console.warn("Not your turn");
        return false;
    }

    // Checking for vertical movement
    if (currentCol === targetCol) {
        let minRow = Math.min(currentRow, targetRow);
        let maxRow = Math.max(currentRow, targetRow);

        // Checking if there are any pieces blocking the vertical path
        for (let row = minRow + 1; row < maxRow; row++) {
            let new_position = { col: currentCol, row: row.toString() };
            if (this.board.getPieceAt(new_position)) { 
                console.warn("Invalid move for Rook: Path is blocked.");
                return false; 
            }
        }

        let targetPiece = this.board.getPieceAt(targetPosition.col + targetPosition.row);
        if (targetPiece && targetPiece.color === this.color) {
            console.warn("Invalid move for Rook: Cannot capture your own piece.");
            return false; 
        }
        return true;
    }

    // Checking for horizontal movement
    if (currentRow === targetRow) {
        let minCol = Math.min(currentCol.charCodeAt(0), targetCol.charCodeAt(0));
        let maxCol = Math.max(currentCol.charCodeAt(0), targetCol.charCodeAt(0));

        // Checking if there are any pieces blocking the horizontal path
        for (let col = minCol + 1; col < maxCol; col++) {
            let new_position = { col: String.fromCharCode(col), row: currentRow.toString() };            
            if (this.board.getPieceAt(new_position)) {
                console.warn("Invalid move for Rook: Path is blocked.");
                return false; 
            }
        }

        let targetPiece = this.board.getPieceAt(targetPosition.col + targetPosition.row);
        if (targetPiece && targetPiece.color === this.color) {
            console.warn("Invalid move for Rook: Cannot capture your own piece.");
            return false; 
        }

        return true; 
    }

    console.warn("Invalid move for Rook");
    return false; 
};

Rook.prototype.moveTo = function(targetPosition) {
    if (this.isValid(targetPosition)) {
        let targetPiece = this.board.getPieceAt({ col: targetPosition.col, row: targetPosition.row });
        
        // Handling capturing an opponent's piece
        if (targetPiece && targetPiece.color !== this.color) {
            console.log("Killing opponent's piece:", targetPiece);
            this.kill(targetPiece);
        }

        // Updating the Rook's position
        this.position = targetPosition.col + targetPosition.row;
        this.render();

        // Switch to the next player
        this.board.toggle();
    }
};
