<template>
    <div>
        <header class="header">
            <div class="container">
                <ul class="way-list">
                    <NavPanel
                        v-for="way in ways"
                        v-bind:key="way"
                        v-bind:oneWay="way"
                        class="way-list_el"
                    />
                </ul>
            </div>
        </header>
        <main class="main">
            <div class="container">
                <h1 class="main_title">Комплекты стеллажных систем</h1>
                <section class="main_filter">
                    <div>
                        <h3 class="main_filter_title">Сортировать по:</h3>
                        <select
                            v-model="priceFilter"
                            class="main_filter_select"
                        >
                            <option
                                value="lowToHigh"
                                class="main_filter_option"
                            >
                                Цена по возрастанию
                            </option>
                            <option
                                value="highToLow"
                                class="main_filter_option"
                            >
                                Цена по убыванию
                            </option>
                        </select>
                    </div>
                    <div>
                        <h3 class="main_filter_title">Материал</h3>
                        <select
                            v-model="materialFilter"
                            class="main_filter_select"
                        >
                            <option value="1">Wood</option>
                            <option value="2">Metal</option>
                        </select>
                    </div>
                </section>
                <section class="main_products">
                    <ProductItem
                        v-for="product in filteredProducts"
                        :key="product.id"
                        :productData="product"
                    />
                </section>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import ProductItem from "./components/Product/ProductItem.vue";
import NavPanel from "./components/views/NavPanel/NavPanel.vue";
import SortElem from "./components/views/SortElem/SortElem.vue";
import { ref, computed, onMounted } from "vue";
import { Product, Material } from "./types";

const products = ref<Product[]>([]);
const priceFilter = ref("lowToHigh");
const materialFilter = ref("2");

const fetchProducts = async () => {
    const response = await fetch("./products.json");
    const data = await response.json();
    products.value = data;
    console.log(data);
};
const filteredProducts = computed(() => {
    let filtered = [...products.value];

    // фильтр по цене
    if (priceFilter.value === "lowToHigh") {
        filtered.sort((a, b) => a.price.current_price - b.price.current_price);
    } else if (priceFilter.value === "highToLow") {
        filtered.sort((a, b) => b.price.current_price - a.price.current_price);
    }

    // фильтр по материалам
    filtered = filtered.filter(
        (product) => product.material.toString() === materialFilter.value
    );

    return filtered;
});
const ways = ref([
    { title: "Главная" },
    { title: "Системы хранения" },
    { title: "Комплекты стеллажных систем" },
]);
onMounted(fetchProducts);
</script>

<style scoped>
.container {
    max-width: 1920px;
    margin: 0 214px;
}
.header {
    margin-top: 32px;
}
.main {
    margin-top: 32px;
}
.way-list {
    display: flex;
    flex-direction: row;
}
.way-list_el:last-child::after {
    display: none;
}
.way-list_el:last-child {
    color: var(--Black, #000);
    font-family: SF UI Text;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
}
.main_title {
    display: block;
    color: var(--Black, #000);
    font-feature-settings: "ss04" on, "clig" off, "liga" off;
    font-family: SF Pro Display;
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
    line-height: 48px;
}
.main_filter {
    margin-top: 32px;
    display: flex;
}
.main_filter_title {
    color: var(--Gray-2, #4f4f4f);
    font-family: SF Pro Display;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: 0.36px;
}
.main_filter_select {
    width: 288px;
    height: 40px;
}
.main_filter_option {
    width: 288px;
    height: 40px;
}
.main_products {
    display: flex;
    flex-wrap: wrap;
    margin-top: 41px;
    gap: 48px;
}
</style>
