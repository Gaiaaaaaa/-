<template>
  <div class="app-container duplicate-checking-container">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-form class="form-container" :model="searchForm" ref="searchForm" :rules="rules" v-loading="searchLoading" label-width="100px">
          <el-form-item label="身份证号码:" prop="idCard">
            <el-input v-model.trim="searchForm.idCard" placeholder="身份证号码" @keyup.enter.native="search" style="width: 222px;"></el-input>
          </el-form-item>
          <el-form-item label="结果:" prop="result">
            {{result}}
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="small" icon="search" v-loading="searchLoading" @click="search">查询</el-button>

            <el-button size="small" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { findOrderDuplicate } from '@/api/order'

  export default {
    name: 'duplicate-checking',
    data() {
      return {
        searchForm: {
          idCard: ''
        },
        result: '',
        searchLoading: false,
        rules: {
          idCard: [
            { required: true, message: '请输入身份证号！', trigger: 'blur'},
            { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号！', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      search() {
        this.$refs['searchForm'].validate((valid) => {
          if (valid) {
            this.searchLoading = true
            findOrderDuplicate({ idCard: this.searchForm.idCard }).then(response => {
              this.result = response.msg
              this.searchLoading = false
            }).catch(error => {
              console.log(error)
              this.result = error.msg
              this.searchLoading = false
            })
          } else {
            this.$message.error('表单验证失败了！');
            return false;
          }
        });
      },
      resetForm() {
        this.searchForm.idCard = ''
        this.result = ''
      }
    }
  }
</script>
