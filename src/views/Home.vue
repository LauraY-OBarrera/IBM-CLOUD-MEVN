<template>
  <v-layout
    justify-center align-center
    text-xs-center
    wrap
    >
    <v-flex xs12>
      <v-form>
      <v-text-field
        prepend-inner-icon="fa-hashtag"
        v-model="id"
        label="Id"
        class="text1"
        solo
        required 
        ></v-text-field>
        </v-form>
      <v-form
        ref="form"
        @submit.prevent="reset"
        >
        <v-text-field
        prepend-inner-icon="fa-theater-masks"
        v-model="movie.title"
        label="Title"
        class="text1"
        solo
        required
        ></v-text-field>

        <v-text-field
        prepend-inner-icon="fa-portrait"
        v-model="movie.director"
        label="Director"
        solo
        required
        ></v-text-field>

        <v-text-field
        prepend-inner-icon="fa-calendar"
        v-model="movie.year"
        label="Year"
        solo
        required
        ></v-text-field>

        <v-textarea
          prepend-inner-icon="fa-file-alt"
          v-model="movie.description"
          label="Description"
          solo
          required
        ></v-textarea>

         <v-btn
        color="info"
        @click="get"
        >
         <v-icon>fa-redo</v-icon>
        </v-btn>
       
        <v-btn
        color="success"
        @click="add"
        >
          <v-icon>fa-plus</v-icon>
        </v-btn>

        <v-btn
        color="warning"
        dark
        @click="edit(id)"
        >
        <v-icon>fa-edit</v-icon>
        </v-btn>
        

        <v-btn
        color="#fd7900"
        dark
        @click="borrar"
        >
        <v-icon>fa-trash</v-icon>
        </v-btn>

        <v-snackbar
        :color="colorValue"
        v-model="succA"
        bottom
        right
        multi-line
        >
          {{ text }}
        <v-btn
        dark
        flat
        @click="succA = false"
        >
          Close
        </v-btn>
    </v-snackbar>

      </v-form>
    </v-flex>
   
     
     <!--<v-data-table
        :headers="headers"
        :items="movies"
        class="elevation-1"
        >
        <template v-slot:items="props">
          <td>{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.director }}</td>
          <td class="text-xs-right">{{ parseInt(props.item.year)}}</td>
          <td class="text-xs-right">{{ props.item.description }}</td>          
          <td class="text-xs-right">{{ props.item._id }}</td>
        </template>
      </v-data-table>-->
      <v-flex xs12>
      <table>
        
        <tr xs12>
          <th>TITTLE</th>
          <th>DIRECTOR</th>
          <th>YEAR</th>
          <th>DESCRIPTION</th>
        </tr>
        <tr v-for="item in movies" :key="item">
          <td>{{item.title}}</td>
          <td>{{item.director}}</td>
          <td>{{item.year}}</td>
          <td>{{item.description}}</td> 
        </tr>
        
      </table>
    </v-flex>
    
  </v-layout>
</template>

<script>

import axios from "axios";
import { log } from 'util';

  class Movie{
    constructor(title ,director ,description ,year ){
      this.title = title;
      this.director = director;
      this.year = year;
      this.description=description;

    }
  }

  export default {
    data(){
      return{
      movie: new Movie(),
      id:'',
      search: '',
      succA: false,
      colorValue:'',
      text:'',
      headers: [
            {
              text: 'TITLE',
              align: 'left',
              sortable: false,
              value: 'TITLE'
            },
            { text: 'DIRECTOR', value: 'name' },
            { text: 'YEAR', value: 'date' },
            { text: 'DESCRIPTION', value: 'text' },
            { text: 'ID', value: 'id' }
          ],
          movies:[]
      }
    },
    created(){
      this.get();
    },
    methods: {
      reset () {
        this.$refs.form.reset()
      },

      add(){
        
        axios.post('/api/movie/',this.movie)
        .then(response => {
        console.log(response);
        this.succA=true;
        this.colorValue='success';
        this.text='REGISTRO EXITOSO';
        })
        .catch(error => {
        this.succA=true;
        this.colorValue='error';
        this.text='REGISTRO FALLIDO';
        });
        
      },

      get(){
        if(this.movie.title == null || this.movie.title==''){
        axios.get('/api/movie/')
        .then(response => {
        this.movies=response.data;
        console.log(response.data);
        
        })
        .catch(error => {
          this.succA=true;
        this.colorValue='error';
        this.text='error '+error.response.statusText+' '+error.response.status;
        });}
        
        else{
          axios.get('/api/movie/'+ this.movie.title)
        .then(response => {
        this.movies=response.data;
        console.log(response.data);
        
        })
        .catch(error => {
          this.succA=true;
        this.colorValue='error';
        this.text='error '+error.response.statusText+' '+error.response.status;
        });

        }
      },
      edit(){
        if(this.id == null || this.id==''){

           this.succA=true;
           this.colorValue='error';
           this.text='ID VACIO';
        }
        else{
        axios.put('/api/movie/'+this.id, this.movie)
        .then(response => {
        
        console.log(response);
         this.succA=true;
        this.colorValue='success';
        this.text='REGISTRO EDITADO';
        
        })
        .catch(error => {
          this.succA=true;
        this.colorValue='error';
        this.text='error '+error.response.statusText+' '+error.response.status;
        });}
      },

      borrar(){

        if(this.id == null || this.id==''){

           this.succA=true;
           this.colorValue='error';
           this.text='ID VACIO';
        }
        else{
          axios.delete('/api/movie/'+this.id)
        .then(response => {
         this.succA=true;
        this.colorValue='success';
        this.text='REGISTRO ELIMINADO';
        
        })
        .catch(error => {
          this.succA=true;
        this.colorValue='error';
        this.text='Error '+error.response.statusText+' '+error.response.status;
        }); 
        }
      }

    }

  }
</script>
<style scoped>


table,tr,th,td {
  border: 2px solid #04759f;
  border-collapse: collapse;
}
table{
    width: 100%;
    text-align: center;
    align-content: center;
}

table th {
  background-color: #04759f;
  color: white;
}
table tr:nth-child(odd) {
 
  background-color: white;
   
}
table tr:nth-child(even) {
  background-color: whitesmoke ;
}
</style>

