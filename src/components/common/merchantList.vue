<!-- 管理员-商家管理页面 -->
<template>
    <div class="main-border">
        <div>
            <el-table :data="merchants" stripe style="width: 100%;color: #5a5c61;">
                <el-table-column prop="id" label="商家id" show-overflow-tooltip width="200">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="merchant_account" label="商家账号" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.merchant_account }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="merchant_name" label="商家店铺名称" show-overflow-tooltip min-width="150" width="200">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.merchant_name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="merchant_state" label="商家状态" show-overflow-tooltip min-width="150" width="200">
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" v-if="scope.row.merchant_state===0" type="success" effect="dark">正常</el-tag>
                        <el-tag style="margin-left: 10px" v-else type="info" effect="dark">拉黑</el-tag>
                        <!-- <span >{{ scope.row.merchant_state===0?'正常':'拉黑' }}</span> -->
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" v-if="scope.row.merchant_state===0" @click="cleanCategory(scope.$index, scope.row)">拉黑</el-button>
                        <el-button size="mini" type="info" v-else @click="releaseMerchant(scope.$index, scope.row)">解除拉黑</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>
<script>

export default {
    name: 'merchantList',
    components: {

    },
    data() {
        return {
            merchants: [{
                id: 1,
                merchant_name: 'SHADOW',
                merchant_account: '12312312311',
                merchant_state:1, // 0正常,1拉黑
            }]
        }
    },
    methods: {
        cleanCategory(index, row) {
            this.$confirm("确定要将此商家加入黑名单吗?", '提醒', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                row.merchant_state=1;
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        releaseMerchant(index,row){
            row.merchant_state=0;
            this.$message({
                type:'success',
                message:'已解除拉黑'
            })
        }
    },
    created() {

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