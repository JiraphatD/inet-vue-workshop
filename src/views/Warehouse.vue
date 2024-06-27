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

      <v-toolbar-title>Warehouse</v-toolbar-title>
    </v-app-bar>

    <div class="ma-5">
      <v-row>
        <v-col cols="3" v-for="product in products" :key="product.product_id"
          ><v-card
            ><v-card-title primary-title>{{
              product.product_name
            }}</v-card-title>
            <p class="detail mx-5">{{ product.detail }}</p>
            <v-divider class="mx-2"></v-divider>
            <div style="display: flex" class="mx-3 mt-2">
              <p class="mx-3">
                <v-icon>mdi-currency-thb</v-icon>{{ product.price }}
              </p>
              <v-spacer></v-spacer>
              <p class="mx-3">
                <v-icon>mdi-warehouse</v-icon>{{ product.amount }}
              </p>
            </div>
            <v-row>
              <v-col cols="6" class="center"
                ><v-btn color="warning" outlined @click="openDialog(product)"
                  >edit</v-btn
                ></v-col
              >
              <v-col cols="6" class="center"
                ><v-btn color="error" @click="removeProduct(product)"
                  >delete</v-btn
                ></v-col
              >
            </v-row>
          </v-card></v-col
        >
      </v-row>
    </div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>{{ dialogTitle }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editedProduct.product_name"
            label="Product Name"
          ></v-text-field>
          <v-textarea
            v-model="editedProduct.detail"
            label="Detail"
          ></v-textarea>
          <v-text-field
            v-model="editedProduct.price"
            label="Price"
          ></v-text-field>
          <v-text-field
            v-model="editedProduct.amount"
            label="Amount"
          ></v-text-field>
          <!-- ... other fields ... -->
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveEditedProduct">Save</v-btn>
          <v-btn color="error" @click="closeEditDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn
      elevation="2"
      fab
      right
      fixed
      top
      large
      style="z-index: 5"
      @click="openDialog()"
      ><v-icon>mdi-plus</v-icon></v-btn
    >
  </v-app>
</template>
<script>
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      dialogTitle: "",
      products: [],
      dialog: false,
      edit: false,
      editedProduct: {},
      drawer: null,
      selectedItem: 2,
      items: [
        { text: "Store", icon: "mdi-store" },
        { text: "Cart", icon: "mdi-cart" },
        { text: "Warehouse", icon: "mdi-warehouse" },
      ],
      noneProduct: {
        product_name: "",
        detail: "",
        price: null,
        amount: null,
      },
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
    async getData() {
      try {
        const { data } = await this.axios.get("http://localhost:3000/product");
        // console.log(data.data);
        this.products = data.data.map((product) => ({ ...product, count: 1 }));
        console.log(this.products);
      } catch (error) {
        console.log(error.message);
      }
    },
    openDialog(product) {
      if (product) {
        this.editedProduct = { ...product }; // Clone the product details
        this.dialogTitle = "Edit Product";
        this.edit = true;
      } else {
        this.editedProduct = { ...this.noneProduct };
        this.dialogTitle = "Create Product";
        this.edit = false;
      }
      this.dialog = true;
    },

    // Save the edited product details
    async saveEditedProduct() {
      // console.log(1);
      console.log(this.editedProduct);
      if (this.edit == true) {
        await this.axios.put(
          `http://localhost:3000/product/${this.editedProduct.product_id}`,
          {
            product_name: this.editedProduct.product_name,
            detail: this.editedProduct.detail,
            price: this.editedProduct.price,
            amount: this.editedProduct.amount,
          }
        );
      } else {
        await this.axios.post("http://localhost:3000/product", {
          product_name: this.editedProduct.product_name,
          detail: this.editedProduct.detail,
          price: this.editedProduct.price,
          amount: this.editedProduct.amount,
        });
      }
      this.dialog = false; // Close the dialog
      window.location.reload();
    },
    async removeProduct(product) {
      await this.axios.delete(
        `http://localhost:3000/product/${product.product_id}`
      );
      window.location.reload();
    },
    closeEditDialog() {
      this.dialog = false;
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
.full {
  width: 100%;
  height: 100%;
}
</style>
