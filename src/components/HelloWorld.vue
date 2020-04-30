<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h3>前日總計捐贈：{{ total }} 片</h3>
        <input type="text" name="k" v-model="k" placeholder="人名關鍵字查詢">
            <v-data-table
              :headers="headers"
              :items="has(donates, k)"
              :items-per-page="10"
              class="elevation-1"
            ></v-data-table>
            <div class="attr">資料來源：衛生福利部中央健康保險署</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    total: 0,
    k: '',
    headers: [
      {
        text: '日期',
        align: 'start',
        sortable: false,
        value: 'date'
      },
      { text: '片數', value: 'num' },
      { text: '芳名', value: 'name' }
    ],
    donates: []
  }),
  methods: {
    has (list, k) {
      if (!k) { return list }
      return list.filter((o) => {
        const reg = new RegExp(k)
        return reg.test(o.name)
      })
    }
  },
  mounted () {
    var vm = this
    this.$http.get('/maskd_news.csv').then(response => {
      var ob = (l) => {
        var obj = { date: null, num: null, name: null }
        const list = l.split(',')
        obj.date = list[0]
        obj.num = list[1]
        obj.name = list[2]
        return obj
      }
      var par = (txt) => { return txt.split('\n').map(ob).filter((o) => { return o }) }
      // if (response.data.length > 1) {
      const ds = par(response.data)
      // }
      for (let i = 1; i < ds.length; i++) {
        if (!isNaN(vm.total + parseInt(ds[i].num))) {
          vm.total += parseInt(ds[i].num)
        }
      }
      for (let i = 1; i < ds.length; i++) {
        vm.donates.push(ds[i])
      }
    })
  }
}
</script>
