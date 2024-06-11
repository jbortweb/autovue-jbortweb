<script setup>
import useAutos from '@/composables/useAutos';
import { precioAuto } from '@/helpers';


  const {autosCollection,deleteItem} = useAutos()
</script>

<template>
  <h2 class="text-center my-5 font-weight-bold text-h3">Panel Administración</h2>
  <v-btn
    color="blue"
    variant="flat"
    :to="{name:'nueva-propiedad'}"
  >
    Nuevo Vehículo
  </v-btn>

  <v-card class="mx-auto mt-10">
    <v-list>
      <v-list-item
        v-for="auto in autosCollection"
        :key="auto.id"
      >
        <template v-slot:prepend>
          <v-list-item-media :start="true">
            <img width="240" :src="auto.imagen"/>
          </v-list-item-media>
        </template>

        <v-list-item-title>{{ auto.titulo }}</v-list-item-title>
        <v-list-item-subtitle>{{ precioAuto(auto.precio) }}</v-list-item-subtitle>

        <template v-slot:append>
          <v-btn
            color="info"
            flat
            class="mr-2"
            :to="{name:'editar-propiedad', params: {id : auto.id} }"
          >
            Editar
          </v-btn>
          <v-btn
            color="red-darken-3"
            flat
            class="mr-2"
            @click="deleteItem(auto.id, auto.imagen)"
          >
            Eliminar
          </v-btn>

        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>