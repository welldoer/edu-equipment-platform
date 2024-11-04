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
    title: '音乐器材室间数',
    align:"center",
    dataIndex: 'musicEquipmentRoomNum'
   },
   {
    title: '音乐器材室面积（m2）',
    align:"center",
    dataIndex: 'musicEquipmentRoomArea'
   },
   {
    title: '音乐器材室器材件数',
    align:"center",
    dataIndex: 'musicEquipmentNum'
   },
   {
    title: '音乐教室间数',
    align:"center",
    dataIndex: 'musicClassroomNum'
   },
   {
    title: '音乐教室面积（m2）',
    align:"center",
    dataIndex: 'musicClassroomArea'
   },
   {
    title: '舞蹈室间数',
    align:"center",
    dataIndex: 'musicDanceRoomNum'
   },
   {
    title: '舞蹈室面积（m2）',
    align:"center",
    dataIndex: 'musicDanceRoomArea'
   },
   {
    title: '专职音乐教师（人）',
    align:"center",
    dataIndex: 'fullTimeMusicTeacherNum'
   },
   {
    title: '兼职音乐教师（人）',
    align:"center",
    dataIndex: 'partTimeMusicTeacherNum'
   },
   {
    title: '美术教室间数',
    align:"center",
    dataIndex: 'artClassroomNum'
   },
   {
    title: '美术教室面积（m2）',
    align:"center",
    dataIndex: 'artClassroomArea'
   },
   {
    title: '美术器材室间数',
    align:"center",
    dataIndex: 'artEquipmentNum'
   },
   {
    title: '美术器材室面积（m2）',
    align:"center",
    dataIndex: 'artEquipmentArea'
   },
   {
    title: '专职美术教师（人）',
    align:"center",
    dataIndex: 'fullTimeArtTeacherNum'
   },
   {
    title: '兼职美术教师（人）',
    align:"center",
    dataIndex: 'partTimeArtTeacherNum'
   },
   {
    title: '书法教室间数',
    align:"center",
    dataIndex: 'calligraphyClassroomNum'
   },
   {
    title: '书法教室面积（m2）',
    align:"center",
    dataIndex: 'calligraphyClassroomArea'
   },
   {
    title: '书法教室桌椅数（张）',
    align:"center",
    dataIndex: 'calligraphyDeskNum'
   },
   {
    title: '是否配备书法软件系统',
    align:"center",
    dataIndex: 'hasACalligraphySystem_dictText'
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
    label: '音乐器材室间数',
    field: 'musicEquipmentRoomNum',
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
    label: '音乐器材室面积（m2）',
    field: 'musicEquipmentRoomArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '音乐器材室器材件数',
    field: 'musicEquipmentNum',
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
    label: '音乐教室间数',
    field: 'musicClassroomNum',
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
    label: '音乐教室面积（m2）',
    field: 'musicClassroomArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '舞蹈室间数',
    field: 'musicDanceRoomNum',
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
    label: '舞蹈室面积（m2）',
    field: 'musicDanceRoomArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '专职音乐教师（人）',
    field: 'fullTimeMusicTeacherNum',
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
    label: '兼职音乐教师（人）',
    field: 'partTimeMusicTeacherNum',
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
    label: '美术教室间数',
    field: 'artClassroomNum',
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
    label: '美术教室面积（m2）',
    field: 'artClassroomArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '美术器材室间数',
    field: 'artEquipmentNum',
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
    label: '美术器材室面积（m2）',
    field: 'artEquipmentArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '专职美术教师（人）',
    field: 'fullTimeArtTeacherNum',
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
    label: '兼职美术教师（人）',
    field: 'partTimeArtTeacherNum',
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
    label: '书法教室间数',
    field: 'calligraphyClassroomNum',
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
    label: '书法教室面积（m2）',
    field: 'calligraphyClassroomArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
  },
  {
    label: '书法教室桌椅数（张）',
    field: 'calligraphyDeskNum',
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
    label: '是否配备书法软件系统',
    field: 'hasACalligraphySystem',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"yn"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入是否配备书法软件系统!'},
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