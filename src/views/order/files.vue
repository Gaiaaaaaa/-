<template>
  <div class="order-attachment-form">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">合同附件信息</span>
      </div>

      <el-row :gutter="20">
        <el-col :xs="{span: 8}" :sm="{span: 6}" :md="{span: 6}" :lg="{span: 4}">
          <el-tree :data="fileTypeData" ref="tree" :props="defaultProps" highlight-current accordion @node-click="handleNodeClick" v-loading="treeLoading"></el-tree>
        </el-col>

        <el-col :xs="{span: 16}" :sm="{span: 18}" :md="{span: 18}" :lg="{span: 20}">

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
        </el-col>
      </el-row>

    </el-card>

    <div class="images" v-viewer="{navbar:false}" v-show="false">
      <img :src="imageSrc">
    </div>
  </div>
</template>

<script>
  import dateFormat from 'dateformat'
  import { getFileList, entryComplete, entryApply, deleteFileById } from '@/api/order'
  import { getToken } from '@/utils/auth'
  import Utils from '@/utils/common'
  import Viewer from 'v-viewer'
  import Vue from 'vue'
  Vue.use(Viewer)

  export default {
    name: 'order-attachements',
    data() {
      return {
        imageSrc: '',
        treeLoading: false,
        listLoading: false,
        submitLoading: false,
        currentPage: 1,
        total: 0,
        fileCriteria: {
          fileDictDataId: '',
          loanNo: this.$route.query.orderId,
          ids: '',
          fileDictDataValue: '',
          page: 1,
          pageSize: 5
        },
        headers: {
          'Authorization': getToken()
        },
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
      Utils.getFileTypes(data => {
        this.fileTypeData = data
        this.treeLoading = false
      })
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
      handleNodeClick(data) {
        if (this.$route.query.orderId) {
          this.fileCriteria.fileDictDataId = data.id
          this.getFileList()
          this.activeNode = data
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
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
