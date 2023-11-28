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

                        <a-space>
                            <a-select
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

                        <a-space>
                            <a-select
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
                        @updateBasket="onUpdateBasket"
                    />
                </section>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import ProductItem from "./components/Product/ProductItem.vue";
import NavPanel from "./views/NavPanel/NavPanel.vue";
import { ref, computed, onMounted } from "vue";
import type { Product, FavoriteRecord, BasketRecord } from "./types";

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
const initBasket = (products: Product[]) => {
    const storedBasket = localStorage.getItem("basket");

    if (storedBasket) return;

    let initialBasket: BasketRecord[] = [];

    for (const product of products) {
        initialBasket.push({
            id: product.id,
            isAdded: false,
        });
    }

    localStorage.setItem("basket", JSON.stringify(initialBasket));
};

const onUpdateFavorite = (id: string, value: boolean) => {
    const storedFavorites = localStorage.getItem("favorites");

    if (!storedFavorites) return;

    const favorites = JSON.parse(storedFavorites) as FavoriteRecord[];

    const index = favorites.findIndex((item) => item.id === id);
    favorites[index].isFavorite = value;

    localStorage.setItem("favorites", JSON.stringify(favorites));
};
const onUpdateBasket = (id: string, value: boolean) => {
    const storedBasket = localStorage.getItem("basket");

    if (!storedBasket) return;

    const basket = JSON.parse(storedBasket) as BasketRecord[];

    const index = basket.findIndex((item) => item.id === id);
    basket[index].isAdded = value;

    localStorage.setItem("basket", JSON.stringify(basket));
};

onMounted(() => {
    fetchProducts().then((data) => {
        products.value = data;
        initFavorites(data);
        initBasket(data);
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
    gap: 10px;
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
    display: flex;
    gap: 0;
    width: 288px;
    height: 40px;
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
.ant-select {
    width: 288px;
}
@media (max-width: 1550px) {
    .container {
        max-width: 1550px;
        margin: 0 13vw;
    }
    .product-item {
        width: 290px;
    }
    .main_products {
        gap: 38px;
    }
    .ant-select {
        width: 260px;
    }
}

@media (max-width: 1280px) {
    .container {
        max-width: 1280px;
        margin: 0 12vw;
    }
    .product-item {
        width: 270px;
    }
    .main_products {
        gap: 25px;
    }
    .ant-select {
        width: 260px;
    }
}

@media (max-width: 755px) {
    .container {
        max-width: 755px;
        margin: 0 10vw;
    }
    .way-list_el:last-child {
        font-size: 12px;
        line-height: 12px;
    }
    .navigation_item {
        font-size: 12px;
        font-weight: 400;
        line-height: 12px;
    }
    .main_title {
        font-size: 28px;
        font-weight: 600;
        line-height: 38px;
    }
    .product-item {
        width: 240px;
    }
    .main_products {
        margin-top: 41px;
        gap: 10px;
    }

    .ant-select {
        width: 242px;
    }
}
@media (max-width: 625px) {
    .container {
        max-width: 625px;
        margin: 0 8vw;
    }
    .way-list_el:last-child {
        font-size: 12px;
        line-height: 14px;
    }
    .navigation_item {
        font-size: 12px;
        font-weight: 400;
        line-height: 12px;
    }
    .main_title {
        font-size: 24px;
        font-weight: 600;
        line-height: 34px;
    }
    .product-item {
        width: 190px;
    }
    .main_products {
        margin-top: 20px;
        gap: 10px;
    }

    .ant-select {
        width: 190px;
    }
}
@media (max-width: 500px) {
    .container {
        max-width: 500px;
        margin: 0 6vw;
    }
    .way-list {
        align-items: center;
    }

    .way-list_el:last-child {
        font-size: 10px;
        line-height: 14px;
        width: 115px;
    }
    .navigation_item::after {
        content: "/";
        margin: 0 8px;
    }
    .navigation_item {
        width: 65px;
        font-size: 10px;
        font-weight: 400;
        line-height: 12px;
    }
    .main_title {
        font-size: 24px;
        font-weight: 600;
        line-height: 34px;
    }
    .product-item {
        width: 190px;
    }
    .main_products {
        gap: 10px;
    }

    .ant-select {
        width: 190px;
    }
}
@media (max-width: 450px) {
    .container {
        max-width: 450px;
        margin: 0 5vw;
    }
    .way-list {
        align-items: center;
    }

    .way-list_el:last-child {
        font-size: 10px;
        line-height: 14px;
        width: 115px;
    }
    .navigation_item::after {
        content: "/";
        margin: 0 8px;
    }
    .navigation_item {
        width: 65px;
        font-size: 10px;
        font-weight: 400;
        line-height: 12px;
    }
    .main_title {
        font-size: 22px;
        font-weight: 600;
        line-height: 34px;
    }
    .product-item {
        width: 165px;
    }

    .main_filter {
        margin-top: 30px;
    }
    .ant-select {
        width: 166px;
    }
}
@media (max-width: 380px) {
    .container {
        max-width: 400px;
        margin: 0 4vw;
    }
    .way-list_el {
        font-size: 10px;
        line-height: 14px;
        width: 60px;
        display: flex;
        align-items: center;
    }
    .way-list_el:last-child {
        font-size: 10px;
        line-height: 14px;
        width: 200px;
        margin-left: 10px;
    }
    .navigation_item::after {
        content: "/";
        margin: 0 10px;
    }

    .main_title {
        font-size: 20px;
        font-weight: 600;
        line-height: 32px;
    }
    .product-item {
        width: 150px;
    }
    .ant-select {
        width: 150px;
    }
}
</style>
