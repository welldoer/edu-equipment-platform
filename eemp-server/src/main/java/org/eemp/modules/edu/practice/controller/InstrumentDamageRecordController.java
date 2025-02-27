package org.eemp.modules.edu.practice.controller;

import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.eemp.common.api.vo.Result;
import org.eemp.common.aspect.annotation.PermissionData;
import org.eemp.common.system.query.QueryGenerator;
import org.eemp.modules.edu.practice.entity.InstrumentDamageRecord;
import org.eemp.modules.edu.practice.service.IInstrumentDamageRecordService;

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
 * @Description: 仪器损坏
 * @Date:   2025-02-18
 * @Version: V1.0
 */
@Api(tags="仪器损坏")
@RestController
@RequestMapping("/org.eemp.modules.edu.practice/instrumentDamageRecord")
@Slf4j
public class InstrumentDamageRecordController extends BaseController<InstrumentDamageRecord, IInstrumentDamageRecordService> {
	@Autowired
	private IInstrumentDamageRecordService instrumentDamageRecordService;
	
	/**
	 * 分页列表查询
	 *
	 * @param instrumentDamageRecord
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "仪器损坏-分页列表查询")
	@ApiOperation(value="仪器损坏-分页列表查询", notes="仪器损坏-分页列表查询")
	@GetMapping(value = "/list")
	@PermissionData(pageComponent = "edu/practice/InstrumentDamageRecordList")
	public Result<IPage<InstrumentDamageRecord>> queryPageList(InstrumentDamageRecord instrumentDamageRecord,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<InstrumentDamageRecord> queryWrapper = QueryGenerator.initQueryWrapper(instrumentDamageRecord, req.getParameterMap());
		Page<InstrumentDamageRecord> page = new Page<InstrumentDamageRecord>(pageNo, pageSize);
		IPage<InstrumentDamageRecord> pageList = instrumentDamageRecordService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param instrumentDamageRecord
	 * @return
	 */
	@AutoLog(value = "仪器损坏-添加")
	@ApiOperation(value="仪器损坏-添加", notes="仪器损坏-添加")
	@RequiresPermissions("edu.practice:instrument_damage_record:add")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody InstrumentDamageRecord instrumentDamageRecord) {
		instrumentDamageRecordService.save(instrumentDamageRecord);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param instrumentDamageRecord
	 * @return
	 */
	@AutoLog(value = "仪器损坏-编辑")
	@ApiOperation(value="仪器损坏-编辑", notes="仪器损坏-编辑")
	@RequiresPermissions("edu.practice:instrument_damage_record:edit")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody InstrumentDamageRecord instrumentDamageRecord) {
		instrumentDamageRecordService.updateById(instrumentDamageRecord);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "仪器损坏-通过id删除")
	@ApiOperation(value="仪器损坏-通过id删除", notes="仪器损坏-通过id删除")
	@RequiresPermissions("edu.practice:instrument_damage_record:delete")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		instrumentDamageRecordService.removeById(id);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "仪器损坏-批量删除")
	@ApiOperation(value="仪器损坏-批量删除", notes="仪器损坏-批量删除")
	@RequiresPermissions("edu.practice:instrument_damage_record:deleteBatch")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.instrumentDamageRecordService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "仪器损坏-通过id查询")
	@ApiOperation(value="仪器损坏-通过id查询", notes="仪器损坏-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<InstrumentDamageRecord> queryById(@RequestParam(name="id",required=true) String id) {
		InstrumentDamageRecord instrumentDamageRecord = instrumentDamageRecordService.getById(id);
		if(instrumentDamageRecord==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(instrumentDamageRecord);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param instrumentDamageRecord
    */
    @RequiresPermissions("edu.practice:instrument_damage_record:exportXls")
    @RequestMapping(value = "/exportXls")
	@PermissionData(pageComponent = "edu/practice/InstrumentDamageRecordList")
    public ModelAndView exportXls(HttpServletRequest request, InstrumentDamageRecord instrumentDamageRecord) {
        return super.exportXls(request, instrumentDamageRecord, InstrumentDamageRecord.class, "仪器损坏");
    }

    /**
      * 通过excel导入数据
    *
    * @param request
    * @param response
    * @return
    */
    @RequiresPermissions("edu.practice:instrument_damage_record:importExcel")
    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    public Result<?> importExcel(HttpServletRequest request, HttpServletResponse response) {
        return super.importExcel(request, response, InstrumentDamageRecord.class);
    }

}
