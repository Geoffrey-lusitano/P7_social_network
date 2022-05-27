<template>
  <div class="main">
    <div class="card">
      <form @submit.prevent="createComment">
        <div class="card-body">
          <input type="text" class="card-content" v-model='content' />

          <button type="submit" class="card-btn" @clik="createCommentData">
            Envoyer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CommentCreate",
  props: ["id"],
  data() {
    return {
      content: "",
      postId: "",
      userId: "",
    };
  },
  methods: {
    async createComment() {
      const userid = parseInt(localStorage.getItem("userId"));
      const response = await axios.post(
        "http://localhost:3000/api/comment",
        {
          content: this.content,
          postId: this.id,
          userId: userid,
        },
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
.main {
  margin: 10px;
  height: 60px;
}
.card {
  background: #ffff;
  border-radius: 5px;
  margin-bottom: 10px;
}
.card-body {
  display: flex;
}
.card-content {
  background-color: #eee;
  border: none;
  padding: 14px 16px;
  width: 90%;
  margin-right: -5px;
  border-radius: 6px;
  border-bottom: 1px solid #ddd;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  font-size: 17px;
  &:focus {
    outline: none;
    background-color: #fff;
  }
}
.card-btn {
  background-color: #0f3471;
  border-radius: 0 6px 6px 0;
  border: none;
  color: #fff;
  font-weight: bold;
  &:active {
    transform: scale(0.9);
  }
  &:focus {
    outline: none;
  }
}
</style>
