<script>
import { mapActions } from 'pinia';
import { useCampusStore } from '../stores/counter';


export default{
  data(){
    return{
      searching:""
    }
  },
  methods:{
    ...mapActions(useCampusStore,['fecthCampus']),
    search(){
      this.fecthCampus({
        name:this.searching
      })
    }
  }
}
</script>

<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <form class="d-flex" role="search" @submit.prevent="search">
        <input v-model="searching" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>
