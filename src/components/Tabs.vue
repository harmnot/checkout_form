<template>
  <div>
    <header class="li-nav">
      <ul class="do-flex flex-r-center">
        <li
          class="tab space-m"
          v-for="tab in tabs"
          :key="tab"
        >
          <slot :name="tabHeadSlotName(tab)" :switchTab="switchTab"></slot>
        </li>
      </ul>
    </header>
    <main class="card-body container">
      <div class="tab-panel">
        <slot :name="tabPanelSlotName" :switchAgain="switchTab"></slot>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    initialTab: String,
    tabs: Array,
  },
  data() {
    return {
      activeTab: this.initialTab,
    };
  },
  computed: {
    tabPanelSlotName() {
      return `tab-panel-${this.activeTab}`;
    },
  },
  methods: {
    switchTab(tabName) {
      this.activeTab = tabName;
      localStorage.setItem('currentTab', this.activeTab);
    },
    tabHeadSlotName(tabName) {
      return `tab-head-${tabName}`;
    },
  },
};
</script>

<style lang="stylus" scoped>
$shadow = rgba(255,241,212,0.56)

.card-body
  padding 1.3rem 1rem 1.8rem 1rem
  background-color white
  -webkit-box-shadow 4px 8px 0px -1px $shadow
  -moz-box-shadow 4px 8px 0px -1px $shadow
  box-shadow 4px 8px 0px -1px $shadow
  text-align left
  height 500px
  @media (min-width: 320px) and (max-width: 480px)
    height 100%

header
  border 1px solid transparent
  border-radius 200px
  width 420px
  position relative
  top 29px
  margin 30px auto auto
  background-color #FEFAE6
  @media (min-width: 320px) and (max-width: 480px)
    position initial
    width 100%

ul li
  list-style none

.space-m
  margin-left 3%

.tab-panel
  text-align left
  display flex
  flex-wrap wrap
  flex-direction column

.wrap-checkbox
  display block
  position relative
  padding-left 26px
  cursor pointer
  -webkit-user-select none
  -moz-user-select none
  -ms-user-select none
  user-select none
  input
    position absolute
    opacity 0
    cursor pointer
    height 0
    width 0
    &:checked
      & ~ .checkmark
        border 2px solid #88ECB9
        &:after
          display block
  &:hover
    input
      & ~ .checkmark
        background-color #ccc
  .checkmark
    &:after
      left 5px
      top 1px
      width 2px
      height 9px
      border solid #88ECB9
      border-width 0 3px 3px 0
      -webkit-transform rotate(45deg)
      -ms-transform rotate(45deg)
      transform rotate(45deg)

.checkmark
  position absolute
  top 0
  border solid gray
  border-width 0.3px
  left 0
  height 15px
  width 15px
  &:after
    content ""
    position absolute
    display none
</style>
