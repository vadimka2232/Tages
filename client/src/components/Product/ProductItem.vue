<template>
    <div class="product-item">
        <span class="product-item_action" v-if="productData.price.old_price"
            >Скидка</span
        >
        <span v-else class="product-item-action-none"></span>
        <div class="product-item_info">
            <img
                :src="productData.image.url"
                alt="product"
                class="product-item_info_image"
            />
            <span class="product-item_info_article" v-if="productData.code">{{
                productData.code
            }}</span>
            <span class="product-item_info_article-none" v-else></span>
            <h3 class="product-item_info_title">{{ productData.name }}</h3>
            <div class="product-item_cost">
                <div class="product-item_cost_inner">
                    <span
                        class="product-item_cost_inner_action"
                        v-if="productData.price.old_price"
                        >{{ productData.price.old_price }}</span
                    >
                    <span class="product-item_cost_inner_subtitle">{{
                        cost
                    }}</span>
                </div>
                <div class="product-item_cost_box">
                    <img
                        :src="isAdded ? SUCCESS_IMAGE : CART_IMAGE"
                        alt="busket"
                        class="product-item_cost_box_busket product-item_cost_box-active"
                        @click="toggleAdded"
                    />
                    <img
                        :src="isFavorite ? FILLED_HEART : EMPTY_HEART"
                        alt="like"
                        class="product-item_cost_box_heart product-item_cost_box-active"
                        @click="toggleFavorite"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from "vue";
import type { FavoriteRecord, Product, BasketRecord } from "../../types";

const FILLED_HEART = "image/redHeart.svg";
const EMPTY_HEART = "image/heart.svg";

const SUCCESS_IMAGE = "image/succes.svg";
const CART_IMAGE = "image/cart.svg";

const { productData } = defineProps<{
    productData: Product;
}>();
let cost = Math.floor(productData.price.current_price);
const emit = defineEmits<{
    (event: "updateFavorite", id: string, value: boolean): void;
    (event: "updateBasket", id: string, value: boolean): void;
}>();

const isFavorite = ref(false);
const isAdded = ref(false);

const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
    emit("updateFavorite", productData.id, isFavorite.value);
};

const toggleAdded = () => {
    isAdded.value = !isAdded.value;
    emit("updateBasket", productData.id, isAdded.value);
};

onMounted(() => {
    {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            const favorites = JSON.parse(storedFavorites) as FavoriteRecord[];
            const favorite = favorites.find((fav) => fav.id === productData.id);
            isFavorite.value = favorite?.isFavorite || false;
        }
    }
    {
        const storedBasket = localStorage.getItem("basket");
        if (storedBasket) {
            const basket = JSON.parse(storedBasket) as BasketRecord[];
            const basketItem = basket.find((fav) => fav.id === productData.id);
            isAdded.value = basketItem?.isAdded || false;
        }
    }
});
</script>

<style>
.product-item {
    border: 1px solid #eeeeee;
    width: 336px;
    display: inline-block;
}
.product-item_action {
    display: inline-block;
    margin-top: 8px;
    padding: 5px 16px 7px 17px;
    background: var(--Attention, #eb5757);
    color: var(--White, #fff);
    font-family: SF Pro Display;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 0.14px;
}
.product-item-action-none {
    height: 32px;
    display: block;
}
.product-item_info_article-none {
    height: 14px;
    display: block;
}
.product-item_info {
    margin: 0 21px 9px 12px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.product-item_info_article {
    display: block;
    color: #888;
    font-family: SF UI Text;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: 0.2px;
}
.product-item_info_title {
    color: var(--Black, #000);
    font-family: SF UI Text;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: 0.32px;
}
.product-item_cost_inner_subtitle {
    color: var(--Black, #000);
    font-family: SF UI Text;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: 0.32px;
}
.product-item_info_image {
    display: inline-block;
    margin: 0 auto;
    width: 238px;
    height: 237px;
}
.product-item_cost {
    display: flex;
    justify-content: space-between;
}
.product-item_cost_inner {
    display: flex;
    align-items: center;
}
.product-item_cost_box {
    display: flex;
    gap: 25px;
}
.product-item_cost_inner_action {
    color: #888;
    font-family: SF UI Text;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: 1px;
    text-decoration: Line-through;
    margin-right: 9px;
}
.product-item_cost_box-active:hover {
    transform: scale(1.35);
    transition-duration: 0.3s;
}
@media (max-width: 1024px) {
    .product-item_info_image {
        width: 205px;
        height: 206px;
    }
}
@media (max-width: 755px) {
    .product-item_info_image {
        width: 140px;
        height: 145px;
    }
    .product-item_cost_box-active:hover {
        transform: scale(1.3);
    }
}
@media (max-width: 625px) {
    .product-item_cost_inner_action {
        font-size: 14px;

        line-height: 120%;

        text-decoration: Line-through;
        margin-right: 3px;
    }
    .product-item_cost_inner_subtitle {
        font-size: 14px;
        line-height: 120%;
        letter-spacing: 0.32px;
    }
    .product-item_info_image {
        width: 130px;
        height: 145px;
    }
}
@media (max-width: 450px) {
    .product-item_cost_box {
        display: flex;
        gap: 10px;
    }
    .product-item_info_image {
        width: 120px;
        height: 145px;
    }
    .product-item_info_title {
        font-size: 13px;

        line-height: 110%;
        letter-spacing: 0.32px;
    }
    .product-item_cost_box-active:hover {
        transform: scale(1.2);
    }
}
@media (max-width: 380px) {
    .product-item_cost_box {
        display: flex;
        gap: 10px;
    }
    .product-item_info_image {
        width: 115px;
        height: 115px;
    }
    .product-item_info_title {
        font-size: 13px;

        line-height: 110%;
        letter-spacing: 0.32px;
    }
    .product-item_cost_box-active:hover {
        transform: scale(1.2);
    }
}
</style>
