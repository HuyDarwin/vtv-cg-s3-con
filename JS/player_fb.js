import { getDatabase, ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

$(function () {
	"use strict";

	window.VTVCGV = window.VTVCGV || {};

	(function (con) {
		const db = getDatabase();
		onValue(ref(db), (snapshot) => {
			const data = snapshot.val();
			if(data.is_able_to_buzzer == 1){
				if(data.is_playing_tiebreak == 1){
					if(number_of_player == 1 && data.is_player_1_eliminated == 0 && data.player_1_score == data.minimum_score){
						$('#buzzer').removeAttr("disabled");
					}
					if(number_of_player == 2 && data.is_player_2_eliminated == 0 && data.player_2_score == data.minimum_score){
						$('#buzzer').removeAttr("disabled");
					}
					if(number_of_player == 3 && data.is_player_3_eliminated == 0 && data.player_3_score == data.minimum_score){
						$('#buzzer').removeAttr("disabled");
					}
					if(number_of_player == 4 && data.is_player_4_eliminated == 0 && data.player_4_score == data.minimum_score){
						$('#buzzer').removeAttr("disabled");
					}
				}
				else{
					if(data.timer != 0){
						if(data.player_in_game != number_of_player){
							if(number_of_player == 1 && data.is_player_1_eliminated == 0){
								$('#buzzer').removeAttr("disabled");
							}
							if(number_of_player == 2 && data.is_player_2_eliminated == 0){
								$('#buzzer').removeAttr("disabled");
							}
							if(number_of_player == 3 && data.is_player_3_eliminated == 0){
								$('#buzzer').removeAttr("disabled");
							}
							if(number_of_player == 4 && data.is_player_4_eliminated == 0){
								$('#buzzer').removeAttr("disabled");
							}
						}
					}
					else{
						$('#buzzer').attr("disabled", true);
					}
				}
			}
			else{
				$('#buzzer').attr("disabled", true);
			}
			
			// Variables update
			
			$('#timer').html(data.timer);
			
			if(data.round == 2 && data.player_in_game != number_of_player){
				if(number_of_player == 5){
					$('#q_text td').html(data.question);
				}
				else{
					$('#q_text td').html('Hãy tìm từ sau đây');
				}
			}
			else{
				$('#q_text td').html(data.question);
			}
			
			if(number_of_player == 5){
				$('#answer').html(data.answer);
				$('#player_input').html(data.input);
				$('#player_sn_input').html(data.input_sn);				
			}
			
			$('#sn1, #sn1p').html(data.player_1_last_name);
			$('#sn2, #sn2p').html(data.player_2_last_name);
			$('#sn3, #sn3p').html(data.player_3_last_name);
			$('#sn4, #sn4p').html(data.player_4_last_name);
			$('#sntd, #sntdp').html(data.player_sn_last_name);
			$('#ss1, #ss1p').html(data.player_1_score);
			$('#ss2, #ss2p').html(data.player_2_score);
			$('#ss3, #ss3p').html(data.player_3_score);
			$('#ss4, #ss4p').html(data.player_4_score);
			$('#sstd, #sstdp').html(data.player_sn_score);
				
			if(data.is_player_1_eliminated == true){
				$('#sn1, #ss1').css('background-color', 'gray');
			}
			else if(data.is_player_1_eliminated == false){
				$('#sn1').css('background-color', 'rgba(57,213,247)');
				$('#ss1').css('background-color', 'rgba(245,120,16)');
			}
				
			if(data.is_player_2_eliminated == true){
				$('#sn2, #ss2').css('background-color', 'gray');
			}
			else if(data.is_player_2_eliminated == false){
				$('#sn2').css('background-color', 'rgba(57,213,247)');
				$('#ss2').css('background-color', 'rgba(245,120,16)');
			}
			
			if(data.is_player_3_eliminated == true){
				$('#sn3, #ss3').css('background-color', 'gray');
			}
			else if(data.is_player_3_eliminated == false){
				$('#sn3').css('background-color', 'rgba(57,213,247)');
				$('#ss3').css('background-color', 'rgba(245,120,16)');
			}
				
			if(data.is_player_4_eliminated == true){
				$('#sn4, #ss4').css('background-color', 'gray');
			}
			else if(data.is_player_4_eliminated == false){
				$('#sn4').css('background-color', 'rgba(57,213,247)');
				$('#ss4').css('background-color', 'rgba(245,120,16)');
			}
			
			if(data.round != null){
				$('#round').html('Vòng ' + data.round);
				$('#players_left').html('Còn<br/>' + (5 - data.round) + ' người');
			}
			else{
				$('#round').html('');
				$('#players_left').html('');
			}
			
			if(data.round == 1 || data.round == 4){
				if(data.is_able_to_input == 1){
					if(data.player_in_game == number_of_player){
						$('#input').removeAttr("disabled");
					}
					else{
						$('#input').attr("disabled", true);
					}
					if(number_of_player == 6){
						$('#input_sn').removeAttr("disabled");
					}
					else{
						$('#input_sn').attr("disabled", true);
					}
				}
				else{
					$('#input, #input_sn').attr("disabled", true);
				}
			}
			else{
				$('#input, #input_sn').attr("disabled", true);
			}
				
			if(data.player_in_game == 1 && data.player_1_last_name != null){
				$('#gpx1').html('Người đang chơi:<br/>1. ' + data.player_1_last_name);
			}
			else if(data.player_in_game == 2 && data.player_2_last_name != null){
				$('#gpx1').html('Người đang chơi:<br/>2. ' + data.player_2_last_name);
			}
			else if(data.player_in_game == 3 && data.player_3_last_name != null){
				$('#gpx1').html('Người đang chơi:<br/>3. ' + data.player_3_last_name);
			}
			else if(data.player_in_game == 4 && data.player_4_last_name != null){
				$('#gpx1').html('Người đang chơi:<br/>4. ' + data.player_4_last_name);
			}
			else{
				$('#gpx1').html('Người đang chơi:<br/>');
			}
      
			if(data.player_buzz != 0){
				$('#gpx2').html('Người bấm chuông:<br/>' + data.player_buzz);
			}
			else{
				$('#gpx2').html('Người bấm chuông:<br/>');
			}
      
			/*
			if(data.player_buzz == 2 && data.player_2_last_name != null){
				$('#gpx2').html('Người bấm chuông:<br/>2. ' + data.player_2_last_name);
			}
			if(data.player_buzz == 3 && data.player_3_last_name != null){
				$('#gpx2').html('Người bấm chuông:<br/>3. ' + data.player_3_last_name);
			}
			if(data.player_buzz == 4 && data.player_4_last_name != null){
				$('#gpx2').html('Người bấm chuông:<br/>4. ' + data.player_4_last_name);
			}
			else{
				$('#gpx2').html('Người bấm chuông:<br/>');
			}*/
			
			if(data.round == 1){
        if((data.played_questions + 1) % 14 == 0) $('#info1').html('Thứ tự câu hỏi hiện tại: 14')
				else $('#info1').html('Thứ tự câu hỏi hiện tại: ' + (data.played_questions + 1) % 14);
			}
			else if(data.round == 2 ){
				$('#gpx3').html('Thứ tự câu hỏi hiện tại:<br/>' + (data.played_questions + 1) % 2);
			}
			else if(data.round == 3 || data.round == 4){
				$('#gpx3').html('Thứ tự câu hỏi hiện tại:<br/>' + (data.played_questions + 1));
			}
			else{
				$('#gpx3').html('Thứ tự câu hỏi hiện tại:<br/>');
			}
      
			if(data.question.length > 140){
				var qla = data.question.length - 140;
				var qlb = qla * (0.026 - qla * 0.00018);
				var qlc = 2.6 - qlb;
				var qld = String(qlc) + "vw";
				var qle = 2.7 - (2.7 - 2) / (2.6 - 1.6) * qlb;
				var qlf = String(qle) + "vw";
				$("#q_text").css({"font-size": qld, "line-height": qlf});
			}
			else{
				$("#q_text").css({"font-size": "2.6vw", "line-height": "2.7vw"});
			}
			  
			if(data.round == 4){
				$("#answer").css({"font-size": "1.6vw", "top": "11.8vw"});
			}
			else{
				$("#answer").css({"font-size": "2.6vw", "top": "12.6vw"});
			}
		})
		
		$('#buzzer').click(function(){
			update(ref(db), {
				player_buzz : number_of_player,
				buzzer_sound : 1,
				pause_timer : 'true'
			})
		})
		$('#input').change(function(){
			update(ref(db), { input : $('#input').val() })
		})
		$('#input_sn').change(function(){
			update(ref(db), { input_sn : $('#input_sn').val() })
		})
	}(window.VTVCGV = window.VTVCGV || {}));
});
