<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="服务单位" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="searchValue ? (searchDatas.length == 0) : (fwList.length == 0) "></no-data>
        <div class="page-wrap fw-list-wrap" v-show="!resError && !noData">
            <search-bar v-model="searchValue" hint-text="搜索公司名称" ref="search-bar"></search-bar>

            <div ref="wrapper">
                <ul class="list">
                    <li class="item" @click="go(item)" v-for="(item,i) in (searchValue ? searchDatas : fwList)">
                        <div class="info">
                            <div class="title">{{item.dwName}}</div>
                            <!--<div class="desc">资质：{{item.zzInfo || '暂无'}}</div>-->
                        </div>
                        <div class="score">
                            <i class="icon-star" :class="'icon-star-' + item.score"></i>
                        </div>
                        <i class="icon icon-link-arrow"></i>
                    </li>
                </ul>
            </div>
            <div class="popup-wrap">
                <mt-popup v-model="popupShow" position="right">
                    <div class="body-wrap">
                        <div class="radio-wrap">
                            <p class="title">资质等级</p>
                            <mt-button class="radio" :class="{'checked':formData.level===item.value}"
                                       @click.native="formData.level=item.value" v-for="item in options.level"
                                       size="large">
                                <span class="sign" v-show="formData.level===item.value"></span>{{item.text}}
                            </mt-button>
                        </div>
                        <div class="radio-wrap">
                            <p class="title">服务评分</p>
                            <mt-button class="radio" :class="{'checked':formData.score==item.value}"
                                       @click.native="formData.score=item.value"
                                       v-for="item in options.score" size="large">
                                <span class="sign has-gutter" v-show="formData.score==item.value"></span>{{item.text}}
                            </mt-button>
                        </div>
                    </div>
                    <div class="footer-wrap">
                        <mt-button class="reset" @click="resetData">重置</mt-button>
                        <mt-button class="confirm" @click="filterList">筛选</mt-button>
                    </div>
                </mt-popup>
            </div>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .fw-list-wrap {
        .selecetd {
            width: 100%;
            height: 40px;
            color: @blueColor;
            background-color: #fff;
            margin-bottom: 14px;
            text-align: center;
            font-size: 14px;
            line-height: 40px;
            .selected-icon {
                position: relative;
                bottom: 5px;
                right: 5px;
                padding: 7px;
                font-size: 0;
                background: url('/static/icons/resource.png') -836px 0 no-repeat;
                background-size: 892px auto;
            }
        }
        .list {
            .item {
                position: relative;
                display: block;
                box-sizing: border-box;
                height: 60px;
                padding: 6px 14px 5px;
                .border-btm(#E0E0E0);
                background: #fff;
                .score {
                    position: absolute;
                    margin-top: 6px;
                    left: 14px;
                    .icon-star {
                        position: absolute;
                        left: 0;
                    }
                }
                .info {
                    letter-spacing: 0;
                    .title {
                        height: 20px;
                        line-height: 20px;
                        font-size: 14px;
                        color: #333333;
                    }
                    .desc {
                        height: 17px;
                        line-height: 17px;
                        font-size: 12px;
                        color: #B7B7B7;
                    }
                }
                .icon {
                    position: absolute;
                    right: 14px;
                    margin: auto;
                    top: 0;
                    bottom: 0;
                }
            }
        }
        .popup-wrap {
            position: relative;
            .mint-popup-right {
                width: 284px;
                height: 100%;
            }
            .body-wrap {
                overflow: scroll;
                padding: 34px 7px 100px;
                max-height: 700px;
                bottom: 100px;
                &:after {
                    display: table;
                    content: "";
                }
                .radio-wrap {
                    margin-bottom: 10px;
                    font-size: 12px;
                    .radio {
                        padding: 0 4px;
                        margin-bottom: 6px;
                        height: 30px;
                        border-radius: @radiusS;
                        background: #f0f2f5;
                        color: @textBase;
                        &.checked {
                            background: #fff;
                            border: 1px solid @textBlue;
                            color: @textBlue;
                        }
                        .mint-button-text {
                            font-size: 12px;
                            .sign {
                                display: inline-block;
                                position: relative;
                                top: 1px;
                                padding: 9px 12px 0 0;
                                background: url(/static/icons/resource.png) -44px -61px no-repeat;
                                background-size: 356px auto;
                                &.has-gutter {
                                    right: 5px;
                                }
                            }
                        }
                    }
                    .title {
                        margin: 0 0 10px;
                    }
                    & + .radio-wrap {
                        margin-top: 20px;
                        padding-top: 20px;
                        .border-top(#D8D8D8);
                    }
                }
            }
            .footer-wrap {
                display: flex;
                position: absolute;
                bottom: 0;
                width: 100%;
                .mint-button {
                    flex: 1;
                    -webkit-flex: 1;
                    width: 50%;
                    height: 39px;
                    border-radius: 0;
                    opacity: 0.73;
                    &.reset {
                        border: 1px solid #EDEEF1;
                        background: #fff;
                        color: @textBlue;
                    }
                    &.confirm {
                        background: #0398FF;
                        color: #fff;
                    }
                }
            }

        }
    }
</style>

<script>
    let sim = [
        {
            dwName: '无锡蓝天电子有限公司',
            zzInfoValue: '一级资质',
            score: 5
        },
        {
            dwName: '无锡市世达建设有限公司',
            zzInfoValue: '一级资质',
            score: 4.5
        },
        {
            dwName: '无锡市丰顺机电工程有限公司',
            zzInfoValue: '二级资质',
            score: 4.5
        },
        {
            dwName: '无锡市首信消防技术服务有限公司',
            zzInfoValue: '一级资质',
            score: 4
        },
        {
            dwName: '无锡太和天成消防工程有限公司',
            zzInfoValue: '二级资质',
            score: 4
        },
        {
            dwName: '无锡市合众消防科技有限公司',
            zzInfoValue: '一级资质',
            score: 3.5
        },
        {
            dwName: '无锡市工业设备安装有限公司',
            zzInfoValue: '二级资质',
            score: 3.5
        },
    ];
    import {Indicator, Toast} from 'mint-ui';
    import api from 'api'
    import {NoData, ResError, SearchBar, Star } from 'components';
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                //列表
                wrapperHeight: 0,
                autoFill: false,
                topStatus: '',
                bottomAllLoaded: false,
                bottomStatus: '',
                page: 1,
                fwList: [],
                //筛选
                popupShow: false,
                options: {
                    level: [
                        {text: '全部', value: ''},
                        {text: '一级资质', value: 1},
                        {text: '二级资质', value: 2},
                        {text: '三级资质', value: 3},
                    ],
                    score: [
                        {text: '全部', value: ''},
                        {text: '五星', value: '五星'},
                        {text: '四星', value: '四星'},
                        {text: '三星', value: '三星'},
                        {text: '二星', value: '二星'},
                        {text: '一星', value: '一星'}
                    ]
                },
                formData: {
                    level: '',
                    score: ''
                },
                searchValue: '',
                searchDatas: []
            }
        },
        created() {
            this.getData();
        },
        mounted() {
            this.wrapperHeight = Math.max(document.documentElement.clientHeight, document.body.clientHeight) - this.$refs.wrapper.getBoundingClientRect().top;
        },
        watch: {
            searchValue: function () {
                this.searchData();
            }
        },
        methods: {
//      ctrlPopupShow(e){
//        e.preventDefault();
//        this.popupShow = true;
//      },
            getData(){
                let fwList = [{
                    userId: 'xawb',
                    groupId: 'QYWX050040',
                    dwName: '无锡兴安维保',
                    dwCode: '91320200780272823W',
                    dwAddress: '无锡市清扬路32号',
                    dwXZArea: '江苏省,无锡市,梁溪区',
                    business: '维修,保养,检测',
                    zzInfo: '消防设施维护保养检测机构一级资质',
                    zzProve: ['http://resources.aqfwy.com/00a003a65814457ab10ad60051ab89b105000000'],
                    issuedDepartment: '江苏省公安厅',
                    zsStartTime: '2010-02-21',
                    zsEndTime: '2020-02-21',
                    dwManager: '张德华',
                    dwManagerPhone: '15873239898',
                    dwPhone: '051087323376',
                    dwFax: '051087323376',
                    postalcode: '214000',
                    dwEmail: 'allenzhang@xawb.com',
                    score: 6,
                    starCount: 5
                },{
                    userId: 'ljwb',
                    groupId: 'QYWX053218',
                    dwName: '无锡力界维保',
                    dwCode: '93120200780564823W',
                    dwAddress: '无锡市大同路184号',
                    dwXZArea: '江苏省,无锡市,新吴区',
                    business: '维修,保养,检测',
                    zzInfo: '消防设施维护保养检测机构一级资质',
                    zzProve: ['http://resources.aqfwy.com/b68df58988f64e0496042b444c119ce000000000'],
                    issuedDepartment: '江苏省公安厅',
                    zsStartTime: '2011-12-14',
                    zsEndTime: '2020-12-14',
                    dwManager: '刘明',
                    dwManagerPhone: '13693228866',
                    dwPhone: '051022329876',
                    dwFax: '051022329876',
                    postalcode: '214000',
                    dwEmail: 'jcakliu@ljwb.com',
                    score: 8,
                    starCount: 6
                },{
                    userId: 'snwb',
                    groupId: 'QYWX051220',
                    dwName: '无锡世宁维保',
                    dwCode: '91332020078029347S',
                    dwAddress: '无锡市珠江路89号',
                    dwXZArea: '江苏省,无锡市,新吴区',
                    business: '维修,保养,检测',
                    zzInfo: '消防设施维护保养检测机构二级资质',
                    zzProve: ['http://resources.aqfwy.com/0f04424c27c94ec6889a7c44b72c601c08000000'],
                    issuedDepartment: '江苏省公安厅',
                    zsStartTime: '2008-11-04',
                    zsEndTime: '2019-11-04',
                    dwManager: '李建义',
                    dwManagerPhone: '15367824545',
                    dwPhone: '051032108432',
                    dwFax: '051032108432',
                    postalcode: '214000',
                    dwEmail: 'markli@snwb.com',
                    score: 10,
                    starCount: 4
                }];
                this.fwList = fwList
            },
            loadTop(){
                this.page = 1;
                this.fwList.length = 0;
                setTimeout(this.getData, 1000);
            },
            handleTopChange(status) {
                this.topStatus = status;
            },
            loadBottom() {
                this.page++;
                this.getData();
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            filterList(){
                this.popupShow = false;
                this.page = 1;
                this.fwList.length = 0;
                this.getData();
            },
            resetData(){
                let data = this.formData;
                for (let key in data) {
                    data[key] = "";
                }
            },
            go(item){
                if (this.bottomStatus != 'loading' && this.topStatus != 'loading')
                    this.$MKOPush({
                        path: '/fw_info/' + item.groupId,
                        query: {
                            fwDetail: item
                        }
                    });
            },
            back(){
                this.$MKOPop();
                Indicator.close();
            },
            cancel() {
                this.back()
            },
            searchData() {
                let search = this.searchValue;
                if (search) {
                    this.searchDatas = this.fwList.filter(item => {
                        return item.dwName.indexOf(search) > -1;
                    })
                }
            }
        },
        components: {
            NoData,
            ResError,
            Star,
            SearchBar
        }
    }
</script>


