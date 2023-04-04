<!-- 升级商家页面 -->
<template>
    <div>
        <app-head></app-head>
        <app-body>
            <div style="padding: 30px;">
                <el-form ref="storeForm" :model="storeForm" :rules="rules"
                    :label-width="storeForm.labelWidth">
                    <el-form-item label="店铺名称:" prop="storeName">
                        <el-input v-model="storeForm.storeName" placeholder="给自己的店铺起一个好听的名字吧！" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="店铺介绍:" prop="storeDesc">
                        <el-input v-model="storeForm.storeDesc" placeholder="描述一下自己的店铺吧！" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="店铺营业资质照片:" prop="storePics">
                        <el-upload class="upload-demo" action="" :file-list="fileList" list-type="picture" :on-remove="handleRemove"
                            :auto-upload="false" ref="upload" :limit="3" :on-exceed="handleExceed" :on-change="handleFileChange">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="是否有线下门店:">
                        <el-radio v-model="storeForm.hasOffline" label="1">无</el-radio>
                        <el-radio v-model="storeForm.hasOffline" label="2">有</el-radio>
                    </el-form-item>
                    <el-form-item label="请选择位置" v-if="storeForm.hasOffline === '2'" prop="storeAddress">
                        <div class="address-container-add-item">
                            <el-cascader :options="options" v-model="storeForm.selectedOptions"
                                @change="handleAddressChange" :separator="' '">
                            </el-cascader>
                        </div>
                    </el-form-item>
                    <el-form-item style="text-align: center;">
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button type="warning" @click="reset">重置</el-button>
                        <el-button type="danger" @click="$router.push('/index')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </app-body>
        <app-foot></app-foot>

    </div>
</template>
<script>
import AppHead from '../common/AppHeader.vue';
import AppBody from '../common/AppPageBody.vue'
import AppFoot from '../common/AppFoot.vue';
import options from '../common/country-data.js'
export default {
    name: "upgradePage",
    components: {
        AppBody,
        AppHead,
        AppFoot
    },
    watch: {
        storeForm: {
            handler(n, o) {
                if (n.hasOffline === '1' && this.storeForm.selectedOptions.length != 0) {
                    this.storeForm.selectedOptions = [];
                }
            },
            deep: true
        }
    },
    data() {
        return {
            storeForm: {
                storeName: "",
                storeDesc: "",
                hasOffline: "1",
                labelWidth: "145px",
                selectedOptions: [],//存放默认值
            },
            fileList:[],//用户上传的资质证书
            options: options,   //存放城市数据,
            rules: {
                storeName: [
                    { required: true, message: '请输入店铺名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                storeDesc: [
                    { required: true, message: '请概述一下店铺主要的特征', trigger: 'blur' },
                    { min: 10, max: 35, message: '长度在 10 到 35 个字符', trigger: 'blur' }
                ],
                storeAddress: [
                    { required: true, message: '请选择店铺所在的区域', trigger: 'blur' }
                ],
                storePics: [
                    { required: true, message: '请上传资质证书', trigger: 'blur' }
                ]

            },
        };
    },
    methods: {
        handleAddressChange(value) {
            console.log(value);
            console.log(this.storeForm.selectedOptions);
        },
        handleFileChange(file,fileList){
            this.fileList = fileList;
        },
        handleExceed(){
            this.$message.error({message:'图片最多上传三张',showClose:true});
        },
        handleRemove(file,fileList){
            this.fileList = fileList;
        },
        onSubmit() {
            if(this.storeForm.storeName.length<3 || this.storeForm.storeDesc.length<10){
                this.$message.error({message:'请将必填项填写完整！',showClose:true});
                return;
            }
            if(this.fileList.length===0){
                this.$message.error({message:'请上传资质证书！限制在三张之内',showClose:true});
                return;
            }
            if(this.storeForm.hasOffline==='2' && this.storeForm.selectedOptions.length===0){
                this.$message.error({message:'请选择具体的门店位置！',showClose:true});
                return;
            }
            
            console.log(this.storeForm);
            // 发出ajax请求，请求升级
            // 发出上传资质请求
        },
        reset() {
            this.$refs["storeForm"].resetFields();
        }
    }
}
</script>
<style scoped></style>