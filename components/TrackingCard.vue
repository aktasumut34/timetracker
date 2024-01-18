<script setup lang="ts">
import type { Tracking } from "@prisma/client";

defineProps<{
  tracking: Tracking;
}>();

const emits = defineEmits<{
  delete: [value: string];
}>();
</script>

<template>
  <div class="grid grid-cols-12 w-full">
    <div class="col-span-5 border p-4 border-gray-600">
      {{ tracking.description }}
    </div>
    <div class="col-span-3 border p-4 border-gray-600">
      {{ humanReadableTime(tracking.duration) }}
    </div>
    <div class="col-span-3 border p-4 border-gray-600">
      {{
        Intl.DateTimeFormat("en-US", {
          dateStyle: "long",
          timeStyle: "short",
        }).format(new Date(tracking.createdAt))
      }}
    </div>
    <div class="col-span-1 border p-4 border-gray-600">
      <UButton
        @click="emits('delete', tracking.id)"
        color="red"
        variant="soft"
        icon="i-heroicons-trash"
      ></UButton>
    </div>
  </div>
</template>
