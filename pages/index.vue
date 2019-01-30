<template>
  <div class="container">
   
    <form  @submit.prevent="login">
      <p v-if="formError" class="error">
        {{ formError }}
      </p>
      
      <p>Username: <input v-model="formUsername" type="text" name="username"></p>
      <p>Password: <input v-model="formPassword" type="password" name="password"></p>
      <button type="submit">
        Login
      </button>
    </form>

   

    <p>
     
    </p>
  </div>
</template>

<script>


export default {
  data() {
    return {
      formError: null,
      formUsername: '',
      formPassword: ''
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })
          this.$router.push('/User');
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style>
.container {
  padding: 100px;
}
.error {
  color: red;
}
</style>
