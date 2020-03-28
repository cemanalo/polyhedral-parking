import { GameObjects } from 'phaser'

export default class RoundItem extends GameObjects.Container {
  constructor(scene, x, y, roundNumber) {
    const FONT_COLOR = 0xfff
    const WIDTH = 250
    const HEIGHT = 40
    const HALF_WIDTH = WIDTH / 2
    const HALF_HEIGHT = HEIGHT / 2

    const text = new GameObjects.Text(scene, -30, -10, roundNumber, { color: FONT_COLOR, fontSize: 25 })
    const rectangle = new GameObjects.Rectangle(scene, WIDTH / 2, 0, WIDTH, HEIGHT, 0xffffff)

    const border_top = new GameObjects.Line(scene, HALF_WIDTH, (HALF_HEIGHT * -1), 0, 0, WIDTH, 0, 0)
    const border_bottom = new GameObjects.Line(scene, HALF_WIDTH, HALF_HEIGHT, 0, 0, WIDTH, 0, 0)
    const border_left = new GameObjects.Line(scene, 0, 0, 0, 0, 0, HEIGHT, 0)
    const border_right = new GameObjects.Line(scene, WIDTH, 0, 0, 0, 0, HEIGHT, 0)

    super(scene, x, y, [ text, rectangle, border_top, border_bottom, border_left, border_right ])
  }
}