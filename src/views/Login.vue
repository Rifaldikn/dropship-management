<template>
  <v-container fluid fill-height class="white">
    <v-row class="d-flex justify-center pa-10">
      <v-col class="pa-0 absolute">
        <v-img height="250px" src="../assets/loginImage.png"></v-img>
      </v-col>
      <v-col cols="12" class="mt-n15">
        <v-card-title
          primary-title
          class="font-weight-bold pa-0 d-flex justify-center"
        >
          Dropship Management
        </v-card-title>
        <v-card-text class="pa-0 text-center"> Login to Continue </v-card-text>
      </v-col>
      <v-col cols="12" class="pa-0">
        <v-text-field
          solo
          filled
          label="Email"
          flat
          background-color="#F6F6F6"
          :rules="[rules.required, rules.email]"
          class="rounded-lg"
          v-model="userFormData.email"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="pa-0">
        <v-text-field
          solo
          filled
          label="Password"
          :rules="[rules.required, rules.min]"
          type="password"
          flat
          background-color="#F6F6F6"
          class="rounded-lg"
          v-model="userFormData.password"
        ></v-text-field>
      </v-col>
      <v-col class="pa-0">
        <v-btn
          color="primary"
          block
          class="text-capitalize elevation-0 rounded-lg"
          @click="loginAction"
          >Login</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-row class="align-center justify-center">
          <v-card-actions> Don't have an account? </v-card-actions>
          <v-btn
            class="pa-0 text-capitalize font-weight-bold"
            color="primary"
            text
            :ripple="false"
            @click="dialog = true"
            >Register!</v-btn
          >
        </v-row>
      </v-col>
    </v-row>

    <!-- Register Dialog -->
    <v-dialog
      v-model="dialog"
      width="100%"
      transition="scroll-x-transition"
      fullscreen
    >
      <v-card elevation="0">
        <v-row class="pa-10">
          <v-btn
            color="primary"
            fab
            small
            elevation="0"
            @click="dialog = false"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-col cols="12" class="px-0 pb-0">
            <v-card-title class="title-1 primary--text font-weight-bold">
              Create a New Account
            </v-card-title>
          </v-col>

          <v-col cols="12" class="py-0">
            <v-card-text class="pa-0 primary--text">Store Name </v-card-text>
            <v-text-field
              solo
              required
              filled
              flat
              background-color="#F6F6F6"
              :rules="[rules.required]"
              v-model="userFormData.name"
            ></v-text-field>
            <v-card-text class="pa-0 primary--text"
              >Store Location
            </v-card-text>
            <v-text-field
              solo
              required
              filled
              flat
              background-color="#F6F6F6"
              :rules="[rules.required]"
              v-model="userFormData.location"
            ></v-text-field>
            <v-card-text class="pa-0 primary--text">Email </v-card-text>
            <v-text-field
              solo
              required
              filled
              flat
              background-color="#F6F6F6"
              :rules="[rules.required, rules.email]"
              v-model="userFormData.email"
            ></v-text-field>
            <v-card-text class="pa-0 primary--text">Password </v-card-text>
            <v-text-field
              solo
              required
              filled
              flat
              background-color="#F6F6F6"
              :rules="[rules.required, rules.min]"
              type="password"
              v-model="userFormData.password"
            ></v-text-field>
            <v-card-text class="pa-0 primary--text"
              >Confirm Password
            </v-card-text>
            <v-text-field
              solo
              required
              filled
              :error-messages="confirmPasswordMessage"
              error
              flat
              type="password"
              background-color="#F6F6F6"
              :rules="[rules.required]"
              label="Re-enter password"
              v-model="confirmPassword"
            ></v-text-field>
            <v-card-actions>
              <v-btn
                color="primary"
                class="rounded-lg text-capitalize elevation-0"
                block
                @click="createNewAccountAction"
              >
                Create Account
              </v-btn>
            </v-card-actions>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      dialog: false,
      userFormData: {
        name: "",
        email: "",
        password: "",
        location: "",
      },
      confirmPassword: "",
      rules: {
        required: (value) => !!value || "Required",
        min: (v) => v.length >= 6 || "Min 8 characters",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  computed: {
    confirmPasswordMessage() {
      return this.userFormData.password != this.confirmPassword
        ? "Password doesn't match"
        : undefined;
    },
  },
  methods: {
    loginAction() {
      const email = this.userFormData.email;
      const password = this.userFormData.password;

      this.$store.dispatch("signInuser", { email, password });

      setTimeout(() => {
        this.$router.push("/");
      }, 2000);
    },
    createNewAccountAction() {
      this.$store.dispatch("registerUser", this.userFormData);
      this.dialog = false;
    },
  },
  created() {
    window.localStorage.clear();
  },
};
</script>