package org.eemp.config.oss;

import lombok.extern.slf4j.Slf4j;
import org.eemp.common.constant.CommonConstant;
import org.eemp.common.constant.SymbolConstant;
import org.eemp.common.util.MinioUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Minio文件上传配置文件
 * @author: jeecg-boot
 */
@Slf4j
@Configuration
@ConditionalOnProperty(prefix = "eemp.minio", name = "minio_url")
public class MinioConfig {
    @Value(value = "${eemp.minio.minio_url}")
    private String minioUrl;
    @Value(value = "${eemp.minio.minio_name}")
    private String minioName;
    @Value(value = "${eemp.minio.minio_pass}")
    private String minioPass;
    @Value(value = "${eemp.minio.bucketName}")
    private String bucketName;

    @Bean
    public void initMinio(){
        if(!minioUrl.startsWith(CommonConstant.STR_HTTP)){
            minioUrl = "http://" + minioUrl;
        }
        if(!minioUrl.endsWith(SymbolConstant.SINGLE_SLASH)){
            minioUrl = minioUrl.concat(SymbolConstant.SINGLE_SLASH);
        }
        MinioUtil.setMinioUrl(minioUrl);
        MinioUtil.setMinioName(minioName);
        MinioUtil.setMinioPass(minioPass);
        MinioUtil.setBucketName(bucketName);
    }

}
