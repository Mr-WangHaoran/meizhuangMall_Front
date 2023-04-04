<!-- 商家入驻页面 -->
<template>
    <div>
        <app-head></app-head>
        <app-body>
            <div style="padding: 50px;">
                <div id="uploadDiv" style="text-align: center;">
                    上传店铺头像
                    <el-upload class="avatar-uploader" action="http://localhost:8080/file/" :show-file-list="false"
                        :auto-upload="false" ref="avatarUpload" :limit="1" :on-change="changeImg" :on-success="successUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不能超过2MB</div>
                    </el-upload>
                </div>

                <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                    <el-form-item label="店铺名称" prop="merchant_name">
                        <el-input v-model="form.merchant_name"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺账号" prop="merchant_account">
                        <el-input v-model="form.merchant_account"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="merchant_pwd">
                        <el-input v-model="form.merchant_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="merchant_confirm_pwd">
                        <el-input v-model="form.merchant_confirm_pwd" type="password"></el-input>
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
import AppFoot from '../common/AppFoot.vue'
import SignIn from './sign-in.vue';
export default {
    name: 'merchantSettleIn',
    components: {
        AppHead,
        AppBody,
        AppFoot
    },
    data() {

        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.form.merchant_confirm_pwd !== '') {
                    this.$refs.form.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.merchant_pwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            imageUrl: '',
            form: {
                merchant_name: '',// 商家店铺名称
                merchant_avatar: '',// 上传头像
                merchant_account: '',// 商家账号，通常是商家注册的手机号或邮箱
                merchant_pwd: '',// 密码
                merchant_confirm_pwd: '',// 确认密码
            },
            rules: {
                merchant_name: [
                    { required: true, message: '请输入店铺名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                merchant_account: [
                    { required: true, message: '请自定义账号，账号内容通常是您的手机号或邮箱账号', trigger: 'blur' },
                    { min: 11, max: 35, message: '长度在 11 到 35 个字符', trigger: 'blur' }
                ],
                merchant_pwd: [
                    { required: true, validator: validatePass, trigger: 'blur' },
                    { min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                merchant_confirm_pwd: [
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ]
            },
            allowUpload: false,
        }
    },
    methods: {
        // 用户提交表单
        onSubmit() {
            // console.log("提交");
            // console.log(this.form);
            // console.log(this.imageUrl);
            // return;
            if (this.imageUrl === '') {
                this.allowUpload = true;
            }
            if (this.allowUpload &&
                this.form.merchant_account &&
                this.form.merchant_name &&
                this.form.merchant_pwd &&
                this.form.merchant_confirm_pwd &&
                this.form.merchant_pwd === this.form.merchant_confirm_pwd) {
                // this.$refs.avatarUpload.submit();
                // console.log(this.$refs.avatarUpload.submit());
                // return;
                this.$api.merchantSignIn({
                    merchantAccount: this.form.merchant_account,
                    merchantPwd: this.form.merchant_pwd,
                    merchantName: this.form.merchant_name,
                }).then(res => {
                    if (res.status_code === 1) {
                        this.$message({
                            message: '恭喜您入驻成功！',
                            type: 'success',
                            showClose: true
                        });
                        this.$router.replace({ path: '/merchant-login' });
                    } else {
                        this.$message.error('注册失败，商家已存在！');
                    }
                }).catch(e => {
                    console.log(e);
                    this.$message.error('注册失败，网络异常！');
                })
            }

        },
        // 上传成功后的函数
        successUpload(res,file,fileList){
            console.log(res);
        },
        // 用户重置表单
        reset() {
            this.$refs["form"].resetFields();
        },
        // 头像上传之前
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error({message:'上传头像图片大小不能超过 2MB!',showClose:true});
            }
            if (isLt2M) {
                this.allowUpload = true
            }
            return isLt2M;
        },
        // 改变头像状态
        changeImg(file, fileList) {
            if (this.beforeAvatarUpload(file)) {
                this.$refs.avatarUpload.clearFiles();
                this.imageUrl = URL.createObjectURL(file.raw);
                // console.log(this.imageUrl);
            }

        },
        // 商家入驻方法
        signIn() {
            // console.log(this.userInfo.nickname);
        }
    },
    // 生命周期函数
    created() {

    }
}
</script>
<style>
#uploadDiv .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

#uploadDiv .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

#uploadDiv .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

#uploadDiv .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>