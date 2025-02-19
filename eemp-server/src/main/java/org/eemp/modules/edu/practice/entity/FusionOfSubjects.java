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
 * @Description: 学科融合
 * @Date:   2025-02-19
 * @Version: V1.0
 */
@Data
@TableName("fusion_of_subjects")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@ApiModel(value="fusion_of_subjects对象", description="学科融合")
public class FusionOfSubjects implements Serializable {
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
	/**日期*/
	@Excel(name = "日期", width = 15, format = "yyyy-MM-dd")
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @ApiModelProperty(value = "日期")
    private java.util.Date courseDate;
	/**节次*/
	@Excel(name = "节次", width = 15)
    @ApiModelProperty(value = "节次")
    private java.lang.String section;
	/**学科*/
	@Excel(name = "学科", width = 15)
    @ApiModelProperty(value = "学科")
    private java.lang.String subject;
	/**内容*/
	@Excel(name = "内容", width = 15)
    @ApiModelProperty(value = "内容")
    private java.lang.String content;
	/**方式*/
	@Excel(name = "方式", width = 15)
    @ApiModelProperty(value = "方式")
    private java.lang.String style;
	/**执教*/
	@Excel(name = "执教", width = 15)
    @ApiModelProperty(value = "执教")
    private java.lang.String coach;
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
