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
    auth: 'colctrl:identificationCode_dictText',
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
    title: '藏书室间数',
    align:"center",
    dataIndex: 'libraryNum'
   },
   {
    title: '藏书室总面积（m2）',
    align:"center",
    dataIndex: 'libraryArea'
   },
   {
    title: '阅览室面积（m2）',
    align:"center",
    dataIndex: 'readingRoomArea'
   },
   {
    title: '阅览室阅览桌（张）',
    align:"center",
    dataIndex: 'readingRoomTableNum'
   },
   {
    title: '藏书册数',
    align:"center",
    dataIndex: 'bookNum'
   },
   {
    title: '是否配备图书管理软件',
    align:"center",
    dataIndex: 'hasABookManagementSystem_dictText'
   },
   {
    title: '生均册数',
    align:"center",
    dataIndex: 'averageBooksPerStudent'
   },
   {
    title: '特色读书场所一名称',
    align:"center",
    dataIndex: 'firstFeaturedPlaceName'
   },
   {
    title: '特色读书场所一数量',
    align:"center",
    dataIndex: 'firstFeaturedPlaceNum'
   },
   {
    title: '特色读书场所一总面积（m2）',
    align:"center",
    dataIndex: 'firstFeaturedPlaceArea'
   },
   {
    title: '特色读书场所二名称',
    align:"center",
    dataIndex: 'secondFeaturedPlaceName'
   },
   {
    title: '特色读书场所二数量',
    align:"center",
    dataIndex: 'secondFeaturedPlaceNum'
   },
   {
    title: '特色读书场所二总面积（m2）',
    align:"center",
    dataIndex: 'secondFeaturedPlaceArea'
   },
   {
    title: '专职管理员姓名',
    align:"center",
    dataIndex: 'fullTimeAdminName'
   },
   {
    title: '兼职管理员姓名',
    align:"center",
    dataIndex: 'partTimeAdminName'
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
      ifShow: () => {
          const userStore = useUserStoreWithOut();
          const roles = userStore.getRoleList || [];
          // 这里根据实际角色返回布尔值
          return roles.some(role => ['admin', 'center_analysis'].includes(role));
      },
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
    label: '学校名称',
    field: 'identificationCode',
    defaultValue: userStore.getUserInfo.telephone,
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"organization_definition,institution_name,identification_code"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请选择学校名称!'},
          ];
     },
    dynamicDisabled:true,
  },
  {
    label: '填报日期',
    field: 'fillDate',
    defaultValue: dayjs(new Date()).format('YYYY-MM-DD'),
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入填报日期!'},
          ];
     },
     dynamicDisabled:true
  },
  {
    label: '藏书室间数',
    field: 'libraryNum',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 0,  // 设置为0表示只能输入整数
      step: 1,       // 步进值为1
      parser: (value: string) => {
        // 将输入值转换为非负整数
        return Math.max(0, parseInt(value) || 0);
      }
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '藏书室总面积（m2）',
    field: 'libraryArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '阅览室面积（m2）',
    field: 'readingRoomArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '阅览室阅览桌（张）',
    field: 'readingRoomTableNum',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 0,  // 设置为0表示只能输入整数
      step: 1,       // 步进值为1
      parser: (value: string) => {
        // 将输入值转换为非负整数
        return Math.max(0, parseInt(value) || 0);
      }
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '藏书册数',
    field: 'bookNum',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 0,  // 设置为0表示只能输入整数
      step: 1,       // 步进值为1
      parser: (value: string) => {
        // 将输入值转换为非负整数
        return Math.max(0, parseInt(value) || 0);
      }
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '是否配备图书管理软件',
    field: 'hasABookManagementSystem',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"yn"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入是否配备图书管理软件!'},
          ];
     },
  },
  {
    label: '生均册数',
    field: 'averageBooksPerStudent',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '特色读书场所一名称',
    field: 'firstFeaturedPlaceName',
    component: 'Input',
    rules: [
      { message: '请输入场所名称' },
    ],
  },
  {
    label: '特色读书场所一数量',
    field: 'firstFeaturedPlaceNum',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 0,  // 设置为0表示只能输入整数
      step: 1,       // 步进值为1
      parser: (value: string) => {
        // 将输入值转换为非负整数
        return Math.max(0, parseInt(value) || 0);
      }
    },
    rules: [
      { required: false, message: '请输入数量' },
    ],
  },
  {
    label: '特色读书场所一总面积（m2）',
    field: 'firstFeaturedPlaceArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { message: '请输入数量' },
    ],
  },
  {
    label: '特色读书场所二名称',
    field: 'secondFeaturedPlaceName',
    component: 'Input',
    rules: [
      { message: '请输入场所名称' },
    ],
  },
  {
    label: '特色读书场所二数量',
    field: 'secondFeaturedPlaceNum',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 0,  // 设置为0表示只能输入整数
      step: 1,       // 步进值为1
      parser: (value: string) => {
        // 将输入值转换为非负整数
        return Math.max(0, parseInt(value) || 0);
      }
    },
    rules: [
      { required: false, message: '请输入数量' },
    ],
  },
  {
    label: '特色读书场所二总面积（m2）',
    field: 'secondFeaturedPlaceArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { message: '请输入数量' },
    ],
  },
  {
    label: '专职管理员姓名',
    field: 'fullTimeAdminName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入专职管理员姓名!'},
          ];
     },
  },
  {
    label: '兼职管理员姓名',
    field: 'partTimeAdminName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入兼职管理员姓名!'},
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
