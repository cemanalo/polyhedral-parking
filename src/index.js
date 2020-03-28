import Phaser from "phaser";
import Board from './components/board'

import treeImg from "./assets/tree.png";
import pathImg from "./assets/path.png";
import waterImg from "./assets/water.png";
import benchImg from "./assets/bench.png";

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
  this.load.image("tree", treeImg);
  this.load.image("path", pathImg);
  this.load.image("water", waterImg);
  this.load.image("bench", benchImg);
}

function create() {
  // const logo = this.add.image(400, 150, "logo");

  const board = new Board(this, 20, 30)
  this.add.existing(board)
}
