import { defineStore } from "pinia";
import { useFirebaseAuth } from "vuefire";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', () => {

  const auth = useFirebaseAuth()
  const authUser = ref(null)

  const router = useRouter()

  const errMsg = ref('')
  const errorCodes = {
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/invalid-credential': 'Credenciales inválidas',
    'auth/wrong-password': 'Password incorrecto',
  };

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if(user)  {
        authUser.value = user
      }
    })
  })

  /* Le enviamos los datos de inicio para que los valide */
  const login = ({email, password}) => {
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      authUser.value = user      
      router.push({name:'admin-propiedades'})
    })
    .catch(error => {
      errMsg.value = errorCodes[error.code];
    })
  }

  const logout = () => {
     signOut(auth).then(() => {
      authUser.value = null
      router.push({name:'login'})
     }).catch(error => {
      console.log(error);
     })
  };
  

  const hasError = computed(() => {
    return errMsg.value
  })

  const isAuth = computed(() =>{
    return authUser.value
  })

  return {
    login,
    errMsg,
    hasError,
    isAuth,
    logout

  }
})