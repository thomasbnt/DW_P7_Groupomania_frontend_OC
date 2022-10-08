<template>
  <v-list-item class="pt-6">
    <v-list-item-content v-if="user_connected">
      <v-list-item-avatar color="darken-3">
        <v-img class="elevation-2 image_profile" :src="image" draggable="false"></v-img>
      </v-list-item-avatar>
    </v-list-item-content>

    <v-list-item-content v-else>
      <v-list-item-avatar color="darken-3">
        <v-img class="elevation-2 image_profile" :src="image" draggable="false"></v-img>
      </v-list-item-avatar>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  name: "profile_image",
  data() {
    return {
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      fullName: "Jean Dupont",
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
