<template>
  <div class="app">
    <h1 class="app__headline">Страница с постами</h1>
    <my-input
      class="app__search-input"
      v-model="searchQuery"
      placeholder="Искать пост по названию..."
    />
    <div class="app__btns-wrapper">
      <my-button @click="showDialog"> Создать пост </my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!arePostsLoading"
    />
    <span class="app__loading-label" v-else>Идёт загрузка постов...</span>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";

export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      arePostsLoading: false,
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
      ],
      searchQuery: "",
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((nextPost) => nextPost.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.arePostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        this.posts = response.data;
      } catch (e) {
        alert("Во время получения данных о постах произошла ошибка!");
      } finally {
        this.arePostsLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((postA, postB) => {
        return postA[this.selectedSort]?.localeCompare(
          postB[this.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) => {
        return post.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
.app__headline {
  margin-bottom: 15px;
}
.app__search-input {
  margin-bottom: 15px;
}
.app__btns-wrapper {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}
.app__loading-label {
  font-size: 18px;
}
</style>
