module.exports = [
  { name: 'Nod',
    describe: function(subject, object) { return subject + ' nodded.' }
  }, 
  { name: 'Shrug',
    describe: function(subject, object) { return subject + ' gave a shrug.' } 
  },
  {
    name: 'Chuckle',
    describe: function(subject, object) { return subject + ' let out a chuckle.' }
  },
  {
    name: 'Spit',
    describe: function(subject, object) { return subject + ' spat at ' + object + '.' }
  },
  {
    name: 'Hiss',
    describe: function(subject, object) { return subject + ' hissed.' }
  },
  {
    name: 'Roll',
    describe: function(subject, object) { return subject + ' rolled around on the ground.' }
  },
  {
    name: 'Hat Tip',
    describe: function(subject, object) { return subject + ' tipped his hat to ' + object + '.' }
  },
  { name: 'Slap',
    describe: function(subject, object) { return subject + ' slaps ' + object + '.' }
  }, 
  { name: 'Hmph',
    describe: function(subject, object) { return subject + ' hmph\'d.' } 
  },
  {
    name: 'Smoke',
    describe: function(subject, object) { return subject + ' went out for a smoke.' }
  },
  {
    name: 'Silent',
    describe: function(subject, object) { return subject + ' was notably silent.' }
  },
  {
    name: 'Snap',
    describe: function(subject, object) { return subject + ' snapped his lobster claws at ' + object + '.' }
  },
  {
    name: 'Curtsy',
    describe: function(subject, object) { return subject + ' dropped a curtsy to ' + object + '.' }
  },
  {
    name: 'Amen',
    describe: function(subject, object) { return subject + ' gives a hearty "Amen!"' }
  }  
]