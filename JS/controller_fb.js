import { getDatabase, ref, set, update, onValue, remove } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

$(function () {
	"use strict";

	window.VTVCGV = window.VTVCGV || {};

	(function (con) {
		const db = getDatabase();
		remove(ref(db));
		update(ref(db), {
			player_buzz : 0,
			is_playing_tiebreak : 0,
			is_able_to_buzzer : 0,
			timer : 0,
			question : '',
			answer : '',
			is_player_1_eliminated : 0,
			is_player_2_eliminated : 0,
			is_player_3_eliminated : 0,
			is_player_4_eliminated : 0
		})
		const dataRef = ref(db);
		onValue(dataRef, (snapshot) => {
			const data = snapshot.val();
			if(data.player_buzz != 0){
				update(ref(db), {
					is_anyone_buzzering : 1,
					is_able_to_buzzer : 0
				})
				if(round == 1 && tiebreak_questions_left != 0){
					$('#rc1_obj10, #rc1_obj11, #rc1_obj12').removeAttr("disabled");
				}
				if(round == 2 || round == 3){
					con.TamDungDongHo();
				}
				if(round == 2){
					$('#rc2_obj10, #rc2_obj11').removeAttr("disabled");
				}
				if(round == 3){
					$('#rc3_obj6, #rc3_obj7').removeAttr("disabled");
				}
			}
			else{
				update(ref(db), {
					is_anyone_buzzering : 0,
				})
			}
			
			player_buzz = data.player_buzz;
			$('#player_input').html(data.input);
			$('#player_sn_input').html(data.input_sn);
			
			if(round == 1){
        if((played_questions + 1) % 14 == 0) $('#info1').html('Thứ tự câu hỏi hiện tại: 14')
				else $('#info1').html('Thứ tự câu hỏi hiện tại: ' + (played_questions + 1) % 14);
			}
			else if(round == 2){
				$('#info1').html('Thứ tự câu hỏi hiện tại: ' + (played_questions + 1) % 2);
			}
			else if(round == 3 || round == 4){
				$('#info1').html('Thứ tự câu hỏi hiện tại: ' + (played_questions + 1));
			}
			else{
				$('#info1').html('Thứ tự câu hỏi hiện tại: ');
			}
			
			if(1 <= player_in_game <= 4 && nguoi_choi[player_in_game - 1] != null){
				$('#info2').html('Người đang chơi: ' + player_in_game + '. ' + nguoi_choi[player_in_game - 1].LastName);
			}
			else{
				$('#info2').html('Người đang chơi: ');
			}
			
			if(1 <= player_buzz <= 4 && nguoi_choi[player_buzz - 1] != null){
				$('#info3').html('Người bấm chuông: ' + player_buzz + '. ' + nguoi_choi[player_buzz - 1].LastName);
			}
			else{
				$('#info3').html('Người bấm chuông: ');
			}
		})
		
		$('.autoname').click(function(){
			var bid = this.id;
			update(ref(db), { [bid] : 1 })
		})
		
		$('#loadch').click(function(){
			$('#getfilech').click();
		})
		$('#getfilech').on("change", function(e){
			cau_hoi_1 = [];
			cau_hoi_chp_1 = [];
			cau_hoi_2 = [];
			cau_hoi_chp_2 = [];
			cau_hoi_3 = [];
			cau_hoi_chp_3 = [];
			//cau_hoi_4 = [];
			var file = e.target.files[0];
			var reader = new FileReader();
			reader.onload = function(e) {
				var data = e.target.result;
				var workbook = XLSX.read(e.target.result);
				var sheet = workbook.Sheets[workbook.SheetNames[0]];
				var sheet2 = workbook.Sheets[workbook.SheetNames[1]];
				
				for(var i = 6; i <= 19; i++){
					cau_hoi_1.push({
						Round: sheet['A' + i].v,
						Player: sheet['B' + i].v,
						NumOfQ: sheet['C' + i].v,
						Question: sheet['D' + i].v.replace("++++", "<br />"),
						Answer: sheet['E' + i].v
					})
				}				
				for(var i = 21; i <= 34; i++){
					cau_hoi_1.push({
						Round: sheet['A' + i].v,
						Player: sheet['B' + i].v,
						NumOfQ: sheet['C' + i].v,
						Question: sheet['D' + i].v.replace("++++", "<br />"),
						Answer: sheet['E' + i].v
					})
				}			
				for(var i = 36; i <= 49; i++){
					cau_hoi_1.push({
						Round: sheet['A' + i].v,
						Player: sheet['B' + i].v,
						NumOfQ: sheet['C' + i].v,
						Question: sheet['D' + i].v.replace("++++", "<br />"),
						Answer: sheet['E' + i].v
					})
				}			
				for(var i = 51; i <= 64; i++){
					cau_hoi_1.push({
						Round: sheet['A' + i].v,
						Player: sheet['B' + i].v,
						NumOfQ: sheet['C' + i].v,
						Question: sheet['D' + i].v.replace("++++", "<br />"),
						Answer: sheet['E' + i].v
					})
				}	
				for(var i = 66; i <= 70; i++){
					cau_hoi_chp_1.push({
						Round: sheet['A' + i].v,
						NumOfQ: sheet['C' + i].v,
						Question: sheet['D' + i].v.replace("++++", "<br />"),
						Answer: sheet['E' + i].v
					})
				}
				for(var i = 73; i <= 74; i++){
					cau_hoi_2.push({
						Round: sheet['A' + i].v,
						Player: sheet['B' + i].v,
						NumOfQ: sheet['C' + i].v,
						Question: sheet['D' + i].v.replace("++++", "<br />")
					})
				}
				for(var i = 76; i <= 77; i++){
					cau_hoi_2.push({
						Round: sheet['A' + i].v,
						Player: sheet['B' + i].v,
						NumOfQ: sheet['C' + i].v,
						Question: sheet['D' + i].v.replace("++++", "<br />")
					})
				}
				for(var i = 79; i <= 80; i++){
					cau_hoi_2.push({
						Round: sheet['A' + i].v,
						Player: sheet['B' + i].v,
						NumOfQ: sheet['C' + i].v,
						Question: sheet['D' + i].v.replace("++++", "<br />")
					})
				}
				for(var i = 82; i <= 86; i++){
					cau_hoi_chp_2.push({
						Round: sheet['A' + i].v,
						NumOfQ: sheet['C' + i].v,
						Question: sheet['D' + i].v.replace("++++", "<br />")
					})
				}
				for(var i = 88; i <= 96; i++){
					cau_hoi_3.push({
						Round: sheet['A' + i].v,
						NumOfQ: sheet['C' + i].v,
						Question: sheet['D' + i].v.replace("++++", "<br />"),
						Answer: sheet['E' + i].v
					})
				}
				for(var i = 98; i <= 102; i++){
					cau_hoi_chp_3.push({
						Round: sheet['A' + i].v,
						NumOfQ: sheet['C' + i].v,
						Question: sheet['D' + i].v.replace("++++", "<br />"),
						Answer: sheet['E' + i].v
					})
				}
        /*
				for(var i = 100; i <= 102; i++){
					cau_hoi_4.push({
						Round: sheet['A' + i].v,
						NumOfQ: sheet['C' + i].v,
						Question: sheet['D' + i].v.replace("++++", "<br />"),
						Answer: sheet['E' + i].v
					})
				}
        */
        
        for(var i = 3; i <= 15; i += 6) {
          cau_hoi_4.push({
            NumOfQ: sheet2['A' + i].v,
            KeyCol: sheet2['I' + i].v,
            KeyWord: sheet2['J' + i].v
          })
        }
        
        var t = 0;
        for(var i = 3; i <= 15; i += 6){
          cau_hoi_4_cw.push([])
          for (var j = 0; j <= 5; j++) {
            cau_hoi_4_cw[t].push({
              Question: sheet2['B' + (i + j)].v.replace("++++", "<br />"),
              LetterQ1: sheet2['C' + (i + j)].v,
              LetterQ2: sheet2['D' + (i + j)].v,
              LetterQ3: sheet2['E' + (i + j)].v,
              LetterQ4: sheet2['F' + (i + j)].v,
              LetterQ5: sheet2['G' + (i + j)].v,
              LetterQ6: sheet2['H' + (i + j)].v,
              LetterA1: sheet2['K' + (i + j)].v,
              LetterA2: sheet2['L' + (i + j)].v,
              LetterA3: sheet2['M' + (i + j)].v,
              LetterA4: sheet2['N' + (i + j)].v,
              LetterA5: sheet2['O' + (i + j)].v,
              LetterA6: sheet2['P' + (i + j)].v
            })            
          }
          t++;
        }
			};
			reader.readAsArrayBuffer(file);
		});
		$('#loadnc').click(function(){
			$('#getfilenc').click();
		})
		$('#getfilenc').on("change", function(e){
			nguoi_choi = [];
			var file = e.target.files[0];
			var reader = new FileReader();
			reader.onload = function(e) {
				var data = e.target.result;
				var workbook = XLSX.read(e.target.result);
				var sheet = workbook.Sheets[workbook.SheetNames[0]];
				
				for(var i = 4; i <= 7; i++){
					nguoi_choi.push({
						FirstName: sheet['A' + i].v,
						LastName: sheet['B' + i].v,
						Location: sheet['C' + i].v,
						Age: sheet['D' + i].v,
						Occupation: sheet['E' + i].v,
						OtherInfo: sheet['F' + i].v,
						Poem: sheet['G' + i].v
					})
				}
				
				nguoi_choi.push({
					FirstName: sheet['A9'].v,
					LastName: sheet['B9'].v,
					Location: sheet['C9'].v,
					Age: sheet['D9'].v
				})
				
				update(ref(db), {
					player_1_first_name: nguoi_choi[0].FirstName,
					player_1_last_name: nguoi_choi[0].LastName,
					player_2_first_name: nguoi_choi[1].FirstName,
					player_2_last_name: nguoi_choi[1].LastName,
					player_3_first_name: nguoi_choi[2].FirstName,
					player_3_last_name: nguoi_choi[2].LastName,
					player_4_first_name: nguoi_choi[3].FirstName,
					player_4_last_name: nguoi_choi[3].LastName,
					player_sn_first_name: nguoi_choi[4].FirstName,
					player_sn_last_name: nguoi_choi[4].LastName
				})
				$('#sn1, #hd1').html(nguoi_choi[0].LastName);
				$('#sn2, #hd2').html(nguoi_choi[1].LastName);
				$('#sn3, #hd3').html(nguoi_choi[2].LastName);
				$('#sn4, #hd4').html(nguoi_choi[3].LastName);
				$('#sntd').html(nguoi_choi[4].LastName);
			};
			reader.readAsArrayBuffer(file);
		});
		
			$('#update_score').click(function(){
				if($('#sc1').val() == ''){
					player_1_score = 0;
				}
				else{
					player_1_score = parseInt($('#sc1').val());
				}
				update(ref(db), { player_1_score : player_1_score })
				$('#ss1').html(player_1_score);
				
				if($('#sc2').val() == ''){
					player_2_score = 0;
				}
				else{
					player_2_score = parseInt($('#sc2').val());
				}
				update(ref(db), { player_2_score : player_2_score })
				$('#ss2').html(player_2_score);
				
				if($('#sc3').val() == ''){
					player_3_score = 0;
				}
				else{
					player_3_score = parseInt($('#sc3').val());
				}
				update(ref(db), { player_3_score : player_3_score })
				$('#ss3').html(player_3_score);
				
				if($('#sc4').val() == ''){
					player_4_score = 0;
				}
				else{
					player_4_score = parseInt($('#sc4').val());
				}
				update(ref(db), { player_4_score : player_4_score })
				$('#ss4').html(player_4_score);
				
				if($('#sctd').val() == ''){
					player_sn_score = 0;
				}
				else{
					player_sn_score = parseInt($('#sctd').val());
				}
				update(ref(db), { player_sn_score : player_sn_score })
				$('#sstd').html(player_sn_score);
				
				if($('#ec1').is(":checked") == true){
					is_player_1_eliminated = true;
					update(ref(db), { is_player_1_eliminated : 1 })
					$('#sn1, #ss1').css('background-color', 'gray');
					$('#rc2_obj4').attr("disabled", true);
				}
				else{
					is_player_1_eliminated = false;
					update(ref(db), { is_player_1_eliminated : 0 })
					$('#sn1').css('background-color', 'rgba(57,213,247)');
					$('#ss1').css('background-color', 'rgba(245,120,16)');
					$('#rc2_obj4').attr("disabled", false);
				}
				
				if($('#ec2').is(":checked") == true){
					is_player_2_eliminated = true;
					update(ref(db), { is_player_2_eliminated : 1 })
					$('#sn2, #ss2').css('background-color', 'gray');
					$('#rc2_obj5').attr("disabled", true);
				}
				else{
					is_player_2_eliminated = false;
					update(ref(db), { is_player_2_eliminated : 0 })
					$('#sn2').css('background-color', 'rgba(57,213,247)');
					$('#ss2').css('background-color', 'rgba(245,120,16)');
					$('#rc2_obj5').attr("disabled", false);
				}
				
				if($('#ec3').is(":checked") == true){
					is_player_3_eliminated = true;
					update(ref(db), { is_player_3_eliminated : 1 })
					$('#sn3, #ss3').css('background-color', 'gray');
					$('#rc2_obj6').attr("disabled", true);
				}
				else{
					is_player_3_eliminated = false;
					update(ref(db), { is_player_3_eliminated : 0 })
					$('#sn3').css('background-color', 'rgba(57,213,247)');
					$('#ss3').css('background-color', 'rgba(245,120,16)');
					$('#rc2_obj6').attr("disabled", false);
				}
				
				if($('#ec4').is(":checked") == true){
					is_player_4_eliminated = true;
					update(ref(db), { is_player_4_eliminated : 1 })
					$('#sn4, #ss4').css('background-color', 'gray');
					$('#rc2_obj7').attr("disabled", true);
				}
				else{
					is_player_4_eliminated = false;
					update(ref(db), { is_player_4_eliminated : 0 })
					$('#sn4').css('background-color', 'rgba(57,213,247)');
					$('#ss4').css('background-color', 'rgba(245,120,16)');
					$('#rc2_obj7').attr("disabled", false);
				}
			})
		
		$('#loadvt').click(function(){
			if($("#round_select option:selected").val() == 1){
				$('#rc2, #rc3, #rc4, #rc4_2').remove();
				
				var rs = "<div id='rc1'>"
				rs += "<button class='autoname' id='rc1_obj1'>Hình hiệu vòng thi</button>"
				rs += "<button class='autoname' id='rc1_obj2'>Bắt đầu vòng thi</button>"
				rs += "<p id='rc1_obj3'>Chọn người chơi:</p>"
				rs += "<button class='autoname' id='rc1_obj4' disabled>NC1</button>"
				rs += "<button class='autoname' id='rc1_obj5' disabled>NC2</button>"
				rs += "<button class='autoname' id='rc1_obj6' disabled>NC3</button>"
				rs += "<button class='autoname' id='rc1_obj7' disabled>NC4</button>"
				rs += "<button class='autoname' id='rc1_obj8' disabled>Hiện câu hỏi + Chạy thời gian</button>"
				rs += "<button class='autoname' id='rc1_obj9' disabled>Ẩn câu hỏi</button>"
				rs += "<button class='autoname' id='rc1_obj10' disabled>Hiện đáp án</button>"
				rs += "<button class='autoname' id='rc1_obj11' disabled>Đáp án đúng</button>"
				rs += "<button class='autoname' id='rc1_obj12' disabled>Đáp án sai</button>"
				rs += "<button class='autoname' id='rc1_obj13' disabled>Câu hỏi phụ</button>"
				rs += "<button class='autoname' id='rc1_obj14' disabled>Kết thúc vòng thi</button>"
				rs += "</div>"
				
				$('#round_control_frame').html(rs);
				if(nguoi_choi.length != 0){
					$('#rc1_obj4').html(nguoi_choi[0].LastName);
					$('#rc1_obj5').html(nguoi_choi[1].LastName);
					$('#rc1_obj6').html(nguoi_choi[2].LastName);
					$('#rc1_obj7').html(nguoi_choi[3].LastName);
				}
			}
			if($("#round_select option:selected").val() == 2){
				$('#rc1, #rc3, #rc4, #rc4_2').remove();
				
				var rs = "<div id='rc1'>"
				rs += "<button class='autoname' id='rc2_obj1'>Hình hiệu vòng thi</button>"
				rs += "<button class='autoname' id='rc2_obj2'>Bắt đầu vòng thi</button>"
				rs += "<p id='rc2_obj3'>Chọn người giải nghĩa:</p>"
				rs += "<button class='autoname' id='rc2_obj4' disabled>NC1</button>"
				rs += "<button class='autoname' id='rc2_obj5' disabled>NC2</button>"
				rs += "<button class='autoname' id='rc2_obj6' disabled>NC3</button>"
				rs += "<button class='autoname' id='rc2_obj7' disabled>NC4</button>"
				rs += "<button class='autoname' id='rc2_obj8' disabled>Hiện câu hỏi + Chạy thời gian</button>"
				rs += "<button class='autoname' id='rc2_obj9' disabled>Ẩn câu hỏi</button>"
				rs += "<button class='autoname' id='rc2_obj10' disabled>Đáp án đúng</button>"
				rs += "<button class='autoname' id='rc2_obj11' disabled>Đáp án sai</button>"
				rs += "<button class='autoname' id='rc2_obj12' disabled>Phạm quy</button>"
				rs += "<button class='autoname' id='rc2_obj13' disabled>Câu hỏi phụ</button>"
				rs += "<button class='autoname' id='rc2_obj14' disabled>Kết thúc vòng thi</button>"
				rs += "</div>"
				
				$('#round_control_frame').html(rs);
				if(nguoi_choi.length != 0){
					$('#rc2_obj4').html(nguoi_choi[0].LastName);
					$('#rc2_obj5').html(nguoi_choi[1].LastName);
					$('#rc2_obj6').html(nguoi_choi[2].LastName);
					$('#rc2_obj7').html(nguoi_choi[3].LastName);
				}
			}
			if($("#round_select option:selected").val() == 3){
				$('#rc1, #rc2, #rc4, #rc4_2').remove();
				
				var rs = "<div id='rc3'>"
				rs += "<button class='autoname' id='rc3_obj1'>Hình hiệu vòng thi</button>"
				rs += "<button class='autoname' id='rc3_obj2'>Bắt đầu vòng thi</button>"
				rs += "<button class='autoname' id='rc3_obj3' disabled>Hiện câu hỏi + Chạy thời gian</button>"
				rs += "<button class='autoname' id='rc3_obj4' disabled>Ẩn câu hỏi</button>"
				rs += "<button class='autoname' id='rc3_obj5' disabled>Hiện đáp án</button>"
				rs += "<button class='autoname' id='rc3_obj6' disabled>Đáp án đúng</button>"
				rs += "<button class='autoname' id='rc3_obj7' disabled>Đáp án sai</button>"
				rs += "<button class='autoname' id='rc3_obj8' disabled>Câu hỏi phụ</button>"
				rs += "<button class='autoname' id='rc3_obj9' disabled>Kết thúc vòng thi</button>"
				rs += "</div>"
				
				$('#round_control_frame').html(rs);
			}
			if($("#round_select option:selected").val() == 4){
				$('#rc1, #rc2, #rc3, #rc4_2').remove();
				
				var rs = "<div id='rc4'>"
				rs += "<button class='autoname' id='rc4_obj1'>Hình hiệu vòng thi</button>"
				rs += "<button class='autoname' id='rc4_obj2'>Bắt đầu vòng thi</button>"
				rs += "<button class='autoname' id='rc4_obj3' disabled>Hiện câu hỏi</button>"
				rs += "<button class='autoname' id='rc4_obj4' disabled>Chạy thời gian</button>"
				rs += "<button class='autoname' id='rc4_obj5' disabled>Ẩn câu hỏi</button>"
				rs += "<button class='autoname' id='rc4_obj6' disabled>Bảng thu nhỏ</button>"
				rs += "<button class='autoname' id='rc4_obj7' disabled>Bảng chấm</button>"
				rs += "<button class='autoname' id='rc4_obj8' disabled>Từ hàng dọc</button>"
				rs += "<button class='autoname' id='rc4_obj9' disabled>1</button>"
				rs += "<button class='autoname' id='rc4_obj10' disabled>2</button>"
				rs += "<button class='autoname' id='rc4_obj11' disabled>3</button>"
				rs += "<button class='autoname' id='rc4_obj12' disabled>4</button>"
				rs += "<button class='autoname' id='rc4_obj13' disabled>5</button>"
				rs += "<button class='autoname' id='rc4_obj14' disabled>6</button>"
				rs += "<button class='autoname' id='rc4_obj15' disabled>1</button>"
				rs += "<button class='autoname' id='rc4_obj16' disabled>2</button>"
				rs += "<button class='autoname' id='rc4_obj17' disabled>3</button>"
				rs += "<button class='autoname' id='rc4_obj18' disabled>4</button>"
				rs += "<button class='autoname' id='rc4_obj19' disabled>5</button>"
				rs += "<button class='autoname' id='rc4_obj20' disabled>6</button>"
				rs += "<button class='autoname' id='rc4_obj21' disabled>1</button>"
				rs += "<button class='autoname' id='rc4_obj22' disabled>2</button>"
				rs += "<button class='autoname' id='rc4_obj23' disabled>3</button>"
				rs += "<button class='autoname' id='rc4_obj24' disabled>4</button>"
				rs += "<button class='autoname' id='rc4_obj25' disabled>5</button>"
				rs += "<button class='autoname' id='rc4_obj26' disabled>6</button>"
				rs += "</div>"
				
				$('#round_control_frame').html(rs);
			}
		
			$('.autoname').click(function(){
				var bid = this.id;
				update(ref(db), { [bid] : 1 })
			})
			
			$('#rc1_obj2').click(function(){
				round = 1;
				$('#round').html('Vòng 1');
				update(ref(db), { round : round })
				$('#players_left').html('Còn<br/>4 người');
				played_contestants = 0;
				played_questions = 0;
				update(ref(db), { played_questions : played_questions })
				update(ref(db), { played_contestants : played_contestants })
				if(is_player_1_eliminated == false && is_player_2_eliminated == false && is_player_3_eliminated == false && is_player_4_eliminated == false){
					$('#rc1_obj4, #rc1_obj5, #rc1_obj6, #rc1_obj7').removeAttr("disabled");
				}
				else{
					if(is_player_1_eliminated == true){
						$('#rc1_obj5, #rc1_obj6, #rc1_obj7').removeAttr("disabled");
					}
					else if(is_player_2_eliminated == true){
						$('#rc1_obj4, #rc1_obj6, #rc1_obj7').removeAttr("disabled");
					}
					else if(is_player_3_eliminated == true){
						$('#rc1_obj4, #rc1_obj5, #rc1_obj7').removeAttr("disabled");
					}
					else if(is_player_4_eliminated == true){
						$('#rc1_obj4, #rc1_obj5, #rc1_obj6').removeAttr("disabled");
					}
				}
			})
			$('#rc1_obj4').click(function(){
				$('#rc1_obj4').attr("disabled", true);
				if(played_contestants == 3){
					player_in_game = 1;
					update(ref(db), { player_in_game : player_in_game })
					$('#rc1_obj8').removeAttr("disabled");
				}
				else{
					con.ChonNguoiChoi(1);
					setTimeout(function(){
						$('#rc1_obj8').removeAttr("disabled");
					}, 19000)
				}
        update(ref(db), { is_able_to_input : 0})
			})
			$('#rc1_obj5').click(function(){
				$('#rc1_obj5').attr("disabled", true);
				if(played_contestants == 3){
					player_in_game = 2;
					update(ref(db), { player_in_game : player_in_game })
					$('#rc1_obj8').removeAttr("disabled");
				}
				else{
					con.ChonNguoiChoi(2);
					setTimeout(function(){
						$('#rc1_obj8').removeAttr("disabled");
					}, 19000)
				}
        update(ref(db), { is_able_to_input : 0})
			})
			$('#rc1_obj6').click(function(){
				$('#rc1_obj6').attr("disabled", true);
				if(played_contestants == 3){
					player_in_game = 3;
					update(ref(db), { player_in_game : player_in_game })
					$('#rc1_obj8').removeAttr("disabled");
				}
				else{
					con.ChonNguoiChoi(3);
					setTimeout(function(){
						$('#rc1_obj8').removeAttr("disabled");
					}, 19000)
				}
        update(ref(db), { is_able_to_input : 0})
			})
			$('#rc1_obj7').click(function(){
				$('#rc1_obj7').attr("disabled", true);
				if(played_contestants == 3){
					player_in_game = 4;
					update(ref(db), { player_in_game : player_in_game })
					$('#rc1_obj8').removeAttr("disabled");
				}
				else{
					con.ChonNguoiChoi(4);
					setTimeout(function(){
						$('#rc1_obj8').removeAttr("disabled");
					}, 19000)
				}
        update(ref(db), { is_able_to_input : 0})
			})
			$('#rc1_obj8').click(function(){
				con.ChayDongHo(90);
				$('#tddg, #ttdg').attr("disabled", true);
				$('#tddg').removeAttr("disabled");
				$('#hindc, #aindc').removeAttr("disabled");
				update(ref(db), { is_able_to_input : 1 })
				setTimeout(function(){
					update(ref(db), { is_able_to_input : 0 })
				}, 90000);
				$('#rc1_obj9, #rc1_obj10, #rc1_obj11, #rc1_obj12').removeAttr("disabled");
				played_questions = 14 * played_contestants;
				update(ref(db), { played_questions : played_questions })
				con.ChayCauHoi(1,false);
			})
			$('#rc1_obj11').click(function(){
				con.CongDiemNguoiChoi(1,false);
				if(tiebreak_questions_left == 0 && timer != 0){
					played_questions++;
					if(played_questions >= 14 * (played_contestants + 1)){
						update(ref(db), {
							played_questions : played_questions,
						})
					}
					else{
						update(ref(db), {
							played_questions : played_questions,
							question_changing : 1
						})
					}
					setTimeout(function(){
						con.ChayCauHoi(1,false);
					}, 250)
				}
				else{
					update(ref(db), { player_buzz : 0, is_able_to_buzzer : 0 })
					$('#rc1_obj11, #rc1_obj12').attr("disabled", true);
					$('#rc1_obj9').removeAttr("disabled");
				}
			})
			$('#rc1_obj12').click(function(){
				if(tiebreak_questions_left == 0 && timer != 0){
					played_questions++;
					if(played_questions >= 14 * (played_contestants + 1)){
						update(ref(db), {
							played_questions : played_questions,
						})
					}
					else{
						update(ref(db), {
							played_questions : played_questions,
							question_changing : 1,
						})
					}
					setTimeout(function(){
						con.ChayCauHoi(1,false);
					}, 250)
				}
				else{
					update(ref(db), { player_buzz : 0, pause_timer: 'false', is_able_to_buzzer : 1 })
					$('#rc1_obj9, #rc1_obj10, #rc1_obj11, #rc1_obj12').attr("disabled", true);
				}
			})
			$('#rc1_obj9').click(function(){
				$('#tddg, #ttdg').attr("disabled", true);
				if(tiebreak_questions_left == 0){
					$('#hindc, #aindc').attr("disabled", true);
					player_in_game = 0;
					update(ref(db), { player_in_game : player_in_game })
					if (played_contestants < 4 || played_contestants >= 0){
						played_contestants++;
						update(ref(db), { played_contestants : played_contestants })
					}
					$('#q_text td, #answer').html('');
					setTimeout(function(){
						con.ResetDongHo();
						$('#timer').html('');
					}, 250)
					$('#rc1_obj8, #rc1_obj9, #rc1_obj10, #rc1_obj11, #rc1_obj12').attr("disabled", true);
					if(played_contestants >= 4){
						$('#hbtkd').removeAttr("disabled");
					}
				}
				else{
					update(ref(db), { is_able_to_input : 0 })
					$('#q_text td, #answer').html('');
					setTimeout(function(){
						con.ResetDongHo();
						$('#timer').html('');
					}, 250)
					$('#rc1_obj9, #rc1_obj10').attr("disabled", true);
					tiebreak_questions_left--;
					if(tiebreak_questions_left == 0){
						update(ref(db), { is_playing_tiebreak : 0 })
						con.TimNguoiChoiBiLoai();
						$('#rc1_obj13').attr("disabled", true);
					}
					else{
						$('#rc1_obj13').removeAttr("disabled");
					}
					update(ref(db), { is_able_to_buzzer : 0 })
				}
			})
			$('#rc1_obj13').click(function(){
				$('#rc1_obj13').attr("disabled", true);
				played_questions++;
				update(ref(db), {
					played_questions : played_questions,
					is_playing_tiebreak : 1
				})
				setTimeout(function(){
          update(ref(db), {
            is_able_to_buzzer : 1
				  })
        }, 750);
				setTimeout(function(){
          con.ChayCauHoi(1,true);
        }, 150);
			})
			$('#rc1_obj14').click(function(){
				round = 0;
				dtn = 0;
				update(ref(db), { minimum_score : 0 })
				$('#round, #players_left').html('');
				update(ref(db), { round : round })
				$('#players_left').html('');
				played_contestants = 0;
				played_questions = 0;
				player_1_score = 0;
				player_2_score = 0;
				player_3_score = 0;
				player_4_score = 0;
				update(ref(db), {
					player_1_score : player_1_score,
					player_2_score : player_2_score,
					player_3_score : player_3_score,
					player_4_score : player_4_score
				})
				$('#ss1').html(player_1_score);
				$('#ss2').html(player_2_score);
				$('#ss3').html(player_3_score);
				$('#ss4').html(player_4_score);
				question = '';
				answer = '';
				update(ref(db), {
					played_questions : played_questions,
					played_contestants : played_contestants,
					question: question,
					answer: answer
				})
				$('#rc1_obj14').attr("disabled", true);
			})
			
			$('#rc2_obj2').click(function(){
				round = 2;
				$('#round').html('Vòng 2');
				update(ref(db), { round : round })
				$('#players_left').html('Còn<br/>3 người');
				played_contestants = 0;
				played_questions = 0;
				update(ref(db), { played_questions : played_questions })
				update(ref(db), { played_contestants : played_contestants })
				if(is_player_1_eliminated == false && is_player_2_eliminated == false && is_player_3_eliminated == false && is_player_4_eliminated == false){
					$('#rc2_obj4, #rc2_obj5, #rc2_obj6, #rc2_obj7').removeAttr("disabled");
				}
				else{
					if(is_player_1_eliminated == true){
						$('#rc2_obj5, #rc2_obj6, #rc2_obj7').removeAttr("disabled");
					}
					else if(is_player_2_eliminated == true){
						$('#rc2_obj4, #rc2_obj6, #rc2_obj7').removeAttr("disabled");
					}
					else if(is_player_3_eliminated == true){
						$('#rc2_obj4, #rc2_obj5, #rc2_obj7').removeAttr("disabled");
					}
					else if(is_player_4_eliminated == true){
						$('#rc2_obj4, #rc2_obj5, #rc2_obj6').removeAttr("disabled");
					}
				}
			})
			$('#rc2_obj4').click(function(){
				if(tiebreak_questions_left < 2 && played_questions % 2 == 0 || played_questions == -1){
					player_in_game = 1;
					update(ref(db), { player_in_game : player_in_game })
					$('#rc2_obj4').attr("disabled", true);
					if(tiebreak_questions_left == 0){
						$('#rc2_obj8').removeAttr("disabled");
					}
				}
			})
			$('#rc2_obj5').click(function(){
				if(tiebreak_questions_left < 2 && played_questions % 2 == 0 || played_questions == -1){
					player_in_game = 2;
					update(ref(db), { player_in_game : player_in_game })
					$('#rc2_obj5').attr("disabled", true);
					if(tiebreak_questions_left == 0){
						$('#rc2_obj8').removeAttr("disabled");
					}
				}
			})
			$('#rc2_obj6').click(function(){
				if(tiebreak_questions_left < 2 && played_questions % 2 == 0 || played_questions == -1){
					player_in_game = 3;
					update(ref(db), { player_in_game : player_in_game })
					$('#rc2_obj6').attr("disabled", true);
					if(tiebreak_questions_left == 0){
						$('#rc2_obj8').removeAttr("disabled");
					}
				}
			})
			$('#rc2_obj7').click(function(){
				if(tiebreak_questions_left < 2 && played_questions % 2 == 0 || played_questions == -1){
					player_in_game = 4;
					update(ref(db), { player_in_game : player_in_game })
					$('#rc2_obj7').attr("disabled", true);
					if(tiebreak_questions_left == 0){
						$('#rc2_obj8').removeAttr("disabled");
					}
				}
			})
			$('#rc2_obj8').click(function(){
				con.ChayDongHo(60);
				$('#tddg, #ttdg').attr("disabled", true);
				$('#tddg').removeAttr("disabled");
				$('#rc2_obj9, #rc2_obj12').removeAttr("disabled");
				update(ref(db), { is_able_to_buzzer : 1 })
				con.ChayCauHoi(2,false);
			})
			$('#rc2_obj10').click(function(){
				if(tiebreak_questions_left == 0){
					con.CongDiemNguoiChoi(Math.floor((timer - 1) / 15) + 1,false);
				}
				else{
					con.CongDiemNguoiChoi(1,false);
				}
				con.TamDungDongHo();
				update(ref(db), { player_buzz : 0, is_able_to_buzzer : 0 })
				$('#rc2_obj10, #rc2_obj11, #rc2_obj12').attr("disabled", true);
				$('#rc2_obj9').removeAttr("disabled");
			})
			$('#rc2_obj11').click(function(){
				update(ref(db), { player_buzz : 0, pause_timer: 'false', is_able_to_buzzer : 1 })
				con.TiepTucDongHo();
				$('#rc2_obj10, #rc2_obj11').attr("disabled", true);
			})
			$('#rc2_obj12').click(function(){
				con.TamDungDongHo();
				update(ref(db), { pause_timer: 'true', is_able_to_buzzer : 0 })
				$('#rc2_obj10, #rc2_obj11, #rc2_obj12').attr("disabled", true);
				$('#rc2_obj9').removeAttr("disabled");
			})
			$('#rc2_obj9').click(function(){
				$('#tddg, #ttdg').attr("disabled", true);
				$('#q_text td, #answer').html('');
				setTimeout(function(){
					con.ResetDongHo();
					$('#timer').html('');
				}, 250)
				$('#rc2_obj9, #rc2_obj12').attr("disabled", true);
				if(tiebreak_questions_left != 0){
					tiebreak_questions_left--;
					if(tiebreak_questions_left == 0){
						update(ref(db), { is_playing_tiebreak : 0 })
						con.TimNguoiChoiBiLoai();
						$('#rc2_obj13').attr("disabled", true);
					}
					else{
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
						}
						$('#rc2_obj13').removeAttr("disabled");
					}
				}
				else{
          played_questions++;
					update(ref(db), { played_questions : played_questions })
					if(played_questions % 2 == 0){
						player_in_game = 0;
						update(ref(db), { player_in_game : player_in_game })
						played_contestants++;
						update(ref(db), { played_contestants : played_contestants })
						$('#rc2_obj8').attr("disabled", true);
					}
					if(played_contestants >= 3){
						$('#hbtkd').removeAttr("disabled");
					}
				}
				update(ref(db), { is_able_to_buzzer : 0 })
			})
			$('#rc2_obj13').click(function(){
				$('#rc2_obj13').attr("disabled", true);
				played_questions++;
				update(ref(db), {
					played_questions : played_questions,
					is_able_to_buzzer : 1,
					is_playing_tiebreak : 1
				})
				con.ChayCauHoi(2,true);
			})
			$('#rc2_obj14').click(function(){
				round = 0;
				dtn = 0;
				update(ref(db), { minimum_score : 0 })
				$('#round, #players_left').html('');
				update(ref(db), { round : round })
				$('#players_left').html('');
				played_contestants = 0;
				played_questions = 0;
				player_1_score = 0;
				player_2_score = 0;
				player_3_score = 0;
				player_4_score = 0;
				update(ref(db), {
					player_1_score : player_1_score,
					player_2_score : player_2_score,
					player_3_score : player_3_score,
					player_4_score : player_4_score
				})
				$('#ss1').html(player_1_score);
				$('#ss2').html(player_2_score);
				$('#ss3').html(player_3_score);
				$('#ss4').html(player_4_score);
				question = '';
				answer = '';
				update(ref(db), {
					played_questions : played_questions,
					played_contestants : played_contestants,
					question: question,
					answer: answer
				})
				$('#rc2_obj14').attr("disabled", true);
			})
			
			$('#rc3_obj2').click(function(){
				round = 3;
				$('#round').html('Vòng 3');
				update(ref(db), { round : round })
				$('#players_left').html('Còn<br/>2 người');
				played_contestants = 0;
				played_questions = 0;
				update(ref(db), { played_questions : played_questions })
				update(ref(db), { played_contestants : played_contestants })
				$('#rc3_obj3').removeAttr("disabled");
			})
			$('#rc3_obj3').click(function(){
				update(ref(db), {
					timer : '',
					question: '',
					answer: ''
				})
				setTimeout(function(){
					con.ChayDongHo(30);
					$('#tddg, #ttdg').attr("disabled", true);
					$('#tddg').removeAttr("disabled");
					$('#rc3_obj4, #rc3_obj5').removeAttr("disabled");
					update(ref(db), { is_able_to_buzzer : 1 })
					con.ChayCauHoi(3,false);
				}, 2000);
			})
			$('#rc3_obj6').click(function(){
				con.CongDiemNguoiChoi(1,false);
				con.TamDungDongHo();
				update(ref(db), { player_buzz : 0, is_able_to_buzzer : 0 })
				$('#rc3_obj6, #rc3_obj7').attr("disabled", true);
				$('#rc3_obj4').removeAttr("disabled");
			})
			$('#rc3_obj7').click(function(){
				update(ref(db), { player_buzz : 0, pause_timer: 'false', is_able_to_buzzer : 1 })
				con.TiepTucDongHo();
				$('#rc3_obj6, #rc3_obj7').attr("disabled", true);
			})
			$('#rc3_obj4').click(function(){
				$('#tddg, #ttdg').attr("disabled", true);
				$('#q_text td, #answer').html('');
				played_questions++;
				update(ref(db), { played_questions : played_questions })
				setTimeout(function(){
					con.ResetDongHo();
					$('#timer').html('');
				}, 250)
				if(tiebreak_questions_left == 0){
					$('#rc3_obj4, #rc3_obj5, #rc3_obj6, #rc3_obj7').attr("disabled", true);
					var max = Math.max(player_1_score,player_2_score,player_3_score,player_4_score);
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
					var min = Math.min(...score);
					if((9 - played_questions) - (max - min) < 0 || played_questions == 9){
						con.TimNguoiChoiBiLoai();
						//$('#rc3_obj3').attr("disabled", true);
					}
				}
				else{
					$('#rc3_obj4, #rc3_obj5').attr("disabled", true);
					tiebreak_questions_left--;
					if(tiebreak_questions_left == 0){
						update(ref(db), { is_playing_tiebreak : 0 })
						con.TimNguoiChoiBiLoai();
						$('#rc3_obj8').attr("disabled", true);
					}
					else{
						$('#rc3_obj8').removeAttr("disabled");
					}
					update(ref(db), { is_able_to_buzzer : 0 })
				}
			})
			$('#rc3_obj8').click(function(){
				$('#rc3_obj8').attr("disabled", true);
				played_questions++;
				update(ref(db), {
					played_questions : played_questions,
					is_able_to_buzzer : 1,
					is_playing_tiebreak : 1
				})
				con.ChayCauHoi(3,true);
			})
			$('#rc3_obj9').click(function(){
				round = 0;
				dtn = 0;
				update(ref(db), { minimum_score : 0 })
				$('#round, #players_left').html('');
				update(ref(db), { round : round })
				$('#players_left').html('');
				played_contestants = 0;
				played_questions = 0;
				player_1_score = 0;
				player_2_score = 0;
				player_3_score = 0;
				player_4_score = 0;
				update(ref(db), {
					player_1_score : player_1_score,
					player_2_score : player_2_score,
					player_3_score : player_3_score,
					player_4_score : player_4_score
				})
				$('#ss1').html(player_1_score);
				$('#ss2').html(player_2_score);
				$('#ss3').html(player_3_score);
				$('#ss4').html(player_4_score);
				question = '';
				answer = '';
				update(ref(db), {
					played_questions : played_questions,
					played_contestants : played_contestants,
					question: question,
					answer: answer
				})
				$('#rc3_obj9').attr("disabled", true);
			})
			
			$('#rc4_obj2').click(function(){
				round = 4;
				$('#round').html('Vòng 4');
				update(ref(db), { round : round })
				$('#players_left').html('Còn<br/>1 người');
				played_contestants = 0;
				played_questions = 0;
				if(is_player_1_eliminated == false){
					player_in_game = 1;
				}
				else if(is_player_2_eliminated == false){
					player_in_game = 2;
				}
				else if(is_player_3_eliminated == false){
					player_in_game = 3;
				}
				else if(is_player_4_eliminated == false){
					player_in_game = 4;
				}
				update(ref(db), { played_questions : played_questions })
				update(ref(db), { played_contestants : played_contestants })
				update(ref(db), { player_in_game : player_in_game })
				$('#rc4_obj3').removeAttr("disabled");
        update(ref(db), { dang_choi : 0 })
        update(ref(db), { show_cw_key_col : 0})
			})
      
			$('#rc4_obj3').click(function(){
				var time;
				if(played_questions == 0){
					time = 60;
				}
				else if(played_questions == 1){
					time = 75;
				}
				else if(played_questions == 2){
					time = 90;
				}
        
        update(ref(db), { show_cw_key_col : 0})
				con.LoadCauHoiVong4();
				$('#timer').html(time);
				update(ref(db), { timer : time })
        
				$('#rc4_obj3').attr("disabled", true);
				$('#rc4_obj4, #rc4_obj5').removeAttr("disabled");
        update(ref(db), { dang_choi : 1 })
			})
      
			$('#rc4_obj4').click(function(){
				var time;
				if(played_questions == 0){
					time = 60;
				}
				else if(played_questions == 1){
					time = 75;
				}
				else if(played_questions == 2){
					time = 90;
				}
        
				con.ChayDongHo(time);
        var j = 1;
        for (var i = 1; i <= played_questions + 4; i++) {
          setTimeout(function(){
            con.ChoHienTextCauHoiVong4(j);
            j++;
          }, 15000 * (i - 1))
        }
				$('#tddg, #ttdg').attr("disabled", true);
				//$('#tddg').removeAttr("disabled");
        
				update(ref(db), { is_able_to_input : 1 })
				setTimeout(function(){
					update(ref(db), { is_able_to_input : 0 })
          $('#rc4_obj6, #rc4_obj7').removeAttr('disabled');
        
          da_hoi_xong_vong_4 = 1;
				}, (time * 1000));
        
				$('#rc4_obj4').attr("disabled", true);
			})
      
      $('#rc4_obj6').click(function(){
        if(da_hoi_xong_vong_4 == 1) {
          update(ref(db), { reset_hl_hn : 1})
          da_hoi_xong_vong_4 = 0;
          for(var i = 8; i <= 12 + played_questions; i++) $('#rc4_obj' + i).removeAttr('disabled');
        }
        $('#rc4_obj6').attr("disabled", true);
        $('#rc4_obj7').removeAttr('disabled');
      })
      
      $('#rc4_obj7').click(function(){
        if(da_hoi_xong_vong_4 == 1) {
          update(ref(db), { reset_hl_hn : 1})
          da_hoi_xong_vong_4 = 0;
          for(var i = 8; i <= 12 + played_questions; i++) $('#rc4_obj' + i).removeAttr('disabled');
        }
        $('#rc4_obj7').attr("disabled", true);
        $('#rc4_obj6').removeAttr('disabled');
      })
      
      $('#rc4_obj8').click(function(){
        update(ref(db), { show_cw_key_col : 1 })
        $('#rc4_obj8').attr("disabled", true);
      })
      
      $('#rc4_obj9').click(function(){
        //$('#rc4_obj9').attr("disabled", true);
        $('#rc4_obj15, #rc4_obj21').removeAttr('disabled');
      })
      
      $('#rc4_obj10').click(function(){
        //$('#rc4_obj10').attr("disabled", true);
        $('#rc4_obj16, #rc4_obj22').removeAttr('disabled');
      })
      
      $('#rc4_obj11').click(function(){
        //$('#rc4_obj11').attr("disabled", true);
        $('#rc4_obj17, #rc4_obj23').removeAttr('disabled');
      })
      
      $('#rc4_obj12').click(function(){
        //$('#rc4_obj12').attr("disabled", true);
        $('#rc4_obj18, #rc4_obj24').removeAttr('disabled');
      })
      
      $('#rc4_obj13').click(function(){
        //$('#rc4_obj13').attr("disabled", true);
        $('#rc4_obj19, #rc4_obj25').removeAttr('disabled');
      })
      
      $('#rc4_obj14').click(function(){
        //$('#rc4_obj14').attr("disabled", true);
        $('#rc4_obj20, #rc4_obj26').removeAttr('disabled');
      })
      
      $('#rc4_obj15').click(function(){
        con.ChoHienDapAnHangNgangVong4(1);
        $('#rc4_obj15, #rc4_obj21').attr("disabled", true);
      })
      
      $('#rc4_obj16').click(function(){
        con.ChoHienDapAnHangNgangVong4(2);
        $('#rc4_obj16, #rc4_obj22').attr("disabled", true);
      })
      
      $('#rc4_obj17').click(function(){
        con.ChoHienDapAnHangNgangVong4(3);
        $('#rc4_obj17, #rc4_obj23').attr("disabled", true);
      })
      
      $('#rc4_obj18').click(function(){
        con.ChoHienDapAnHangNgangVong4(4);
        $('#rc4_obj18, #rc4_obj24').attr("disabled", true);
      })
      
      $('#rc4_obj19').click(function(){
        con.ChoHienDapAnHangNgangVong4(5);
        $('#rc4_obj19, #rc4_obj25').attr("disabled", true);
      })
      
      $('#rc4_obj20').click(function(){
        con.ChoHienDapAnHangNgangVong4(6);
        $('#rc4_obj20, #rc4_obj26').attr("disabled", true);
      })
      
      $('#rc4_obj21').click(function(){
        con.ChoHienDapAnHangNgangVong4(1);
        $('#rc4_obj15, #rc4_obj21').attr("disabled", true);
      })
      
      $('#rc4_obj22').click(function(){
        con.ChoHienDapAnHangNgangVong4(2);
        $('#rc4_obj16, #rc4_obj22').attr("disabled", true);
      })
      
      $('#rc4_obj23').click(function(){
        con.ChoHienDapAnHangNgangVong4(3);
        $('#rc4_obj17, #rc4_obj23').attr("disabled", true);
      })
      
      $('#rc4_obj24').click(function(){
        con.ChoHienDapAnHangNgangVong4(4);
        $('#rc4_obj18, #rc4_obj24').attr("disabled", true);
      })
      
      $('#rc4_obj25').click(function(){
        con.ChoHienDapAnHangNgangVong4(5);
        $('#rc4_obj19, #rc4_obj25').attr("disabled", true);
      })
      
      $('#rc4_obj26').click(function(){
        con.ChoHienDapAnHangNgangVong4(6);
        $('#rc4_obj20, #rc4_obj26').attr("disabled", true);
      })
      
      $('#rc4_obj5').click(function(){
        
				con.ResetDongHo();
				$('#tddg, #ttdg').attr("disabled", true);
				$('#timer').html('');
        
				$('#rc4_obj5').attr("disabled", true);
        
				$('#rc4 button').attr("disabled", true);
				$('#rc4_obj1, #rc4_obj2').removeAttr("disabled");
				//$('#tddg').removeAttr("disabled");
        
        played_questions++
        update(ref(db), { played_questions : played_questions })
        
        if(played_questions <= 2){
          $('#rc4_obj3').removeAttr("disabled");
        }
        
        con.ResetCauHoiVong4()
        update(ref(db), { show_cw_key_col : 0})
        
        update(ref(db), { dang_choi : 0 })
        
      })
      
      /*
			$('#rc4_obj6').click(function(){
				$('#rc4_obj6').attr("disabled", true);
				$('#rc4_obj7, #rc4_obj8').removeAttr("disabled");
			})
			$('#rc4_obj7').click(function(){
				con.CongDiemNguoiChoi(1,false);
			})
			$('#rc4_obj4').click(function(){
				$('#tddg, #ttdg').attr("disabled", true);
				$('#q_text td, #answer').html('');
				setTimeout(function(){
					con.ResetDongHo();
					$('#timer').html('');
				}, 250)
				var score = 0;
				if(is_player_1_eliminated == false){
					score = player_1_score;
				}
				if(is_player_2_eliminated == false){
					score = player_2_score;
				}
				if(is_player_3_eliminated == false){
					score = player_3_score;
				}
				if(is_player_4_eliminated == false){
					score = player_4_score;
				}
				if(score == (played_questions + 5)){
					played_questions++;
					update(ref(db), { played_questions : played_questions })
					$('#rc4_obj3').removeAttr("disabled");
				}
				player_1_score = 0;
				player_2_score = 0;
				player_3_score = 0;
				player_4_score = 0;
				update(ref(db), {
					player_1_score : player_1_score,
					player_2_score : player_2_score,
					player_3_score : player_3_score,
					player_4_score : player_4_score
				})
				$('#ss1').html(player_1_score);
				$('#ss2').html(player_2_score);
				$('#ss3').html(player_3_score);
				$('#ss4').html(player_4_score);
				$('#rc4_obj4, #rc4_obj5, #rc4_obj6, #rc4_obj7, #rc4_obj8').attr("disabled", true);
			})*/
			
			$('#hbtkd').click(function(){
				$('#hd1, #hd2, #hd3, #hd4').removeAttr("disabled");
				$('#hbtkd').attr("disabled", true);
				$('#abtkd').removeAttr("disabled");
				if(is_player_1_eliminated == true){
					$('#hd1').attr("disabled", true);
				}
				else if(is_player_2_eliminated == true){
					$('#hd2').attr("disabled", true);
				}
				else if(is_player_3_eliminated == true){
					$('#hd3').attr("disabled", true);
				}
				else if(is_player_4_eliminated == true){
					$('#hd4').attr("disabled", true);
				}
				con.TimNguoiChoiBiLoai();
			})
			$('#hd1').click(function(){
				$('#hd1').attr("disabled", true);
			})
			$('#hd2').click(function(){
				$('#hd2').attr("disabled", true);
			})
			$('#hd3').click(function(){
				$('#hd3').attr("disabled", true);
			})
			$('#hd4').click(function(){
				$('#hd4').attr("disabled", true);
			})
			$('#lnc').click(function(){
				if(eli_player_temp == 1){
					is_player_1_eliminated = true;
					update(ref(db), { is_player_1_eliminated : 1 })
					$('#sn1, #ss1').css('background-color', 'gray');
					$('#rc2_obj4, #hd1').attr("disabled", true);
				}
				else if(eli_player_temp == 2){
					is_player_2_eliminated = true;
					update(ref(db), { is_player_2_eliminated : 1 })
					$('#sn2, #ss2').css('background-color', 'gray');
					$('#rc2_obj5, #hd2').attr("disabled", true);
				}
				else if(eli_player_temp == 3){
					is_player_3_eliminated = true;
					update(ref(db), { is_player_3_eliminated : 1 })
					$('#sn3, #ss3').css('background-color', 'gray');
					$('#rc2_obj6, #hd3').attr("disabled", true);
				}
				else if(eli_player_temp == 4){
					is_player_4_eliminated = true;
					update(ref(db), { is_player_4_eliminated : 1 })
					$('#sn4, #ss4').css('background-color', 'gray');
					$('#rc2_obj7, #hd4').attr("disabled", true);
				}
				eli_player_temp = 0;
				$('#rc1_obj14, #rc2_obj14, #rc3_obj9').removeAttr("disabled");
				$('#lnc').attr("disabled", true);
			})
			$('#abtkd').click(function(){
				$('#abtkd').attr("disabled", true);
			})
			
			$('#tddg').click(function(){
				con.TamDungDongHo();
				update(ref(db), { pause_timer : 'true' });
				$('#tddg').attr("disabled", true);
				$('#ttdg').removeAttr("disabled");
			})
			$('#ttdg').click(function(){
				con.TiepTucDongHo();
				update(ref(db), { pause_timer : 'false' });
				$('#ttdg').attr("disabled", true);
				$('#tddg').removeAttr("disabled");
			})
			
			$('#bbcch').click(function(){
				forced_question = 1;
				ftp_question = $('#chti').val();
				ftp_answer = $('#dati').val();
			})
		})
	}(window.VTVCGV = window.VTVCGV || {}));
});
