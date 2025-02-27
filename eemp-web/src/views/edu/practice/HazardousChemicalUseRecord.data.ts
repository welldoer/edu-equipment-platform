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
    title: '领取日期',
    align:"center",
    dataIndex: 'collectionDate',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '药品名称',
    align:"center",
    dataIndex: 'drugName'
   },
   {
    title: '药品用途',
    align:"center",
    dataIndex: 'drugUse'
   },
   {
    title: '用量单位',
    align:"center",
    dataIndex: 'unitOfUsage'
   },
   {
    title: '领取数量',
    align:"center",
    dataIndex: 'quantityClaimed'
   },
   {
    title: '领取人',
    align:"center",
    dataIndex: 'receiptor'
   },
   {
    title: '剩余药品返回日期',
    align:"center",
    dataIndex: 'returnDate',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '剩余药品返回数量',
    align:"center",
    dataIndex: 'quantityReturned'
   },
   {
    title: '剩余药品返回处理方法',
    align:"center",
    dataIndex: 'disposalMethod'
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
      label: "药品名称",
      field: 'drugName',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "领取人",
      field: 'receiptor',
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
    label: '领取日期',
    field: 'collectionDate',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入领取日期!'},
          ];
     },
  },
  {
    label: '药品名称',
    field: 'drugName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入药品名称!'},
          ];
     },
  },
  {
    label: '药品用途',
    field: 'drugUse',
    component: 'InputTextArea',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入药品用途!'},
          ];
     },
  },
  {
    label: '用量单位',
    field: 'unitOfUsage',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入用量单位!'},
          ];
     },
  },
  {
    label: '领取数量',
    field: 'quantityClaimed',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入领取数量!'},
                 { pattern: /^\d+\.?\d*$/, message: '请输入非负数!'},
          ];
     },
  },
  {
    label: '领取人',
    field: 'receiptor',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入领取人!'},
          ];
     },
  },
  {
    label: '剩余药品返回日期',
    field: 'returnDate',
    component: 'DatePicker',
  },
  {
    label: '剩余药品返回数量',
    field: 'quantityReturned',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { pattern: /^\d+\.?\d*$/, message: '请输入非负数!'},
          ];
     },
  },
  {
    label: '剩余药品返回处理方法',
    field: 'disposalMethod',
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
