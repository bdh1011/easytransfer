var exchange_data=0
var currency_source='CNY'
var currency_target='KRW'
var curreycy_source_amount=0
var curreycy_target_amount=0
var fee=0
var exchange_url_front="http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22";var exchange_url_back="%22)&format=json&env=store://datatables.org/alltableswithkeys&callback=";$(document).ready(function(){function updateExchange(){currency_source_amount=$('#sourceAmount').val();var exchange_result=$('#sourceAmount').val()*parseFloat(exchange_data['query']['results']['rate']['Rate'])
currency_target_amount=exchange_result;$('#targetAmount').val(exchange_result.toFixed(2))
fee=$('#sourceAmount').val()*0.005
$('#fee').text(fee)
console.log(fee)
$('#ask_rate').text(parseFloat(exchange_data['query']['results']['rate']['Bid']))
$('#saving').text(((1/parseFloat(exchange_data['query']['results']['rate']['Rate']))*parseInt($('#sourceAmount').val()*(parseFloat(exchange_data['query']['results']['rate']['Rate'])-parseFloat(exchange_data['query']['results']['rate']['Bid'])))-fee).toFixed(7));}
function updateRate(){if(currency_source=='KRW'&&currency_target=='CNY'){$.ajax({type:"GET",url:exchange_url_front+'CNY'+'KRW'+exchange_url_back,success:function(data){exchange_data=data;console.log(exchange_data['query']['results']['rate']);exchange_data['query']['results']['rate']['Bid']=((1.0000/exchange_data['query']['results']['rate']['Ask'])*0.93).toFixed(7);exchange_data['query']['results']['rate']['Rate']=(1.0000/exchange_data['query']['results']['rate']['Rate']).toFixed(7);updateExchange();},failure:function(errMsg){alert("a");}});}
else{$.ajax({type:"GET",url:exchange_url_front+currency_source+currency_target+exchange_url_back,success:function(data){exchange_data=data
exchange_data['query']['results']['rate']['Bid']=(0.93*exchange_data['query']['results']['rate']['Bid']).toFixed(7);console.log(currency_source+','+currency_target);console.log(data);updateExchange();},failure:function(errMsg){alert("a");}});}}
$('#sourceAmount').keyup(function(){updateExchange();})
updateRate();$(document).on("click",'.CNY .select_currency',function(){console.log('select KRW');$(this).parent().addClass('KRW');$(this).parent().children('.flag').children('img')[0].src='../../static/img/flag_south_korea.jpg'
$(this).parent().children('.country_label')[0].innerHTML="KRW"
$(this).parent().removeClass('CNY');if($(this).parent().parent().hasClass('exchange_from_row')){currency_source='KRW'
console.log('source krw');}
else{currency_target='KRW';console.log('target krw');}
updateRate();})
$(document).on("click",'.KRW .select_currency',function(){$(this).parent().addClass('CNY');$(this).parent().children('.flag').children('img')[0].src='../../static/img/flag_china.png'
$(this).parent().children('.country_label')[0].innerHTML="CNY"
$(this).parent().removeClass('KRW');if($(this).parent().parent().hasClass('exchange_from_row')){currency_source='CNY';console.log('source cny');}
else{currency_target='CNY'
console.log('target cny');}
updateRate();})
var source_is_active=false;$(document).on("click",'.CNY',function()
{console.log($(this))
if(source_is_active==false){var currency_select='<div class="select_currency"><div class="flag"><img src="../../static/img/flag_south_korea.jpg"></div><div class="country_label">KRW</div</div>'
$(this).append(currency_select);source_is_active=true;}
else{console.log('remove')
exchange_data=$(this)
$(this).children(".select_currency").remove();source_is_active=false;}});var target_is_active=false;$(document).on("click",'.KRW',function()
{if(source_is_active==false){console.log('add');var currency_select='<div class="select_currency"><div class="flag"><img src="../../static/img/flag_china.png"></div><div class="country_label">CNY</div</div>'
$(this).append(currency_select);source_is_active=true;}
else{console.log('remove')
exchange_data=$(this)
$(this).children(".select_currency").remove();source_is_active=false;}});$(document).on("click",'.send_money',function()
{var pathname=window.location.pathname;var send_info={"currency_source":currency_source,"currency_source_amount":currency_source_amount,"currency_target":currency_target,"currency_target_amount":currency_target_amount};$.ajax({type:"POST",url:'/authenticated/send_money',data:JSON.stringify({"send_info":send_info}),contentType:"application/json; charset=utf-8",dataType:"json",success:function(data){window.location.href='/authenticated/account';},failure:function(errMsg){;}});});});