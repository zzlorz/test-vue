<template>
  <div class="index">
    <div class="navbar">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/photo">Photo</router-link></li>
        <li>Diary</li>
        <li>Article</li>
        <li>Interesting</li>
      </ul>
    </div>
    <div class="title-en">Remember the past</div>
    <div class="title-cn">记住 / 过往，　记忆 / 永存</div>
    <!-- <div class="navbar">
      <ul>
        <li><router-link to="/photo">Photo</router-link></li>
        <li>Diary</li>
        <li>Article</li>
        <li>Interesting</li>
      </ul>
    </div> -->
    <slot name="container">efsd</slot>
    <div class="copyright">
      © Copyright &reg; 2020 | <a href="http://beian.miit.gov.cn/" target="_blank" title="备案号">苏ICP备17016370号-3</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      
    }
  },
  computed: {
    
  },
  mounted () {
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index{
  height: 100%;
  max-width: 1080px;
  margin: 0 auto;
}
.title-en{
  font-family: SimSun, microsoft yahei;
  font-size: 36px;
  color: #2c3e50;
  margin-top: 80px;
  margin-bottom: 20px;
  position: relative;
  font-weight: 100;
  /* visibility: hidden; */
}
.title-cn{
  margin-bottom: 50px;

}

.navbar{
  height: 40px;
  overflow: hidden;
  line-height: 40px;
  text-align: center;
  box-shadow: 0 5px 5px 0 rgba(0,0,0,.02);
  background: #fff;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
.navbar ul li{
  display: inline-block;
  width: 100px;
  list-style: none;
  margin: 0;
  color: #505462;
  /* color: #2c3e50; */
  cursor: pointer;
  font-size: 13px;
}
.navbar ul li:hover a{
  color: #afb1b8;
}
.navbar ul li:hover{
  color: #afb1b8;
}
.navbar ul li a{
  color: #505462;
  display: block;
  text-decoration: none;
}
.copyright,.copyright a{
  font-size: 13px;
  color: #505462;
  text-decoration: none;
}
.copyright{
  margin-top: 100px;
  margin-left: 20px;
  position: relative;
}

@media only screen and (max-width: 460px){
  .reset{width: 100%;margin-left: 0;}
  .navbar{
    width: 100%;
    display: none;
    position: absolute;
    right: 0;
    top: 60px;
    z-index: 9;
  }
  .navbar li{
    float: none;
    margin: 0;
    border-bottom: 1px solid #eee;
    background: #fff !important;
    text-align: left;
    padding: 0 !important;
    height: 50px;
    line-height: 50px;
    font-size: 12px;
  }
  .intro-banner{
    width: auto;
  }
  .navbar-icon{
    display: block;
    float: right;
  }
  .intro-text{
    margin: 0;
    margin-bottom: 30px;
  }
  .intro-text div{
    font-size: 40px
  }
  .main-style{
    margin: 0;
  }
  .hr{
    margin: 20px 0;
  }
  .to-task-title{
    font-size: 24px;
  }
  .footlink{
    margin-right: 18px;
  }
}
@media only screen and (min-width:461px) and (max-width:920px){
}
@media only screen and (min-width:921px) and (max-width: 1020px){
}
</style>
