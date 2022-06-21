<template>
  <menu-navigation />
  <router-view></router-view>
  <app-footer />
</template>

<script>
  export default {
    data(){
      return {

      };
    },
    methods: {

    },
    computed: {

    },
    watch: {

    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');
  main.container {
    padding-top: 25px;
  }
  a {
    text-decoration: none;
  }

  body {
    height: 100%;
  }

  .form-control {
    background: transparent;
    border-radius: 0;
  }

  .form-control:focus {
    background: transparent;
  }
</style>