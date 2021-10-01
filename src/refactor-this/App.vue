<template>
  <div id="app">
    <loading :active.sync="isLoading"
             :can-cancel="false"
             :is-full-page="true"></loading>
    <div id="main-view">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Photo Sharing App</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link active" href="#" @click="getPhotos2('nature',page)">Nature <span class="sr-only">(current)</span></a>
            <a class="nav-link" href="#" @click="getPhotos2('architecture',page)">Architecture</a>
            <a class="nav-link" href="#" @click="getPhotos2('fashion',page)">Fashion</a>
          </div>
        </div>
      </nav>

      <div class="container">
        <div v-for="index in page+2" :key="index" id="nature-images" class="row row-cols-3">
          <div v-for="photo in photos[index-1]" class="col" style="height: 400px; padding: 10px;">
            <img class="image" :src="photo.url" :alt="photo.name" style="height: 100%; object-fit: cover; width: 100%;" />
            <div class="middle">
              <a class="btn btn-dark" :href="photo.url" :download="photo.name">DOWNLOAD</a>
            </div>
          </div>
        </div>
      </div>




      <nav>
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#" @click="getPhotos2(category,page-3)">Previous</a></li>
          <li class="page-item"><a class="page-link" href="#" @click="getPhotos2(category,page+3)">Next</a></li>
        </ul>
      </nav>
    </div>


  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'

export default {
  name: 'app',
  components: {
    Loading
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 1 || 0,
      end_page: 3,
      category: 'nature',
      isLoading: true,
      photos: []
    }
  },
  mounted(){
    this.getPhotos2('nature',1)
  },
  methods:{
    getPhotos: async (category, page) =>{
        var images = []
        var i = page
        var promises = []
        for(i; i < page+3; i++){
          const prom = await fetch('http://localhost:8889/images?category='+category+'&page='+i)
              .then((response) => {
                return response.json()
              })
              .then( (result) =>{
                images.push( result);

                return images
              })
          promises.push(prom);
        }

        await Promise.all(promises);

        return images;

    },
    getPhotos2: function(category,page) {
      this.isLoading = true
      this.page = page;
      this.category = category;
      this.getPhotos(category,page).then((images)=>{

        this.photos = images
        this.isLoading = false;
      })
    }
  }
}
</script>

<style lang="scss">
#app {
font-family: 'Avenir', Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
}
h1, h2 {
font-weight: normal;
}
ul {
list-style-type: none;
padding: 0;
}
li {
display: inline-block;
margin: 0 10px;
}
a {
color: #42b983;
}
</style>
