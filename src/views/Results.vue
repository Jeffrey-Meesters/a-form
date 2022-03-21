<template>
  <section>
    <h1>Results:</h1>
    <div v-for="(item, index) in results" :key="index">
      <span v-if="item[0]">
        <span>
          <h3>{{ getDate(item[0].data.timeStamp) }}</h3>
          <span> communicating: {{ item[0].data.communicating }} </span>
          <span> feedback: {{ item[0].data.feedback }} </span>
          <span> listening: {{ item[0].data.listening }} </span>
          <span> overallNumber: {{ item[0].data.overallNumber }} </span>
          <span> promise: {{ item[0].data.promise }} </span>
          <span> requesting: {{ item[0].data.requesting }} </span>
          <span> Understanding: {{ item[0].data.understanding }} </span>
          <span v-if="item[0].data.hasMadeProgress">
            hasMadeProgress: {{ item[0].data.hasMadeProgress }}
          </span>
        </span>
        <span class="remarks">
          <b>Remarks:</b>
          <br />
          {{
            item[0].data.freeText.length > 1
              ? item[0].data.freeText
              : "No remarks"
          }}
        </span>
      </span>
      <span v-if="item[1]">
        <span>
          <h3>{{ getDate(item[1].data.timeStamp) }}</h3>
          <span> communicating: {{ item[1].data.communicating }} </span>
          <span> feedback: {{ item[1].data.feedback }} </span>
          <span> listening: {{ item[1].data.listening }} </span>
          <span> overallNumber: {{ item[1].data.overallNumber }} </span>
          <span> promise: {{ item[1].data.promise }} </span>
          <span> requesting: {{ item[1].data.requesting }} </span>
          <span> Understanding: {{ item[1].data.understanding }} </span>
          <span v-if="item[1].data.hasMadeProgress">
            hasMadeProgress: {{ item[1].data.hasMadeProgress }}
          </span>
        </span>
        <span class="remarks">
          <b>Remarks:</b>
          <br />
          {{
            item[1].data.freeText.length > 1
              ? item[1].data.freeText
              : "No remarks"
          }}
        </span>
      </span>
    </div>
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
    this.userData ? this.getResultsData() : this.$router.push("/signin");
  },
  data: () => ({
    results: null
  }),
  methods: {
    getDate(timeStamp) {
      return new Intl.DateTimeFormat(["nl", "en"]).format(timeStamp);
    },
    async getResultsData() {
      this.results = [];
      const data = await getdata();
      // I have to admit I made a faulty DB which already has "production" data.
      // fault 1 is: The "production" db is the same as my development db -_-
      const removeFoultyObjects = data.filter(item => {
        if (Object.keys(item).length > 1 && item.uid) return item;
      });

      const correctedData = removeFoultyObjects.map(item => {
        const arr = [];
        Object.keys(item).forEach(key => {
          if (key.match("formData")) {
            console.log(item);
            arr.push({ data: { ...item[key], id: item.uid } });
          }
        });

        return arr;
      });

      this.results = correctedData;
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  border-top: 1px solid grey;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  padding: 0 10px;

  span {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 0 5px;
  }
}

div:last-child {
  border-bottom: 1px solid grey;
}

.remarks {
  padding: 5px 10px;
  max-width: 30%;
}

@media only screen and (max-width: 768px) {
  div {
    flex-direction: column;
  }
}
</style>
