<template>
  <v-container>
    <v-layout
      wrap
      align-center
      justify-center
      row
      fill-height
    >
      <v-flex md6>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            v-model="email"
            label="email"
            placeholder="type your e-mail here"
            counter
            :rules="usernameRules"
          />
          <v-text-field
            v-model="password"
            hint="At least 8 characters"
            label="Password"
            placeholder="type your password here"
            counter
            :type="showPass ? 'text' : 'password'"
            :rules="passwordRules"
            :append-icon="showPass ? 'visibility_off' : 'visibility'"
            @click:append="showPass = !showPass"
          />
          <v-btn @click="submit(false)">
            Login
          </v-btn>
          <v-btn @click="submit(true)">
            Sign up
          </v-btn>
          <v-btn @click="clear">
            Clear
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Login',
    data: () => ({
      error: '',
      message: '',
      valid: true,
      showPass: false,
      email: '',
      usernameRules: [
        v => !!v || 'E-mail id required!',
        v => /.+@.+/.test(v) || 'E-mail must be valid!'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required!',
        v => (v && v.length >= 8) || 'Password must be more than 8 characters!'
      ]
    }),
    methods: {
      submit (signup) {
        if (this.$refs.form.validate()) {
          this.$store.dispatch(`account/signIn`, {
            email: this.email,
            password: this.password,
            signup
          }).then((r) => {
            if (r) {
              this.error = false
              this.message = 'Welcome!'
            }
          }).catch((e) => {
            this.error = true
            this.message = e.message
          }).finally(() => {
            this.$emit('notification', {
              type: this.error ? 'error' : 'success',
              message: this.message
            })
            if (!this.error) {
              this.$router.push('/')
            };
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style scoped>

</style>
