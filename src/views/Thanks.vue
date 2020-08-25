<template>
  <section v-if="userData">
    <h1>
      Thanks for filling in the questionnaire!
    </h1>
    <p>
      Keep this userId for your own reference: {{ userData.uid }}.
      <br />
      You can use it if you want to step out of anonymity and want talk about
      the questionnaire answers.
      <br />
      <b>Just so its clear</b>: Sharing this userId with someone might revoke
      your anonymity.
    </p>
  </section>
</template>

<script>
export default {
  computed: {
    userData() {
      return this.$store.state.user;
    }
  },
  mounted() {
    if (!this.userData) {
      this.$router.push("/");
    }
  }
};
</script>
