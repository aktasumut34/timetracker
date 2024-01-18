<script setup lang="ts">
import type { Tracking } from "@prisma/client";
const deletingTracking = ref<string | null>(null);
const isDeleting = computed({
  get: () => deletingTracking.value !== null,
  set: (value) => {
    if (!value) {
      deletingTracking.value = null;
    }
  },
});

defineProps<{
  trackings: Tracking[];
}>();

const emits = defineEmits<{
  delete: [];
}>();

const deleteTracking = async (id: string) => {
  deletingTracking.value = id;
};
const deleteTrackingRequest = async () => {
  await $fetch(`/api/trackings`, {
    method: "DELETE",
    body: {
      id: deletingTracking.value,
    },
  });
  emits("delete");
  isDeleting.value = false;
};
</script>
<template>
  <UModal v-model="isDeleting">
    <div class="p-4 gap-6 flex flex-col items-center justify-center">
      <div class="text-xl text-primary">Are you sure?</div>
      <div class="text-gray-400">This action is irreversible.</div>
      <div class="flex justify-center gap-4">
        <UButton @click="isDeleting = false" variant="ghost" color="gray">
          Cancel
        </UButton>
        <UButton @click="deleteTrackingRequest" color="red" variant="soft">
          Delete
        </UButton>
      </div>
    </div>
  </UModal>
  <div class="flex flex-col gap-8 items-center lg:px-12 xl: px-20 2xl:px-24">
    <h4 class="text-2xl text-primary">Recent Trackings</h4>
    <template v-if="trackings.length > 0">
      <div class="w-full grid grid-cols-12">
        <div
          class="col-span-5 border p-4 dark:bg-blue-600 bg-blue-400 text-white border-gray-600"
        >
          Description
        </div>
        <div
          class="col-span-3 border p-4 dark:bg-blue-600 bg-blue-400 text-white border-gray-600"
        >
          Duration
        </div>
        <div
          class="col-span-4 border p-4 dark:bg-blue-600 bg-blue-400 text-white border-gray-600"
        >
          Created At
        </div>
      </div>
      <div
        class="flex w-full flex-col max-h-[45vh] overflow-y-auto pretty-scroll"
      >
        <TrackingCard
          v-for="tracking in trackings"
          :tracking="tracking"
          @delete="(id) => deleteTracking(id)"
        />
      </div>
    </template>
    <template v-else>
      <div class="text-gray-400">No trackings yet.</div>
    </template>
  </div>
</template>
<style scoped>
.pretty-scroll::-webkit-scrollbar {
  width: 0.3rem;
  border-radius: 0.5rem;
}
.pretty-scroll::-webkit-scrollbar-track {
  background: #888;
  border-radius: 0.5rem;
}
.pretty-scroll::-webkit-scrollbar-thumb {
  background: #f1f1f1;
  border-radius: 0.5rem;
}
</style>
