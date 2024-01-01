<template>
  <div class="colorSelector">
    <div class="color" :style="`--bgColor:${color}`">Color</div>
    <div class="selector">
      <div v-for="(color, index) in colorList" :key="color" :style="{ background: color }"
        @mouseenter="handleClock(index)">
        {{ color }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const colorList = ['#845EC2', '#D65DB1', '#FF6F91', '#FF9671', '#FFC75F', '#F9F871'];
const color = ref(colorList[0]);
const handleClock = (index) => {
  color.value = colorList[index];
};
</script>

<style lang="scss" scoped>
.colorSelector {
  .color {
    color: #000;
    width: 100%;
    height: 100px;
    background: var(--bgColor);
    transition: all 0.25s ease-in-out;
  }

  .selector {
    margin-top: 10px;

    div {
      height: 50px;
      color: #000;
      user-select: none;
      cursor: pointer;
    }
  }
}
</style>