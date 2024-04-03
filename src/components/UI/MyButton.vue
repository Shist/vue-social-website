<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  background: teal;
  color: white;
  border: 1px solid teal;
  border-radius: 3px;
  cursor: pointer;
}
</style>
