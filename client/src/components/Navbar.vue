<script>
import { mapWritableState, mapActions } from 'pinia'
import { useCampusStore } from '../stores/counter'
import Swal from 'sweetalert2'
export default 
{
  computed: {
    ...mapWritableState(useCampusStore, ['isLogin','statusSubscribe'])
  },
  methods: {
    ...mapActions(useCampusStore, ['subscribe','fecthUser']),
   subscribeClick(){

    if(this.statusSubscribe==='false'){ 
      this.subscribe()
    }else{
        this.$router.push('/invitees')
    }
   },

    logout() {
      Swal.fire({
        title: 'yakin metu?',
        text: 'konfirmasi dulu bos!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('wassalam!', ' ', 'success')
          this.isLogin = false
          localStorage.clear()
          this.$router.push('/')
        } else {
          this.$router.push('/')
        }
      })
    },
    login() {
      this.$router.push('/login')
    },
    home() {
      this.$router.push('/')
    },
    favourite() {
      this.$router.push('/favourites')
    },
   
  },
  
   created() {
    if (localStorage.token) {
      this.fecthUser()
      this.isLogin = true
    } else {
      this.isLogin = false
    }
    
  }
}
</script>

<template>
  <nav class="navbar bg-body-tertiary fixed-top">
    <div class="container-fluid" style="background-color: #4a5759">
      <a class="navbar-brand" href="#" style="color: aliceblue">My Campus</a>
      <button
        style="color: whitesmoke"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
      >
        <span
          class="navbar-toggler-icon"
          style="color: aliceblue; background-color: #dedbd2"
        ></span>
      </button>
      <div
        style="background-color: #b0c4b1; width: 15%"
        class="offcanvas offcanvas-end d-flex align-items-end "
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header mx-5 my-3">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav d-flex flex-column align-items-end me-5 flex-grow-2 pe-3">
            <li class="nav-item m-2">
              <a class="nav-link active" aria-current="page" @click="home" href="#"
                ><span class="bi bi-house-door-fill"></span> University</a
              >
            </li>
            <li class="nav-item m-2" v-if="isLogin" @click.prevent="favourite">
              <a class="nav-link" href="#" ><span class="bi bi-star"></span> My Campus</a>
            </li>
            <li class="nav-item m-2" v-if="isLogin" @click.prevent="subscribeClick">
              <a class="nav-link" href="#"
                ><span class="bi bi-credit-card-2-front-fill"></span> SNMPTN
              </a>
            </li>

            <li>
              <a
                class="btn btn-outline-success mt-5"
                type="submit"
                @click.prevent="login"
                v-if="!isLogin"
                >Login</a
              >
            </li>
            <li>
              <a
                class="btn btn-outline-success"
                type="submit"
                @click.prevent="logout"
                v-if="isLogin"
                >Logout</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
