<template>
  <div class="main">
    <div class="line"></div>
    <h2>Commentaires</h2>
    <div v-for="comment in comments" class="card" @change="sendComment">
      <div class="card-body" v-if="postid === comment.postId">
        <div>
          <h3 class="card-user">
            {{ comment.user.name }} {{ comment.user.last_name }}
          </h3>
          <p class="card-content"> {{ comment.content }}</p>
        </div>
        <button
          v-if="admin === 'true'"
          :id="comment.id"
          class="card-btn"
          @click="deleteComment"
        >
          Supprimer le com
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CommentList",
  props: ["postid", "postComments"],
  data() {
    return {
      comments: [],
      user: localStorage.getItem("userId"),
      admin: localStorage.getItem("admin"),
    };
  },
  async created() {
    this.emitter.on("comment-created", this.loadComments);

    this.loadComments();

  },
  methods: {
    async loadComments() {
      const response = await axios.get("http://localhost:3000/api/comment", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      this.comments = response.data;
    },
    async deleteComment(event) {
      const id = event.target.id;
      console.log("id", id);
      const response = await axios
        .delete(`http://localhost:3000/api/comment/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.status == 201) {
            this.emitter.emit("comment-created");
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
// HEADER
.main {
  margin: 10px;
}
.line {
  background-color: rgba(208, 80, 89, 0.5);
  height: 10px;
  border-radius: 5px;
}
h2 {
  font-size: 1.1rem;
  margin: 0;
  color: rgba(208, 80, 89);
}
.card {
  //border: 1px solid rgba(208,80,89,0.5);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 0 10px;

  //margin-bottom: 1px;
}
.card-body {
  display: flex;
  justify-content: space-between;
}
.card-btn {
  border-radius: 3px;
  border: 1px solid #d05059;
  background-color: #d05059;
  color: #fff;
  font-weight: bold;
  font-size: 0.7rem;
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
.card-user {
  font-style: italic;
  font-size: 0.9rem;
  color: rgba(208, 80, 89);

  margin: 0;
}

.card-content {
  margin: 0;
  font-size: 0.9rem;
}
</style>
