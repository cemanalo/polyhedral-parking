import { GameObjects, Input, Geom, Events} from 'phaser'
import EventTypes from '../../event_types'

export default class RollDice extends GameObjects.Container {
  constructor(scene, x, y) {
    const WIDTH = 80
    const HEIGHT = 30

    const rectangle = new GameObjects.Rectangle(scene, 0, 0, 80, 30, 0x649e67)
    const text = new GameObjects.Text(scene, 0, 0, 'ROLL', { fontSize: 25 })
    text.setOrigin(0.5, 0.5)

    const shape = new Geom.Rectangle(-WIDTH / 2, -HEIGHT / 2, 80, 30)
    super(scene, x, y, [ rectangle, text ])

    this.rectangle = rectangle
    this.setInteractive(shape, Geom.Rectangle.Contains)
    this.enabled = true
    this.text = text
    this.scene = scene

    this.on(Input.Events.GAMEOBJECT_POINTER_UP, this.onPointerUp)
    this.on(Input.Events.GAMEOBJECT_POINTER_DOWN, this.onPointerDown)

  }

  onPointerUp() {
    if (this.enabled) {
      this.enabled = false
      this.scene.events.emit(EventTypes.ROLL_DICE)
      this.rectangle.setScale(1, 1)
      this.rectangle.setFillStyle(0x999966)
    }
  }

  onPointerDown() {
    if (this.enabled) {
      this.rectangle.setScale(1.1, 1.1)
    }
  }
}