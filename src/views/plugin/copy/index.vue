<template>
  <div class="h-full">
    <Card title="文本复制" class="h-full shadow-sm rounded-16px">
      <InputGroup compact>
        <Input v-model:value="source" placeholder="请输入要复制的内容吧" style="width: 200px" />
        <Button type="primary" @click="handleCopy">复制</Button>
      </InputGroup>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Card, InputGroup, Input, Button, message } from 'ant-design-vue';
import { useClipboard } from '@vueuse/core';

const source = ref('');
const { copy, isSupported } = useClipboard();

function handleCopy() {
  if (!isSupported) {
    message.error('您的浏览器不支持Clipboard API');
    return;
  }
  if (!source.value) {
    message.error('请输入要复制的内容');
    return;
  }
  copy(source.value);
  message.success(`复制成功：${source.value}`);
}
</script>

<style scoped></style>
