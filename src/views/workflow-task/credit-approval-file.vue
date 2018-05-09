<template>
  <div class="credit-approval-file-container">
    <el-card class="box-card" v-loading="fullLoading">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-radio-group v-model="fileType">
            <el-radio-button :label="item.id" v-for="(item,index) in fileTypeData" :key="index" @click.native.stop="changeParentType(item)">{{item.name}}</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;">
          <el-tabs v-model="activeName" @tab-click="changeSubType" v-show="hasSubType">
            <el-tab-pane :label="item.name" v-for="(item,index) in fileTypeSubData" :key="index"></el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>

      <el-row :gutter="10" v-loading="fileLoading" style="margin: 20px 0;">
        <el-col :span="24">
          <div v-show="!hasFiles" style="width: 100%;text-align: center;color: #99A9BF;">该分类下没有文件信息</div>
          <!--<el-carousel height="700px" :autoplay="false" trigger="click" @change="fileChange" ref="imageCarousel" v-show="hasFiles">-->
            <!--<el-carousel-item v-for="item in fileList" :key="item.id" :name="item.fileName" style="text-align: center;">-->
              <!--<img :src="item.fileFullUrl" style="width: 100%;" />-->
            <!--</el-carousel-item>-->
          <!--</el-carousel>-->

          <swiper :options="swiperOption" ref="mySwiper" v-show="hasFiles" style="height: auto">
            <swiper-slide v-for="(item,index) in fileList" :key="index"><img :src="item.fileFullUrl" style="width: 100%;" /></swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-scrollbar"   slot="scrollbar"></div>
          </swiper>
        </el-col>
      </el-row>

      <el-row :gutter="10" v-loading="fileLoading" style="margin: 20px 0;" v-show="hasFiles">
        <el-col :span="20">附件名称：
          <span v-show="!updating">{{currentFile.fileName || '--'}}</span>
          <span v-show="updating"><el-input v-model.trim="fileName" size="small" style="width: 80%;" placeholder="请输入文件名"></el-input></span>
        </el-col>
        <el-col :span="4" style="text-align: right;" v-show="!updating">
          <el-button type="text" size="small" @click="toUpdateFileName">修改</el-button>
          <el-button type="text" size="small" @click="deleteFile">删除</el-button>
        </el-col>
        <el-col :span="4" style="text-align: right;" v-show="updating">
          <el-button type="primary" size="small" @click="updateFileName">确定</el-button>
          <el-button type="text" size="small" @click="updating = false">取消</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="10" v-loading="fileLoading" style="margin: 20px 0;">
        <el-col :span="8"><span v-show="hasFiles">附件总数量：{{fileTotal}}</span></el-col>
        <el-col :span="8" style="text-align: right;">
          <el-button size="small" @click="packDownloadFile" v-show="hasFiles">打包下载</el-button>
        </el-col>
        <el-col :span="8" style="text-align: right;" v-show="currentType.id !== undefined">
          <el-upload
            :action="upload.action"
            multiple
            :disabled="currentType.id === undefined"
            :data="uploadData"
            :headers="headers"
            :show-file-list="false"
            :on-progress="handleProgress"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeUpload">
            <el-button type="primary" size="small">上传附件</el-button>
          </el-upload>
        </el-col>
      </el-row>

      <el-row>
        <el-progress :percentage="upload.percent" v-show="upload.uploading"></el-progress>
      </el-row>

    </el-card>
  </div>
</template>

