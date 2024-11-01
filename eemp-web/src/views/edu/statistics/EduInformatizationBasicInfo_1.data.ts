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
    title: '任课教师总数（人）',
    align:"center",
    dataIndex: 'teacherCount'
   },
   {
    title: '学生总数（人）',
    align:"center",
    dataIndex: 'studentCount'
   },
   {
    title: '教室（含功能室）总数（间）',
    align:"center",
    dataIndex: 'roomCount'
   },
   {
    title: '班级教室总数（间）',
    align:"center",
    dataIndex: 'classroomCount'
   },
   {
    title: '学生课桌椅可用数（套）',
    align:"center",
    dataIndex: 'studentDeskCount'
   },
   {
    title: '已入网教室数（间）',
    align:"center",
    dataIndex: 'connectedRoomCount'
   },
   {
    title: '是否建设网络中心机房',
    align:"center",
    dataIndex: 'hasACentralServerRoom_dictText'
   },
   {
    title: '学校资源库教学资源容量（GB）',
    align:"center",
    dataIndex: 'teachingResourceCapacity'
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
    defaultValue: userStore.getUserInfo.telephone,                      // 借用保存学校用户对应的机构代码
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
    label: '任课教师总数（人）',
    field: 'teacherCount',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入任课教师总数（人）!'},
          ];
     },
  },
  {
    label: '学生总数（人）',
    field: 'studentCount',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入学生总数（人）!'},
          ];
     },
  },
  {
    label: '教室（含功能室）总数（间）',
    field: 'roomCount',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入教室（含功能室）总数（间）!'},
          ];
     },
  },
  {
    label: '班级教室总数（间）',
    field: 'classroomCount',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入班级教室总数（间）!'},
          ];
     },
  },
  {
    label: '学生课桌椅可用数（套）',
    field: 'studentDeskCount',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入学生课桌椅可用数（套）!'},
          ];
     },
  },
  {
    label: '已入网教室数（间）',
    field: 'connectedRoomCount',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入已入网教室数（间）!'},
          ];
     },
  },
  {
    label: '是否建设网络中心机房',
    field: 'hasACentralServerRoom',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"yn"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入是否建设网络中心机房!'},
          ];
     },
  },
  {
    label: '学校资源库教学资源容量（GB）',
    field: 'teachingResourceCapacity',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入学校资源库教学资源容量（GB）!'},
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
