import { GameObjects } from 'phaser'

import EventTypes from '../../event_types'
import ActionTypes from '../../action_types'

export default class BaseDevelopment extends GameObjects.Container {
  constructor (scene, x, y, texture) {
    const image = new GameObjects.Image(scene, 0, 0, texture)

    super(scene, x, y, [ image ])

    this.image = image
    this.image.scale = .8
    this.texture = texture

    this.scene.events.on(EventTypes.SELECTED_DICE_UPDATED, this.onSelectedDiceUpdated, this)

  }

  onSelectedDiceUpdated() {
    const sum = this.scene.selectedDice.reduce((prev, curr) => prev + curr, 0)
    const SIZE = 40
    const HALF = SIZE / 2
    const GREEN = 0x34e81c
    console.log({sum})
    if(this.scene.actionNeed === ActionTypes.BUY_DEV) {
      if(sum >= this.minCost && sum <= this.maxCost) {
        console.log(this.texture)
        if(!this.isSelected) {
          const border_top = new GameObjects.Line(this.scene, 0, -HALF, 0, 0, SIZE, 0, GREEN)
          const border_bottom = new GameObjects.Line(this.scene, 0, HALF, 0, 0, SIZE, 0, GREEN)
          const border_left = new GameObjects.Line(this.scene, -HALF, 0, 0, 0, 0, SIZE, GREEN)
          const border_right = new GameObjects.Line(this.scene, HALF, 0, 0, 0, 0, SIZE, GREEN)
          this.borders = [ border_top, border_bottom, border_left, border_right ]
          this.add(this.borders)
        }
        this.isSelected = true
      } else {
        this.isSelected = false
        this.remove(this.borders)
      }
    }
  }
}