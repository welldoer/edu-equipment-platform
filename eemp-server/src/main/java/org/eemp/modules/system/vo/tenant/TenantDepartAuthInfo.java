package org.eemp.modules.system.vo.tenant;

import java.util.List;

import lombok.Data;
import org.eemp.modules.system.entity.SysTenant;

/**
 * 进入租户组织页面 查询租户信息及操作权限
 * @Author taoYan
 * @Date 2023/2/16 16:18
 **/
@Data
public class TenantDepartAuthInfo {

    /**
     * 当前用户是不是 超级管理员
     */
    private boolean superAdmin;

    /**
     * 租户信息
     */
    private SysTenant sysTenant;

    /**
     * 统计租户产品包人员数量
     */
    private List<TenantPackUserCount> packCountList;

    /**
     * 租户产品包 编码(这个编码只有3个admin产品包有，便于区分)
     */
    private List<String> packCodes;
    
}
