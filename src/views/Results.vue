<template>
  <section>
    <h1>Results:</h1>
  </section>
</template>

<script>
import { getdata } from "@/services/firebase";
export default {
  computed: {
    userData() {
      return this.$store.state.user;
    }
  },
  mounted() {
    this.userData ? this.getdata() : this.$router.push("/signin");
  },
  methods: {
    getdata
  }
};
</script>
