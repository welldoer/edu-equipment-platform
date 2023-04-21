package org.eemp.modules.system.vo.lowapp;

import java.io.Serializable;
import java.util.List;

import lombok.Data;
import org.eemp.modules.system.vo.UserAvatar;

/**
 * 用户或者部门的信息
 * 用于 成员与部门 的搜索
 * @Author taoYan
 * @Date 2022/12/30 10:47
 **/
@Data
public class DepartAndUserInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    
    List<UserAvatar> userList;
    
    List<DepartInfo> departList;
    
}
