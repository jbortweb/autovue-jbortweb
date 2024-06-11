<script setup>
import { useField, useForm } from "vee-validate";
import { loginSchema as validationSchema } from "@/validation/loginSchema";
import { useAuthStore } from "@/stores/auth";

const { handleSubmit } = useForm({ validationSchema });
const auth = useAuthStore();

const email = useField("email");
const password = useField("password");

const submit = handleSubmit((values) => {
  auth.login(values);
});
</script>

<template>
  <v-card flat max-width="600" class="mx-auto my-3">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">
      Iniciar Sesión
    </v-card-title>
    <v-card-subtitle class="text-h6">
      Inicia Sesión con tu cuenta
    </v-card-subtitle>

    <v-alert
      v-if="auth.hasError"
      :title="auth.errMsg"
      type="error"
      class="my-5"
    ></v-alert>
    <v-form class="my-5">
      <v-text-field
        class="my-3"
        type="email"
        label="Email"
        bg-color="blue-grey-lighten-5"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
      />
      <v-text-field
        class="my-3"
        type="password"
        label="Password"
        bg-color="blue-grey-lighten-5"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
      />
      <v-btn block color="pink-accent-3" @click="submit">
        Iniciar Sesión
      </v-btn>
    </v-form>
  </v-card>
</template>