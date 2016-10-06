var sounds = new Map()

sounds.set('horn', new Audio('sounds/horn.mp3'))

module.exports = {
  keywords: ['let\'s party'],
  fn: (transcript) => sounds.get('horn').play()
}
