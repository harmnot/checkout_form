<template>
  <div id="modalShowing" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="closeButton" />
        <h2>Error validation</h2>
      </div>
      <div class="modal-body">
       <div v-html="errorMessages"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    errorMessages: [String, Object],
  },
};
</script>

<style lang="stylus" scoped>
$orange = #FFC075

.modal
  display block
  position fixed
  z-index 2
  padding-top 100px
  left 0
  top 0
  width 100%
  height 100%
  overflow auto
  background-color rgb(0,0,0)
  background-color rgba(0,0,0,0.4)

.modal-content
  position relative
  background-color #fefefe
  margin auto
  padding 0
  border 1px solid #888
  width 40%
  box-shadow 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)
  -webkit-animation-name animateTop
  -webkit-animation-duration 0.4s
  animation-name animateTop
  animation-duration 0.4s
  @media (min-width: 768px) and (max-width: 1024px)
    width 47%
  @media (min-width: 1025px) and (max-width: 1280px)
    width 46%
  @media (min-width: 320px) and (max-width: 480px)
    width 78%

@-webkit-keyframes animateTop
    from
      top -300px
      opacity 0
    to
      top 0
      opacity 1
@keyframes animateTop
    from
      top -300px
      opacity 0
    to
      top 0
      opacity 1

.close-modal
  color white
  float right
  font-size 28px
  font-weight bold

.close-modal:hover,
.close-modal:focus
  color #000
  text-decoration none
  cursor pointer

.modal-header
  padding 2px 16px
  background-color $orange
  color white

.modal-body
  padding 2px 16px

.modal-footer
  padding 2px 16px
  background-color $orange
  color white
</style>
