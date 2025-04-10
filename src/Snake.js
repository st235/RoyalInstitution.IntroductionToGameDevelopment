import SnakeSegment from "./SnakeSegment.js";

const _MOVE_DIRECTION_RIGHT = [0, 1];
const _MOVE_DIRECTION_UP = [-1, 0];
const _MOVE_DIRECTION_LEFT = [0, -1];
const _MOVE_DIRECTION_DOWN = [1, 0];

export default class Snake extends Phaser.GameObjects.Group {
    constructor(scene,
                initialI, initialJ,
                segmentWidth, segmentHeight,
                tableRows, tableColumns) {
        super(scene);

        this._segmentWidth = segmentWidth;
        this._segmentHeight = segmentHeight;

        this._tableRows = tableRows;
        this._tableColumns = tableColumns;

        this._moveDirection = _MOVE_DIRECTION_RIGHT;

        this._addSegment(initialI, initialJ);
    }

    _addSegment(i, j) {
        const newSegment = new SnakeSegment(this.scene, i, j,
            this._segmentWidth, this._segmentHeight);
        this.add(newSegment, true);
    }

    move() {
        const tailSegment = this.getFirst(/* active= */ true);
        const headSegment = this.getLast(/* active= */ true);

        this.remove(tailSegment, true, true);
        const [di, dj] = this._moveDirection;
        this._addSegment(/* i= */ (headSegment.i + di + this._tableRows) % this._tableRows,
            /* j= */ (headSegment.j + dj + this._tableColumns) % this._tableColumns);
    }

    faceRight() {
        this._moveDirection = _MOVE_DIRECTION_RIGHT;
    }

    faceUp() {
        this._moveDirection = _MOVE_DIRECTION_UP;
    }

    faceLeft() {
        this._moveDirection = _MOVE_DIRECTION_LEFT;
    }

    faceDown() {
        this._moveDirection = _MOVE_DIRECTION_DOWN;
    }
};