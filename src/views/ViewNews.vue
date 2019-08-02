<template>
  <v-container fluid>
    <v-layout
      align-center
      align-content-center
      justify-center
    >
      <v-card v-if="post.id && !edit">
        <v-card-title>
          <h1 class="postTitle">
            {{ post.title }}
          </h1>
        </v-card-title>
        <v-card-text class="postContent">
          <p v-for="c in content">
            {{ c }}
          </p>
        </v-card-text>
        <v-card-actions class="postActions">
          <v-layout>
            <v-layout class="btns">
              <v-btn
                v-if="isAdmin"
                class="button"
                @click="edit=true"
              >
                Edit
              </v-btn>
            </v-layout>
            <p class="date">
              {{ post.date }}
            </p>
          </v-layout>
        </v-card-actions>
      </v-card>
      <v-card
        v-else-if="post.id && edit"
        class="edit"
      >
        <v-card-title>
          <v-text-field
            v-model="post.title"
            class="postTitle"
            placeholder="Title"
          />
        </v-card-title>
        <v-card-text class="postContent">
          <v-textarea
            v-model="post.content"
            label="Content"
            box
            auto-grow
            full-width
          />
          <v-textarea
            v-model="post.description"
            label="Description"
            box
            auto-grow
            full-width
          />
        </v-card-text>
        <v-card-actions class="postActions">
          <v-layout>
            <v-layout class="btns">
              <v-btn
                class="button"
                @click="savePost"
              >
                Save
              </v-btn>
            </v-layout>
            <p class="date">
              {{ post.date }}
            </p>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  import parser from '../misc/paragrashParser'

  export default {
    name: 'ViewNews',
    data: () => ({
      post: {},
      content: {},
      edit: false
    }),
    computed: {
      isAdmin () {
        return this.$store.state.account.roles.includes('ADMIN')
      }
    },
    created () {
      this.getPost(this.$route.id)
    },
    methods: {
      getPost (id) {
        fetch(`${this.$store.state.restUrl}/news/${this.$route.params.id}`)
          .then((r) => {
            r.json().then((j) => {
              this.post = j
              this.contentParse(j.content)
            })
          })
          .catch((e) => {
            this.$emit('notification', {
              type: 'error',
              message: e.message
            })
          })
      },
      savePost () {
        const config = {
          headers: {
            [this.$store.state.tokenHeader]: this.$store.state.account.token || '',
            'Content-Type': 'application/json'
          },
          method: 'PUT',
          mode: 'cors',
          cache: 'no-cache',
          body: JSON.stringify(this.post)
        }
        fetch(`${this.$store.state.restUrl}/news/${this.post.id}`, config)
          .then((r) => {
            if (r.ok) {
              this.$emit('notification', {
                type: 'success',
                message: 'Update successful!'
              })
              this.contentParse(this.post.content)
            } else {
              throw new Error(r.statusText)
            }
          })
          .catch((e) => {
            if (e) {
              this.$emit('notification', {
                type: 'error',
                message: e.message
              })
              this.getPost()
            }
          })
      },
      contentParse (c) {
        this.content = parser.parse(c)
      }
    }
  }
</script>

<style scoped>
  .postTitle,
  .button{
    text-transform: uppercase;
  }
  .postTitle {
    font-size: 2em;
    font-weight: bold;
  }
  .postActions .date {
    flex-grow: 2;
    text-align: right;
  }
  .edit {
    width: 100%;
  }

</style>
