module.exports = [
  { name: 'Nod',
    reaction: function(username) { return username + ' nodded.' }
  }, 
  { name: 'Shrug',
    reaction: function(username) { return username + ' gave a shrug.' } 
  },
  {
    name: 'Chuckle',
    reaction: function(username) { return username + ' let out a chuckle.' }
  },
  {
    name: 'Spit',
    reaction: function(username) { return username + ' spat.' }
  },
  {
    name: 'Hiss',
    reaction: function(username) { return username + ' hissed.' }
  },
  {
    name: 'Roll',
    reaction: function(username) { return username + ' rolled around on the ground.' }
  }
]