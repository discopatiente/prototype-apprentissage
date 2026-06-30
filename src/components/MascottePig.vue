<template>
  <div class="pig" :class="'pig--' + size">
    <div class="ear ear--left"></div>
    <div class="ear ear--right"></div>
    <div class="head"></div>
    <div class="cheek cheek--left"></div>
    <div class="cheek cheek--right"></div>
    <div class="eye eye--left"></div>
    <div class="eye eye--right"></div>
    <div class="snout">
      <div class="nostril"></div>
      <div class="nostril"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  size: { type: String, default: 'small' },
})
</script>

<style scoped>
.pig { position: relative; flex-shrink: 0; }
.pig--small { width: 88px; height: 82px; }
.pig--large { width: 120px; height: 112px; }

.ear {
  position: absolute;
  background: #E3A48F;
  border-radius: 50% 50% 50% 50% / 62% 62% 38% 38%;
}
.pig--small .ear { width: 22px; height: 27px; top: 7px; }
.pig--large .ear { width: 30px; height: 36px; top: 9px; }
.ear--left  { transform: rotate(-20deg); }
.ear--right { transform: rotate(20deg); }
.pig--small .ear--left  { left: 14px; }
.pig--small .ear--right { right: 14px; }
.pig--large .ear--left  { left: 19px; }
.pig--large .ear--right { right: 19px; }

.head {
  position: absolute;
  background: #F0C2B0;
  border-radius: 50%;
}
.pig--small .head { top: 15px; left: 9px;  width: 70px; height: 62px; }
.pig--large .head { top: 19px; left: 12px; width: 96px; height: 85px; }

.cheek {
  position: absolute;
  background: rgba(221, 138, 120, 0.38);
  border-radius: 50%;
}
.pig--small .cheek { width: 10px; height: 7px; top: 48px; }
.pig--large .cheek { width: 13px; height: 8px; top: 66px; }
.pig--small .cheek--left  { left: 20px; }
.pig--small .cheek--right { right: 20px; }
.pig--large .cheek--left  { left: 26px; }
.pig--large .cheek--right { right: 26px; }

.eye {
  position: absolute;
  background: #6B4A3A;
  border-radius: 50%;
}
.pig--small .eye { width: 7px; height: 9px;  top: 38px; }
.pig--large .eye { width: 8px; height: 10px; top: 53px; }
.pig--small .eye--left  { left: 28px; }
.pig--small .eye--right { right: 28px; }
.pig--large .eye--left  { left: 40px; }
.pig--large .eye--right { right: 40px; }

.snout {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: #E3A48F;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pig--small .snout { top: 49px; width: 30px; height: 22px; gap: 6px; }
.pig--large .snout { top: 69px; width: 41px; height: 30px; gap: 8px; }

.nostril { background: #7A5443; border-radius: 50%; }
.pig--small .nostril { width: 5px; height: 8px; }
.pig--large .nostril { width: 6px; height: 9px; }
</style>
