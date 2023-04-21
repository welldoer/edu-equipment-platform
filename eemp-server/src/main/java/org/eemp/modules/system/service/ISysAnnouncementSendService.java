package org.eemp.modules.system.service;

import java.util.List;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import org.eemp.modules.system.entity.SysAnnouncementSend;
import org.eemp.modules.system.model.AnnouncementSendModel;

/**
 * @Description: 用户通告阅读标记表
 * @Author: jeecg-boot
 * @Date:  2019-02-21
 * @Version: V1.0
 */
public interface ISysAnnouncementSendService extends IService<SysAnnouncementSend> {

    /**
     * 通过用户id查询用户通告阅读标记
     * @param userId 用户id
     * @return
     */
	public List<String> queryByUserId(String userId);
	
	/**
	 * 获取我的消息
	 * @param announcementSendModel
     * @param page 当前页数
	 * @return
	 */
	public Page<AnnouncementSendModel> getMyAnnouncementSendPage(Page<AnnouncementSendModel> page,AnnouncementSendModel announcementSendModel);

	/**
	 * 根据消息发送记录ID获取消息内容
	 * @return
	 */
	AnnouncementSendModel getOne(String sendId);
	

}
