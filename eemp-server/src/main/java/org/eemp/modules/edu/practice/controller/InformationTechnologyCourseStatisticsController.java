package org.eemp.modules.edu.practice.controller;

import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.eemp.common.api.vo.Result;
import org.eemp.common.aspect.annotation.PermissionData;
import org.eemp.common.system.query.QueryGenerator;
import org.eemp.modules.edu.practice.entity.InformationTechnologyCourseStatistics;
import org.eemp.modules.edu.practice.service.IInformationTechnologyCourseStatisticsService;

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
 * @Description: 信息教学统计
 * @Date:   2025-02-28
 * @Version: V1.0
 */
@Api(tags="信息教学统计")
@RestController
@RequestMapping("/org.eemp.modules.edu.practice/informationTechnologyCourseStatistics")
@Slf4j
public class InformationTechnologyCourseStatisticsController extends BaseController<InformationTechnologyCourseStatistics, IInformationTechnologyCourseStatisticsService> {
	@Autowired
	private IInformationTechnologyCourseStatisticsService informationTechnologyCourseStatisticsService;
	
	/**
	 * 分页列表查询
	 *
	 * @param informationTechnologyCourseStatistics
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "信息教学统计-分页列表查询")
	@ApiOperation(value="信息教学统计-分页列表查询", notes="信息教学统计-分页列表查询")
	@GetMapping(value = "/list")
	@PermissionData(pageComponent = "edu/practice/InformationTechnologyCourseStatisticsList")
	public Result<IPage<InformationTechnologyCourseStatistics>> queryPageList(InformationTechnologyCourseStatistics informationTechnologyCourseStatistics,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<InformationTechnologyCourseStatistics> queryWrapper = QueryGenerator.initQueryWrapper(informationTechnologyCourseStatistics, req.getParameterMap());
		Page<InformationTechnologyCourseStatistics> page = new Page<InformationTechnologyCourseStatistics>(pageNo, pageSize);
		IPage<InformationTechnologyCourseStatistics> pageList = informationTechnologyCourseStatisticsService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param informationTechnologyCourseStatistics
	 * @return
	 */
	@AutoLog(value = "信息教学统计-添加")
	@ApiOperation(value="信息教学统计-添加", notes="信息教学统计-添加")
	@RequiresPermissions("edu.practice:information_technology_course_statistics:add")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody InformationTechnologyCourseStatistics informationTechnologyCourseStatistics) {
		informationTechnologyCourseStatisticsService.save(informationTechnologyCourseStatistics);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param informationTechnologyCourseStatistics
	 * @return
	 */
	@AutoLog(value = "信息教学统计-编辑")
	@ApiOperation(value="信息教学统计-编辑", notes="信息教学统计-编辑")
	@RequiresPermissions("edu.practice:information_technology_course_statistics:edit")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody InformationTechnologyCourseStatistics informationTechnologyCourseStatistics) {
		informationTechnologyCourseStatisticsService.updateById(informationTechnologyCourseStatistics);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "信息教学统计-通过id删除")
	@ApiOperation(value="信息教学统计-通过id删除", notes="信息教学统计-通过id删除")
	@RequiresPermissions("edu.practice:information_technology_course_statistics:delete")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		informationTechnologyCourseStatisticsService.removeById(id);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "信息教学统计-批量删除")
	@ApiOperation(value="信息教学统计-批量删除", notes="信息教学统计-批量删除")
	@RequiresPermissions("edu.practice:information_technology_course_statistics:deleteBatch")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.informationTechnologyCourseStatisticsService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "信息教学统计-通过id查询")
	@ApiOperation(value="信息教学统计-通过id查询", notes="信息教学统计-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<InformationTechnologyCourseStatistics> queryById(@RequestParam(name="id",required=true) String id) {
		InformationTechnologyCourseStatistics informationTechnologyCourseStatistics = informationTechnologyCourseStatisticsService.getById(id);
		if(informationTechnologyCourseStatistics==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(informationTechnologyCourseStatistics);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param informationTechnologyCourseStatistics
    */
    @RequiresPermissions("edu.practice:information_technology_course_statistics:exportXls")
    @RequestMapping(value = "/exportXls")
	@PermissionData(pageComponent = "edu/practice/InformationTechnologyCourseStatisticsList")
    public ModelAndView exportXls(HttpServletRequest request, InformationTechnologyCourseStatistics informationTechnologyCourseStatistics) {
        return super.exportXls(request, informationTechnologyCourseStatistics, InformationTechnologyCourseStatistics.class, "信息教学统计");
    }

    /**
      * 通过excel导入数据
    *
    * @param request
    * @param response
    * @return
    */
    @RequiresPermissions("edu.practice:information_technology_course_statistics:importExcel")
    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    public Result<?> importExcel(HttpServletRequest request, HttpServletResponse response) {
        return super.importExcel(request, response, InformationTechnologyCourseStatistics.class);
    }

}
