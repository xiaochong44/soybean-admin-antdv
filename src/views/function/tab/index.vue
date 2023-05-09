<template>
  <div class="p-4">
    <Space direction="vertical" :size="16" style="width: 100%">
      <Card title="Tab Home" :bordered="false" size="small" class="shadow-sm rounded-16px">
        <Space direction="vertical" :size="12" style="width: 100%">
          <Button @click="handleToTabDetail">跳转Tab Detail</Button>
          <Button @click="handleToTabMultiDetail(1)">跳转Tab Multi Detail 1</Button>
          <Button @click="handleToTabMultiDetail(2)">跳转Tab Multi Detail 2</Button>
          <InputGroup compact>
            <Input v-model:value="title" style="width: 300px" />
            <Button type="primary" @click="handleSetTitle">设置当前Tab页标题</Button>
          </InputGroup>
        </Space>
      </Card>
    </Space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Space, Card, Button, InputGroup, Input, message } from 'ant-design-vue';
import { routeName } from '@/router';
import { useTabStore } from '@/store';
import { useRouterPush } from '@/composables';

const { routerPush } = useRouterPush();
const tabStore = useTabStore();
const title = ref('');

function handleToTabDetail() {
  routerPush({ name: routeName('function_tab-detail'), query: { name: 'abc' }, hash: '#DEMO_HASH' });
}

function handleToTabMultiDetail(num: number) {
  routerPush({ name: routeName('function_tab-multi-detail'), query: { name: 'abc', num }, hash: '#DEMO_HASH' });
}

function handleSetTitle() {
  if (!title.value) {
    message.warning('请输入要设置的标题名称');
  } else {
    tabStore.setActiveTabTitle(title.value);
  }
}
</script>

<style scoped></style>
