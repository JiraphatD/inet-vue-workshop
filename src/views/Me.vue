<template lang="">
  <div class="banner">
    <ImageCard />
  </div>
</template>
<script>
import ImageCard from "@/components/ImageCard.vue";
export default {
  components: { ImageCard },
};
</script>
<style scoped>
.banner {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
