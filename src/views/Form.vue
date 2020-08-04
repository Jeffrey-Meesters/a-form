<template>
  <div class="form-wrapper">
    <h1 class="form-title">Communication Questionnaire for Jeffrey</h1>
    <form class="form" @submit.prevent="yolo">
      <RadioFieldset
        :listening.sync="listening"
        radioID="listening"
        legendText="Listens to what I say"
      />
      <RadioFieldset
        :understanding.sync="understanding"
        radioID="understanding"
        legendText="Understands my point of view"
      />
      <RadioFieldset
        :communicating.sync="communicating"
        radioID="communicating"
        legendText="Communicates clearly"
      />
      <RadioFieldset
        :requesting.sync="requesting"
        radioID="requesting"
        legendText="Makes effective requests"
      />
      <RadioFieldset
        :promise.sync="promise"
        radioID="promise"
        legendText="Keeps promises"
      />
      <RadioFieldset
        :feedback.sync="feedback"
        radioID="feedback"
        legendText="Gives constructive feedback"
      />

      <fieldset class="fieldset">
        <legend class="number-legend">
          How would you rate Jeffreys' communication skills overall
        </legend>
        <label for="input-overall" class="label"
          >from 1 really bad to 10 excellent:</label
        >
        <input
          type="number"
          id="input-overall"
          min="0"
          max="10"
          @change="updateValue($event, 'overallNumber')"
          :value="overallNumber"
        />
      </fieldset>

      <fieldset class="fieldset">
        <legend class="remark-legend">
          Any other thing you want to share in regard to Jeffreys' communication
          skills:
        </legend>
        <textarea
          id="input-remark"
          min="1"
          max="10"
          @input="updateValue($event, 'freeText')"
          :value="freeText"
        />
      </fieldset>

      <div class="button-wrapper">
        <button type="submit" class="submit-button">Submit answers</button>
      </div>
    </form>
  </div>
</template>

<script>
import RadioFieldset from "@/components/RadioFieldset";
export default {
  name: "Form",
  components: {
    RadioFieldset
  },
  data() {
    return {
      listening: null,
      understanding: null,
      communicating: null,
      requesting: null,
      promise: null,
      feedback: null,
      overallNumber: 1,
      freeText: null
    };
  },
  methods: {
    updateValue(event, inputType) {
      this[inputType] = event.target.value;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  .fieldset {
    min-width: 45%;
    max-width: 45%;
  }

  .button-wrapper {
    width: 97%;
    margin-top: 10px;

    button {
      width: 100%;
    }
  }
}

@media only screen and (max-width: 768px) {
  .form {
    .fieldset {
      min-width: 90%;
    }
  }
}
</style>
