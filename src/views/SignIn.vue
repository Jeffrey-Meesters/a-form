<template>
  <section>
    <h1>Welcome to this questionnaire</h1>
    <p>
      Your answers to this questionnaire will be saved in a database.
      <br />
      However this will be done anonymous. At the end of the questionnaire you
      will get a reference id.
      <br />
      You can save that reference id for yourself on your computer for when you
      might want to talk about your answers later.
      <br />
      However, keep in mind that sharing that reference id may revoke your
      anonymity
    </p>
    <button @click="sendSignIn">Go to Questionnaire</button>
  </section>
</template>

<script>
import { signIn } from "@/services/firebase";
export default {
  name: "Sign-in",
  methods: {
    async sendSignIn() {
      try {
        const user = await signIn();
        this.$store.dispatch("setUser", user);
      } catch (err) {
        alert(err);
      }
    }
  }
};
</script>
