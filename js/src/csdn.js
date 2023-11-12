/*
 * @Author: SQS 1491579574@qq.com
 * @Date: 2023-05-06 16:26:41
 * @LastEditors: SQS 1491579574@qq.com
 * @LastEditTime: 2023-05-11 15:02:04
 * @FilePath: \post-blog-user-crawler\js\src\csdn.js
 * @Description: Email:1491579574@qq.com
 * QQ:1491579574
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const fs = require('fs');
const Console = require('./console');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Public = require('./public');
require('./stack');

class CSDN {
    /**
     * 文章数据列表
     */
    static url = 'https://blog.csdn.net/api/articles?type=more&category=home';

    /**
     * 文章保存本地路径
     */
    static path = '/CSDN/';

    static css = '';

    static err_msg = 'CSDN请求出错';

    static cookie = 'uuid_tt_dd=10_17398571270-1683264304284-235117; __gads=ID=d506e3d7bb8ec761-2279320e83df00ba:T=1683264306:RT=1683264306:S=ALNI_MY7gQtddZ6PMGDOq0FaffCuIaKbAQ; __bid_n=187ea5f01f2b49b7374207; ssxmod_itna=iqGxRQit0=G=dAIx0LxYIE6x0xQwgg24bdkAdqGX2oDZDiqAPGhDC83z7w7RBD+0IPED+8WvKE9n7ifdeYSdPWz7DCPGnDB9vQ=IDYA8Dt4DTD34DYDiEKDLDmeD+GqKDdEsNXzS2D3qDwDB=DmqG2ld=Dm4DfDDLnlEx4bTtjYnNqxGUtmu4dbqDMD7tD/4+bEeDBQPa40TUtVeGWbOQxPeGuDG6ehTdqx0P9nwt0I6vIi74zQ7woG7ptj7we3Do3SYxdn2h100+6HGD4GAqYQYqIavDDGR440Y1deD; ssxmod_itna2=iqGxRQit0=G=dAIx0LxYIE6x0xQwgg24bdkAqA=ntApxD/Q+DF2fLkUG7gp79v5GF0guGhHqV=Lxbq3PtBob+uGtdApfTXIaYtju9jPjpwx1SLQRj/bjF3Bn0b4l1ZmG6I5oeUhrKP7QPWq3O2CZ65hHgmio9Ps3=7GOo9+vZHiNfaiWFwOk8c1r=3CdWT=Y+fiPKPLunYb6ROsU3MbOtL=y9vivFAaZKgXqvELCKpPEc2F9GlvnFThF9vPeyO=oljKE9Q0D3=vtgjiwkdIpEakc0C8iIIN+gnKdZbHVpahQgnyOpQQ/Tdtx5l7G4CKeQKYWdOxb=esA8HjOKi0=ExF0B+liwZ0iqD49qao04hn51GmAxw1QzXG3PniQdpl0p6W3nmInumQO++O+K0=TWO3jY525MoA2nNlYdmx4ADDw=G=n4Mgw3IqFmwEUnjCcTnLKDGcDG7eiDD==; UserName=m0_52796585; UserInfo=dc1f71de86ca43fe907945912a74e461; UserToken=dc1f71de86ca43fe907945912a74e461; UserNick=%E6%97%A0%E5%90%8D%E4%B9%8B%E9%80%86; AU=B76; UN=m0_52796585; BT=1683267682978; p_uid=U010000; Hm_up_6bcd52f51e9b3dce32bec4a3997715ac=%7B%22islogin%22%3A%7B%22value%22%3A%221%22%2C%22scope%22%3A1%7D%2C%22isonline%22%3A%7B%22value%22%3A%221%22%2C%22scope%22%3A1%7D%2C%22isvip%22%3A%7B%22value%22%3A%220%22%2C%22scope%22%3A1%7D%2C%22uid_%22%3A%7B%22value%22%3A%22m0_52796585%22%2C%22scope%22%3A1%7D%7D; _ga=GA1.2.101466522.1683358048; c_dl_um=-; c_dl_prid=1683358805803_132429; c_dl_rid=1683462215209_437592; c_dl_fref=https://blog.csdn.net/qq_43827595/article/details/103895629; c_dl_fpage=/download/dllglvzhenfeng/13100610; FCNEC=%5B%5B%22AKsRol-x5RB6UKkHYkpw6t3r86mYnQvDlPz7YJN3GLUzWPTm9H-3lEFfVJeN52_TFvygbFK2ZjE72g5A45UGJya1Uv6OJWF0BXbOpndYXaM0WERQR_vB1uktZmQS7SkYrzhfUN4DF4yJO3Sgajs6ORtDb_IeSTsCxw%3D%3D%22%5D%2Cnull%2C%5B%5D%5D; firstDie=1; FPTOKEN=Br7M9AMhxQ9Es9/RXxxC0wl9uHYlcTl5WUQ6I4NTVUdMWApIsgRpiDbNMXNDcSfnH8KlKeT0/lUoEboejIRg3euuPuO3gv844nHPRiij+o40H7Echl7ejKsBMFu16Idg1P9sPeUwq+xycYzCyPycSWoA0ir9hEQyBXLyxYgib1SQa2WunGTQYNvZDVWMSutKX7tRylp7M/V71BnLUg2CNlZWskrGp2zPOB6D8qJPq0eaaLGnw/29/n+uPZZmMKDW2KzreRy4ymFZLs2YrJI1EpXYKDajqSVhqoZDHlPNv/lIdIAR2SrsfRaez1syJ5vE5EwJgSgHS975wvGaGX4TmOi1PMuivqZn40EX2RCxL8YuyE138hE42aLB1h/tO78tWkYcDj0UAmpPBXoH7vF1Uw==|ULCcHlRqY5tQmgY22uCTuGcxnlZPOmhNKTPW/AdhwLI=|10|76a7893d0e28d56a9d33393d6e909d74; __gpi=UID=00000c01c30e21ba:T=1683264306:RT=1683683058:S=ALNI_MYgx6gdDQmshC_pFDZHYJhIC41CAw; https_waf_cookie=538886e2-c815-4e4b5649706af961b91cd79ab05d46b00f31; dc_session_id=10_1683689046444.733722; dc_sid=07dab90d1ab3bbc53cc3f0b3c31eee45; c_first_ref=www.baidu.com; c_segment=13; Hm_lvt_6bcd52f51e9b3dce32bec4a3997715ac=1683638856,1683683059,1683685113,1683689210; log_Id_click=34; c_utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7Ebaidujs_baidulandingword%7Edefault-9-122845162-blog-116660127.235%5Ev35%5Epc_relevant_increate_t0_download_v2_base; c_utm_relevant_index=10; c_pref=https%3A//blog.csdn.net/qq_27229113/article/details/116660127; c_ref=https%3A//www.baidu.com/link; c_first_page=https%3A//blog.csdn.net/weixin_56998524/article/details/120288414; c_dsid=11_1683689830307.062484; c_page_id=default; dc_tos=rufbdy; log_Id_pv=68; Hm_lpvt_6bcd52f51e9b3dce32bec4a3997715ac=1683689831; log_Id_view=316; https_ydclearance=d04e1d0a4d0f887a08209854-ee1e-4554-b6f2-e3ca1e97004c-1683697397';

    constructor(process_loc, Base, Cin) {
        this.Base = Base;
        this.Cin = Cin;
        fs.readFile(__dirname + '/public/csdn.css', (err, data) => {
            if (err) {
                throw err;
            }
            CSDN.css = data.toString();
        });
        Console.log(process_loc, '【CSDN】CSS文件已读入');
        Console.log(process_loc, '【CSDN】初始化完成');
    }

    async bug(process_loc) {
        this.Base.creatDir(process_loc, CSDN.path);

        let data = await this.Base.sendGet(CSDN.url, {}, {
            Cookie: CSDN.cookie
        }).catch((err) => {
            Console.error(process_loc, 'CSDN首页请求出错：' + err.message);
            return;
        });

        if (!data) {
            Console.error(process_loc, CSDN.err_msg);
            return;
        }

        if (!data || !data.articles) {
            Console.error(process_loc, CSDN.err_msg);
            return;
        }

        let list = data.articles;
        await Promise.all(Array.from(list).map(async (t) => {
            if (!t.url) {
                return Promise.resolve();
            }
            let one_blog_url = t.url;
            let title = t.title;
            let user = t.nickname ? t.nickname : '匿名用户';
            let result = null;
            result = await this.Base.sendGet(one_blog_url, {}, {
                Cookie: CSDN.cookie
            }).catch((err) => {
                Console.error(process_loc, 'CSDN文章请求出错：' + err.message);
                return Promise.resolve();
            });

            if (!result) {
                Console.error(process_loc, CSDN.err_msg);
                return Promise.resolve();
            }

            const document = new JSDOM(result).window.document;
            // 获取指定ID的元素
            let element = document.getElementById('content_views');
            let html = '<!DOCTYPE html><head><meta charset="UTF-8"><title>' + title + '</title></head><style>' + CSDN.css + '</style><body>' + '<h1>' + title + '</h1>' + element?.innerHTML + '</body></html>';
            html = await this.Base.htmlImageToBase64(process_loc, html);
            if (html && this.Cin.save_file) {
                let tem_save_path = CSDN.path + title + '（' + user + '）.html';
                this.Base.writeToFile(process_loc, tem_save_path, html);
            }
            await Public.sleep(666);
            return Promise.resolve();
        }));
    }
}

module.exports = CSDN;