package org.eemp.modules.edu.deployment.service.impl;

import org.eemp.modules.edu.deployment.entity.InfoOfDeployment;
import org.eemp.modules.edu.deployment.mapper.InfoOfDeploymentMapper;
import org.eemp.modules.edu.deployment.service.IInfoOfDeploymentService;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import javax.annotation.Resource;

/**
 * @Description: 资源配置统计
 * @Date:   2024-10-08
 * @Version: V1.0
 */
@Service
public class InfoOfDeploymentServiceImpl extends ServiceImpl<InfoOfDeploymentMapper, InfoOfDeployment> implements IInfoOfDeploymentService {

    @Resource
    private InfoOfDeploymentMapper mapper;

    @Override
    public int changeReported(String id, int val) {
        return mapper.changeReported(id, val);
    }

}
