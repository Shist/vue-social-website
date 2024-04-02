<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <my-input
      v-model="post.title"
      class="input_form"
      type="text"
      placeholder="Название"
    />
    <my-input
      v-model="post.body"
      class="input_form"
      type="text"
      placeholder="Описание"
    />
    <my-button class="btn_form" @click="createPost">Создать</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
.input_form {
  margin-top: 15px;
}
.btn_form {
  margin-top: 15px;
  align-self: flex-end;
}
</style>
