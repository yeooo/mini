Component({
  properties: {
    abbreviationList: {
      type: Object,
      value: {}
    }
  },
  ready() {
    console.log(this.data.abbreviationList.img.length)
  }
})