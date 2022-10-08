<template>
  <v-list-item class="pt-6">
    <v-list-item-content v-if="user_connected">
      <v-row no-gutters class="align-center">
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-list-item-avatar color="darken-3">
              <v-img class="elevation-2 image_profile" :src="image" draggable="false"></v-img>
            </v-list-item-avatar>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-list-item-title>{{ fullName }}</v-list-item-title>
          </v-sheet>
        </v-col>
      </v-row>
    </v-list-item-content>

    <v-list-item-content v-else>
      <v-row no-gutters class="align-center">
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-list-item-avatar color="darken-3">
              <v-img class="elevation-2 image_profile" :src="image" draggable="false"></v-img>
            </v-list-item-avatar>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-list-item-title>Non connecté</v-list-item-title>
          </v-sheet>
        </v-col>
      </v-row>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  name: "profile_icon",
  data() {
    return {
      image: null,
      fullName: "",
      firstName: "",
      lastName: "",
      user_connected: localStorage.getItem("session_token") ? true : false,
    };
  },
  methods: {
    async getProfile() {
      const session_token = localStorage.getItem("session_token");
      if (session_token) {
        const response = await fetch("http://localhost:3000/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session_token}`,
          },
        });
        const data = await response.json();
        const profile = data.success.user;
        this.image = profile.imageProfile;
        this.fullName = `${profile.firstName} ${profile.lastName}`;
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
      }
    },
  },
  mounted() {
    this.getProfile();
  },
};
</script>
<style scoped>
.image_profile {
  border-radius: 50%;
  user-select: none;
}
</style>
