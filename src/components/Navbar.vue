<template>
  <div class="navbar">
    <h2 class="navbar__headline" @click="$router.push('/')">
      Vue social website
    </h2>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button @click="$router.push('/about')">О сайте</my-button>
      <my-button @click="$router.push('/store')">store</my-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  padding: 10px;
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  column-gap: 20px;
}
.navbar__headline {
  cursor: pointer;
}
.navbar__btns {
  margin-left: auto;
  display: flex;
  column-gap: 10px;
}
</style>
