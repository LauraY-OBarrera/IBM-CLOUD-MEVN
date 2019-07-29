<template>
  <v-app>
    <v-toolbar dark color="#015372" app>
        <v-toolbar-title>
        <v-icon>fa-film</v-icon>
        <span>&nbsp MOVIES</span>
        </v-toolbar-title>
        
    </v-toolbar>

    <v-content>
      <v-container  grid-list-md text-xs-center style="max-widht:1200;">
      <router-view/>
    </v-container>
  </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
