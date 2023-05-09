<template>
  <Modal v-model:open="modalVisible" :title="title" width="700px" @cancel="closeModal" @ok="handleSubmit">
    <Form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
      <Row :gutter="18">
        <Col :span="12">
          <FormItem label="用户名" name="userName">
            <Input v-model:value="formModel.userName" />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="年龄" name="age">
            <InputNumber v-model:value="formModel.age" clearable />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="性别" name="gender">
            <RadioGroup v-model:value="formModel.gender">
              <Radio v-for="item in genderOptions" :key="item.value" :value="item.value">{{ item.label }}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="手机号" name="phone">
            <Input v-model:value="formModel.phone" />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="邮箱" name="email">
            <Input v-model:value="formModel.email" />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="状态" name="userStatus">
            <Select v-model:value="formModel.userStatus" :options="userStatusOptions" />
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import {
  Form,
  FormItem,
  Input,
  Select,
  Radio,
  Modal,
  RadioGroup,
  InputNumber,
  Row,
  Col,
  message
} from 'ant-design-vue';
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { genderOptions, userStatusOptions } from '@/constants';
import { formRules, createAntRequiredFormRule } from '@/utils';

export interface Props {
  /** 弹窗可见性 */
  visible: boolean;
  /**
   * 弹窗类型
   * add: 新增
   * edit: 编辑
   */
  type?: 'add' | 'edit';
  /** 编辑的表格行数据 */
  editData?: UserManagement.User | null;
}

export type ModalType = NonNullable<Props['type']>;

defineOptions({ name: 'TableActionModal' });

const props = withDefaults(defineProps<Props>(), {
  type: 'add',
  editData: null
});

interface Emits {
  (e: 'update:visible', visible: boolean): void;
}

const emit = defineEmits<Emits>();

const modalVisible = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    emit('update:visible', visible);
  }
});
const closeModal = () => {
  modalVisible.value = false;
};

const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: '添加用户',
    edit: '编辑用户'
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInstance>();

type FormModel = Pick<UserManagement.User, 'userName' | 'age' | 'gender' | 'phone' | 'email' | 'userStatus'>;

const formModel = reactive<FormModel>(createDefaultFormModel());

const rules: Record<keyof FormModel, Rule | Rule[]> = {
  userName: createAntRequiredFormRule('请输入用户名'),
  age: createAntRequiredFormRule('请输入年龄'),
  gender: createAntRequiredFormRule('请选择性别'),
  phone: formRules.phone,
  email: formRules.email,
  userStatus: createAntRequiredFormRule('请选择用户状态')
};

function createDefaultFormModel(): FormModel {
  return {
    userName: '',
    phone: ''
  };
}

function handleUpdateFormModel(model: Partial<FormModel>) {
  Object.assign(formModel, model);
}

function handleUpdateFormModelByModalType() {
  const handlers: Record<ModalType, () => void> = {
    add: () => {
      const defaultFormModel = createDefaultFormModel();
      handleUpdateFormModel(defaultFormModel);
    },
    edit: () => {
      if (props.editData) {
        handleUpdateFormModel(props.editData);
      }
    }
  };

  handlers[props.type]();
}

async function handleSubmit() {
  await formRef.value?.validate();
  message.success('新增成功!');
  closeModal();
}

watch(
  () => props.visible,
  newValue => {
    if (newValue) {
      handleUpdateFormModelByModalType();
    }
  }
);
</script>

<style scoped></style>
