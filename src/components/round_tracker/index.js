import { GameObjects } from 'phaser'
import RoundItem from './round_item'

export default class RoundTracker extends GameObjects.Container {
  constructor(scene, x, y) {
    const roundItems = []
    const ROUND_MAX = 10
    const HEIGHT = 40
    for(var i = 0; i < ROUND_MAX; i++) {
      const roundItem = new RoundItem(scene, 0, (HEIGHT * i) + 20, i+1)
      roundItems.push(roundItem)
    }

    super(scene, x, y, roundItems )
  }
}