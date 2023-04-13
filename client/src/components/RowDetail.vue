<script>
import { mapState, mapActions } from 'pinia'
import { useCampusStore } from '../stores/counter'
export default {
  props: ['campus','type'],
  computed: {
    ...mapState(useCampusStore, ['isLogin'])
  },
  methods:{
    ...mapActions(useCampusStore,['addFavourite','detailExam']),
    addHandle(){
        this.addFavourite({
            id:this.campus.id
        })
    },
    detailHandle(){
        this.detailExam({
            id:this.campus.id
        })
    },
    goInputScore(){
      
      this.$router.push(`/tests/${this.campus.id}`)

    }
  }
}
</script>

<template>
  <li class="table-row" v-if="type==='exam'">
    <div class="col col-1" data-label="Job Id">{{ campus.kode }}</div>
    <div class="col col-2" data-label="Customer Name">{{ campus.Campus.namaPTN }}</div>
    <div class="col col-3" data-label="Amount">{{ campus.jurusan }}</div>
    <div class="col col-4" data-label="Payment Status">{{ campus.jenis }}</div>
    <div
      class="col col-5 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center"
      data-label="Payment Status"
    >
      <a href=""  @click.prevent="detailHandle"><span class="bi bi-card-text"></span></a>
      <a href="" v-if="isLogin" @click.prevent="addHandle"><span class="bi bi-star-fill"></span></a>
    </div>
  </li>

  <li class="table-row" v-if="type==='invitee'">
    <div class="col col-1" data-label="Job Id">{{campus.id}}</div>
    <div class="col col-2" data-label="Customer Name">{{ campus.Campus.namaPTN }}</div>
    <div class="col col-3" data-label="Amount">{{campus.jurusan}}</div>
    <button @click.prevent="goInputScore" class="col col-4" data-label="Payment Status"><i class="bi bi-dice-5-fill"></i> TRY</button>
  </li>
</template>

<style scoped>
body {
  font-family: 'lato', sans-serif;
}

.responsive-table li {
  border-radius: 3px;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}

.table-row {
  background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
}
.col-1 {
  flex-basis: 10%;
}
.col-2 {
  flex-basis: 30%;
}
.col-3 {
  flex-basis: 25%;
}
.col-4 {
  flex-basis: 25%;
  text-align: center;
}
.col-5 {
  flex-basis: 10%;
}

@media all and (max-width: 767px) {
  .table-header {
    display: none;
  }
  .table-row li {
    display: block;
  }
  .col {
    flex-basis: 100%;
  }
  .col {
    display: flex;
    padding: 10px 0;
  }
}
</style>
