<template>
    <div>
        <header><img class="headerImg" src="../img/header.png"></header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-info">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/shop">Shop</router-link>
                </li>
                <li v-if="currentUser" class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'account', params: { id: currentUser.uid } }">Account</router-link>
                </li>
                <li v-else class="nav-item">
                    <router-link class="nav-link" to="/login">Account</router-link>
                </li>
            </ul>
            <ul v-if="currentUser" class="navbar-nav navbar-right">
                <li>
                    <router-link class="nav-link" :to="{ name: 'account', params: { id: currentUser.uid } }">Signed in as <b>{{username}}</b></router-link>
                </li>
            </ul>
            <ul class="navbar-nav navbar-right">
                <li v-if="currentUser" class="nav-item">
                    <!-- add click function to log them out and redirect to home probably or something -->
                    <a @click="logout" class="nav-link">Logout</a>
                </li>
                <li v-else class="nav-item">
                    <router-link class="nav-link" to="/login">Sign up/Login</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    data() {
        return {
            currentUser: null,
            userRole: null,
            username: null
        }
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user);
                this.currentUser = user;
                // a user has just logged in, so we need to get his/her document
                // from our users collection
                this.getUserDocument(user.uid);
            } else {
                this.currentUser = null;
                this.userRole = null;
                this.username = null;
            }
        });
    },
    methods: {
        getUserDocument(userId) {
            console.log("GETTING USER DOCUMENT...", userId);
            const db = firebase.app().firestore();
            db.collection("users")
            .doc(userId)
            .get()
            .then((doc) => {
                if (doc.exists == false) {
                    console.log("THE USER DOCUMENT DOES NOT EXIST...");
                } else {
                    console.log("User document:", doc.data());
                    this.userRole = doc.data().role;
                    this.username = doc.data().username;
                }
            })
            .catch((error) => console.log(error));
        },
        logout() {
            console.log("yellow")
            firebase
            .auth()
            .signOut()
            .then(
                () => {
                    this.$router.push("/Login").catch(() => {});
                    // when a user logs out, redirect to the login view
                    // note that if you don't put the catch(), then
                    // you may get a warning saying you should avoid redundant navigation
                    console.log("Logged Out");
                },
                (error) => {
                    console.log("error logging out", error);
                }
            );
        },
    }
}
</script>

<style>
    .headerImg
    {
        width: 100%;
    }

</style>