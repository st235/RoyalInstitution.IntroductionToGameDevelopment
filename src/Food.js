const _FOOD_COLOUR = 0x2e2e2e
const _DEFAULT_CONSUMPTION_SCORE = 10

export default class Food extends Phaser.GameObjects.Star {
    constructor(scene,
                width, height,
                score = _DEFAULT_CONSUMPTION_SCORE) {
        super(scene, 
            /* x= */ 0, /* y= */ 0,
            /* points= */ 5, 
            /* innerRadius= */ Math.min(width, height) / 4,
            /* outerRadius= */ Math.max(width, height) / 2, 
            /* fillColor= */ _FOOD_COLOUR);

        this.width = width;
        this.height = height;
        this.score = score;
    }

    place(snakeBodyPoints, tableRows, tableColumns) {
        const availableCoordinates = [];
        for (let i = 0; i < tableRows; i++) {
            for (let j = 0; j < tableColumns; j++) {
                if (!snakeBodyPoints[i] || !snakeBodyPoints[i][j]) {
                    availableCoordinates.push([i, j]);
                }
            }
        }

        const newFoodItemPosition = Phaser.Math.RND.pick(availableCoordinates);
        const [ni, nj] = newFoodItemPosition;

        this.i = ni;
        this.j = nj;
        this.x = nj * this.width + this.width / 2;
        this.y = ni * this.height + this.height / 2;
    }
}
