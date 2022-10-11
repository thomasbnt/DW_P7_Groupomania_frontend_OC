<template v-slot:append>
  <div class="pa-2"><account_btn_connect /></div>
</template>
<script>
import account_btn_connect from "./account_btn_connect.vue";
export default {
  name: "nav_btn_bottom",
  components: {
    account_btn_connect,
  },
};
</script>
