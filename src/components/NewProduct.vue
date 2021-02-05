<template>
    <div>
        <h1 class="text-center mt-3">New Product</h1>
        <hr>
        <h4 class="text-center" style="color: red">{{ allErrorMessage }}</h4>
        <form class="info-container">
                <h4 style="color: red">{{ nameErrorMessage }}</h4>
                <label for="productName">Product Name: </label>
                <b-form-input v-model="product.productName" id="productName" placeholder="Product Name"></b-form-input>

                <h4 style="color: red">{{ costErrorMessage }}</h4>
                <label for="cost">Cost: </label>
                <b-form-input v-model="product.cost" id="cost" placeholder="Cost"></b-form-input>

                <h4 style="color: red">{{ modelsErrorMessage }}</h4>
                <label for="model1">Model 1: </label>
                <b-form-input v-model="product.models[0]" id="model1" placeholder="Model 1"></b-form-input>
                <label for="model2">Model 2: </label>
                <b-form-input v-model="product.models[1]" id="model2" placeholder="Model 2"></b-form-input>
                <label for="model3">Model 3: </label>
                <b-form-input v-model="product.models[2]" id="model3" placeholder="Model 3"></b-form-input>

                <h4 style="color: red">{{ quantityErrorMessage }}</h4>
                <label for="quantity">Quantity: </label>
                <b-form-input v-model="product.quantity" id="quantity" placeholder="Quantity"></b-form-input>

                <h4 style="color: red">{{ imgErrorMessage }}</h4>
                Choose an image to upload:
                <input @change="uploadImg" class="mt-3 mb-3" type="file" id="file-upload">
                <br>
                <img class="mb-3" src="" alt="" id="img-upload">
                <br>
                <b-button @click="addProduct" variant="success">Create Product</b-button>
                <br><br>
            </form>
    </div>
</template>

<script>
import {db} from '../firebase';
import {imageRef} from '../firebase';

export default {
    data() {
        return {
            product: {
                productName: "",
                cost: "",
                quantity: "",
                inStock: "true",
                models: [],
                productImg: "",
            },
            allErrorMessage: "",
            nameErrorMessage: "",
            costErrorMessage: "",
            modelsErrorMessage: "",
            quantityErrorMessage: "",
            imgErrorMessage: "",
        }
    },
    methods: {
        uploadImg(evt) {
            const file = evt.target.files[0];
            var image = imageRef.child(file.name);
            const task = image.put(file);

            task.then(snapshot => {
                image.getDownloadURL().then(url => {
                    // logging because vue hates when things aren't used for some reason
                    console.log(snapshot);
                    this.product.productImg = url;
                    document.getElementById("img-upload").setAttribute("src", url);
                })
            });
        },
        addProduct() {
            console.log(this.product.productName, this.product.cost, this.product.quantity, this.product.models, this.product.productImg)
            if (this.product.productName && this.product.cost && this.product.quantity && this.product.inStock && this.product.models && this.product.productImg) {
                let newProduct = {
                    ProductName: this.product.productName,
                    Cost: this.product.cost,
                    Quantity: this.product.quantity,
                    Model: this.product.models,
                    InStock: this.product.inStock,
                    ProductImg: this.product.productImg
                };

                db.collection("Products")
                    .add(newProduct)
                    .then(() => {
                        this.$router.go();
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            } else {
                if(!this.product.productName 
                && !this.product.cost 
                && !this.product.quantity 
                && this.product.models.length == 0 
                && this.product.productImg == "") 
                {
                    this.allErrorMessage = "You must complete all of these fields";
                }
            }
        }
    }
}
</script>

<style>

</style>