<template>
  <div class="main">
    <div v-for="post in posts" class="card">
      <header class="card-header">
        <div class="card-title">
          {{ post.user.name }} {{ post.user.last_name }}
        </div>
        <div class="card-date"></div>
        <button
          v-if="user == 13"
          class="card-btn"
          :id="post.id"
          @click="deletePost"
        >
          Supprimer le post
        </button>
      </header>
      <div class="card-body">
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-content">
          {{ post.content }}
        </p>
        <img :src="post.attachment" class="fullwidth" />
      </div>
      <div class="card-footer">
        <div class="card-comments">
          <CommentList :postid="post.id" />
        </div>
        <div class="card-comment-create">
          <CommentCreate :id="post.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CommentList from "@/components/CommentList.vue";
import CommentCreate from "@/components/CommentCreate.vue";
export default {
  name: "PostList",
  components: {
    CommentList,
    CommentCreate,
  },
  data() {
    return {
      posts: [],
      user: localStorage.getItem("userId"),
    };
  },

  async created() {
    this.emitter.on("post-refresh", this.loadPosts);
    this.emitter.on("comment-created", this.loadPosts);

    this.loadPosts();
  },

  methods: {
    async loadPosts() {
      const response = await axios.get("http://localhost:3000/api/post", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      this.posts = response.data;
    },
    async deletePost(event) {
      const id = event.target.id;
      console.log("id", id);
      const response = await axios
        .delete(`http://localhost:3000/api/post/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.status == 201) {
            this.emitter.emit("post-refresh");
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
// HEADER
.card {
  border: 1px solid #dbdbdb;
  background: #ffff;
  border-radius: 5px;
  margin-bottom: 10px;
}
.card-header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(15, 52, 113, 0.6);
  margin: 10px;
  border-radius: 3px;
}

.card-title {
  font-weight: bold;
  color: #000;
  font-size: 18px;
  margin: 5px 0;
}
.card-date {
  color: rgba(0, 0, 0, 0.38);
  font-size: 12px;
}
.card-btn {
  border-radius: 3px;
  border: 1px solid #d05059;
  background-color: #d05059;
  color: #fff;
  font-weight: bold;
  padding: 15px 40px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.1s ease-in;
  &:active {
    transform: scale(0.9);
  }
  &:focus {
    outline: none;
  }
}
// BODY
.card-body {
  padding: 0 10px;
}
.card-body .fullwidth {
  width: calc(100% + 20px);
  display: block;
  margin: 0 -10px;
}
.card-body p:first-child {
  margin-top: 0;
}
.card-body p:last-child {
  margin-bottom: 0;
}
</style>
