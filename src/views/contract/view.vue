<template>
  <div class="app-container contract-container" v-loading="fullLoading">
    <el-row :gutter="8">

      <el-col :span="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 28px;">合同影像资料</span>
            <!-- <el-button style="float: right;" type="primary" size="small">上传补件</el-button> -->
          </div>

          <el-radio-group v-model="fileDictDataId" @change="changeFileType" :disabled="!isDisabled">
            <el-radio-button :label="item.id" v-for="(item,index) in typeOptions" :key="index">{{item.name}}</el-radio-button>
          </el-radio-group>

          <swiper :options="swiperOption" ref="mySwiper" v-if="files !== null && files.length > 0" style="height: 452px; margin-top: 20px;">
            <!-- slides -->
            <swiper-slide v-for="(item,index) in files" :key="index"><img :src="item.fileFullUrl" style="width: 100%;" />
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
          </swiper>

          <div v-if="files === null || files.length === 0" class="empty-box">
            <img src="../../assets/empty.png" alt="空">
            <p>没有附件信息</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card>
          <div class="scroll-card">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="line-height: 28px;">合同信息</span>

              </div>
              <el-form>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="客户名称">{{contractData.custName}}</el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-left:2%">
                    <el-form-item label="证件号码">{{contractData.certNo}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" style="white-space:nowrap">
                    <el-form-item label="申请编号">{{contractData.loanNo}}</el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-left:2%;">
                    <el-form-item  label="申请日期">{{contractData.applyDate | formatTime}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="申请金额">{{contractData.applyAmount}}</el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-left:2%">
                    <el-form-item label="综合费率">{{contractData.lastRiskRateValue}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="期限">{{contractData.term}}</el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-left:2%">
                    <el-form-item label="还款方式">{{contractData.repayType}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="借款用途">{{contractData.loanPurpose}}</el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-left:2%">
                    <el-form-item label="还款来源">{{contractData.repaySource}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="放款账户">{{contractData.bankAcct}}</el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-left:2%">
                    <el-form-item label="最终审批金额">{{contractData.lastApproveAmt}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="合同编号">{{contractData.contractNo}}</el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-left:2%">
                    <el-form-item label="协议编号">{{contractData.agreementNo}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" >
                    <el-form-item label="合同金额">{{contractData.contractAount}}</el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-left:2%">
                    <el-form-item label="放款金额">{{contractData.loanAmount}}</el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>

            <el-card class="box-card" style="margin-top: 20px;">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">合同预览与打印</span>
              </div>
              <el-form>

                <el-row v-for="(item,index) in contractPreviewList" :key="index">
                  <el-col :span="20">
                    <el-form-item :label="item.dictDataValue">
                      <span style="line-height:0;"></span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-button @click="getPreviewContra(item)" :disabled="!isDisabled" type="text">预览</el-button>
                  </el-col>
                </el-row>

              </el-form>

            </el-card>

            <el-card class="box-card" style="margin-top: 20px;">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">投资人列表与打印</span>
              </div>

              <el-form>
                <el-row>
                  <el-col :span="20">
                    <el-form-item label="投资人列表">
                      <span style="line-height:0;"></span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-button @click="showInverstorModal = true" type="text" :disabled="!isDisabled">查看详情</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <el-form-item label="投资人附件列表">
                      <span style="line-height:0;"></span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-button @click="handleAttachEdit()" type="text" :disabled="!isDisabled">查看详情</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <investor-list v-if="showInverstorModal" :agreementNo="contractData.agreementNo" @close="showInverstorModal = false"></investor-list>

    <attach-modal v-if="showAttachModal" :loanNo="this.loanNo" @close="showAttachModal = false"></attach-modal>
  </div>
</template>
<script>
import {
  getContract,
  selectContractList,
  previewContract
} from "@/api/contract";
import { getFiles } from "@/api/common";
import InvestorList from "./investor-list.vue";
// require styles
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import AttachModal from "./attachment-list";
import dateFormat from 'dateformat'

export default {
  name: "contract-view",
  components: {
    InvestorList,
    AttachModal,
    swiper,
    swiperSlide
  },
  data() {
    return {
      isEdit: false, // 是否为编辑状态
      showInverstorModal: false,
      dataId: null,
      showAttachModal: false,
      contractData: {},
      loanNo: "",
      files: null,
      agreementNo: "", // 协议编号
      fullLoading: true,
      contractPreviewList: {},
      contractPreview: {
        LoanNo: "",
        orderId: "",
        fileDictDataId: "",
        fileDictDataKey: ""
      },
      fileDictDataId: null,
      typeOptions: [
        { id: 2500047, key: "001", name: "身份证正面" },
        { id: 2500048, key: "002", name: "身份证反面" },
        { id: 2500049, key: "003", name: "手持证件" },
        { id: 2500050, key: "004", name: "合同相关资料" },
        { id: 2500235, key: "005", name: "投资人附件" },
        { id: 0, key: "history", name: "历史数据" } // 自定义的
      ],
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        autoHeight: true, // enable auto height
        spaceBetween: 20,
        zoom: true,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          slideChange: () => {
            //this.currentFile = this.fileList[this.swiper.activeIndex]
          }
        }
      }
    };
  },
  created() {
    this.agreementNo = this.$route.params.borrowNo;
    this.getContractDetail();
  },
  filters: {
    formatTime(date) {
      if (date) {
        return dateFormat(date, 'yyyy-mm-dd HH:MM')
      }
      return "-";
    }
  },
  computed: {
    // swiper() {
    //   return this.$refs.mySwiper.swiper
    // }
    isDisabled() {
      if (this.contractData) {
        return this.contractData.orderId || this.contractData.contractIds;
      } else {
        return false;
      }
    }
  },
  methods: {
    getContractDetail() {
      this.fullLoading = true;
      getContract(this.agreementNo)
        .then(response => {
          this.contractData = response.data;
          this.fullLoading = false;
          this.loanNo = response.data.loanNo;
          this.getContractList(response.data.loanNo);
        })
        .catch(error => {
          console.log(error);
          this.fullLoading = false;
        });
    },
    getContractFiles() {
      this.fullLoading = true;
      var params = {}
      if (this.fileDictDataId === 0) {
        // 历史数据
        params = {
          fileDictDataId: this.fileDictDataId,
          loanNo: this.contractData.orderId,
          ids: this.contractData.contractIds || ""
        }
      } else {
        params = {
          fileDictDataId: this.fileDictDataId,
          loanNo: this.contractData.orderId
        }
      }
      getFiles(params).then(response => {
          this.files = response.data;
          this.fullLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.fullLoading = false;
        });
    },
    getContractList(loanNo) {
      selectContractList(this.contractData.basicCustId, loanNo)
        .then(response => {
          this.contractPreviewList = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getPreviewContra(val) {
      this.contractPreview.fileDictDataId = val.dictTypeId;
      this.contractPreview.fileDictDataKey = val.dictDataKey;
      this.contractPreview.loanNo = this.contractData.loanNo;
      this.contractPreview.orderId = this.contractData.orderId;
      previewContract(this.contractPreview)
        .then(response => {
          window.open(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeFileType() {
      this.getContractFiles();
    },
    handleAttachEdit() {
      this.showAttachModal = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.contract-container .el-form-item {
  word-wrap: break-word;
}
.empty-box {
  width: 100%;
  padding: 150px 0;
  text-align: center;
  color: #99a9bf;
}
.scroll-card {
  height: 537px;
  overflow-y: auto;
  .el-card {
    border: none;
    box-shadow: none;
  }
}
</style>
