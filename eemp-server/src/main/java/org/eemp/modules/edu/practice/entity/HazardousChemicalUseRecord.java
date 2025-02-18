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
 * @Description: 危化品使用
 * @Date:   2025-02-18
 * @Version: V1.0
 */
@Data
@TableName("hazardous_chemical_use_record")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@ApiModel(value="hazardous_chemical_use_record对象", description="危化品使用")
public class HazardousChemicalUseRecord implements Serializable {
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
	/**领取日期*/
	@Excel(name = "领取日期", width = 15, format = "yyyy-MM-dd")
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @ApiModelProperty(value = "领取日期")
    private java.util.Date collectionDate;
	/**药品名称*/
	@Excel(name = "药品名称", width = 15)
    @ApiModelProperty(value = "药品名称")
    private java.lang.String drugName;
	/**药品用途*/
	@Excel(name = "药品用途", width = 15)
    @ApiModelProperty(value = "药品用途")
    private java.lang.String drugUse;
	/**用量单位*/
	@Excel(name = "用量单位", width = 15)
    @ApiModelProperty(value = "用量单位")
    private java.lang.String unitOfUsage;
	/**领取数量*/
	@Excel(name = "领取数量", width = 15)
    @ApiModelProperty(value = "领取数量")
    private java.lang.Double quantityClaimed;
	/**领取人*/
	@Excel(name = "领取人", width = 15)
    @ApiModelProperty(value = "领取人")
    private java.lang.String receiptor;
	/**剩余药品返回日期*/
	@Excel(name = "剩余药品返回日期", width = 15, format = "yyyy-MM-dd")
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @ApiModelProperty(value = "剩余药品返回日期")
    private java.util.Date returnDate;
	/**剩余药品返回数量*/
	@Excel(name = "剩余药品返回数量", width = 15)
    @ApiModelProperty(value = "剩余药品返回数量")
    private java.lang.Double quantityReturned;
	/**剩余药品返回处理方法*/
	@Excel(name = "剩余药品返回处理方法", width = 15)
    @ApiModelProperty(value = "剩余药品返回处理方法")
    private java.lang.String disposalMethod;
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
