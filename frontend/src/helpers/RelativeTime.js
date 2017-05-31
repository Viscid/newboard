export default class relativeTime {
  constructor (timeThen, timeNow) {
    let timeElapsed = (timeNow - new Date(timeThen).getTime())

    this.years = (Math.trunc(timeElapsed / 31556952000))
    this.days = (Math.trunc(timeElapsed % 31556952000) / 86400000)
    this.hours = (Math.trunc(timeElapsed % 86400000) / 3600000)
    this.minutes = (Math.trunc(timeElapsed % 3600000) / 60000)
    this.seconds = (Math.trunc(timeElapsed % 60000) / 1000)
    this.elapsed = timeElapsed
  }

  getString () {
    let timeString = ''

    if (this.elapsed < 1000) { return 'Just now!' }
    if (this.years >= 1) timeString += Math.floor(this.years) + ' y' + (this.years >= 2 ? 's' : '') + ' '
    if (this.days >= 1) timeString += Math.floor(this.days) + ' d' + (this.days >= 2 ? 's' : '') + ' '
    if (this.hours >= 1) timeString += Math.floor(this.hours) + ' h' + (this.hours >= 2 ? 's' : '') + ' '
    if (this.minutes >= 1) timeString += Math.floor(this.minutes) + ' m' + (this.minutes >= 2 ? 's' : '') + ' '
    if (this.seconds >= 1) timeString += Math.floor(this.seconds) + ' s' + (this.seconds >= 2 ? 's' : '') + ' '

    timeString += 'ago'

    return timeString
  }
}
