<template>
  <div>
    <br>
    <hr>
    <h1 class="text-center">Get to SHopping!</h1>
    <hr>
    <ProductList/>
  </div>
  
</template>

<script>
import ProductList from '../components/ProductList.vue'
export default {
  components:
  {
    ProductList,
  }

}
</script>

<style>
  hr
  {
    width: 75%;
  }

</style>