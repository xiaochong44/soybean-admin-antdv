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
    <FormItem name="pwd">
      <Input v-model:value="model.pwd" type="password" show-password-on="click" placeholder="密码" />
    </FormItem>
    <FormItem name="confirmPwd">
      <Input v-model:value="model.confirmPwd" type="password" show-password-on="click" placeholder="确认密码" />
    </FormItem>
    <div>
      <login-agreement v-model:value="agreement" />
      <Button class="mt-18px" type="primary" size="large" :block="true" :round="true" @click="handleSubmit"
        >确定</Button
      >
      <Button class="mt-18px" size="large" :block="true" :round="true" @click="toLoginModule('pwd-login')">返回</Button>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { Form, FormItem, Input, Button, message } from 'ant-design-vue';
import { useRouterPush } from '@/composables';
import { useSmsCode } from '@/hooks';
import { formRules, getConfirmPwdRule } from '@/utils';

const { toLoginModule } = useRouterPush();
const { label, isCounting, loading: smsLoading, start } = useSmsCode();

const formRef = ref<HTMLElement & FormInstance>();

const model = reactive({
  phone: '',
  code: '',
  pwd: '',
  confirmPwd: ''
});

const rules = {
  phone: formRules.phone,
  code: formRules.code,
  pwd: formRules.pwd,
  confirmPwd: getConfirmPwdRule(toRefs(model).pwd)
};

const agreement = ref(false);

function handleSmsCode() {
  start();
}

async function handleSubmit() {
  await formRef.value?.validate();
  message.success('验证成功!');
}
</script>

<style scoped></style>
