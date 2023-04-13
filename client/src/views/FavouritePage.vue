<script>
import { mapState, mapActions } from 'pinia'
import { useCampusStore } from '../stores/counter'
import CardFavourite from '../components/CardFavourite.vue'
export default {
  components: {
    CardFavourite
  },
  computed: {
    ...mapState(useCampusStore, ['listFavourite'])
  },
  methods: {
    ...mapActions(useCampusStore, ['fetchFavourite'])
  },
  created() {
    this.fetchFavourite()
  }
}
</script>

<template>
  <section class="" id="home-section">
    <div class="pt-5 d-flex justify-content-center">
      <section class="col-lg-10 px-md-4" id="product-section">
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
        >
          <h1 class="display-2">My Campus</h1>
        </div>
        <div class="col-12 table-responsive"></div>
      </section>
    </div>
    <div class="row row-cols-1 row-cols-md-4 g-4 m-5">
      <!-- card -->
      <CardFavourite
        v-for="(favourite, index) in listFavourite"
        :key="favourite.id"
        :favourite="favourite"
      />
    </div>
  </section>
</template>
