<template>
  <div class="common-pagination p-3 mt-3">
    <button class="btn btn-outline">Previous</button>
    <el-pagination layout="prev, pager, next" :total="1000" />
    <button class="btn btn-outline">Next</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {},
  computed: {},
  methods: {},
};
</script>

<style scoped></style>
