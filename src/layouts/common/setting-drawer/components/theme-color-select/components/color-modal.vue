<template>
  <Modal :open="visible" width="640px" :z-index="10001" :footer="false" @cancel="handleClose">
    <div class="flex-x-center">
      <div class="text-primary text-24px">中国传统颜色</div>
    </div>
    <div class="h-430px">
      <Tabs>
        <TabPane v-for="item in traditionColors" :key="item.label" :name="item.label" :tab="item.label">
          <Row :gutter="[12, 16]">
            <Col v-for="i in item.data" :key="i.label" span="3" class="flex-x-center">
              <div class="w-full">
                <color-checkbox
                  class="!w-full !h-36px !rounded-4px"
                  :color="i.color"
                  :checked="i.color === theme.themeColor.toUpperCase()"
                  icon-class="text-20px"
                  @click="theme.setThemeColor(i.color)"
                />
                <p class="text-center">{{ i.label }}</p>
              </div>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { Modal, Tabs, TabPane, Row, Col } from 'ant-design-vue';
import { traditionColors } from '@/settings';
import { useThemeStore } from '@/store';
import ColorCheckbox from './color-checkbox.vue';

defineOptions({ name: 'ColorModal' });

interface Props {
  visible: boolean;
}

defineProps<Props>();

interface Emits {
  (e: 'close'): void;
}

const emit = defineEmits<Emits>();

const theme = useThemeStore();

function handleClose() {
  emit('close');
}
</script>

<style scoped></style>
