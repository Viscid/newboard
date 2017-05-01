
module.exports = function getFormattedDocument(message, formatting_tags) {

  var tag = findtag(message, formatting_tags) // Search to find if a tag exists in the message.
  var document = []

  if (tag) { // If there is at least one tag in the message, loop through them all. Otherwise, create a text-only document.
    while (tag) {

      var messageSubstring = message.substring(0, tag.location) // Create a substring of the text leading up to the tag.
      if (messageSubstring.length) document.push(messageSubstring) // If it has a non-zero length, push it to the document.

      document.push({ type: tag.name }) // Push the tag to the document.

      message = message.substring(tag.location + tag.tagLength, message.length) // Subtract the pushed text and tag from the existing message.

      tag = findtag(message, formatting_tags) // Find the next tag in the message.

      if (!tag && message.length) document.push(message.substring(0, message.length)) // If there are no more tags in the document 
                                                                                                     // and there is still text remaining, push the remaining
                                                                                                     // text into the document.
    }
  } else document.push({ txt: message })

  return document
}

function findtag(message, tags) {
  var lowestTagIndex = -1
  var firstTagInMessage

  tags.forEach(function(tag) { // Loop through each tag to determine which occurs first.
    var tagIndex = message.indexOf(tag.search)
    if ( (lowestTagIndex < 0 && (tagIndex >= 0)) || ((tagIndex >= 0) && tagIndex < lowestTagIndex) ) { // First tag found
      lowestTagIndex = tagIndex
      firstTagInMessage = tag
    }
  })

  return (lowestTagIndex >= 0) ? { name: firstTagInMessage.name, tagLength: firstTagInMessage.search.length, location: lowestTagIndex}
  : false
}

