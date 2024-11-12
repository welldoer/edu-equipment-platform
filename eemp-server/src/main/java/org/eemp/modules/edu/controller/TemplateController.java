package org.eemp.modules.edu.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.eemp.common.util.MinioUtil;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.net.URLEncoder;

@Slf4j
@RestController
@RequestMapping("/edu")
@Api(tags = "模板文件下载")
public class TemplateController {
    
    @ApiOperation("下载模板文件")
    @GetMapping("/downloadTemplateFromMinio")
    public void downloadTemplateFromMinio(
            @RequestParam String bucket,
            @RequestParam String objectKey,
            HttpServletResponse response) {
        try {
            log.info("开始下载模板文件，bucket: {}, objectKey: {}", bucket, objectKey);
            
            // 从objectKey中获取原始文件名
            String originalFileName = objectKey;
            // 如果objectKey包含路径，只取最后的文件名部分
            if (objectKey.contains("/")) {
                originalFileName = objectKey.substring(objectKey.lastIndexOf("/") + 1);
            }
            
            // URL编码文件名
            String encodedFileName = URLEncoder.encode(originalFileName, "UTF-8");
            encodedFileName = encodedFileName.replaceAll("\\+", "%20");
            
            // 设置响应头
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", 
                "attachment; filename=" + encodedFileName + "; filename*=UTF-8''" + encodedFileName);

            // 从MinIO获取文件
            InputStream fileStream = MinioUtil.getMinioFile(bucket, objectKey);

            // 写入响应
            IOUtils.copy(fileStream, response.getOutputStream());
            response.flushBuffer();
            
            // 关闭流
            fileStream.close();
            
            log.info("模板文件下载完成，bucket: {}, objectKey: {}", bucket, objectKey);
        } catch (Exception e) {
            log.error("模板文件下载失败，bucket: {}, objectKey: {}", bucket, objectKey, e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
} 