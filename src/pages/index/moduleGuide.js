
export default {
  moduleGuide(item)  {
    switch (item.type) {
      case '10000':
        return "/all";
        break; /*全部*/
      case '4':
        window.sessionStorage['queTab'] = null;
        window.sessionStorage['currentFilterId'] = null
        self.props.history.push("/questionAnswerCenter");
        break; /*问答中心*/
      case '3' :
        let parms = item.isShowNew ? `/news/${item.appModuleId}&${item.isShowNew}` : `/news/${item.appModuleId}`
        window.sessionStorage['newTab'] = null
        self.props.history.push({pathname: parms});
        break; /*最新动态*/
      case '20' :
        window.sessionStorage['TaskIndexPage'] = null
        self.props.history.push({pathname: `/businnessSchool/${item.appModuleId}`});
        break; /*商学院*/
      case '1' :
        self.props.history.push("/checkin");
        break; /*签到*/
      case '11' :
        window.sessionStorage['communitylist'] = null;
        self.props.history.push("/communitylist");
        break; /*互动社区*/
      case '10' :
        appStore.exchangeFlag = true;
        sessionStorage.eff = null;
        sessionStorage.inv = null;
        appStore.allFlag = false;
        appStore.dateFlag = "priceUp";
        appStore.exchangeStatus = 'effective';
        self.props.history.push("/exchangelist");
        break; /*金币兑换*/
      case '100' :
        self.props.history.push("/coindetail");
        break; /*金币明细*/
      case '104' :
        sessionStorage.pkStatus = null;
        sessionStorage.rankdetails = null;
        sessionStorage.rankinteraction = null;
        sessionStorage.myreport = null;
        sessionStorage.reporthistory = null;
        self.props.history.push("/pk");
        break; /*PK模块*/
      case '109' :
        self.props.history.push("/onlineexamlist");
        break; /*在线考试模块*/
      case '99' :
        sessionStorage.tabIndex = null;
        self.props.history.push("/growthPath/null");
        break; /*成长路径*/
      case '22' :
        self.props.history.push("/testmodule");
        break; /*测试模块*/
      default :
        Taro.showToast({title: '暂未发布', icon: 'none',});
    }
  }
}
