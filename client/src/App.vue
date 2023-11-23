<template>
    <div>
        <header>
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
        <div class="container">
            <section>
                <Product-item />
            </section>
        </div>
    </div>
</template>

<script>
export default {
    components: { ProductItem, NavPanel },
    data() {
        return {
            ways: [
                { title: "Главная" },
                { title: "Системы хранения" },
                { title: "Комплекты стеллажных систем" },
            ],
        };
    },
};
import ProductItem from "./components/Product/ProductItem.vue";
import NavPanel from "./components/views/NavPanel.vue";
</script>

<style scoped>
.container {
    max-width: 1920px;
    display: flex;
    margin: 32px 214px 104px 214px;
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
</style>
