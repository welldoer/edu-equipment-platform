package org.eemp.modules.edu.statistics.entity;

import java.io.Serializable;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
import org.eemp.common.poi.excel.annotation.Excel;
import org.eemp.common.aspect.annotation.Dict;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * @Description: 教育信息化配备情况统计表（八）
 * @Date:   2023-07-15
 * @Version: V1.0
 */
@Data
@TableName("edu_informatization_equip_info_8")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@ApiModel(value="edu_informatization_equip_info_8对象", description="教育信息化配备情况统计表（八）")
public class EduInformatizationEquipInfo_8 implements Serializable {
    private static final long serialVersionUID = 1L;

	/**主键*/
	@TableId(type = IdType.ASSIGN_ID)
    @ApiModelProperty(value = "主键")
    private java.lang.String id;
	/**标识代码*/
	@Excel(name = "学校名称", width = 15, dictTable = "organization_definition", dicText = "institution_name", dicCode = "identification_code")
	@Dict(dictTable = "organization_definition", dicText = "institution_name", dicCode = "identification_code")
    @ApiModelProperty(value = "标识代码")
    private java.lang.String identificationCode;
	/**填报日期*/
	@Excel(name = "填报日期", width = 15, format = "yyyy-MM-dd")
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @ApiModelProperty(value = "填报日期")
    private java.util.Date fillDate;
	/**班级数*/
	@Excel(name = "班级数", width = 15)
    @ApiModelProperty(value = "班级数")
    private java.lang.Integer classesNum;
	/**学生计算机室终端总台数*/
	@Excel(name = "学生计算机室终端总台数", width = 15)
    @ApiModelProperty(value = "学生计算机室终端总台数")
    private java.lang.Integer studentComputerSubtotal;
    /**学生计算机配备数*/
    @Excel(name = "学生计算机配备数", width = 15)
    @ApiModelProperty(value = "学生计算机配备数")
    private java.lang.Integer studentComputerNum;
	/**学生云终端配备数*/
	@Excel(name = "学生云终端配备数", width = 15)
    @ApiModelProperty(value = "学生云终端配备数")
    private java.lang.Integer studentCloudTerminalNum;
	/**学生其他数字化终端配备数*/
	@Excel(name = "学生其他数字化终端配备数", width = 15)
    @ApiModelProperty(value = "学生其他数字化终端配备数")
    private java.lang.Integer studentOtherTerminalNum;
	/**教师办公终端总台数*/
	@Excel(name = "教师办公终端总台数", width = 15)
    @ApiModelProperty(value = "教师办公终端总台数")
    private java.lang.Integer teacherComputerSubtotal;
    /**教师办公计算机配备数*/
    @Excel(name = "教师办公计算机配备数", width = 15)
    @ApiModelProperty(value = "教师办公计算机配备数")
    private java.lang.Integer teacherComputerNum;
	/**教师办公云终端配备数*/
	@Excel(name = "教师办公云终端配备数", width = 15)
    @ApiModelProperty(value = "教师办公云终端配备数")
    private java.lang.Integer teacherCloudTerminalNum;
	/**教师办公其他数字化终端配备数*/
	@Excel(name = "教师办公其他数字化终端配备数", width = 15)
    @ApiModelProperty(value = "教师办公其他数字化终端配备数")
    private java.lang.Integer teacherOtherTerminalNum;
	/**“班班通”智能触控一体机数*/
	@Excel(name = "“班班通”智能触控一体机数", width = 15)
    @ApiModelProperty(value = "“班班通”智能触控一体机数")
    private java.lang.Integer allInOneMachineNum;
	/**“班班通”电脑＋电视机*/
	@Excel(name = "“班班通”电脑＋电视机", width = 15)
    @ApiModelProperty(value = "“班班通”电脑＋电视机")
    private java.lang.Integer computerPlusTvNum;
	/**“班班通”视频展示台数量*/
	@Excel(name = "“班班通”视频展示台数量", width = 15)
    @ApiModelProperty(value = "“班班通”视频展示台数量")
    private java.lang.Integer videoVisualizerNum;
	/**无班班通设备班级数*/
	@Excel(name = "无班班通设备班级数", width = 15)
    @ApiModelProperty(value = "无班班通设备班级数")
    private java.lang.Integer classNumWithoutEquip;
	/**校园网主干线是否达到千兆(是或否)*/
	@Excel(name = "校园网主干线是否达到千兆(是或否)", width = 15, dicCode = "yn")
	@Dict(dicCode = "yn")
    @ApiModelProperty(value = "校园网主干线是否达到千兆(是或否)")
    private java.lang.String isTheBackboneGigabit;
	/**校园网是否建有AP专网(是或否)*/
	@Excel(name = "校园网是否建有AP专网(是或否)", width = 15, dicCode = "yn")
	@Dict(dicCode = "yn")
    @ApiModelProperty(value = "校园网是否建有AP专网(是或否)")
    private java.lang.String hasADedicatedApNetwork;
	/**校园网无线AP数量*/
	@Excel(name = "校园网无线AP数量", width = 15)
    @ApiModelProperty(value = "校园网无线AP数量")
    private java.lang.Integer wirelessApNum;
	/**校园监控摄像头数*/
	@Excel(name = "校园监控摄像头数", width = 15)
    @ApiModelProperty(value = "校园监控摄像头数")
    private java.lang.Integer campusSurveillanceCameraNum;
	/**校园监控硬盘录像机数*/
	@Excel(name = "校园监控硬盘录像机数", width = 15)
    @ApiModelProperty(value = "校园监控硬盘录像机数")
    private java.lang.Integer campusSurveillanceDvrNum;
	/**校园监控留存时间(天)*/
	@Excel(name = "校园监控留存时间(天)", width = 15)
    @ApiModelProperty(value = "校园监控留存时间(天)")
    private java.lang.Integer surveillanceRetentionTime;
    /**上报状态*/
    @ApiModelProperty(value = "上报状态")
    private Integer reported;
	/**创建人*/
    @ApiModelProperty(value = "创建人")
    private java.lang.String createBy;
	/**创建日期*/
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @ApiModelProperty(value = "创建日期")
    private java.util.Date createTime;
	/**更新人*/
    @ApiModelProperty(value = "更新人")
    private java.lang.String updateBy;
	/**更新日期*/
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @ApiModelProperty(value = "更新日期")
    private java.util.Date updateTime;
	/**所属部门*/
    @ApiModelProperty(value = "所属部门")
    private java.lang.String sysOrgCode;
}
