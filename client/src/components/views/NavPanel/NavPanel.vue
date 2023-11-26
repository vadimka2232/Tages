<template>
    <li class="navigation_item">{{ oneWay.title }}</li>
</template>

<script>
export default {
    props: ["oneWay"],
    data() {
        return {};
    },
};
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
.navigation_item::after {
    content: "/";
    margin: 0 15px;
}
</style>
