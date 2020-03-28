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
import BuyLot from '../button/buy_lot'

import { getBoard } from '../../game_component/board'
import EventTypes from '../../event_types'
import GameMessage from './game_message'

export default class Board extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    const SIZE = 50
    const HALF = SIZE / 2
    const boardSetup = getBoard()
    const penaltyValues = ['1★', '3★', '6★']

    const cells = []
    const penalties = []

    // board
    for(var row = 0; row < 9; row++) {
      for(var col = 0; col < 9; col++) {
        const xAxis = col * SIZE
        const yAxis = row * SIZE
        const boardIdx = new Phaser.Geom.Point(col, row)
        const cell = new Cell(scene, xAxis, yAxis, boardSetup[row][col], boardIdx)
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
    const developments = Board.getDevelopments(scene, SIZE, HALF)

    const roundTracker = new RoundTracker(scene, SIZE * 10, SIZE + 20)
    const discardedDie = new DiscardedDie(scene, SIZE * 3 + 10, (SIZE * 10) - 15)
    const dice = new Dice(scene, SIZE * 10 + 20, SIZE * 9.6)

    // actions 
    const buyLotBtn = new BuyLot(scene, SIZE * 11 + 20, SIZE * 10.7)
    const rollDiceBtn = new RollDice(scene, SIZE * 13 + 20, SIZE * 10.7)

    const guideText = new Phaser.GameObjects.Text(scene, SIZE * 5, SIZE * 10.5, '', { fontSize: 15, color: 0xffffff })

    super(scene, x, y, [ ...cells, ...penalties, ...developments, roundTracker, discardedDie, dice, buyLotBtn, rollDiceBtn, guideText ])
    
    this.guideText = guideText
    this.selectedDice = []
    this.cells = cells
    this.scene.selectedDice = []
    this.buyLotBtn = buyLotBtn
    this.rollDiceBtn = rollDiceBtn

    scene.events.on(EventTypes.ROLL_DICE_DONE, this.onRollDiceDone, this)
    scene.events.on(EventTypes.DIE_SELECTED, this.onDieSelected, this)
    scene.events.on(EventTypes.DIE_DESELECTED, this.onDieDeselected, this)
    scene.events.on(EventTypes.SELECTED_CELL, this.onSelectedCell, this)
    scene.events.on(EventTypes.BUY_LOT, this.onBuyLot, this)
  }

  onBuyLot() {
    // const cell = this.cells.find((c) => Phaser.Geom.Point.Equals(c.boardIdx, this.scene.selectedDice))
    // cell.crossOut()
  }

  onRollDiceDone() {
    this.guideText.setText(GameMessage.SELECT_DICE)
  }

  onDieSelected(value) {
    this.scene.selectedDice.push(value)
    this.guideText.setText(GameMessage.SELECT_LOT_TO_BUY)
    this.buyLotBtn.setEnabled()
    this.onSelectedDiceUpdated()
  }

  onSelectedCell(boardIdx) {
    this.scene.selectedCell = boardIdx
    console.log({selectedCell: boardIdx})
  }

  onDieDeselected(value) {
    const idx = this.scene.selectedDice.indexOf(value)
    this.scene.selectedDice.splice(idx, 1)
    if(!this.scene.selectedDice.length) {
      this.guideText.setText(GameMessage.SELECT_DICE)
      this.buyLotBtn.setEnabled(false)
    } 
    this.onSelectedDiceUpdated()
  }

  onSelectedDiceUpdated() {
    this.scene.events.emit(EventTypes.SELECTED_DICE_UPDATED)
  }

  static getDevelopments(scene, SIZE, HALF) {
    const tree = new Tree(scene, SIZE * 10 + 20, HALF)
    const treeCost = new Phaser.GameObjects.Text(scene, SIZE * 10 + 10, SIZE, '1-4', { fontSize: 12, color: 0xffffff })
    const path = new Path(scene, SIZE * 11 + 20, HALF)
    const pathCost = new Phaser.GameObjects.Text(scene, SIZE * 11 + 10, SIZE, '5-8', { fontSize: 12, color: 0xffffff })
    const water = new Water(scene, SIZE * 12 + 20, HALF)
    const waterCost = new Phaser.GameObjects.Text(scene, SIZE * 12 + 10, SIZE, '9-12', { fontSize: 12, color: 0xffffff })
    const bench = new Bench(scene, SIZE * 13 + 20, HALF)
    const benchCost = new Phaser.GameObjects.Text(scene, SIZE * 13 + 10, SIZE, '13+', { fontSize: 12, color: 0xffffff })

    return [ tree, treeCost, path, pathCost, water, waterCost, bench, benchCost ]
  }

  static getActions(scene, SIZE) {
    const buyLotBtn = new BuyLot(scene, SIZE * 11 + 20, SIZE * 10.7)
    const rollDiceBtn = new RollDice(scene, SIZE * 13 + 20, SIZE * 10.7)

    return [ buyLotBtn, rollDiceBtn ]
  }
}