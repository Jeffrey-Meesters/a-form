<template>
  <div class="form-wrapper" v-if="userData">
    <h1 class="form-title">Communication Questionnaire about Jeffrey</h1>
    <form class="form" @submit.prevent="submitAnswers">
      <RadioFieldset
        :listening.sync="form.listening"
        radioID="listening"
        ref="listening"
        legendText="Listens to what I say"
        :responseOptions="responseOptions"
      />
      <RadioFieldset
        :understanding.sync="form.understanding"
        radioID="understanding"
        ref="understanding"
        legendText="Understands my point of view"
        :responseOptions="responseOptions"
      />
      <RadioFieldset
        :communicating.sync="form.communicating"
        radioID="communicating"
        ref="communicating"
        legendText="Communicates clearly"
        :responseOptions="responseOptions"
      />
      <RadioFieldset
        :requesting.sync="form.requesting"
        radioID="requesting"
        ref="requesting"
        legendText="Makes effective requests"
        :responseOptions="responseOptions"
      />
      <RadioFieldset
        :promise.sync="form.promise"
        radioID="promise"
        ref="promise"
        legendText="Keeps promises"
        :responseOptions="responseOptions"
      />

      <RadioFieldset
        :feedback.sync="form.feedback"
        radioID="feedback"
        ref="feedback"
        legendText="Gives constructive feedback"
        :responseOptions="responseOptions"
      />

      <div class="hr-wrapper">
        <hr />
      </div>

      <RadioFieldset
        :hasMadeProgress.sync="form.hasMadeProgress"
        radioID="hasMadeProgress"
        ref="hasMadeProgress"
        legendText="Has made progress in communicating over the past 4 months"
        :responseOptions="['yes', 'neutral', 'no']"
      />

      <div class="hr-wrapper">
        <hr />
      </div>

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
          min="1"
          max="10"
          ref="overallNumber"
          @change="updateValue($event, 'overallNumber')"
          :value="form.overallNumber"
        />
      </fieldset>

      <fieldset class="fieldset">
        <legend class="remark-legend">
          Any other thing you want to share in regard to Jeffreys' communication
          skills:
        </legend>
        <textarea
          rows="3"
          id="input-remark"
          ref="freeText"
          @input="updateValue($event, 'freeText')"
          :value="form.freeText"
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
import { updateUser } from "@/services/firebase";
export default {
  name: "Form",
  components: {
    RadioFieldset
  },
  computed: {
    userData() {
      return this.$store.state.user;
    }
  },
  mounted() {
    if (!this.userData) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      isValidated: false,
      form: {
        hasMadeProgress: null,
        listening: null,
        understanding: null,
        communicating: null,
        requesting: null,
        promise: null,
        feedback: null,
        overallNumber: 0,
        freeText: null
      },
      responseOptions: ["unsatisfactory", "poor", "normal", "good", "excellent"]
    };
  },
  methods: {
    updateValue(event, inputType) {
      this.form[inputType] = event.target.value;
    },
    setInvalidOnUi(keys, invalidKeys) {
      for (let i = 0; i < keys.length; i++) {
        if (invalidKeys.includes(keys[i])) {
          if (keys[i] === "overallNumber" || keys[i] === "freeText") {
            this.$refs[keys[i]].parentElement.style.color = "#f00";
          } else {
            this.$refs[keys[i]].$el.style.color = "#f00";
          }
        } else {
          if (keys[i] === "overallNumber" || keys[i] === "freeText") {
            this.$refs[keys[i]].parentElement.style.color = "#000";
          } else {
            this.$refs[keys[i]].$el.style.color = "#000";
          }
        }
      }
    },
    validateInput() {
      const keys = Object.keys(
        Object.assign({}, this.form, {
          overallNumber: this.overallNumber,
          freeText: this.freeText
        })
      );
      let invalidKeys = [];

      for (let i = 0; i < keys.length; i++) {
        if (!this.form[keys[i]]) {
          invalidKeys.push(keys[i]);
        }
      }
      this.setInvalidOnUi(keys, invalidKeys);
      this.isValidated = true;

      return invalidKeys;
    },
    async submitAnswers() {
      const isValid = await this.validateInput();
      if (isValid.length) {
        return;
      }

      const response = await updateUser(this.form);
      if (Object.keys(response).length) {
        this.$router.push("/thanks");
      }
    }
  },
  watch: {
    form: {
      deep: true,
      handler: function(val) {
        console.log(val);
        if (this.isValidated) {
          this.validateInput();
        }
      }
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

    textarea {
      width: 99%;
    }
  }

  .hr-wrapper {
    width: 97%;
    margin: 10px 0;

    hr {
      height: 1px;
      border-width: 2px;
    }
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
