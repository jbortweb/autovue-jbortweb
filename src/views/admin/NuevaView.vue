<script setup>
import { useForm, useField } from "vee-validate";
import { collection, addDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { validationSchema, imageSchema } from "@/validation/propiedadSchema";
import { useRouter } from "vue-router";
import useImage from "@/composables/useImage";
import useLocationMap from "@/composables/useLocationMap";
import "leaflet/dist/leaflet.css";
import { LMap, LMarker, LTileLayer } from "@vue-leaflet/vue-leaflet";

const router = useRouter();

const items = [3, 4, 5];
const pasajero = [2, 3, 4, 5, 6, 7, 8, 9];

const { uploadImage, image, url } = useImage();
const {zoom, center, pin} =useLocationMap()

const db = useFirestore();

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema,
  },
});

const titulo = useField("titulo");
const imagen = useField("imagen");
const precio = useField("precio");
const puertas = useField("puertas");
const pasajeros = useField("pasajeros");
const descripcion = useField("descripcion");
const diesel = useField("diesel", null, {
  initialValue: false,
});

const submit = handleSubmit(async (values) => {
  const { imagen, ...auto } = values;
  const docRef = await addDoc(collection(db, "autos"), {
    ...auto,
    imagen: url.value,
    ubicacion: center.value
  });
  if (docRef.id) {
    router.push({ name: "admin-propiedades" });
  }
});
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">
      Nuevo Vehículo
    </v-card-title>

    <v-card-subtitle class="text-h6 py-5">
      Llena el siguiente formulario para añadir un nuevo Vehículo
    </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field
        class="mb-5"
        label="Marca de Vehículo"
        v-model="titulo.value.value"
        :error-messages="titulo.errorMessage.value"
      />
      <v-file-input
        accept="image/jpg"
        label="Fotografía"
        prepend-icon="mdi-camera"
        class="mb-5"
        v-model="imagen.value.value"
        :error-messages="imagen.errorMessage.value"
        @change="uploadImage"
      />
      <div v-if="image" class="my-5">
        <p class="font-weight-bold">Imagen Vehículo</p>
        <img :src="image" alt="Imagen vehículo" class="w-50" />
      </div>
      <v-text-field
        class="mb-5"
        label="Precio"
        v-model="precio.value.value"
        :error-messages="precio.errorMessage.value"
      />

      <v-row>
        <v-col ols="12" md="4">
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
        class="mb-5"
        label="Descripción"
        v-model="descripcion.value.value"
        :error-messages="descripcion.errorMessage.value"
      >
      </v-textarea>
      <v-checkbox
        label="Diesel"
        v-model="diesel.value.value"
      />
      <h2 class="text-center font-weight-bold my-5">Ubicación</h2>
      <div class="pb-10">
        <div style="height: 400px">
          <LMap 
            v-model:zoom="zoom" 
            :center="center" :use-global-leaflet="false"
          >
            <LMarker
              :lat-lng="center"
              draggable
              @moveend="pin"
            />
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
          </LMap>
        </div>
      </div>

      <v-btn color="pink-accent-3" block @click="submit">
        Agregar Vehículo
      </v-btn>
    </v-form>
  </v-card>
</template>