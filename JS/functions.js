import { getDatabase, ref, set, update, onValue, remove } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

$(function () {
	"use strict";

	window.VTVCGV = window.VTVCGV || {};

	(function (con) {
		const db = getDatabase();
		
		// All
		con.ChoiAmThanh = function(filename, n){
			if (n == 1){
				try{			
					at =  new Audio(filename);
					at.play();
					at.volume = 0.2;
				}
				catch(e){
					// do nothing
				}				
			}
			else if (n == 2){
				try{			
					at2 =  new Audio(filename);
					at2.play();
					at2.volume = 0.15;
				}
				catch(e){
					// do nothing
				}				
			}
			else if (n == 3){
				try{			
					at3 =  new Audio(filename);
					at3.play();
					at3.volume = 0.1;
				}
				catch(e){
					// do nothing
				}				
			}
			else if (n == 4){
				try{			
					at4 =  new Audio(filename);
					at4.play();
					at4.volume = 0.2;
				}
				catch(e){
					// do nothing
				}				
			}
			else if (n == 5){
				try{			
					at5 =  new Audio(filename);
					at5.play();
					at5.volume = 0.2;
				}
				catch(e){
					// do nothing
				}				
			}
		};
		con.DungAmThanh = function(a) {
			try {
				if(a == 1 && at != ''){
					at.pause();
					at.currentTime = 0;
				}
				if(a == 2 && at2 != ''){
					at2.pause();
					at2.currentTime = 0;
				}
				if(a == 3 && at3 != ''){
					at3.pause();
					at3.currentTime = 0;
				}
				if(a == 4 && at4 != ''){
					at4.pause();
					at4.currentTime = 0;
				}
				if(a == 5 && at5 != ''){
					at5.pause();
					at5.currentTime = 0;
				}
				if(a != 1 && a != 2 && a != 3 && a != 4 && a != 5){
					if(at != ''){
						at.pause();
						at.currentTime = 0;
					}
					if(at2 != ''){
						at2.pause();
						at2.currentTime = 0;
					}
					if(at3 != ''){
						at3.pause();
						at3.currentTime = 0;
					}
					if(at4 != ''){
						at4.pause();
						at4.currentTime = 0;
					}
					if(at5 != ''){
						at5.pause();
						at5.currentTime = 0;
					}
				}
			}
			catch(e){
				// swallow
			}
		};
		
		// Index
		onValue(ref(db), (snapshot) => {
			const data = snapshot.val();
			con.AnHetVideo = function() {
				$('#intro,#comm,#rt1,#rt2,#rt3,#rt4,#question-1,#question-1-input,#question-2,#qc-timer,#scoreboard-1,#scoreboard-2').css('opacity',0).trigger('pause')
				$('#intro,#comm,#rt1,#rt2,#rt3,#rt4,#question-1,#question-1-input,#question-2,#qc-timer,#scoreboard-1,#scoreboard-2').prop('currentTime', 0);
			}
      
      con.ChuyenCanhVong4 = function(x) {
        $('#qc-1, #qc-2, #qc-3').css('opacity', 0)
        if(x == 1 || x == 2 || x == 3) {
          $('#qc-' + x).css('opacity', 1);
        }
      }
      


      
      con.LoadDoHoaVong4 = function(x) {
        var string = "";
        
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
          string += "</tr>";
        }
        
        $('#qc-1 #cw_table, #qc-2 #cw_table, #qc-3 #cw_table').html(string);
        
        $('.row_cell, .row_crown, .row_cell_x, .row_cell_high, .row_cell_high_x, #qc-3 .row_cell_arrow').css({'width':(32 / x) + 'vw', 'height' : (32 / x) + 'vw', 'line-height' : '-2vw', 'font-size' : (5 - (4 - x) * 0.2) + 'vw'})
        $('#qc-2 .row_cell, #qc-2 .row_crown, #qc-2 .row_cell_x, #qc-2 .row_cell_high, #qc-2 .row_cell_high_x').css({'width':(32 / x) / 2 + 'vw', 'height' : (32 / x) / 2 + 'vw', 'line-height' : '-2vw', 'font-size' : ((5 - (4 - x) * 0.2) / 4) + 'vw'})
        $('#qc-1 #row_crown_' + data.key_col).css('background-image', 'url("https://cdn.glitch.global/6c8505bb-04bd-4d53-9cb8-a1b40407c0a4/orange_crown.png?v=1719157862646")')
        $('#qc-2 #row_crown_' + data.key_col).css('background-image', 'url("https://cdn.glitch.global/6c8505bb-04bd-4d53-9cb8-a1b40407c0a4/orange_crown.png?v=1719157862646")')
        $('#qc-3 #row_crown_' + data.key_col).css('background-image', 'url("https://cdn.glitch.global/6c8505bb-04bd-4d53-9cb8-a1b40407c0a4/orange_crown.png?v=1719157862646")')
      }
      

        
    con.HighlightHangNgangVong4 = function(i,k) {
      for (var j = 1; j <= data.played_questions + 4; j++ ) {
        var char = eval('data.cw_key_' + i + '_' + j);
        if (char == "*") {
          if(k == 1) {
            $('#row_word_' + i + ' #row_cell_' + j).attr('class', 'row_cell_high_x');
          }
          else {
            $('#row_word_' + i + ' #row_cell_' + j).attr('class', 'row_cell_x');
          }          
        }
        else {
           if(k == 1) {
            $('#row_word_' + i + ' #row_cell_' + j).attr('class', 'row_cell_high');
          }
          else {
            $('#row_word_' + i + ' #row_cell_' + j).attr('class', 'row_cell');
          }            
        }
      }
    }
      
      con.ResetHighLightHangNgangVong4 = function () {
        for (var i = 1; i <= data.played_questions + 4; i++ ) {
          con.HighlightHangNgangVong4(i, 0);
        }
      }
      
      con.ChuyenCauHoiHangNgangVong4 = function (i) {
        $('#qc-q-text-holder').animate({'opacity':'0'}, 250, 'linear', function(){
          //console.log('data.cw_question_' + i)
          $('#qc-q-text').html(eval('data.cw_question_' + i));
          $('#qc-q-text-holder').animate({'opacity':'1'}, 250)
        })
      }
      
			con.HienCauHoi = function(){
				con.AnHetVideo();
        
        if (data.round == 4) {
          $('.question-crossword').css('opacity', 1)
          
          con.ChuyenCanhVong4(1)
          
          $('#qc-1-bg').css('left','100vw');
          $('#qc-1-bg').animate({'left':'50vw'}, 750, 'linear')
          $('#qc-timer').css('opacity',1).trigger('play');
          
          $('#qc-q-text-holder').css('opacity',0)
          
          setTimeout(function(){
            $('#qcc').css('opacity',1);
          }, 750)
        }
        else {
          $('.question-crossword').css('opacity', 0)
          
          if (data.round == 2){
            $('#question-2').css('opacity',1).trigger('play');
            $('#round_q').css({"left": "49.75vw", "top": "3vw"});
            $('#q_text').css({"width": "41.2vw", "height": "3.2vw", "left": "15vw", "top": "5.5vw"});
          }
          else{
            $('#question-1').css('opacity',1).trigger('play');
            $('#round_q').css({"left": "50.5vw", "top": "0.4vw"});
            $('#q_text').css({"width": "55vw", "height": "4.5vw", "left": "0.6vw", "top": "3vw"});
          }

          $('#players_left').html('Còn<br/>' + (5 - data.round) + ' người');

          $('.round').html('Vòng ' + data.round);

          if(data.is_playing_tiebreak == 1){
            $('#timer').css('opacity', 0);
            $('#tiebreak_text').css('opacity', 1);
          }
          else {
            $('#timer').css('opacity', 1);
            $('#tiebreak_text').css('opacity', 0);
          }

          setTimeout(function(){
            $('#question_content').css('opacity',1);
          }, 750)
        }	
			}
      
			con.AnCauHoi = function(){
        if(data.round == 4) {
          $('.question-crossword, #qc-timer, #qcc').css('opacity',0);          
          $('#qc-1-bg').css('left','100vw');
          con.ChuyenCanhVong4(0)
        }
        else {
          $('#question-1, #question-2').animate({ opacity: 0}, 0);
          $('#question_content').animate({ opacity: 0}, 0, function(){
            $('#q_text td, #answer, #timer, #round_q, #players_left').html('');
            $('#answer').css('opacity', 0);
          });          
        }
			}
      

		})
		
		// Controller
		con.ChonNguoiChoi = function(cont) {
				var i = 0;
				player_in_game = 4;
				update(ref(db), { player_in_game : player_in_game })
				var interval1 = setInterval(function(){
					if (i >= 9){
						clearInterval(interval1);
						i = 0;
						var interval2 = setInterval(function(){
							if (i >= 7){
								clearInterval(interval2);
								i = 0;
								var interval3 = setInterval(function(){
									if (i >= 49){
										clearInterval(interval3);
										i = 0;
										player_in_game = cont;
		 								update(ref(db), { player_in_game : player_in_game })
									}
									else {
										if (player_in_game >= 4){
											player_in_game = 1;	
											update(ref(db), { player_in_game : player_in_game })
										}
										else {
											player_in_game++;
											update(ref(db), { player_in_game : player_in_game })
										}
										i++;
										
									}
								}, 100);
							}
							else {
								if (player_in_game >= 4){
									player_in_game = 1;
									update(ref(db), { player_in_game : player_in_game })
								}
								else {
									player_in_game++;
									update(ref(db), { player_in_game : player_in_game })
								}
								i++;
								
							}
						}, 500);
					}
					else {
						if (player_in_game >= 4){
							player_in_game = 1;
							update(ref(db), { player_in_game : player_in_game })
						}
						else {
							player_in_game++;	
							update(ref(db), { player_in_game : player_in_game })
						}
						i++;
						
					}
				}, 1000);
		}
		con.ChayDongHo = function(time){
			con.ResetDongHo();
			is_timer_running = true;
			timer = time;
			$('#timer').html(timer);
			update(ref(db), { timer : timer })
			timer_int = setInterval(function () {
				if (is_timer_running && timer != 0) {
					timer--;
					$('#timer').html(timer);
					update(ref(db), { timer : timer })
				}
			}, 1000);
		}
		con.TamDungDongHo = function(){
			is_timer_running = false;
		}
		con.TiepTucDongHo = function(){
			is_timer_running = true;
		}
		con.ResetDongHo = function(){
			clearInterval(timer_int);
			is_timer_running = false;
			timer = 0;
			$('#timer').html(timer);
			update(ref(db), { timer : timer })
		}
    
		con.ChayCauHoi = function(round,is_tiebreak){
      if(round != 4) {
        if (forced_question == 0){
          if (round == 1){
            if(played_questions >= 14 * (played_contestants + 1) && timer != 0){
              update(ref(db), { end_of_qs : 1 })
              played_questions = 14 * (played_contestants + 1);
              update(ref(db), { played_questions : played_questions })
              con.TamDungDongHo();
            }
            else{
              if (!is_tiebreak){
                question = cau_hoi_1[played_questions].Question;
                update(ref(db), { question : question })
                answer = cau_hoi_1[played_questions].Answer;
                update(ref(db), { answer : answer })
              }
              else{
                question = cau_hoi_chp_1[played_questions].Question;
                update(ref(db), { question : question })
                answer = cau_hoi_chp_1[played_questions].Answer;
                update(ref(db), { answer : answer })
              }
            }
          }
          if (round == 2){
            if (!is_tiebreak){
              question = cau_hoi_2[played_questions].Question;
              update(ref(db), { question : question })
            }
            else{
              question = cau_hoi_chp_2[played_questions].Question;
              update(ref(db), { question : question })
            }
          }
          if (round == 3){
            if (!is_tiebreak){
              question = cau_hoi_3[played_questions].Question;
              update(ref(db), { question : question })
              answer = cau_hoi_3[played_questions].Answer;
              update(ref(db), { answer : answer })
            }
            else{
              question = cau_hoi_chp_3[played_questions].Question;
              update(ref(db), { question : question })
              answer = cau_hoi_chp_3[played_questions].Answer;
              update(ref(db), { answer : answer })
            }
          }
          /*
          if (round == 4){
            question = cau_hoi_4[played_questions].Question;
            update(ref(db), { question : question })
            answer = cau_hoi_4[played_questions].Answer;
            update(ref(db), { answer : answer })
          }
          */
        }
        else if(forced_question == 1){
          question = ftp_question;
          update(ref(db), { question : question })
          answer = ftp_answer;
          update(ref(db), { answer : answer })
          forced_question = 0;
        }
        $('#q_text td').html(question);
        $('#answer').html(answer);        
      }
      
      update(ref(db), { input: '' })
      update(ref(db), { input_sn: '' })
		}
    
    con.ResetCauHoiVong4 = function(){
      key_col = '';
      key_word = '';

      cw_question = ['', '', '', '', '', ''];
      cw_key = [
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', '']
      ];
      cw_key_ans = [
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', '']
      ];      
      
      update(ref(db), { input: '' })
      update(ref(db), { input_sn: '' })  
    }
    
    con.LoadCauHoiVong4 = function() {
      key_col = cau_hoi_4[played_questions].KeyCol;
      key_word = cau_hoi_4[played_questions].KeyWord;
      
      update(ref(db), { key_col : key_col })
      update(ref(db), { key_word : key_word })  
      
      for (var i = 1; i <= 6; i++) {
        cw_key[i - 1][0] = cau_hoi_4_cw[played_questions][i - 1].LetterQ1;
        cw_key[i - 1][1] = cau_hoi_4_cw[played_questions][i - 1].LetterQ2;
        cw_key[i - 1][2] = cau_hoi_4_cw[played_questions][i - 1].LetterQ3;
        cw_key[i - 1][3] = cau_hoi_4_cw[played_questions][i - 1].LetterQ4;
        cw_key[i - 1][4] = cau_hoi_4_cw[played_questions][i - 1].LetterQ5;
        cw_key[i - 1][5] = cau_hoi_4_cw[played_questions][i - 1].LetterQ6;
        
        for (var j = 1; j <= 6; j++) {
          update(ref(db), { ['cw_key_' + i + '_' + j] : cw_key[i - 1][j - 1] })
        }
      
        cw_question[i - 1] = cau_hoi_4_cw[played_questions][i - 1].Question;
        
        update(ref(db), { ['cw_question_' + i] : cw_question[i - 1] })
        update(ref(db), { ['cw_question_' + i + '_hide'] : 1 })
      
        cw_key_ans[i - 1][0] = cau_hoi_4_cw[played_questions][i - 1].LetterA1;
        cw_key_ans[i - 1][1] = cau_hoi_4_cw[played_questions][i - 1].LetterA2;
        cw_key_ans[i - 1][2] = cau_hoi_4_cw[played_questions][i - 1].LetterA3;
        cw_key_ans[i - 1][3] = cau_hoi_4_cw[played_questions][i - 1].LetterA4;
        cw_key_ans[i - 1][4] = cau_hoi_4_cw[played_questions][i - 1].LetterA5;
        cw_key_ans[i - 1][5] = cau_hoi_4_cw[played_questions][i - 1].LetterA6;
        
        for (var j = 1; j <= 6; j++) {
          update(ref(db), { ['cw_key_ans_' + i + '_' + j] : cw_key_ans[i - 1][j - 1] })
          update(ref(db), { ['cw_key_ans_' + i + '_hide'] : 1 })
        }
      }
    }
    
    con.ChoHienTextCauHoiVong4 = function(i) {
      update(ref(db), { ['cw_question_' + i + '_hide'] : 0 })
    }
    
    con.ChoHienDapAnHangNgangVong4 = function(i) {
      update(ref(db), { ['cw_key_ans_' + i + '_hide'] : 0 })
    }  
    
		con.CongDiemNguoiChoi = function(score,is_adding_points_to_player_sn){
			if (is_adding_points_to_player_sn == true){
				player_sn_score += score;
				update(ref(db), { player_sn_score : player_sn_score })
				$('#sstd').html(player_sn_score);
			}
			else{
				if (player_in_game == 1 || player_buzz == 1){
					player_1_score += score;
					update(ref(db), { player_1_score : player_1_score })
					if(tiebreak_questions_left == 0){
						$('#ss1').html(player_1_score);
					}
				}
				if (player_in_game == 2 || player_buzz == 2){
					player_2_score += score;
					update(ref(db), { player_2_score : player_2_score })
					if(tiebreak_questions_left == 0){
						$('#ss2').html(player_2_score);
					}
				}
				if (player_in_game == 3 || player_buzz == 3){
					player_3_score += score;
					update(ref(db), { player_3_score : player_3_score })
					if(tiebreak_questions_left == 0){
						$('#ss3').html(player_3_score);
					}
				}
				if (player_in_game == 4 || player_buzz == 4){
					player_4_score += score;
					update(ref(db), { player_4_score : player_4_score })
					if(tiebreak_questions_left == 0){
						$('#ss4').html(player_4_score);
					}
				}
			}
		}
		con.TimNguoiChoiBiLoai = function(){
			var score = [];
			if(is_player_1_eliminated == false){
				score.push(player_1_score);
			}
			if(is_player_2_eliminated == false){
				score.push(player_2_score);
			}
			if(is_player_3_eliminated == false){
				score.push(player_3_score);
			}
			if(is_player_4_eliminated == false){
				score.push(player_4_score);
			}
			dtn = Math.min(...score);
			update(ref(db), { minimum_score : dtn })
			var l = 0;
			var nbl = 0;
			
			if(player_1_score == dtn && is_player_1_eliminated == false){
				nbl = 1;
				l++;
			}
			if(player_2_score == dtn && is_player_2_eliminated == false){
				nbl = 2;
				l++;
			}
			if(player_3_score == dtn && is_player_3_eliminated == false){
				nbl = 3;
				l++;
			}
			if(player_4_score == dtn && is_player_4_eliminated == false){
				nbl = 4;
				l++;
			}
			
			if(l == 1){
				eli_player_temp = nbl;
				$('#lnc').removeAttr("disabled");
				$('#nbl').html(nguoi_choi[eli_player_temp - 1].LastName);
			}
			else if(l > 1){
				played_questions = -1;
				update(ref(db), { played_questions : played_questions })
				tiebreak_questions_left = l - 1;
				$('#rc1_obj13, #rc3_obj8').removeAttr("disabled");
				if(round == 2){
					if(tiebreak_questions_left == 2){
						$('#rc2_obj13').removeAttr("disabled");
					}
					if(tiebreak_questions_left == 1){
						if(player_1_score != dtn && is_player_1_eliminated == false){
							$('#rc2_obj4').removeAttr("disabled");
						}
						if(player_2_score != dtn && is_player_2_eliminated == false){
							$('#rc2_obj5').removeAttr("disabled");
						}
						if(player_3_score != dtn && is_player_3_eliminated == false){
							$('#rc2_obj6').removeAttr("disabled");
						}
						if(player_4_score != dtn && is_player_4_eliminated == false){
							$('#rc2_obj7').removeAttr("disabled");
						}
						$('#rc2_obj13').removeAttr("disabled");
					}
				}
			}
		}
	}(window.VTVCGV = window.VTVCGV || {}));
});