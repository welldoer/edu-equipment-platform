import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '标识代码',
    align:"center",
    dataIndex: 'identificationCode_dictText'
   },
   {
    title: '填报日期',
    align:"center",
    dataIndex: 'fillDate',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '分管领导姓名',
    align:"center",
    dataIndex: 'subLeaderName'
   },
   {
    title: '分管领导联系电话',
    align:"center",
    dataIndex: 'subLeaderPhoneNumber'
   },
   {
    title: '校园网络管理员姓名',
    align:"center",
    dataIndex: 'campusNetworkAdminName'
   },
   {
    title: '校园网络管理员联系电话',
    align:"center",
    dataIndex: 'campusNetworkPhoneNumber'
   },
   {
    title: '计算机室管理员姓名',
    align:"center",
    dataIndex: 'computerRoomAdminName'
   },
   {
    title: '计算机室管理员联系电话',
    align:"center",
    dataIndex: 'computerRoomPhoneNumber'
   },
   {
    title: '“班班通”管理员姓名',
    align:"center",
    dataIndex: 'classConnectAdminName'
   },
   {
    title: '“班班通”管理员联系电话',
    align:"center",
    dataIndex: 'classConnectPhoneNumber'
   },
   {
    title: '智慧教育平台管理员姓名',
    align:"center",
    dataIndex: 'smartEducationAdminName'
   },
   {
    title: '智慧教育平台管理员联系电话',
    align:"center",
    dataIndex: 'smartEducationPhoneNumber'
   },
   {
    title: '宣传平台名称',
    align:"center",
    dataIndex: 'propagandaPlatformName'
   },
   {
    title: '宣传平台责任人',
    align:"center",
    dataIndex: 'propagandaPlatformOwner'
   },
   {
    title: '本年设备维护投入资金（万元）',
    align:"center",
    dataIndex: 'equipmentFundsThisYear'
   },
   {
    title: '信息技术专职教师人数',
    align:"center",
    dataIndex: 'fullTimeTeacherNum'
   },
   {
    title: '信息技术兼职教师人数',
    align:"center",
    dataIndex: 'partTimeTeacherNum'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "标识代码",
      field: 'identificationCode',
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"organization_definition,institution_name,identification_code"
      },
      colProps: {span: 6},
 	},
	{
      label: "填报日期",
      field: 'fillDate',
      component: 'DatePicker',
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '标识代码',
    field: 'identificationCode',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"organization_definition,institution_name,identification_code"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入标识代码!'},
          ];
     },
  },
  {
    label: '填报日期',
    field: 'fillDate',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入填报日期!'},
          ];
     },
  },
  {
    label: '分管领导姓名',
    field: 'subLeaderName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入分管领导姓名!'},
          ];
     },
  },
  {
    label: '分管领导联系电话',
    field: 'subLeaderPhoneNumber',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入分管领导联系电话!'},
          ];
     },
  },
  {
    label: '校园网络管理员姓名',
    field: 'campusNetworkAdminName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入校园网络管理员姓名!'},
          ];
     },
  },
  {
    label: '校园网络管理员联系电话',
    field: 'campusNetworkPhoneNumber',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入校园网络管理员联系电话!'},
          ];
     },
  },
  {
    label: '计算机室管理员姓名',
    field: 'computerRoomAdminName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入计算机室管理员姓名!'},
          ];
     },
  },
  {
    label: '计算机室管理员联系电话',
    field: 'computerRoomPhoneNumber',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入计算机室管理员联系电话!'},
          ];
     },
  },
  {
    label: '“班班通”管理员姓名',
    field: 'classConnectAdminName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入“班班通”管理员姓名!'},
          ];
     },
  },
  {
    label: '“班班通”管理员联系电话',
    field: 'classConnectPhoneNumber',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入“班班通”管理员联系电话!'},
          ];
     },
  },
  {
    label: '智慧教育平台管理员姓名',
    field: 'smartEducationAdminName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入智慧教育平台管理员姓名!'},
          ];
     },
  },
  {
    label: '智慧教育平台管理员联系电话',
    field: 'smartEducationPhoneNumber',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入智慧教育平台管理员联系电话!'},
          ];
     },
  },
  {
    label: '宣传平台名称',
    field: 'propagandaPlatformName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入宣传平台名称!'},
          ];
     },
  },
  {
    label: '宣传平台责任人',
    field: 'propagandaPlatformOwner',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入宣传平台责任人!'},
          ];
     },
  },
  {
    label: '本年设备维护投入资金（万元）',
    field: 'equipmentFundsThisYear',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入本年设备维护投入资金（万元）!'},
          ];
     },
  },
  {
    label: '信息技术专职教师人数',
    field: 'fullTimeTeacherNum',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入信息技术专职教师人数!'},
          ];
     },
  },
  {
    label: '信息技术兼职教师人数',
    field: 'partTimeTeacherNum',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入信息技术兼职教师人数!'},
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