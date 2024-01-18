<script setup lang="ts">
useHead({
  title: "Home Page",
});

const { data: session } = await useFetch("/api/auth/session", {
  headers: useRequestHeaders(["cookie"]),
});

if (session.value?.email) {
  navigateTo("/tracker");
} else {
  navigateTo("/login");
}
</script>
