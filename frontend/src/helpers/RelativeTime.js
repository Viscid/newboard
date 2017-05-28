export default class relativeTime {
  constructor (timeThen, timeNow) {
    let timeElapsed = (timeNow - timeThen)

    this.years = (Math.floor(timeElapsed / 31556952000))
    this.days = (Math.floor(timeElapsed % 31556952000) / 86400000)
    this.hours = (Math.floor(timeElapsed % 86400000) / 3600000)
    this.minutes = (Math.floor(timeElapsed % 3600000) / 60000)
    this.seconds = (Math.floor(timeElapsed % 60000) / 1000)
    this.elapsed = timeElapsed
  }

  getString () {
    let timeString = ''

    if (this.elapsed < 1000) { return 'Just now!' }
    if (this.years >= 1) timeString += Math.floor(this.years) + ' year' + (this.years >= 2 ? 's' : '') + ' '
    if (this.days >= 1) timeString += Math.floor(this.days) + ' day' + (this.days >= 2 ? 's' : '') + ' '
    if (this.hours >= 1) timeString += Math.floor(this.hours) + ' hour' + (this.hours >= 2 ? 's' : '') + ' '
    if (this.minutes >= 1) timeString += Math.floor(this.minutes) + ' minute' + (this.minutes >= 2 ? 's' : '') + ' '
    if (this.seconds >= 1) timeString += Math.floor(this.seconds) + ' second' + (this.seconds >= 2 ? 's' : '') + ' '

    timeString += 'ago'

    return timeString
  }
}
