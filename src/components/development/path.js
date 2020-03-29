import BaseDevelopment from './base_development'

export default class Path extends BaseDevelopment {
  constructor(scene, x, y) {
    super(scene, x, y, 'path')
    this.minCost = 5
    this.maxCost = 8 
  }
}