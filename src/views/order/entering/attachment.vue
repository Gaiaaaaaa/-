<template>
  <div class="order-attachment-form">
    <el-form class="form-container" :model="customerInfo" ref="attachmentForm" label-position="top">

      <el-row :gutter="20">
        <el-col :xs="{span: 8}" :sm="{span: 6}" :md="{span: 6}" :lg="{span: 4}">
          <el-tree :data="fileTypeData" ref="tree" :props="defaultProps" highlight-current accordion @node-click="handleNodeClick" v-loading="treeLoading"></el-tree>
        </el-col>

        <el-col :xs="{span: 16}" :sm="{span: 18}" :md="{span: 18}" :lg="{span: 20}">


          <el-row v-if="showFileUpload" style="margin-bottom: 20px;">
            <el-upload
              @click.native="uploadClick"
              :action="upload.action"
              class="upload-container"
              :multiple="upload.multiple"
              :disabled="upload.disable"
              :data="uploadData"
              :headers="headers"
              :show-file-list="false"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-progress="handleProgress"
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload">
              <el-progress class="upload-progress" :percentage="upload.percent" :stroke-width="18" :status="upload.status" :text-inside="true" v-if="upload.uploading"></el-progress>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传不超过10MB的文件</div>
            </el-upload>


          </el-row>

          <el-row>
            <el-table
              :data="fileList"
              v-loading="listLoading"
              border stripe fit
              empty-text="该分类下暂无数据"
              style="width: 100%">
              <el-table-column
                prop="fileName"
                label="文件名">
              </el-table-column>
              <el-table-column
                min-width="80px"
                prop="fileType"
                label="文件类型">
              </el-table-column>
              <el-table-column
                min-width="80px"
                label="文件大小">
                <template scope="scope">
                  <span>{{scope.row.fileSize | formatFileSize}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="120px"
                align="center"
                label="最后更新时间">
                <template scope="scope">
                  <span>{{scope.row.updateTime | dateFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="80px"
                align="center"
                label="操作">
                <template scope="scope">
                  <el-button type="text" size="small" class="preview-img"
                             :src="scope.row.fileFullUrl" @click="showImageClick(scope.row.fileFullUrl)"
                             v-if="scope.row.fileType.indexOf('image') > -1">
                    预览
                  </el-button>
                  <el-button @click.native.prevent="deleteFile(scope.row)" type="text" size="small" v-if="showFileUpload">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="block pagination-container" style="text-align: right;">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20, 50, 100]"
                :page-size="fileCriteria.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </el-row>
        </el-col>
      </el-row>

      <el-row style="margin-top: 20px;" v-if="!customer.isView">
        <el-col :span="2" :md="{offset: 4}" :lg="{offset: 4}">
          <el-form-item>
            <el-button @click="toPrevious">上一步</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2" :xs="{offset: 10}" :sm="{offset: 10}" :md="{offset: 7}" :lg="{offset: 6}">
          <el-form-item>
            <el-button type="primary" v-loading="submitLoading" @click="complete"
                       :disabled="showComplete">完成</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2" :xs="{offset: 4}" :sm="{offset: 3}" :md="{offset: 2}" :lg="{offset: 1}">
          <el-form-item>
            <el-button type="primary" v-loading="submitLoading" @click="apply"
                       :disabled="showSubmit">提交进件</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin-top: 20px;" v-if="!customer.isView">
        <el-col :span="24" class="order-attachment-form-tips">
          <div>资料附件请按照如下分类上传！</div>
          <ul>
            <li>身份证明类：身份证、居住证、暂住证、户口本、结婚证等</li>
            <li>收入证明类：网银工资流水、社保/公积金缴纳记录、其他个人银行流水</li>
            <li>工作证明类：劳动合同、工作证明、工作证/工牌、公务员证</li>
            <li>住址证明类：税单/交通罚单、水费单/电费单/燃气单/电话费单/移动电话服务账单/网络服务账单/有线电视账单、月度信用卡账单、
              房屋租赁合同、住址证明（单位开具）</li>
            <li>经营证明类：营业执照、公司账户流水、公司租赁合同及近期租赁发票、订单</li>
            <li>资产证明类：房产证、按揭合同/抵押合同、房贷还款流水、行驶证/车辆登记证、车险保单、寿险保单</li>
            <li>贷款资料类：指定机构借款合同/官网截屏、支付宝信息、芝麻信用信息、微信信息、微粒贷信息</li>
            <li>征信报告类：征信报告、征信授权书、签字照</li>
            <li>其他证明类：信审补件类、财务打包(整体、补件)、其他(整体)</li>
          </ul>
        </el-col>
      </el-row>

    </el-form>
    <div class="images" v-viewer="{navbar:false, toolbar: false}" v-show="false">
      <img :src="imageSrc">
    </div>
  </div>
</template>

<script>
  import dateFormat from 'dateformat'
  import { getFileList, entryComplete, entryApply, deleteFileById, getOrder } from '@/api/order'
  import { getToken } from '@/utils/auth'
  import Utils from '@/utils/common'
  import Viewer from 'v-viewer'
  import Vue from 'vue'
  Vue.use(Viewer)
  export default {
    name: 'order-entering-attachement',
    props: ['customer'],
    data() {
      return {
        imageSrc: '',
        upload: {
          action: '',
          percent: 0,
          disable: true,
          multiple: true,
          uploading: false,
          status: ''
        },
        showComplete: false,
        showSubmit: false,
        showFileUpload: false,
        treeLoading: false,
        listLoading: false,
        submitLoading: false,
        customerInfo: {
          name: '',
          user: ''
        },
        currentPage: 1,
        total: 0,
        fileCriteria: {
          fileDictDataId: '',
          loanNo: '',
          ids: '',
          fileDictDataValue: '',
          page: 1,
          pageSize: 5
        },
        headers: {
          'Authorization': getToken()
        },
        uploadData: null,
        fileList: [],
        fileTypeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    created() {
      this.treeLoading = true
      this.upload.action = `${process.env.BASE_API}/file/upload`
      Utils.getFileTypes(this.customer.orderId || '', data => {
        this.fileTypeData = data
        this.treeLoading = false
      })
      if (this.customer && this.customer.orderId) {
        this.fileCriteria.loanNo = this.customer.orderId
      }
      this.getProcessType()
    },
    filters: {
      formatFileSize(fileSize) {
        return Utils.formatFileSize(fileSize)
      },
      dateFilter(date) {
        return dateFormat(date, 'yyyy-mm-dd HH:MM')
      }
    },
    methods: {
      getProcessType() {
        if (this.customer.orderId) {
          getOrder(this.customer.orderId).then(response => {
            // 完成按钮草稿状态显示
            if (response.data.itemStatusKey === '012') {
              if (this.customer.customerId === '' || this.customer.orderId === '' || this.submitLoading) {
                this.showComplete = true
              } else {
                this.showComplete = false
              }
            } else {
              this.showComplete = true
            }
            // 提交进件按钮草稿状态，新建状态显示
            if (response.data.itemStatusKey === '012' || response.data.itemStatusKey === '001') {
              if (this.customer.customerId === '' || this.customer.orderId === '' || this.submitLoading) {
                this.showSubmit = true
              } else {
                this.showSubmit = false
              }
            } else {
              this.showSubmit = true
            }
          }).catch(error => {
            console.log(error)
          })
        }
      },
      uploadClick() {
        if(this.customer.orderId && !this.activeNode){
          this.$message({
            showClose: true,
            message: '请选择对应的文件类型进行上传！',
            type: 'warning'
          });
        }
        if(this.customer.orderId && this.activeNode && this.activeNode.children && this.activeNode.children.length>0){
          this.$message({
            showClose: true,
            message: '请选择该分类下的子分类！',
            type: 'warning'
          });
        }
      },
      toPrevious() {
        this.$emit('switchTab', 'credit')
      },
      complete() {
        this.submitLoading = true
        entryComplete({
          customerId: this.customer.customerId,
          orderId: this.customer.orderId
        }).then(response => {
          this.submitLoading = false
          Utils.success('订单新建成功')
          this.$router.push({ path: '/order/list' })
        }).catch(error => {
          console.log(error)
          this.submitLoading = false
        })
      },
      apply() {
        this.submitLoading = true
        entryApply({
          customerId: this.customer.customerId,
          orderId: this.customer.orderId
        }).then(response => {
          this.submitLoading = false
          Utils.success('订单申请成功')
          this.$router.push({ path: '/order/list' })
        }).catch(error => {
          if (error.code === '111111') {
            this.$alert(error.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push({ path: '/order/list' })
              }
            })
          }
          this.submitLoading = false
        })
      },
      beforeUpload(file) {
        const isImage = file.type.indexOf('image') > -1
        const isLt10M = file.size / 1024 / 1024 < 10
        if (this.customer.isView === true) {
          if (this.customer.allowEditFile === true) {
            if (this.showFileUpload) {
              if (this.fileList.length > 0) {
                this.$message.error('上传附件只能是一张!')
                return false
              }
            }
          }
        }
        if (!isImage) {
          this.$message.error('上传附件只能是图片格式!')
        }
        if (!isLt10M) {
          this.$message.error('上传附件大小不能超过 10MB!')
        }
        if (isLt10M) {
          this.upload.uploading = true
        }
        return isLt10M
      },
      handleNodeClick(data, node) {
        if (this.customer.orderId) {
          this.fileCriteria.fileDictDataId = data.id
          this.uploadData = {
            loanNo: this.customer.orderId,
            fileDictDataId: data.id,
            fileDictDataKey: data.key,
            fileDictDataValue: data.name
          }
          this.getFileList()
          this.activeNode = data;
          if(data.children && data.children.length > 0) {
            this.upload.disable = true;
          } else {
            this.upload.disable = false;
          }

          this.upload.multiple = true
          // 控制是否可上传附件
          if (this.customer.isView === true) {
            if (this.customer.allowEditFile === true) {
              // 合同分类
              this.showFileUpload = node.parent.data.key === '003'
              this.upload.multiple = false
            }
          } else {
            this.showFileUpload = true
          }
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      handleSuccess(event, file, fileList) {
        console.log('上传成功')
        this.upload.uploading = false
        this.getFileList()
      },
      handleError(error, file, fileList) {
        console.log(error)
        this.upload.uploading = false
      },
      handleProgress(event, file, fileList) {
        this.upload.percent = Math.round(event.percent)
        if(20<this.upload.percent && this.upload.percent<50) {
          this.upload.status ='exception';
        }else if(this.upload.percent == 100) {
          this.upload.status ='success';
        }
      },
      getFileList() {
        this.listLoading = true
        getFileList(this.fileCriteria).then(response => {
          this.fileList = response.data
          this.total = response.count
          this.listLoading = false
        }).catch(error => {
          console.log(error)
          this.listLoading = false
        })
      },
      handleSizeChange(n) {
        this.fileCriteria.pageSize = n
        this.getFileList()
      },
      handleCurrentChange(n) {
        this.fileCriteria.page = n
        this.getFileList()
      },
      showImageClick(src) {
        this.imageSrc = `${src}?t=${new Date().getTime()}`;
        this.$nextTick(()=> {
          const viewer = this.$el.querySelector('.images').$viewer
          viewer.show()
        })
      },
      deleteFile(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          deleteFileById(row.id).then(response => {
            this.listLoading = false
            Utils.success('删除成功！')
            this.getFileList()
          }).catch(error => {
            console.log(error)
            this.listLoading = false
          })
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.order-attachment-form {
  &-tips {
    line-height: 1.8;
    font-size: 12px;
    padding: 18px 24px;
    background-color: #f9fafc;
    border: 1px solid #eaeefb;
    color: #868585;
    margin-bottom: 25px;
    border-radius: 4px;
    -webkit-font-smoothing: auto;
  }
}
.upload-progress {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
}
</style>
