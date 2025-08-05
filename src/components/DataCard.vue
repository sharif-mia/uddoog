<template>
  <div class="data-card">
    <div class="data-card__header" @click="$emit('toggle')">
      <div class="data-card__title">
        <slot name="title" />
      </div>
      <i :class="expanded ? 'icon-down':'icon-right'"></i>
    </div>

    <el-collapse-transition>
      <div v-show="expanded" class="data-card__content">
        <div v-for="(value, key) in fields" :key="key" class="data-card__item">
          {{ key }} <strong>{{ value }}</strong> 
        </div>

        <div v-if="$slots.actions" class="data-card__actions">
          <slot name="actions" />
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'DataCard',
   props: {
    fields: Object,
    expanded: Boolean,
  },
  data() {
    return {
      isExpanded: false,
    };
  },
};
</script>

<style scoped>
.data-card {
  margin-bottom: 1rem;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}
.data-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.data-card__title {
  font-weight: 600;
}
.data-card__item {
  margin: 20px 0 0;
}
.data-card__item strong {
    display: block;
}
.data-card__actions {
      margin-top: 12px;
    display: flex;
    gap: 10px;
    justify-content: space-between;
}

</style>
