<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width:100%;height:100%;">
          <div class="modal-header" style="height:65px;">
            <slot name="header" style="background-color:#fff;">
              <div class="text"></div>
              <i v-show="hideClose" class="el-icon-close close" @click="close" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" element-loading-text="请给我点时间！" style="margin:0 50px">
            <slot name="body">
              <el-row style="text-align: right;">
                <el-button v-show="this.printShow" @click="getPrint" type="primary" style="margin-bottom:15px">打印</el-button>
              </el-row>
              <h2 style="text-align:center;font-weight:500">出借人信息列表</h2>
              <el-table :data="list" v-loading="listLoading" border stripe fit style="width:980px;margin:0 auto">
                <el-table-column align="center" label="（出借）协议编号">
                  <template scope="scope" align="center">
                    <span>{{scope.row.agreementNo}}</span>
                  </template>
                </el-table-column>

                <el-table-column label="出借人姓名" align="center">
                  <template scope="scope">
                    <span>{{scope.row.tradeCustName}}</span>
                  </template>
                </el-table-column>

                <el-table-column label="身份证号" align="center">
                  <template scope="scope">
                    <span>{{scope.row.certNo}}</span>
                  </template>
                </el-table-column>

                <el-table-column label="用户名" align="center">
                  <template scope="scope">
                    <span>{{scope.row.ctaSubAccount}}</span>
                  </template>
                </el-table-column>

                <el-table-column label="出借金额（元）" align="center">
                  <template scope="scope">
                    <span>{{scope.row.tradeAmount}}</span>
                  </template>
                </el-table-column>

                <el-table-column label="出借期限（月）" align="center">
                  <template scope="scope">
                    <span>{{scope.row.tradeDeadline}}</span>
                  </template>
                </el-table-column>

              </el-table>
            </slot>
          </div>
          <div class="signed">
            <p v-show="showText" style="margin-left:50px;">
              <span>* 本人（甲方）同意并确认上述列表中的出借人进行借款，并承诺按约履行还款义务。</span>
            </p>
            <p v-show="showText" style="font-weight:600;margin:50px 0 0 50px">
              <span>甲方（借款人）签字、按印:__________________________</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
/* eslint-disable no-unused-vars */
import Utils from "@/utils/common";
import { getLoanBorrows } from "@/api/contract";

export default {
  props: {
    agreementNo: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      timer: null,
      showText: false,
      hideClose: true,
      submitLoading: false,
      validOptions: [],
      printShow: true,
      listLoading: false,
      validOptionproduct: [],
      list: null
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getLoanBorrows(this.agreementNo)
        .then(response => {
          this.list = response.data;
          this.total = response.count;
          this.listLoading = false;
          this.searchLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
          this.searchLoading = false;
        });
    },
    getPrint() {
      document.getElementsByTagName("html")[0].scrollTop = 0;
      document.getElementsByTagName("html")[0].style.overflowY = "hidden";
      this.showText = true;
      this.hideClose = false;
      this.timer = setTimeout(() => {
        this.hideClose = true;
        this.showText = false;
        clearTimeout(this.timer);
      }, 100);
      this.printShow = false;
      window.setTimeout(function() {
        print();
      }, 1);
      window.setTimeout(() => {
        this.printShow = true;
      }, 1000);
    },
    close() {
      this.$emit("close");
      document.getElementsByTagName("html")[0].style.overflowY = "";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/*.el-cascader, .el-select {*/
/*width: 100%;*/
/*}*/
.modal-container {
  overflow-y: hidden;
}
.modal-header {
  border: 0;
  margin: 10px 0 15px 25px;
}
.modal-body {
  margin: 30px 0;
  height: auto;
  overflow-y: auto;
}
.signed {
  position: absolute;
  bottom: 35px;
}
.modal-header .text {
  display: block;
} 
.text { 
  position: absolute;
  top: 0;
  left: 30px;
  height: 155px;
  width: 200px;
  background: url(../../../src/assets/lenderPic/xuecheng.png) no-repeat 
    center;
  background-size: contain;
}
.close {
  position: absolute;
  top: 80px;
  right: 60px;
}
@media print and (color) {
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
@page
{
  size:  auto;   /* auto is the initial value */
  margin: 0mm;  /* this affects the margin in the printer settings */
}

html
{
  background-color: #FFFFFF;
  margin: 0px;  /* this affects the margin on the html before sending to printer */
}

body
{

  margin: 10mm 15mm 10mm 15mm; /* margin you want for the content */
}
</style>

