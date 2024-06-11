import { collection, deleteDoc, doc } from "firebase/firestore"
import { computed, ref } from "vue"
import {ref as storegeRef, deleteObject} from 'firebase/storage'
import { useCollection, useFirestore, useFirebaseStorage } from "vuefire"

export default function useAutos() {

  const diesel = ref(false)
  const storage = useFirebaseStorage()

  const db = useFirestore()
  const autosCollection = useCollection(collection(db,'autos'))

  const autosFlitrados = computed(() => {
    return diesel.value
      ? autosCollection.value.filter(auto => auto.diesel)
      : autosCollection.value;
  })

    async function deleteItem(id, urlImage) {
      if(confirm('Deseas eleminar esta propiedad')){
        const docRef = doc(db,'autos', id)
        const imageRef = storegeRef(storage, urlImage)

        await Promise.all([
          deleteDoc(docRef),
          deleteObject(imageRef)
        ])
      }
    }
  return {
    autosCollection,
    autosFlitrados,
    diesel,
    deleteItem
  }
}