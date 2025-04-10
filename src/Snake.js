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

    checkCollisionWith(i, j) {
        const headSegment = this.getLast(/* active= */ true);
        return (headSegment.i == i && headSegment.j == j);
    }

    bodyCoordinates() {
        let bodyCoordinates = {};
        this.children.each(child => {
            const [i, j] = [child.i, child.j];

            if (!(i in bodyCoordinates)) {
                bodyCoordinates[i] = {};
            }
            bodyCoordinates[i][j] = true;
        }, true);
        return bodyCoordinates;
    }

    grow() {
        const tailSegment = this.getFirst(/* active= */ true);

        const newChildren = [];
        // Grow the snake by one segment, and add it to the
        // back of the segments list.
        newChildren.push([tailSegment.i, tailSegment.j]);

        // Copy existing segments.
        this.children.each(child => {
            newChildren.push([child.i, child.j]);
        });

        // Remove all children and stop drawing them.
        this.clear(true, true);

        for (const segment of newChildren) {
            const [i, j] = segment;
            this._addSegment(i, j);
        }
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