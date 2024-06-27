<template lang="">
  <div>
    <h3 class="center mt-10">GRADE CALCULATOR</h3>
    <div class="center mt-5">
      <v-card class="" width="350" height="300">
        <div class="center mt-12">
          <v-flex xs10>
            <v-text-field
              v-model="score"
              label="Input score"
              id="score"
            ></v-text-field>
          </v-flex>
        </div>
        <div class="center mt-5">
          <v-btn color="error" @click="calculateGrade">Calculate</v-btn>
        </div>
        <div class="center mt-10">
          <h3 v-if="grade">{{ grade }}</h3>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      score: null,
      grade: null,
    };
  },
  methods: {
    calculateGrade() {
      if (
        this.score === null ||
        isNaN(this.score) ||
        this.score > 100 ||
        this.score < 0
      ) {
        this.grade = "please input only number (1-100)";
        return;
      }
      const numericScore = parseFloat(this.score);
      if (numericScore >= 80) {
        this.grade = "A";
      } else if (numericScore >= 70) {
        this.grade = "B";
      } else if (numericScore >= 60) {
        this.grade = "C";
      } else if (numericScore >= 50) {
        this.grade = "D";
      } else {
        this.grade = "F";
      }
    },
  },
};
</script>
<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
