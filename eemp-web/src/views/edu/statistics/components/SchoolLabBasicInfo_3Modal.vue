<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="800" @ok="handleSubmit">
    <div class="modal-form-container">
        <BasicForm @register="registerForm"/>
        <Divider type="vertical" class="form-divider" />
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
    import {ref, computed, unref} from 'vue';
    import {BasicModal, useModalInner} from '/@/components/Modal';
    import {BasicForm, useForm} from '/@/components/Form/index';
    import {formSchema, processFormData} from '../SchoolLabBasicInfo_3.data';
    import {saveOrUpdate} from '../SchoolLabBasicInfo_3.api';
    import { Divider } from 'ant-design-vue';
    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    // 定义统一的表单布局配置
    const formProps = {
        labelCol: { 
        span: 16,
        style: {
            textAlign: 'left',
            paddingRight: '10px'
        }
        },
        wrapperCol: {
            span: 8 
        }
    };
    //表单配置
    const [registerForm, {setProps,resetFields, setFieldsValue, validate}] = useForm({
        //labelWidth: 150,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: {
            span: 12,
            style: {
                padding: '0 12px',
            },
        },
        ...formProps,   // 应用统一的布局配置
    });
    //表单赋值
    const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
        //重置表单
        await resetFields();
        setModalProps({
            confirmLoading: false,
            showCancelBtn:!!data?.showFooter,
            showOkBtn:!!data?.showFooter,
            okText: '确定并保存',
        });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
            //表单赋值
            await setFieldsValue({
                ...data.record,
            });
        }
        // 隐藏底部时禁用整个表单
       setProps({ disabled: !data?.showFooter })
    });
    //设置标题
    const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
    //表单提交事件
    async function handleSubmit(v) {
        try {
            let values = await validate();
            values = processFormData(values);
            setModalProps({confirmLoading: true});
            //提交表单
            await saveOrUpdate(values, isUpdate.value);
            //关闭弹窗
            closeModal();
            //刷新列表
            emit('success');
        } finally {
            setModalProps({confirmLoading: false});
        }
    }
</script>

<style lang="less" scoped>
	/** 时间和数字输入框样式 */
  :deep(.ant-input-number){
		width: 100%
	}

	:deep(.ant-calendar-picker){
		width: 100%
	}
.modal-form-container {
  position: relative;
  padding: 12px 0;
}

:deep(.form-divider) {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  height: 100%;
  margin: 0;
  transform: translateX(-50%);
//   border-left: 1px solid #d9d9d9; // 实线
  // 或者使用虚线：
  border-left: 1px dashed #797979; // #020202;
}
</style>
