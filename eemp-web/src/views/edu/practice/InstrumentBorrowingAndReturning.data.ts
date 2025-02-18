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
    title: '借用时间',
    align:"center",
    dataIndex: 'borrowingTime',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '仪器名称及型号',
    align:"center",
    dataIndex: 'instrumentNameAndModel'
   },
   {
    title: '数量',
    align:"center",
    dataIndex: 'quantity'
   },
   {
    title: '用途',
    align:"center",
    dataIndex: 'purpose'
   },
   {
    title: '借用人',
    align:"center",
    dataIndex: 'borrower'
   },
   {
    title: '归还日期',
    align:"center",
    dataIndex: 'dateOfReturn',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '签收人',
    align:"center",
    dataIndex: 'recipient'
   },
   {
    title: '备注',
    align:"center",
    dataIndex: 'notes'
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
      label: "仪器名称及型号",
      field: 'instrumentNameAndModel',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "借用人",
      field: 'borrower',
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
    label: '借用时间',
    field: 'borrowingTime',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入借用时间!'},
          ];
     },
  },
  {
    label: '仪器名称及型号',
    field: 'instrumentNameAndModel',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入仪器名称及型号!'},
          ];
     },
  },
  {
    label: '数量',
    field: 'quantity',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入数量!'},
          ];
     },
  },
  {
    label: '用途',
    field: 'purpose',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入用途!'},
          ];
     },
  },
  {
    label: '借用人',
    field: 'borrower',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入借用人!'},
          ];
     },
  },
  {
    label: '归还日期',
    field: 'dateOfReturn',
    component: 'DatePicker',
  },
  {
    label: '签收人',
    field: 'recipient',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'notes',
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
