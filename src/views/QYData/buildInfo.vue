<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header :title="jzItem.jzName||''" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap build-info-wrap">
            <div class="data-wrap">
                <mko-cell title="建筑名称" :val="jzItem.jzName || '暂无'"></mko-cell>
                <mko-cell title="建筑编号" :val="jzItem.jzCode || '暂无'"></mko-cell>
                <mko-cell title="行政区域"
                         :val="jzItem.provinceName?(jzItem.provinceName + '-' + jzItem.cityName + '-' + jzItem.areaName):''"></mko-cell>
                <mko-cell title="详细地址" :val="jzItem.jzAddress || '暂无'"></mko-cell>
                <mko-cell title="地理坐标" :val="jzItem.gps || '暂无'"></mko-cell>
                <mko-cell title="建筑类型" :val="jzItem.jzTypeName || '暂无'"></mko-cell>
                <mko-cell title="建筑结构" :val="jzStructures[jzItem.jzStructure] || '暂无'"></mko-cell>
                <mko-cell title="建筑层数分类" :val="jzGM[jzItem.jzGM] || '暂无'"></mko-cell>
                <mko-cell title="产权及使用情况" :val="jzChanQuans[jzItem.jzChanQuan] || '暂无'"></mko-cell>
                <mko-cell title="耐火等级" :val="jzFireLevel[jzItem.jzFireLevel]"></mko-cell>
            </div>
            <div class="data-wrap">
                <mko-cell title="建筑高度" :val="jzItem.jzHeight?(jzItem.jzHeight + '米'):'暂无'"></mko-cell>
                <mko-cell title="建筑面积" :val="jzItem.jzArea?(jzItem.jzArea + '平方米'):'暂无'"></mko-cell>
                <mko-cell title="占地面积" :val="jzItem.jzFloorArea?(jzItem.jzFloorArea + '平方米'):'暂无'"></mko-cell>
                <mko-cell title="标准层面积" :val="jzItem.jzStdFloorArea?(jzItem.jzStdFloorArea + '平方米'):'暂无'"></mko-cell>
                <mko-cell title="地上层数" :val="jzItem.jzDSNumber?(jzItem.jzDSNumber + '层'):'暂无'"></mko-cell>
                <mko-cell title="地上层面积" :val="jzItem.jzDSArea?(jzItem.jzDSArea + '平方米'):'暂无'"></mko-cell>
                <mko-cell title="地下层数" :val="jzItem.jzDXNumber?(jzItem.jzDXNumber+'层'):'暂无'"></mko-cell>
                <mko-cell title="地下层面积" :val="jzItem.jzDXArea?(jzItem.jzDXArea + '平方米'):'暂无'"></mko-cell>
                <mko-cell title="避难层数" :val="jzItem.jzBiNanNumber?(jzItem.jzBiNanNumber + '层'):'暂无'"></mko-cell>
                <mko-cell title="避难层总面积"
                         :val="jzItem.jzBiNanTotalArea?(jzItem.jzBiNanTotalArea + '平方米'):'暂无'"></mko-cell>
                <mko-cell title="建筑可容纳最大人数" :val="jzItem.jzMaxPepole?(jzItem.jzMaxPepole + '人'):'暂无'"></mko-cell>
                <mko-cell title="消控室数量" :val="jzItem.jzXiaoKongNumber?(jzItem.jzXiaoKongNumber + '个'):'暂无'"></mko-cell>
                <mko-cell title="消防电梯数量" :val="jzItem.jzDianTiNumber?(jzItem.jzDianTiNumber + '个'):'暂无'"></mko-cell>
            </div>
            <div class="data-wrap">
                <mko-cell title="毗邻建筑情况" :val="jzItem.jzInfo || '暂无'"></mko-cell>
                <mko-cell title="竣工时间" :val="jzItem.jzcreatedDate | formatDate('YYYY-MM-DD')"></mko-cell>
                <mko-cell title="建筑状态" :val="jzItem.jzStatusValue==1?'未使用' : '已使用'"></mko-cell>
                <mko-cell title="建筑管理单位" :val="jzItem.jzManagerOrg ||'暂无'"></mko-cell>
                <mko-cell title="建筑设计单位" :val="jzItem.jzDesignOrg ||'暂无'"></mko-cell>
                <mko-cell title="建筑施工单位" :val="jzItem.jzShiGongOrg ||'暂无'"></mko-cell>
                <mko-cell title="建筑平面图" val="查看" val-style="blue-font" @click="goPhotoViewer" is-link v-if="images.length > 0"></mko-cell>
            </div>
        </div>
        <no-data v-if="notData"></no-data>
    </div>
