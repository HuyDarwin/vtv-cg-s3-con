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
			
			$('#timer, #qcc_timer').html(data.timer);
			
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
				$('#qc #player_input').html(data.input);
				$('#qc #player_sn_input').html(data.input_sn);				
			}
			
			$('#sn1, #sn1p').html(data.player_1_last_name);
			$('#sn2, #sn2p').html(data.player_2_last_name);
			$('#sn3, #sn3p').html(data.player_3_last_name);
			$('#sn4, #sn4p').html(data.player_4_last_name);
			$('#sntd, #sntdp').html(data.player_sn_last_name);
			$('#ss1').html(data.player_1_score);
			$('#ss2').html(data.player_2_score);
			$('#ss3').html(data.player_3_score);
			$('#ss4').html(data.player_4_score);
			$('#sstd').html(data.player_sn_score);
      /*
			$('#ss1p').html(data.player_1_score);
			$('#ss2p').html(data.player_2_score);
			$('#ss3p').html(data.player_3_score);
			$('#ss4p').html(data.player_4_score);
			$('#sstdp').html(data.player_sn_score);
      */
				
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
						$('#input, #input_send').removeAttr("disabled");
					}
					else{
						$('#input, #input_send').attr("disabled", true);
					}
					if(number_of_player == 6){
						$('#input_sn, #input_sn_send').removeAttr("disabled");
					}
					else{
						$('#input_sn, #input_sn_send').attr("disabled", true);
					}
				}
				else{
					$('#input, #input_sn, #input_send, #input_sn_send').attr("disabled", true);
				}
			}
			else{
				$('#input, #input_sn, #input_send, #input_sn_send').attr("disabled", true);
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
      
      // Question crossword
      
      if(data.round == 4 && data.played_questions >= 0 && data.played_questions <= 2 && data.dang_choi == 1) {
        $('#qc').css('top','0vw')
        
        var string = "";
        var x = data.played_questions + 4;
        
          string += "<tr>";
          for(var i = 1; i <= x + 1; i++){
            string += "<th class='row_crown' id='row_crown_" + i + "'></th>"
          }
          string += "</tr>";
        
        for(var i = 1; i <= x; i++){
          string += "<tr class='row_word' id='row_word_" + i + "'>";
          for(var j = 1; j <= x; j++){
            var char = eval('data.cw_key_' + i + '_' + j);
            if (char == "*") {
              string += "<td class='row_cell_x' id='row_cell_" + j + "'></td>"
            }
            else if (char == ".") {
              string += "<td class='row_cell' id='row_cell_" + j + "'></td>"
            }
            else {
              string += "<td class='row_cell' id='row_cell_" + j + "'>" + char + "</td>"
            }
          }
            string += "<td class='row_cell_arrow'></td>"
            //string += "<td class='row_cell_ques' id='row_cell_ques_" + i + "'></td>"
          string += "</tr>";
        }
        
        $('#qc #cw_table').html(string);
        
        var string2 = "";
        
          string2 += "<tr><th class='row_crown'></th></tr>";
        
        for(var i = 1; i <= x; i++){
          string2 += "<tr class='row_word' id='row_word_" + i + "'>";
          string2 += "<td class='row_cell_ques' id='row_cell_ques_" + i + "'></td>"
          string2 += "</tr>";
        }
        
        $('#qc #cw_table2').html(string2);
        
        $('.row_word').css({'max-height':(32 / x) + 'vw'})
        $('.row_cell, .row_crown, .row_cell_x, .row_cell_high, .row_cell_high_x').css({'width':(32 / x) + 'vw', 'height':(32 / x) + 'vw', 'font-size' : (4.85 - Math.abs(4 - x) * 0.5) + 'vw'})
        $('#qc .row_cell_ques').css({'width':'35vw', 'height':((2 * x + 23.5) / x) + 'vw'})
        
        $('#qc #row_crown_' + data.key_col).css('background-image', 'url("https://cdn.glitch.global/6c8505bb-04bd-4d53-9cb8-a1b40407c0a4/orange_crown.png?v=1719157862646")')
      

          for (var i = 1; i <= data.played_questions + 4; i++) {
            if (eval('data.cw_question_' + i + '_hide') == 0 || (number_of_player == 5 && data.hdav4 == 1)) {
              $('#qc #row_cell_ques_' + i).html(eval('data.cw_question_' + i))
            }
            else{
              $('#qc #row_cell_ques_' + i).html('')
            }
            
            for (var j = 1; j <= data.played_questions + 4; j++) {
              if (eval('data.cw_key_ans_' + i + '_hide') == 0 || (number_of_player == 5 && data.hdav4 == 1)) {
                if(eval('data.cw_key_' + i + '_' + j) == '.') {
                  $('#row_word_' + i + ' #row_cell_' + j).css('color','#EB5F00');
                  $('#row_word_' + i + ' #row_cell_' + j).html(eval('data.cw_key_ans_' + i + '_' + j));
                }
                else{
                  $('#row_word_' + i + ' #row_cell_' + j).css('color','white');
                }
              }
              else{
                if(eval('data.cw_key_' + i + '_' + j) == '.') {
                  $('#row_word_' + i + ' #row_cell_' + j).html('');
                }
                $('#row_word_' + i + ' #row_cell_' + j).css('color','white');                
              }                
            }
         
          } 
          
          if(number_of_player == 5 && data.key_word != null && data.hdav4 == 1){
            $('#qc-keyword').css('opacity',1).html('Từ hàng dọc: ' + data.key_word)
          }
          else{
            $('#qc-keyword').css('opacity',0).html('Từ hàng dọc: ')
          }      
      }
      else{
        $('#qc').css('top','100vw')
      }
      

      
		})
		
		$('#buzzer').click(function(){
			update(ref(db), {
				player_buzz : number_of_player,
				buzzer_sound : 1,
				pause_timer : 'true'
			})
		})
    
    $('#input').bind('input propertychange', function() {
			update(ref(db), { input : $('#input').val() })
    });
    
    $('#qc #input').bind('input propertychange', function() {
			update(ref(db), { input : $('#qc #input').val() })
    });
    
    $('#input_sn').bind('input propertychange', function() {
			update(ref(db), { input_sn : $('#input_sn').val() })
    });
    
    $('#qc #input_sn').bind('input propertychange', function() {
			update(ref(db), { input_sn : $('#qc #input_sn').val() })
    });
    
		$('#input_send').click(function(){
			update(ref(db), { input : $('#input').val() })
		})
		$('#input_sn_send').click(function(){
			update(ref(db), { input_sn : $('#input_sn').val() })
		})
    
    $('#show_hide_ans_qc').click(function(){
      hien_dap_an_vong_4++;
      hien_dap_an_vong_4 %= 2;
      update(ref(db), {hdav4: hien_dap_an_vong_4})
    })
    update(ref(db), {hdav4: 0})
	}(window.VTVCGV = window.VTVCGV || {}));
});
