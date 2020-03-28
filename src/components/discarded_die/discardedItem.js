import { GameObjects } from 'phaser'

export default class DiscardedItem extends GameObjects.Container {
  constructor(scene, x, y) {
    const SIZE = 20
    const HALF = SIZE / 2

    const rectangle = new GameObjects.Rectangle(scene, HALF, 0, SIZE, SIZE, 0xffffff)

    super(scene, x, y, [ rectangle ])
  }
}