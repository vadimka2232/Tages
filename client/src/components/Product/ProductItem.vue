<template>
    <div class="product-item">
        <span class="product-item_action">Скидка</span>
        <div class="product-item_info">
            <img
                src="../../image/lamp.png"
                alt=""
                class="product-item_info_image"
            />
            <span class="product-item_info_article">L422WH</span>
            <h3>Ручка дверная</h3>
            <div class="product-item_cost">
                <div class="product-item_cost_inner">
                    <span v-if="true" class="product-item_cost_inner_action">
                        400₽
                    </span>
                    <span>355</span>
                </div>
                <div class="product-item_cost_box">
                    <img src="../../image/cart.svg" alt="add" />
                    <img src="../../image/heart.svg" alt="like" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.product-item {
    border: 1px solid red;
    width: 336px;
    display: inline-block;
}
.product-item_action {
    display: inline-block;
    padding: 5px;
    background-color: gray;
}
.product-item_info {
    margin: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.product-item_info_article {
    display: block;
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
    align-items: center;
}
.product-item_cost_inner {
    display: flex;
    gap: 9px;
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
}
</style>
