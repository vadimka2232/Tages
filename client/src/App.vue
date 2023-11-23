<template>
    <div class="container">
        <section>
            <ProductItem />
        </section>
    </div>
</template>

<script setup lang="ts">
import ProductItem from "./components/Product/ProductItem.vue";
</script>

<style scoped>
.container {
    max-width: 1920px;
    height: 600px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
