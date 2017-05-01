<script>
export default {
  props: ['message', 'formattedMessage'],
  render: function (createElement) {
    if (!this.formattedMessage) return createElement('div', this.message)
    return limbs(this.formattedMessage)

    function limbs (limb) {
      var branches = []
      if ('class' in limb) {
        let attrs = { attrs: { class: limb.class } }
        if ('content' in limb) { branches = limb.content.map((branch) => { return checkBranchType(branch) }) }
        return createElement('span', attrs, branches)
      } else if (Array.isArray(limb)) {
        branches = limb.map((branch) => { return checkBranchType(branch) })
        return createElement('div', null, branches)
      }

      function checkBranchType (branch) {
        return (typeof (branch) === 'string') ? branch : limbs(branch)
      }
    }
  }
}
</script>

<style>
.red { color: red; }
.green { color: green; }
.yellow { color: yellow; }
.blue { color: blue; }
.lime { color: lime; }
.orange { color: orange; }
.pink { color: pink; }
.bold { font-weight: bold; }
.underline { text-decoration: underline; }
.italic { font-style: italic; }
.big { font-size: 1.8em; }
.small { font-size: 0.6em; }

</style>
