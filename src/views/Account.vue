<template>
    <div>
      <h1 class="text-center pt-3">Account Info</h1>
      <hr>
      <EditAccount/>
    </div>
</template>

<script>
import EditAccount from '../components/EditAcount.vue'
export default {
  data() {
    return {
      // username: "",
    }
  },
  components: {
    EditAccount,
  },
  methods: {
    // updateName(username)
    // {
    //   this.$emit(username);
    //   alert(username);
    // }
  }
}
</script>

<style>

</style>