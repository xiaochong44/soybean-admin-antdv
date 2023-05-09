<template>
  <Divider>系统主题</Divider>
  <Row :gutter="[8, 12]">
    <Col v-for="color in theme.themeColorList" :key="color" span="3" class="flex-x-center">
      <color-checkbox :color="color" :checked="color === theme.themeColor" @click="theme.setThemeColor(color)" />
    </Col>
  </Row>
  <Space direction="vertical" style="padding-top: 12px; width: 100%">
    <PureColorPicker :value="theme.themeColor" @update:value="theme.setThemeColor" />
    <Button :block="true" :type="otherColorBtnType" @click="openModal">更多颜色</Button>
  </Space>
  <color-modal :visible="visible" @close="closeModal" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Divider, Space, Button, Row, Col } from 'ant-design-vue';
import { isInTraditionColors } from '@/settings';
import { useThemeStore } from '@/store';
import { useBoolean } from '@/hooks';
import PureColorPicker from '@/components/custom/pure-color-picker.vue';
import { ColorCheckbox, ColorModal } from './components';

defineOptions({ name: 'ThemeColorSelect' });

const theme = useThemeStore();

const { bool: visible, setTrue: openModal, setFalse: closeModal } = useBoolean();

const isInOther = computed(() => isInTraditionColors(theme.themeColor));
const otherColorBtnType = computed(() => (isInOther.value ? 'primary' : 'default'));
</script>

<style scoped></style>
