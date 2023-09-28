package org.eemp.modules.edu.statistics.service;

import org.eemp.modules.edu.statistics.entity.EduInformatizationEquipInfo_8;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @Description: 教育信息化配备情况统计表（八）
 * @Date:   2023-07-15
 * @Version: V1.0
 */
public interface IEduInformatizationEquipInfo_8Service extends IService<EduInformatizationEquipInfo_8> {

    int changeReported(String id, int val);

    List<Map<String,Object>> getClassNumberInfo(Date dayStart, Date dayEnd);

    List<Map<String,Object>> getTeacherComputerNumberInfo(Date dayStart, Date dayEnd);

    List<Map<String,Object>> getStudentComputerNumberInfo(Date dayStart, Date dayEnd);

    List<Map<String,Object>> getClassCommunicationNumberInfo(Date dayStart, Date dayEnd);

}
