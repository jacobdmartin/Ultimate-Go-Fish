import Player from '.././Player.js'
import Results from '.././Results.js'

describe('ResultsView', () => {
  const bill = new Player("Bill")
  const james = new Player("James")

  describe('renderPlayerResults', () => {
    it('expects the resulted output message to be for the player', () => {
      const result = new Results(bill, james, "5", "takeMessage", 1)
      expect(result.messageFor(bill.name())).toEqual("You took 1 5 from James")
    })

    it('expects the resulted output message to be for the opponent', () => {
      const result = new Results(bill, james, "5", "goFishMessage")
      expect(result.messageFor(bill.name())).toEqual("You asked for a 5 from James but had to Go Fish")
    })

    it('expects the resulted output message to be for the opponent', () => {
      const result = new Results(bill, james, "5", "goFishMessage")
      expect(result.messageFor(bill.name())).toEqual("You asked for a 5 from James but had to Go Fish")
    })

    it('expects the resulted output message to be for the opponent', () => {
      const result = new Results(bill, james, "5", "fishedRankMessage")
      expect(result.messageFor(bill.name())).toEqual("You fished what you asked for! Take another turn")
    })
  })

  describe('renderOpponentResults', () => {
    it('expects the resulted output message to be for the player', () => {
      const result = new Results(bill, james, "5", "takeMessage", 1)
      expect(result.messageFor(james.name())).toEqual("James took 1 5 from You")
    })

    it('expects the resulted output message to be for the opponent', () => {
      const result = new Results(bill, james, "5", "goFishMessage")
      expect(result.messageFor(james.name())).toEqual("James asked for a 5 from You but had to Go Fish")
    })

    it('expects the resulted output message to be for the opponent', () => {
      const result = new Results(bill, james, "5", "goFishMessage")
      expect(result.messageFor(james.name())).toEqual("James asked for a 5 from You but had to Go Fish")
    })

    it('expects the resulted output message to be for the opponent', () => {
      const result = new Results(bill, james, "5", "fishedRankMessage")
      expect(result.messageFor(james.name())).toEqual("James fished what they asked for, they get to take another turn")
    })
  })
})
