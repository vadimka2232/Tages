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
                        productData.price.current_price
                    }}</span>
                </div>
                <div class="product-item_cost_box">
                    <img
                        :src="basketImage"
                        alt="busket"
                        class="product-item_cost_box_busket product-item_cost_box-active"
                        @click="switchImageBox"
                    />
                    <img
                        :src="heartImage"
                        alt="like"
                        class="product-item_cost_box_heart product-item_cost_box-active"
                        @click="
                            switchImageHeart();
                            sendCount();
                        "
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, type Ref } from "vue";

import type { Product } from "../../types";

const FILLED_HEART = "image/redHeart.svg";
const EMPTY_HEART = "image/heart.svg";

const basketImage = ref<string>("image/cart.svg");
const heartImage = ref<string>("image/heart.svg");

const { productData, isFavorite } = defineProps<{
    productData: Product;
    isFavorite: Ref<boolean>;
}>();

const emit = defineEmits<{
    (e: "onUpdateStatus", id: string, value: boolean): void;
}>();

const switchImageBox = () => {
    if (basketImage.value == "image/cart.svg") {
        basketImage.value = "image/succes.svg";
    } else {
        basketImage.value = "image/cart.svg";
    }
};
const switchImageHeart = (isFavorite: boolean): string =>
    isFavorite ? FILLED_HEART : EMPTY_HEART;

const sendCount = () => {
    isFavorite.value = !isFavorite.value;
    emit("updateParent", productData.id, isFavorite.value);
};
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
</style>
