<script setup lang="ts">
const { $auth } = useNuxtApp();
</script>

<template>
  <Layout>
    <template #nav>
      <NuxtLink v-if="!$auth.loggedIn.value" to="/login">Login</NuxtLink>
      <NuxtLink v-else to="/tracker">Time Tracker</NuxtLink>
    </template>
    <NuxtPage />
    <!-- to show toasts -->
    <UNotifications />
  </Layout>
</template>
