Dummy = require('../../../src/js/game/models/dummy.coffee')

describe "Another suite", ->
  it "can use external class", ->
    expect((new Dummy()).message).toBe("Hello")
