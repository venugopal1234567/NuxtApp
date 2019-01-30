<template>
  <div>
    <h1> Welcome </h1>
    <h1>{{this.$store.state.authUser.fullName}}</h1>
    <h2>{{this.$store.state.authUser.phoneNumber}}</h2>

    <button @click="logout">Logout  </button>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  methods:{
      async logout() {
      try {
         this.$router.push('/');
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>
