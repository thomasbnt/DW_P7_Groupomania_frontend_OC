<template>
  <v-list-item class="pt-6" v-if="user_connected">
    <v-list-item-content>
      <v-row no-gutters class="align-center">
        <v-col cols="4">
          <v-sheet class="pa-2 ma-2">
            <v-list-item-avatar color="darken-2">
              <v-img class="elevation-2 image_profile" :src="userProfile.imageProfile" draggable="false"></v-img>
            </v-list-item-avatar>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-list-item-subtitle>Connecté</v-list-item-subtitle>
            <v-list-item-title>{{ userProfile.firstName }} {{ userProfile.lastName }}</v-list-item-title>
          </v-sheet>
        </v-col>
      </v-row>
    </v-list-item-content>
  </v-list-item>
  <!-- Non connecté -->
  <v-list-item class="pt-6" v-else>
    <v-list-item-content>
      <v-row no-gutters class="align-center">
        <v-col cols="4">
          <v-sheet class="pa-2 ma-2">
            <v-list-item-avatar color="darken-1">
              <v-img class="elevation-2 image_profile" src="src/assets/img/no_user.png" draggable="false"></v-img>
            </v-list-item-avatar>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-list-item-subtitle>Non connecté</v-list-item-subtitle>
          </v-sheet>
        </v-col>
      </v-row>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  name: "profile_icon",
  props: {
    user: Object
  },
  data() {
    return {
      userProfile: {},
      user_connected: !!localStorage.getItem("session_token")
    };
  },
};
</script>
<style scoped>
.image_profile {
  border-radius: 50%;
  user-select: none;
}
</style>
