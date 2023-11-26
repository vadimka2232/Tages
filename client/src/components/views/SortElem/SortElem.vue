<template>
    <div>
        <select v-model="priceFilter">
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
        </select>

        <select v-model="materialFilter">
            <option value="wood">Wood</option>
            <option value="metal">Metal</option>
        </select>

        <div v-for="product in filteredProducts" :key="product.name">
            <h3>{{ product.name }}</h3>
            <p>Price: {{ product.price }}</p>
            <p>Material: {{ product.material }}</p>
            <img :src="product.src" alt="Product Image" />
        </div>
    </div>
</template>

<script>
export default {
    props: ["dropdownOptions"],
    data() {
        return {};
    },
};
</script>

<style></style>
