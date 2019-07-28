<template>
  <div>
    <p>List of pokemons</p>
    <div class="list">
      <div v-for="(info, key) in listInfo" :key="key" class="list__item">
        <card :info="info" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import { getPokemons } from '@/services/index';

@Component({
  components: {
    Card,
  },
})

export default class ListItems extends Vue {
  public listInfo: Array<any> = [];

  getItems() {
    getPokemons()
      .then((response) => {
        this.listInfo = response.pokemons;
      });
  }

  mounted() {
    this.getItems();
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0px 20px;
}
.list__item {
  flex-basis: 250px;
  padding: 10px;
}
</style>
