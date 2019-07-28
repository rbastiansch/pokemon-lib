<template>
  <div class="card">
    Name: {{ info.name }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop({ default: {} })
  info!: object;
}
</script>

<style lang="scss">
.card {
  border: 1px solid #e4e4e4;
  padding: 15px 10px;
}
</style>
