import SnakeScene from "./SnakeScene";

const GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: SnakeScene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    }
};

export { GameConfig };
