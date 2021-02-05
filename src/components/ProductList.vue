<template>
  <div class="container">
      <div class="product" v-for="item in products" :key="item.id">
        <img class="items" :src="item.img"><br><br>
        {{ item.productName }}<br>
        ${{ item.cost }}<br>
        <label for="size">Size: 
          <select id="size">
            <option v-for="(size, index) in item.models" :key="index">
              {{size}}
            </option>
          </select>
        </label><br>
        <div v-if="item.quantity == 0">
          <button :id="item.id" disabled class="btn btn-info">Add to Cart</button><br><br>
        </div>
        <div v-else>
          <button @click="addToCart(item)" :id="item.id" class="btn btn-info">Add to Cart</button><br><br>
        </div>
        Available {{item.quantity}}
      </div>
      <div id="file-list"></div>
  </div>
</template>

<script>
import { db } from "../firebase";
// import { imageRef } from "../firebase";

// console.log(imageRef.bucket);
// imageRef.listAll()
//     .then(result => {
//         result.items.forEach(fileRef => {
//             var fileList = document.getElementById("file-list");
//             fileRef.getDownloadURL().then(url => {
//               var li = document.createElement("li");
//               var a = document.createElement("a");
//               a.setAttribute("href", url);
//               a.innerHTML = "<img src='" + url + "'>";
//               console.log(url);
//               li.appendChild(a);
//               fileList.appendChild(li);
//             })
//         });
//     })
//     .catch(error => {
//         console.log(error);
//     })
export default {
  data() {
    return {
      products: [],
    };
  },
  created() {
    db.collection("Products").onSnapshot((snapshotChange) => {
      this.products = [];
      // this.models = [];
      snapshotChange.forEach((doc) => {
        this.products.push({
            id: doc.id,
            productName: doc.data().ProductName,
            cost: doc.data().Cost,
            img: doc.data().ProductImg,
            quantity: doc.data().Quantity,
            models: doc.data().Model,
        });
        // this.models.push({
        //     model: doc.data().Model
        // });
      });
    });
  },
  methods: {
    addToCart(item) {
      var newQuant = item.quantity;
      newQuant--;

      db.collection("Products")
        .doc(item.id)
        .update({ Quantity: newQuant })
        .then()
        .catch((error => {
          console.log(error.message);
        }))
    }
  }
};
</script>

<style>
  .items
  {
    width: auto;
    height: 300px;
  }
  .product
  {
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    width: 350px;
  }
</style>