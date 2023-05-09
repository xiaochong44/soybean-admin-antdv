<template>
  <Card title="项目信息" :bordered="false" size="small" class="rounded-16px shadow-sm">
    <Descriptions label-placement="left" bordered size="small" :column="2">
      <DescriptionsItem label="版本">
        <Tag type="primary">{{ version }}</Tag>
      </DescriptionsItem>
      <DescriptionsItem label="最后编译时间">
        <Tag type="primary">{{ latestBuildTime }}</Tag>
      </DescriptionsItem>
      <DescriptionsItem label="Github地址">
        <a class="text-primary" href="https://github.com/honghuangdc/soybean-admin" target="_blank">Github地址</a>
      </DescriptionsItem>
      <DescriptionsItem label="预览地址">
        <a class="text-primary" href="https://soybean.pro" target="_blank">预览地址</a>
      </DescriptionsItem>
    </Descriptions>
  </Card>
</template>

<script setup lang="ts">
import { Tag, Card, Descriptions, DescriptionsItem } from 'ant-design-vue';
import { pkgJson } from './model';

defineOptions({ name: 'ProjectInfo' });

const { version } = pkgJson;
const latestBuildTime = PROJECT_BUILD_TIME;
</script>

<style scoped></style>
