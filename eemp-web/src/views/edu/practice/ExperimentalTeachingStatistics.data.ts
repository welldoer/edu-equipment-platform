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
    title: '实验科目',
    align:"center",
    dataIndex: 'subject'
   },
   {
    title: '实验形式',
    align:"center",
    dataIndex: 'exactForm_dictText'
   },
   {
    title: '开始时间',
    align:"center",
    dataIndex: 'startDate',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '结束时间',
    align:"center",
    dataIndex: 'endDate',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '应完成实验（次）',
    align:"center",
    dataIndex: 'totalNumberOfExperiments'
   },
   {
    title: '实际完成实验（次）',
    align:"center",
    dataIndex: 'actualCompletions'
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
      label: "实验科目",
      field: 'subject',
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
    component: 'JDictSelectTag',
    defaultValue: userStore.getUserInfo.telephone,
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
    label: '实验科目',
    field: 'subject',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入实验科目!'},
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
  {
    label: '开始时间',
    field: 'startDate',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入开始时间!'},
          ];
     },
  },
  {
    label: '结束时间',
    field: 'endDate',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入结束时间!'},
          ];
     },
  },
  {
    label: '应完成实验（次）',
    field: 'totalNumberOfExperiments',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入应完成实验（次）!'},
                 { pattern: /^\d+$/, message: '请输入非负整数!'},
          ];
     },
  },
  {
    label: '实际完成实验（次）',
    field: 'actualCompletions',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入实际完成实验（次）!'},
                 { pattern: /^\d+$/, message: '请输入非负整数!'},
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
