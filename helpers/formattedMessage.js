module.exports = function (formattingTags, message) {
  /**
   * Returns a tree of elements from a list of elements
   * @param {*Array} elementList - Array of message elements to be composed into a hierarchical tree
   * @return {*Object} The message tree
   */
  this._getSiblings = function (elementList) {
    var siblingNodes = []
    for (var i = 0; i < elementList.length; i++) {
      var element = elementList[i]
      
      if (typeof(element) === 'string') siblingNodes.push(element)
      else if (typeof(element) === 'object' && (element.type === 'open')) {
        var elementEnd = this._findElementEnd(i, elementList)
        var childElements = elementList.slice(i + 1, elementEnd)
        if (childElements.length) siblingNodes.push({c: element.class, t: this._getSiblings(childElements)})
        i = elementEnd
      } else if (typeof(element) === 'object' && (element.type === 'link')) {
        siblingNodes.push({c: 'link', href: element.href[0] })
      }
    }
    return siblingNodes
  }

  /**
   * Returns the message without formatting
   * @param {*Array} elementList - List of elements in the message
   */
  this._getUnformattedMessage = function () {
    var message = ''
    this.elementList.forEach(function(element) {
      if (typeof(element) === 'string') message += element
    })
    return message
  }

  /**
   * Returns the index of an end tag to a start tag
   * @param {*Number} element - The index of the start tag of which to find the end tag
   * @param {*Array} elementList - The list of elements to search
   * @return {*Number} The index within elementList of the end tag
   */
  this._findElementEnd = function (elementIndex, elementList) {
    var startTag = elementList[elementIndex]
    var elementEnd 
    var counter = 0
    for (var i = elementIndex + 1; i < elementList.length; i++) {
      var curElement = elementList[i]
      if (typeof(curElement) == 'object') {
        if (curElement.class === startTag.class) {
          if (curElement.type === 'open') counter++
          else if (curElement.type === 'close' && counter > 0) counter--
          else if (curElement.type === 'close' && counter === 0) { 
            elementEnd = i
            break 
          }
        }
      }
    }
    return elementEnd
  }

  /**
   * Gets a list of opening and closing formatting tags from a message
   * @param {*Array} formattingTags - An array of custom formatting tag objects
   * @param {*String} message - The text string to search for formatting tags
   * @return {*Array} The list of tags in message
   */
  this._getElementList = function (formattingTags, message)
  {
    var tagList = []
    var nextTag
    while ((nextTag = this._findNextTag(formattingTags, message)) !== undefined) { // While there is still text in the message to process.
      if (nextTag.position > 0) tagList.push(message.substring(0, nextTag.position))
      message = message.substring(nextTag.position + nextTag.length, message.length)
      delete nextTag.position
      tagList.push(nextTag)
    }
    if (message.length) tagList.push(message)
    return tagList
  }

  /**
   * Finds the first occurrence of a formattingTag in message
   * @param {*Array} formattingTags - An array of custom formatting tag objects
   * @param {*String} message - The text string to search for formatting tags
   */
  this._findNextTag = function (formattingTags, message) {
    var nextTag
    var firstTagPos
    if (!message) return undefined
    formattingTags.forEach(function(tag) {
      var thisTagPos = message.search(tag.match)
      if ((thisTagPos >= 0) && ((firstTagPos === undefined) || (thisTagPos < firstTagPos))) {
        if (tag.type === 'link') {
          nextTag = { type: 'link', href: message.match(tag.match) }
          nextTag.length = nextTag.href[0].length
        } else nextTag = { class: tag.class, type: tag.type, length: tag.length }
        nextTag.position = thisTagPos
        firstTagPos = thisTagPos
      }
    })

    return nextTag
  }

  this.elementList = this._getElementList(formattingTags, message)
  this.unformattedMessage = this._getUnformattedMessage()
  this.formattedMessage = this._getSiblings(this.elementList)
}
