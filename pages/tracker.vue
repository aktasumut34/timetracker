<script setup lang="ts">
import { type Tracking } from "@prisma/client";

useHead({
  title: "Time Tracker",
});

definePageMeta({
  auth: true,
});

const { data: trackings, refresh } = useFetch<Tracking[]>("/api/trackings");
</script>

<template>
  <div class="flex flex-col gap-8">
    <TimeTracker @log="refresh" />
    <TrackingList :trackings="trackings ?? []" @delete="refresh" />
  </div>
</template>
