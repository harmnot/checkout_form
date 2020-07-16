<template>
  <div
    class="do-flex flex-row f-between"
    :key="i"
    style="width: 120px; margin-right: 7px"
    @click="nextStep(switchTab, c.initial, true)"
  >
    <div class="do-flex flex-row" style="cursor: pointer">
      <div :class="modelTab(c.initial)">
        <p>  {{ i+1 }} </p>
      </div>
      <div class="capital">
        {{ name }}
      </div>
    </div>
    <div class="or" v-if="contents.length-1 > i">
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwitchTab',
  props: {
    contentLength: Number,
    name: String,
  },
};
</script>

<style scoped>

</style>
