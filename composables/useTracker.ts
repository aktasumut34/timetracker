import { useStorage } from "@vueuse/core";

export const humanReadableTime = (time: number) => {
  const days = Math.floor(time / (60 * 60 * 24));
  const hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  const seconds = Math.floor(time % 60);
  let timeString = "";
  if (days) {
    timeString += `${days.toString().padStart(2, "0")}d `;
  }
  if (hours) {
    timeString += `${hours.toString().padStart(2, "0")}h `;
  }
  if (minutes) {
    timeString += `${minutes.toString().padStart(2, "0")}m `;
  }
  timeString += `${seconds.toString().padStart(2, "0")}s`;
  return timeString;
};

export const useTracker = () => {
  let startedTime = useStorage<string | null>("startedTime", null);
  let pausedTime = useStorage<number | null>("pausedTime", null);
  let timeToStart = 0;
  if (pausedTime.value) {
    timeToStart = pausedTime.value;
  } else if (startedTime.value) {
    timeToStart = Math.floor(
      (Date.now() - new Date(startedTime.value).getTime()) / 1000
    );
  }
  const time = ref(timeToStart);
  const isRunning = ref(false);
  const timer = ref<NodeJS.Timeout | null>(null);
  const timeHumanReadable = computed(() => {
    return humanReadableTime(time.value);
  });
  const startInterval = () => {
    isRunning.value = true;
    timer.value = setInterval(() => {
      time.value++;
    }, 1000);
  };
  const startTimer = () => {
    startedTime.value = new Date(Date.now() - time.value * 1000).toISOString();
    pausedTime.value = null;
    startInterval();
  };
  const stopTimer = () => {
    startedTime.value = null;
    pausedTime.value = time.value;
    isRunning.value = false;
    if (timer.value) {
      clearInterval(timer.value);
    }
  };
  const resetTimer = () => {
    stopTimer();
    startedTime.value = null;
    pausedTime.value = null;
    time.value = 0;
  };
  if (startedTime.value && time.value > 0) {
    startInterval();
  }
  return {
    time,
    timeHumanReadable,
    startTimer,
    stopTimer,
    resetTimer,
    isRunning,
  };
};
