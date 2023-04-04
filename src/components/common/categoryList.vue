<!-- 管理员-分类管理页面 -->
<template>
    <div class="main-border">
        <div class="operations">
            <el-button size="mini" type="success" @click="categoryVisable1 = true">添加分类</el-button>
        </div>
        <div>
            <el-table :data="categories" stripe style="width: 100%;color: #5a5c61;">
                <el-table-column prop="id" label="分类id" show-overflow-tooltip width="200">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="category_name" label="分类名称" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.categoryName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间" show-overflow-tooltip min-width="150" width="200">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success"
                            @click="openCategoryDialog(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="danger"
                            @click="deleteCategoryById(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>

        <!-- 添加分类列表 -->
        <el-dialog title="添加分类" :visible.sync="categoryVisable1" width="25%">
            <span style="margin-left: 10px">请输入分类名称</span>
            <el-input v-model="category_name" maxlength="8" placeholder="请输入分类名称" style="padding: 10px 0" clearable
                required></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addCategory">添加</el-button>
            </span>
        </el-dialog>

         <!-- 修改分类列表 -->
         <el-dialog title="添加分类" :visible.sync="categoryVisable2" width="25%">
            <span style="margin-left: 10px">修改分类名称</span>
            <el-input v-model="category_new_name" maxlength="8" placeholder="请输入分类名称" style="padding: 10px 0"
                clearable required></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateCategoryById">修改</el-button>
            </span>
        </el-dialog>


        <div class="block">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="nowPage" :page-size="8" background
                layout="prev, pager, next,jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>

export default {
    name: 'categoryList',
    components: {

    },
    data() {
        return {
            nowPage: 1,
            total: 0,
            category_new_name: '',
            category_name:'',
            categoryVisable1: false,
            categoryVisable2:false,
            categories: []
        }

    },
    methods: {
        // 查询所有分类
        queryAllCategory() {
            this.$api.getAllCategory().then(res=>{
                this.categories = res.data;
            })
        },
        // 根据分类的id删除分类
        deleteCategoryById(index, row) {
            // console.log(row.id);
        },
        // 根据分类的id修改分类
        updateCategoryById(index, row) {
            // console.log(row.id);
        },
        // 添加分类
        addCategory() {

        },
        // 显示分类修改对话框
        openCategoryDialog(index,row){
            this.categoryVisable2 = true;
            this.updateCategoryById(index,row);
        },
        handleCurrentChange(val) {
            this.nowPage = val;
        },
    },
    created() {
        this.queryAllCategory();
    }
}
</script>
<style scoped>
.main-border {
    background-color: #FFF;
    padding: 10px 30px;
    box-shadow: 0 1px 15px -6px rgba(0, 0, 0, .5);
    border-radius: 5px;
}

.block {
    display: flex;
    justify-content: center;
    padding-top: 15px;
    padding-bottom: 10px;
    width: 100%;
}
</style>