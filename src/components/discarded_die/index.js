import { GameObjects } from 'phaser'
import DiscardedItem from './discardedItem'

export default class DiscardedDie extends GameObjects.Container {
  constructor(scene, x, y) {
    const MAX_ITEM = 6
    const SIZE = 30
    const discardedItems = []
    const label = '1★ per discarded die'
    const FONT_COLOR = '#fc0303'

    const text = new GameObjects.Text(scene, 0, 0, label, { color: FONT_COLOR, fontSize: 8 })
    for(var i = 0; i < MAX_ITEM; i++) {
      const discardedItem = new DiscardedItem(scene, (SIZE * i) + 100, 0)
      discardedItems.push(discardedItem)
    }

    super(scene, x, y, [ text, ...discardedItems ])
  }
}