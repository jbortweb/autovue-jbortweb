<script setup>
import useAutos from '@/composables/useAutos';
import Auto from '@/components/Auto.vue'
import { precioAuto } from '@/helpers';

const {autosFlitrados, diesel} = useAutos()

</script>

<template>
    <h1 class="text-center text-h3 font-weight-bold my-5">Nuestros autos</h1>
    <v-card flat class="py-10">
        <v-card-title class="text-h5">
            Búsqueda
            <v-checkbox label="diesel" v-model="diesel"/>
        </v-card-title>
        <v-row>
            <Auto
                v-for="auto in autosFlitrados" 
                :key="auto.id"
                :auto='auto'
                :precio="precioAuto"
            />
        </v-row>
    </v-card>
</template>
