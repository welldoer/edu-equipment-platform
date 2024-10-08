package org.eemp.modules.edu.deployment.mapper;

import org.apache.ibatis.annotations.Update;
import org.eemp.modules.edu.deployment.entity.InfoOfDeployment;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * @Description: 资源配置统计
 * @Date:   2024-10-08
 * @Version: V1.0
 */
public interface InfoOfDeploymentMapper extends BaseMapper<InfoOfDeployment> {

    @Update("UPDATE education_resource_deployment SET reported=#{val} WHERE id=#{id}")
    int changeReported(String id, int val);

}
