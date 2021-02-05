<template>
  <div>
    <Video/>
    <h1 class="text-center bg-info mb-0 pt-3 pb-3 text-light">Welcome to First Try Skateboards Online SkateShop!</h1>
      <p class="text-center mt-3 homepage-text">
        First try is all about making shopping for skate equipment easier for you!
        We sell decks, wheels, and trucks. The benefit of shopping with us is that each deck, when purchased
        comes with a free roll of basic black Jessup Griptape, all of our wheels come shipped with a set of
        Bones Reds bearings, and any of our trucks include a set of skateboard hardware (Phillips or Allen head)!<br>
      </p>
    <hr>
    <h1 class="text-center">check out our shop for<br>Holiday Deals!</h1>
    <hr>
    <div class="deals-container">
      <div class="deals">
        Buy a deck, give a deck!<br>
        <img class="pt-4 items" src="../img/gift.jpg">
      </div>
      <div class="deals">
        <p class="mb-0">Black Friday Sales!!</p><br>
        <img class="items" src="https://cdn11.bigcommerce.com/s-xtqeoh1i/images/stencil/original/carousel/627/black_friday_deals.jpg?c=2">
      </div>
    </div>
</div>
</template>

<script>
import Video from '../components/Video.vue'
export default {
  components:
  {
    Video,
  }
}
</script>

<style>
.items
  {
    width: auto;
    height: 300px;
  }
  hr
  {
    width: 75%;
  }
  .homepage-text
  {
    width: 60%;
    display: block;
    margin: auto;
    font-size: 1.75em;
  }
  .deals-container
  {
    width: 75%;
    text-align: center;
    margin: auto;
    margin-bottom: 15px;
  }
  .deals
  {
    display: inline-block;
    margin: 25px 100px 25px;
    font-size: 25px;
  }
</style>