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

      <v-toolbar-title>Store</v-toolbar-title>
    </v-app-bar>

    <div class="ma-5">
      <v-row>
        <v-col cols="3" v-for="product in products" :key="product.product_id"
          ><v-card @click="showDetail(product)"
            ><v-card-title primary-title>{{
              product.product_name
            }}</v-card-title>
            <p class="detail mx-5">{{ product.detail }}</p>
            <v-divider class="mx-2"></v-divider>
            <p class="mx-3">
              <v-icon>mdi-currency-thb</v-icon>{{ product.price }}
            </p>
            <v-row>
              <v-col cols="5" class="center"
                ><v-btn
                  elevation="2"
                  fab
                  x-small
                  @click.stop="decrement(product)"
                  ><v-icon>mdi-minus</v-icon></v-btn
                ></v-col
              >
              <v-col cols="2" class="center">{{ product.count }}</v-col>
              <v-col cols="5" class="center"
                ><v-btn
                  elevation="2"
                  fab
                  x-small
                  @click.stop="increment(product)"
                  ><v-icon>mdi-plus</v-icon></v-btn
                ></v-col
              >
            </v-row>
            <v-btn
              outlined
              color="primary"
              dark
              style="width: 100%"
              @click.stop="addCart(product)"
              class="mt-3"
              >ADD CART</v-btn
            >
          </v-card></v-col
        >
      </v-row>
    </div>
    <v-btn
      style="position: fixed; bottom: 0; width: 100%; padding: 2vw"
      color="warning"
      @click="checkOut"
      v-if="cart.length > 0"
      >check out</v-btn
    >
    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="pa-3">
        <v-card-title class="center">{{
          productDetail.product_name
        }}</v-card-title>
        <p>{{ productDetail.detail }}</p>
        <p><b>Price</b>:&ensp;{{ productDetail.price }}</p>
        <p><b>Amount</b>:&ensp;{{ productDetail.amount }}</p>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      products: [],
      cart: [],
      productDetail: {},
      dialog: false,
      selectedItem: 0,
      drawer: null,
      items: [
        { text: "Store", icon: "mdi-store" },
        { text: "Cart", icon: "mdi-cart" },
        { text: "Warehouse", icon: "mdi-warehouse" },
      ],
    };
  },
  methods: {
    navigateToPage(text) {
      console.log(text);
      switch (text) {
        case "Store":
          this.$router.push("/store");
          break;
        case "Warehouse":
          this.$router.push("/warehouse");
          break;
        case "Cart":
          this.$router.push("/cart");
          break;
        default:
          // Handle other cases or show an error message
          console.error("Unknown item.text:", text);
      }
    },
    increment(product) {
      // Update the count for the specific product
      product.count++;
    },
    decrement(product) {
      // Ensure count doesn't go below zero
      if (product.count > 1) {
        product.count--;
      }
    },
    async getData() {
      try {
        const { data } = await this.axios.get("http://localhost:3000/product");
        const cartData = await this.axios.get("http://localhost:3000/cart");
        this.products = data.data.map((product) => ({ ...product, count: 1 }));
        this.cart = cartData.data.data;
        // console.log(this.products);
        // console.log(this.cart);
      } catch (error) {
        console.log(error.message);
      }
    },
    async addCart(product) {
      console.log(product.product_id);
      try {
        const existingCartItem = await this.axios.get(
          `http://localhost:3000/cart/${product.product_id}`
        );
        if (existingCartItem.data.data) {
          // Product already exists in the cart, update the quantity
          const updatedQuantity =
            existingCartItem.data.data.quantity + product.count;
          await this.axios.put(
            `http://localhost:3000/cart/${product.product_id}`,
            {
              quantity: updatedQuantity,
            }
          );
          console.log("plus");
        } else {
          // Product doesn't exist in the cart, create a new cart item
          await this.axios.post("http://localhost:3000/cart", {
            product_id: product.product_id,
            product_name: product.product_name,
            price: product.price,
            amount: product.amount,
            quantity: product.count,
          });
          console.log("add new");
        }
        window.location.reload();
      } catch (error) {
        console.log("Error adding product to cart:", error.message);
      }
    },
    async checkOut() {
      // const cartData = this.cart; // Get the cart data
      // console.log(cartData);
      // await this.$store.dispatch("checkout", cartData); // Dispatch the action
      this.$router.push({ name: "cart" });
    },
    showDetail(product) {
      this.productDetail = { ...product };
      this.dialog = true;
    },
  },
};
</script>
<style scoped>
.detail {
  /* height: 20px; */
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
