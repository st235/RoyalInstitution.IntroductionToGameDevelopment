const _SEGMENT_COLOUR = 0x2e2e2e

export default class SnakeSegment extends Phaser.GameObjects.Rectangle {
    constructor(scene, i, j,
                width, height) {
        super(scene,
            /* x= */ j * width + width / 2,
            /* y= */ i * height + height / 2,
            width,
            height,
            /* color= */ _SEGMENT_COLOUR);

        this.i = i;
        this.j = j;
    }
}
