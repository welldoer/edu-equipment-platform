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
    title: '实验日期',
    align:"center",
    dataIndex: 'dateOfExperiment',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '上课教师',
    align:"center",
    dataIndex: 'teacher'
   },
   {
    title: '学生人数',
    align:"center",
    dataIndex: 'studentNumber'
   },
   {
    title: '实验形式',
    align:"center",
    dataIndex: 'exactForm_dictText'
   },
   {
    title: '开出组数',
    align:"center",
    dataIndex: 'groupQuantity'
   },
   {
    title: '实验内容',
    align:"center",
    dataIndex: 'experimentContent'
   },
   {
    title: '实验器材',
    align:"center",
    dataIndex: 'experimentEquipment'
   },
   {
    title: '实验过程记录',
    align:"center",
    dataIndex: 'processRecord'
   },
   {
    title: '仪器设备使用情况',
    align:"center",
    dataIndex: 'useOfInstruments'
   },
   {
    title: '实验结果及评价',
    align:"center",
    dataIndex: 'resultsAndEvaluation'
   },
   {
    title: '实验员',
    align:"center",
    dataIndex: 'laboratoryTechnician'
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
      label: "实验日期",
      field: 'dateOfExperiment',
      component: 'DatePicker',
      colProps: {span: 6},
 	},
	{
      label: "上课教师",
      field: 'teacher',
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
    label: '实验日期',
    field: 'dateOfExperiment',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入实验日期!'},
          ];
     },
  },
  {
    label: '上课教师',
    field: 'teacher',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入上课教师!'},
          ];
     },
  },
  {
    label: '学生人数',
    field: 'studentNumber',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入学生人数!'},
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
  {
    label: '开出组数',
    field: 'groupQuantity',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入开出组数!'},
                 { pattern: /^\d+$/, message: '请输入非负整数!'},
          ];
     },
  },
  {
    label: '实验内容',
    field: 'experimentContent',
    component: 'InputTextArea',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入实验内容!'},
          ];
     },
  },
  {
    label: '实验器材',
    field: 'experimentEquipment',
    component: 'InputTextArea',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入实验器材!'},
          ];
     },
  },
  {
    label: '实验过程记录',
    field: 'processRecord',
    component: 'InputTextArea',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入实验过程记录!'},
          ];
     },
  },
  {
    label: '仪器设备使用情况',
    field: 'useOfInstruments',
    component: 'InputTextArea',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入仪器设备使用情况!'},
          ];
     },
  },
  {
    label: '实验结果及评价',
    field: 'resultsAndEvaluation',
    component: 'InputTextArea',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入实验结果及评价!'},
          ];
     },
  },
  {
    label: '实验员',
    field: 'laboratoryTechnician',
    component: 'Input',
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
