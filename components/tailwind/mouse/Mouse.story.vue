<script setup lang="ts">
import Blob from './Blob.vue'
</script>

<template>
  <Story title="Mouse">
    <Variant title="Blob">
      <div class="relative h-screen w-screen overflow-hidden">
        <Blob />
      </div>
    </Variant>
  </Story>
</template>
