<script>
import { mapActions, mapState } from 'pinia'
import { useCampusStore } from '../stores/counter'
export default {
  computed: {
    ...mapState(useCampusStore, ['examDetail', 'isLogin'])
  },
  methods: {
    ...mapActions(useCampusStore, ['detailExam', 'addFavourite']),
    addFav() {
      this.addFavourite({
        id: this.examDetail.id
      })
    }
  },

  created() {
    const id = this.$route.params.id
    this.detailExam({
      id: id
    })
  }
}
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="container-fliud">
        <div class="wrapper row">
          <div class="preview col-md-6">
            <div class="preview-pic tab-content">
              <div class="tab-pane active" id="pic-1">
                <img
                  src="https://km.itb.ac.id/wp/wp-content/uploads/2020/09/FMIPA-HIMAFI-ITB.png"
                />
              </div>
            </div>
          </div>
          <div class="details col-md-6">
            <h3 class="product-title">{{ examDetail.jurusan }}</h3>
            <div class="rating">
              <p>{{ examDetail.Campus.namaPTN }}</p>
            </div>
            <p class="product-description">kode jurusan: {{ examDetail.kode }}</p>
            <h4 class="price">
              NRM: <span>{{ examDetail.NRM }}</span>
            </h4>
            <p class="vote">
              <strong>{{ examDetail.dayaTampung }}</strong> dari total yang siswa mendaftar sebanyak
              <strong>{{ examDetail.pendaftar }} pendaftar</strong>
            </p>
            <h5 class="sizes">jenis: {{ examDetail.jenis }}</h5>
            <h5 class="colors">jenjang: {{ examDetail.jenjang }}</h5>
            <h5 class="colors">jenis portofolio: {{ examDetail.portofolio }}</h5>
            <div class="action">
              <button
                class="add-to-cart btn btn-default"
                v-if="isLogin"
                @click.prevent="addFav"
                type="button"
              >
                add to My Campus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: 'open sans';
  overflow-x: hidden;
}

img {
  max-width: 100%;
}

.preview {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}
@media screen and (max-width: 996px) {
  .preview {
    margin-bottom: 20px;
  }
}

.preview-pic {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.preview-thumbnail.nav-tabs {
  border: none;
  margin-top: 15px;
}
.preview-thumbnail.nav-tabs li {
  width: 18%;
  margin-right: 2.5%;
}
.preview-thumbnail.nav-tabs li img {
  max-width: 100%;
  display: block;
}
.preview-thumbnail.nav-tabs li a {
  padding: 0;
  margin: 0;
}
.preview-thumbnail.nav-tabs li:last-of-type {
  margin-right: 0;
}

.tab-content {
  overflow: hidden;
}
.tab-content img {
  width: 100%;
  -webkit-animation-name: opacity;
  animation-name: opacity;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
}

.card {
  margin-top: 90px;
  background: #eee;
  padding: 3em;
  line-height: 1.5em;
}

@media screen and (min-width: 997px) {
  .wrapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
}

.details {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.colors {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.product-title,
.price,
.sizes,
.colors {
  text-transform: UPPERCASE;
  font-weight: bold;
}

.checked,
.price span {
  color: #ff9f1a;
}

.product-title,
.rating,
.product-description,
.price,
.vote,
.sizes {
  margin-bottom: 15px;
}

.product-title {
  margin-top: 0;
}

.size {
  margin-right: 10px;
}
.size:first-of-type {
  margin-left: 40px;
}

.color {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  height: 2em;
  width: 2em;
  border-radius: 2px;
}
.color:first-of-type {
  margin-left: 20px;
}

.add-to-cart,
.like {
  background: #4c956c;
  padding: 1.2em 1.5em;
  border: none;
  text-transform: UPPERCASE;
  font-weight: bold;
  color: #fff;
  -webkit-transition: background 0.3s ease;
  transition: background 0.3s ease;
}
.add-to-cart:hover,
.like:hover {
  background: #cbf3f0;
  color: #fff;
}

.not-available {
  text-align: center;
  line-height: 2em;
}
.not-available:before {
  font-family: fontawesome;
  content: '\f00d';
  color: #fff;
}

.tooltip-inner {
  padding: 1.3em;
}

@-webkit-keyframes opacity {
  0% {
    opacity: 0;
    -webkit-transform: scale(3);
    transform: scale(3);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes opacity {
  0% {
    opacity: 0;
    -webkit-transform: scale(3);
    transform: scale(3);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

/*# sourceMappingURL=style.css.map */
</style>
