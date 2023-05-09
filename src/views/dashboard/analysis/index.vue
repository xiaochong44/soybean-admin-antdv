<template>
  <div class="p-4">
    <Space direction="vertical" :size="16" style="width: 100%">
      <top-chart />
      <data-card />
    </Space>
  </div>
</template>

<script lang="ts" setup>
import { Space } from 'ant-design-vue';
import { DataCard, TopChart } from './components';
</script>

<style scoped></style>
