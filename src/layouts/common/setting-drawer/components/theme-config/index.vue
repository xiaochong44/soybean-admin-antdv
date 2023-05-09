<template>
  <Divider>主题配置</Divider>
  <textarea id="themeConfigCopyTarget" v-model="dataClipboardText" class="absolute opacity-0" />
  <Space direction="vertical" style="width: 100%">
    <div ref="copyRef" data-clipboard-target="#themeConfigCopyTarget">
      <Button type="primary" :block="true">拷贝当前配置</Button>
    </div>
    <Button :block="true" @click="handleResetConfig">重置当前配置</Button>
  </Space>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Divider, Space, Button, message, Modal } from 'ant-design-vue';
import Clipboard from 'clipboard';
import { useThemeStore } from '@/store';

defineOptions({ name: 'ThemeConfig' });

const theme = useThemeStore();

const copyRef = ref<HTMLElement>();

const dataClipboardText = ref(getClipboardText());

function getClipboardText() {
  return JSON.stringify(theme.$state);
}

function handleResetConfig() {
  theme.resetThemeStore();
  message?.success('已重置配置，请重新拷贝！');
}

function clipboardEventListener() {
  if (!copyRef.value) return;
  const copy = new Clipboard(copyRef.value);
  copy.on('success', () => {
    Modal.success({
      title: '操作成功',
      content: '复制成功,请替换 src/settings/theme.json的内容！',
      okText: '确定'
    });
  });
}

const stopHandle = watch(
  () => theme.$state,
  () => {
    dataClipboardText.value = getClipboardText();
  },
  { deep: true }
);

onMounted(() => {
  clipboardEventListener();
});
onUnmounted(() => {
  stopHandle();
});
</script>

<style scoped></style>
