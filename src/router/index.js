import { createRouter, createWebHistory } from 'vue-router'
import { useFirebaseAuth } from "vuefire";
import { onAuthStateChanged } from "firebase/auth";
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/autos/:id',
      name: 'auto',
      component: () => import('../views/AutoView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import ('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import ('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true},
      children: [

        {
          path: '/admin/propiedades',
          name: 'admin-propiedades',
          component: () => import ('../views/admin/AdminView.vue')
        },
        {
          path: '/admin/editar/:id',
          name: 'editar-propiedad',
          component: () => import ('../views/admin/EditarView.vue')
        },
        {
          path: '/admin/nueva',
          name: 'nueva-propiedad',
          component: () => import ('../views/admin/NuevaView.vue')
        },

      ]
    },
  ]
})

//Guard de navegacion, beforeEach revisa las rutas antes de ir a ellas y comprueba si esta autentificado

router.beforeEach(async(to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(requiresAuth){
    try{
      await authenticateUser()
      next()
    }catch(error){
      console.log(error);
      next({name:'login'})
    }
  }else{
    next()
  }
})

function authenticateUser() {

  const auth= useFirebaseAuth()

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>{

      unsubscribe()
      if(user){
        resolve()
      }else{
        reject()
      }
    })

  })
}
export default router
