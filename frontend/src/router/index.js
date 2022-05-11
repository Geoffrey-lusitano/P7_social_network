import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import axios from "axios"

// const token ="";
// function loadUserCredentials() {
//   token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
//   if (token) {
//      useCredentials(token);
//    }
// }

// const ifAuthenticated = (to, from, next) => {
//   if (localStorage.getItem(token)) {
    
//     next();
//     return;
//   }
//   router.push({ 
//     name: 'home',
//     params: {
//       returnTo: to.path,
//       query: to.query,
//     },
//   });
//  };



const routes = [
  // ROUTES USERS
  {
    path: "/login",
    name: "home",
    component: HomeView,
    meta: { public: true }
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
    import(/* webpackChunkName: "about" */ "../views/CreateAccountView.vue"),
    meta: { public: true }
  },
  // ROUTE PAGE PRINCIPALE
  {
    path: "/actu",
    name: "actu",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ActuView.vue"),
  },
  // ROUTES GESTION DES POST USERS

  // ROUTES GESTION DES COMMENTAIRES USERS
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

// // Sécurite d'acces au pages
// router.beforeEach((to, from, next) =>
// {
//   const  token  = localStorage.getItem('token');
//   if (!to.meta.public)
//   {
//     // page demande une authentication - if il n'y en as pas , renvoie a /login
//     if (token) next();
//     else next('/login');
//   }
//   else 
//   {
//     // Login is supposedly public - ne va pas sur login et signup si on a un token
//     if (token ? to.path !== '/login' || '/signup' : true) next();
//     //if (token ? to.path !== '/signup' : true) next();
//   }
// });

export default router;
