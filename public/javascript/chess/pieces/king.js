var King = function(config){
    this.type = 'king';
    this.constructor(config);
};



King.prototype = new Piece({});

King.prototype.isValid = function(newPosition){
    let curCol = this.position.charAt(0);
    let curRow = parseInt(this.position.charAt(1));

    let targetCol = newPosition.col;
    let targetRow = newPosition.row;

    let colDiff = Math.abs(targetCol.charCodeAt(0) - curCol.charCodeAt(0));
    let rowDiff = Math.abs(targetRow - curRow);

    let targetPiece = this.board.getPieceAt(newPosition);

    if (colDiff <= 1 && rowDiff <= 1) {
        if (!targetPiece || targetPiece.color !== this.color) {
            if (targetPiece && targetPiece.color !== this.color) {
                // Capture the opponent's piece
                targetPiece.kill(targetPiece);
            }
            return true;
        }
    }
    console.warn("Invalid move for king");
    return false;
};

King.prototype.moveTo = function(newPosition){
    // Check if the move is valid
    if(this.isValid(newPosition)){
        // Update the King's position
        this.position = newPosition.col + newPosition.row;
        
        this.render();
        this.board.toggle();
    } else {
        this.board.invalidMove();
    }
};