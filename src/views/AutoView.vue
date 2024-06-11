<script setup>
import { doc } from "firebase/firestore";
import { useRoute } from "vue-router";
import { useDocument, useFirestore } from "vuefire";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import useLocationMap from "@/composables/useLocationMap";
import { precioAuto } from '@/helpers';
import { watch } from "vue";

const {zoom, center} = useLocationMap()

const route = useRoute()
const db = useFirestore()
const docRef = doc(db, 'autos', route.params.id)
const auto = useDocument(docRef)

watch(auto,(auto) => {
  center.value = auto.ubicacion
})

</script>

<template>
  <v-card flat>
    <v-card-title class="mt-5 text-h3 text-center py-5 font-weight-bold">
      {{ auto?.titulo }}
    </v-card-title>
    <v-img
      :src="auto?.imagen"
      :alt="auto?.titulo"
      height="550"
      cover
    />
    <div class="bg-blue-grey-lighten-5 d-flex flex-column flex-md-row justify-space-between">

      <v-card-text>
      Precio:
      <span class="font-weight-bold">{{precioAuto(auto?.precio) }}</span>
    </v-card-text>

      <v-card-text>
      Puertas:
      <span class="font-weight-bold">{{ auto?.puertas }}</span>
    </v-card-text>
    
    <v-card-text>
      Asientos:
      <span class="font-weight-bold">{{ auto?.pasajeros }}</span>
    </v-card-text>
    </div>

    <v-row>
      <v-col
        cols="12"
        md="8"
      >
        <div class="text-pre-wrap py-10">
          {{ auto?.descripcion }}
        </div>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <div class="py-10" style="height:400px;">
          <LMap
            v-model:zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
          >
            <LMarker :lat-lng="center">
            <LPopup>
              {{ auto?.titulo }}
              <br>
              Tlf: 666 666 666
              <br>
              Juan
            </LPopup>
            </LMarker>
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
          </LMap>
        </div>
      </v-col>
    </v-row>
  </v-card> 
</template>

<style>
.text-pre-wrap{
  white-space:pre-wrap
}
</style>