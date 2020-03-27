import Phaser from 'phaser'

export default class Penalty extends Phaser.GameObjects.Container {
  constructor(scene, x, y, value) {
    const SIZE = 30
    const HALF = SIZE / 2
    const FONT_COLOR = '#fc0303'

    const rectangle = new Phaser.GameObjects.Rectangle(scene, HALF, HALF, SIZE, SIZE, 0xffffff, 1)
    const text = new Phaser.GameObjects.Text(scene, 18, 15, "±1", { color: FONT_COLOR, fontSize: 18 })
    text.setOrigin(0.6, 0.4)

    const border_top = new Phaser.GameObjects.Line(scene, HALF, 0, 0, 0, SIZE, 0, 0)
    const border_bottom = new Phaser.GameObjects.Line(scene, HALF, SIZE, 0, 0, SIZE, 0, 0)
    const border_left = new Phaser.GameObjects.Line(scene, 0, HALF, 0, 0, 0, SIZE, 0)
    const border_right = new Phaser.GameObjects.Line(scene, SIZE, HALF, 0, 0, 0, SIZE, 0)
    
    const penaltyVal = new Phaser.GameObjects.Text(scene, 18, SIZE + 5, value, { color: FONT_COLOR, fontSize: 12 } )
    penaltyVal.setOrigin(0.8, 0.1)

    super(scene, x, y, [rectangle, text, border_top, border_bottom, border_left, border_right, penaltyVal])
  }
}