var test_message = 'Here\'s r[te]rg[x]gt!'

var tags = [
  { name: 'red-open', search: 'r[', },
  { name: 'red-close', search: ']r', },
  { name: 'green-open', search: 'g[', },
  { name: 'green-close', search: ']g', },
]

function getFormattedDocument(message, formatting_tags) {

  var firstTag = findtag(message, formatting_tags) // Search to find if a tag exists in the message.
  var document = []

  if (firstTag) { // If there is at least one tag in the message, loop through them all. Otherwise, create a text-only document.
    while (firstTag) {

      var messageSubstring = message.substring(0, firstTag.location) // Create a substring of the text leading up to the tag.
      if (messageSubstring.length) document.push({ text: messageSubstring }) // If it has a non-zero length, push it to the document.

      document.push({ tag: firstTag.name }) // Push the tag to the document.

      message = message.substring(firstTag.location + firstTag.tagLength, message.length) // Subtract the pushed text and tag from the existing message.

      firstTag = findtag(message, formatting_tags) // Find the next tag in the message.

      if (!firstTag && message.length) document.push({ text: message.substring(0, message.length) }) // If there are no more tags in the document 
                                                                                                     // and there is still text remaining, push the remaining
                                                                                                     // text into the document.
      
    }
  } else document.push({ text: message })
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

getFormattedDocument(test_message, tags)

