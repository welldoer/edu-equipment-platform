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
    title: '物理实验室间数',
    align:"center",
    dataIndex: 'physicsLabRoomNum'
   },
   {
    title: '物理实验室面积',
    align:"center",
    dataIndex: 'physicsLabArea'
   },
   {
    title: '物理实验室实验桌(张)',
    align:"center",
    dataIndex: 'physicsLabBenchNum'
   },
   {
    title: '物理器材、准备室间数',
    align:"center",
    dataIndex: 'physicsEquipmentRoomNum'
   },
   {
    title: '物理器材、准备室面积',
    align:"center",
    dataIndex: 'physicsEquipmentRoomArea'
   },
   {
    title: '物理器材、准备室仪器柜(口)',
    align:"center",
    dataIndex: 'physicsEquipmentCabinetNum'
   },
   {
    title: '物理器材、准备室准备台(个)',
    align:"center",
    dataIndex: 'physicsEquipmentBenchNum'
   },
   {
    title: '化学（生化）实验室间数',
    align:"center",
    dataIndex: 'biochemistryLabRoomNum'
   },
   {
    title: '化学（生化）实验室面积',
    align:"center",
    dataIndex: 'biochemistryLabArea'
   },
   {
    title: '化学（生化）实验室实验桌(张)',
    align:"center",
    dataIndex: 'biochemistryLabBenchNum'
   },
   {
    title: '化学（生化）器材、准备室间数',
    align:"center",
    dataIndex: 'biochemistryEquipRoomNum'
   },
   {
    title: '化学（生化）器材、准备室面积',
    align:"center",
    dataIndex: 'biochemistryEquipRoomArea'
   },
   {
    title: '化学（生化）器材、准备室仪器柜(口)',
    align:"center",
    dataIndex: 'biochemistryEquipCabinetNum'
   },
   {
    title: '化学（生化）器材、准备室准备台(个)',
    align:"center",
    dataIndex: 'biochemistryEquipBenchNum'
   },
   {
    title: '科学实验室间数',
    align:"center",
    dataIndex: 'scienceLabRoomNum'
   },
   {
    title: '科学实验室面积',
    align:"center",
    dataIndex: 'scienceLabArea'
   },
   {
    title: '科学实验室实验桌(张)',
    align:"center",
    dataIndex: 'scienceLabBenchNum'
   },
   {
    title: '科学器材、准备室间数',
    align:"center",
    dataIndex: 'scienceEquipmentRoomNum'
   },
   {
    title: '科学器材、准备室面积',
    align:"center",
    dataIndex: 'scienceEquipmentRoomArea'
   },
   {
    title: '科学器材、准备室仪器柜(口)',
    align:"center",
    dataIndex: 'scienceEquipmentCabinetNum'
   },
   {
    title: '科学器材、准备室准备台(个)',
    align:"center",
    dataIndex: 'scienceEquipmentBenchNum'
   },
   {
    title: '危化品专柜数量(口)',
    align:"center",
    dataIndex: 'hazardousChemicalCabinetNum'
   },
   {
    title: '专职实验员人数',
    align:"center",
    dataIndex: 'fullTimeLabTechnicianNum'
   },
   {
    title: '兼职实验员人数',
    align:"center",
    dataIndex: 'partTimeLabTechnicianNum'
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
// 可以定义权限映射关系
const FIELD_PERMISSION_MAP = {
  'science': ['admin', 'primary_school'],  // 小学 科学
  'physics': ['admin', 'junior_school'], // 初中 物理
  'biochemistry': ['admin', 'junior_school'], // 初中 化生
};

// 检查权限的工具函数
function hasFieldPermission(fieldCode: string): boolean {
  const userStore = useUserStoreWithOut();
  const roles = userStore.getRoleList || [];
  return roles.some(role => FIELD_PERMISSION_MAP[fieldCode]?.includes(role));
}

// 定义默认值映射
const DEFAULT_VALUES = {
  physicsLabRoomNum: 0,
  physicsLabArea: 0,
  physicsLabBenchNum: 0,
  physicsEquipmentRoomNum: 0,
  physicsEquipmentRoomArea: 0,
  physicsEquipmentCabinetNum: 0,
  physicsEquipmentBenchNum: 0,
  biochemistryLabRoomNum: 0,
  biochemistryLabArea: 0,
  biochemistryLabBenchNum: 0,
  biochemistryEquipRoomNum: 0,
  biochemistryEquipRoomArea: 0,
  biochemistryEquipCabinetNum: 0,
  biochemistryEquipBenchNum: 0,
  scienceLabRoomNum: 0,
  scienceLabArea: 0,
  scienceLabBenchNum: 0,
  scienceEquipmentRoomNum: 0,
  scienceEquipmentRoomArea: 0,
  scienceEquipmentCabinetNum: 0,
  scienceEquipmentBenchNum: 0,
} as const;

// 导出处理函数供Modal使用
export function processFormData(values: Recordable) {
  const result = { ...values };
  
  // 遍历所有字段，检查权限并设置默认值
  // Object.keys(FIELD_PERMISSION_MAP).forEach(field => {
  //   if (!hasFieldPermission(field) && !(field in result)) {
  Object.keys(DEFAULT_VALUES).forEach(field => {
    if (!(field in result)) {
      result[field] = DEFAULT_VALUES[field];
    }
  });
  
  return result;
}

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
    label: '物理实验室间数',
    field: 'physicsLabRoomNum',
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
    ifShow: () => hasFieldPermission('physics'),
  },
  {
    label: '物理实验室面积',
    field: 'physicsLabArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
    ifShow: () => hasFieldPermission('physics'),
  },
  {
    label: '物理实验室实验桌(张)',
    field: 'physicsLabBenchNum',
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
    ifShow: () => hasFieldPermission('physics'),
  },
  {
    label: '物理器材、准备室间数',
    field: 'physicsEquipmentRoomNum',
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
    ifShow: () => hasFieldPermission('physics'),
  },
  {
    label: '物理器材、准备室面积',
    field: 'physicsEquipmentRoomArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
    ifShow: () => hasFieldPermission('physics'),
  },
  {
    label: '物理器材、准备室仪器柜(口)',
    field: 'physicsEquipmentCabinetNum',
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
    ifShow: () => hasFieldPermission('physics'),
  },
  {
    label: '物理器材、准备室准备台(个)',
    field: 'physicsEquipmentBenchNum',
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
    ifShow: () => hasFieldPermission('physics'),
  },
  {
    label: '化学（生化）实验室间数',
    field: 'biochemistryLabRoomNum',
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
    ifShow: () => hasFieldPermission('biochemistry'),
  },
  {
    label: '化学（生化）实验室面积',
    field: 'biochemistryLabArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
    ifShow: () => hasFieldPermission('biochemistry'),
  },
  {
    label: '化学（生化）实验室实验桌(张)',
    field: 'biochemistryLabBenchNum',
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
    ifShow: () => hasFieldPermission('biochemistry'),
  },
  {
    label: '化学（生化）器材、准备室间数',
    field: 'biochemistryEquipRoomNum',
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
    ifShow: () => hasFieldPermission('biochemistry'),
  },
  {
    label: '化学（生化）器材、准备室面积',
    field: 'biochemistryEquipRoomArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
    ifShow: () => hasFieldPermission('biochemistry'),
  },
  {
    label: '化学（生化）器材、准备室仪器柜(口)',
    field: 'biochemistryEquipCabinetNum',
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
    ifShow: () => hasFieldPermission('biochemistry'),
  },
  {
    label: '化学（生化）器材、准备室准备台(个)',
    field: 'biochemistryEquipBenchNum',
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
    ifShow: () => hasFieldPermission('biochemistry'),
  },
  {
    label: '科学实验室间数',
    field: 'scienceLabRoomNum',
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
    ifShow: () => hasFieldPermission('science'),
  },
  {
    label: '科学实验室面积',
    field: 'scienceLabArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
    ifShow: () => hasFieldPermission('science'),
  },
  {
    label: '科学实验室实验桌(张)',
    field: 'scienceLabBenchNum',
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
    ifShow: () => hasFieldPermission('science'),
  },
  {
    label: '科学器材、准备室间数',
    field: 'scienceEquipmentRoomNum',
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
    ifShow: () => hasFieldPermission('science'),
  },
  {
    label: '科学器材、准备室面积',
    field: 'scienceEquipmentRoomArea',
    component: 'InputNumber',
    componentProps: {
      min: 0,  // 设置最小值为0
    },
    rules: [
      { required: true, message: '请输入数量' },
    ],
    ifShow: () => hasFieldPermission('science'),
  },
  {
    label: '科学器材、准备室仪器柜(口)',
    field: 'scienceEquipmentCabinetNum',
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
    ifShow: () => hasFieldPermission('science'),
  },
  {
    label: '科学器材、准备室准备台(个)',
    field: 'scienceEquipmentBenchNum',
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
    ifShow: () => hasFieldPermission('science'),
  },
  {
    label: '危化品专柜数量(口)',
    field: 'hazardousChemicalCabinetNum',
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
    label: '专职实验员人数',
    field: 'fullTimeLabTechnicianNum',
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
    label: '兼职实验员人数',
    field: 'partTimeLabTechnicianNum',
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
