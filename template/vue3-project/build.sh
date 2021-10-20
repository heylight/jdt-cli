#!/bin/bash

###############用户修改部分################
readonly PACKAGE_NAME="dist"    #定义产出的zip包名,必填项
###########################################


if [[ "${PACKAGE_NAME}" == "" ]];then
    echo "Please set "PACKAGE_NAME" value"
    exit 1
fi

function set_work_dir
{
    readonly OUTPUT=$(pwd)/output
    readonly WORKSPACE_DIR=$(pwd)
}

#清理编译构建目录操作
function clean_before_build
{
    cd ${WORKSPACE_DIR}
    rm -rf ${WORKSPACE_DIR}/build
    rm -rf ${WORKSPACE_DIR}/${PACKAGE_NAME}
    rm -rf ${OUTPUT}
}

#实际的编译命令
#这个函数中可使用$1,$2...获取第1,2...个参数
function build_package()
{
    yarn || return 1
    yarn build || return 1
}

function dir_not_empty()
{
    if [[ ! -d $1 ]];then
        return 1
    fi
    if [[ $(ls $1|wc -l) -eq 0 ]];then
        return 1
    fi
    return 0
}
#拷贝编译结果到发布的目录
function copy_result
{
    cd ${WORKSPACE_DIR}
    cp -r ${PACKAGE_NAME} ${OUTPUT} || return 1
    cp -r ./control ${OUTPUT}/bin || return 1
   # cp -r ./nginx/nginx.conf ${OUTPUT}/nginx.conf || return 1
}

#清理war包
function clean_after_build
{
    cd ${OUTPUT} || return 1
    rm -rf ${PACKAGE_NAME}
}

#执行
function main()
{
    cd $(dirname $0)
    set_work_dir

    echo "At: "$(date "+%Y-%m-%d %H:%M:%S") 'Cleaning...'
    clean_before_build || exit 1
    echo "At: "$(date "+%Y-%m-%d %H:%M:%S") 'Clean completed'
    echo

    echo "At: "$(date "+%Y-%m-%d %H:%M:%S") 'Building...'
    build_package || exit 1
    echo "At: "$(date "+%Y-%m-%d %H:%M:%S") 'Build completed'
    echo

    echo "At: "$(date "+%Y-%m-%d %H:%M:%S") 'Copy result to publish dir...'
    copy_result || exit 1
    echo "At: "$(date "+%Y-%m-%d %H:%M:%S") 'Copy completed'
    echo

    echo "At: "$(date "+%Y-%m-%d %H:%M:%S") 'Clean publish dir...'
    clean_after_build || exit 1
    echo "At: "$(date "+%Y-%m-%d %H:%M:%S") 'Clean completed'
    echo

    exit 0
}

main