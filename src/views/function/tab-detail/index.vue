<template>
  <div class="p-4">
    <Space direction="vertical" :size="16" style="width: 100%">
      <Card title="Tab Detail" :bordered="false" size="small" class="shadow-sm rounded-16px">
        <Space direction="vertical" :size="12" style="width: 100%">
          <div>当前路由的描述数据(meta)：</div>
          <div>{{ route.meta }}</div>
          <Button @click="handleToTab">返回Tab</Button>
        </Space>
      </Card>
    </Space>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Space, Card, Button } from 'ant-design-vue';
import { routeName } from '@/router';
import { useRouterPush } from '@/composables';

const { routerPush } = useRouterPush();

const route = useRoute();

function handleToTab() {
  routerPush({ name: routeName('function_tab') });
}
</script>

<style scoped></style>
