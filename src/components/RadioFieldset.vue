<template>
  <fieldset class="fieldset">
    <legend class="radio-legend">{{ legendText }}</legend>
    <div v-for="(option, index) in responseOptions" :key="index">
      <input
        type="radio"
        :name="radioID"
        :id="`input-${radioID}-${option}`"
        :value="radioID"
        @input="$emit(`update:${radioID}`, option)"
      />
      <label :for="`input-${radioID}-${option}`" class="label">{{
        option
      }}</label>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: "radio-fieldset",
  props: {
    radioID: {
      type: String,
      required: true
    },
    legendText: {
      type: String,
      required: true
    },
    responseOptions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      listening: null,
      understanding: null,
      communicating: null,
      requesting: null,
      promise: null,
      feedback: null,
      yes: null,
      neutral: null,
      no: null
    };
  },
  methods: {
    onChange(event, radioID) {
      this[radioID] = event.target.value;
    }
  }
};
</script>
<style lang="scss" scoped>
fieldset {
  div {
    display: flex;
    align-items: center;
  }
}
</style>
