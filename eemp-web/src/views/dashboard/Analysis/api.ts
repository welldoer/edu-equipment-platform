import { defHttp } from '/@/utils/http/axios';

enum Api {
  loginfo = '/sys/loginfo',
  visitInfo = '/sys/visitInfo',
  classInfo = '/org.eemp.modules.edu.statistics/eduInformatizationEquipInfo_8/classInfo',
  teacherInfo = '/org.eemp.modules.edu.statistics/eduInformatizationBasicInfo_1/teacherInfo',
  studentInfo = '/org.eemp.modules.edu.statistics/eduInformatizationBasicInfo_1/studentInfo'
}
/**
 * 日志统计信息
 * @param params
 */
export const getLoginfo = (params) => defHttp.get({ url: Api.loginfo, params }, { isTransformResponse: false });
/**
 * 访问量信息
 * @param params
 */
export const getVisitInfo = (params) => defHttp.get({ url: Api.visitInfo, params }, { isTransformResponse: false });

export const getClassInfo = (params) => defHttp.get({ url: Api.classInfo, params }, { isTransformResponse: false });

export const getTeacherInfo = (params) => defHttp.get({ url: Api.teacherInfo, params }, { isTransformResponse: false });

export const getStudentInfo = (params) => defHttp.get({ url: Api.studentInfo, params }, { isTransformResponse: false });
