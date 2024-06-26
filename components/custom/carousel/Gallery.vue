<script lang="ts" setup>
import img1 from '/images/1.jpeg'
import img2 from '/images/2.jpeg'
import img3 from '/images/3.jpeg'
import img4 from '/images/4.jpeg'
import img5 from '/images/5.jpeg'
import img6 from '/images/6.jpeg'

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  `${img1}?1`,
  `${img2}?1`,
  `${img3}?1`,
  `${img4}?1`,
  `${img5}?1`,
  `${img6}?1`,
  `${img1}?2`,
  `${img2}?2`,
  `${img3}?2`,
  `${img4}?2`,
  `${img5}?2`,
  `${img6}?2`,
  `${img1}?3`,
  `${img2}?3`,
  `${img3}?3`,
  `${img4}?3`,
  `${img5}?3`,
  `${img6}?3`,
]

const collapsedAspectRatio = 1 / 3
const fullAspectRatio = 3 / 2
const margin = 12
const gap = 2

const variants = {
  active: {
    aspectRatio: fullAspectRatio,
    marginLeft: `${margin}%`,
    marginRight: `${margin}%`,
    opacity: 1,
  },
  inactive: {
    aspectRatio: collapsedAspectRatio,
    marginLeft: '0%',
    marginRight: '0%',
    opacity: 0.5,
  },
}
</script>

<template>
  <div class="relative h-screen bg-black">
    <div class="mx-auto flex h-full max-w-7xl flex-col justify-center">
      <Carousel v-slot="{ scrollTo, activeIndex }">
        <CarouselItem v-for="image in images" :key="image" class="w-full">
          <img class="aspect-[3/2] object-cover" :src="image" />
        </CarouselItem>
        <Transition name="custom-fade">
          <button
            v-if="activeIndex > 0"
            class="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-70 transition-opacity duration-300 hover:opacity-100"
            @click="scrollTo(activeIndex - 1)"
            @pointerdown.stop
          >
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </Transition>
        <Transition name="custom-fade">
          <button
            v-if="activeIndex + 1 < images.length"
            class="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-70 transition-opacity duration-300 hover:opacity-100"
            @click="scrollTo(activeIndex + 1)"
            @pointerdown.stop
          >
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </Transition>
        <div
          class="absolute inset-x-0 bottom-6 flex h-14 justify-center overflow-hidden"
          @pointerdown.stop
        >
          <div
            :style="{
              aspectRatio: fullAspectRatio,
              gap: `${gap}%`,
              transform: `translateX(-${
                activeIndex * 100 * (collapsedAspectRatio / fullAspectRatio) +
                margin +
                activeIndex * gap
              }%) translateZ(0px)`,
            }"
            class="flex transition-all"
          >
            <VMotion
              v-for="(image, i) in images"
              :key="image"
              :animate="i === activeIndex ? variants.active : variants.inactive"
              class="shrink-0 hover:!opacity-100"
              as="button"
              @click="scrollTo(i)"
            >
              <img
                :src="image"
                class="pointer-events-none h-full object-cover"
              />
            </VMotion>
          </div>
        </div>
      </Carousel>
    </div>
  </div>
</template>

<style scoped>
.custom-fade-enter-from,
.custom-fade-leave-to {
  opacity: 0;
}

.custom-fade-enter-to,
.custom-fade-leave-from {
  opacity: 0.7;
}

.custom-fade-enter-active,
.custom-fade-leave-active {
  transition: opacity 700ms ease;
}
</style>
