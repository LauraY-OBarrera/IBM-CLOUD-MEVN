<template>
    <v-layout
      justify-center align-center
      text-xs-center
      wrap
    >
    <v-flex xs12>
        <v-form
    ref="form"
  >
    <v-text-field
      prepend-inner-icon="fa-user"
      v-model="user.name"
      label="Nombre"
      class="text1"
      solo
    ></v-text-field>

    <v-text-field
     prepend-inner-icon="fa-industry"
      v-model="user.company"
      label="Empresa"
      solo
    ></v-text-field>

    <v-text-field
     prepend-inner-icon="fa-user-tie"
      v-model="user.position"
      label="Cargo"
      solo
    ></v-text-field>

    <v-text-field
      prepend-inner-icon="fa-envelope"
      v-model="user.email"
      label="E-mail"
      solo
    ></v-text-field>

     <v-text-field
      prepend-inner-icon="fa-mobile-alt"
      v-model="user.phone"
      label="Telefono"
      solo
    ></v-text-field>
    <v-btn
      color="primary"
      @click="add"
    >
      Registrar
    </v-btn>
  </v-form>
  </v-flex>
  <v-flex xs12>
    <v-data-table
  :headers="headers"
  :items="users"
  class="elevation-1"
>
  <template v-slot:items="props">
    <td>{{ props.item.email }}</td>
    <td class="text-xs-right">{{ props.item.name }}</td>
    <td class="text-xs-right">{{ props.item.position }}</td>
    <td class="text-xs-right">{{ props.item.phone }}</td>
    <td class="text-xs-right">{{ props.item.company }}</td>
  </template>
</v-data-table>
  </v-flex>
    </v-layout>

</template>

<script>
import axios from "axios";
class User{
  constructor(name, email, phone, position, company){
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.position = position;
    this.company = company;

  }
}
  export default {
    data () {
      return {
        user: new User(),
        headers: [
            {
              text: 'EMAIL',
              align: 'left',
              sortable: false,
              value: 'email'
            },
            { text: 'NOMBRE', value: 'name' },
            { text: 'CARGO', value: 'position' },
            { text: 'TELEFONO', value: 'phone' },
            { text: 'COMPAÑIA', value: 'company' },
          ],
          users:[]
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

        this.user= new User();
      },
      get(){

        fetch('/api/registrants',{
          method: 'GET',
        }).then(res => res.json())
        .then(data => {
          this.users=data
          console.log(data);
        });
      }
    }

  }
</script>

<style>

</style>
