<template lang="">
  <div>
    <v-row>
      <v-cols col="3">
        <v-card
          class="card"
          @mouseover="hoverContent = true"
          @mouseleave="hoverContent = null"
        >
          <v-img
            src="https://media.discordapp.net/attachments/381402365871521803/1254686678900019211/322103076_477969017742993_3866926961682115854_n.png?ex=667a6587&is=66791407&hm=445e36fbe1f7db7589cba9dd370a95376bb23736a8f4d46ff35a193827f87fbd&=&format=webp&quality=lossless&width=936&height=936"
            max-height="130"
            max-width="300"
          ></v-img>
          <div class="text" v-if="!hoverContent">
            <p>Jiraphat wunpuan (Deaw)</p>
            <div class="school">
              <p><v-icon>mdi-school</v-icon>&ensp;IT KMITL</p>
            </div>
            <p>hobby</p>
            <div class="hobby">
              <v-chip class="ma-1">game</v-chip
              ><v-chip class="ma-1">series</v-chip>
              <v-chip class="ma-1">travel</v-chip>
            </div>
          </div>
          <div class="text" v-if="hoverContent">
            <p>like</p>
            <div class="hobby">
              <v-chip class="ma-1">sea</v-chip
              ><v-chip class="ma-1">buffet</v-chip>
              <v-chip class="ma-1">coffee</v-chip>
            </div>
            <p>dislike</p>
            <div class="dislike">
              <v-chip class="ma-1">🪳</v-chip><v-chip class="ma-1">🌧️</v-chip>
              <v-chip class="ma-1">🚬</v-chip>
            </div>
          </div>
          <v-divider class="mt-6 mx-4"></v-divider>
          <a href="https://www.facebook.com/jiraphat.wunpuan">
            <v-icon class="facebook ma-1">mdi-facebook</v-icon>
            <v-icon class="email ma-1">mdi-email</v-icon>
          </a>
        </v-card>
      </v-cols>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hoverContent: null,
    };
  },
  methods: {
    showHoverContent() {
      this.hoverContent = "some";
    },
    hideHoverContent() {
      this.hoverContent = null;
    },
  },
};
</script>
<style scoped>
.card {
  text-align: center;
}
.text {
  text-align: center;
  padding-top: 1vw;
  /* padding-bottom: 1vw; */
  text-transform: uppercase;
}
/* .seen {
  transition: all 0.7s ease;
  opacity: 1;
}
.unseen {
  display: none;
  transform: translateX(500%);
  transition: all 0.7s ease;
}
.move-in {
  transform: translateX(0%);
  display: block;
}
.move-out {
  display: none;
  transform: translateX(-500%);
  opacity: 0;
} */
.school {
  display: flex;
  justify-content: center;
  align-items: center;
}
.facebook,
email {
  color: gray;
  transition: all 2sec ease-in-out;
}
.facebook:hover {
  color: rgb(0, 115, 255);
  font-size: 2.5vw;
}
.email:hover {
  color: rgb(255, 30, 0);
  font-size: 2.5vw;
}
.hobby {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* .dislike {
  font-size: 3vw;
} */
</style>
