<template>
  <section>
    <form @submit.prevent="sendSignIn" class="form">
      <label for="email">Email:</label>
      <input
        type="text"
        placeholder="Email"
        name="email"
        id="email"
        v-model="form.email"
      />
      <label for="password">Password:</label>
      <input
        type="password"
        placeholder="Password"
        name="password"
        id="password"
        v-model="form.password"
      />
      <button type="submit">Log in</button>
    </form>
  </section>
</template>

<script>
import { signIn } from "@/services/firebase";
export default {
  name: "Sign-in",
  data: () => ({
    form: {
      email: "",
      password: ""
    }
  }),
  methods: {
    async sendSignIn() {
      try {
        const resp = await signIn(this.form);
        if (resp.user.uid) {
          // It's only updating internal state, not updating firebase, to null
          await this.$store.dispatch("setAnonymousUser", null);
          await this.$store.dispatch("setUser", resp.user);
          this.$router.push("/results");
        }
      } catch (err) {
        alert(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  display: grid;
  grid-template-columns: 0.5fr;
}

form {
  display: grid;
  grid-template-columns: 100px 200px;
  grid-gap: 10px;
}

label {
  grid-column: 1 / 2;
}

input,
button {
  grid-column: 2 / 3;
}
</style>
