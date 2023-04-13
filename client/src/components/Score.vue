<script>

import { mapActions } from 'pinia'
import { useCampusStore } from '../stores/counter'
export default {
  data() {
    return {
      mat: '',
      fis: '',
      kim: '',
      bio: '',
      bind: '',
      bing: '',
    }
  },
  methods: {
    ...mapActions(useCampusStore, ['Score']),
    cek() {
       let id= this.$route.params.id
      this.Score({
        id,
        mat: this.mat,
        fis: this.fis,
        kim: this.kim,
        bio: this.bio,
        bind: this.bind,
        bing: this.bing,
      })
    }
  }
}
</script>


<template>
    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
    </div>
    <form @submit.prevent="cek">
      <h3> Input you Score  </h3>
  
      <label for="mat">Nilai Matematika</label>
      <input type="number" placeholder="0" id="mat" v-model="mat"/>
      <label for="fis">Nilai Fisika</label>
      <input type="number" placeholder="0" id="fis" v-model="fis"/>
      <label for="kim">Nilai Kimia</label>
      <input type="kim" placeholder="0" id="kim" v-model="kim"/>
      <label for="bio">Nilai Biologi</label>
      <input type="number" placeholder="0" id="bio" v-model="bio" />
      <label for="bind">Nilai Bahasa Indonesia</label>
      <input type="number" placeholder="0" id="bind" v-model="bind" />
      <label for="bing">Nilai Bahasa Inggris</label>
      <input type="number" placeholder="0" id="bing" v-model="bing" />
      <button>Submit</button>

    </form>
  </template>
  
  <style scoped>
  *,
  *:before,
  *:after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body {
    background-color: #cbf3f0;
  }
  .background {
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
  .background .shape {
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
  }
  .shape:first-child {
    background: linear-gradient(#1845ad, #cbf3f0);
    left: -80px;
    top: -80px;
  }
  .shape:last-child {
    background: linear-gradient(to right, #ffbf69, #ff9f1c);
    right: -30px;
    bottom: -80px;
  }
  form {
    height: 750px;
    width: 400px;
    background-color: rgba(255, 255, 255, 0.13);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 5px 35px;
  }
  form * {
    font-family: 'Poppins', sans-serif;
    color: #3d5a80(26 30% 54%);
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }
  form h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
    margin-top: 10px;
  }
  
  label {
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
  }
  input {
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
  }
  ::placeholder {
    color: #3d5a80;
  }
  button {
    margin-top: 50px;
    width: 100%;
    background-color: #cbf3f0;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }
  .social {
    margin-top: 30px;
    display: flex;
  }
  .social div {
    background: red;
    width: 150px;
    border-radius: 3px;
    padding: 5px 10px 10px 5px;
    background-color: rgba(255, 255, 255, 0.27);
    color: #eaf0fb;
    text-align: center;
  }
  .social div:hover {
    background-color: rgba(255, 255, 255, 0.47);
  }
  .social .fb {
    margin-left: 25px;
  }
  .social i {
    margin-right: 4px;
  }
  </style>
  