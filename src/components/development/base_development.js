import Phaser from 'phaser'

export default class BaseDevelopment extends Phaser.GameObjects.Image {
  constructor (scene, x, y, texture) {
    super(scene, x, y, texture)
    this.scale = .8
  }
}