<template>
    <div>
        <div class="contained text-center">
            <div class="form-signin">
                <h1 class="h3 mb-3 font-weight-normal">Please Sign in</h1>
                <h4 style="color: red">{{ loginErrorMessage }}</h4>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" class="form-control" placeholder="Email address" v-model="loginEmail" required autofocus>

                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" class="form-control" placeholder="Password" v-model="loginPassword" required>

                <button @click="login" class="btn btn-lg btn-info btn-block">Sign In</button>

                <hr>
                
                <h1 class="h3 mb-3 font-weight-normal">New to first try?<br>Sign up here!</h1>
                <h4 style="color: red">{{ allErrorMessage }}</h4>
                <label for="inputUsername" class="sr-only">Username</label><h5 class="inputError">{{ usernameErrorMessage }}</h5>
                <input type="text" id="inputUsername" class="form-control" placeholder="Username" v-model="username" required autofocus>

                <label for="inputEmail" class="sr-only">Email address</label><h5 class="inputError">{{ emailErrorMessage }}</h5>
                <input type="email" ref="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="email" required autofocus/>

                <label for="inputPassword" class="sr-only">Password</label><h5 style="color: red">{{ passErrorMessage }}</h5>
                <input type="password" ref="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password" required />

                <button @click="emailSignUp" class="btn btn-lg btn-info btn-block">Sign Up</button>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import {db} from '../firebase';

export default {
    // TODO: SIGNIN and make sure it works!! done;
    data() {
        return {
            currentUser: null,
            userRole: null,

            loginEmail: "",
            loginPassword: "",
            loginErrorMessage: "",

            username: "",
            email: "",
            password: "",
            allErrorMessage: "",
            emailErrorMessage: "",
            usernameErrorMessage: "",
            passErrorMessage: "",
        };
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user);
                this.currentUser = user;
                // a user has just logged in, so we need to get his/her document
                // from our users collection
                this.$router.push("/").catch(() => {});
            } else {
                this.currentUser = null;
                this.userRole = null;
            }
        });
    },
    methods: {
    // sign up user with email and password ( i want to add username as well )
        emailSignUp() {
            console.log(this.email, this.password);
            if (this.email && this.password && this.username) {
                firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    // add modal that says account created
                    console.log("SUCCESS ", user);
                    const newUser = firebase.auth().currentUser;
                    if (newUser) {
                        // Note, you may want to store more info in the users collection
                        // (I am just adding email and role, but your app may call for more fields)
                        this.userRole = "skater"; // when a new user is created they default to the 'user' role
                        db.collection("users")
                        .doc(newUser.uid)
                        .set({ email: newUser.email, username: this.username, role: this.userRole }, {merge: true})
                        .then(() => console.log("USER DOCUMENT CREATED"))
                        .catch((e) => console.log(e));
                    } else {
                        console.log("cannot create user doc!");
                    }
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode + " " + errorMessage);
                    // The account could aleady exist,
                    // or the password may not be strong enough
                })
            } else {
                if(!this.email && !this.password && !this.username) {
                    this.allErrorMessage = "You must enter a Username, Email, and Password";
                } else if(!this.username) {
                    this.allErrorMessage = "";
                    this.usernameErrorMessage = "You must enter a Username!"
                } else if(!this.email) {
                    this.emailErrorMessage = "You must enter an Email!"
                } else if(!this.password) {
                    this.passErrorMessage = "You must enter an Password!"
                }
            }
        },
        login() {
            this.loginErrorMessage = "";
            if (this.loginEmail && this.loginPassword) {
                firebase
                .auth()
                .signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
                .then((userCredential) => {
                    console.log(
                    "SIGNED IN WITH EMAIL AND PASSWORD",
                    userCredential.user
                    );
                    // if you don't use a param then it won't compile!!!!
                })
                .catch((error) => {
                    this.loginErrorMessage = error.message;
                });
            } else {
                // CRUDE VALIDATION CODE!
                if (!this.loginEmail && !this.loginPassword) {
                    this.loginErrorMessage = "You must enter an email and password";
                } else if (!this.loginEmail) {
                    this.loginErrorMessage = "You must enter an email";
                } else if (!this.loginPassword) {
                    this.loginErrorMessage = "You must enter a password";
                }
            }
        },
    },
}
</script>

<style>
    .contained {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #343a40;
    background-image: linear-gradient(#17a2b8,white);
    height: 800px;
}

.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}
.form-signin .checkbox {
    font-weight: 400;
}
.form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}
.form-signin .form-control:focus {
    z-index: 2;
}
.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.inputError
{
    color: red;
}

</style>