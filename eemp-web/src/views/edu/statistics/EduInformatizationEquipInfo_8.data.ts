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
    title: '班级数',
    align:"center",
    dataIndex: 'classesNum'
   },
   {
    title: '学生计算机室现有计算机总数',
    align:"center",
    dataIndex: 'studentComputerNum'
   },
   {
    title: '学生计算机室2018年前台配备数',
    align:"center",
    dataIndex: 'studentComputerNumBef2018'
   },
   {
    title: '学生计算机室2018年后配备数',
    align:"center",
    dataIndex: 'studentComputerNumAft2018'
   },
   {
    title: '教师办公计算机总台数',
    align:"center",
    dataIndex: 'teacherComputerNum'
   },
   {
    title: '教师办公计算机2015年及以前配备台数',
    align:"center",
    dataIndex: 'teacherComputerNumBef2016'
   },
   {
    title: '教师办公计算机2016年至2019年配备数量',
    align:"center",
    dataIndex: 'teacherComputerNum20162019'
   },
   {
    title: '教师办公计算机2020年及以后配备数量',
    align:"center",
    dataIndex: 'teacherComputerNumAft2020'
   },
   {
    title: '“班班通”智能触控一体机数',
    align:"center",
    dataIndex: 'allInOneMachineNum'
   },
   {
    title: '“班班通”电脑＋电视机',
    align:"center",
    dataIndex: 'computerPlusTvNum'
   },
   {
    title: '“班班通”视频展示台数量',
    align:"center",
    dataIndex: 'videoVisualizerNum'
   },
   {
    title: '无班班通设备班级数',
    align:"center",
    dataIndex: 'classNumWithoutEquip'
   },
   {
    title: '校园网主干线是否达到千兆(是或否)',
    align:"center",
    dataIndex: 'isTheBackboneGigabit_dictText'
   },
   {
    title: '校园网是否建有AP专网(是或否)',
    align:"center",
    dataIndex: 'hasADedicatedApNetwork_dictText'
   },
   {
    title: '校园网无线AP数量',
    align:"center",
    dataIndex: 'wirelessApNum'
   },
   {
    title: '校园监控摄像头数',
    align:"center",
    dataIndex: 'campusSurveillanceCameraNum'
   },
   {
    title: '校园监控硬盘录像机数',
    align:"center",
    dataIndex: 'campusSurveillanceDvrNum'
   },
   {
    title: '校园监控留存时间(天)',
    align:"center",
    dataIndex: 'surveillanceRetentionTime'
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
    label: '班级数',
    field: 'classesNum',
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
    label: '学生计算机室现有计算机总数',
    field: 'studentComputerNum',
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
    label: '学生计算机室2018年前台配备数',
    field: 'studentComputerNumBef2018',
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
    label: '学生计算机室2018年后配备数',
    field: 'studentComputerNumAft2018',
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
    label: '教师办公计算机总台数',
    field: 'teacherComputerNum',
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
    label: '教师办公计算机2015年及以前配备台数',
    field: 'teacherComputerNumBef2016',
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
    label: '教师办公计算机2016年至2019年配备数量',
    field: 'teacherComputerNum20162019',
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
    label: '教师办公计算机2020年及以后配备数量',
    field: 'teacherComputerNumAft2020',
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
    label: '“班班通”智能触控一体机数',
    field: 'allInOneMachineNum',
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
    label: '“班班通”电脑＋电视机',
    field: 'computerPlusTvNum',
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
    label: '“班班通”视频展示台数量',
    field: 'videoVisualizerNum',
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
    label: '无班班通设备班级数',
    field: 'classNumWithoutEquip',
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
    label: '校园网主干线是否达到千兆(是或否)',
    field: 'isTheBackboneGigabit',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"yn"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入校园网主干线是否达到千兆(是或否)!'},
          ];
     },
  },
  {
    label: '校园网是否建有AP专网(是或否)',
    field: 'hasADedicatedApNetwork',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"yn"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入校园网是否建有AP专网(是或否)!'},
          ];
     },
  },
  {
    label: '校园网无线AP数量',
    field: 'wirelessApNum',
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
    label: '校园监控摄像头数',
    field: 'campusSurveillanceCameraNum',
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
    label: '校园监控硬盘录像机数',
    field: 'campusSurveillanceDvrNum',
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
    label: '校园监控留存时间(天)',
    field: 'surveillanceRetentionTime',
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
