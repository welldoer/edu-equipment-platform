package org.eemp.modules.edu.practice.controller;

import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.eemp.common.api.vo.Result;
import org.eemp.common.aspect.annotation.PermissionData;
import org.eemp.common.system.query.QueryGenerator;
import org.eemp.modules.edu.practice.entity.HazardousChemicalRegistration;
import org.eemp.modules.edu.practice.service.IHazardousChemicalRegistrationService;

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
 * @Description: 危化品登记
 * @Date:   2025-02-14
 * @Version: V1.0
 */
@Api(tags="危化品登记")
@RestController
@RequestMapping("/org.eemp.modules.edu.practice/hazardousChemicalRegistration")
@Slf4j
public class HazardousChemicalRegistrationController extends BaseController<HazardousChemicalRegistration, IHazardousChemicalRegistrationService> {
	@Autowired
	private IHazardousChemicalRegistrationService hazardousChemicalRegistrationService;
	
	/**
	 * 分页列表查询
	 *
	 * @param hazardousChemicalRegistration
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "危化品登记-分页列表查询")
	@ApiOperation(value="危化品登记-分页列表查询", notes="危化品登记-分页列表查询")
	@GetMapping(value = "/list")
	@PermissionData(pageComponent = "edu/practice/HazardousChemicalRegistrationList")
	public Result<IPage<HazardousChemicalRegistration>> queryPageList(HazardousChemicalRegistration hazardousChemicalRegistration,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<HazardousChemicalRegistration> queryWrapper = QueryGenerator.initQueryWrapper(hazardousChemicalRegistration, req.getParameterMap());
		Page<HazardousChemicalRegistration> page = new Page<HazardousChemicalRegistration>(pageNo, pageSize);
		IPage<HazardousChemicalRegistration> pageList = hazardousChemicalRegistrationService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param hazardousChemicalRegistration
	 * @return
	 */
	@AutoLog(value = "危化品登记-添加")
	@ApiOperation(value="危化品登记-添加", notes="危化品登记-添加")
	@RequiresPermissions("edu.practice:hazardous_chemical_registration:add")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody HazardousChemicalRegistration hazardousChemicalRegistration) {
		hazardousChemicalRegistrationService.save(hazardousChemicalRegistration);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param hazardousChemicalRegistration
	 * @return
	 */
	@AutoLog(value = "危化品登记-编辑")
	@ApiOperation(value="危化品登记-编辑", notes="危化品登记-编辑")
	@RequiresPermissions("edu.practice:hazardous_chemical_registration:edit")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody HazardousChemicalRegistration hazardousChemicalRegistration) {
		hazardousChemicalRegistrationService.updateById(hazardousChemicalRegistration);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "危化品登记-通过id删除")
	@ApiOperation(value="危化品登记-通过id删除", notes="危化品登记-通过id删除")
	@RequiresPermissions("edu.practice:hazardous_chemical_registration:delete")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		hazardousChemicalRegistrationService.removeById(id);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "危化品登记-批量删除")
	@ApiOperation(value="危化品登记-批量删除", notes="危化品登记-批量删除")
	@RequiresPermissions("edu.practice:hazardous_chemical_registration:deleteBatch")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.hazardousChemicalRegistrationService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "危化品登记-通过id查询")
	@ApiOperation(value="危化品登记-通过id查询", notes="危化品登记-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<HazardousChemicalRegistration> queryById(@RequestParam(name="id",required=true) String id) {
		HazardousChemicalRegistration hazardousChemicalRegistration = hazardousChemicalRegistrationService.getById(id);
		if(hazardousChemicalRegistration==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(hazardousChemicalRegistration);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param hazardousChemicalRegistration
    */
    @RequiresPermissions("edu.practice:hazardous_chemical_registration:exportXls")
    @RequestMapping(value = "/exportXls")
	@PermissionData(pageComponent = "edu/practice/HazardousChemicalRegistrationList")
    public ModelAndView exportXls(HttpServletRequest request, HazardousChemicalRegistration hazardousChemicalRegistration) {
        return super.exportXls(request, hazardousChemicalRegistration, HazardousChemicalRegistration.class, "危化品登记");
    }

    /**
      * 通过excel导入数据
    *
    * @param request
    * @param response
    * @return
    */
    @RequiresPermissions("edu.practice:hazardous_chemical_registration:importExcel")
    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    public Result<?> importExcel(HttpServletRequest request, HttpServletResponse response) {
        return super.importExcel(request, response, HazardousChemicalRegistration.class);
    }

}
