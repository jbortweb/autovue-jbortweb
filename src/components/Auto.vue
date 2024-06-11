<script setup>
defineProps({
  auto : {
    type: Object
  },
  precio:{
    type: Function
  }
})
</script>

<template>
  <v-col
    cols="12"
    sm="6"
    md="4"
  >
    <v-card>
      <v-img
        :src="auto?.imagen"
        height="250"
        cover
      />
      <v-card-title>
        {{ auto?.titulo }}
      </v-card-title>
      <v-card-text class=" text-truncate">
        {{ auto?.descripcion }}
      </v-card-text>
      <v-card-text class=" text-h6 font-weight-bold">
        Precio: {{ precio(auto?.precio) }}
      </v-card-text>

      <template v-slot:actions>
        <v-btn
          block
          color="info"
          variant="flat"
          :to="{name: 'auto', params:{id:auto.id} }"
        >
          Más informacíon
        </v-btn>
      </template>
    </v-card>
  </v-col>
</template>

<style scoped>
</style>