<template>
  <v-container class="pa-5" fluid fill-height>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card class="pa-5" flat rounded="lg">
          <v-row class="d-flex justify-center text-center">
            <v-col cols="12">
              <v-row class="d-flex justify-center">
                <v-col cols="12" class="d-flex justify-center">
                  <v-card
                    width="100px"
                    color="secondary"
                    elevation="0"
                    @click="$refs.imageInput.click()"
                    :ripple="false"
                    rounded="xl"
                  >
                    <v-img
                      height="100px"
                      position="center center"
                      class="rounded-xl"
                      v-if="userData.imgURL || img1"
                      :src="userData.imgURL || img1"
                      alt="alt"
                    >
                    </v-img>
                    <!-- </v-avatar> -->
                    <v-avatar
                      v-else
                      height="100px"
                      width="100px"
                      tile
                      class="d-flex justify-center rounded-xl"
                    >
                      <v-icon> mdi-camera </v-icon>
                    </v-avatar>
                    <input
                      type="file"
                      id="imageInput"
                      ref="imageInput"
                      accept="image/*"
                      style="display: none"
                      class="rounded-lg"
                      @change="previewImage"
                    />
                  </v-card>
                </v-col>
                <v-btn
                  color="primary"
                  class="text-capitalize elevation-0 rounded-lg"
                  @click="uploadImageProfle"
                  v-if="img1 && !userData.imgURL"
                  small
                  >Upload</v-btn
                >
              </v-row>
            </v-col>
            <v-card-title class="primary--text font-weight-bold pa-0">
              {{ userData.name }}
            </v-card-title>
            <v-card-text class="grey--text text--darken-1">
              Location: {{ userData.location }}
            </v-card-text>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card class="pa-5 my-3" flat rounded="lg">
          <v-row no-gutters>
            <v-col>
              <v-card-text class="px-0"> Store Link </v-card-text>
              <v-card
                class="d-flex pa-1 align-center rounded-lg"
                flat
                outlined
                tile
              >
                <v-text-field
                  hide-details
                  solo
                  filled
                  background-color="#F7F7FC"
                  flat
                  dense
                  v-model="userData.storeLink"
                  :readonly="userData.storeLink"
                >
                </v-text-field>
                <v-btn
                  color="grey"
                  x-small
                  class="elevation-0 ma-2"
                  @click="copyToClipBoard"
                  icon
                >
                  <v-icon>mdi-clipboard-multiple-outline</v-icon>
                </v-btn>
              </v-card>
              <v-btn
                v-if="!userData.storeLink"
                color="primary"
                block
                class="text-capitalize rounded-lg elevation-0 my-2"
                @click="dialog = !dialog"
                tile
                small
                >Insert Store Link</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col class="d-flex justify-center" cols="12">
        <v-btn
          color="primary"
          class="text-capitalize elevation-0 rounded-lg"
          @click="logOutAction"
          block
          >Log Out</v-btn
        >
      </v-col>
    </v-row>
    <v-bottom-sheet v-model="dialog">
      <v-card class="pa-10">
        <v-card-text class="pl-0 primary--text"> Store Link </v-card-text>
        <v-text-field
          outlined
          solo
          flat
          dense
          filled
          background-color="#F7F7FC"
          v-model="profileForm.storeLink"
        >
        </v-text-field>
        <v-btn
          block
          color="primary"
          class="text-capitalize rounded-lg elevation-0"
          @click="insertStoreLink"
          >Save</v-btn
        >
      </v-card>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      dialog: false,
      img1: null,
      imageData: null,
      profileForm: {
        storeLink: "",
      },
      productData: {
        imageLink: "",
      },
    };
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  methods: {
    logOutAction() {
      window.localStorage.clear();
      caches.keys().then(function (names) {
        for (let name of names) caches.delete(name);
      });

      setTimeout(() => {
        this.$router.push("/login");
      }, 2000);
    },
    async copyToClipBoard() {
      await navigator.clipboard.writeText(this.userData.storeLink).then(() => {
        this.$store.commit("SET_Notification", {
          message: "Copied",
          isActive: true,
          img: "success",
        });
        setTimeout(() => {
          this.$store.commit("SET_Notification", {
            isActive: false,
          });
        }, 1000);
      });
    },

    insertStoreLink() {
      const userData = {
        storeLink: this.profileForm.storeLink,
      };
      const userId = this.userData.id;

      this.$store.dispatch("updateUserData", { userId, userData }).then(() => {
        this.dialog = false;
      });
    },

    uploadImageProfle() {
      const userId = this.userData.id;

      this.$store.dispatch("addUserProfilePicture", {
        userId,
        imgData: this.imageData,
      });
    },

    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];

      this.img1 = URL.createObjectURL(this.imageData);
    },

    handleFileUpload() {
      this.$refs.imageInput.click();
    },
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #b9bcff;
}
</style>