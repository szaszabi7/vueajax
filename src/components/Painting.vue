<template>
    <div>
        <h1>Paintings</h1>
        <table class="table table-striped table-dark">
            <thead>
                <tr>
                <th>Azonsító</th>
                <th>Cím</th>
                <th>Év</th>
                <th>Kiállítva(piros lap)</th>
                <th>Műveletek</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="painting in paintings" v-bind:key="painting.id">
                <td>{{ painting.id }}</td>
                <td>{{ painting.title }}</td>
                <td>{{ painting.year }}</td>
                <td>{{ painting.on_display }}</td>
                <td>
                    <button @click="deletePainting(painting.id)" type="button" class="btn btn-danger m-1">Törlés</button>
                    <button @click="editPainting(painting.id)" type="button" class="btn btn-info">Szerkesztés</button>
                </td>
                </tr>
                <tr>
                <td>
                    <input type="hidden" v-model="painting.id">
                </td>
                <td>
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Cím</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" v-model="painting.title">
                    </div>
                </td>
                <td>
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Év</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" v-model="painting.year">
                    </div>
                </td>
                <td>
                    <input type="checkbox" class="form-check-input" v-model="painting.on_display">
                    <label class="form-check-label" for="flexCheckDefault">
                        Kiállítva
                    </label>
                </td>
                <td>
                    <button v-if="mod_new" @click="newPainting" :disabled="saving" type="button" class="btn btn-success">Létrehoz</button>
                    <button v-if="!mod_new" @click="savePainting" :disabled="saving" type="button" class="btn btn-success m-1">Mentés</button>
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
      painting: {
        id: null,
        title: '',
        year: '',
        on_display: false
      },
        paintings: []
    }
  },
  methods: {
    async loadData() {
      let Response = await fetch('http://127.0.0.1:8000/api/paintings')
      let data = await Response.json()
      this.paintings = data
    },

    async deletePainting(id) {
      let Response = await fetch(`http://127.0.0.1:8000/api/paintings/${id}`, {
        method: 'DELETE'
      })
      console.log(Response)
      await this.loadData()
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

    async savePainting() {
      this.saving='disabled'
     await fetch(`http://127.0.0.1:8000/api/paintings/${this.painting.id}`, {
       method: 'PATCH',
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

    async editPainting(id) {
      let Response = await fetch(`http://127.0.0.1:8000/api/paintings/${id}`)
      let data = await Response.json()
      this.painting = {...data};
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
      this.mod_new = true
    }
  },

  mounted() {
    this.loadData()
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
</style>
