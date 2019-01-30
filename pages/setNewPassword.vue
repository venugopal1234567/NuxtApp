<template>
  <div>
    <div class="container">
      <form action style="max-width:500px;margin:auto">
        <h3>Create Your Google Account Here</h3>
        <div class="input-container">
          <input
            class="form-control"
            type="password"
            placeholder="Enter Your Password"
            name="usrnm"
            style
          >
        </div>

        <div class="input-container">
          <input
            class="form-control"
            type="password"
            placeholder="Re-enter Your Password"
            name="psw"
          >
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          style="margin-left: 160px;"
        >Create Your Account</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>



   
<style>
.input-container {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
}

.icon {
  padding: 10px;
  background-color: cornflowerblue;
  color: white;
  min-width: 50px;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 10px;
  outline: none;
  border-radius: 5px;
}

.input-field:focus {
  border: 2px solid dodgerblue;
}
.container {
  border-radius: 5px;
  background: #e0e0e0;
  padding: 30px;
  margin-top: 150px;
  max-width: 550px;
}
h3 {
  margin-left: 70px;
}
</style>