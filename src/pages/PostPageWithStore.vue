<template>
  <div>
    <h1 class="app__headline">Страница с постами</h1>
    <my-input
      class="app__search-input"
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Искать пост по названию..."
      v-focus
    />
    <div class="app__btns-wrapper">
      <my-button @click="showDialog"> Создать пост </my-button>
      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
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
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort",
    }),
    ...mapActions({
      fetchPosts: "post/fetchPosts",
      loadMorePosts: "post/loadMorePosts",
    }),
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
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      arePostsLoading: (state) => state.post.arePostsLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
    }),
  },
  watch: {},
};
</script>

<style>
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
.observer {
  height: 10px;
}
</style>
