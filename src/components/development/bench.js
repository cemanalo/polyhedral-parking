import BaseDevelopment from './base_development'

export default class Bench extends BaseDevelopment {
  constructor(scene, x, y) {
    super(scene, x, y, 'bench')
    this.minCost = 13
    this.maxCost = 100
  }
}