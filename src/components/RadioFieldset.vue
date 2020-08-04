<template>
  <fieldset class="fieldset">
    <legend class="radio-legend">{{ legendText }}</legend>
    <div>
      <input
        type="radio"
        :name="radioID"
        :id="`input-${radioID}-unsatisfactory`"
        :value="radioID"
        @input="$emit(`update:${radioID}`, 'unsatisfactory')"
      />
      <label :for="`input-${radioID}-unsatisfactory`" class="label"
        >unsatisfactory</label
      >
    </div>
    <div>
      <input
        type="radio"
        @change="onChange($event, radioID)"
        :name="radioID"
        :id="`input-${radioID}-poor`"
        :value="radioID"
        @input="$emit(`update:${radioID}`, 'poor')"
      />
      <label :for="`input-${radioID}-poor`" class="label">poor</label>
    </div>
    <div>
      <input
        type="radio"
        @change="onChange($event, radioID)"
        :name="radioID"
        :id="`input-${radioID}-normal`"
        :value="radioID"
        @input="$emit(`update:${radioID}`, 'normal')"
      />
      <label :for="`input-${radioID}-normal`" class="label">normal</label>
    </div>
    <div>
      <input
        type="radio"
        @change="onChange($event, radioID)"
        :name="radioID"
        :id="`input-${radioID}-good`"
        :value="radioID"
        @input="$emit(`update:${radioID}`, 'good')"
      />
      <label :for="`input-${radioID}-good`" class="label">good</label>
    </div>
    <div>
      <input
        type="radio"
        @change="onChange($event, radioID)"
        :name="radioID"
        :id="`input-${radioID}-excellent`"
        :value="radioID"
        @input="$emit(`update:${radioID}`, 'excellent')"
      />
      <label :for="`input-${radioID}-excellent`" class="label">excellent</label>
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
    }
  },
  data() {
    return {
      listening: null,
      understanding: null,
      communicating: null,
      requesting: null,
      promise: null,
      feedback: null
    };
  },
  methods: {
    onChange(event, radioID) {
      console.log(event.target.value, radioID);
      this[radioID] = event.target.value;
    }
  }
};
</script>
