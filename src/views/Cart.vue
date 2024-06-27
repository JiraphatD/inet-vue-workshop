<template>
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

      <v-toolbar-title>Cart</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div v-if="cartItems">
        <div v-for="product in cartItems" :key="product.product_id">
          <v-list-item>
            <v-row>
              <v-col cols="8"
                ><h4>{{ product.product_name }}</h4></v-col
              >
              <v-col cols="4"
                ><v-row
                  ><v-col cols="3" class="center"
                    ><v-btn
                      elevation="2"
                      fab
                      x-small
                      @click="decrement(product)"
                      ><v-icon>mdi-minus</v-icon></v-btn
                    ></v-col
                  >
                  <v-col cols="3" class="center">{{ product.quantity }}</v-col>
                  <v-col cols="3" class="center"
                    ><v-btn
                      elevation="2"
                      fab
                      x-small
                      @click="increment(product)"
                      ><v-icon>mdi-plus</v-icon></v-btn
                    ></v-col
                  >
                  <v-col cols="3" class="center"
                    ><v-btn elevation="2" fab x-small @click="del(product)"
                      ><v-icon>mdi-delete</v-icon></v-btn
                    ></v-col
                  >
                </v-row></v-col
              ></v-row
            >
          </v-list-item>
          <v-divider v-if="cartItems.length > 1"></v-divider>
        </div>
        <v-row>
          <v-col
            cols="6"
            style="
              position: fixed;
              bottom: 0;
              left: 0;
              padding: 2vw;
              width: 50%;
            "
            class="center"
            ><v-icon>mdi-currency-thb</v-icon>{{ sumPrice() }}</v-col
          >
          <v-col cols="6"
            ><v-btn
              style="
                position: fixed;
                bottom: 0;
                padding: 2vw;
                width: 50%;
                right: 0;
              "
              color="warning"
              @click="buy"
              :disabled="cartItems.length == 0"
              >buy</v-btn
            ></v-col
          >
        </v-row>
      </div>
      <div v-else>
        <p>Your cart is empty.</p>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Swal from "sweetalert2";

export default {
  created() {
    this.getData();
  },
  data() {
    return {
      selectedItem: 1,
      cartItems: [],
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
      product.quantity++;
    },
    decrement(product) {
      product.quantity--;
    },
    sumPrice() {
      let total = 0;
      for (const item of this.cartItems) {
        total += item.price * item.quantity;
      }
      // console.log("total", total);
      return total;
    },
    async del(product) {
      try {
        await this.axios.delete(
          `http://localhost:3000/cart/${product.product_id}`
        );
        console.log("delete item by ID");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },

    async getData() {
      try {
        let { data } = await this.axios.get("http://localhost:3000/cart");
        console.log("data: ", data);
        this.cartItems = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async buy() {
      console.log(this.cartItems);
      try {
        let hasError = false; // Flag to track if any item has an error
        this.cartItems.forEach((item) => {
          if (item.quantity > item.amount) {
            hasError = true;
            Swal.fire({
              icon: "error",
              title: "Not enough",
            });
          }
        });
        if (!hasError) {
          // Send the request only when no errors
          const orderPayload = {
            buyer: "John Doe", // Replace with the actual buyer name
            order_list: this.cartItems.map((item) => ({
              product_id: item.product_id,
              product_name: item.product_name,
              quantity: item.quantity,
              price: item.price,
            })),
            total_price: this.sumPrice(), // Calculate the total price based on cartItems (if needed)
          };
          await this.axios.post("http://localhost:3000/order", orderPayload);
          await this.axios.delete("http://localhost:3000/cart");
          Swal.fire({
            title: "Success",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            didClose: () => this.$router.push("/store"),
          });
        }
      } catch (error) {
        console.log(error);
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
