<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" :rowSelection="rowSelection">
     <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1" @click="batchHandleDelete">
                    <Icon icon="ant-design:delete-outlined"></Icon>
                    删除
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button>批量操作
                <Icon icon="mdi:chevron-down"></Icon>
              </a-button>
        </a-dropdown>
        <a-upload name="file" :showUploadList="false" :action="uploadUrl" :headers="headers" @change="handleChange">
          <a-button type="primary" preIcon="ant-design:upload-outlined" v-auth="'edu.foudation:organization_definition:uploadTemplate'">模板上传</a-button>
        </a-upload>
        <a-button preIcon="ant-design:download-outlined" type="primary" @click="downloadTemplate" v-auth="'edu.foudation:organization_definition:downloadTemplate'">模板下载</a-button>
        <j-upload-button  type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
        <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
      </template>
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
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
    <OrganizationDefinitionModal @register="registerModal" @success="handleSuccess"></OrganizationDefinitionModal>
  </div>
</template>

<script lang="ts" name="org.eemp.modules.edu.foudation-organizationDefinition" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import OrganizationDefinitionModal from './components/OrganizationDefinitionModal.vue'
  import {columns, searchFormSchema} from './OrganizationDefinition.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl, resetPassword, updateTemplateInfoUrl, getTemplateInfoUrl} from './OrganizationDefinition.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getToken } from '/@/utils/auth';
  import { uploadUrl } from '/@/api/common/api';
  import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';
  import { downloadTemplateAction } from '/@/utils/edu/templateUtils';
  const checkedKeys = ref<Array<string | number>>([]);
  
  const packageName = 'organization_definition';

  //注册model
  const [registerModal, {openModal}] = useModal();

  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
      tableProps:{
           title: '学校管理',
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
            name:"学校管理",
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
      (selectedRowKeys.value = []) && reload();
   }
  
  /**
   * 重置密码
   */
  async function handleResetPassword(record) {
    await resetPassword({username: record.adminCode}, handleSuccess);
  }
 
   /**
      * 操作栏
      */
  function getTableAction(record){
       return [
         {
           label: '编辑',
           onClick: handleEdit.bind(null, record),
         },
         {
           label: '重置密码',
           popConfirm: {
             title: '是否确认重置密码',
             confirm: handleResetPassword.bind(null, record),
           }
         }
       ]
   }
     /**
        * 下拉操作栏
        */
  function getDropDownAction(record){
       return [
       ]
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
    await downloadTemplateAction(packageName, getTemplateInfoUrl);
  }

</script>

<style scoped>

</style>
