import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { useUserStoreWithOut } from "/@/store/modules/user";
import dayjs from 'dayjs';

const userStore = useUserStoreWithOut();

//列表数据
export const columns: BasicColumn[] = [
   {
    title: '学校名称',
    align:"center",
    dataIndex: 'identificationCode_dictText',
    auth: 'auth-column-school-name',
   },
   {
    title: '实验名称',
    align:"center",
    dataIndex: 'experimentName'
   },
   {
    title: '实验时间',
    align:"center",
    dataIndex: 'planningTime'
   },
   {
    title: '实验次数',
    align:"center",
    dataIndex: 'taskNumber'
   },
   {
    title: '实验形式',
    align:"center",
    dataIndex: 'exactForm_dictText'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "学校名称",
      field: 'identificationCode',
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"organization_definition,institution_name,identification_code"
      },
      colProps: {span: 6},
 	},
	{
      label: "实验名称",
      field: 'experimentName',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "实验形式",
      field: 'exactForm',
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"experimental_form"
      },
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '学校名称',
    field: 'identificationCode',
    defaultValue: userStore.getUserInfo.telephone,
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"organization_definition,institution_name,identification_code"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入学校名称!'},
          ];
     },
     dynamicDisabled:true
  },
  {
    label: '实验名称',
    field: 'experimentName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入实验名称!'},
          ];
     },
  },
  {
    label: '实验时间',
    field: 'planningTime',
    component: 'InputNumber',
    componentProps:{
        placeholder: '请输入实验对应周次',
    },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入实验对应周次!'},
                 { pattern: /^\d+$/, message: '请输入非负整数!'},
          ];
     },
  },
  {
    label: '实验次数',
    field: 'taskNumber',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入实验次数!'},
                 { pattern: /^\d+$/, message: '请输入非负整数!'},
          ];
     },
  },
  {
    label: '实验形式',
    field: 'exactForm',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"experimental_form",
        type: 'radio',
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入实验形式!'},
          ];
     },
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];



/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
