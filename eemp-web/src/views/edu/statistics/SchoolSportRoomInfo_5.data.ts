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
    title: '室内操场（风雨活动室）间数',
    align:"center",
    dataIndex: 'indoorPlaygroundNum'
   },
   {
    title: '室内操场（风雨活动室）面积（m2）',
    align:"center",
    dataIndex: 'indoorPlaygroundArea'
   },
   {
    title: '室外操场直跑道长度m',
    align:"center",
    dataIndex: 'straightTrackLength'
   },
   {
    title: '室外操场环形跑道周长m',
    align:"center",
    dataIndex: 'circularTrackCircumference'
   },
   {
    title: '室外操场操场是否硬化',
    align:"center",
    dataIndex: 'isThePlaygroundHardened_dictText'
   },
   {
    title: '室外操场是否有塑胶操场',
    align:"center",
    dataIndex: 'hasAPlasticPlayground_dictText'
   },
   {
    title: '室外操场是否有塑胶跑道',
    align:"center",
    dataIndex: 'hasAPlasticTrack_dictText'
   },
   {
    title: '室外操场蓝球场（个）',
    align:"center",
    dataIndex: 'basketballCourtNum'
   },
   {
    title: '室外操场排球场（个）',
    align:"center",
    dataIndex: 'volleyballCourtNum'
   },
   {
    title: '室外操场足球场面积（m2）',
    align:"center",
    dataIndex: 'soccerFieldArea'
   },
   {
    title: '室外操场操场面积（m2）',
    align:"center",
    dataIndex: 'playgroundArea'
   },
   {
    title: '体育器材室间数',
    align:"center",
    dataIndex: 'sportsEquipmentRoomNum'
   },
   {
    title: '体育器材室面积（m2）',
    align:"center",
    dataIndex: 'sportsEquipmentRoomArea'
   },
   {
    title: '体育器材室器材件数',
    align:"center",
    dataIndex: 'sportsEquipmentNum'
   },
   {
    title: '体质测试室间数',
    align:"center",
    dataIndex: 'sportsTestingRoomNum'
   },
   {
    title: '体质测试室面积（m2）',
    align:"center",
    dataIndex: 'sportsTestingRoomArea'
   },
   {
    title: '体质测试室器材件数',
    align:"center",
    dataIndex: 'sportsTestingEquipmentNum'
   },
   {
    title: '心理咨询室间数',
    align:"center",
    dataIndex: 'sportsCounselingRoomNum'
   },
   {
    title: '心理咨询室面积（m2）',
    align:"center",
    dataIndex: 'sportsCounselingRoomArea'
   },
   {
    title: '专职体育教师（人）',
    align:"center",
    dataIndex: 'fullTimePeTeacherNum'
   },
   {
    title: '兼职体育教师（人）',
    align:"center",
    dataIndex: 'partTimePeTeacherNum'
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
    label: '室内操场（风雨活动室）间数',
    field: 'indoorPlaygroundNum',
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
    label: '室内操场（风雨活动室）面积（m2）',
    field: 'indoorPlaygroundArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '室外操场直跑道长度m',
    field: 'straightTrackLength',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '室外操场环形跑道周长m',
    field: 'circularTrackCircumference',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '室外操场操场是否硬化',
    field: 'isThePlaygroundHardened',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"yn"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入室外操场操场是否硬化!'},
          ];
     },
  },
  {
    label: '室外操场是否有塑胶操场',
    field: 'hasAPlasticPlayground',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"yn"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入室外操场是否有塑胶操场!'},
          ];
     },
  },
  {
    label: '室外操场是否有塑胶跑道',
    field: 'hasAPlasticTrack',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"yn"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入室外操场是否有塑胶跑道!'},
          ];
     },
  },
  {
    label: '室外操场蓝球场（个）',
    field: 'basketballCourtNum',
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
    label: '室外操场排球场（个）',
    field: 'volleyballCourtNum',
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
    label: '室外操场足球场面积（m2）',
    field: 'soccerFieldArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '室外操场操场面积（m2）',
    field: 'playgroundArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '体育器材室间数',
    field: 'sportsEquipmentRoomNum',
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
    label: '体育器材室面积（m2）',
    field: 'sportsEquipmentRoomArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '体育器材室器材件数',
    field: 'sportsEquipmentNum',
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
    label: '体质测试室间数',
    field: 'sportsTestingRoomNum',
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
    label: '体质测试室面积（m2）',
    field: 'sportsTestingRoomArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '体质测试室器材件数',
    field: 'sportsTestingEquipmentNum',
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
    label: '心理咨询室间数',
    field: 'sportsCounselingRoomNum',
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
    label: '心理咨询室面积（m2）',
    field: 'sportsCounselingRoomArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '专职体育教师（人）',
    field: 'fullTimePeTeacherNum',
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
    label: '兼职体育教师（人）',
    field: 'partTimePeTeacherNum',
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