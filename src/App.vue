<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Newtify</span>
        <span class="font-weight-light">prototype</span>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          flat
          to="/"
        >
          Home
        </v-btn>
        <v-btn
          v-if="!$store.state.account.status"
          flat
          to="/login"
        >
          Login or Sign up
        </v-btn>
        <v-btn
          v-else
          flat
          @click="logout"
        >
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view @notification="notification" />
    </v-content>
    <v-snackbar
      v-model="notificationStatus"
      :color="notificationType"
      :timeout="6000"
    >
      {{ notificationMessage }}
      <v-btn
        dark
        flat
        @click="notificationStatus = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        notificationStatus: false,
        notificationType: 'success',
        notificationMessage: ''
      }
    },
    created () {
      this.$store.dispatch('account/checkAuth')
    },
    methods: {
      logout () {
        this.$store
          .dispatch('account/signOut')
          .then(() => {
            this.notificationMessage = 'Good buy -_-'
            this.notificationType = 'info'
          })
          .catch((e) => {
            if (e) {
              this.notificationMessage = e.message
              this.notificationType = 'error'
            }
          })
          .finally(() => {
            this.notificationStatus = true
          })
      },
      notification ({ type, message }) {
        this.notificationMessage = message
        this.notificationType = type
        this.notificationStatus = true
      }
    }
  }
</script>
