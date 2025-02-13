package org.eemp.modules.edu.practice.entity;

import java.io.Serializable;
import java.util.Date;
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
 * @Description: 实验教学记载
 * @Date:   2025-02-12
 * @Version: V1.0
 */
@Data
@TableName("experimental_teaching_records")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@ApiModel(value="experimental_teaching_records对象", description="实验教学记载")
public class ExperimentalTeachingRecords implements Serializable {
    private static final long serialVersionUID = 1L;

	/**主键*/
	@TableId(type = IdType.ASSIGN_ID)
    @ApiModelProperty(value = "主键")
    private String id;
	/**学校名称*/
	@Excel(name = "学校名称", width = 15, dictTable = "organization_definition", dicText = "institution_name", dicCode = "identification_code")
	@Dict(dictTable = "organization_definition", dicText = "institution_name", dicCode = "identification_code")
    @ApiModelProperty(value = "学校名称")
    private String identificationCode;
	/**实验科目*/
	@Excel(name = "实验科目", width = 15)
    @ApiModelProperty(value = "实验科目")
    private String subject;
	/**实验日期*/
	@Excel(name = "实验日期", width = 15, format = "yyyy-MM-dd")
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @ApiModelProperty(value = "实验日期")
    private Date dateOfExperiment;
	/**上课教师*/
	@Excel(name = "上课教师", width = 15)
    @ApiModelProperty(value = "上课教师")
    private String teacher;
	/**学生人数*/
	@Excel(name = "学生人数", width = 15)
    @ApiModelProperty(value = "学生人数")
    private Integer studentNumber;
	/**实验形式*/
	@Excel(name = "实验形式", width = 15, dicCode = "experimental_form")
	@Dict(dicCode = "experimental_form")
    @ApiModelProperty(value = "实验形式")
    private String exactForm;
	/**开出组数*/
	@Excel(name = "开出组数", width = 15)
    @ApiModelProperty(value = "开出组数")
    private Integer groupQuantity;
	/**实验内容*/
	@Excel(name = "实验内容", width = 15)
    @ApiModelProperty(value = "实验内容")
    private String experimentContent;
	/**实验器材*/
	@Excel(name = "实验器材", width = 15)
    @ApiModelProperty(value = "实验器材")
    private String experimentEquipment;
	/**实验过程记录*/
	@Excel(name = "实验过程记录", width = 15)
    @ApiModelProperty(value = "实验过程记录")
    private String processRecord;
	/**仪器设备使用情况*/
	@Excel(name = "仪器设备使用情况", width = 15)
    @ApiModelProperty(value = "仪器设备使用情况")
    private String useOfInstruments;
	/**实验结果及评价*/
	@Excel(name = "实验结果及评价", width = 15)
    @ApiModelProperty(value = "实验结果及评价")
    private String resultsAndEvaluation;
	/**实验员*/
	@Excel(name = "实验员", width = 15)
    @ApiModelProperty(value = "实验员")
    private String laboratoryTechnician;
	/**创建人*/
    @ApiModelProperty(value = "创建人")
    private String createBy;
	/**创建日期*/
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @ApiModelProperty(value = "创建日期")
    private Date createTime;
	/**更新人*/
    @ApiModelProperty(value = "更新人")
    private String updateBy;
	/**更新日期*/
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @ApiModelProperty(value = "更新日期")
    private Date updateTime;
	/**所属部门*/
    @ApiModelProperty(value = "所属部门")
    private String sysOrgCode;
}
