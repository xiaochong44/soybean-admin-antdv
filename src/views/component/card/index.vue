<template>
  <div>
    <Card title="卡片" class="h-full shadow-sm rounded-16px">
      <Space direction="vertical">
        <Card title="基本用法">
          <p class="pb-16px">基础卡片</p>
          <Card title="卡片">卡片内容</Card>
        </Card>
        <Card title="尺寸">
          <p class="pb-16px">卡片有 small、default 尺寸。</p>
          <Space vertical>
            <Card title="小卡片" size="small">卡片内容</Card>
            <Card title="默认" size="default">卡片内容</Card>
          </Space>
        </Card>
        <Card title="文本按钮">
          <p class="pb-16px">
            content 和 footer 可以被 hard 或 soft 分段，action 可以被分段。分段分割线会在区域的上方出现。
          </p>
          <Card
            title="卡片分段示例"
            :segmented="{
              content: true,
              footer: 'soft'
            }"
          >
            <template #header-extra>#header-extra</template>
            卡片内容
            <template #footer>#footer</template>
            <template #action>#action</template>
          </Card>
        </Card>
      </Space>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, Space } from 'ant-design-vue';
</script>

<style scoped></style>