<script>
  import { getFileList, deleteFileById, updateFileNameById } from '@/api/order'
  import { getToken } from '@/utils/auth'
  import Utils from '@/utils/common'
  // require styles
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'order-list',
    props: ['customer'],
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        upload: {
          action: '',
          percent: 0,
          uploading: false
        },
        headers: {
          'Authorization': getToken()
        },
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          autoHeight: true, // enable auto height
          spaceBetween: 20,
          zoom: true,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          on: {
            slideChange: () => {
              this.currentFile = this.fileList[this.swiper.activeIndex]
            }
          }
        },
        uploadData: {},
        fileTotal: 0,
        fullLoading: false,
        fileLoading: false,
        updating: false,
        hasSubType: false,
        hasFiles: false,
        activeName: null,
        currentFile: {},
        currentType: {},
        fileList: [],
        fileTypeData: [],
        fileTypeSubData: [],
        fileName: '',
        fileType: '',
        fileTypeSub: ''
      }
    },
    created() {
      this.upload.action = `${process.env.BASE_API}/file/upload`
      Utils.getFileTypes(this.customer.orderId, data => {
        this.fileTypeData = data
        this.treeLoading = false
      })
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      beforeUpload(file) {
        const isImage = file.type.indexOf('image') > -1
        const isLt10M = file.size / 1024 / 1024 < 10

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
      handleSuccess(event, file, fileList) {
        this.upload.uploading = false
        this.getFiles()
      },
      handleError(error, file, fileList) {
        console.log(error)
        this.upload.uploading = false
      },
      handleProgress(event, file, fileList) {
        this.upload.percent = event.percent
      },
      changeSubType(tab) {
        const item = this.fileTypeSubData[tab.index]
        this.changeType(item)
      },
      changeParentType(item) {
        if (item.children && item.children.length > 0) {
            this.fileTypeSubData = item.children;
            this.$nextTick(() => {
              this.hasSubType = true;
            })
        } else {
          this.hasSubType = false
          this.fileTypeSubData = []
          this.changeType(item)
        }
      },
      changeType(data) {
        this.currentType = data
        if (this.currentType !== null) {
          this.getFiles()
        }
        this.uploadData = {
          loanNo: this.customer.orderId,
          fileDictDataId: data.id,
          fileDictDataKey: data.key,
          fileDictDataValue: data.name
        }
      },
      getFiles() {
        this.fileLoading = true
        this.fileList = []
        this.currentFile = {}
        getFileList({
          fileDictDataId: this.currentType.id,
          loanNo: this.customer.orderId,
          ids: '',
          fileDictDataValue: this.currentType.key,
          page: 1,
          pageSize: 100
        }).then(response => {
          this.fileList = response.data
          this.fileTotal = response.count
          this.hasFiles = this.fileList && this.fileList.length > 0
          if (this.hasFiles) {
            this.currentFile = this.fileList[0]

            // TODO 待优化，这里是为了解决第一次点击没有自动高度的问题
            setTimeout(() => {
              this.updating = true
              this.updating = false
            }, 100)
          }
          this
          this.fileLoading = false
        }).catch(error => {
          console.log(error)
          this.fileLoading = false
        })
      },
      deleteFile() {
        if (!this.currentFile.id) {
          Utils.warning('暂没有可删除的文件！')
        } else {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.listLoading = true
            deleteFileById(this.currentFile.id).then(response => {
              this.listLoading = false
              Utils.success('删除成功！')
              this.getFileList()
            }).catch(error => {
              console.log(error)
              this.listLoading = false
            })
          })
        }
      },
      packDownloadFile() {
        if (!this.currentType.id) {
          Utils.warning('暂没有可下载的文件！')
        } else {
          window.open(`${process.env.BASE_API}/file/pack-download?fileDictDataId=${this.currentType.id}&loanNo=${this.customer.orderId}&fileDictDataValue=${this.currentType.key}`)
        }
      },
      toUpdateFileName() {
        if (!this.currentType.id) {
          Utils.warning('暂没有可修改的文件！')
        } else {
          this.fileName = this.currentFile.fileName
          this.updating = true
        }
      },
      updateFileName() {
        if (this.fileName === '') {
          Utils.warning('请输入文件名！')
        } else {
          updateFileNameById({
            fileName: this.fileName,
            id: this.currentFile.id
          }).then(response => {
            this.getFiles()
            Utils.success('文件名修改成功！')
            this.updating = false
          }).catch(error => {
            console.log(error)
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-select {
    width: 100px;
  }
</style>
