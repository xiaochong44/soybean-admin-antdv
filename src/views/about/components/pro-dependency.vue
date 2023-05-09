<template>
  <Card title="生产环境依赖" :bordered="false" size="small" class="rounded-16px shadow-sm">
    <Descriptions label-placement="left" bordered size="small">
      <DescriptionsItem v-for="item in dependencies" :key="item.name" :label="item.name">
        {{ item.version }}
      </DescriptionsItem>
    </Descriptions>
  </Card>
</template>

<script setup lang="ts">
import { Card, Descriptions, DescriptionsItem } from 'ant-design-vue';
import { pkgJson } from './model';

defineOptions({ name: 'ProDependency' });

const { dependencies } = pkgJson;
</script>

<style scoped></style>
