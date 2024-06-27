<template>
  <div>
    <h1>api connect</h1>
    <!-- <h1>{{ apidata }}</h1> -->
    <v-row no-gutters>
      <v-col cols="3" v-for="(item, index) in apidata" :key="index">
        <v-card width="300">
          <v-img
            width="300"
            src="https://stu40623block.wordpress.com/wp-content/uploads/2016/12/cropped-cropped-2.jpg"
          ></v-img>
          <v-card-title primary-title>
            {{ item.name }} {{ item.address }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-btn color="success" @click="getData()">apicall</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apidata: [],
      id: "",
    };
  },
  methods: {
    getData() {
      // this.axios.get('http://localhost:3000/users').then((response)=>{
      //     console.log(response.data)
      //     this.apidata = response.data
      // })
    },
  },
};
</script>

<style></style>
