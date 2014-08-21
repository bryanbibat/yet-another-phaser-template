class Game
  constructor: (game) ->

  create: ->

  update: ->

  
  #  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
  quitGame: (pointer) ->
    
    #  Here you should destroy anything you no longer need.
    #  Stop music, delete sprites, purge caches, free resources, all that good stuff.
    
    #  Then let's go back to the main menu.
    @state.start "MainMenu"
    return

module.exports = Game
