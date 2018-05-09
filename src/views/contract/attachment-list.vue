<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 600px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">投资人附件列表</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <el-row >
              <el-upload
                :action="upload.action"
                multiple
                style="float: right;"
                :data="imgQuery"
                :headers="headers"
                :show-file-list="false"
                :on-progress="handleProgress"
                :on-success="handleSuccess"
                :on-error="handleError"
                :before-upload="beforeUpload">
                <el-button type="primary" size="small">上传附件</el-button>
              </el-upload>
            </el-row>

            <el-row>
              <el-progress :percentage="upload.percent" v-show="upload.uploading"></el-progress>
            </el-row>

            <el-row style="margin-top: 20px;">
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
                    <el-button @click.native.prevent="deleteFile(scope.row)" type="text" size="small">
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

            <div class="images" v-viewer="{navbar:false}" v-show="false">
              <img :src="imageSrc">
            </div>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
  import dateFormat from 'dateformat'
  import Utils from '@/utils/common'
  import Viewer from 'v-viewer'
  import Vue from 'vue'
  Vue.use(Viewer)
  import { getFileList, deleteFileById } from '@/api/order'
  import { getToken } from '@/utils/auth'

  export default {
    props: {
      loanNo: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        getDataLoading: false,
        listLoading: false,
        showImage: false,
        imageSrc: '',
        fileList: [],
        hasFiles: true,
        total: 0,
        currentPage: 1,
        upload: {
          action: '',
          percent: 0,
          uploading: false
        },
        headers: {
          'Authorization': getToken()
        },
        imgQuery: {
          loanNo: this.loanNo,
          fileDictDataId: 2500235,
          fileDictDataKey: '005',
          fileDictDataValue: '投资人附件'
        },
        fileCriteria: {
          fileDictDataId: 2500235,
          loanNo: this.loanNo,
          ids: '',
          fileDictDataValue: '',
          page: 1,
          pageSize: 5
        }
      }
    },
    created() {
      this.upload.action = `${process.env.BASE_API}/file/upload`
      this.getList()
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
      getList() {
        console.log(this.loanNo)
        if (this.loanNo) {
          this.listLoading = true
          getFileList(this.fileCriteria).then(response => {
            this.fileList = response.data
            this.total = response.count
            this.listLoading = false
          }).catch(error => {
            console.log(error)
            this.listLoading = false
          })
        }
      },
      handleProgress(event, file, fileList) {
        this.upload.percent = event.percent
      },
      handleSuccess(event, file, fileList) {
        this.upload.uploading = false
        this.getList()
      },
      handleError(error, file, fileList) {
        console.log(error)
        this.upload.uploading = false
      },
      handleSizeChange(n) {
        this.fileCriteria.pageSize = n
        this.getList()
      },
      handleCurrentChange(n) {
        this.fileCriteria.page = n
        this.getList()
      },
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
            this.getList()
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
  .el-cascader, .el-select {
    width: 100%
  }
</style>
