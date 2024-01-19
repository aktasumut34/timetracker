<script setup lang="ts">
const {
  time,
  timeHumanReadable,
  isRunning,
  startTimer,
  stopTimer,
  resetTimer,
} = useTracker();

const emits = defineEmits<{
  log: [];
}>();

const wasRunning = ref<boolean>(false);

const description = ref<string>("");

const creatingTracking = ref<boolean>(false);

const toast = useToast();

const createTracking = async (id: string) => {
  wasRunning.value = isRunning.value;
  stopTimer();
  creatingTracking.value = true;
};
const cancelTrackingRequest = async () => {
  if (wasRunning.value) startTimer();
  creatingTracking.value = false;
};
const createTrackingRequest = async () => {
  try {
    const tracking = await $fetch("/api/trackings", {
      method: "POST",
      body: {
        time: time.value,
        description: description.value,
      },
    });
    if (tracking.id) {
      toast.add({
        title: "Tracking created",
        description: "Tracking created successfully",
        color: "green",
      });
      resetTimer();
      emits("log");
    } else {
      throw new Error("Error creating tracking");
    }
  } catch (e) {
    toast.add({
      title: "Error",
      description: "Error creating tracking",
      color: "red",
    });
  } finally {
    description.value = "";
    creatingTracking.value = false;
  }
};
</script>

<template>
  <UModal v-model="creatingTracking" @close="cancelTrackingRequest">
    <div class="p-4 gap-6 flex flex-col items-center justify-center">
      <div class="text-xl text-primary">Create Tracking</div>
      <UFormGroup class="w-full">
        <UTextarea
          v-model="description"
          placeholder="Description"
          label="Description"
          type="textarea"
        />
      </UFormGroup>
      <div class="flex justify-center gap-4">
        <UButton @click="cancelTrackingRequest" variant="ghost" color="gray">
          Cancel
        </UButton>
        <UButton @click="createTrackingRequest" variant="soft">
          Create
        </UButton>
      </div>
    </div>
  </UModal>
  <ClientOnly>
    <div class="flex flex-col items-center h-[200px] justify-between">
      <div class="text-9xl text-primary">{{ timeHumanReadable }}</div>
      <div class="flex gap-2 items-center justify-center">
        <UButton @click="startTimer" v-if="!isRunning" variant="soft"
          >Start Timer</UButton
        >
        <UButton @click="stopTimer" v-else color="red" variant="soft"
          >Pause Timer</UButton
        >
        <UButton
          @click="createTracking"
          :disabled="time === 0"
          color="blue"
          variant="soft"
          >Log Time</UButton
        >
        <UButton v-if="time > 0" @click="resetTimer" variant="ghost"
          >Reset Timer</UButton
        >
      </div>
    </div>
    <template #fallback>
      <div class="h-[200px]"></div>
    </template>
  </ClientOnly>
</template>
