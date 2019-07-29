<template>
  <div class="loader">
    <svg viewBox="25 25 50 50">
      <circle cx="50" cy="50" r="20"></circle>
    </svg>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Loader extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_colors.scss';

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
svg {
  width: 3.75em;
  transform-origin: center;
  animation: rotate 2s linear infinite;
}

circle {
  fill: none;
  stroke: $grayDark;
  stroke-width: 2;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dashoffset: -125px;
  }
}
</style>
