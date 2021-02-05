<template>
    <div class="container">
        <!-- What shows up if they are a normal user -->
        <div v-if="skater.role == 'skater'">
            <h3 class="text-center">{{skater.username}} - {{skater.role}}</h3>
            <b-modal id="modal-sm" size="sm" ok-only ok-title="Okay!" title="Update Success">Account has been updated!</b-modal>
            <form class="info-container">
                <label for="userame">Username: </label>
                <b-form-input id="username" v-model="skater.username" :placeholder="skater.username"></b-form-input>

                <label for="email">Email: </label>
                <b-form-input id="email" v-model="skater.email" :placeholder="skater.email"></b-form-input>

                <label for="fName">First Name: </label>
                <b-form-input id="fName" v-model="skater.firstName" :placeholder="skater.firstName"></b-form-input>

                <label for="lName">Last Name: </label>
                <b-form-input id="lName" v-model="skater.lastName" :placeholder="skater.lastName"></b-form-input>

                <label for="address">Address: </label>
                <b-form-input id="address" v-model="skater.address" :placeholder="skater.address"></b-form-input>

                <label for="city">City: </label>
                <b-form-input id="city" v-model="skater.city" :placeholder="skater.city"></b-form-input>

                <label for="state">State: </label>
                <b-form-input id="state" v-model="skater.state" :placeholder="skater.state"></b-form-input>

                <label for="zip">Zipcode: </label>
                <b-form-input id="zip" v-model="skater.zipcode" :placeholder="skater.zipcode"></b-form-input>
                <br>
                <b-button v-b-modal.modal-sm @click="updateAccount" variant="success">Update Account</b-button>
                <br><br>
            </form>
        </div>
        <!-- What shows up if they are an admin -->
        <div v-else>
            <h3 class="text-center">{{skater.username}} - {{skater.role}}</h3>
            <div>
                <b-tabs content-class="mt-3">
                    <!-- First tab is personal account info -->
                    <b-tab title="My Info" class="info" active>
                        <b-modal id="modal-sm" size="sm" ok-only ok-title="Okay!" title="Update Success">Account has been updated!</b-modal>
                        <form class="info-container">
                            <label for="userame">Username: </label>
                            <b-form-input id="username" v-model="skater.username" :placeholder="skater.username"></b-form-input>

                            <label for="email">Email: </label>
                            <b-form-input id="email" v-model="skater.email" :placeholder="skater.email"></b-form-input>

                            <label for="fName">First Name: </label>
                            <b-form-input id="fName" v-model="skater.firstName" :placeholder="skater.firstName"></b-form-input>

                            <label for="lName">Last Name: </label>
                            <b-form-input id="lName" v-model="skater.lastName" :placeholder="skater.lastName"></b-form-input>

                            <label for="address">Address: </label>
                            <b-form-input id="address" v-model="skater.address" :placeholder="skater.address"></b-form-input>

                            <label for="city">City: </label>
                            <b-form-input id="city" v-model="skater.city" :placeholder="skater.city"></b-form-input>

                            <label for="state">State: </label>
                            <b-form-input id="state" v-model="skater.state" :placeholder="skater.state"></b-form-input>

                            <label for="zip">Zipcode: </label>
                            <b-form-input id="zip" v-model="skater.zipcode" :placeholder="skater.zipcode"></b-form-input>
                            <br>
                            <b-button v-b-modal.modal-sm @click="updateAccount" variant="success">Update Account</b-button>
                            <br><br>
                        </form>
                    </b-tab>
                    <!-- Tab for adding products to collection -->
                    <b-tab title="Products">
                        <table class="table-light table" border="1">
                            <tr>
                                <th>Product Name</th>
                                <th>Cost</th>
                                <th>Quantity</th>
                                <th>In Stock</th>
                            </tr>
                            <tr v-for="p in products" :key="p.uid">
                                <td><input @change="productNameChanged($event, p)" type="text" :placeholder="p.productName"></td>
                                <td><input @change="costChanged($event, p)" type="number" min="1" :placeholder="p.cost"></td>
                                <td><input @change="quantityChanged($event, p)" type="number" min="0" :placeholder="p.quantity"></td>
                                <td>
                                    <select @change="inStockChanged($event, p)">
                                        <option v-for="p in stocks" :key="p" :selected="p == p.inStock">
                                        {{ p }}
                                        </option>
                                    </select>
                                </td>
                                <td>
                                    <b-button v-b-modal.modal @click="deleteProduct(p.productName, p.id)" variant="danger">Delete Product</b-button>
                                </td>
                            </tr>
                        </table>
                        <router-link class="btn btn-info mb-3" to="/new-product">Add Product</router-link>
                    </b-tab>
                    <!-- Tab for editing user roles -->
                    <b-tab title="Users">
                        <table class="table-dark table-striped b-table table" border="1">
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                            <tr v-for="u in users" :key="u.uid">
                                <td>{{ u.username }}</td>
                                <td>{{ u.email }}</td>
                                <td>
                                    <select @change="roleChanged($event, u)">
                                        <option v-for="r in roles" :key="r" :selected="r == u.role">
                                        {{ r }}
                                        </option>
                                    </select>
                                </td>
                                <td>
                                    <b-button v-b-modal.modal @click="deleteUser(u.username, u.uid)" variant="danger">Delete User</b-button>
                                </td>
                            </tr>
                        </table>
                    </b-tab>
                </b-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import {db} from '../firebase'
