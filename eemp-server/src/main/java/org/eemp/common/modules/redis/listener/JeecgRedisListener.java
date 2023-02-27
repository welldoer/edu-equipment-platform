package org.eemp.common.modules.redis.listener;

import org.eemp.common.base.BaseMap;

/**
 * @Description: 自定义消息监听
 * @author: scott
 * @date: 2020/01/01 16:02
 */
public interface JeecgRedisListener {
    /**
     * 接受消息
     *
     * @param message
     */
    void onMessage(BaseMap message);

}
