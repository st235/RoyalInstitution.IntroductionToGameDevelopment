import SnakeSegment from "./SnakeSegment.js";

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

        this._addSegment(initialI, initialJ);
    }

    _addSegment(i, j) {
        const newSegment = new SnakeSegment(this.scene, i, j,
            this._segmentWidth, this._segmentHeight);
        this.add(newSegment, true);
    }
};