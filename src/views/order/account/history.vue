<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" >

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">绑卡历史记录</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <div>
                <el-table :data="hisList" border stripe fit v-loading.body="listLoading">
                  <el-table-column property="tieCardNo" label="绑定卡号" width="150"></el-table-column>
                  <el-table-column property="bankName" label="开户行" width="200"></el-table-column>
                  <el-table-column property="bankPhone" label="手机号码"></el-table-column>
                  <el-table-column property="createTime" label="操作时间" width="200">
                    <template scope="scope">
                      {{scope.row.createTime | dateFormat}}
                    </template>
                  </el-table-column>
                  <el-table-column property="type" label="交易类型" width="200"></el-table-column>
                  <el-table-column property="fruit" label="交易结果"></el-table-column>
                  <el-table-column property="creatorName" label="操作人" width="150"></el-table-column>
                  <el-table-column property="belongName" label="所属门店" width="200"></el-table-column>
                </el-table>
                <div class="pagination-container">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="listQuery.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                  </el-pagination>
                </div>
              </div>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import { loadByCertNo } from '@/api/depository'

  export default {
    props: {
      certNo: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        hisList: [],
        listLoading: true,
        getDataLoading: false,
        submitLoading: false,
        currentPage: 1,
        total: 0,
        listQuery: {
          certNo: this.certNo,
          page: 1,
          pageSize: 10
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 获取列表
      getList() {
        this.listLoading = true
        loadByCertNo(this.listQuery).then(response => {
          this.total = response.count
          this.hisList = response.data
          console.log(this.hisList)
          this.listLoading = false
        }).catch(error => {
          console.log(error)
          this.listLoading = false
        })
      },
      handleSizeChange(n) {
        this.listQuery.pageSize = n
        this.getList()
      },
      handleCurrentChange(n) {
        this.listQuery.page = n
        this.getList()
      }
    }
  }
</script>
