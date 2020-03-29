import BaseDevelopment from './base_development'

export default class Tree extends BaseDevelopment {
  constructor(scene, x, y) {
    super(scene, x, y, 'tree')
    this.minCost = 1
    this.maxCost = 4
  }
}