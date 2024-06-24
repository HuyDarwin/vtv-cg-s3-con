import { getDatabase, ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

$(function () {
	"use strict";

	window.VTVCGV = window.VTVCGV || {};

	(function (con) {
		const db = getDatabase();
		onValue(ref(db), (snapshot) => {
			const data = snapshot.val();		
			// Variables update
			
			$('#timer').html(data.timer);
			$('#q_text td').html(data.question);
			if(data.round != 4){
				$('#answer').html(data.answer);
			}
			$('#player_input').html(data.input);
			
			if(data.player_1_last_name != null){
				$('#sbn1').html(data.player_1_last_name.toUpperCase());
			}
			if(data.player_2_last_name != null){
				$('#sbn2').html(data.player_2_last_name.toUpperCase());
			}
			if(data.player_3_last_name != null){
				$('#sbn3').html(data.player_3_last_name.toUpperCase());
			}
			if(data.player_4_last_name != null){
				$('#sbn4').html(data.player_4_last_name.toUpperCase());
			}
			$('#sbs1').html(data.player_1_score);
			$('#sbs2').html(data.player_2_score);
			$('#sbs3').html(data.player_3_score);
			$('#sbs4').html(data.player_4_score);
			
			// Graphics
			
			if (data.hinhhieu == 1){
				con.AnHetVideo();
				//$('#intro').css('opacity',1);
				//$('#intro').trigger('play');
				update(ref(db), { hinhhieu : 0 });
			}
			if (data.modau == 1){
				$('#intro').animate({opacity: 0}, 500);
				update(ref(db), { modau : 0 });
			}
			if (data.giailao == 1){
				con.AnHetVideo();
				$('#comm').css('opacity',1);
				$('#comm').trigger('play');
				setTimeout(function(){
					$('#comm').css('opacity',0);
				}, 10000)
				update(ref(db), { giailao : 0 });
			}
			
			if (data.hindc == 1){
				$('#question-1-input').css('opacity',1);
				$('#question-1-input').trigger('play');
				setTimeout(function(){
					$('#player_input').css('opacity',1);
				}, 750)
				update(ref(db), { hindc : 0 });
			}
			if (data.aindc == 1){
				$('#question-1-input, #player_input').animate({ opacity: 0 }, 0)
				update(ref(db), { aindc : 0 });
			}
			
			if (data.rc1_obj1 == 1){
				con.AnHetVideo();
				//$('#rt1').css('opacity',1);
				//$('#rt1').trigger('play');
				update(ref(db), { rc1_obj1 : 0 });
			}
			if (data.rc1_obj2 == 1){
				$('#rt1').animate({opacity: 0}, 0);
				update(ref(db), { rc1_obj2 : 0 });
			}
			if (data.rc1_obj8 == 1){
				$('#timer').css('opacity', 1);
				$('#tiebreak_text').css('opacity', 0);
				con.HienCauHoi();
				update(ref(db), { rc1_obj8 : 0 });
			}
			if (data.rc1_obj10 == 1){
				$('#answer').animate({ opacity: 1 }, 125)
				update(ref(db), { rc1_obj10 : 0 });
			}
			if (data.rc1_obj9 == 1){
				con.AnCauHoi();
				$('#question-1-input').animate({ opacity: 0 }, 0)
				update(ref(db), { rc1_obj9 : 0 });
			}
			if (data.question_changing == 1){
				$('#q_text, #answer').animate({ opacity: 0}, 125)
				
				/*var size1 = 2.1 * window.innerWidth / 100;
				$('#q_text').css('font-size', size1 + 'px');
				var size2 = 1.2 * window.innerWidth / 100;
				$('#q_text').css('line-height', size2 + 'px');
				console.log($('#q_text td').css('height'));
				size1 -= 0.1;
				$('#q_text').css('font-size', size1 + 'px');
				size2 -= 0.06;
				$('#q_text').css('line-height', size2 + 'px');
				console.log($('#q_text td').css('height'));
				while ((parseInt($('#q_text td').css('height')) / parseInt(($('#q_text td').css('line-height')))) >= 2){
					setTimeout(function(){
						size1 -= 0.1;
						$('#q_text').css('font-size', size1 + 'px');
						size2 -= 0.06;
						$('#q_text').css('line-height', size2 + 'px');
						(parseInt($('#q_text td').css('height')) / parseInt(($('#q_text td').css('line-height'))))
					}, 3000);
				}*/
			
				setTimeout(function(){
					$('#q_text').animate({ opacity: 1}, 125)
				}, 250)
				update(ref(db), { question_changing : 0 });
			}
				
			if(data.question.length > 129){
				var qla = data.question.length - 129;
				var qlb = qla * (0.026 - qla * 0.00018);
				var qlc = 2.1 - qlb;
				var qld = String(qlc) + "vw";
				var qle = 2.2 - (2.7 - 2) / (2.6 - 1.6) * qlb;
				var qlf = String(qle) + "vw";
				$("#q_text").css({"font-size": qld, "line-height": qlf});
			}
			else{
				$("#q_text").css({"font-size": "2.1vw", "line-height": "2.3vw"});
			}
				
			if (data.hbtkd == 1){
				con.AnHetVideo();
				if(data.round == 1){
					$('#scoreboard-1').css('opacity',1).trigger('play');
					$('#nas1').css('left', '16.2vw');
					$('#nas2').css('left', '35.8vw');
					$('#nas3').css('left', '55.4vw');
					$('#nas4').css('left', '75vw');
				}
				else if(data.round == 2){
					$('#scoreboard-2').css('opacity',1).trigger('play');
					if(data.is_player_1_eliminated == 1){
						$('#nas2').css('left', '16.2vw');
						$('#nas3').css('left', '35.8vw');
						$('#nas4').css('left', '55.4vw');
						$('#nas1').css('left', '75vw');
					}
					if(data.is_player_2_eliminated == 1){
						$('#nas1').css('left', '16.2vw');
						$('#nas3').css('left', '35.8vw');
						$('#nas4').css('left', '55.4vw');
						$('#nas2').css('left', '75vw');
					}
					if(data.is_player_3_eliminated == 1){
						$('#nas1').css('left', '16.2vw');
						$('#nas2').css('left', '35.8vw');
						$('#nas4').css('left', '55.4vw');
						$('#nas3').css('left', '75vw');
					}
					if(data.is_player_4_eliminated == 1){
						$('#nas1').css('left', '16.2vw');
						$('#nas2').css('left', '35.8vw');
						$('#nas3').css('left', '55.4vw');
						$('#nas4').css('left', '75vw');
					}
				}
				setTimeout(function(){
					$('#round_s').css('opacity', 1);
					setTimeout(function(){
						$('.sbn').css('opacity', 1);
						if(data.is_player_1_eliminated == 1){
							$('#sbn1').css('opacity', 0);
						}
						if(data.is_player_2_eliminated == 1){
							$('#sbn2').css('opacity', 0);
						}
						if(data.is_player_3_eliminated == 1){
							$('#sbn3').css('opacity', 0);
						}
						if(data.is_player_4_eliminated == 1){
							$('#sbn4').css('opacity', 0);
						}
					}, 1300)
				}, 600)
				update(ref(db), { hbtkd : 0 });
			}
			if (data.hd1 == 1){
				$('#sbs1').css('opacity', 1);
				update(ref(db), { hd1 : 0 });
			}
			if (data.hd2 == 1){
				$('#sbs2').css('opacity', 1);
				update(ref(db), { hd2 : 0 });
			}
			if (data.hd3 == 1){
				$('#sbs3').css('opacity', 1);
				update(ref(db), { hd3 : 0 });
			}
			if (data.hd4 == 1){
				$('#sbs4').css('opacity', 1);
				update(ref(db), { hd4 : 0 });
			}
			if (data.abtkd == 1){
				$('#scoreboard-1, #scoreboard-2, #round_s, .sbn, .sbs').animate({opacity: 0}, 500);
				update(ref(db), { abtkd : 0 });
			}
			if (data.rc1_obj13 == 1){
				$('#timer').css('opacity', 0);
				$('#tiebreak_text').css('opacity', 1);
				con.HienCauHoi();
				update(ref(db), { rc1_obj13 : 0 });
			}
			if (data.rc1_obj14 == 1){
				update(ref(db), { rc1_obj14 : 0 });
			}
			
			if (data.rc2_obj1 == 1){
				con.AnHetVideo();
				//$('#rt2').css('opacity',1);
				//$('#rt2').trigger('play');
				update(ref(db), { rc2_obj1 : 0 });
			}
			if (data.rc2_obj2 == 1){
				$('#rt2').animate({opacity: 0}, 0);
				update(ref(db), { rc2_obj2 : 0 });
			}
			if (data.rc2_obj8 == 1){
				$('#timer').css('opacity', 1);
				$('#tiebreak_text').css('opacity', 0);
				con.HienCauHoi();
				update(ref(db), { rc2_obj8 : 0 });
			}
			if (data.rc2_obj9 == 1){
				con.AnCauHoi();
				update(ref(db), { rc2_obj9 : 0 });
			}
			if (data.rc2_obj13 == 1){
				$('#timer').css('opacity', 0);
				$('#tiebreak_text').css('opacity', 1);
				con.HienCauHoi();
				update(ref(db), { rc2_obj13 : 0 });
			}
			
			if (data.rc3_obj1 == 1){
				con.AnHetVideo();
				//$('#rt3').css('opacity',1);
				//$('#rt3').trigger('play');
				update(ref(db), { rc3_obj1 : 0 });
			}
			if (data.rc3_obj2 == 1){
				$('#rt3').animate({opacity: 0}, 0);
				update(ref(db), { rc3_obj2 : 0 });
			}
			if (data.rc3_obj3 == 1){
				$('#timer').css('opacity', 1);
				$('#tiebreak_text').css('opacity', 0);
				con.HienCauHoi();
				update(ref(db), { rc3_obj3 : 0 });
			}
			if (data.rc3_obj5 == 1){
				$('#answer').animate({ opacity: 1 }, 250)
				update(ref(db), { rc3_obj5 : 0 });
			}
			if (data.rc3_obj4 == 1){
				con.AnCauHoi();
				update(ref(db), { rc3_obj4 : 0 });
			}
			if (data.rc3_obj8 == 1){
				$('#timer').css('opacity', 0);
				$('#tiebreak_text').css('opacity', 1);
				con.HienCauHoi();
				update(ref(db), { rc3_obj8 : 0 });
			}
			
			if (data.rc4_obj1 == 1){
				con.AnHetVideo();
				//$('#rt4').css('opacity',1);
				//$('#rt4').trigger('play');
				update(ref(db), { rc4_obj1 : 0 });
			}
			if (data.rc4_obj2 == 1){
				$('#rt4').animate({opacity: 0}, 0);
				update(ref(db), { rc4_obj2 : 0 });
			}
			if (data.rc4_obj3 == 1){
				$('#qcc #timer').css('opacity', 1);
				$('#tiebreak_text').css('opacity', 0);
        con.LoadDoHoaVong4(data.played_questions + 4);
				con.HienCauHoi();
				update(ref(db), { rc4_obj3 : 0 });
			}
      /*
			if (data.rc4_obj6 == 1){
				$('#answer').html('Số từ được chấp nhận: ' + '0/' + (data.played_questions + 5)).animate({ opacity: 1 }, 250)
				update(ref(db), { rc4_obj6 : 0 });
			}
			if (data.rc4_obj7 == 1){
				var num;
				if(data.is_player_1_eliminated == false){
					num = data.player_1_score;
				}
				else if(data.is_player_2_eliminated == false){
					num = data.player_2_score;
				}
				else if(data.is_player_3_eliminated == false){
					num = data.player_3_score;
				}
				else if(data.is_player_4_eliminated == false){
					num = data.player_4_score;
				}
				$('#answer').html('Số từ được chấp nhận: ' + (num + 1) + '/' + (data.played_questions + 5))
				update(ref(db), { rc4_obj7 : 0 });
			}
			if (data.rc4_obj4 == 1){
				con.AnCauHoi();
				update(ref(db), { rc4_obj4 : 0 });
			}
			
			if (data.rc4_2_obj3 == 1){
				$('#timer').css('opacity', 1);
				$('#tiebreak_text').css('opacity', 0);
				con.HienCauHoi();
				update(ref(db), { rc4_2_obj3 : 0 });
			}
			if (data.rc4_2_obj6 == 1){
				var name;
				if(data.is_player_1_eliminated == false){
					name = data.player_1_last_name;
				}
				else if(data.is_player_2_eliminated == false){
					name = data.player_2_last_name;
				}
				else if(data.is_player_3_eliminated == false){
					name = data.player_3_last_name;
				}
				else if(data.is_player_4_eliminated == false){
					name = data.player_4_last_name;
				}
				$('#answer').html(name + ': 0' + '&nbsp '.repeat(10) + data.player_sn_last_name + ': 0').animate({ opacity: 1 }, 250)
				update(ref(db), { rc4_2_obj6 : 0 });
			}
			if (data.rc4_2_obj8 == 1){
				var name;
				if(data.is_player_1_eliminated == false){
					name = data.player_1_last_name;
				}
				else if(data.is_player_2_eliminated == false){
					name = data.player_2_last_name;
				}
				else if(data.is_player_3_eliminated == false){
					name = data.player_3_last_name;
				}
				else if(data.is_player_4_eliminated == false){
					name = data.player_4_last_name;
				}
				var num;
				if(data.is_player_1_eliminated == false){
					num = data.player_1_score;
				}
				else if(data.is_player_2_eliminated == false){
					num = data.player_2_score;
				}
				else if(data.is_player_3_eliminated == false){
					num = data.player_3_score;
				}
				else if(data.is_player_4_eliminated == false){
					num = data.player_4_score;
				}
				$('#answer').html(name + ': ' + (num+1) + '&nbsp '.repeat(10) + data.player_sn_last_name + ': ' + data.player_sn_score)
				update(ref(db), { rc4_2_obj8 : 0 });
			}
			if (data.rc4_2_obj9 == 1){
				var name;
				if(data.is_player_1_eliminated == false){
					name = data.player_1_last_name;
				}
				else if(data.is_player_2_eliminated == false){
					name = data.player_2_last_name;
				}
				else if(data.is_player_3_eliminated == false){
					name = data.player_3_last_name;
				}
				else if(data.is_player_4_eliminated == false){
					name = data.player_4_last_name;
				}
				var num;
				if(data.is_player_1_eliminated == false){
					num = data.player_1_score;
				}
				else if(data.is_player_2_eliminated == false){
					num = data.player_2_score;
				}
				else if(data.is_player_3_eliminated == false){
					num = data.player_3_score;
				}
				else if(data.is_player_4_eliminated == false){
					num = data.player_4_score;
				}
				$('#answer').html(name + ': ' + (num+2) + '&nbsp '.repeat(10) + data.player_sn_last_name + ': ' + data.player_sn_score)
				update(ref(db), { rc4_2_obj9 : 0 });
			}
			if (data.rc4_2_obj10 == 1){
				var name;
				if(data.is_player_1_eliminated == false){
					name = data.player_1_last_name;
				}
				else if(data.is_player_2_eliminated == false){
					name = data.player_2_last_name;
				}
				else if(data.is_player_3_eliminated == false){
					name = data.player_3_last_name;
				}
				else if(data.is_player_4_eliminated == false){
					name = data.player_4_last_name;
				}
				var num;
				if(data.is_player_1_eliminated == false){
					num = data.player_1_score;
				}
				else if(data.is_player_2_eliminated == false){
					num = data.player_2_score;
				}
				else if(data.is_player_3_eliminated == false){
					num = data.player_3_score;
				}
				else if(data.is_player_4_eliminated == false){
					num = data.player_4_score;
				}
				$('#answer').html(name + ': ' + (num+3) + '&nbsp '.repeat(10) + data.player_sn_last_name + ': ' + data.player_sn_score)
				update(ref(db), { rc4_2_obj10 : 0 });
			}
			if (data.rc4_2_obj11 == 1){
				var name;
				if(data.is_player_1_eliminated == false){
					name = data.player_1_last_name;
				}
				else if(data.is_player_2_eliminated == false){
					name = data.player_2_last_name;
				}
				else if(data.is_player_3_eliminated == false){
					name = data.player_3_last_name;
				}
				else if(data.is_player_4_eliminated == false){
					name = data.player_4_last_name;
				}
				var num;
				if(data.is_player_1_eliminated == false){
					num = data.player_1_score;
				}
				else if(data.is_player_2_eliminated == false){
					num = data.player_2_score;
				}
				else if(data.is_player_3_eliminated == false){
					num = data.player_3_score;
				}
				else if(data.is_player_4_eliminated == false){
					num = data.player_4_score;
				}
				$('#answer').html(name + ': ' + (num+4) + '&nbsp '.repeat(10) + data.player_sn_last_name + ': ' + data.player_sn_score)
				update(ref(db), { rc4_2_obj11 : 0 });
			}
			if (data.rc4_2_obj12 == 1){
				var name;
				if(data.is_player_1_eliminated == false){
					name = data.player_1_last_name;
				}
				else if(data.is_player_2_eliminated == false){
					name = data.player_2_last_name;
				}
				else if(data.is_player_3_eliminated == false){
					name = data.player_3_last_name;
				}
				else if(data.is_player_4_eliminated == false){
					name = data.player_4_last_name;
				}
				var num;
				if(data.is_player_1_eliminated == false){
					num = data.player_1_score;
				}
				else if(data.is_player_2_eliminated == false){
					num = data.player_2_score;
				}
				else if(data.is_player_3_eliminated == false){
					num = data.player_3_score;
				}
				else if(data.is_player_4_eliminated == false){
					num = data.player_4_score;
				}
				$('#answer').html(name + ': ' + (num+5) + '&nbsp '.repeat(10) + data.player_sn_last_name + ': ' + data.player_sn_score)
				update(ref(db), { rc4_2_obj12 : 0 });
			}
			if (data.rc4_2_obj15 == 1){
				var name;
				if(data.is_player_1_eliminated == false){
					name = data.player_1_last_name;
				}
				else if(data.is_player_2_eliminated == false){
					name = data.player_2_last_name;
				}
				else if(data.is_player_3_eliminated == false){
					name = data.player_3_last_name;
				}
				else if(data.is_player_4_eliminated == false){
					name = data.player_4_last_name;
				}
				var num;
				if(data.is_player_1_eliminated == false){
					num = data.player_1_score;
				}
				else if(data.is_player_2_eliminated == false){
					num = data.player_2_score;
				}
				else if(data.is_player_3_eliminated == false){
					num = data.player_3_score;
				}
				else if(data.is_player_4_eliminated == false){
					num = data.player_4_score;
				}
				$('#answer').html(name + ': ' + num + '&nbsp '.repeat(10) + data.player_sn_last_name + ': ' + (data.player_sn_score+1))
				update(ref(db), { rc4_2_obj15 : 0 });
			}
			if (data.rc4_2_obj16 == 1){
				var name;
				if(data.is_player_1_eliminated == false){
					name = data.player_1_last_name;
				}
				else if(data.is_player_2_eliminated == false){
					name = data.player_2_last_name;
				}
				else if(data.is_player_3_eliminated == false){
					name = data.player_3_last_name;
				}
				else if(data.is_player_4_eliminated == false){
					name = data.player_4_last_name;
				}
				var num;
				if(data.is_player_1_eliminated == false){
					num = data.player_1_score;
				}
				else if(data.is_player_2_eliminated == false){
					num = data.player_2_score;
				}
				else if(data.is_player_3_eliminated == false){
					num = data.player_3_score;
				}
				else if(data.is_player_4_eliminated == false){
					num = data.player_4_score;
				}
				$('#answer').html(name + ': ' + num + '&nbsp '.repeat(10) + data.player_sn_last_name + ': ' + (data.player_sn_score+2))
				update(ref(db), { rc4_2_obj16 : 0 });
			}
			if (data.rc4_2_obj17 == 1){
				var name;
				if(data.is_player_1_eliminated == false){
					name = data.player_1_last_name;
				}
				else if(data.is_player_2_eliminated == false){
					name = data.player_2_last_name;
				}
				else if(data.is_player_3_eliminated == false){
					name = data.player_3_last_name;
				}
				else if(data.is_player_4_eliminated == false){
					name = data.player_4_last_name;
				}
				var num;
				if(data.is_player_1_eliminated == false){
					num = data.player_1_score;
				}
				else if(data.is_player_2_eliminated == false){
					num = data.player_2_score;
				}
				else if(data.is_player_3_eliminated == false){
					num = data.player_3_score;
				}
				else if(data.is_player_4_eliminated == false){
					num = data.player_4_score;
				}
				$('#answer').html(name + ': ' + num + '&nbsp '.repeat(10) + data.player_sn_last_name + ': ' + (data.player_sn_score+3))
				update(ref(db), { rc4_2_obj17 : 0 });
			}
			if (data.rc4_2_obj18 == 1){
				var name;
				if(data.is_player_1_eliminated == false){
					name = data.player_1_last_name;
				}
				else if(data.is_player_2_eliminated == false){
					name = data.player_2_last_name;
				}
				else if(data.is_player_3_eliminated == false){
					name = data.player_3_last_name;
				}
				else if(data.is_player_4_eliminated == false){
					name = data.player_4_last_name;
				}
				var num;
				if(data.is_player_1_eliminated == false){
					num = data.player_1_score;
				}
				else if(data.is_player_2_eliminated == false){
					num = data.player_2_score;
				}
				else if(data.is_player_3_eliminated == false){
					num = data.player_3_score;
				}
				else if(data.is_player_4_eliminated == false){
					num = data.player_4_score;
				}
				$('#answer').html(name + ': ' + num + '&nbsp '.repeat(10) + data.player_sn_last_name + ': ' + (data.player_sn_score+4))
				update(ref(db), { rc4_2_obj18 : 0 });
			}
			if (data.rc4_2_obj19 == 1){
				var name;
				if(data.is_player_1_eliminated == false){
					name = data.player_1_last_name;
				}
				else if(data.is_player_2_eliminated == false){
					name = data.player_2_last_name;
				}
				else if(data.is_player_3_eliminated == false){
					name = data.player_3_last_name;
				}
				else if(data.is_player_4_eliminated == false){
					name = data.player_4_last_name;
				}
				var num;
				if(data.is_player_1_eliminated == false){
					num = data.player_1_score;
				}
				else if(data.is_player_2_eliminated == false){
					num = data.player_2_score;
				}
				else if(data.is_player_3_eliminated == false){
					num = data.player_3_score;
				}
				else if(data.is_player_4_eliminated == false){
					num = data.player_4_score;
				}
				$('#answer').html(name + ': ' + num + '&nbsp '.repeat(10) + data.player_sn_last_name + ': ' + (data.player_sn_score+5))
				update(ref(db), { rc4_2_obj19 : 0 });
			}
			if (data.rc4_2_obj4 == 1){
				con.AnCauHoi();
				update(ref(db), { rc4_2_obj4 : 0 });
			}
      */
		})
	}(window.VTVCGV = window.VTVCGV || {}));
});
