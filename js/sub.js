$(function(){
    /* selectbox */
    $(".custom-select").selectric();

    /* datepicker */
    $(".datepicker").datepicker({
        dateFormat: 'yy-mm-dd' //Input Display Format 변경
        ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
        ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
        ,buttonImage: "../../img/icn_form_calendar.svg" //버튼 이미지 경로
        ,yearSuffix: "." //달력의 년도 부분 뒤에 붙는 텍스트
        ,monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'] //달력의 월 부분 Tooltip 텍스트
        ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
        // ,changeYear: true //콤보박스에서 년 선택 가능
        // ,changeMonth: true //콤보박스에서 월 선택 가능                
        // ,buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
        // ,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
        // ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
        // ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
        // ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
        // ,minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        // ,maxDate: "+1M" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
        ,onSelect: function(dateText) {
            if( inputClearHandler.isSetClear && (this.value != undefined && this.value != "") ){
                const btn = this.parentNode.querySelector(".clear-btn");
                inputClearHandler.addClearBtn(btn);
            }
        }
    })

    // input clear button 생성
    inputClearHandler.init();
    
    
    /* 스크롤 이벤트 */
    
    $(window).scroll(function(){
        var initheight = 96;
        var st = $(window).scrollTop();
        var ht = $(window).height();
        var bh = $("#contents").height() + initheight;
        //var poz = 30;
        var scrollable = bh - ht;
        var prog = (st / scrollable) * 100;
        
        
        
        console.log(scrollable);
        
        if(prog >= 100) prog = 100;
        $(".prog .bar").css({width:prog+"%"});
    });
})

// input clear button
const inputClearHandler = {
    isSetClear: false
    , inputList: null
    , hasClearBtnList: ["text", "password", "number"]

    , init: function(){
        this.isSetClear = true;
        this.inputList = document.querySelectorAll("input");
        const _this = this;

        for(let i=0; i<this.inputList.length; i++){
            const item = this.inputList[i];
            const type = item.getAttribute("type");
            if( this.hasClearBtnList.indexOf( type ) > -1 && !item.readOnly && !item.disabled ){
                // datepicker 별도 처리
                if( item.classList.contains("datepicker") ){
                    const btn = item.parentNode.appendChild(_this.createClearTag());
                    if(item.value != undefined && item.value != ""){
                        _this.addClearBtn(btn);
                    }
                }else{
                    // span태그로 감싸고 그 안에 .clear-btn 생성
                    let span = document.createElement("span");
                    span.setAttribute("class", "clear-btn-con");
                    span.innerHTML = item.outerHTML + _this.createClearTag().outerHTML;
                    item.parentNode.insertBefore(span, item);
                    item.parentNode.removeChild(item);
        
                    const newItem = span.querySelector("input");
                    const btn = span.querySelector(".clear-btn");
        
                    if(newItem.value != undefined && newItem.value != ""){
                        _this.addClearBtn(btn);
                    }
        
                    newItem.addEventListener("keyup", function(){
                        if(newItem.value != undefined && newItem.value != ""){
                            _this.addClearBtn(btn);
                        }
                    })
                }
            }
        }
    }

    , createClearTag: function(){
        const span = document.createElement("span");
        span.setAttribute("class", "clear-btn");
        return span;
    }

    , addClearBtn: function(btn){
        btn.style.display = "inline-block";
        btn.addEventListener("click", function(){
            const input = this.parentNode.querySelector("input");
            input.value = "";
            input.focus();
            btn.style.display = "none";
        });
    }
}