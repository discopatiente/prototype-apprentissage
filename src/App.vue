<script setup></script>

<template>
  <RouterView />
</template>

<style>
*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  font-family: 'Nunito', sans-serif;
  background: #FAF5EF;
  color: #4A352B;
  -webkit-font-smoothing: antialiased;
}
button { font-family: 'Nunito', sans-serif; }
input  { font-family: 'Nunito', sans-serif; }

@keyframes popIn {
  0%   { transform: scale(0.7); opacity: 0; }
  60%  { transform: scale(1.06); }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes burst {
  0%   { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)) scale(0.35); opacity: 0; }
}
@keyframes rise {
  0%   { transform: translateY(60px); opacity: 0; }
  12%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(-780px); opacity: 0; }
}
</style>
