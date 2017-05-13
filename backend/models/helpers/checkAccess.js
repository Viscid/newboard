module.exports = function(role) {
  function roleAccess(r) {
    if (r === undefined) return false
    var access = 0
    switch(r) {
    case 'admin':
      access = 4
      break
    case 'mod':
      access = 3
      break
    case 'user':
      access = 2
      break
    case 'unvalidated':
      access = 1
      break
    case 'banned':
      access = 0
      break
    default:
      access = 0
      break
    }
    
    return access
  }

  return function(req, res, next) {
    if (('user' in req.session) && (roleAccess(req.session.user.role) >= roleAccess(role))) next()
    else (res.sendStatus(401))
  }
}