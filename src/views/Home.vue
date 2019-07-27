<template>
  <div class="home">
    <ListItems />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ListItems from '@/components/ListItems.vue';

@Component({
  components: {
    ListItems,
  },
})
export default class Home extends Vue {}
</script>
