<template>
  <div class="p-4">
    <Space direction="vertical" :size="16">
      <project-introduction />
      <project-info />
      <pro-dependency />
      <dev-dependency />
    </Space>
  </div>
</template>

<script setup lang="ts">
import { Space } from 'ant-design-vue';
import { DevDependency, ProDependency, ProjectInfo, ProjectIntroduction } from './components';
</script>

<style scoped></style>
