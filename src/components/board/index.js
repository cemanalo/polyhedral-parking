import Phaser from 'phaser'

import Cell from '../cell'
import Penalty from '../penalty'
import Tree from '../development/tree'
import Path from '../development/path'
import Water from '../development/water'
import Bench from '../development/bench'

import { getBoard } from '../../game_component/board'

export default class Board extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    const SIZE = 50
    const HALF = SIZE / 2
    const boardSetup = getBoard()
    const penaltyValues = [1, 3, 6]

    const cells = []
    const penalties = []
    const developments = []

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
    const tree = new Tree(scene, SIZE * 10, HALF)
    const path = new Path(scene, SIZE * 11, HALF)
    const water = new Water(scene, SIZE * 12, HALF)
    const bench = new Bench(scene, SIZE * 13, HALF)

    super(scene, x, y, [ ...cells, ...penalties, tree, path, water, bench ])
  }
}