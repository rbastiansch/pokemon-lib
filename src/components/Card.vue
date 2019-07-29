<template>
  <article @click="toggleMoreInfo"
           class="card"
  >
    <Loader v-if="isLoading" />
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
        <div class="card__fullInfo">
          <div class="score">
            <div class="score__item">
              <span class="score__item__label">Max HP</span>
              <span class="score__item__value">{{ infoItem.maxHP }}</span>
            </div>
            <div class="score__item">
              <span class="score__item__label">Max CP</span>
              <span class="score__item__value">{{ infoItem.maxCP }}</span>
            </div>
          </div>
          <div class="attacks">
            <div v-for="(attack, key) in arrayAtacks"
                 :key="key"
                 class="attacks__item"
            >
              <span class="attacks__item__title">{{ attack.name }} Attacks</span>
              <div class="attacks__item__line">
                <div class="attacks__item__line__title attacks__item__line__title--bigger">
                  Attack
                </div>
                <div class="attacks__item__line__title">Type</div>
                <div class="attacks__item__line__title">Power</div>
              </div>
              <div v-for="(item, key) in  attack.value"
                   :key="key"
                   class="attacks__item__line"
              >
                <span class="attacks__item__line__value attacks__item__line__value--bigger">
                  {{ item.name }}
                </span>
                <span class="attacks__item__line__value attacks__item__line__value--label">
                  {{ item.type }}
                </span>
                <span class="attacks__item__line__value">{{ item.damage }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Loader from '@/components/Loader.vue';
import { getPokemon } from '@/services/index';

@Component({
  components: {
    Loader,
  },
})
export default class Card extends Vue {
  @Prop({ default: {} })
  info!: object;

  private infoItem: object = {};

  private showMoreInfo: Boolean = false;

  private isLoading: Boolean = false;

  get linkImage() {
    const { number } = this.info;
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`;
  }

  get arrayAtacks() {
    const { attacks } = this.infoItem;
    if (!attacks) {
      return [];
    }
    return Object.keys(attacks).map((item) => {
      const obj = {
        name: item,
        value: attacks[item],
      };
      return obj;
    });
  }

  getMoreInfo() {
    this.isLoading = true;
    const { id } = this.info;
    getPokemon(id)
      .then((response) => {
        this.infoItem = response.pokemon;
        this.isLoading = false;
      });
  }

  toggleMoreInfo() {
    this.showMoreInfo = !this.showMoreInfo;
    if (!Object.keys(this.infoItem).length) {
      this.getMoreInfo();
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_colors.scss';

%button {
  padding: 2px 8px;
  border-radius: 5px;
  margin-right: 10px;
}

%buttonGreen {
  @extend %button;
  background: $green;
  color: $black;
}

%buttonPurple {
  @extend %button;
  background: $purple;
  color: $white;
}

.card {
  padding: 15px 10px;
  background: $gray;
  height: calc(100% - 30px);
  border-radius: 5px;
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
  &:nth-child(odd) {
    @extend %buttonGreen;
  }
  &:nth-child(even) {
    @extend %buttonPurple;
  }
}

.score {
  display: flex;
  justify-content: space-between;
}
.score__item {
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  flex-basis: 80px;
  background: $grayLight;
  box-shadow: inset 0px 0px 0px 1px $grayDark;
}
.score__item__label {
  text-align: left;
  font-size: 14px;
}
.score__item__value {
  font-size: 20px;
  font-weight: bold;
}

.attacks__item {
  display: flex;
  flex-wrap: wrap;
  padding: 15px 0px;
}
.attacks__item__title {
  width: 100%;
  text-align: left;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 15px;
  text-transform: capitalize;
}

.attacks__item__line {
  display: flex;
  width: 100%;
  margin: 2px 0px;
}
.attacks__item__line__title {
  flex: 1;
  text-align: left;
  font-weight: bold;
  margin-bottom: 5px;
}
.attacks__item__line__title--bigger {
  flex: 2;
}
.attacks__item__line__value {
  flex: 1;
  text-align: left;
}
.attacks__item__line__value--bigger {
  flex: 2;
}
.attacks__item__line__value--label {
  @extend %buttonGreen;
}
</style>
