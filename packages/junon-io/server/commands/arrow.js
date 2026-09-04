const BaseCommand = require("./base_command")
const Constants = require("../../common/constants")

class Arrow extends BaseCommand {

  getUsage() {
    return [
      "Creates an around locked to the player that points to the specified direction",
      "/arrow set [arrow_id] [player] [point_to] [color]",
      "/arrow remove [arrow_id] [player]",
      "/arrow clear [player]",
      "ex: /arrow set 1 kuroro 1234 red",
    ]
  }

  allowOwnerOnly() {
    return true
  }

  perform(caller, args) {
    if (!this.game.playerArrows) {this.game.playerArrows = {}}
    let selectedPlayers = this.getPlayersBySelector(args[2])
    if (selectedPlayers.length === 0) {
      caller.showChatError("No such player")
      return
    }
    
    let subcommand = args[0]
    switch(subcommand) {
      case "set": 
      if (!args[1]) {
        caller.showChatError("No Arrow ID")
          return
        }
        selectedPlayers.forEach(ply => {
          if (!this.game.playerArrows[ply]) {this.game.playerArrows[ply] = {}}
          this.game.playerArrows[ply][args[1]] = {
            pointTo:args[3],
            color:args[4]
          }
        });
        break
      case "remove": {
        if (!args[1]) {
        caller.showChatError("No Arrow ID")
          return
        }
        if (!this.game.playerArrows[ply]) {this.game.playerArrows[ply] = {}}
        delete this.game.playerArrows[ply][args[1]]
        break
      }
      case "clear": 
        selectedPlayers.forEach(ply => {
          delete this.game.playerArrows[ply.name]
        })
        break
 }
  }

}

module.exports = Arrow