<template>
  <div class="fix-wrapper">
    <table cellpadding="1" cellspacing="1">
      <tr><th colspan="7">先锋渠道各银行限额</th></tr>
      <tr>
        <th>银行</th>
        <th>银行编码</th>
        <th>单笔最低限额</th>
        <th>单笔限额</th>
        <th>日累计限额</th>
        <th>月累计限额</th>
        <th>备注</th>
      </tr>

      <tr>
        <td>工商银行</td>
        <td>ICBC</td>
        <td>1元</td>
        <td>5万元</td>
        <td>5万元</td>
        <td>20万元</td>
        <td></td>
      </tr>
      <tr>
        <td>农业银行</td>
        <td>ABC</td>
        <td>—</td>
        <td>2万元</td>
        <td>2万元</td>
        <td>20万元</td>
        <td></td>
      </tr>
      <tr>
        <td>中国银行</td>
        <td>BOC</td>
        <td>—</td>
        <td>5万元</td>
        <td>10万元</td>
        <td>20万元</td>
        <td>柜面、网银开通无卡支付业务</td>
      </tr>
      <tr>
        <td>建设银行</td>
        <td>CCB</td>
        <td>3元</td>
        <td>10万元</td>
        <td>10万元</td>
        <td>20万元</td>
        <td></td>
      </tr>
      <tr>
        <td>交通银行</td>
        <td>BOCOM</td>
        <td>—</td>
        <td>1万元</td>
        <td>1万元</td>
        <td>20万元</td>
        <td></td>
      </tr>
      <tr>
        <td>民生银行</td>
        <td>CMBC</td>
        <td>—</td>
        <td>1000元</td>
        <td>5万元</td>
        <td>20万元</td>
        <td>维护中</td>
      </tr>
      <tr>
        <td>兴业银行</td>
        <td>CIB</td>
        <td>—</td>
        <td>10万元</td>
        <td>10万元</td>
        <td>20万元</td>
        <td>柜面、网银开通无卡支付业务</td>
      </tr>
      <tr>
        <td>光大银行</td>
        <td>CEB</td>
        <td>—</td>
        <td>5万元</td>
        <td>5万元</td>
        <td>20万元</td>
        <td></td>
      </tr>
      <tr>
        <td>平安银行</td>
        <td>PAB</td>
        <td>—</td>
        <td>5万元</td>
        <td>5万元</td>
        <td>20万元</td>
        <td></td>
      </tr>
      <tr>
        <td>中信银行</td>
        <td>CNCB</td>
        <td>3元</td>
        <td>5000元</td>
        <td>5000元</td>
        <td>1万元</td>
        <td></td>
      </tr>
      <tr>
        <td>北京银行</td>
        <td>BCCB</td>
        <td>—</td>
        <td>5000元</td>
        <td>5000元</td>
        <td>20万元</td>
        <td>柜面、电话银行、网银方式开通无卡支付功能</td>
      </tr>
      <tr>
        <td>广发银行</td>
        <td>GDB</td>
        <td>—</td>
        <td>10万元</td>
        <td>10万元</td>
        <td>20万元</td>
        <td></td>
      </tr>
      <tr>
        <td rowspan="2">招商银行</td>
        <td rowspan="2">CMB</td>
        <td rowspan="2">3元</td>
        <td>1000元</td>
        <td>单日限额≤5000元时，</td>
        <td>20万元</td>
        <td rowspan="2">维护中</td>
      </tr>
      <tr>
        <td>1000元</td>
        <td>单日限额>5000元时，单日最高5万元</td>
        <td>单月最高5万元	</td>
      </tr>
      <tr>
        <td>邮储银行</td>
        <td>PSBC</td>
        <td>3元</td>
        <td>5000元</td>
        <td>5000元</td>
        <td>20万元
        <td>柜面、网银开通无卡支付业务</td>
      </tr>
      <tr>
        <td>浦发银行</td>
        <td>SPDB</td>
        <td>3元</td>
        <td>5万元</td>
        <td>5万元</td>
        <td>20万元</td>
        <td>柜面、网银开通无卡支付业务</td>
      </tr>
      <tr>
        <td>华夏银行</td>
        <td>HXB</td>
        <td>—</td>
        <td>1000元</td>
        <td>2000元</td>
        <td>20万元</td>
        <td>维护中</td>
      </tr>
      <tr>
        <td>上海银行</td>
        <td>BOS</td>
        <td>—</td>
        <td>5000元</td>
        <td>5万元</td>
        <td>20万元</td>
        <td></td>
      </tr>
    </table>
  </div>
</template>
<style scoped>
  .fix-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
  } 
  table {
    margin-left: auto;
    margin-right: auto;
    margin-top: 36px;
    border: solid #9e9e9e;
    border-width:1px 0px 0px 1px;
    width: 85%;
  }

  table tr {
    height: 36px;
  }

  table tr th {
    border:solid #9e9e9e;
    border-width:0px 1px 1px 0px;
  }

  table tr td{
    border:solid #9e9e9e;
    border-width:0px 1px 1px 0px;
    padding: 0px 20px;
    text-align: center;
  }
</style>
