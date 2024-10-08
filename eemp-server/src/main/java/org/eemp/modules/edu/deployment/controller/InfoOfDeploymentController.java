package org.eemp.modules.edu.deployment.controller;

import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;
import org.eemp.common.api.vo.Result;
import org.eemp.common.aspect.annotation.PermissionData;
import org.eemp.common.system.query.QueryGenerator;
import org.eemp.modules.edu.foudation.service.IFillingControlService;
import org.eemp.modules.edu.deployment.entity.InfoOfDeployment;
import org.eemp.modules.edu.deployment.service.IInfoOfDeploymentService;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;

import org.eemp.common.system.base.controller.BaseController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.eemp.common.aspect.annotation.AutoLog;
import org.apache.shiro.authz.annotation.RequiresPermissions;

/**
 * @Description: 资源配置统计
 * @Date:   2024-10-08
 * @Version: V1.0
 */
@Api(tags="资源配置统计")
@RestController
@RequestMapping("/org.eemp.modules.edu.deployment/infoOfDeployment")
@Slf4j
@RequiredArgsConstructor
public class InfoOfDeploymentController extends BaseController<InfoOfDeployment, IInfoOfDeploymentService> {
	private final IInfoOfDeploymentService infoOfDeploymentService;
	private final IFillingControlService fillingControlService;

	/**
	 * 分页列表查询
	 *
	 * @param infoOfDeployment
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "资源配置统计-分页列表查询")
	@ApiOperation(value="资源配置统计-分页列表查询", notes="资源配置统计-分页列表查询")
	@GetMapping(value = "/list")
	@PermissionData(pageComponent = "edu/deployment/infoOfDeploymentList")
	public Result<IPage<InfoOfDeployment>> queryPageList(InfoOfDeployment infoOfDeployment,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<InfoOfDeployment> queryWrapper = QueryGenerator.initQueryWrapper(infoOfDeployment, req.getParameterMap());
		Page<InfoOfDeployment> page = new Page<>(pageNo, pageSize);
		IPage<InfoOfDeployment> pageList = infoOfDeploymentService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param infoOfDeployment
	 * @return
	 */
	@AutoLog(value = "资源配置统计-添加")
	@ApiOperation(value="资源配置统计-添加", notes="资源配置统计-添加")
	@RequiresPermissions("edu.deployment:info_of_deployment:add")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody InfoOfDeployment infoOfDeployment) {
		infoOfDeploymentService.save(infoOfDeployment);
		boolean rst = fillingControlService.updateFillingControlAfterNewData(
				infoOfDeployment.getIdentificationCode(),
				"info_of_deployment",
				infoOfDeployment.getId()
		);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param infoOfDeployment
	 * @return
	 */
	@AutoLog(value = "资源配置统计-编辑")
	@ApiOperation(value="资源配置统计-编辑", notes="资源配置统计-编辑")
	@RequiresPermissions("edu.deployment:info_of_deployment:edit")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody InfoOfDeployment infoOfDeployment) {
		infoOfDeploymentService.updateById(infoOfDeployment);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "资源配置统计-通过id删除")
	@ApiOperation(value="资源配置统计-通过id删除", notes="资源配置统计-通过id删除")
	@RequiresPermissions("edu.deployment:info_of_deployment:delete")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		InfoOfDeployment rec = infoOfDeploymentService.getById(id);
		infoOfDeploymentService.removeById(id);
		boolean rst = fillingControlService.updateFillingControlAfterDeleteData(
				rec.getIdentificationCode(),
				"info_of_deployment",
				id
		);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "资源配置统计-批量删除")
	@ApiOperation(value="资源配置统计-批量删除", notes="资源配置统计-批量删除")
	@RequiresPermissions("edu.deployment:info_of_deployment:deleteBatch")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.infoOfDeploymentService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "资源配置统计-通过id查询")
	@ApiOperation(value="资源配置统计-通过id查询", notes="资源配置统计-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<InfoOfDeployment> queryById(@RequestParam(name="id",required=true) String id) {
		InfoOfDeployment infoOfDeployment = infoOfDeploymentService.getById(id);
		if(infoOfDeployment==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(infoOfDeployment);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param infoOfDeployment
    */
    @RequiresPermissions("edu.deployment:info_of_deployment:exportXls")
    @RequestMapping(value = "/exportXls")
	@PermissionData(pageComponent = "edu/deployment/infoOfDeploymentList")
    public ModelAndView exportXls(HttpServletRequest request, InfoOfDeployment infoOfDeployment) {
        return super.exportXls(request, infoOfDeployment, InfoOfDeployment.class, "资源配置统计");
    }

    /**
      * 通过excel导入数据
    *
    * @param request
    * @param response
    * @return
    */
    @RequiresPermissions("edu.deployment:info_of_deployment:importExcel")
    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    public Result<?> importExcel(HttpServletRequest request, HttpServletResponse response) {
        return super.importExcel(request, response, InfoOfDeployment.class);
    }

	@RequiresPermissions("edu.deployment:info_of_deployment:report")
	@PostMapping(value = "/report")
	public Result<String> report(@RequestParam(name="identificationCode", required=true) String identificationCode, @RequestParam(name="id", required=true) String id) {
		infoOfDeploymentService.changeReported(id, 1);
		boolean rst = fillingControlService.updateFillingControlAfterReported(
				identificationCode,
				"info_of_deployment"
		);
		return Result.OK("上报成功!");
	}

	@RequiresPermissions("edu.deployment:info_of_deployment:revoke")
	@PostMapping(value = "/revoke")
	public Result<String> revoke(@RequestParam(name="ids", required=true) String ids) {
		for (String id: ids.split(",")) {
			InfoOfDeployment rec = infoOfDeploymentService.getById(id);
			infoOfDeploymentService.changeReported(id, 0);
			boolean rst = fillingControlService.updateFillingControlAfterRevoked(
					rec.getIdentificationCode(),
					"info_of_deployment"
			);
		}
		return Result.OK("退回成功!");
	}

}
