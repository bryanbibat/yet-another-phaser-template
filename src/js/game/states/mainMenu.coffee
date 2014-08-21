class MainMenu
  constructor: (game) ->

  create: ->
    
    #  We've already preloaded our assets, so let's kick right into the Main Menu itself.
    #  Here all we're doing is playing some music and adding a picture and button
    #  Naturally I expect you to do something significantly better :)
    @add.sprite(300, 400, "bullet").anchor.setTo 0.5, 0.5
    @stage.backgroundColor = "#222"
    return

  update: ->
    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) || this.input.activePointer.isDown)
      @startGame()
    
    #  Do some nice funky main menu effect here

  
  startGame: (pointer) ->
    
    #  Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
    # this.music.stop();
    
    #  And start the actual game
    @state.start "Game"
    return

module.exports = MainMenu
