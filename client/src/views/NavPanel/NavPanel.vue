<template>
    <li class="navigation_item">{{ ways.way }}</li>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { WayData } from "../../types";
const { ways } = defineProps<{
    ways: WayData;
}>();
</script>

<style>
.navigation_item {
    color: var(--Gray-3, #828282);
    font-family: SF UI Text;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
}
</style>
