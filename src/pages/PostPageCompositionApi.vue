<template>
  <div>
    <h1 class="app__headline">Страница с постами</h1>
    <my-input
      class="app__search-input"
      v-model="searchQuery"
      placeholder="Искать пост по названию..."
      v-focus
    />
    <div class="app__btns-wrapper">
      <my-button> Создать пост </my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form />
    </my-dialog>
    <post-list :posts="sortedAndSearchedPosts" v-if="!arePostsLoading" />
    <span class="app__loading-label" v-else>Идёт загрузка постов...</span>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
      ],
    };
  },
  setup(props) {
    const { posts, totalPages, arePostsLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      totalPages,
      arePostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    };
  },
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
