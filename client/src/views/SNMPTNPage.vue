<script>
import CardCampus from '../components/CardCampus.vue'
import Search from '../components/Search.vue'
import Pagination from '../components/Pagination.vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useCampusStore } from '../stores/counter'

export default {
  data() {
    return {
      arrayNumberOfPage: []
    }
  },
  components: {
    CardCampus,
    Search,
    Pagination
  },
  computed: {
    ...mapState(useCampusStore, ['limit', 'campuses', 'countData', 'offsetData']),
    ...mapWritableState(useCampusStore, ['numberOfPage'])
  },
  methods: {
    ...mapActions(useCampusStore, ['fecthCampus', 'parseQuery']),
    setArrayNumberOfPage() {
      const array = []

      this.numberOfPage = Math.ceil(this.countData / this.limit)
      for (let i = 0; i < this.numberOfPage; i++) {
        array.push(i + 1)
      }
      this.arrayNumberOfPage = array
    }
  },
  async created() {
    await this.fecthCampus()
    this.setArrayNumberOfPage()
  }
}
</script>

<template>
  <div class="d-flex flex-column" id="home-section">
    <div class="pt-5 d-flex justify-content-center">
      <section class="col-lg-10 px-md-4" id="product-section">
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
        >
          <h1 class="display-2">Info SNMPTN</h1>
          <Search />
        </div>
        <div class="col-12 table-responsive"></div>
      </section>
    </div>
    <!-- corrorsel -->

    <div>
      <div class="row row-cols-1 row-cols-md-4 g-4 m-auto justify-content-around">
        <!-- card -->
        <CardCampus v-for="campus in campuses" :key="campus.id" :campus="campus" type="invite"/>
      </div>
    </div>
    <!-- paggination -->
    <div class="container">
      <ul class="pagination">
        <li><a href="#">Previous</a></li>
        <Pagination v-for="item in arrayNumberOfPage" :key="item" :item="item" />
        <li><a href="#">Next</a></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
html,
body {
  display: grid;
  height: 100%;
  place-items: center;
  text-align: center;
  background: #dde1e7;
}
.container {
  background: #dde1e7;
  padding: 25px;
  border-radius: 3px;
  box-shadow: -3px -3px 7px #ffffff73, 3px 3px 5px rgba(94, 104, 121, 0.288);
}
.pagination {
  display: flex;
  list-style: none;
}
.pagination li {
  flex: 1;
  margin: 0px 5px;
  background: #dde1e7;
  border-radius: 3px;
  box-shadow: -3px -3px 7px #ffffff73, 3px 3px 5px rgba(94, 104, 121, 0.288);
}
.pagination li a {
  font-size: 18px;
  text-decoration: none;
  color: #4d3252;
  height: 45px;
  width: 55px;
  display: block;
  line-height: 45px;
  margin: auto;
}
.pagination li:first-child a {
  width: 120px;
}
.pagination li:last-child a {
  width: 100px;
}
.pagination li.active {
  box-shadow: inset -3px -3px 7px #ffffff73, inset 3px 3px 5px rgba(94, 104, 121, 0.288);
}
.pagination li.active a {
  font-size: 17px;
  color: #6f6cde;
}
.pagination li:first-child {
  margin: 0 15px 0 0;
}
.pagination li:last-child {
  margin: 0 0 0 15px;
}

</style>
