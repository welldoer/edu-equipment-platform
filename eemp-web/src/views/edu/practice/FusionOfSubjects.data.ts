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
    title: '日期',
    align:"center",
    dataIndex: 'courseDate',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '节次',
    align:"center",
    dataIndex: 'section'
   },
   {
    title: '学科',
    align:"center",
    dataIndex: 'subject'
   },
   {
    title: '内容',
    align:"center",
    dataIndex: 'content'
   },
   {
    title: '方式',
    align:"center",
    dataIndex: 'style'
   },
   {
    title: '执教',
    align:"center",
    dataIndex: 'coach'
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
      label: "学科",
      field: 'subject',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "执教",
      field: 'coach',
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
    label: '日期',
    field: 'courseDate',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入日期!'},
          ];
     },
  },
  {
    label: '节次',
    field: 'section',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入节次!'},
          ];
     },
  },
  {
    label: '学科',
    field: 'subject',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入学科!'},
          ];
     },
  },
  {
    label: '内容',
    field: 'content',
    component: 'InputTextArea',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入内容!'},
          ];
     },
  },
  {
    label: '方式',
    field: 'style',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入方式!'},
          ];
     },
  },
  {
    label: '执教',
    field: 'coach',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入执教!'},
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
