import { GameObjects, Events } from 'phaser'
import Die from './die'
import EventTypes from '../../event_types'

export default class Dice extends GameObjects.Container {
  constructor(scene, x, y, diceValues) {
    const diceTypes = [ 4, 6, 8, 10, 12, 20 ] 
    const dice = []

    for(var i = 0; i < diceTypes.length; i++) {
      const die = new Die(scene, i * 40, 0, diceTypes[i])
      if(diceValues) die.setValue(diceValues[i])
      dice.push(die)
    }

    super(scene, x, y, [ ...dice ])
    scene.events.on(EventTypes.ROLL_DICE, this.onRollDice, this)

    this.diceTypes = diceTypes
    this.dice = dice
    this.scene = scene
  }

  onRollDice() {
    const diceValues = []
    for(var i = 0; i < this.diceTypes.length; i++) {
      diceValues[i] = Math.ceil(Math.random() * this.diceTypes[i])
      this.dice[i].setValue(diceValues[i])
    }
    
    this.scene.events.emit(EventTypes.ROLL_DICE_DONE, diceValues)
  }
}