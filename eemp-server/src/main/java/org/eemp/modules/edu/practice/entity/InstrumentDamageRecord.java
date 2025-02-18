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
 * @Description: 仪器损坏
 * @Date:   2025-02-18
 * @Version: V1.0
 */
@Data
@TableName("instrument_damage_record")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@ApiModel(value="instrument_damage_record对象", description="仪器损坏")
public class InstrumentDamageRecord implements Serializable {
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
	/**损坏日期*/
	@Excel(name = "损坏日期", width = 15, format = "yyyy-MM-dd")
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @ApiModelProperty(value = "损坏日期")
    private java.util.Date dateOfDamage;
	/**损坏仪器班级*/
	@Excel(name = "损坏仪器班级", width = 15)
    @ApiModelProperty(value = "损坏仪器班级")
    private java.lang.String damagedInstrumentClass;
	/**损坏仪器人姓名*/
	@Excel(name = "损坏仪器人姓名", width = 15)
    @ApiModelProperty(value = "损坏仪器人姓名")
    private java.lang.String personDamagedTheInstrument;
	/**损坏仪器名称*/
	@Excel(name = "损坏仪器名称", width = 15)
    @ApiModelProperty(value = "损坏仪器名称")
    private java.lang.String damagedInstrument;
	/**损坏仪器单位*/
	@Excel(name = "损坏仪器单位", width = 15)
    @ApiModelProperty(value = "损坏仪器单位")
    private java.lang.String unit;
	/**损坏仪器单价*/
	@Excel(name = "损坏仪器单价", width = 15)
    @ApiModelProperty(value = "损坏仪器单价")
    private java.lang.Double unitPrice;
	/**损坏仪器数量*/
	@Excel(name = "损坏仪器数量", width = 15)
    @ApiModelProperty(value = "损坏仪器数量")
    private java.lang.Double quantity;
	/**损坏仪器金额*/
	@Excel(name = "损坏仪器金额", width = 15)
    @ApiModelProperty(value = "损坏仪器金额")
    private java.lang.Double amount;
	/**损坏（丢失）及其原因*/
	@Excel(name = "损坏（丢失）及其原因", width = 15)
    @ApiModelProperty(value = "损坏（丢失）及其原因")
    private java.lang.String damageCause;
	/**经手人*/
	@Excel(name = "经手人", width = 15)
    @ApiModelProperty(value = "经手人")
    private java.lang.String operator;
	/**赔偿记录*/
	@Excel(name = "赔偿记录", width = 15)
    @ApiModelProperty(value = "赔偿记录")
    private java.lang.String claimRecord;
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
