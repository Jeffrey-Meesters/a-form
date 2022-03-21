<template>
  <fragment>
    <section>
      <h1>Welcome to this questionnaire</h1>
      <p>
        Your answers to this questionnaire will be saved in a database.
        <br />
        However this will be done anonymous. At the end of the questionnaire you
        will get a reference id.
        <br />
        You can save that reference id for yourself on your computer for when
        you might want to talk about your answers later.
        <br />
        However, keep in mind that sharing that reference id may revoke your
        anonymity
      </p>
      <span class="sub-btn-wrapper">
        <button @click="sendSignIn" disabled>Go to Questionnaire</button>
        <sup>Questionaire is closed</sup>
      </span>
    </section>
    <section>
      <p>Or log in to see the results.</p>
      <button @click="$router.push('/signin')">Log in</button>
    </section>
  </fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
// import { signInAnonymously } from "@/services/firebase";
export default {
  name: "Sign-in",
  components: { Fragment },
  methods: {
    async sendSignIn() {
      return alert("Questionnaire is closed.");
      // try {
      //   const user = await signInAnonymously();
      //   if (user.uid) {
      //     // It's only updating internal state, not updating firebase, to null
      //     await this.$store.dispatch("setUser", null);
      //     await this.$store.dispatch("setAnonymousUser", user);
      //     this.$router.push("/questionnaire");
      //   }
      // } catch (err) {
      //   alert(err);
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
.sub-btn-wrapper {
  display: flex;
  flex-direction: column;
  width: 200px;
}
</style>
