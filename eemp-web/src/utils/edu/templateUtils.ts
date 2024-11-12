import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createMessage } = useMessage();

interface TemplateResponse {
  templateUrl?: string;
  [key: string]: any;
}
  
/**
 * 下载模板文件
 * @param packageName 包名
 * @param getTemplateInfoUrl 获取模板信息的URL
 */
export async function downloadTemplateAction(packageName: string, getTemplateInfoUrl: string): Promise<void> {
  try {
    // 1. 先获取模板信息
    const res = await defHttp.post<TemplateResponse>(
      {url: getTemplateInfoUrl, params: {packageName}}, 
      {joinParamsToUrl: true}
    );

    if (!res?.templateUrl) {
      createMessage.error('请联系管理员，确认已上传模板文件！');
      return;
    }

    // 2. 判断是否是MinIO链接
    if (res.templateUrl.includes('minio')) {
      // MinIO方式下载
      const urlParts = res.templateUrl.split('/');
      const bucket = urlParts[3];
      const objectKey = urlParts.slice(4).join('/');

      // 从objectKey中获取原始文件名
      const originalFileName = objectKey.split('/').pop() || '模板文件.xlsx';

      const response = await defHttp.get<Blob>(
        {
          url: '/edu/downloadTemplateFromMinio',
          params: {
            bucket,
            objectKey
          },
          responseType: 'blob'
        },
        { isReturnNativeResponse: true }
      );

      const blob = new Blob([response.data], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = originalFileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    } else {
      // 原始方式直接下载
      const formObj = document.createElement('form');
      formObj.action = res.templateUrl;
      formObj.method = 'get';
      formObj.style.display = 'none';
      const formItem = document.createElement('input');
      formItem.value = "模板文件.xlsx";
      formItem.name = 'fileName';
      formObj.appendChild(formItem);
      document.body.appendChild(formObj);
      formObj.submit();
      document.body.removeChild(formObj);
    }
  } catch (err) {
    createMessage.error('下载失败：' + (err instanceof Error ? err.message : String(err)));
  }
}
