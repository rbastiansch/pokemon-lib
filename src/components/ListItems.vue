<template>
  <div>
    <p>List of pokemons</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getPokemons } from '@/services/index.ts';

@Component
export default class ListItems extends Vue {
  getItems = () => {
    getPokemons();
  }

  mounted() {
    this.getItems();
  }
}
</script>
