<template>
  <div class="main">
    <div class="card">
      <header class="card-header">
        <div class="card-title">Créer un post</div>
      </header>
      <div class="card-body">
        <form @submit.prevent="createPost">
          <h2 class="card-title">
            <input
              type="text"
              class="input-title"
              v-model="title"
              placeholder="Titre"
            />
          </h2>
          <p class="card-content">
            <input
              type="text"
              class="input-content"
              v-model="content"
              placeholder="Contenu"
            />
          </p>
          <div class="card-body-button">
            <label class="btn btn-secondary">
              Ajouter une image
              <input type="file" ref="file" @change="onFileSelected" />
              <span v-if="file" class="file">Image selectionné : {{ file.name }}</span>
            </label>

            <button type="submit" class="btn">Publier</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PostCreate",
  data() {
    return {
      title: "",
      content: "",
      userId: "",
      selectdFile: null,
      file: "",
    };
  },

  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.file = this.$refs.file.files[0];
    },

    async createPost() {
      const id = localStorage.getItem("userId");
      if (!this.selectedFile) {
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("userId", id);
        console.log("thisid", id);
        console.log(formData);
        const response = await axios
          .post("http://localhost:3000/api/post", formData, {
            headers: {
              //'Content-Type': 'multipart/form-data',
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            if (response.status == 200) {
              this.emitter.emit("post-refresh");
              this.content = "";
              this.title = "";
            }
          });
      } else {
        const formData = new FormData();
        formData.append("image", this.selectedFile, this.selectedFile.filename);
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("userId", id);
        const response = await axios
          .post("http://localhost:3000/api/post", formData, {
            headers: {
              //'Content-Type': 'multipart/form-data',
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            if (response.status == 200) {
              this.emitter.emit("post-refresh");
              this.content = "";
              this.selectedFile = "";
              this.title = "";
              this.file = "";
            }
          });
      }

      console.log("ok");
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
  margin-bottom: 20px;
}
.card-header {
  padding: 10px;
  display: flex;
  justify-content: space-around;
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
.card-body-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
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
input[type="file"] {
  display: none;
}
input {
  width: calc(100% - 10px);
  overflow: hidden;
  border: none;
  background-color: #eee;
  border-radius: 3px;
  &:focus {
    outline: none;
    background-color: #fff;
  }
}
.input-title {
}
.input-content {
  height: 100px;
}
button,
label {
  display:flex;
  flex-direction: column;
  border-radius: 3px;
  border: 1px solid #0f3471;
  background-color: #0f3471;
  color: #fff;
  font-weight: bold;
  padding: 15px 40px;
  margin: 10px;
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
.btn-secondary {
  background-color: #d05059;
  border: 1px solid #d05059;
}
.file {
  font-weight: normal;
  font-size: 0.6rem;
  text-transform: none;
}
</style>
