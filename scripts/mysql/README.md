# MySQL 数据库备份恢复方案

## 1. 目录结构
```
~/edu-equipment-platform/scripts/mysql/
├── full_backup_mysql.sh     # 全量备份脚本
├── incremental_backup_mysql.sh  # 增量备份脚本
└── restore_mysql.sh         # 数据恢复脚本

/backup/
├── full/                    # 全量备份目录
│   ├── backup_eemp_20240315_020000.sql.gz
│   └── binlog_position_20240315_020000.txt
├── incremental/             # 增量备份目录
│   └── binlog_20240316_030000.sql.gz
└── mysql_backup.log         # 备份日志文件
```

## 2. 初始化设置

### 2.1 创建目录和设置权限
```
# 创建备份目录
sudo mkdir -p /backup/{full,incremental}
sudo chown -R edu:edu /backup

# 创建日志文件
sudo touch /backup/mysql_backup.log
sudo chown edu:edu /backup/mysql_backup.log

# 设置脚本执行权限
chmod +x ~/edu-equipment-platform/scripts/mysql/*.sh
```

### 2.2 设置定时任务
```
# 编辑 crontab
crontab -e

# 添加定时任务
# 每周日凌晨2点执行完整备份
0 2 * * 0 /home/edu/edu-equipment-platform/scripts/mysql/full_backup_mysql.sh >> /backup/mysql_backup.log 2>&1

# 周一到周六凌晨3点执行增量备份
0 3 * * 1-6 /home/edu/edu-equipment-platform/scripts/mysql/incremental_backup_mysql.sh >> /backup/mysql_backup.log 2>&1
```

## 3. 使用说明

### 3.1 手动执行备份
```
# 进入脚本目录
cd ~/edu-equipment-platform/scripts/mysql

# 执行全量备份
./full_backup_mysql.sh

# 执行增量备份
./incremental_backup_mysql.sh
```

### 3.2 数据恢复
```
# 只恢复全量备份
./restore_mysql.sh 20240315_020000

# 恢复全量+增量备份
./restore_mysql.sh 20240315_020000 20240316_030000
```

### 3.3 查看日志和状态
```
# 查看备份日志
tail -f /backup/mysql_backup.log

# 查看定时任务
crontab -l

# 检查定时任务执行情况
grep CRON /var/log/syslog
```

## 4. 备份策略
- 全量备份：每周执行一次，保留30天
- 增量备份：每天执行一次，保留7天
- 自动清理过期备份文件
- 所有操作记录日志

## 5. 注意事项
- 定期检查备份是否成功
- 定期测试数据恢复
- 监控备份空间使用情况
- 考虑将备份文件同步到其他位置
- 确保 MySQL 开启了二进制日志

## 6. 监控命令
```
# 检查备份文件大小
du -sh /backup/*

# 检查最新备份时间
ls -ltr /backup/{full,incremental}

# 检查备份日志中的错误
grep -i error /backup/mysql_backup.log
```

## 7. 故障排除
如果遇到问题，请检查：
1. 脚本执行权限
2. 备份目录权限
3. MySQL 连接参数
4. 日志文件内容
5. 磁盘空间使用情况

## 8. 联系方式
如有问题，请联系系统管理员。
