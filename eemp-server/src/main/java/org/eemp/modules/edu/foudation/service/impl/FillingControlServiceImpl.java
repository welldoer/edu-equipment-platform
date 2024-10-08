package org.eemp.modules.edu.foudation.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.eemp.modules.edu.foudation.entity.FillingControl;
import org.eemp.modules.edu.foudation.mapper.FillingControlMapper;
import org.eemp.modules.edu.foudation.service.IFillingControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.eemp.common.util.RedisUtil;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import java.util.Calendar;
import java.util.Date;

/**
 * @Description: 填报控制
 * @Date:   2023-09-14
 * @Version: V1.0
 */
@Service
public class FillingControlServiceImpl extends ServiceImpl<FillingControlMapper, FillingControl> implements IFillingControlService {
    @Autowired
    private FillingControlMapper mapper;
    @Autowired
    private RedisUtil redisUtil;

    @Override
    public JSONObject getFillingControl(String identificationCode, String packageName) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date currentDate = calendar.getTime();
        return getFillingControl(identificationCode, packageName, currentDate);
    }

    @Override
    public JSONObject getFillingControl(String identificationCode, String packageName, Date inDate) {
        return getFillingControl(identificationCode, packageName, inDate, 0);
    }

    @Override
    public JSONObject getFillingControl(String identificationCode, String packageName, Date inDate, long extendSecs) {
        String key = "fc-" + identificationCode + "-" + packageName;
        JSONObject fc_record = (JSONObject)redisUtil.get(key);
        if (null == fc_record) {
            buildFillingControl(identificationCode, packageName, inDate, extendSecs);
        }

        return (JSONObject)redisUtil.get(key);
    }

    private void buildFillingControl(String identificationCode, String packageName, Date inDate, long extendSecs) {
        final String fillingControlType;
        switch (packageName) {
            case "edu_informatization_basic_info_1":
            case "edu_informatization_basic_info_2":
            case "school_lab_basic_info_3":
            case "school_library_basic_info_4":
            case "school_sport_room_info_5":
            case "school_music_art_room_info_6":
            case "school_functional_room_info_7":
            case "edu_informatization_equip_info_8":
                fillingControlType = "01";
                break;
            case "ps_mathematics_equipment_file":
            case "ps_scientific_equipment_file":
            case "ps_art_equipment_file":
            case "ps_music_equipment_file":
            case "ps_sport_equipment_file":
            case "js_mathematics_equipment_file":
            case "js_physics_equipment_file":
            case "js_biology_equipment_file":
            case "js_chemistry_equipment_file":
            case "js_geography_equipment_file":
            case "js_art_equipment_file":
            case "js_music_equipment_file":
            case "js_sport_equipment_file":
                fillingControlType = "02";
                break;
            case "monthly_doc_of_chemical_hazards":
                fillingControlType = "03";
                break;
            case "signing_of_security_responsibility":
                fillingControlType = "04";
                break;
            case "info_of_deployment":
                fillingControlType = "05";
                break;
            default:
                fillingControlType = "";
        }

        LambdaQueryWrapper<FillingControl> wrapper = new LambdaQueryWrapper<>();
        wrapper.and(qw -> qw.likeRight(FillingControl::getControlType, fillingControlType + ",")
                .or().likeLeft(FillingControl::getControlType, "," + fillingControlType)
                .or().eq(FillingControl::getControlType, fillingControlType)
                .or().like(FillingControl::getControlType, "," + fillingControlType + ","));
        wrapper.le(FillingControl::getStartDate, inDate);
        wrapper.ge(FillingControl::getEndDate, inDate);
        wrapper.and(qw -> qw.likeRight(FillingControl::getSchoolList, identificationCode + ",")
                .or().likeLeft(FillingControl::getSchoolList, "," + identificationCode)
                .or().eq(FillingControl::getSchoolList, identificationCode)
                .or().like(FillingControl::getSchoolList, "," + identificationCode + ","));
        wrapper.orderByDesc(FillingControl::getStartDate, FillingControl::getEndDate);
        wrapper.last("LIMIT 1");
        FillingControl fc = mapper.selectOne(wrapper);

        if (null != fc) {
            String key = "fc-" + identificationCode + "-" + packageName;
            JSONObject fc_record = new JSONObject();
            fc_record.put("addable", true);
            fc_record.put("due_date", fc.getEndDate());
            fc_record.put("check_due_date", fc.getCheckEndDate());

            if (extendSecs == 0)
                extendSecs = (fc.getEndDate().getTime() - inDate.getTime()) / 1000;

            redisUtil.set(key, fc_record, extendSecs);
        }
    }

    @Override
    public boolean updateFillingControlAfterNewData(String identificationCode, String packageName, String id) {
        return updateFillingControlAfterNewData(identificationCode, packageName, id, 0);
    }

    @Override
    public boolean updateFillingControlAfterNewData(String identificationCode, String packageName, String id, long extendSecs) {
        String key = "fc-" + identificationCode + "-" + packageName;
        JSONObject fc_record = (JSONObject)redisUtil.get(key);
        if (null != fc_record && fc_record.getBooleanValue("addable")) {
            long restTime = redisUtil.getExpire(key);
            if (extendSecs == 0)
                extendSecs = (fc_record.getDate("check_due_date").getTime() - fc_record.getDate("due_date").getTime()) / 1000;
            restTime += extendSecs;
            fc_record.remove("addable");
            fc_record.put("reportable", true);
            fc_record.put("id", id);
            redisUtil.set(key, fc_record, restTime);

            return true;
        }

        return false;
    }

    @Override
    public boolean updateFillingControlAfterReported(String identificationCode, String packageName) {
        String key = "fc-" + identificationCode + "-" + packageName;
        JSONObject fc_record = (JSONObject)redisUtil.get(key);
        if (null != fc_record && fc_record.getBooleanValue("reportable")) {
            long restTime = redisUtil.getExpire(key);
            fc_record.remove("reportable");
            fc_record.put("revokable", true);
            redisUtil.set(key, fc_record, restTime);

            return true;
        }

        return false;
    }

    @Override
    public boolean updateFillingControlAfterRevoked(String identificationCode, String packageName) {
        String key = "fc-" + identificationCode + "-" + packageName;
        JSONObject fc_record = (JSONObject)redisUtil.get(key);
        if (null != fc_record && fc_record.getBooleanValue("revokable")) {
            long restTime = redisUtil.getExpire(key);
            fc_record.remove("revokable");
            fc_record.put("reportable", true);
            redisUtil.set(key, fc_record, restTime);

            return true;
        }

        return false;
    }

    @Override
    public boolean updateFillingControlAfterDeleteData(String identificationCode, String packageName, String id) {
        String key = "fc-" + identificationCode + "-" + packageName;
        JSONObject fc_record = (JSONObject)redisUtil.get(key);
        if (null != fc_record && fc_record.get("id").equals(id) && fc_record.getBooleanValue("reportable")) {
            redisUtil.del(key);

            return true;
        }

        return false;
    }

    @Override
    public JSONObject getTemplateInfo(String packageName) {
        JSONObject fc_template_list = getFcTemplateList();

        return fc_template_list.getJSONObject(packageName);
    }

    private JSONObject getFcTemplateList() {
        String key = "fc-template-list";
        JSONObject fc_template_list = (JSONObject)redisUtil.get(key);
        if (null == fc_template_list) {
            fc_template_list = new JSONObject();
            redisUtil.set(key, fc_template_list);
        }
        return fc_template_list;
    }

    private void putFcTemplateList(JSONObject fc_template_list) {
        String key = "fc-template-list";
        redisUtil.set(key, fc_template_list);
    }

    @Override
    public boolean updateTemplateInfo(String packageName, String templateUrl) {
        JSONObject fc_template_list = getFcTemplateList();

        JSONObject oneRec = fc_template_list.getJSONObject(packageName);
        if (oneRec == null) {
            oneRec = new JSONObject();
        }
        oneRec.put("packageName", packageName);
        oneRec.put("templateUrl", templateUrl);
        fc_template_list.put(packageName, oneRec);

        putFcTemplateList(fc_template_list);

        return true;
    }
}
