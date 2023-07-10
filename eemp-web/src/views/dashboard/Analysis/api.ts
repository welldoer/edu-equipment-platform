import { defHttp } from '/@/utils/http/axios';

enum Api {
  loginfo = '/sys/loginfo',
  visitInfo = '/sys/visitInfo',
  teacherInfo = '/org.eemp.modules.edu.statistics/eduInformatizationBasicInfo_1/teacherInfo'
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

export const getTeacherInfo = (params) => defHttp.get({ url: Api.teacherInfo, params }, { isTransformResponse: false });
