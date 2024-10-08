<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" :rowSelection="rowSelection">
     <!--插槽:table标题-->
      <template #tableTitle>
        <a-upload name="file" :showUploadList="false" :action="uploadUrl" :headers="headers" @change="handleChange">
          <a-button type="primary" preIcon="ant-design:upload-outlined" v-auth="'edu.deployment:info_of_deployment:uploadTemplate'">模板上传</a-button>
        </a-upload>
        <a-button preIcon="ant-design:download-outlined" type="primary" @click="downloadTemplate" v-auth="'edu.deployment:info_of_deployment:downloadTemplate'">模板下载</a-button>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined" v-auth="'edu.deployment:info_of_deployment:add'" :disabled="!addable"> 新增</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1" @click="batchHandleDelete">
                    <Icon icon="ant-design:delete-outlined"></Icon>
                    删除
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button v-auth="'edu.deployment:info_of_deployment:deleteBatch'">批量操作
                <Icon icon="mdi:chevron-down"></Icon>
              </a-button>
        </a-dropdown>
        <a-button type="primary" @click="handleReport" preIcon="ant-design:send-outlined" v-auth="'edu.deployment:info_of_deployment:report'" :disabled="!reportable">上报</a-button>
        <a-button :ghost="true" type="primary" @click="handleRevoke" preIcon="ant-design:send-outlined" v-auth="'edu.deployment:info_of_deployment:revoke'">退回学校修改</a-button>
        <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls" v-auth="'edu.deployment:info_of_deployment:exportXls'"> 导出</a-button>
        <j-upload-button  type="primary" preIcon="ant-design:import-outlined" @click="onImportXls" v-auth="'edu.deployment:info_of_deployment:importExcel'">导入</j-upload-button>
      </template>
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction v-if="record.id === recId.valueOf() && reportable" :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>
      <!--字段回显插槽-->
      <template #htmlSlot="{text}">
         <div v-html="text"></div>
      </template>
      <!--省市区字段回显插槽-->
      <template #pcaSlot="{text}">
         {{ getAreaTextByCode(text) }}
      </template>
      <template #fileSlot="{text}">
         <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
         <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFile(text)">下载</a-button>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <InfoOfDeploymentModal @register="registerModal" @success="handleSuccess"></InfoOfDeploymentModal>
  </div>
</template>

<script lang="ts" name="org.eemp.modules.edu.deployment-infoOfDeployment" setup>
  import {ref, computed, unref, onMounted} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import InfoOfDeploymentModal from './components/InfoOfDeploymentModal.vue'
  import {columns, searchFormSchema} from './InfoOfDeployment.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl, reportOne, batchRevoke, getFillingControlUrl, getTemplateInfoUrl, updateTemplateInfoUrl} from './InfoOfDeployment.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import { defHttp } from '/@/utils/http/axios';
  import { useUserStoreWithOut } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getToken } from '/@/utils/auth';
  import { uploadUrl } from '/@/api/common/api';
  import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';
  const checkedKeys = ref<Array<string | number>>([]);

  const userStore = useUserStoreWithOut();
  const packageName = 'info_of_deployment';

  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
      tableProps:{
           title: '资源配置统计',
           api: list,
           columns,
           canResize:false,
           formConfig: {
              //labelWidth: 120,
              schemas: searchFormSchema,
              autoSubmitOnEnter:true,
              showAdvancedButton:true,
              fieldMapToNumber: [
              ],
              fieldMapToTime: [
              ],
            },
           actionColumn: {
               width: 120,
               fixed:'left'
            },
      },
       exportConfig: {
            name:"资源配置统计",
            url: getExportUrl,
          },
          importConfig: {
            url: getImportUrl,
            success: handleSuccess
          },
  })

  const [registerTable, {reload},{ rowSelection, selectedRowKeys }] = tableContext

   /**
    * 新增事件
    */
  function handleAdd() {
     openModal(true, {
       isUpdate: false,
       showFooter: true,
     });
  }
   /**
    * 编辑事件
    */
  function handleEdit(record: Recordable) {
     openModal(true, {
       record,
       isUpdate: true,
       showFooter: true,
     });
   }
   /**
    * 详情
   */
  function handleDetail(record: Recordable) {
     openModal(true, {
       record,
       isUpdate: true,
       showFooter: false,
     });
   }
   /**
    * 删除事件
    */
  async function handleDelete(record) {
     await deleteOne({id: record.id}, handleSuccess);
   }
   /**
    * 批量删除事件
    */
  async function batchHandleDelete() {
     await batchDelete({ids: selectedRowKeys.value}, handleSuccess);
   }
   /**
    * 成功回调
    */
  function handleSuccess() {
      (selectedRowKeys.value = []) && getFillingControl() && reload();
   }
   /**
      * 操作栏
      */
  function getTableAction(record){
       return [
         {
           label: '编辑',
           onClick: handleEdit.bind(null, record),
         }, {
           label: '删除',
           popConfirm: {
             title: '是否确认删除',
             confirm: handleDelete.bind(null, record),
           }
         }
       ]
   }
     /**
        * 下拉操作栏
        */
  function getDropDownAction(record){
       return [
        //  {
        //    label: '详情',
        //    onClick: handleDetail.bind(null, record),
        //  }
       ]
   }

  async function handleReport() {
   await reportOne({identificationCode: userStore.getUserInfo.telephone, id: recId.value}, handleSuccess);
  }
  async function handleRevoke() {
   await batchRevoke({ids: selectedRowKeys.value}, handleSuccess);
  }
 
  const addable = ref(false)
  const reportable = ref(false)
  const revokable = ref(false)
  const recId = ref(0)

  onMounted(() => {
    getFillingControl()
    console.log("onMounted...")
  })

  async function getFillingControl() {
    let params = {identificationCode: userStore.getUserInfo.telephone, packageName: packageName};
    await defHttp.post({url: getFillingControlUrl, params}, {joinParamsToUrl: true}).then((res) => {
      console.log("res: ", res);
      if (res !== null) {
        console.log("res !== null.")
        addable.value = res.addable
        reportable.value = res.reportable
        revokable.value = res.revokable
        recId.value = res.id
      } else {
        console.log("res === null.")
      }
    });
  }

  const { createMessage } = useMessage();
  const headers = { 'X-Access-Token': getToken() };

  /**
   * 文件上传事件
   */
  async function handleChange(info) {
    if (info.file.status === 'done') {
      if (info.file.response.success) {
        reload();
        info.file.url = getFileAccessHttpUrl(info.file.response.message);
        console.log(info.file)
        createMessage.success(`${info.file.name} 上传成功!`);

        let params = {packageName: packageName, templateUrl: info.file.url};
        await defHttp.post({url: updateTemplateInfoUrl, params}, {joinParamsToUrl: true}).then((res) => {
          console.log("update template res: ", res);
        });
      } else {
        createMessage.error(`${info.file.response.message}`);
      }
    } else if (info.file.status === 'error') {
      createMessage.error(`${info.file.response.message}`);
    }
  }

  async function downloadTemplate() {
    let params = {packageName: packageName};
    await defHttp.post({url: getTemplateInfoUrl, params}, {joinParamsToUrl: true}).then((res) => {
      console.log("template res: ", res);
      if (res !== null) {
        console.log("template res !== null.")

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
      } else {
        console.log("template res === null.")
        createMessage.error('请联系管理员，确认已上传模板文件！');
      }
    });
  }

</script>

<style scoped>

</style>