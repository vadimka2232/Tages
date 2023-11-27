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
                        @updateParent="onUpdateStatus"
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
import type { Product, HeartsData } from "./types";

const products = ref<Product[]>([]);
const heartStatus = ref<HeartsData[]>([]);
const priceFilter = ref("lowToHigh");
const materialFilter = ref("2");

const fetchProducts = async () => {
    const response = await fetch("./products.json");
    const data = await response.json();
    products.value = data;
};

const fetchHearts = async () => {
    const response = await fetch("./hearts.json");
    const data = await response.json();
    heartStatus.value = data;
    localStorage.setItem("HeartsStore", JSON.stringify(heartStatus.value));
};

const filteredProducts = computed(() => {
    let filtered = [...products.value];

    // 1. все продукты по умолчанию не в избранных, но все равно надо проверять localStorage.
    // 2. если в localStorage продукт в избранных, то меняешь сердечко на заполненное
    // 3. если пользователь сам добавляет продукт в избранные, меняешь localStorage

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
const heartsSelected = ref([]);
const heartsStored = localStorage.getItem("HeartsStore");
if (heartsStored) {
    heartsSelected.value = JSON.parse(heartsStored);
}

watchEffect(() => {
    localStorage.setItem(
        "heartsSelected",
        JSON.stringify(heartsSelected.value)
    );
});

const onUpdateStatus = (id: string, statusItem: boolean) => {
    heartsSelected.value[+id].status = statusItem;
    localStorage.setItem(
        "heartsSelected",
        JSON.stringify(heartsSelected.value)
    );
    console.log(heartsSelected.value[+id].status);
};

const ways = ref([
    { id: 1, way: "Главная" },
    { id: 2, way: "Системы хранения" },
    { id: 3, way: "Комплекты стеллажных систем" },
]);

onMounted(() => {
    fetchProducts();
    fetchHearts();
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
