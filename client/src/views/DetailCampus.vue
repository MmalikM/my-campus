<script>
import { mapActions, mapState } from 'pinia'
import { useCampusStore } from '../stores/counter'
import RowDetail from '../components/RowDetail.vue'
export default {
  components: {
    RowDetail
  },
  computed: {
    ...mapState(useCampusStore, ['detailCampus'])
  },
  methods: {
    ...mapActions(useCampusStore, ['campusById'])
  },
  created() {
    const id = this.$route.params.id
    this.campusById({
        id:id
    })
  }
}
</script>

<template>
  <div class="container">
    <h2>Responsive Tables Using LI <small>Triggers on 767px</small></h2>
    <ul class="responsive-table">
        <li class="table-header">
            <div class="col col-1">Kode</div>
            <div class="col col-2">PTN</div>
            <div class="col col-3">Jurusan</div>
            <div class="col col-4">Kategori</div>
            <div class="col col-5">detail / add</div>
        </li>
        <!-- li -->
      <RowDetail v-for="campus in detailCampus" :key="campus.id" :campus="campus" type="exam"/>
    </ul>
  </div>
</template>

<style scoped>
body {
  font-family: 'lato', sans-serif;
}
.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}

h2 {
  font-size: 26px;
  margin: 20px 0;
  text-align: center;
}

.responsive-table li {
  border-radius: 3px;
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}
.table-header {
  background-color: #95a5a6;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
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
    flex-basis: 23%;
    text-align: center;
}
.col-5 {
  flex-basis: 12%;
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
