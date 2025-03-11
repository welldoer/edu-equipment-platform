<template>
  <div class="p-4">
    <a-row>
      <a-col :span="24">
        <a-card :loading="loading" :bordered="false" title="全市电教装备基础数据" :style="{ marginTop: '24px' }">
          <a-row>
            <a-col :span="8">
              <BarMulti
                :chartData="classInfo"
                :option="{ title: { text: '班级数统计', textStyle: { fontWeight: 'lighter' } } }"
                height="30vh"
              />
            </a-col>
            <a-col :span="8">
              <BarMulti
                :chartData="teacherInfo"
                :option="{ title: { text: '教师人数统计', textStyle: { fontWeight: 'lighter' } } }"
                height="30vh"
              />
            </a-col>
            <a-col :span="8">
              <BarMulti
                :chartData="studentInfo"
                :option="{ title: { text: '学生人数统计', textStyle: { fontWeight: 'lighter' } } }"
                height="30vh"
              />
            </a-col>
          </a-row>
        </a-card>
        <a-card :loading="loading" :bordered="false" title="教育信息化" :style="{ marginTop: '24px' }">
          <a-row>
            <a-col :span="12">
              <BarMulti
                  :chartData="teacherComputerInfo"
                  :option="{ title: { text: '教师办公计算机统计', textStyle: { fontWeight: 'lighter' } } }"
                  height="30vh"
                />
            </a-col>
            <a-col :span="12">
              <BarMulti
                :chartData="studentComputerInfo"
                :option="{ title: { text: '学生计算机统计', textStyle: { fontWeight: 'lighter' } } }"
                height="30vh"
              />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <StackBar
                :chartData="classCommunicationInfo"
                :option="{ title: { text: '班班通统计', textStyle: { fontWeight: 'lighter' } } }"
                height="30vh"
              />
            </a-col>
            <a-col :span="4">
            </a-col>
            <a-col :span="8">
              <div class="md:flex enter-y">
                <EduCentralRoom :chartData="centralRoomInfo" class="md:w-1/1 w-full" :loading="loading" />
              </div>
            </a-col>
          </a-row>
        </a-card>
        <a-card :loading="loading" :bordered="false" title="教育装备" :style="{ marginTop: '24px' }">
          <div class="md:flex enter-y">
            <EduScience :chartData="scienceRoomInfo" class="md:w-1/3 w-full" :loading="loading" />
            <EduLaboiratory :chartData="laboratoryRoomInfo" class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
            <BarMulti
                :chartData="libraryInfo"
                :option="{ title: { text: '图书室统计（面积）', textStyle: { fontWeight: 'lighter' } } }"
                height="30vh"
              />
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import BarMulti from '/@/components/chart/BarMulti.vue';
  import StackBar from '/@/components/chart/StackBar.vue';
  import EduScience from '../components/EduScience.vue';
  import EduLaboiratory from '../components/EduLaboiratory.vue';
  import EduCentralRoom from '../components/EduCentralRoom.vue';
  import { getClassInfo, getTeacherInfo, getStudentInfo } from '../api.ts';
  import { getTeacherComputerInfo, getStudentComputerInfo } from '../api.ts';
  import { getClassCommunicationInfo } from '../api.ts';
  import { getCentralRoomInfo, getScienceRoomInfo, getLaboratoryRoomInfo } from '../api.ts';
  import { getLibraryInfo } from '../api.ts';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 500);

  const teacherInfo = ref([])
  const studentInfo = ref([])
  const classInfo = ref([])

  const refCode = {'中心小学': 10, '完全小学': 20, '初中': 30, '高中': 40, '幼儿园': 50, '其它': 60};
  const cmpfun = it => refCode[it.chart_group] + it.type;

  function initClassAndTeacherAndStudentInfo() {
    getClassInfo(null).then((res) => {
      if (res.success) {
        classInfo.value = [];
        res.result.sort((a, b) => cmpfun(a) > cmpfun(b) ? 1 : -1).forEach((item) => {
          classInfo.value.push({ name: item.chart_group, type: item.type, value: item.value });
        });
      }
    });
    getTeacherInfo(null).then((res) => {
      if (res.success) {
        // teacherInfo.value = res.result;
        teacherInfo.value = [];
        res.result.sort((a, b) => cmpfun(a) > cmpfun(b) ? 1 : -1).forEach((item) => {
          teacherInfo.value.push({ name: item.chart_group, type: item.type, value: item.value });
        });
      }
    });
    getStudentInfo(null).then((res) => {
      if (res.success) {
        studentInfo.value = [];
        res.result.sort((a, b) => cmpfun(a) > cmpfun(b) ? 1 : -1).forEach((item) => {
          studentInfo.value.push({ name: item.chart_group, type: item.type, value: item.value });
        });
      }
    });
  }

  initClassAndTeacherAndStudentInfo();

  const teacherComputerInfo = ref([])
  const studentComputerInfo = ref([])

  function initTeacherAndStudentComputerInfo() {
    getTeacherComputerInfo(null).then((res) => {
      if (res.success) {
        teacherComputerInfo.value = [];
        res.result.sort((a, b) => cmpfun(a) > cmpfun(b) ? 1 : -1).forEach((item) => {
          teacherComputerInfo.value.push({ name: item.chart_group, type: item.type, value: item.value });
        });
      }
    });
    getStudentComputerInfo(null).then((res) => {
      if (res.success) {
        studentComputerInfo.value = [];
        res.result.sort((a, b) => cmpfun(a) > cmpfun(b) ? 1 : -1).forEach((item) => {
          studentComputerInfo.value.push({ name: item.chart_group, type: item.type, value: item.value });
        });
      }
    });
  }

  initTeacherAndStudentComputerInfo();

  const classCommunicationInfo = ref([])

  function initClassCommunicationInfo() {
    getClassCommunicationInfo(null).then((res) => {
      if (res.success) {
        classCommunicationInfo.value = [];
        res.result.sort((a, b) => cmpfun(a) > cmpfun(b) ? 1 : -1).forEach((item) => {
          classCommunicationInfo.value.push({ name: item.chart_group, type: item.type, value: item.value });
        });
      }
    });
  }

  initClassCommunicationInfo();

  const centralRoomInfo = ref([])

  function initCentralRoomInfo() {
    getCentralRoomInfo(null).then((res) => {
      if (res.success) {
        centralRoomInfo.value = [];
        res.result.forEach((item) => {
          centralRoomInfo.value.push({ name: item.name, value: item.value });
        });
      }
    });
  }

  initCentralRoomInfo();

  const scienceRoomInfo = ref([])

  function initScienceRoomInfo() {
    getScienceRoomInfo(null).then((res) => {
      if (res.success) {
        scienceRoomInfo.value = [];
        res.result.forEach((item) => {
          scienceRoomInfo.value.push({ name: item.name, value: item.value });
        });
      }
    });
  }

  initScienceRoomInfo();

  const laboratoryRoomInfo = ref([])

  function initLaboratoryRoomInfo() {
    getLaboratoryRoomInfo(null).then((res) => {
      if (res.success) {
        laboratoryRoomInfo.value = [];
        res.result.forEach((item) => {
          laboratoryRoomInfo.value.push({ name: item.name, value: item.value });
        });
      }
    });
  }

  initLaboratoryRoomInfo();

  const libraryInfo = ref([])

  function initLibraryInfo() {
    getLibraryInfo(null).then((res) => {
      if (res.success) {
        libraryInfo.value = [];
        res.result.forEach((item) => {
          libraryInfo.value.push({ name: item.name, type: item.type, value: item.value });
        });
      }
    });
  }

  initLibraryInfo();
</script>

<style>

</style>
