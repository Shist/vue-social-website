<template>
  <div>
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
    <div ref="observer" class="observer"></div>
    <!-- This code is needed for variant of pagination with pages -->
    <!-- <div class="app__page-wrapper">
        <button
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          class="page"
          :class="{
            page_current: pageNumber === page,
          }"
          @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </button>
      </div> -->
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
      page: 1,
      limit: 10,
      totalPages: 0,
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
    // This code is needed for variant of pagination with pages
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async fetchPosts() {
      try {
        this.arePostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data;
      } catch (e) {
        alert("Во время получения данных о постах произошла ошибка!");
      } finally {
        this.arePostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert("Во время получения данных о постах произошла ошибка!");
      }
    },
  },
  mounted() {
    this.fetchPosts();
    const options = {
      rottMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
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
  watch: {
    // This code is needed for variant of pagination with pages
    // page() {
    //   this.fetchPosts();
    // },
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
/* This code is needed for variant of pagination with pages */
/* .app__page-wrapper {
    display: flex;
    column-gap: 7px;
    margin-top: 15px;
  }
  .page {
    min-width: 40px;
    border: 1px solid black;
    padding: 10px;
    border-radius: 3px;
    cursor: pointer;
  }
  .page_current {
    border: 3px solid teal;
  } */
.observer {
  height: 10px;
}
</style>
