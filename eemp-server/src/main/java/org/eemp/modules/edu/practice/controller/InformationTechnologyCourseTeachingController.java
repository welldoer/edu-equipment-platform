package org.eemp.modules.edu.practice.controller;

import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.eemp.common.api.vo.Result;
import org.eemp.common.aspect.annotation.PermissionData;
import org.eemp.common.system.query.QueryGenerator;
import org.eemp.modules.edu.practice.entity.InformationTechnologyCourseTeaching;
import org.eemp.modules.edu.practice.service.IInformationTechnologyCourseTeachingService;

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
 * @Description: 信息课教学
 * @Date:   2025-02-18
 * @Version: V1.0
 */
@Api(tags="信息课教学")
@RestController
@RequestMapping("/org.eemp.modules.edu.practice/informationTechnologyCourseTeaching")
@Slf4j
public class InformationTechnologyCourseTeachingController extends BaseController<InformationTechnologyCourseTeaching, IInformationTechnologyCourseTeachingService> {
	@Autowired
	private IInformationTechnologyCourseTeachingService informationTechnologyCourseTeachingService;
	
	/**
	 * 分页列表查询
	 *
	 * @param informationTechnologyCourseTeaching
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "信息课教学-分页列表查询")
	@ApiOperation(value="信息课教学-分页列表查询", notes="信息课教学-分页列表查询")
	@GetMapping(value = "/list")
	@PermissionData(pageComponent = "edu/practice/InformationTechnologyCourseTeachingList")
	public Result<IPage<InformationTechnologyCourseTeaching>> queryPageList(InformationTechnologyCourseTeaching informationTechnologyCourseTeaching,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<InformationTechnologyCourseTeaching> queryWrapper = QueryGenerator.initQueryWrapper(informationTechnologyCourseTeaching, req.getParameterMap());
		Page<InformationTechnologyCourseTeaching> page = new Page<InformationTechnologyCourseTeaching>(pageNo, pageSize);
		IPage<InformationTechnologyCourseTeaching> pageList = informationTechnologyCourseTeachingService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param informationTechnologyCourseTeaching
	 * @return
	 */
	@AutoLog(value = "信息课教学-添加")
	@ApiOperation(value="信息课教学-添加", notes="信息课教学-添加")
	@RequiresPermissions("edu.practice:information_technology_course_teaching:add")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody InformationTechnologyCourseTeaching informationTechnologyCourseTeaching) {
		informationTechnologyCourseTeachingService.save(informationTechnologyCourseTeaching);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param informationTechnologyCourseTeaching
	 * @return
	 */
	@AutoLog(value = "信息课教学-编辑")
	@ApiOperation(value="信息课教学-编辑", notes="信息课教学-编辑")
	@RequiresPermissions("edu.practice:information_technology_course_teaching:edit")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody InformationTechnologyCourseTeaching informationTechnologyCourseTeaching) {
		informationTechnologyCourseTeachingService.updateById(informationTechnologyCourseTeaching);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "信息课教学-通过id删除")
	@ApiOperation(value="信息课教学-通过id删除", notes="信息课教学-通过id删除")
	@RequiresPermissions("edu.practice:information_technology_course_teaching:delete")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		informationTechnologyCourseTeachingService.removeById(id);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "信息课教学-批量删除")
	@ApiOperation(value="信息课教学-批量删除", notes="信息课教学-批量删除")
	@RequiresPermissions("edu.practice:information_technology_course_teaching:deleteBatch")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.informationTechnologyCourseTeachingService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "信息课教学-通过id查询")
	@ApiOperation(value="信息课教学-通过id查询", notes="信息课教学-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<InformationTechnologyCourseTeaching> queryById(@RequestParam(name="id",required=true) String id) {
		InformationTechnologyCourseTeaching informationTechnologyCourseTeaching = informationTechnologyCourseTeachingService.getById(id);
		if(informationTechnologyCourseTeaching==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(informationTechnologyCourseTeaching);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param informationTechnologyCourseTeaching
    */
    @RequiresPermissions("edu.practice:information_technology_course_teaching:exportXls")
    @RequestMapping(value = "/exportXls")
	@PermissionData(pageComponent = "edu/practice/InformationTechnologyCourseTeachingList")
    public ModelAndView exportXls(HttpServletRequest request, InformationTechnologyCourseTeaching informationTechnologyCourseTeaching) {
        return super.exportXls(request, informationTechnologyCourseTeaching, InformationTechnologyCourseTeaching.class, "信息课教学");
    }

    /**
      * 通过excel导入数据
    *
    * @param request
    * @param response
    * @return
    */
    @RequiresPermissions("edu.practice:information_technology_course_teaching:importExcel")
    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    public Result<?> importExcel(HttpServletRequest request, HttpServletResponse response) {
        return super.importExcel(request, response, InformationTechnologyCourseTeaching.class);
    }

}
