import { GameObjects } from 'phaser'

export default class Die extends GameObjects.Container {
  constructor(scene, x, y, val) {
    const SIZE = 30
    const HALF = SIZE / 2
    const value = val
    const FONT_COLOR = 0xfff

    const rectangle = new GameObjects.Rectangle(scene, HALF, HALF, SIZE, SIZE, 0xffffff)
    const text = new GameObjects.Text(scene, 18, 15, value, { color: FONT_COLOR, fontSize: 20 })
    text.setOrigin(0.6, 0.5)

    const border_top = new GameObjects.Line(scene, HALF, 0, 0, 0, SIZE, 0, 0)
    const border_bottom = new GameObjects.Line(scene, HALF, SIZE, 0, 0, SIZE, 0, 0)
    const border_left = new GameObjects.Line(scene, 0, HALF, 0, 0, 0, SIZE, 0)
    const border_right = new GameObjects.Line(scene, SIZE, HALF, 0, 0, 0, SIZE, 0)

    super(scene, x, y, [ rectangle, text, border_top, border_bottom, border_left, border_right ])
    this.text = text
  }

  setValue(val) {
    this.text.setText(val)
  }
}