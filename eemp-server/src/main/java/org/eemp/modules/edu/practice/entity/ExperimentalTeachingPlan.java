package org.eemp.modules.edu.practice.entity;

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
 * @Description: 实验教学计划
 * @Date:   2025-02-10
 * @Version: V1.0
 */
@Data
@TableName("experimental_teaching_plan")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@ApiModel(value="experimental_teaching_plan对象", description="实验教学计划")
public class ExperimentalTeachingPlan implements Serializable {
    private static final long serialVersionUID = 1L;

	/**主键*/
	@TableId(type = IdType.ASSIGN_ID)
    @ApiModelProperty(value = "主键")
    private java.lang.String id;
    /**学校名称*/
    @Excel(name = "学校名称", width = 15, dictTable = "organization_definition", dicText = "institution_name", dicCode = "identification_code")
    @Dict(dictTable = "organization_definition", dicText = "institution_name", dicCode = "identification_code")
    @ApiModelProperty(value = "学校名称")
    private java.lang.String identificationCode;
	/**实验名称*/
	@Excel(name = "实验名称", width = 15)
    @ApiModelProperty(value = "实验名称")
    private java.lang.String experimentName;
    /**实验时间*/
    @Excel(name = "实验时间", width = 15)
    @ApiModelProperty(value = "实验时间")
    private java.lang.Integer planningTime;
    /**实验次数*/
    @Excel(name = "实验次数", width = 15)
    @ApiModelProperty(value = "实验次数")
    private java.lang.Integer taskNumber;
	/**实验形式*/
	@Excel(name = "实验形式", width = 15, dicCode = "experimental_form")
	@Dict(dicCode = "experimental_form")
    @ApiModelProperty(value = "实验形式")
    private java.lang.String exactForm;
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
