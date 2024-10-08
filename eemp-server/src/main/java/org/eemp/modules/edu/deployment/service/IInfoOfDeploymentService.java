package org.eemp.modules.edu.deployment.service;

import org.eemp.modules.edu.deployment.entity.InfoOfDeployment;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * @Description: 资源配置统计
 * @Date:   2024-10-08
 * @Version: V1.0
 */
public interface IInfoOfDeploymentService extends IService<InfoOfDeployment> {

    int changeReported(String id, int val);

}
