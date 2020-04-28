<template>
  <div class="hello">
    <sui-container>
      <sui-header>前日總計捐贈：{{ total }} + 片</sui-header>
      <sui-table celled padded v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <sui-table-row v-for = "(d, idx) in donates.slice(0, n)" :key="idx">
          <sui-table-cell v-for = "(a, j) in d" :key = "j" >
            {{ a | filler }}
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
      n: 100,
      total: 0,
      busy: false,
      donates: [
      ]
    }
  },
  filters: {
    filler (a) {
      if (!a || /^\s*$/.test(a)) {
        return '不具名'
      } else {
        return a
      }
    }
  },
  methods: {
    loadMore: function() {
      this.busy = true
      setTimeout(() => {
        this.n += 100
        this.busy = false
      }, 20);
    }
  },
  mounted () {
    var vm = this
    this.$http.get('/maskd_20200427.csv').then(response => {
      var par = (txt) => { return txt.split('\n').map((l) => { return l.split(',') }) }
      // if (response.data.length > 1) {
      vm.donates = par(response.data)
      // }
      for (var i = 1; i < vm.donates.length; i++) {
        if (!isNaN(vm.total + parseInt(vm.donates[i][1]))) {
          vm.total += parseInt(vm.donates[i][1])
        }
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
