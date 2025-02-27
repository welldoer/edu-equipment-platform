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
    title: '损坏日期',
    align:"center",
    dataIndex: 'dateOfDamage',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '损坏仪器班级',
    align:"center",
    dataIndex: 'damagedInstrumentClass'
   },
   {
    title: '损坏仪器人姓名',
    align:"center",
    dataIndex: 'personDamagedTheInstrument'
   },
   {
    title: '损坏仪器名称',
    align:"center",
    dataIndex: 'damagedInstrument'
   },
   {
    title: '损坏仪器单位',
    align:"center",
    dataIndex: 'unit'
   },
   {
    title: '损坏仪器单价',
    align:"center",
    dataIndex: 'unitPrice'
   },
   {
    title: '损坏仪器数量',
    align:"center",
    dataIndex: 'quantity'
   },
   {
    title: '损坏仪器金额',
    align:"center",
    dataIndex: 'amount'
   },
   {
    title: '损坏（丢失）及其原因',
    align:"center",
    dataIndex: 'damageCause'
   },
   {
    title: '经手人',
    align:"center",
    dataIndex: 'operator'
   },
   {
    title: '赔偿记录',
    align:"center",
    dataIndex: 'claimRecord'
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
      label: "损坏仪器人姓名",
      field: 'personDamagedTheInstrument',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "损坏仪器名称",
      field: 'damagedInstrument',
      component: 'Input',
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
    label: '损坏日期',
    field: 'dateOfDamage',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入损坏日期!'},
          ];
     },
  },
  {
    label: '损坏仪器班级',
    field: 'damagedInstrumentClass',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入损坏仪器班级!'},
          ];
     },
  },
  {
    label: '损坏仪器人姓名',
    field: 'personDamagedTheInstrument',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入损坏仪器人姓名!'},
          ];
     },
  },
  {
    label: '损坏仪器名称',
    field: 'damagedInstrument',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入损坏仪器名称!'},
          ];
     },
  },
  {
    label: '损坏仪器单位',
    field: 'unit',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入损坏仪器单位!'},
          ];
     },
  },
  {
    label: '损坏仪器单价',
    field: 'unitPrice',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入损坏仪器单价!'},
                 { pattern: /^\d+\.?\d*$/, message: '请输入非负数!'},
          ];
     },
  },
  {
    label: '损坏仪器数量',
    field: 'quantity',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入损坏仪器数量!'},
                 { pattern: /^\d+$/, message: '请输入非负整数!'},
          ];
     },
  },
  {
    label: '损坏仪器金额',
    field: 'amount',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入损坏仪器金额!'},
                 { pattern: /^\d+\.?\d*$/, message: '请输入非负数!'},
          ];
     },
  },
  {
    label: '损坏（丢失）及其原因',
    field: 'damageCause',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入损坏（丢失）及其原因!'},
          ];
     },
  },
  {
    label: '经手人',
    field: 'operator',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入经手人!'},
          ];
     },
  },
  {
    label: '赔偿记录',
    field: 'claimRecord',
    component: 'InputTextArea',
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
