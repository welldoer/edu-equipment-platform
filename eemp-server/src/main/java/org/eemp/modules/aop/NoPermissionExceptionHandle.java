package org.eemp.modules.aop;

import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.UnauthorizedException;
import org.eemp.common.api.vo.Result;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class NoPermissionExceptionHandle {

    @ExceptionHandler(UnauthorizedException.class)
    public Result<String> handleShiroException(UnauthorizedException ex) {
        log.warn("UnauthorizedException", ex);
        return Result.noauth("@@@ 未授权，请联系管理员！");
    }

    @ExceptionHandler(AuthorizationException.class)
    public Result<String> authorizationException(AuthorizationException ex) {
        log.warn("AuthorizationException", ex);
        return Result.noauth("@@@ 权限认证失败！");
    }
}
