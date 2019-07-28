<template>
  <article @click="toggleMoreInfo"
           class="card"
  >
    <div v-if="!showMoreInfo">
      <div class="card__main">
        <img :src="linkImage"
             :alt="info.name"
             class="card__main__img"
        >
      </div>
      <div class="card__info">
        <div class="card__info__grouper">
          <h1 class="card__info__grouper__title">{{ info.name }}</h1>
          <span class="card__info__grouper__number">#{{ info.number }}</span>
        </div>
        <div class="card__info__types">
          <span v-for="(type, key) in info.types"
                :key="key"
                class="card__info__types__single"
          >
            {{ type }}
          </span>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="Object.keys(infoItem).length">
        Name: {{ infoItem.name }}
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getPokemon } from '@/services/index';

@Component
export default class Card extends Vue {
  @Prop({ default: {} })
  info!: object;

  private infoItem: object = {};

  private showMoreInfo: Boolean = false;

  get linkImage() {
    const { number } = this.info;
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`;
  }

  getMoreInfo() {
    const { id } = this.info;
    getPokemon(id)
      .then((response) => {
        this.infoItem = response.pokemon;
      });
  }

  toggleMoreInfo() {
    this.showMoreInfo = !this.showMoreInfo;
    this.getMoreInfo();
  }
}
</script>

<style lang="scss">
.card {
  border: 1px solid #e4e4e4;
  padding: 15px 10px;
}
.card__main__img {
  width: 100%;
}
.card__info__grouper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.card__info__grouper__title {
  margin: 0px;
}
.card__info__grouper__number {
  font-weight: bold;
}
.card__info__types {
  margin-top: 10px;
  text-align: left;
}
.card__info__types__single {
  padding: 2px 8px;
  border-radius: 5px;
  margin-right: 10px;
  &:nth-child(odd) {
    background: #86c786;
    color: #000;
  }
  &:nth-child(even) {
    background: #be81c3;
    color: #fff;
  }
}
</style>
