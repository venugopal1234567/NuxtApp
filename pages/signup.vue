<template>
  <div >
    <div class="card">
      <div class="card-header" style="text-align:center">
        signup OR
        <button class="ui google plus button" v-on:click ="googleSignup">
          <i class="google plus icon"></i>
          Google Plus
        </button>
      </div>
      <div class="card-body">
        <form class="ui form" @submit.prevent="signup">
          <p v-if="formError" class="error">{{ formError }}</p>

          <div class="field">
            <label>Full Name</label>
            <input
              type="text"
              name="Full Name"
              v-model="UserData.fullName"
              placeholder="First Name"
            >
          </div>
          <div class="two fields">
            <div class="field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                v-model="UserData.password"
                value="password"
                placeholder="password"
              >
            </div>
            <div class="field">
              <label>Confirm password</label>
              <input
                type="password"
                name="password"
                v-model="UserData.password"
                placeholder="confirmPassword"
              >
            </div>
          </div>

          <div class="two fields">
            <div class="field">
              <label>Phone</label>
              <input type="text" v-model="phoneNumber" placeholder="phone Number">
              <button v-on:click="sendOTP">Send OTP</button>
              <input type="number" v-model="otp" placeholder="OTP">
              <button v-on:click="verifyOTP">verify OTP</button>
            </div>
          </div>

          <div class="two fields">
            <div class="field">
              <label>ZipCode</label>
              <input
                type="number"
                name="postalcode"
                value="zipCode"
                v-model="UserData.zipCode"
                placeholder="ZipCode"
              >
            </div>
          </div>
          <div class="two fields">
            <div class="field">
              <label for="male">
                <input type="radio" id="male" value="Male" v-model="UserData.gender"> Male
              </label>
            </div>
            <div class="field">
              <label for="female">
                <input type="radio" id="female" value="Female" v-model="UserData.gender"> Female
              </label>
            </div>
          </div>
          <div class="two fields">
            <div class="field">
              <button class="ui button" type="submit" v-on:click="signup">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import VueResource from "vue-resource";
import axios from "axios";
Vue.use(VueResource);

export default {
  data() {
    return {
      UserData: {
        fullName: "",
        password: "",
        contact: [],
        gender: "Male",
        zipCode: ""
      },
      phoneNumber: "",
      confirfPassWord: "",
      formError: null,
      otp_data: null,
      otp: null
    };
  },
  methods: {
    // signup(){
    //   console.log('sending data')
    //   this.$http
    //     .post("/api/signup", this.UserData)
    //     .then(
    //       response => {
    //         console.log(response);
    //       },
    //       error => {
    //         console.log(error);
    //       }
    //     );
    // }
    sendOTP() {
      console.log("In send OTP");
      console.log(this.phoneNumber);
      axios
        .post("/api/sendOTP", { phoneNumber: this.phoneNumber })
        .then(response => {
          this.otp_data = response.data;
          console.log(this.otp_data);
          console.log(this.otp_data.request_id);
          console.log(this.otp_data.status);
          console.log(this.otp_data.error_text);
        })
        .catch(error => {
          console.log(error);
        });
    },
    verifyOTP() {
      console.log("In verify otp");
      console.log(this.otp);
      axios
        .post("/api/verifyOTP", {
          request_id: this.otp_data.request_id,
          code: this.otp
        })
        .then(response => {
          console.log(response.data);
          console.log(response.data.request_id);
          console.log(response.data.status);
          console.log(response.data.error_text);
        })
        .catch(error => {
          console.log(error);
        });
    },

    async signup() {
      console.log("In sign up method");
      this.UserData.contact = [];
      this.UserData.contact.push(this.phoneNumber);
      console.log(this.UserData);
      try {
        await this.$store.dispatch("signup", this.UserData);

        if (this.$store.state.authUser) {
          this.$router.push("/User");
        }
        this.formUsername = "";
        this.formPassword = "";
        this.formError = null;
      } catch (e) {
        this.formError = e.message;
        console.log(this.formError);
      }
    },
    googleSignup(){
      console.log('In google SIgn up')
      axios.get('/auth/google').then((response)=>{
        console.log(response)
      }).catch((error)=>{
         console.log(response)
      })
    }
  }
};
</script>



<style>
.card {
  width: 50%;
  height: 50%;
  display: flex;
  margin: auto;
  margin-top: 10%;
  opacity: 1;
}
.error {
  color: red;
}

</style>