</template>

<script>
    import api from 'api'
    import {NoData, PhotoBox} from 'components'
    import {formatDate} from 'filters'
    import {Indicator, Toast} from 'mint-ui'
    import apiconf from 'apiconf'
    var _id = ''
    export default {
        data() {
            return {
                notData: false,
                jzItem: {},
                jzStructures: ['', '木结构', '砖木结构', '砖混结构', '钢筋混凝土结构', '钢结构', '其它结构'],
                jzChanQuans: ['', '独立产权，独立使用', '独立产权，多家使用', '多家产权，多家使用'],
                jzGM: ['', '单、多层建筑', '高层建筑', '地下建筑', '其他建筑'],
                jzFireLevel: ['', '一级', '二级', '三级', '四级'],
                autoFill: false,
                topAllLoaded: false,
                topStatus: '',
                wrapperHeight: 0,
                images: []
            }
        },
        activated() {
            this.$nextTick(() => {
                if (_id != this.$route.params.id) {
                    this.getJZDetail();
                }
            })
        },
        methods: {
            getJZDetail() {
                Indicator.open({spinnerType: 'fading-circle'});
                let params = {
                    m: 'info',
                    jzID: this.$route.params.id
                };
                this.images = [];
                api.getJZDetail(params).then(result => {
                    _id = this.$route.params.id;
                    if (result.code === 0) {
                        if (result.response.length <= 0) {
                            this.notData = true;
                        } else {
                            this.jzItem = result.response;
                            this.notData = false;
                            this.getFiles(result.response.jzPlan);
                        }
                    }
                    Indicator.close();
                });
            },
            back() {
                this.$MKOPop()
            },
            getFiles(id) {
                if (id == '' || id == null) return false;
                api.getByPath(`/info/${id}`)({}).then(res => {
                    if (res.code != 0)
                        return;
                    if (res.response && res.response.length > 0) {
                        for (let i = 0; i < res.response.length; i++) {
                            let item = res.response[i]
                            this.images.push(`${apiconf.resourcesDomain}/${item.resouceId}`)
                        }

                    }
                });
            },
            goPhotoViewer() {
                this.$MKOPush({
                    path: '/photo_viewer',
                    query: {
                        title: '建筑平面图',
                        url: this.images
                    }
                })
            }
        },
        components: {
            NoData,
            PhotoBox
        }
    }
</script>

<style lang="less">
    @import "../../config.less";

    .build-info-wrap {
        .data-wrap {
            margin-bottom: 14px;
            .mint-cell {
                min-height: 44px;
                background: none;
                background-color: #fff;
                .mint-cell-wrapper {
                    padding: @cellPadding;
                    font-size: 14px;
                    letter-spacing: 0;
                    color: #232323;
                    .mint-cell-title {
                        min-width: 100px;
                        white-space: nowrap;
                    }
                    .mint-cell-value {
                        display: block;
                        padding-left: 20px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
        .jz-plan-title {
            width: 100%;
            background-color: #ffffff;
            font-size: 14px;
            padding: @cellPadding;
            display: table;
            span {
                height: 48px;
                line-height: 48px;
                display: table-cell;
                vertical-align: middle;
            }
        }
        .blue-font {
            font-size: 14px;
            color: #3399FF;
            letter-spacing: 0;
        }
    }

</style>

