window.addEventListener('DOMContentLoaded', function () {
    // 스크롤 이벤트 처리
    window.addEventListener("scroll", function (event) {
        if (document.querySelector('.progressbar') != null) setProgress();
    });
});

function setProgress() {
    let currY = document.documentElement.scrollTop; // 스크롤한 높이
    let totalY = document.documentElement.scrollHeight - document.documentElement.clientHeight; // 전체 높이
    let percentage = (currY / totalY) * 100; // 퍼센트 값
    document.querySelector(".progress").style.width = percentage + "%"; // 프로그래스바 너비 변경
};

$(function () {
    areaSelectMaker("select[name=addressRegion]");
});

var areaSelectMaker = function (target) {
    if (target == null || $(target).length == 0) {
        console.warn("Unkwon Area Tag");
        return;
    }
//지역설정
    var area = {
        "수도권": {
            "서울특별시": ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
            "경기도": ["수원시 장안구", "수원시 권선구", "수원시 팔달구", "수원시 영통구", "성남시 수정구", "성남시 중원구", "성남시 분당구", "의정부시", "안양시 만안구", "안양시 동안구", "부천시", "광명시", "평택시", "동두천시", "안산시 상록구", "안산시 단원구", "고양시 덕양구", "고양시 일산동구",
                "고양시 일산서구", "과천시", "구리시", "남양주시", "오산시", "시흥시", "군포시", "의왕시", "하남시", "용인시 처인구", "용인시 기흥구", "용인시 수지구", "파주시", "이천시", "안성시", "김포시", "화성시", "광주시", "양주시", "포천시", "여주시", "연천군", "가평군",
                "양평군"],
            "인천광역시": ["계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군"]
        },
        "강원권": {
            "강원도": ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군"]
        },
        "충청권": {
            "충청북도": ["청주시 상당구", "청주시 서원구", "청주시 흥덕구", "청주시 청원구", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", "괴산군", "음성군", "단양군"],
            "충청남도": ["천안시 동남구", "천안시 서북구", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"],
            "대전광역시": ["대덕구", "동구", "서구", "유성구", "중구"],
            "세종특별자치시": ["세종특별자치시"]
        },
        "전라권": {
            "전라북도": ["전주시 완산구", "전주시 덕진구", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"],
            "전라남도": ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"],
            "광주광역시": ["광산구", "남구", "동구", "북구", "서구"]
        },
        "경상권": {
            "경상북도": ["포항시 남구", "포항시 북구", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군"],
            "경상남도": ["창원시 의창구", "창원시 성산구", "창원시 마산합포구", "창원시 마산회원구", "창원시 진해구", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군"],
            "부산광역시": ["강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구", "기장군"],
            "대구광역시": ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"],
            "울산광역시": ["남구", "동구", "북구", "중구", "울주군"]
        },
        "제주권": {
            "제주특별자치도": ["서귀포시", "제주시"]
        }
    };

    for (i = 0; i < $(target).length; i++) {
        (function (z) {
            var a1 = $(target).eq(z);
            var a2 = a1.next();
            var a3 = a2.next();

            //초기화
            init(a1, true);

            //권역 기본 생성
            var areaKeys1 = Object.keys(area);
            areaKeys1.forEach(function (Region) {
                a1.append("<option value=" + Region + ">" + Region + "</option>");
            });

            //변경 이벤트
            $(a1).on("change", function () {
                init($(this), false);
                var Region = $(this).val();
                var keys = Object.keys(area[Region]);
                keys.forEach(function (Do) {
                    a2.append("<option value=" + Do + ">" + Do + "</option>");
                });
            });

            $(a2).on("change", function () {
                a3.empty().append("<option value=''>선택</option>");
                var Region = a1.val();
                var Do = $(this).val();
                var keys = Object.keys(area[Region][Do]);
                keys.forEach(function (SiGunGu) {
                    a3.append("<option value=" + area[Region][Do][SiGunGu] + ">" + area[Region][Do][SiGunGu] + "</option>");
                });
            });
        })(i);

        function init(t, first) {
            first ? t.empty().append("<option value=''>선택</option>") : "";
            t.next().empty().append("<option value=''>선택</option>");
            t.next().next().empty().append("<option value=''>선택</option>");
        }
    }
}
// 모델설정
$(document).ready(function () {
    modelSelect('ALL');
    $('.tab-type li a').on('click', function (e) {
        e.preventDefault();
        $(this).closest('li').addClass('active').siblings('li').removeClass('active');
    });


    $('.cb').on('click', function (e) {
        var target = window[this.htmlFor];
        target.checked = !target.checked;
        e.preventDefault();
    });

    $('.ob').on('click', function (e) {
        var target = window[this.htmlFor];
        target.checked = !target.checked;
        e.preventDefault();
    });

    $("#firstModel").trigger("click");

});

var delCarImages = function () {
    const parent = document.querySelector('.slick-track');
    parent.innerHTML = "";
}


var modelSelect = function (target) {
    console.log(target);
    // 현재 있는 요소 모두 삭제
    delCarImages();

    var carModel = {
        "ALL": ["jetta", "arteon", "touareg", "tiguan", "tiguanAllspace", "golfGTI", "golf", "ID4"],
        "Sedan": ["jetta", "arteon"],
        "SUV": ["touareg", "tiguan", "tiguanAllspace"],
        "Hatchback": ["golfGTI", "golf"],
        "EV": ["ID4", "tiguanAllspace"]
    }

    let condition = `carModel.${target}.length`;
    let inde = `carModel.${target}`;
    for (i = 0; i < eval(condition); i++) {
        $(".slick-track").append(`<div class='del'  id=` + "'" + eval(inde)[i] + "'" + `  onClick=imgClick(` + "'" + eval(inde)[i] + "'" + `)> ` + "<img src='img/" + eval(inde)[i] + ".jpg'" + ">" + "</div>");
    }
}


//이미지 클릭 메소드
function imgClick(imgName) {
    console.log("클릭", imgName);
    notTargetImg = document.getElementsByClassName("del");
    for (i = 0; i < notTargetImg.length; i++) {
        iid = notTargetImg[i].id;
        nontargetID = document.getElementById(iid);
        nontargetID.style.border = "0px";
    }
    targetImg = document.getElementById(imgName);
    targetImg.style.border = "3px solid black";
};

//  슬라이드
let isDown = false;
let startX;
let scrollLeft;
const slider = document.querySelector('.slick-track');

const end = () => {
    isDown = false;
    slider.classList.remove('active');
};

const start = (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
};

const move = (e) => {
    if (!isDown) return;

    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    const dist = (x - startX);
    slider.scrollLeft = scrollLeft - dist;
};

(function() {
    slider.addEventListener('mousedown', start);
    slider.addEventListener('mousemove', move);
    slider.addEventListener('mouseleave', end);
    slider.addEventListener('mouseup', end);
})();
//  슬라이드 끝


// $(document).ready(function () {
    $('#datepicker').datepicker({
        dateFormat: 'yy.mm.dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '.',
        minDate: "+2D",
        beforeShow: function (input, inst) {
            var offset = $(input).offset();
            var height = $(input).height();
            window.setTimeout(function () {
                $(inst.dpDiv).css({top: (offset.top + height) + 'px', left: offset.left + 'px'})
            }, 1);
        }
    });
    /* agree check */ // 동의 왜 안됨? 클릭
    $('.all-gree .chk-box').on('click', function () {
        var state = $(this).find('input').is(':checked');
        var agreeBox = $('.form-type2 .input-default .radio-box-type2:first-child input');
        if (state) {
            agreeBox.prop('checked', true);
        } else {
            agreeBox.prop('checked', false);
        }
    });

    var disAgreeBox = $('.form-type2 .input-default .radio-box-type2:last-child input');
    disAgreeBox.on('click', function () {
        $('.all-gree .chk-box').find('input').prop('checked', false);
    });

// });


var filter = "win16|win32|win64|mac|macintel";
var trackingCodeTitle = "";

$("[data-numonly='true']").on("keyup", function () {
    var re = /[^0-9]/g;
    var temp = $(this).val();
    if (re.test(temp)) {
        $(this).val(temp.replace(re, ""));
    }
});


var isFirstParam = "N";

if ('' != "" && '' != "" && '' != "" && '' != "") {
    isFirstParam = "Y";
}

var isFirstShowroomParam = "N";
if ('' != '' && '' != '' && '' != '') {
    $("#sido").val('').prop("selected", true);
    getGugun();
}
var sync_sumbit = "N";

function sendTestDrive() {

    if (sync_sumbit == "N") {
        var reqUrl = "https://cms.vwk.co.kr/new_app/driving_reg.jsp";

        if ($("#interCar").val().isBlank()) {
            alert("모델을 선택해 주세요 ");
            return;
        }

        if ($("#interColor").val().isBlank()) {
            alert("색상을 선택해 주세요 ");
            return;
        }

        if ($('#name').val().isBlank()) {
            alert("이름을 입력해주세요.");
            $('#name').focus();
            return;
        }

        if ($('#birth option:selected').val().isBlank()) {
            alert("출생년도를 입력해주세요.");
            $('#sido').focus();
            return;
        }

        if ($('#birth').val().isBlank()) {
            alert("출생년도을 입력해주세요.");
            $('#birth').focus();
            return;
        }

        if ($('#phone').val().isBlank()) {
            alert("연락처를 입력해주세요.");
            $('#phone').focus();
            return;
        }

        if ($("#smsAuthYn").val() != 'Y') {
            alert("인증번호를 입력해주세요.");
            $('#authNo').focus();
            return;
        }

        if ($('#sido option:selected').val().isBlank()) {
            alert("지역을 입력해주세요.");
            $('#sido').focus();
            return;
        }
        if ($('#gugun option:selected').val().isBlank()) {
            alert("시/군/구를 입력해주세요.");
            $('#gugun').focus();
            return;
        }
        if ($('#net option:selected').val().isBlank()) {
            alert("전시장을 입력해주세요.");
            $('#net').focus();
            return;
        }

        if ($(":input:radio[name=purtime]:checked").val().isBlank()) {
            alert("구매시기를 선택해주세요.");
            $('#purtime').focus();
            return;
        }

        if ($('#hopedate').val().isBlank()) {
            alert("시승 희망일을 선택해주세요.");
            $('#purtime').focus();
            return;
        }

        if ($(":input:radio[name=policy_check0]:checked").val() != "Y") {
            alert("개인정보 수집 및 이용동의를 선택해주세요.");
            $('#policy_check0').focus();
            return;
        }

        if ($(":input:radio[name=policy_check1]:checked").val() != "Y") {
            alert("개인정보 제3자 제공 동의를 선택해주세요.");
            $('#policy_check1').focus();
            return;
        }


        var params = $("#f").serialize();
        sync_sumbit = "Y";
        gtag_report_conversion();

        $.ajax({
            url: reqUrl,
            dataType: 'jsonp',
            data: params,
            jsonpCallback: "callback",
            success: function (data) {
                console.log('성공 - ', data);
                if (true) {
                    var tag_car_name = "";
                    var tag_car_code = "";
                    var agent_val = "PC";
                    var tag_car_text = ""
                    var agent = navigator.userAgent.toLowerCase();
                    if (agent.indexOf("iphone") != -1 || agent.indexOf("android") != -1) {
                        agent_val = "MO"
                    }

                    var car_model_name = "";
                    if ($('#interName').val().toLowerCase() == "t-roc") {
                        car_model_name = "티록";
                    } else if ($('#interName').val().toLowerCase() == "jetta") {
                        car_model_name = "제타";
                    } else if ($('#interName').val().toLowerCase() == "new tiguan") {
                        car_model_name = "티구안";
                    } else if ($('#interName').val().toLowerCase() == "passat gt") {
                        car_model_name = "파사트GT";
                    } else if ($('#interName').val().toLowerCase() == "touareg") {
                        car_model_name = "투아렉";
                    } else if ($('#interName').val().toLowerCase() == "arteon") {
                        car_model_name = "아테온";
                    } else if ($('#interName').val().toLowerCase() == "tiguan allspace") {
                        car_model_name = "티구안올스페이스";
                    } else if ($('#interName').val().toLowerCase() == "id.4") {
                        car_model_name = "ID.4";
                    }


                    //tag_car_name="_시승상담신청_신청완료";
                    tag_car_name = "_서스테인_신청완료";
                    tag_car_code = "2OPAP8NG005D";
                    tag_car_text = agent_val + "_" + car_model_name + tag_car_name;
                    icast(tag_car_code, 'track', {'pagename': tag_car_text}); //페이지 로드
                }
                sync_sumbit = "N";
                try {
                    kakaoPixel('2511606768431087975').participation('DrivingTest');
                } catch (err) {
                    console.log("kakaoPixel Error: " + err.message);
                }

                fbq('track', 'SubmitApplication');
                if (navigator.platform) {
                    if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
                        trackingCodeTitle = "MB";
                    } else {
                        trackingCodeTitle = "PC";
                    }

                    if ($("#interName").val().toLowerCase() == 'tiguan') {
                        trackingCodeTitle += "티구안";
                        icast('2NH8E32G00CA', 'track', {'pagename': 'B8_' + trackingCodeTitle + '_시승신청완료'});
                    } else if ($("#interName").val().toLowerCase() == 'touareg') {
                        trackingCodeTitle += "투아렉";
                        icast('2NH8E32G00CA', 'track', {'pagename': 'B7_' + trackingCodeTitle + '_시승신청완료'});
                    }
                }
                gtag_report_conversion("/app/local/testdrive/completed?" + params + "&carImg=" + $("#carImg").attr("src"));
                //location.href = "/app/local/testdrive/completed?"+params+"&carImg="+$("#carImg").attr("src");
            },
            error: function (xhr) {
                sync_sumbit = "N";
                console.log('실패 - ', xhr);
            }
        });
        VWBasic_FormCTA_Click();
    } else {
        alert("시승신청 진행 중입니다 잠시만 기다려주세요.");
    }


}


/* 2020-01-09 check */
$('.all-check').on('click', function () {
    var state = $(this).is(':checked');
    if (state) {
        $('.agree').prop('checked', true);
    } else {
        $('.agree').prop('checked', false);
    }
});
$('.disagree').on('click', function () {
    $('.all-check').prop('checked', false);
})


$('.reqdrive').on('click', function () {
    $('#hopeDateTr').show();
    $('#consultingTr').hide();
})
$('.reqconsult').on('click', function () {
    $('#hopeDateTr').hide();
    $('#consultingTr').show();
})


// 스크롤 감지

let preScrollTop = 0;

window.addEventListener('scroll',() => {
    let ScrollTop = window.scrollY;

    if(ScrollTop > 0){
        document.querySelector('.main_header_background').style.backgroundColor = 'black';
        document.querySelector('.main_header_background').style.opacity = '.7';
    } else {
        document.querySelector('.main_header_background').style.backgroundColor = 'transparent';
    }
});


const user = JSON.parse(window.localStorage.getItem('user'));
if(user !== null && user !== undefined) {
    document.querySelector('.main_list_not_user_logo').style.display = 'none';
    document.querySelector('.main_list_drop_down_login').style.display = 'none';
    document.querySelector('.main_list_drop_down_signup').style.display = 'none';
  } else {
    document.querySelector('.main_list_user_logo').style.display = 'none';
    document.querySelector('.main_list_drop_down_myCar').style.display = 'none';
    document.querySelector('.main_list_drop_down_logout').style.display = 'none';
  }


