<template>
    <div>
        <header class="header">
            <div class="container">
                <ul class="way-list">
                    <NavPanel
                        v-for="way in ways"
                        :key="way.id"
                        :ways="way"
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

                        <a-space class="main_filter_select" bordered="false">
                            <a-select
                                style="width: 240px"
                                :value="priceFilter"
                                @change="(e: string) => (priceFilter = e)"
                            >
                                <a-select-option value="lowToHigh"
                                    >Цена по возрастанию</a-select-option
                                >
                                <a-select-option value="highToLow"
                                    >Цена по убыванию</a-select-option
                                >
                            </a-select>
                        </a-space>
                    </div>
                    <div>
                        <h3 class="main_filter_title">Материал</h3>

                        <a-space class="main_filte r_select">
                            <a-select
                                style="width: 240px"
                                :value="materialFilter"
                                @change="(e: string) => (materialFilter = e)"
                            >
                                >
                                <a-select-option value="1"
                                    >Дерево</a-select-option
                                >
                                <a-select-option value="2"
                                    >Металл</a-select-option
                                >
                            </a-select>
                        </a-space>
                    </div>
                </section>
                <section class="main_products">
                    <ProductItem
                        v-for="product in filteredProducts"
                        :key="product.id"
                        :productData="product"
                        @updateFavorite="onUpdateFavorite"
                    />
                </section>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import ProductItem from "./components/Product/ProductItem.vue";
import NavPanel from "./components/views/NavPanel/NavPanel.vue";
import { ref, computed, onMounted, watchEffect } from "vue";
import type { Product, HeartsData, FavoriteRecord } from "./types";

const ways = ref([
    { id: 1, way: "Главная" },
    { id: 2, way: "Системы хранения" },
    { id: 3, way: "Комплекты стеллажных систем" },
]);
const products = ref<Product[]>([]);
const priceFilter = ref("lowToHigh");
const materialFilter = ref("2");

const fetchProducts = async () => {
    const response = await fetch("./products.json");
    const data = await response.json();
    return data;
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

const initFavorites = (products: Product[]) => {
    const storedFavorites = localStorage.getItem("favorites");

    if (storedFavorites) return;

    let initialFavorites: FavoriteRecord[] = [];

    for (const product of products) {
        initialFavorites.push({
            id: product.id,
            isFavorite: false,
        });
    }

    localStorage.setItem("favorites", JSON.stringify(initialFavorites));
};

const onUpdateFavorite = (id: string, value: boolean) => {
    const storedFavorites = localStorage.getItem("favorites");

    if (!storedFavorites) return;

    const favorites = JSON.parse(storedFavorites) as FavoriteRecord[];

    const index = favorites.findIndex((item) => item.id === id);
    favorites[index].isFavorite = value;

    localStorage.setItem("favorites", JSON.stringify(favorites));
};

onMounted(() => {
    fetchProducts().then((data) => {
        products.value = data;
        initFavorites(data);
    });
});
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
    border-radius: 0;
}

.main_products {
    display: flex;
    flex-wrap: wrap;
    margin-top: 41px;
    gap: 48px;
}
.ant-select-selection-item {
    background: var(--Secondary, #f2f2f2);
}
</style>
