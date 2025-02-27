package org.eemp.modules.edu.practice.controller;

import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.eemp.common.api.vo.Result;
import org.eemp.common.aspect.annotation.PermissionData;
import org.eemp.common.system.query.QueryGenerator;
import org.eemp.modules.edu.practice.entity.ExperimentalTeachingRecords;
import org.eemp.modules.edu.practice.service.IExperimentalTeachingRecordsService;

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
 * @Description: 实验教学记载
 * @Date:   2025-02-12
 * @Version: V1.0
 */
@Api(tags="实验教学记载")
@RestController
@RequestMapping("/org.eemp.modules.edu.practice/experimentalTeachingRecords")
@Slf4j
public class ExperimentalTeachingRecordsController extends BaseController<ExperimentalTeachingRecords, IExperimentalTeachingRecordsService> {
	@Autowired
	private IExperimentalTeachingRecordsService experimentalTeachingRecordsService;
	
	/**
	 * 分页列表查询
	 *
	 * @param experimentalTeachingRecords
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "实验教学记载-分页列表查询")
	@ApiOperation(value="实验教学记载-分页列表查询", notes="实验教学记载-分页列表查询")
	@GetMapping(value = "/list")
	@PermissionData(pageComponent = "edu/practice/ExperimentalTeachingRecordsList")
	public Result<IPage<ExperimentalTeachingRecords>> queryPageList(ExperimentalTeachingRecords experimentalTeachingRecords,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<ExperimentalTeachingRecords> queryWrapper = QueryGenerator.initQueryWrapper(experimentalTeachingRecords, req.getParameterMap());
		Page<ExperimentalTeachingRecords> page = new Page<ExperimentalTeachingRecords>(pageNo, pageSize);
		IPage<ExperimentalTeachingRecords> pageList = experimentalTeachingRecordsService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param experimentalTeachingRecords
	 * @return
	 */
	@AutoLog(value = "实验教学记载-添加")
	@ApiOperation(value="实验教学记载-添加", notes="实验教学记载-添加")
	@RequiresPermissions("edu.practice:experimental_teaching_records:add")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody ExperimentalTeachingRecords experimentalTeachingRecords) {
		experimentalTeachingRecordsService.save(experimentalTeachingRecords);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param experimentalTeachingRecords
	 * @return
	 */
	@AutoLog(value = "实验教学记载-编辑")
	@ApiOperation(value="实验教学记载-编辑", notes="实验教学记载-编辑")
	@RequiresPermissions("edu.practice:experimental_teaching_records:edit")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody ExperimentalTeachingRecords experimentalTeachingRecords) {
		experimentalTeachingRecordsService.updateById(experimentalTeachingRecords);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "实验教学记载-通过id删除")
	@ApiOperation(value="实验教学记载-通过id删除", notes="实验教学记载-通过id删除")
	@RequiresPermissions("edu.practice:experimental_teaching_records:delete")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		experimentalTeachingRecordsService.removeById(id);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "实验教学记载-批量删除")
	@ApiOperation(value="实验教学记载-批量删除", notes="实验教学记载-批量删除")
	@RequiresPermissions("edu.practice:experimental_teaching_records:deleteBatch")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.experimentalTeachingRecordsService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "实验教学记载-通过id查询")
	@ApiOperation(value="实验教学记载-通过id查询", notes="实验教学记载-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<ExperimentalTeachingRecords> queryById(@RequestParam(name="id",required=true) String id) {
		ExperimentalTeachingRecords experimentalTeachingRecords = experimentalTeachingRecordsService.getById(id);
		if(experimentalTeachingRecords==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(experimentalTeachingRecords);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param experimentalTeachingRecords
    */
    @RequiresPermissions("edu.practice:experimental_teaching_records:exportXls")
    @RequestMapping(value = "/exportXls")
	@PermissionData(pageComponent = "edu/practice/ExperimentalTeachingRecordsList")
    public ModelAndView exportXls(HttpServletRequest request, ExperimentalTeachingRecords experimentalTeachingRecords) {
        return super.exportXls(request, experimentalTeachingRecords, ExperimentalTeachingRecords.class, "实验教学记载");
    }

    /**
      * 通过excel导入数据
    *
    * @param request
    * @param response
    * @return
    */
    @RequiresPermissions("edu.practice:experimental_teaching_records:importExcel")
    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    public Result<?> importExcel(HttpServletRequest request, HttpServletResponse response) {
        return super.importExcel(request, response, ExperimentalTeachingRecords.class);
    }

}
