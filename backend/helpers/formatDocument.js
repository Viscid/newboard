const test_message = 'This message is a test of the r[formatting]r required to perform this operation.'

const tags = [
    { 
        name: 'red tag open',
        search: 'r[',
        replace: '<span class="red">'
    },
    {
        name: 'red tag close',
        search: ']r',
        replace: '</span>'
    }
]

function getFormattedDocument ( message, formatting_tags ) {
    var cursor = 0

    var formattedDocument = {
        raw: '',
        formatted: []
    }
    
    formatting_tags.forEach( function (tag) {
        tagPositions = []
        tagCursor = 0
  
        while (message.indexOf(tag.search, tagCursor + tag.search.length))
        {
            console.log(tagCursor)
            var tagPosition = message.indexOf(tag.search, tagCursor + tag.search.length)
            tagPositions.push({
                tag,
                position: tagPosition
            })
            tagCursor = tagPosition
        }
    })
}

getFormattedDocument(test_message, tags)

