<template>
    <div>
        <h1>Statues</h1>
        <table class="table table-striped table-dark">
            <thead>
                <tr>
                <th>Azonsító</th>
                <th>Személy</th>
                <th>Magasság</th>
                <th>Ár</th>
                <th>Műveletek</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="statue in statues" v-bind:key="statue.id">
                <td>{{ statue.id }}</td>
                <td><router-link :to="'/statues/' + statue.id">{{ statue.person }}</router-link></td>
                <td>{{ statue.height }}</td>
                <td>{{ statue.price }}</td>
                <td>
                    <button @click="deleteStatue(statue.id)" type="button" class="btn btn-danger m-1">Törlés</button>
                    <button @click="editStatue(statue.id)" type="button" class="btn btn-info">Szerkesztés</button>
                </td>
                </tr>
                <tr>
                <td>
                    <input type="hidden" v-model="statue.id">
                </td>
                <td>
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Személy</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" v-model="statue.person">
                    </div>
                </td>
                <td>
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Magasság</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" v-model="statue.height">
                    </div>
                </td>
                <td>
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Ár</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" v-model="statue.price">
                    </div>
                </td>
                <td>
                    <button v-if="mod_new" @click="newStatue" :disabled="saving" type="button" class="btn btn-success">Létrehoz</button>
                    <button v-if="!mod_new" @click="saveStatue" :disabled="saving" type="button" class="btn btn-success m-1">Mentés</button>
                    <button v-if="!mod_new" @click="cancelEdit" :disabled="saving" type="button" class="btn btn-danger">Mégse</button>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
  data() {
    return {
      mod_new: true, 
      saving: false,
      statue: {
        id: null,
        person: '',
        height: '',
        price: '',
      },
      statues: []
    }
  },
  methods: {
    async loadStatue() {
      let Response = await fetch('http://127.0.0.1:8000/api/statues')
      let data = await Response.json()
      this.statues = data
    },

    async deleteStatue(id) {
      let Response = await fetch(`http://127.0.0.1:8000/api/statues/${id}`, {
        method: 'DELETE'
      })
      console.log(Response)
      await this.loadStatue()
    },

    async newPainting() {
      this.saving='disabled'
     await fetch('http://127.0.0.1:8000/api/paintings', {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
       body: JSON.stringify(this.painting) 
     })
     await this.loadData()
     this.saving=false
     this.resetForm()
    },

    async newStatue() {
      this.saving='disabled'
     await fetch('http://127.0.0.1:8000/api/statues', {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
       body: JSON.stringify(this.statue) 
     })
     await this.loadStatue()
     this.saving=false
     this.resetForm()
    },

    async saveStatue() {
      this.saving='disabled'
     await fetch(`http://127.0.0.1:8000/api/statues/${this.statue.id}`, {
       method: 'PATCH',
       headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
       body: JSON.stringify(this.statue) 
     })
     await this.loadStatue()
     this.saving=false
     this.resetForm()
    },
    async editStatue(id) {
      let Response = await fetch(`http://127.0.0.1:8000/api/statues/${id}`)
      let data = await Response.json()
      this.statue = {...data};
      this.mod_new = false
    },

    cancelEdit () {
      this.resetForm()
    },

    resetForm() {
      this.painting = {
        id: null,
        title: '',
        year: '',
        on_display: false
      }
      this.statue = {
        id: null,
        title: '',
        year: '',
        on_display: false
      }
      this.mod_new = true
    }
  },

  mounted() {
    this.loadStatue()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

table {
    margin-left: auto;
    margin-right: auto;
}

h1 {
  color: white;
}

td a {
  color: white;
  text-decoration: none;
}

td a:hover {
  color: rgb(0, 183, 255);
  text-decoration: none;
}
</style>
