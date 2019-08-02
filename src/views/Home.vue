<template>
  <v-container fluid>
    <v-layout
      class="news"
      row
      wrap
      align-content-space-around
    >
      <v-flex
        xs12
        lg4
        v-for="n in news"
        :key="n.id"
        @click="newsClick(n.id)"
      >
        <div class="newsCardWrap">
          <v-card
            class="newsCard"
            dark
          >
            <v-card-title>
              <div>
                <h3 class="newsTitle">{{n.title}}</h3>
                <p class="newsDescription">{{n.description}}</p>
              </div>
            </v-card-title>
            <v-card-actions>
              <p class="date">{{n.date}}</p>
            </v-card-actions>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import * as firebase from 'firebase/app'
  import 'firebase/auth'

  export default {
    data: () => ({
      news: []
    }),
    methods: {
      getNews (page, size) {
        let params = `?page=${page?page:1}&size=${size?size:21}`
        fetch(`${this.$store.state.restUrl}/news${params}`)
          .then((r) => {
            r.json().then((j) => { this.news = j })
          })
          .catch((e) => {
            this.$emit('notification', {
              type: 'error',
              message: e.message
            })
          })
      },
      newsClick (id) {
        this.$router.push({
          name: 'viewNews',
          params: { id }
        })
      }
    },
    created() {
      this.getNews()
    }
}
</script>

<style scoped>
  .news {
    align-items: stretch;
  }
  .newsCardWrap {
    box-sizing: border-box;
    padding: 5px;
    height: 100%;
  }
  .newsCard {
    box-sizing: border-box;
    height: 100%;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .date {
    text-align: right;
  }
</style>
