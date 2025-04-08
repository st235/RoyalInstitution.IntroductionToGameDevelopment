export default class SnakeSegment extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y) {
        super(scene, x, y,
            /* width= */ 32, /* height= */ 32,
            /* color= */ 0x2e2e2e);
    }
}
