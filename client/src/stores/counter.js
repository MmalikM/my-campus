import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useCampusStore = defineStore('counter', {
  state: () => ({
    // baseUrl: 'http://localhost:3000',
    baseUrl: 'https://my-campus-production.up.railway.app',
    isLogin: false,
    countData: 0,
    limit: 0,
    offsetData: 0,
    campuses: [],
    queryAdded: '',
    numberOfPage: 0,
    detailCampus: [],
    listFavourite: [],
    examDetail: [],
    inviteDetail: [],
    statusSubscribe: '',
    news: []
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    async loginHandle(input) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/login',
          method: 'post',
          data: {
            email: input.email,
            password: input.password
          }
        })
        this.isLogin = true
        localStorage.token = data.token
        Swal.fire('assalamualaikum')
        this.router.push('/')
        this.fecthUser()
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`
        })
      }
    },
    async signIn(token) {
      try {
        let { data } = await axios({
          url: this.baseUrl + '/sign-in',
          method: 'post',
          headers: {
            token_google: token
          }
        })
        this.fecthUser()
        console.log(data, '<<<< ini hasil sign in')
        this.isLogin = true
        localStorage.setItem('token', data.token)
        this.router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    async handelRegister(input) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/register',
          method: 'post',
          data: {
            name: input.name,
            email: input.email,
            school: input.school,
            password: input.password,
            studentClass: input.studentClass
          }
        })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'akun has been register',
          showConfirmButton: false,
          timer: 1000
        })
        this.router.push('/login')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`
        })
      }
    },
    async fecthUser() {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/users',
          method: 'get',
          headers: {
            token: localStorage.token
          }
        })
        this.statusSubscribe = data.isSubscribed
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`
        })
      }
    },
    async fecthCampus(query = {}) {
      this.parseQuery(query)
      try {
        const { data } = await axios({
          url: this.baseUrl + '/campuses' + this.queryAdded,
          method: 'get'
        })
        this.campuses = data.campuses
        this.limit = data.limit
        this.offsetData = data.offset
        this.countData = data.count
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`
        })
      }
    },
    parseQuery(query = {}) {
      let string = Object.keys(query).length > 0 ? '?' : ''
      for (const [key, value] of Object.entries(query)) {
        string += `${key}=${value}&`
      }
      this.queryAdded = string
    },
    async campusById(campus) {
      const id = campus.id
      try {
        const { data } = await axios({
          url: this.baseUrl + '/campuses/' + id,
          method: 'get'
        })
        this.detailCampus = data
        this.router.push(`/campuses/${id}`)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`
        })
      }
    },
    async addFavourite(invite) {
      const id = invite.id
      try {
        await axios({
          url: this.baseUrl + '/favourites/' + id,
          method: 'post',
          headers: {
            token: localStorage.token
          }
        })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'My Campus added',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`
        })
      }
    },
    async detailExam(category) {
      const id = category.id
      try {
        const { data } = await axios({
          url: this.baseUrl + '/exams/' + id,
          method: 'get'
        })
        this.examDetail = data
        console.log(data)
        this.router.push(`/exams/${id}`)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`
        })
      }
    },
    async inviteCampus(invite) {
      const id = invite.id
      try {
        const { data } = await axios({
          url: this.baseUrl + '/campuses/invitees/' + id,
          method: 'get'
        })
        this.inviteDetail = data
        this.router.push(`/invitees/${id}`)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `data kampus belum di masukkan silahkan pilih kampus lain`
        })
      }
    },
    async fetchFavourite() {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/favourites',
          method: 'get',
          headers: {
            token: localStorage.token
          }
        })
        this.listFavourite = data
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`
        })
      }
    },
    async destroyFavourite(invite) {
      const id = invite.id
      try {
        await axios({
          url: this.baseUrl + '/favourites/' + id,
          method: 'delete',
          headers: {
            token: localStorage.token
          }
        })
        this.fetchFavourite()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'My Campus delete',
          showConfirmButton: false,
          timer: 1500
        })
        // this.router.push('/favourites ')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`
        })
      }
    },
    async subscribe() {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/generate-midtrans-token',
          method: 'post',
          headers: {
            token: localStorage.token
          }
        })

        const subs = this.doneSubscribe
        window.snap.pay(data.token, {
          onSuccess: function (result) {
            subs()
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    async doneSubscribe() {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/subscription',
          method: 'patch',
          headers: {
            token: localStorage.token
          }
        })
        this.fecthUser()
      } catch (error) {
        console.log(error)
      }
    },
    async Score(input) {
      console.log(input)
      try {
        const { data } = await axios({
          url: this.baseUrl + '/tests/' + input.id,
          method: 'post',
          headers: {
            token: localStorage.token
          },
          data: {
            mat: input.mat,
            fis: input.fis,
            kim: input.kim,
            bio: input.bio,
            bind: input.bind,
            bing: input.bing
          }
        })
        console.log(data)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: data.massage,
          showConfirmButton: false,
          timer: 3000
        })
        this.router.push('/invitees')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`
        })
      }
    },
    async corousel() {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/news',
          method: 'get'
        })
        this.news = data.news
        console.log(this.news)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
