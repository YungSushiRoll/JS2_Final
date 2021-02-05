import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home.vue";
import Shop from "./views/Shop.vue";
import Account from "./views/Account.vue";
import Login from "./views/Login.vue";
import NewProduct from "./components/NewProduct.vue";

Vue.use(VueRouter);

const routes = [
    { 
        path: "/", 
        component: Home, 
        name: "home",
        meta: { 
            title: 'First Try :: Home'
        }
    },
    { 
        path: "/shop",
        component: Shop,
        name: "shop",
        meta: { 
            title: 'First Try :: Shop'
        }
    },
    { 
        path: "/account/:id", 
        component: Account, 
        name: "account",
        meta: { 
            title: 'First Try :: Account'
        }
    },
    { 
        path: "/login", 
        component: Login, 
        name: "login",
        meta: { 
            title: 'First Try :: Login'
        }
    },
    { 
        path: "/new-product", 
        component: NewProduct, 
        name: "new-product",
        meta: { 
            title: 'First Try :: New Product'
        }
    }
];

const router = new VueRouter({
    // mode: 'history',
    routes,
});
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'First Try Skateboards';
    next();
});
export default router;