<template>
  <div class="data-card">
    <div class="data-card__header" @click="$emit('toggle')">
      <div class="data-card__title">
        <slot name="title" />
      </div>
      <i :class="expanded ? 'icon-down' : 'icon-right'"></i>
    </div>

    <el-collapse-transition>
      <div v-show="expanded" class="data-card__content">
        <slot name="content" />

        <div v-if="$slots.actions" class="data-card__actions">
          <slot name="actions" />
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: "DataCard",
  props: {
    expanded: Boolean
  }
};
</script>
