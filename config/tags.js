module.exports = [
  { class: 'red', type: 'open', match: /r\[/, length: 2 },
  { class: 'red', type: 'close', match: /\]r/, length: 2 },
  { class: 'green', type: 'open',  match: /g\[/, length: 2},
  { class: 'green', type: 'close', match: /\]g/, length: 2},
  { class: 'yellow', type: 'open', match: /y\[/, length: 2 },
  { class: 'yellow', type: 'close', match: /\]y/, length: 2 },  
  { class: 'blue', type: 'open', match: /b\[/, length: 2 },
  { class: 'blue', type: 'close', match: /\]b/, length: 2 },  
  { class: 'lime', type: 'open', match: /l\[/, length: 2 },
  { class: 'lime', type: 'close', match: /\]l/, length: 2 },  
  { class: 'orange', type: 'open', match: /o\[/, length: 2 },
  { class: 'orange', type: 'close', match: /\]o/, length: 2 },  
  { class: 'pink', type: 'open', match: /p\[/, length: 2 },
  { class: 'pink', type: 'close', match: /\]p/, length: 2 },  
  { class: 'bold', type: 'open', match: /\*\[/, length: 2 },
  { class: 'bold', type: 'close', match: /\]\*/, length: 2 },
  { class: 'underline', type: 'open', match: /_\[/, length: 2 },
  { class: 'underline', type: 'close', match: /\]_/, length: 2 },
  { class: 'italic', type: 'open', match: /\/\[/, length: 2 },
  { class: 'italic', type: 'close', match: /\]\//, length: 2 },
  { class: 'big', type: 'open', match: /\^\[/, length: 2 },
  { class: 'big', type: 'close', match: /\]\^/, length: 2 },
  { class: 'small', type: 'open', match: /\.\[/, length: 2 },
  { class: 'small', type: 'close', match: /\]\./, length: 2 },
  { class: 'pre', type: 'open', match: /q\[/, length: 2 },
  { class: 'pre', type: 'close', match: /\]q/, length: 2 },
  { type: 'link', match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      subtypes: [
          { type: 'youtube', match: /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/ }
      ]
  }
]
