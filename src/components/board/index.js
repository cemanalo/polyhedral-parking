import Phaser from 'phaser'

import Cell from '../cell'
import Penalty from '../penalty'
import Tree from '../development/tree'
import Path from '../development/path'
import Water from '../development/water'
import Bench from '../development/bench'
import RoundTracker from '../round_tracker'
import DiscardedDie from '../discarded_die'
import Dice from '../dice'
import RollDice from '../button/roll_dice'

import { getBoard } from '../../game_component/board'

export default class Board extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    const SIZE = 50
    const HALF = SIZE / 2
    const boardSetup = getBoard()
    const penaltyValues = [1, 3, 6]

    const cells = []
    const penalties = []

    // board
    for(var row = 0; row < 9; row++) {
      for(var col = 0; col < 9; col++) {
        const xAxis = col * SIZE
        const yAxis = row * SIZE
        const cell = new Cell(scene, xAxis, yAxis, boardSetup[row][col])
        cells.push(cell)
      }
    }

    //penalty
    for(var i = 0; i < penaltyValues.length; i++) {
      const xAxis = SIZE * i
      const yAxis = SIZE * 9 + 15
      const penalty = new Penalty(scene, xAxis, yAxis, penaltyValues[i])
      penalties.push(penalty)
    }
    
    // development
    const tree = new Tree(scene, SIZE * 10 + 20, HALF)
    const path = new Path(scene, SIZE * 11 + 20, HALF)
    const water = new Water(scene, SIZE * 12 + 20, HALF)
    const bench = new Bench(scene, SIZE * 13 + 20, HALF)

    const roundTracker = new RoundTracker(scene, SIZE * 10, SIZE + 20)
    const discardedDie = new DiscardedDie(scene, SIZE * 3 + 10, (SIZE * 10) - 15)
    const dice = new Dice(scene, SIZE * 10 + 20, SIZE * 9.6)

    const rollDiceBtn = new RollDice(scene, SIZE * 13 + 20, SIZE * 10.7)
    super(scene, x, y, [ ...cells, ...penalties, tree, path, water, bench, roundTracker, discardedDie, dice, rollDiceBtn ])

  }
}