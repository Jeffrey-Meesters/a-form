<template>
  <div>
    <button @click="sendSignIn">Go to Questionaire</button>
  </div>
</template>

<script>
import { signIn } from "@/services/firebase";
export default {
  name: "Sign-in",
  methods: {
    async sendSignIn() {
      try {
        const user = await this.signIn();
        console.log(444, user);
        this.$store.dispatch("setUser", user);
      } catch (err) {
        alert(err);
      }
    },
    signIn
  }
};
</script>
