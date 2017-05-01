module.exports = {
  getTags: function (text, tagList) {
    var tagData = this.generateTagData(text, tagList)
    if (tagData.formatData.length) return this.pairTags(this.generateTagData(text, tagList))
    return text
    
  },

  getFormattingString: function (text, tagList) {
    var tags = this.pairTags(this.generateTagData(text, tagList))
    return this.generateFormatString(tags)
  },

  generateTagData: function(content, tagList) {

    var formatData = []
    var rawString = ''
    var cursor = 0

    while (hasTags(content, tagList)) {
      var firstTagIndex = undefined
      var firstTag = {}

      tagList.forEach(function (tag) {
        var tagIndex = content.indexOf(tag.match)
        if (tagIndex >= 0) {
          if ((firstTagIndex === undefined) || (tagIndex < firstTagIndex)) {
            firstTagIndex = tagIndex
            firstTag = tag
          }
        }
      })

      if (firstTagIndex >= 0) {
        rawString += content.substring(0, firstTagIndex)
        content = content.substring(firstTagIndex + firstTag.match.length)
        cursor += firstTagIndex
      } 

      formatData.push({
        name: firstTag.name, type: firstTag.type, index: cursor
      })
    
    }

    function hasTags(content, tagList) {
      return tagList.some(function(tag) {
        return (content.indexOf(tag.match) >= 0) 
      })
    }

    if (formatData.length) rawString += content

    return { rawString: rawString, formatData: formatData }
  },

  pairTags: function(tagData) {
    var formatData = tagData.formatData
    var pairedTags = []

    formatData.forEach(function (tag, index) {
      if (tag.type === 'open') {
        var tagTwinIndex = findTwin(index)
        if (tagTwinIndex) pairedTags.push({t: tag.name, s: tag.index, e: formatData[tagTwinIndex].index})
      }
    })

    function findTwin(index) {
      var counter = 0
      var tag = formatData[index]
      for (var i = index + 1; i < formatData.length; i++) {
        var currentTag = formatData[i]
        if (currentTag.name === tag.name) {
          if (currentTag.type === 'open') counter++
          else if ((counter > 0) && currentTag.type === 'close') counter--
          else if ((counter === 0) && currentTag.type === 'close') {
            return i
          }
        }
      }
      return null
    }
    return { tags: pairedTags, raw: tagData.rawString }
  }, 

  generateFormatString: function(pairedTags) {
    var formatString = ''
    pairedTags.forEach(function (pair, index) {
      if(index > 0) formatString += ','
      formatString += pair.t + '|' + pair.s + ':' + pair.e
    })
    return formatString
  }
}