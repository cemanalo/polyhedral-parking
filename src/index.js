import Phaser from "phaser";
import Board from './components/board'
import Penalty from './components/penalty'

// import logoImg from "./assets/logo.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  backgroundColor: 0xf5ccab,
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

function preload() {
  // this.load.image("logo", logoImg);
}

function create() {
  // const logo = this.add.image(400, 150, "logo");

  // this.tweens.add({
  //   targets: logo,
  //   y: 450,
  //   duration: 2000,
  //   ease: "Power2",
  //   yoyo: true,
  //   loop: -1
  // });
  // this.rect
  // const rect = new Phaser.GameObjects.Rectangle(this, 30, 30, 50, 50, 0x00ffff, 1)
  // const cell = new Cell(this, 50, 50, 10)
  const board = new Board(this, 20, 30)
  this.add.existing(board)
}
