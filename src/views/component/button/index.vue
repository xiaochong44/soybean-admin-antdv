<template>
  <div>
    <Card title="按钮" class="h-full shadow-sm rounded-16px">
      <Row cols="s:1 m:2" responsive="screen" :gutter="[16, 16]">
        <Col v-for="item in buttonExample" :key="item.id" :sm="24" :md="12">
          <Card :title="item.label" class="min-h-180px">
            <p v-if="item.desc" class="pb-16px">{{ item.desc }}</p>
            <Space>
              <Button v-for="button in item.buttons" :key="button.id" v-bind="button.props">
                <template v-if="button.icon" #icon>
                  <svg-icon :icon="button.icon" />
                </template>
                {{ button.label }}
              </Button>
            </Space>
          </Card>
        </Col>
        <Col class="h-180px" :sm="24" :md="12">
          <Card title="加载中" class="h-full">
            <p class="pb-16px">按钮有加载状态。</p>
            <Space>
              <Button :loading="loading" type="primary" @click="startLoading">开始加载</Button>
              <Button @click="endLoading">取消加载</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { ButtonProps } from 'ant-design-vue';
import { Button, Card, Row, Col, Space } from 'ant-design-vue';
import { useLoading } from '@/hooks';

interface ButtonDetail {
  id: number;
  props: ButtonProps & { href?: string; target?: string };
  label?: string;
  icon?: string;
}

interface ButtonExample {
  id: number;
  label: string;
  buttons: ButtonDetail[];
  desc?: string;
}

const { loading, startLoading, endLoading } = useLoading();

const buttonExample: ButtonExample[] = [
  {
    id: 0,
    label: '基础',
    buttons: [
      {
        id: 0,
        props: {},
        label: 'Default'
      },
      {
        id: 2,
        props: { type: 'primary' },
        label: 'Primary'
      },
      {
        id: 3,
        props: { type: 'dashed' },
        label: 'Dashed'
      },
      {
        id: 4,
        props: { type: 'text' },
        label: 'Text'
      },
      {
        id: 5,
        props: { type: 'link' },
        label: 'Link'
      }
    ],
    desc: '按钮的 type 分别为 default、primary、dashed、text、link。'
  },
  {
    id: 4,
    label: '幽灵按钮',
    buttons: [
      {
        id: 0,
        props: {},
        label: 'Default'
      },
      {
        id: 2,
        props: { ghost: true, type: 'primary' },
        label: 'Primary'
      },
      {
        id: 3,
        props: { ghost: true, type: 'dashed' },
        label: 'Dashed'
      },
      {
        id: 4,
        props: { ghost: true, danger: true, type: 'primary' },
        label: 'Danger'
      }
    ]
  },
  {
    id: 5,
    label: '尺寸',
    buttons: [
      {
        id: 1,
        props: { size: 'small' },
        label: '小'
      },
      {
        id: 2,
        props: { size: 'middle' },
        label: '中'
      },
      {
        id: 3,
        props: { size: 'large' },
        label: '大'
      }
    ]
  },
  {
    id: 8,
    label: '按钮禁用',
    buttons: [
      {
        id: 0,
        props: {
          disabled: true
        },
        label: '不许点'
      }
    ],
    desc: '按钮可以被禁用'
  }
];
</script>

<style scoped></style>
