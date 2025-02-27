package org.eemp.modules.edu.practice.controller;

import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.eemp.common.api.vo.Result;
import org.eemp.common.aspect.annotation.PermissionData;
import org.eemp.common.system.query.QueryGenerator;
import org.eemp.modules.edu.practice.entity.FusionOfSubjects;
import org.eemp.modules.edu.practice.service.IFusionOfSubjectsService;

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
 * @Description: 学科融合
 * @Date:   2025-02-19
 * @Version: V1.0
 */
@Api(tags="学科融合")
@RestController
@RequestMapping("/org.eemp.modules.edu.practice/fusionOfSubjects")
@Slf4j
public class FusionOfSubjectsController extends BaseController<FusionOfSubjects, IFusionOfSubjectsService> {
	@Autowired
	private IFusionOfSubjectsService fusionOfSubjectsService;
	
	/**
	 * 分页列表查询
	 *
	 * @param fusionOfSubjects
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "学科融合-分页列表查询")
	@ApiOperation(value="学科融合-分页列表查询", notes="学科融合-分页列表查询")
	@GetMapping(value = "/list")
	@PermissionData(pageComponent = "edu/practice/FusionOfSubjectsList")
	public Result<IPage<FusionOfSubjects>> queryPageList(FusionOfSubjects fusionOfSubjects,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<FusionOfSubjects> queryWrapper = QueryGenerator.initQueryWrapper(fusionOfSubjects, req.getParameterMap());
		Page<FusionOfSubjects> page = new Page<FusionOfSubjects>(pageNo, pageSize);
		IPage<FusionOfSubjects> pageList = fusionOfSubjectsService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param fusionOfSubjects
	 * @return
	 */
	@AutoLog(value = "学科融合-添加")
	@ApiOperation(value="学科融合-添加", notes="学科融合-添加")
	@RequiresPermissions("edu.practice:fusion_of_subjects:add")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody FusionOfSubjects fusionOfSubjects) {
		fusionOfSubjectsService.save(fusionOfSubjects);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param fusionOfSubjects
	 * @return
	 */
	@AutoLog(value = "学科融合-编辑")
	@ApiOperation(value="学科融合-编辑", notes="学科融合-编辑")
	@RequiresPermissions("edu.practice:fusion_of_subjects:edit")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody FusionOfSubjects fusionOfSubjects) {
		fusionOfSubjectsService.updateById(fusionOfSubjects);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "学科融合-通过id删除")
	@ApiOperation(value="学科融合-通过id删除", notes="学科融合-通过id删除")
	@RequiresPermissions("edu.practice:fusion_of_subjects:delete")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		fusionOfSubjectsService.removeById(id);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "学科融合-批量删除")
	@ApiOperation(value="学科融合-批量删除", notes="学科融合-批量删除")
	@RequiresPermissions("edu.practice:fusion_of_subjects:deleteBatch")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.fusionOfSubjectsService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "学科融合-通过id查询")
	@ApiOperation(value="学科融合-通过id查询", notes="学科融合-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<FusionOfSubjects> queryById(@RequestParam(name="id",required=true) String id) {
		FusionOfSubjects fusionOfSubjects = fusionOfSubjectsService.getById(id);
		if(fusionOfSubjects==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(fusionOfSubjects);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param fusionOfSubjects
    */
    @RequiresPermissions("edu.practice:fusion_of_subjects:exportXls")
    @RequestMapping(value = "/exportXls")
	@PermissionData(pageComponent = "edu/practice/FusionOfSubjectsList")
    public ModelAndView exportXls(HttpServletRequest request, FusionOfSubjects fusionOfSubjects) {
        return super.exportXls(request, fusionOfSubjects, FusionOfSubjects.class, "学科融合");
    }

    /**
      * 通过excel导入数据
    *
    * @param request
    * @param response
    * @return
    */
    @RequiresPermissions("edu.practice:fusion_of_subjects:importExcel")
    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    public Result<?> importExcel(HttpServletRequest request, HttpServletResponse response) {
        return super.importExcel(request, response, FusionOfSubjects.class);
    }

}
