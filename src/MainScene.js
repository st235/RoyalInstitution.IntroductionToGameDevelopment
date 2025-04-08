import SnakeSegment from "./SnakeSegment.js";

export default class MainScene extends Phaser.Scene {
    create() {
        this.snake_segment = new SnakeSegment(this,
            this.cameras.main.width / 2, this.cameras.main.height / 2);

        this.children.add(this.snake_segment);
    }
};
