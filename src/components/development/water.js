import BaseDevelopment from './base_development'

export default class Water extends BaseDevelopment {
  constructor(scene, x, y) {
    super(scene, x, y, 'water')
    this.minCost = 9
    this.maxCost = 12
  }
}