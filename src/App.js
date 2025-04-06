import MainScene from "./MainScene.js";

const GameConfig = {
    type: Phaser.AUTO,
    parent: "game",
    width: 960,
    height: 640,
    backgroundColor: '#8da259',
    scene: MainScene,
    physics: {
        default: "arcade",
    }
};

export { GameConfig };
