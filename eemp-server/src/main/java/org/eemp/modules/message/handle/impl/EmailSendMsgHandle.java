package org.eemp.modules.message.handle.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.eemp.common.api.dto.message.MessageDTO;
import org.eemp.common.constant.CommonConstant;
import org.eemp.common.system.util.JwtUtil;
import org.eemp.common.util.RedisUtil;
import org.eemp.common.util.SpringContextUtils;
import org.eemp.common.util.oConvertUtils;
import org.eemp.config.StaticConfig;
import org.eemp.modules.message.handle.ISendMsgHandle;
import org.eemp.modules.system.entity.SysUser;
import org.eemp.modules.system.mapper.SysUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;

/**
 * @Description: 邮箱发送信息
 * @author: jeecg-boot
 */
@Slf4j
@Component("emailSendMsgHandle")
public class EmailSendMsgHandle implements ISendMsgHandle {
    static String emailFrom;

    public static void setEmailFrom(String emailFrom) {
        EmailSendMsgHandle.emailFrom = emailFrom;
    }

    @Autowired
    SysUserMapper sysUserMapper;

    @Autowired
    private RedisUtil redisUtil;

    /**
     * 真实姓名变量
     */
    private static final String  realNameExp = "{REALNAME}";



    @Override
    public void sendMsg(String esReceiver, String esTitle, String esContent) {
        JavaMailSender mailSender = (JavaMailSender) SpringContextUtils.getBean("mailSender");
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        //update-begin-author：taoyan date:20200811 for:配置类数据获取
        if(oConvertUtils.isEmpty(emailFrom)){
            StaticConfig staticConfig = SpringContextUtils.getBean(StaticConfig.class);
            setEmailFrom(staticConfig.getEmailFrom());
        }
        //update-end-author：taoyan date:20200811 for:配置类数据获取
        try {
            helper = new MimeMessageHelper(message, true);
            // 设置发送方邮箱地址
            helper.setFrom(emailFrom);
            helper.setTo(esReceiver);
            helper.setSubject(esTitle);
            helper.setText(esContent, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

    }

    @Override
    public void sendMessage(MessageDTO messageDTO) {
        String[] arr = messageDTO.getToUser().split(",");
        LambdaQueryWrapper<SysUser> query = new LambdaQueryWrapper<SysUser>().in(SysUser::getUsername, arr);
        List<SysUser> list = sysUserMapper.selectList(query);
        String content = messageDTO.getContent();
        String title = messageDTO.getTitle();
        for(SysUser user: list){
            String email = user.getEmail();
            if (ObjectUtils.isEmpty(email)) {
                continue;
            }
            content=replaceContent(user,content);
            log.info("邮件内容："+ content);
            sendMsg(email, title, content);
        }
        //发送给抄送人
        sendMessageToCopyUser(messageDTO);
    }

    /**
     * 发送邮件给抄送人
     * @param messageDTO
     */
    public void sendMessageToCopyUser(MessageDTO messageDTO) {
        String copyToUser = messageDTO.getCopyToUser();
        if(ObjectUtils.isNotEmpty(copyToUser)) {
            LambdaQueryWrapper<SysUser> query = new LambdaQueryWrapper<SysUser>().in(SysUser::getUsername, copyToUser.split(","));
            List<SysUser> list = sysUserMapper.selectList(query);
            String content = messageDTO.getContent();
            String title = messageDTO.getTitle();

            for (SysUser user : list) {
                String email = user.getEmail();
                if (ObjectUtils.isEmpty(email)) {
                    continue;
                }
                content=replaceContent(user,content);
                log.info("邮件内容：" + content);
                JavaMailSender mailSender = (JavaMailSender) SpringContextUtils.getBean("mailSender");
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = null;
                if (oConvertUtils.isEmpty(emailFrom)) {
                    StaticConfig staticConfig = SpringContextUtils.getBean(StaticConfig.class);
                    setEmailFrom(staticConfig.getEmailFrom());
                }
                try {
                    helper = new MimeMessageHelper(message, true);
                    // 设置发送方邮箱地址
                    helper.setFrom(emailFrom);
                    helper.setTo(email);
                    //设置抄送人
                    helper.setCc(email);
                    helper.setSubject(title);
                    helper.setText(content, true);
                    mailSender.send(message);
                } catch (MessagingException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * 替换邮件内容变量
     * @param user
     * @param content
     * @return
     */
    private String replaceContent(SysUser user,String content){
        if (content.indexOf(realNameExp) > 0) {
            content = content.replace("$"+realNameExp,user.getRealname()).replace(realNameExp, user.getRealname());
        }
        if (content.indexOf(CommonConstant.LOGIN_TOKEN) > 0) {
            String token = getToken(user);
            try {
                content = content.replace(CommonConstant.LOGIN_TOKEN, URLEncoder.encode(token, "UTF-8"));
            } catch (UnsupportedEncodingException e) {
                log.error("邮件消息token编码失败", e.getMessage());
            }
        }
        return content;
    }

    /**
     * 获取token
     * @param user
     * @return
     */
    private String getToken(SysUser user) {
        // 生成token
        String token = JwtUtil.sign(user.getUsername(), user.getPassword());
        redisUtil.set(CommonConstant.PREFIX_USER_TOKEN + token, token);
        // 设置超时时间 1个小时
        redisUtil.expire(CommonConstant.PREFIX_USER_TOKEN + token, JwtUtil.EXPIRE_TIME * 1 / 1000);
        return token;
    }
}
