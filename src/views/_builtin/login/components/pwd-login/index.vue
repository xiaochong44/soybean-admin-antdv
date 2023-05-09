<template>
  <Form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <FormItem name="userName">
      <Input v-model:value="model.userName" placeholder="请输入用户名" />
    </FormItem>
    <FormItem name="password">
      <Input v-model:value="model.password" type="password" show-password-on="click" placeholder="请输入密码" />
    </FormItem>
    <div>
      <div class="flex-y-center justify-between">
        <Checkbox v-model:checked="rememberMe">记住我</Checkbox>
      </div>
      <Button
        class="mt-6"
        type="primary"
        size="large"
        :block="true"
        :round="true"
        :loading="auth.loginLoading"
        @click="handleSubmit"
      >
        确定
      </Button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { Input, Button, Form, Checkbox } from 'ant-design-vue';
import { useAuthStore } from '@/store';
import { formRules, createAntRequiredFormRule } from '@/utils';

const FormItem = Form.Item;
const auth = useAuthStore();
const { login } = useAuthStore();

const formRef = ref<HTMLElement & FormInstance>();

const model = reactive({
  userName: 'Soybean',
  password: 'soybean123'
});

const rules = {
  password: formRules.pwd,
  userName: createAntRequiredFormRule('请输入用户名')
};

const rememberMe = ref(false);

async function handleSubmit() {
  await formRef.value?.validate();

  const { userName, password } = model;

  login(userName, password);
}
</script>

<style scoped></style>
