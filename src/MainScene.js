import Snake from "./Snake.js";
import Food from "./Food.js";

const _GAMEFIELD_ROWS = 20
const _GAMEFIELD_COLUMNS = 30

const _SNAKE_MOVE_TIME_MS = 100;

export default class MainScene extends Phaser.Scene {
    preload() {
        this._isRunning = true;
        this._cursors = this.input.keyboard.createCursorKeys();
        this._lastUpdateTime = 0;
        this._currentScore = 0;
    }

    create() {
        const viewportWidth = this.game.config.width;
        const viewportHeight = this.game.config.height;

        const segmentWidth = viewportWidth / _GAMEFIELD_COLUMNS;
        const segmentHeight = viewportHeight / _GAMEFIELD_ROWS;

        this._snake = new Snake(this,
            Phaser.Math.Between(0, _GAMEFIELD_ROWS), Phaser.Math.Between(0, _GAMEFIELD_COLUMNS),
            segmentWidth, segmentHeight,
            _GAMEFIELD_ROWS, _GAMEFIELD_COLUMNS);

        this._foodItem = new Food(this, segmentWidth, segmentHeight);
        this._foodItem.place(this._snake.bodyCoordinates(), _GAMEFIELD_ROWS, _GAMEFIELD_COLUMNS);

        this._scoreText = this.add.text(viewportWidth - 220, 20, "Score: 0")
            .setFontSize(32)
            .setDepth(10);

        this.add.existing(this._snake);
        this.add.existing(this._foodItem);
    }

    update(time) {
        if (!this._isRunning) {
            return;
        }

        if (this._cursors.right.isDown) {
            this._snake.faceRight();
        } else if (this._cursors.up.isDown) {
            this._snake.faceUp();
        } else if (this._cursors.left.isDown) {
            this._snake.faceLeft();
        } else if (this._cursors.down.isDown) {
            this._snake.faceDown();
        }

        if (time - this._lastUpdateTime > _SNAKE_MOVE_TIME_MS) {
            this._lastUpdateTime = time;
            this._snake.move();

            const snakeOccupiedPoints = this._snake.bodyCoordinates();

            if (this._snake.checkCollisionWith(this._foodItem.i, this._foodItem.j)) {
                this._snake.grow();
                this._foodItem.place(snakeOccupiedPoints, _GAMEFIELD_ROWS, _GAMEFIELD_COLUMNS);
                this._currentScore += this._foodItem.score;
                this._scoreText.setText("Score: " + this._currentScore);
            }

            for (const row in snakeOccupiedPoints) {
                for (const column in snakeOccupiedPoints[row]) {
                    if (snakeOccupiedPoints[row][column] > 1) {
                        this._isRunning = false;
                    }
                }
            }
        }
    }
};
