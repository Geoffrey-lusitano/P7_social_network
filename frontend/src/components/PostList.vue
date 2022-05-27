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
          {{ post.id }}
        </p>
        <img :src="post.attachment" class="fullwidth" />
      </div>
      <div class="card-footer">
        <div class="card-comments">
          <CommentList :postid="post.id" @sendd="refresh" />
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
    console.log("ok");
    const response = await axios.get("http://localhost:3000/api/post", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    this.posts = response.data;
  },

  methods: {
    refresh(value) {
      this.posts = value;
    },
    async deletePost(event) {
      const id = event.target.id;
      console.log("id", id);
      const response = await axios.delete(
        `http://localhost:3000/api/post/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
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
