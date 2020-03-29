import { GameObjects, Geom, Input } from 'phaser'
import EventTypes from '../../event_types'

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
    this.scene = scene
    this.borders = [ border_top, border_bottom, border_left, border_right ]
    this.value = value

    scene.events.on(EventTypes.BUY_LOT, this.crossOut, this)
    scene.events.on(EventTypes.BUY_DEV, this.crossOut, this)
  }

  crossOut() {
    if(this.isSelected) {
      this.isSelectable = false
      const SIZE = 30
      const HALF = SIZE / 2
      const line_1 = new Phaser.GameObjects.Line(this.scene, HALF, HALF, 0, 0, SIZE, SIZE, 0xfc0303)
      const line_2 = new Phaser.GameObjects.Line(this.scene, HALF, HALF, SIZE, 0, 0, SIZE, 0xfc0303)
      this.add([ line_1, line_2 ])
    }
  }

  setValue(val) {
    this.text.setText(val)
    this.value = val
  }

  setIsSelectable() {
    const SIZE = 30

    this.isSelectable = true
    const shape = new Geom.Rectangle(0, 0, SIZE, SIZE)
    this.setInteractive(shape, Geom.Rectangle.Contains)

    this.isSelected = false
    this.on(Input.Events.GAMEOBJECT_POINTER_UP, this.onPointerUp)
  }

  onPointerUp() {
    if(this.isSelectable) {
      if(this.isSelected) {
        this.deselect()
      } else {
        this.select()
      }
    }
  }

  select() {
    this.borders.forEach(border => border.strokeColor = 0x34e81c)
    this.isSelected = true
    this.scene.events.emit(EventTypes.DIE_SELECTED, this.value)
  }

  deselect() {
    this.borders.forEach(border => border.strokeColor = 0x000000)
    this.isSelected = false
    this.scene.events.emit(EventTypes.DIE_DESELECTED, this.value)
  }
}