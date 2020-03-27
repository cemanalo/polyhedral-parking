import Phaser from 'phaser'

import Cell from '../cell'
import Penalty from '../penalty'
import { getBoard } from '../../game_component/board'

export default class Board extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    const SIZE = 50
    const boardSetup = getBoard()
    const penaltyValues = [1, 3, 6]

    const cells = []
    const penalties = []

    for(var row = 0; row < 9; row++) {
      for(var col = 0; col < 9; col++) {
        const xAxis = col * SIZE
        const yAxis = row * SIZE
        const cell = new Cell(scene, xAxis, yAxis, boardSetup[row][col])
        cells.push(cell)
      }
    }

    for(var i = 0; i < penaltyValues.length; i++) {
      const xAxis = SIZE * i
      const yAxis = SIZE * 9 + 15
      const penalty = new Penalty(scene, xAxis, yAxis, penaltyValues[i])
      penalties.push(penalty)
    }
    
    super(scene, x, y, [ ...cells, ...penalties ])
  }
}