import csv from './setup/0.csv'

export const getBoard = () => {
  const data = csv.map(e => Object.values(e))
  return data
}