import firebase from 'firebase'

export default {
    data() {
        return {
            fields: ['username', 'email', 'role'],
            skater: { 
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                role: "",
                address: "", 
                city: "", 
                state: "", 
                zipcode: "",
            },
            products: [],
            users: [],
            roles: ["admin", "skater"],
            stocks: ["true", "false"],
        };
    },
    mounted() {
        //console.log("ROUTE PARAMS: ", this.$route.params);
        if (this.skater) {
            // if the user trying to access this page is not an admin,
            //then redirect them to the home page
            this.getAllUsers();
            this.getAllProducts();
        }
    },
    created() {
        let dbRef = db.collection("users").doc(this.$route.params.id);
        dbRef
        .get()
        .then((doc) => {
            this.skater.username = doc.data().username;
            this.skater.email = doc.data().email;
            this.skater.role = doc.data().role;
            this.skater.firstName = doc.data().firstName;
            this.skater.lastName = doc.data().lastName;
            this.skater.address = doc.data().address;
            this.skater.city = doc.data().city;
            this.skater.state = doc.data().state;
            this.skater.zipcode = doc.data().zipcode;
        })
        .catch((error) => {
            console.log(error);
        });
    },
    methods: {
        deleteUser(username, id) {
            var isTrue;
            this.$bvModal.msgBoxConfirm(('Please confirm that you want to delete the user ' + username + '?'), {
                title: 'Please Confirm',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'DELETE',
                cancelTitle: 'CANCEL',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            })
            .then(value => {
                isTrue = value
                if(isTrue) {
                    db.collection("users")
                    .doc(id)
                    .delete()
                    .then(() => {
                        this.getAllUsers();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                }
            })
            .catch(err => {
                console.log(err.message)
            })
        },
        getAllUsers() {
            const db = firebase.app().firestore();
            db.collection("users")
            .get()
            .then((querySnapshot) => {
                this.users = [];
                querySnapshot.forEach((doc) => {
                    const user = {};
                    user.uid = doc.id;
                    user.email = doc.data().email;
                    user.username = doc.data().username;
                    user.role = doc.data().role;
                    this.users.push(user);
                });
            })
            .catch((error) =>
            console.log("ERROR GETTING ALL USERS", error.message)
            );
        },
        getAllProducts() {
            db.collection("Products")
            .get()
            .then((querySnapshot) => {
                this.products = [];
                querySnapshot.forEach((doc) => {
                    this.products.push({
                        id: doc.id,
                        productName: doc.data().ProductName,
                        cost: doc.data().Cost,
                        img: doc.data().ProductImg,
                        quantity: doc.data().Quantity,
                        models: doc.data().Model,
                        inStock: doc.data().InStock
                    });
                })
            })
        },
        deleteProduct(productName, id) {
            var isTrue;
            this.$bvModal.msgBoxConfirm(('Please confirm that you want to delete the product ' + productName + '?'), {
                title: 'Please Confirm',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'DELETE',
                cancelTitle: 'CANCEL',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            })
            .then(value => {
                isTrue = value
                if(isTrue) {
                    db.collection("Products")
                    .doc(id)
                    .delete()
                    .then(() => {
                        this.getAllProducts();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                }
            })
            .catch(err => {
                console.log(err.message)
            })
        },
        updateAccount(event) {
            event.preventDefault();
            let updatedSkater = {
                username: this.skater.username,
                email: this.skater.email,
                firstName: this.skater.firstName,
                lastName: this.skater.lastName,
                address: this.skater.address,
                city: this.skater.city,
                state: this.skater.state,
                zipcode: this.skater.zipcode,
            };

            db.collection("users")
                .doc(this.$route.params.id)
                .update(updatedSkater)
                .then(() => {
                    this.$router.go();
                })
                .catch((error) => {
                console.log(error);
                });
        },
        roleChanged(evt, user) {
            const newRole = evt.target.value;
            //console.log(newRole, user.uid);
            const db = firebase.app().firestore();
            db.collection("users")
                .doc(user.uid)
                .update({ role: newRole })
                .then()
                .catch((error) => console.log(error));
        },
        inStockChanged(evt, product) {
            const newStock = evt.target.value;
            //console.log(newRole, user.uid);
            const db = firebase.app().firestore();
            db.collection("Products")
                .doc(product.id)
                .update({ InStock: newStock })
                .then(
                    console.log(newStock + "" + product.id)
                )
                .catch((error) => console.log(error));
        },
        productNameChanged(evt, product) {
            const newName = evt.target.value;
            //console.log(newRole, user.uid);
            const db = firebase.app().firestore();
            db.collection("Products")
                .doc(product.id)
                .update({ ProductName: newName })
                .then()
                .catch((error) => console.log(error));
        },
        costChanged(evt, product) {
            const newCost = evt.target.value;
            //console.log(newRole, user.uid);
            const db = firebase.app().firestore();
            db.collection("Products")
                .doc(product.id)
                .update({ Cost: newCost })
                .then()
                .catch((error) => console.log(error));
        },
        quantityChanged(evt, product) {
            const newQuant = evt.target.value;
            //console.log(newRole, user.uid);
            const db = firebase.app().firestore();
            db.collection("Products")
                .doc(product.id)
                .update({ Quantity: newQuant })
                .then()
                .catch((error) => console.log(error));
        },
    }
}
</script>

<style>
    .info-container
    {
        width: 75%;
        margin: auto;
    }

</style>