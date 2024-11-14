#!/bin/bash

# 设置变量
DOCKER_CONTAINER="eemp-mysql"
#DOCKER_CONTAINER="mysql_8.0.19"
MYSQL_USER="root"
MYSQL_PASSWORD="root"
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d_%H%M%S)
DATABASE="eemp"

# 创建备份目录
mkdir -p $BACKUP_DIR/incremental

# 获取最新的二进制日志位置
LAST_BINLOG_FILE=$(docker exec $DOCKER_CONTAINER mysql -u$MYSQL_USER -p$MYSQL_PASSWORD \
    -e "SHOW MASTER STATUS\G" | grep File | awk '{print $2}')

# 刷新日志
docker exec $DOCKER_CONTAINER mysql -u$MYSQL_USER -p$MYSQL_PASSWORD \
    -e "FLUSH LOGS"

# 复制二进制日志
docker exec $DOCKER_CONTAINER mysqlbinlog --no-defaults \
    /var/lib/mysql/$LAST_BINLOG_FILE > $BACKUP_DIR/incremental/binlog_${DATE}.sql

# 压缩备份
gzip $BACKUP_DIR/incremental/binlog_${DATE}.sql

# 删除7天前的增量备份
find $BACKUP_DIR/incremental -name "binlog_*.sql.gz" -mtime +7 -delete

echo "Incremental backup completed: binlog_${DATE}.sql.gz"
