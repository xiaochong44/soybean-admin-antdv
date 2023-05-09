<template>
  <Form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <FormItem name="phone">
      <Input v-model:value="model.phone" placeholder="手机号码" />
    </FormItem>
    <FormItem name="code">
      <div class="flex-y-center w-full">
        <Input v-model:value="model.code" placeholder="验证码" />
        <div class="w-18px"></div>
        <Button size="large" :disabled="isCounting" :loading="smsLoading" @click="handleSmsCode">
          {{ label }}
        </Button>
      </div>
    </FormItem>
    <div>
      <Button type="primary" size="large" block @click="handleSubmit">确定</Button>
      <Button class="mt-4" size="large" block @click="toLoginModule('pwd-login')">返回</Button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { Form, Button, Input, message } from 'ant-design-vue';
import { useRouterPush } from '@/composables';
import { useSmsCode } from '@/hooks';
import { formRules } from '@/utils';

const FormItem = Form.Item;
const { toLoginModule } = useRouterPush();
const { label, isCounting, loading: smsLoading, getSmsCode } = useSmsCode();

const formRef = ref<HTMLElement & FormInstance>();

const model = reactive({
  phone: '',
  code: '',
  imgCode: ''
});

const rules = {
  phone: formRules.phone,
  code: formRules.code
};

function handleSmsCode() {
  getSmsCode(model.phone);
}

async function handleSubmit() {
  await formRef.value?.validate();
  message.success('验证成功!');
}
</script>

<style scoped></style>
