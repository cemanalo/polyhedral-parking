import  Phaser  from 'phaser'

export default class Cell extends Phaser.GameObjects.Container {
  constructor(scene, x, y, value) {
    const SIZE = 50
    const FONT_COLOR = 0xfff
    const HALF = SIZE / 2
    const rectangle = new Phaser.GameObjects.Rectangle(scene, HALF , HALF, SIZE, SIZE, 0xffffff, 1)
    const border_top = new Phaser.GameObjects.Line(scene, HALF, 0, 0, 0, SIZE, 0, 0)
    const border_bottom = new Phaser.GameObjects.Line(scene, HALF, SIZE, 0, 0, SIZE, 0, 0)
    const border_left = new Phaser.GameObjects.Line(scene, 0, HALF, 0, 0, 0, SIZE, 0)
    const border_right = new Phaser.GameObjects.Line(scene, SIZE, HALF, 0, 0, 0, SIZE, 0)
    
    const text = new Phaser.GameObjects.Text(scene, 18, 15, value, { color: FONT_COLOR, fontSize: 25 })
    text.setOrigin(0.3, 0.1)
    
    const triangle = new Phaser.GameObjects.Triangle(scene, 0, 0, 25, 10, 10, 20, 50, 30, 0x155c00)

    super(scene, x, y, [rectangle, text, border_top, border_bottom, border_left, border_right, triangle])
  }

}