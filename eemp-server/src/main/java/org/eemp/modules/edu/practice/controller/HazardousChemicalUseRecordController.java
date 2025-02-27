package org.eemp.modules.edu.practice.controller;

import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.eemp.common.api.vo.Result;
import org.eemp.common.aspect.annotation.PermissionData;
import org.eemp.common.system.query.QueryGenerator;
import org.eemp.modules.edu.practice.entity.HazardousChemicalUseRecord;
import org.eemp.modules.edu.practice.service.IHazardousChemicalUseRecordService;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;

import org.eemp.common.system.base.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.eemp.common.aspect.annotation.AutoLog;
import org.apache.shiro.authz.annotation.RequiresPermissions;

 /**
 * @Description: 危化品使用
 * @Date:   2025-02-18
 * @Version: V1.0
 */
@Api(tags="危化品使用")
@RestController
@RequestMapping("/org.eemp.modules.edu.practice/hazardousChemicalUseRecord")
@Slf4j
public class HazardousChemicalUseRecordController extends BaseController<HazardousChemicalUseRecord, IHazardousChemicalUseRecordService> {
	@Autowired
	private IHazardousChemicalUseRecordService hazardousChemicalUseRecordService;
	
	/**
	 * 分页列表查询
	 *
	 * @param hazardousChemicalUseRecord
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "危化品使用-分页列表查询")
	@ApiOperation(value="危化品使用-分页列表查询", notes="危化品使用-分页列表查询")
	@GetMapping(value = "/list")
	@PermissionData(pageComponent = "edu/practice/HazardousChemicalUseRecordList")
	public Result<IPage<HazardousChemicalUseRecord>> queryPageList(HazardousChemicalUseRecord hazardousChemicalUseRecord,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<HazardousChemicalUseRecord> queryWrapper = QueryGenerator.initQueryWrapper(hazardousChemicalUseRecord, req.getParameterMap());
		Page<HazardousChemicalUseRecord> page = new Page<HazardousChemicalUseRecord>(pageNo, pageSize);
		IPage<HazardousChemicalUseRecord> pageList = hazardousChemicalUseRecordService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param hazardousChemicalUseRecord
	 * @return
	 */
	@AutoLog(value = "危化品使用-添加")
	@ApiOperation(value="危化品使用-添加", notes="危化品使用-添加")
	@RequiresPermissions("edu.practice:hazardous_chemical_use_record:add")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody HazardousChemicalUseRecord hazardousChemicalUseRecord) {
		hazardousChemicalUseRecordService.save(hazardousChemicalUseRecord);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param hazardousChemicalUseRecord
	 * @return
	 */
	@AutoLog(value = "危化品使用-编辑")
	@ApiOperation(value="危化品使用-编辑", notes="危化品使用-编辑")
	@RequiresPermissions("edu.practice:hazardous_chemical_use_record:edit")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody HazardousChemicalUseRecord hazardousChemicalUseRecord) {
		hazardousChemicalUseRecordService.updateById(hazardousChemicalUseRecord);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "危化品使用-通过id删除")
	@ApiOperation(value="危化品使用-通过id删除", notes="危化品使用-通过id删除")
	@RequiresPermissions("edu.practice:hazardous_chemical_use_record:delete")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		hazardousChemicalUseRecordService.removeById(id);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "危化品使用-批量删除")
	@ApiOperation(value="危化品使用-批量删除", notes="危化品使用-批量删除")
	@RequiresPermissions("edu.practice:hazardous_chemical_use_record:deleteBatch")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.hazardousChemicalUseRecordService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "危化品使用-通过id查询")
	@ApiOperation(value="危化品使用-通过id查询", notes="危化品使用-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<HazardousChemicalUseRecord> queryById(@RequestParam(name="id",required=true) String id) {
		HazardousChemicalUseRecord hazardousChemicalUseRecord = hazardousChemicalUseRecordService.getById(id);
		if(hazardousChemicalUseRecord==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(hazardousChemicalUseRecord);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param hazardousChemicalUseRecord
    */
    @RequiresPermissions("edu.practice:hazardous_chemical_use_record:exportXls")
    @RequestMapping(value = "/exportXls")
	@PermissionData(pageComponent = "edu/practice/HazardousChemicalUseRecordList")
    public ModelAndView exportXls(HttpServletRequest request, HazardousChemicalUseRecord hazardousChemicalUseRecord) {
        return super.exportXls(request, hazardousChemicalUseRecord, HazardousChemicalUseRecord.class, "危化品使用");
    }

    /**
      * 通过excel导入数据
    *
    * @param request
    * @param response
    * @return
    */
    @RequiresPermissions("edu.practice:hazardous_chemical_use_record:importExcel")
    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    public Result<?> importExcel(HttpServletRequest request, HttpServletResponse response) {
        return super.importExcel(request, response, HazardousChemicalUseRecord.class);
    }

}
