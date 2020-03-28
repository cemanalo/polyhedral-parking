import Phaser  from 'phaser'
import EventTypes from '../../event_types'

export default class Cell extends Phaser.GameObjects.Container {
  constructor(scene, x, y, value, boardIdx) {
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
    
    super(scene, x, y, [rectangle, text, border_top, border_bottom, border_left, border_right])

    this.boardIdx = boardIdx
    this.value = value
    this.borders = [ border_top, border_bottom, border_left, border_right ]
    this.scene = scene
    this.rectangle = rectangle
    this.bought = false

    this.isSelectable = false
    const shape = new Phaser.Geom.Rectangle(0, 0, SIZE, SIZE)
    this.setInteractive(shape, Phaser.Geom.Rectangle.Contains)

    this.scene.events.on(EventTypes.SELECTED_DICE_UPDATED, this.onSelectedDiceUpdated, this)
    this.scene.events.on(EventTypes.SELECTED_CELL, this.onSelectedCell, this)
    this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.onPointerUp)
  }

  onSelectedCell(boardIdx) {
    const sum = this.scene.selectedDice.reduce((prev, curr) => prev + curr, 0)
    if(!Phaser.Geom.Point.Equals(this.boardIdx, boardIdx) && !this.bought && this.value == sum) {
      this.rectangle.setFillStyle(0x0f79a6, .7)
      this.isSelectable = true
    }
  }

  onSelectedDiceUpdated() {
    const sum = this.scene.selectedDice.reduce((prev, curr) => prev + curr, 0)
    this.rectangle.setFillStyle(0xffffff)
    this.isSelectable = false

    if(!this.bought && this.value == sum) {
      this.rectangle.setFillStyle(0x0f79a6, .7)
      this.isSelectable = true
    }
  }

  onPointerUp() {
    if(this.isSelectable) {
      this.rectangle.setFillStyle(0x34e81c, .7)
      this.isSelectable = false
      this.scene.events.emit(EventTypes.SELECTED_CELL, this.boardIdx)
    }
  }

}