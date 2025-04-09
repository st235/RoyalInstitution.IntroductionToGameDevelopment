import Snake from "./Snake.js";

const _GAMEFIELD_ROWS = 20
const _GAMEFIELD_COLUMNS = 30

export default class MainScene extends Phaser.Scene {
    create() {
        const viewportWidth = this.game.config.width;
        const viewportHeight = this.game.config.height;

        const segmentWidth = viewportWidth / _GAMEFIELD_COLUMNS;
        const segmentHeight = viewportHeight / _GAMEFIELD_ROWS;

        this._snake = new Snake(this,
            Phaser.Math.Between(0, _GAMEFIELD_ROWS), Phaser.Math.Between(0, _GAMEFIELD_COLUMNS),
            segmentWidth, segmentHeight,
            _GAMEFIELD_ROWS, _GAMEFIELD_COLUMNS);

        this.add.existing(this._snake);
    }

    update(time) {
    }
};
