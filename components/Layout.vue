<script setup lang="ts">
import { NuxtLink } from "#components";

interface Nav {
  label: string;
  to?: string;
  onClick?: Function;
}

const props = defineProps<{
  icon?: string;
  dir?: string;
  repo?: string;
  file?: string;
  nav?: Nav[];
  currentRoute?: boolean;
}>();

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const title = "Time Tracker";

const { $auth } = useNuxtApp();
useSeoMeta({
  title: props.dir,
});
</script>

<template>
  <Body class="bg-gray-50 dark:bg-gray-950">
    <UContainer class="p-10 min-h-screen">
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <div class="flex gap-2">
              <ClientOnly>
                <UTooltip :text="`Switch to ${isDark ? 'Light' : 'Dark'} Mode`">
                  <UButton
                    :icon="
                      isDark
                        ? 'i-heroicons-moon-solid'
                        : 'i-heroicons-sun-solid'
                    "
                    color="white"
                    variant="solid"
                    aria-label="Theme"
                    @click="isDark = !isDark"
                  />
                </UTooltip>
                <template #fallback>
                  <div class="w-8 h-8" />
                </template>
              </ClientOnly>
            </div>
            <slot name="logo">
              <div
                class="flex gap-1 font-bold items-center text-2xl capitalize"
              >
                <UIcon
                  class="w-6 h-6 mr-2 bg-primary"
                  name="i-heroicons-clock-solid"
                />
                <span class="md:block hidden">Time</span>
                <span class="md:text-primary">Tracker</span>
              </div>
            </slot>
            <div class="flex gap-2">
              <ClientOnly v-if="$auth.session.value?.email">
                <UTooltip text="Logout">
                  <UButton
                    icon="
                      i-heroicons-power-solid  
                    "
                    color="white"
                    variant="solid"
                    aria-label="Theme"
                    @click="authLogout"
                  />
                </UTooltip>
                <template #fallback>
                  <div class="w-8 h-8" />
                </template>
              </ClientOnly>
            </div>
          </div>
        </template>

        <main class="min-h-body">
          <nav
            v-if="nav?.length || $slots.nav"
            class="flex align-center justify-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 mb-4"
          >
            <slot name="nav">
              <component
                v-for="item of nav"
                :key="item.label"
                :is="item.to ? NuxtLink : 'button'"
                :to="item.to"
                class="hover:underline"
                @click="item.onClick"
              >
                {{ item.label }}
              </component>
            </slot>
          </nav>
          <slot />
        </main>
      </UCard>
    </UContainer>
  </Body>
</template>

<style>
.min-h-body {
  min-height: calc(100vh - 13rem);
}
pre,
code {
  @apply text-primary;
}
.router-link-exact-active {
  @apply text-primary;
}
</style>
