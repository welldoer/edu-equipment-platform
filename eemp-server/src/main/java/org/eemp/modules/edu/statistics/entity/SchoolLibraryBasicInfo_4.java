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
 * @Description: 中小学图书室（馆）基本情况统计表（四）
 * @Date:   2023-07-07
 * @Version: V1.0
 */
@Data
@TableName("school_library_basic_info_4")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@ApiModel(value="school_library_basic_info_4对象", description="中小学图书室（馆）基本情况统计表（四）")
public class SchoolLibraryBasicInfo_4 implements Serializable {
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
	/**藏书室间数*/
	@Excel(name = "藏书室间数", width = 15)
    @ApiModelProperty(value = "藏书室间数")
    private java.lang.Integer libraryNum;
	/**藏书室总面积（m2）*/
	@Excel(name = "藏书室总面积（m2）", width = 15)
    @ApiModelProperty(value = "藏书室总面积（m2）")
    private java.lang.Double libraryArea;
	/**阅览室面积（m2）*/
	@Excel(name = "阅览室面积（m2）", width = 15)
    @ApiModelProperty(value = "阅览室面积（m2）")
    private java.lang.Double readingRoomArea;
	/**阅览室阅览桌（张）*/
	@Excel(name = "阅览室阅览桌（张）", width = 15)
    @ApiModelProperty(value = "阅览室阅览桌（张）")
    private java.lang.Integer readingRoomTableNum;
	/**藏书册数*/
	@Excel(name = "藏书册数", width = 15)
    @ApiModelProperty(value = "藏书册数")
    private java.lang.Integer bookNum;
	/**是否配备图书管理软件*/
	@Excel(name = "是否配备图书管理软件", width = 15, dicCode = "yn")
    @Dict(dicCode = "yn")
    @ApiModelProperty(value = "是否配备图书管理软件")
    private java.lang.String hasABookManagementSystem;
	/**生均册数*/
	@Excel(name = "生均册数", width = 15)
    @ApiModelProperty(value = "生均册数")
    private java.lang.Double averageBooksPerStudent;
	/**特色读书场所一名称*/
	@Excel(name = "特色读书场所一名称", width = 15)
    @ApiModelProperty(value = "特色读书场所一名称")
    private java.lang.String firstFeaturedPlaceName;
	/**特色读书场所一数量*/
	@Excel(name = "特色读书场所一数量", width = 15)
    @ApiModelProperty(value = "特色读书场所一数量")
    private java.lang.Integer firstFeaturedPlaceNum;
	/**特色读书场所一总面积（m2）*/
	@Excel(name = "特色读书场所一总面积（m2）", width = 15)
    @ApiModelProperty(value = "特色读书场所一总面积（m2）")
    private java.lang.Double firstFeaturedPlaceArea;
	/**特色读书场所二名称*/
	@Excel(name = "特色读书场所二名称", width = 15)
    @ApiModelProperty(value = "特色读书场所二名称")
    private java.lang.String secondFeaturedPlaceName;
	/**特色读书场所二数量*/
	@Excel(name = "特色读书场所二数量", width = 15)
    @ApiModelProperty(value = "特色读书场所二数量")
    private java.lang.Integer secondFeaturedPlaceNum;
	/**特色读书场所二总面积（m2）*/
	@Excel(name = "特色读书场所二总面积（m2）", width = 15)
    @ApiModelProperty(value = "特色读书场所二总面积（m2）")
    private java.lang.Double secondFeaturedPlaceArea;
	/**专职管理员姓名*/
	@Excel(name = "专职管理员姓名", width = 15)
    @ApiModelProperty(value = "专职管理员姓名")
    private java.lang.String fullTimeAdminName;
	/**兼职管理员姓名*/
	@Excel(name = "兼职管理员姓名", width = 15)
    @ApiModelProperty(value = "兼职管理员姓名")
    private java.lang.String partTimeAdminName;
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
