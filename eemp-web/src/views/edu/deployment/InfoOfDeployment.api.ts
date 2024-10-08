import {defHttp} from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/org.eemp.modules.edu.deployment/infoOfDeployment/list',
  save='/org.eemp.modules.edu.deployment/infoOfDeployment/add',
  edit='/org.eemp.modules.edu.deployment/infoOfDeployment/edit',
  deleteOne = '/org.eemp.modules.edu.deployment/infoOfDeployment/delete',
  deleteBatch = '/org.eemp.modules.edu.deployment/infoOfDeployment/deleteBatch',
  importExcel = '/org.eemp.modules.edu.deployment/infoOfDeployment/importExcel',
  exportXls = '/org.eemp.modules.edu.deployment/infoOfDeployment/exportXls',
  reportOne = '/org.eemp.modules.edu.deployment/infoOfDeployment/report',
  batchRevoke = '/org.eemp.modules.edu.deployment/infoOfDeployment/revoke',

  fillingControl = '/org.eemp.modules.edu.foudation/fillingControl/getFillingControl',
  templateInfo = '/org.eemp.modules.edu.foudation/fillingControl/getTemplateInfo',
  updateTemplateInfo = '/org.eemp.modules.edu.foudation/fillingControl/updateTemplateInfo',
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;
export const getFillingControlUrl = Api.fillingControl;
export const getTemplateInfoUrl = Api.templateInfo;
export const updateTemplateInfoUrl = Api.updateTemplateInfo;
/**
 * 列表接口
 * @param params
 */
export const list = (params) =>
  defHttp.get({url: Api.list, params});

/**
 * 删除单个
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}
// 上报
export const reportOne = (params, handleSuccess) => {
  return defHttp.post({url: Api.reportOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
// 退回
export const batchRevoke = (params, handleSuccess) => {
  return defHttp.post({url: Api.batchRevoke, data: params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
