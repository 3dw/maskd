<template>
  <div class="hello">
    <sui-container>
      <sui-table celled padded>
        <sui-table-row v-for = "(d, idx) in donates" :key="idx">
          <sui-table-cell v-for = "(a, j) in d" :key = "j" >
            {{ a }}
          </sui-table-cell>
        </sui-table-row>
      </sui-table>
      <div class="attr">資料來源：衛生福利部中央健康保險署</div>
    </sui-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      donates: [
        ['2020/04/27', '9', '王小明'],
        ['2020/04/27', '6', '王大明']
      ]
    }
  },
  mounted () {
    var vm = this
    this.$http.get('https://data.nhi.gov.tw/Datasets/Download.ashx?rid=A21030000I-H50003-001&l=http://data.nhi.gov.tw/resource/maskd/maskd.csv').then(response => {
      var par = (txt) => { return txt.split('\n').map((l) => { return l.split(',') }) }
      if (response.data.length > 1) {
        vm.donates = par(response.data)
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
