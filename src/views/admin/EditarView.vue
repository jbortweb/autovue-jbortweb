<script setup>
import { doc, updateDoc } from "firebase/firestore";
import { useRoute, useRouter } from "vue-router";
import { useDocument, useFirestore } from "vuefire";
import { useField, useForm } from "vee-validate";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import useImage from "@/composables/useImage";
import useLocationMap from "@/composables/useLocationMap";
import { validationSchema } from "@/validation/propiedadSchema";
import { watch } from "vue";

const items = [3, 4, 5];
const pasajero = [2, 3, 4, 5, 6, 7, 8, 9];

const { url, uploadImage, image } = useImage();
const { zoom, center, pin } = useLocationMap();

const { handleSubmit } = useForm({ validationSchema });

const titulo = useField("titulo");
const imagen = useField("imagen");
const precio = useField("precio");
const puertas = useField("puertas");
const pasajeros = useField("pasajeros");
const descripcion = useField("descripcion");
const diesel = useField("diesel");

const route = useRoute();
const router = useRouter()

const db = useFirestore();
const docRef = doc(db, "autos", route.params.id);
const auto = useDocument(docRef);

watch(auto, (auto) => {
      titulo.value.value = auto.titulo
      precio.value.value = auto.precio
      puertas.value.value = auto.puertas
      pasajeros.value.value = auto.pasajeros
      descripcion.value.value = auto.descripcion
      diesel.value.value = auto.diesel
      center.value = auto.ubicacion
  })

const submit = handleSubmit(async values => {
  const {imagen, ...auto} = values
  if(image.value) {
    const data = {
      ...auto,
      imagen: image.value,
      ubicacion: center.value
    }
    await updateDoc(docRef, data)
  }else {
    const data = {
      ...auto,
      ubicacion: center.value
    }
    await updateDoc(docRef, data)
  }
  router.push({name:'admin-propiedades'})
})

</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="mt-5">
      <h1 class="text-h4 font-weight-bold">Editar Vehículo</h1>
    </v-card-title>
    <v-card-subtitle>
      <p class="text-h5">Edita los detalles del Vehículo</p>
    </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field
        v-model="titulo.value.value"
        :error-messages="titulo.errorMessage.value"
        label="Titulo"
        class="mb-5"
      ></v-text-field>

      <v-file-input
        v-model="imagen.value.value"
        :error-messages="imagen.errorMessage.value"
        accept="image/jpeg"
        prepend-icon="mdi-camera"
        label="Fotografía"
        class="mb-5"
        @change="uploadImage"
      ></v-file-input>

      <div class="my-5">
        <p class="font-weight-bold">Imagen Actual:</p>
        <img 
          v-if="image"
          :src="image" 
          alt="Imagen vehículo" 
          class="w-50" 
        />

        <img
          v-else
          :src="auto?.imagen" 
          alt="Imagen vehículo" 
          class="w-50" 
        />
      </div>

      <v-text-field
        v-model="precio.value.value"
        :error-messages="precio.errorMessage.value"
        label="Precio"
        class="mb-5"
      ></v-text-field>

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            label="Puertas"
            class="mb-5"
            :items="items"
            v-model="puertas.value.value"
            :error-messages="puertas.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            label="Pasajeros"
            class="mb-5"
            :items="pasajero"
            v-model="pasajeros.value.value"
            :error-messages="pasajeros.errorMessage.value"
          />
        </v-col>
      </v-row>

      <v-textarea
        v-model="descripcion.value.value"
        :error-messages="descripcion.errorMessage.value"
        label="Descripción"
        class="mb-5"
      ></v-textarea>

      <v-checkbox
        label="Diesel"
        v-model="diesel.value.value"
      />

      <h2 class="font-weight-bold text-center my-5">Ubicación</h2>
      <div class="pb-10">
        <div style="height: 600px">
          <LMap
            v-model:zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
          >
            <LMarker :lat-lng="center" draggable @moveend="pin" />
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
          </LMap>
        </div>
      </div>

      <v-btn color="pink-accent-3" block @click="submit">
        Guardar Cambios
      </v-btn>
    </v-form>
  </v-card>
</template>