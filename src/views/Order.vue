<template lang="">
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense>
        <v-list-item-group color="primary" v-model="selectedItem">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click="navigateToPage(item.text)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Order</v-toolbar-title>
    </v-app-bar>

    <v-main style="padding-top: 2vh">
      <div v-if="orders">
        <div v-for="order in orders" :key="order.order_id">
          <v-list-item>
            <v-row>
              <v-col cols="9"
                ><h4>{{ order.buyer }}</h4></v-col
              >
              <v-col cols="3">
                <v-btn color="success" class="mx-1" @click="approve()"
                  >approve</v-btn
                >
                <v-btn color="error" class="mx-1" @click="decline()"
                  >decline</v-btn
                ></v-col
              ></v-row
            >
          </v-list-item>
          <v-divider v-if="orders.length > 1"></v-divider>
        </div>
      </div>
      <div v-else>
        <p>Your cart is empty.</p>
      </div>
    </v-main>
  </v-app>
</template>
<script>
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      selectedItem: 1,
      orders: [],
      drawer: null,
      items: [
        { text: "Store", icon: "mdi-store" },
        { text: "Cart", icon: "mdi-cart" },
        { text: "Warehouse", icon: "mdi-warehouse" },
        { text: "Order", icon: "mdi-order-bool-ascending" },
      ],
    };
  },
  methods: {
    async getData() {
      const { data } = await this.axios.get("http://localhost:3000/order");
      this.orders = data.data;
      console.log(this.orders);
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
