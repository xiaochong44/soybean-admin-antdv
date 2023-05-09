<template>
  <div class="p-4">
    <Space direction="vertical" :size="16" style="width: 100%">
      <workbench-header />
      <workbench-main />
    </Space>
  </div>
</template>

<script lang="ts" setup>
import { Space } from 'ant-design-vue';
import { WorkbenchHeader, WorkbenchMain } from './components';
</script>

<style scoped></style>
