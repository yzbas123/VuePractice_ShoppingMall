<template>
  <div class="user_rate" v-if="Object.keys(userRate).length!=0">
    <div class="title">
      <div>用户评价</div>
      <div>
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="userInfor">
      <img :src="userRate.userAvatar" />
      <span>{{userRate.userName}}</span>
    </div>
    <div class="content">{{userRate.content}}</div>
    <div class="extraInfor">
      <span class="date">{{getCommentDate}}</span>
      <span class="style">{{userRate.buyStyle}}</span>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/util";
export default {
  props: {
    userRate: {
      type: Object
    }
  },
  computed:{
    //   userRate.commentSeconds
    getCommentDate(){
        let date = new Date(this.userRate.commentSeconds*1000)
        return formatDate(date,'yyyy-MM-dd');
    }
  }
};
</script>

<style scoped>
.user_rate {
  padding: 20px 10px;
  border-bottom: 5px solid #f2f5f8;
}
.title {
  display: flex;
  height: 50px;
  line-height: 50px;
  justify-content: space-between;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.userInfor {
  margin: 10px 0px;
}
.userInfor img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  vertical-align: middle;
  margin-right: 10px;
}
.content {
  font-size: 14px;
  margin-bottom: 10px;
}
.extraInfor {
  font-size: 12px;
  color: #b5b5b5;
}
.date{
    margin-right: 10px;
}
</style>