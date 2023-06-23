<template>
  <div class="message">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="55%" :before-close="handleClose">
      <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="birth">
          <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="handelAdd" type="primary">+新增</el-button>
      <!-- <form action=""></form> -->
      <el-form inline="true" :model="userForm">
        <el-form-item>
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="userForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(val)">查询</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-tabel">
      <el-table height="90%" :data="tableData" style="width: 100%" stripe>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="sexLabel" label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex === 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="birth" label="出生日期">
        </el-table-column>
        <el-table-column prop="addr" label="地址">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { addUser, getUser, editUser, delUser } from '../api'
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'change' },
          { min: 1, max: 120, message: '应在1-120岁之间' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        birth: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        addr: [
          { required: true, message: '请选择地址', trigger: 'change' }
        ]
      },
      tableData: [],
      modalType: 0, //0为新增  1为编辑
      total: 0,
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: ''
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modalType == 0) {
            addUser(this.form).then(() => {
              // 重新获取列表记录
              this.getUser()
            })
          } else {
            editUser(this.form).then(() => {
              // 重新获取列表记录
              this.getUser()
            })
          }
          // 清空列表数据
          this.$refs.form.resetFields();
          // 关闭弹窗
          this.dialogVisible = false
        }
      })
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false
    },
    cancel() {
      this.handleClose()
    },
    handleEdit(row) {
      this.modalType = 1
      this.dialogVisible = true
      this.form = JSON.parse(JSON.stringify(row))
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser({ id: row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 重新获取列表的接口
          this.getUser()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getUser() {
      //获取列表的数据
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(({ data }) => {
        this.tableData = data.list
        this.total = data.count || 0
      })
    },

    handelAdd() {
      this.modalType = 0
      this.dialogVisible = true
    },
    //页码函数回调
    handlePage(val) {
      this.pageData.page = val
      this.getUser()
    },
    onSubmit(val) {
      this.getUser(), this.handlePage()
    }
  },
  mounted() {
    this.getUser()
  }
};
</script>

<style lang="less" scoped>
.message {
  height: 90%;

  .manage-header {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .common-tabel {
    position: relative;
    height: calc(100% - 62px);

    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>