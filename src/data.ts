/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Character } from './types';

/**
 * HƯỚNG DẪN THAY ĐỔI DỮ LIỆU NHÂN VẬT (DÀNH CHO CREATOR SHIN):
 * Bạn có thể dễ dàng sửa, thêm hoặc xóa bớt nhân vật ở đây.
 * Mỗi nhân vật có các trường thông tin sau:
 * - id: Mã định danh duy nhất (ví dụ: 'char-1', 'char-2')
 * - name: Tên của nhân vật chatbot
 * - title: Biệt danh / Tiêu đề mô tả ngắn gọn về nhân vật
 * - avatar: Link ảnh đại diện (Nên dùng link ảnh Unsplash hoặc link ảnh trực tiếp dạng https://...)
 * - roleplayLink: Đường dẫn liên kết đến chatbot Roleplay thực tế của bạn
 * - storyText: Cốt truyện / Lời chào / Bối cảnh sâu sắc để thu hút người chơi
 * - genre: Long tộc / Thể loại (Phân loại: 'TXVT', 'Hắc Bang', 'Thần Thoại', 'Cổ Điển')
 * - taste: Trải nghiệm long vị (Phân loại: 'Ngọt', 'Ngược', 'Sủng', 'Ngọt xen đau')
 * - statusType: Phân loại rồng (Phân loại: 'Mới', 'Yêu Thích', 'Kỳ Cựu')
 * - likes: Số lượt thả tim ban đầu hiển thị trên card
 */

export const INITIAL_CHARACTERS: Character[] = [
  {
    id: "char_001",
    name: "Trình Dĩ Phàm",
    title: "Học bá top 1 x Nữ sinh yêu thầm",
    avatar: "https://i.ibb.co/RTHMYBqm/TA-2026-07-20-21-20-03-artist-ma-65538540.png",
    roleplayLink: "https://aistudio.google.com/prompts/1AXBtrJfodmEgRBujw2BEYMnYef8IXL2x",
    storyText: `Có những người sinh ra đã là ánh sáng.
{{user}} hiểu điều đó từ rất lâu rồi — từ cái ngày đầu tiên cô bước vào lớp 12A, nhìn quanh một lượt, và nhận ra rằng mình không phải kiểu người mà người ta sẽ nhớ tên sau buổi học đầu tiên.
Không sao. Cô đã quen rồi.
---
Lớp 12A của trường Trung học Thực nghiệm Nhất Trung là lớp chọn — điều đó có nghĩa là ngồi đây, ai cũng có *thứ gì đó*. Người thì giỏi Toán đến mức giáo viên phải đặt đề riêng, người thì viết văn hay đến mức bài được đọc trước toàn trường, người thì hoạt động xã hội đến mức cả khối đều biết mặt.
Còn {{user}}?
{{user}} học được, không đến nỗi nào. Không có môn nào tệ, cũng không có môn nào xuất sắc. Điểm số của cô cứ chênh vênh ở cái vùng đủ yên tâm nhưng không đủ để ai chú ý — như một nốt nhạc lọt thỏm giữa bản giao hưởng, không sai, nhưng cũng chẳng ai nhớ đến.
Bình thường. Hai chữ đó bám vào cô như một cái bóng.
*Bình thường.*
Cô đã thử tự nhủ rằng bình thường cũng có cái hay của nó. Bình thường nghĩa là không ai kỳ vọng quá nhiều. Bình thường nghĩa là được phép mắc lỗi mà không ai để ý. Nhưng cũng chính vì thế — bình thường nghĩa là vô hình.
Và trong một lớp học có Trình Dĩ Phàm ngồi ở bàn thứ ba từ cửa sổ đếm vào, sự vô hình đó đôi khi đau hơn cô tưởng.
---
Trình Dĩ Phàm.
{{user}} không nhớ mình bắt đầu để ý đến cậu từ hồi nào nữa. Hình như là từ năm lớp tám, trong một buổi chiều mưa, khi cô vô tình nhìn qua cửa sổ hành lang và thấy cậu đứng một mình ở mái hiên sân bóng — không điện thoại, không sách, chỉ ngước nhìn mưa với một bên tai nghe không dây cài vào tai, tóc hơi ẩm, áo đồng phục chưa kịp cài cúc trên cùng.
Lúc đó cô không hiểu tại sao mình dừng lại.
Bây giờ thì cô hiểu rồi. Chỉ là hiểu rồi cũng chẳng làm được gì.
Trình Dĩ Phàm đứng nhất khối đã mấy năm liền, đều đặn như mặt trời mọc — và cũng như mặt trời, cậu tỏa sáng theo cái cách mà không cần phải cố, không cần phải để ý xem có ai đang nhìn không. Cậu cao, vai rộng, đôi mắt một mí với đuôi mắt hơi xếch tạo cảm giác vừa lười biếng vừa sắc bén — kiểu ánh mắt mà khi nó thật sự nhìn vào ai đó, người đó sẽ có cảm giác mình vừa bị đọc như một trang sách vậy.
Cậu không nói nhiều. Nhưng khi cậu nói, người ta nghe.
Cậu không cần cố gắng để được chú ý. Sự có mặt của cậu trong một căn phòng tự nó đã là một thứ gì đó — như áp suất khí quyển thay đổi, như nhiệt độ tăng lên vài độ mà không ai giải thích được vì sao. {{user}} đã mất một thời gian dài mới thôi để ý đến điều đó mỗi khi cậu bước vào lớp.
Thật ra là cô chưa bao giờ thôi cả. Cô chỉ học cách không để lộ ra ngoài mà thôi.
Vì có những thứ, ngay cả khi cô hiểu rõ ràng là mình không với tới, cô vẫn không thể bắt mắt mình nhìn đi chỗ khác, như nhìn lên mặt trời — biết là chói, biết là sẽ hoa mắt, nhưng vẫn ngước lên.
Trình Dĩ Phàm với {{user}} — cô nghĩ đó là khoảng cách giữa người đứng giữa sân và người đứng ở rìa khung hình. Cả hai đều ở trong cùng một bức ảnh, nhưng không ai nhìn vào rìa cả khi mà giữa sân đang có ánh sáng.
---
Người duy nhất trong lớp mà {{user}} thật sự ngưỡng mộ, ngoài Trình Dĩ Phàm — theo một cách hoàn toàn khác — là Giang Ánh Nguyệt.
Nếu Trình Dĩ Phàm là người mà {{user}} nhìn với cảm giác lòng bộn bề không gọi được thành tên, thì Giang Ánh Nguyệt là người mà cô nhìn với sự ngưỡng mộ thuần túy, sạch sẽ và không hề lẫn lộn.
Giang Ánh Nguyệt đứng nhì khối. Đứng nhì — sau Trình Dĩ Phàm.
Cả lớp hay trêu là hai người đó "trời sinh một cặp", rằng thế nào cũng đến lúc học bá thứ nhất và học bá thứ hai sẽ tự động trở thành một chuyện tình đẹp như phim. Cứ mỗi lần Giang Ánh Nguyệt nộp bài trước Trình Dĩ Phàm vài phút, hay mỗi lần kết quả kiểm tra được dán lên bảng và hai cái tên đó lại sát nhau như hình với bóng, y như rằng cả lớp lại rộn lên, lại có người huých tay người bên cạnh mà cười.
Nhưng {{user}} không nghĩ theo kiểu vậy.
Không phải vì cô ghen — dù cô không dám thề hoàn toàn không có chút gì. Mà vì cô *thấy* Giang Ánh Nguyệt. Thật sự thấy, không phải nhìn qua lớp kính của những lời đùa cợt hời hợt.
Cô thấy Ánh Nguyệt đến trường sớm hơn tất cả mọi người, ngồi ôn bài trong khi sân trường còn vắng tanh. Thấy Ánh Nguyệt không bao giờ mua đồ ăn căng-tin mà luôn mang theo cơm hộp, đậy kín, không phải vì thói quen mà vì lý do khác mà cô đoán được nhưng không nói ra. Thấy Ánh Nguyệt ghi chép tỉ mỉ đến từng chữ, dùng bút màu chia mục cẩn thận — không phải để trình bày đẹp, mà để tiết kiệm tối đa thời gian khi ôn lại bài.
Ánh Nguyệt không học để ganh đua với Trình Dĩ Phàm vì cô thích cậu. Cô ganh đua vì đó là con đường duy nhất cô có.
{{user}} hiểu điều đó. Và cô kính trọng Ánh Nguyệt vì điều đó — theo cái cách mà người ta kính trọng một ngọn lửa cháy giữa gió lớn.
---
Hôm đó là một buổi sáng thứ Tư bình thường.
Hay ít nhất là bình thường cho đến khi {{user}} nhìn xuống và thấy đế giày của Giang Ánh Nguyệt.
Cả lớp đang chuẩn bị xuống sân tập thể dục. Ghế kéo, bàn xô, tiếng cười đùa ồn ào vang khắp phòng. {{user}} đứng dậy vươn vai, cô vô tình nhìn xuống.. và khựng lại.
Đế giày của Ánh Nguyệt bên trái đã bung ra một góc. Không phải mới bung, trông có vẻ như đã bong từ mấy hôm trước và được ép lại bằng một cách nào đó, nhưng giờ thì không giữ được nữa. Mỗi bước Ánh Nguyệt đi, góc đế đó lại khẽ há ra rồi khép lại, như cái miệng không nói được thành lời.
Ánh Nguyệt biết. Tất nhiên là cô biết. Nhưng cô không nhìn xuống, không nhìn xung quanh, cứ thẳng lưng mà bước theo dòng người ra cửa.
{{user}} định lên tiếng, nhưng rồi lại thôi.
Ánh Nguyệt sẽ không muốn ai biết đâu. Cô chắc điều đó.
Giờ thể dục, cả lớp xuống dưới sân, giáo viên thể dục đang điểm danh từng người.
"Giang Ánh Nguyệt?"
Không có tiếng trả lời.
Thầy nhíu mày, đảo mắt một lượt quanh sân. Xung quanh {{user}}, mấy đứa bạn ngơ ngác nhìn nhau, người thì nhún vai, người thì quay đi — không phải vì ác ý, chỉ đơn giản là không ai thật sự để tâm. Giang Ánh Nguyệt không thân với ai, và sự vắng mặt của cô cũng nhẹ như sự có mặt, không để lại dấu vết gì trong buổi sáng bận rộn của người khác.
"Không ai biết à?"
Cả lớp im phăng phắc.
{{user}} cắn môi.
Cô biết. Cô biết có thể Ánh Nguyệt đang ở trên đó, ở một mình và cô ấy đang cố dán lại đôi giày bằng keo 502 với cái tự trọng không cho phép cô ấy để ai nhìn thấy. Và cô biết nếu thầy lên kiểm tra, mọi thứ sẽ trở nên rất khó xử cho Ánh Nguyệt — không phải vì kỷ luật, mà vì cái nhìn của thầy giáo và các bạn học sau đó.
Nhưng vốn dĩ, {{user}} không phải người hay lên tiếng. Cô không phải kiểu người mà cả lớp nhìn vào khi cần ai đó đứng ra. Cô chỉ là... cô thôi. Bình thường, nhút nhát, hay để người khác nói trước.
Nhưng bây giờ không có ai nói trước cả.
Trái tim cô đập nhanh hơn một chút. Cô không chắc mình sẽ nói trơn tru, không chắc thầy có tin không, không chắc bất cứ điều gì, nhưng cô đã quyết định giơ tay lên.
Ngập ngừng. Rồi thẳng hơn.
"Dạ thưa thầy.." Giọng cô hơi nhỏ hơn mong muốn, nhưng đủ để thầy nghe, "Bạn Ánh Nguyệt đau bụng ạ. Bạn đang ở phòng y tế và có nhờ em xin thầy hộ ạ."
Thầy nhìn cô một giây — {{user}} cố giữ ánh mắt thẳng, không để tay mình run — rồi thầy gật đầu, ghi vào sổ, và tiếp tục điểm danh các bạn khác.
Vậy là xong.
{{user}} thở ra, khẽ đến mức không ai nghe thấy. Lòng bàn tay cô hơi ẩm.
Cô không biết Ánh Nguyệt có cần mình làm vậy không. Có thể Ánh Nguyệt sẽ tự xoay xở được. Có thể cô ấy sẽ không cảm ơn, sẽ không biết, sẽ không bao giờ biết. Nhưng cái ý nghĩ để yên mà đi xuống sân, để mặc Ánh Nguyệt một mình trên đó, giữa cái im lặng không ai buồn phá vỡ, cô không làm được.
Ít nhất thì mình đã làm gì đó. Dù nhỏ. Dù vô hình. Dù chẳng ai nhìn thấy kể cả người được giúp.
Đôi khi chừng đó là đủ rồi.
Giờ ra chơi.
{{user}} đang đứng ở hành lang, mắt lơ đãng nhìn xuống sân trường, đầu óc thả trôi theo tiếng ồn xa xa, thì nghe thấy tiếng bước chân dừng lại ngay sau lưng mình.
"Này."
{{user}} quay lại.
Trình Dĩ Phàm đứng cách cô chừng một bước rưỡi, tay cầm một chiếc hộp — dài, trắng, có logo thương hiệu mà liếc qua cô cũng đủ biết không rẻ. Cậu không tựa tường, không bỏ tay vào túi. Chỉ đứng đó, bình thản, nhưng lần này cô nhận ra có gì đó khác với cái bình thản thường ngày của cậu. Nhẹ hơn. Không phải xa cách.
"Cậu có quen với Giang Ánh Nguyệt không?"
Giọng cậu trầm, bình thường, không phải câu hỏi thăm dò, chỉ là hỏi thật, như người ta hỏi thời tiết hôm nay thế nào.
{{user}} chớp mắt. "À... có quen, nhưng cũng không thân lắm—"
Cậu gật đầu nhẹ, như thể câu trả lời đó là đủ rồi. Mắt cậu nhìn xuống chiếc hộp trong tay một giây, rồi nhìn lên cô.
"Tôi thấy trong lớp cậu hay để ý đến cô ấy." Không phải lời khen, không phải nhận xét, chỉ là cậu nói điều cậu quan sát được, vẫn bình thản như vậy. "Giày của Ánh Nguyệt bị hỏng. Tôi muốn nhờ cậu đưa giúp, nếu cậu thấy tiện."
Cậu đưa chiếc hộp về phía {{user}}, cậu không dúi vào tay, cũng không ép, cậu chỉ đưa chiếc hộp ra và chờ.
"Cậu làm được không?"
Chỉ có vậy thôi. Bốn chữ, hỏi thật, chờ thật.
{{user}} nhìn chiếc hộp, rồi nhìn lên mặt cậu.
Đôi mắt một mí của cậu đang nhìn cô — không sắc bén như lúc cậu đang giải một bài toán khó, cũng không lạnh như lúc cậu không muốn bị làm phiền. Chỉ là bình thường. Cậu đang chờ đợi. Ngón tay cái cậu khẽ miết lên ngón trỏ một nhịp rồi thôi — thoáng qua, rất nhẹ, chắc ngay cả cậu cũng không nhận ra điều đó.
Cô chợt hiểu tại sao cậu không tự đưa. Vì đưa thẳng thì Ánh Nguyệt sẽ không nhận. Vì Ánh Nguyệt có cái tự trọng mà người ta không thể chạm vào một cách vụng về. Cậu biết điều đó. Cậu tính đến điều đó, và còn tính đến cả chuyện phải tìm đúng người đứng giữa, phải làm sao cho cô ấy giữ được thể diện.
Trình Dĩ Phàm để ý đến Ánh Nguyệt theo cái cách mà hiểu được cả điều người ta không nói ra.
Trong lồng ngực {{user}}, có gì đó lặng lẽ thắt lại. Cô biết điều này rồi mà, rằng ánh mắt cậu sẽ hướng về phía rực rỡ và mạnh mẽ, về phía xứng với cậu. Biết từ trước rồi.
Nhưng biết và thấy tận mắt — vẫn là hai chuyện khác nhau hoàn toàn.
Cô nhìn xuống chiếc hộp giày một lần nữa, rồi nhìn lên.
"Đừng nói là tôi đưa."
Cậu nói thêm câu đó, cậu nói khẽ, bình thản, như một điều kiện nhỏ đính kèm vào lời nhờ vả. Nghe không giống ra lệnh. Nghe giống như cậu đang tin tưởng cô giữ điều này.
{{user}} thở ra thật nhẹ.
Ít nhất thì mình vẫn còn hữu ích được.
Dù chỉ là theo cái cách này.
"Cậu làm được không? "`,
    worldTag: "TXVT",
    aftertasteTag: "Yêu Thầm",
    statusTag: "Kỳ Cựu",
    likes: 1,
    genre: "TXVT",
    taste: "Yêu Thầm",
    statusType: "Kỳ Cựu",
    isNew: false,
    isHot: true,
    isComingSoon: false,
    birthday: "05/09",
    birthdayImage: "",
    age: 18,
    worldCategory: ["TXVT", "Hiện Đại"],
    moodCategory: ["Yêu Thầm", "Slow Burn"],
    hashtags: ["UserYêuThầm", "TinhTế", "HọcBá"],
    creatorPick: true,
    releaseDate: ""
  },
  {
    id: "char_002",
    name: "Yến Bắc Thần",
    title: "Thương gia hắc đạo x Nữ hầu thế thân",
    avatar: "https://i.ibb.co/8gjwDNCp/Yen-Bac-Than.jpg",
    roleplayLink: "https://aistudio.google.com/prompts/1LXVS_3D5Zvsjq-eOMw0QGIzMCO1H8Pxf",
    storyText: `Người đời đồn thương nhân hắc đạo Đế Đô — Yến Bắc Thần — là một lão già, hành tung bí ẩn, không ai từng trông thấy hình dạng thật của hắn. Từ lúc lên ngôi yên vị đến nay đã tám năm trời, không ai dám tranh chấp chia phần giằng xé, không ai dám thò tay vào phần mà hắn đã đặt dấu ấn xuống.
Cho đến gần đây nhất.
Qua một trận chiến ngầm dưới lưỡi đao tàn khốc và mạng người rải rác khắp nơi, Yến Bắc Thần bị kẻ thân cận lâu năm — người đã ẩn giấu lớp ngụy trang suốt nhiều năm, đồng hành cùng hắn qua bao nhiêu ngày tháng — hãm hại. Dù thoát được mạng sống dưới làn đạn như bão, dù cơ thể hắn vẫn còn thở, vẫn còn đứng thẳng được — đôi mắt hắn đã không còn nhìn thấy đường nữa. Di chứng từ loại độc tố kỳ lạ mà lũ ám sát sử dụng ăn sâu vào dây thần kinh thị giác, để lại trong hắn một khoảng tối đen hoàn toàn không thể xuyên thủng.
Tin đồn về điều đó lan ra nhanh hơn bất kỳ ai ngờ tới.
Vì mù, các thế lực thù địch bắt đầu vây hãm lấn át với mục đích tệ hại. Nội bộ Yến Gia rục rịch — người trong gia tộc liên tục lời ngon tiếng ngọt, hòng gài người bên cạnh để triệt hạ hắn từ bên trong, cướp lấy chủ vị từ bàn tay đang yếu đi của hắn. Bề ngoài lũ kẻ thù vẫn nhu thuận, vẫn cúi đầu khi gặp mặt, nhưng thực chất đang âm thầm lên kế hoạch, chờ hắn ngã xuống.
Yến Bắc Thần biết tất cả. Hắn tồn tại quá lâu trong cái giới cạm bẫy và lòng dạ hiểm độc này, những ý đồ mượn đao giết người như thế kia không có gì là xa lạ. Nhưng hắn đang ở thế yếu, và hắn cần thời gian.
Tay sai đắc lực Khương Dực nảy ra kế sách: để tránh người trong gia tộc cài người bên cạnh chủ nhân theo dõi và ra tay, cần một kẻ hầu từ bên ngoài — người không có lý do phản bội, không có chỗ đứng trong thế giới ngầm để bị mua chuộc hay ép buộc. Một kẻ không liên quan đến bất kỳ thế lực nào, chỉ đơn thuần là phục vụ.
Hắn nhắm đến Vân Gia — gia tộc đang mang số nợ lớn với Yến Gia từ nhiều năm trước, tưởng đã chìm vào dĩ vãng không ai nhắc lại. Điều kiện được đưa ra thẳngắn và không có chỗ để mặc cả: đem đại tiểu thư sang hầu hạ chủ nhân, đổi lấy xóa sạch món nợ bấy lâu nay.
Vân Linh Thanh — đại tiểu thư Vân Gia — nghe tin đồn Y�"Sai bảo nữ nhân xuất hiện trong phòng tôi đêm qua lên lầu."
---
Đã hơn mười một giờ khuya.
Phòng ngủ chung của các nữ hầu chìm trong yên tĩnh, hơi thở đều đặn của từng người hòa vào nhau tạo thành thứ tĩnh lặng mỏng manh của đêm muộn. {{user}} vừa mới chìm vào giấc ngủ không bao lâu, bộ váy ngủ dài màu trắng, mái tóc dài chưa kịp cột, toàn thân vẫn còn mang theo cái mệt mỏi chưa tan hết của ngày hôm qua.
Thì tiếng gõ cửa vang lên.
Không ai trong số các nữ hầu dám cựa quậy mạnh. Cánh cửa mở ra, ánh đèn hành lang tràn vào, trưởng quản Tần Bá bước vào phòng, bật đèn lên không một lời báo trước, ánh mắt ông quét qua từng người một.
"Đại tiểu thư Vân Gia đâu?"
Cả phòng im lặng. Các nữ hầu cúi đầu xuống đồng loạt, không ai dám lên tiếng, không ai dám nhìn lên.
{{user}} nghe thấy danh xưng đó — danh xưng cô đang mang theo như một lớp vỏ không vừa vặn — và ngồi dậy trong bóng tối. Cô xỏ giày, đứng lên, bước theo Tần Bá ra khỏi phòng mà không dám hỏi một câu nào. Mái tóc dài buông xõa xuống lưng, váy ngủ trắng phất phơ theo từng bước chân trong hành lang vắng lặng đêm khuya — trông cô chẳng khác gì một thiên sứ nhỏ bị dẫn đi theo hướng sai.
Tim cô đập nhanh hơn mỗi bước chân tiến về phía tòa biệt thự trung tâm phía sau.
Cô biết nơi đó là gì. Cô đã từng đứng trước cánh cửa mạ kim loại đó đêm qua, đã từng bị siết cổ trong bóng tối, đã từng nằm im trong vòng tay của một người đàn ông xa lạ đến tận khi trời sáng, và cô không ngờ đêm nay mình lại bị gọi trở lại.
Bàn tay cô bấm chặt vào nhau, đôi môi nhỏ không ngừng cắn.
Khi đến nơi, Khương Dực đang đứng trước cánh cửa mạ kim loại, ánh mắt hắn nhìn cô từ trên xuống dưới một lượt, xác nhận đúng người rồi mới gõ nhẹ lên cánh cửa.
"Vào đi."
Giọng nói lạnh, ngắn, quen thuộc đến mức cô muốn lùi bước. Chỉ hai chữ đó thôi nhưng đủ để cô nhận ra ngay — đây là người đàn ông đêm qua siết cổ cô như muốn tắt thở, rồi sau đó ôm cô suốt đêm để ngủ.
Khương Dực mở cửa và đẩy cô vào. Tiếng đóng cửa vang lên phía sau lưng dứt khoát.
---
Căn phòng tối om. Chỉ có ánh đèn mờ từ góc xa hắt qua cửa kính, loang một vệt vàng nhạt lên nền đá lạnh lẽo, đủ để thấy bóng dáng người đàn ông đang di chuyển về phía cô, từng bước chân chắc chắn trong bóng tối dù đôi mắt không nhìn thấy gì. Thân hình cao lớn vạm vỡ đổ bóng xuống sàn, tấm lưng rộng vẫn để trần, hình rồng đen xăm kín thân người mờ dần trong ánh đèn yếu ớt.
Hắn dừng lại ở khoảng cách vừa đủ. Yến Bắc Thần không nhìn thấy, nhưng biết chính xác cô đứng ở đâu.
"Tới rồi à."
Không phải câu hỏi. Chỉ là một xác nhận lạnh lùng, giọng trầm khàn của hắn vang lên trong không gian yên tĩnh như tiếng đá rơi xuống nước đêm khuya.
Cô chưa kịp phản ứng. Cơ thể cô nhẹ bẫng, bị kéo thẳng vào lồng ngực ấm áp của Yến Bắc Thần, nhanh đến mức cô không kịp lùi, không kịp né tránh. Người đàn ông ôm cô chặt vào lòng, đầu dụi vào hõm cổ nhỏ nhắn, hơi thở nóng rẫy phả xuống da cô — cử chỉ của hắn tự nhiên đến mức kỳ quái, như thể đây không phải lần đầu, như thể đây là hành động hắn đã làm ngàn lần rồi.
{{user}} hoảng loạn, hai bàn tay đặt lên lồng ngực hắn đẩy ra.
"Ngài muốn làm gì—"
"Im lặng để tôi ôm."
Giọng hắn trầm, khàn, nhưng lần này không mang sát khí như đêm qua. Không phải mệnh lệnh của kẻ sắp ra tay.
"Tôi không làm gì em."
Rồi hắn cắn nhẹ lên bả vai cô ra lệnh im lặng.
{{user}} cắn môi. Tay buông ra. Người cô đứng im trong vòng tay đó, không dám làm phản thêm, không phải vì cô tin hắn, mà vì mạng cô hiện tại đều trong tay người đàn ông này. Cô biết điều đó rõ hơn ai hết.
Ngay từ khoảnh khắc {{user}} bước qua ngưỡng cửa, Yến Bắc Thần đã cảm nhận được, dù ở khoảng cách xa, dù căn phòng tối đen và đôi mắt hắn không còn phân biệt được sáng tối. Mùi hương quen thuộc đêm qua thoang thoảng đến. Và mọi tế bào trong cơ thể hắn — vài phút trước còn căng cứng, còn bị thứ gì đó vô hình siết chặt từ bên trong — phút chốc dịu lại hoàn toàn. Cơn đau đầu hành hạ hắn từ chiều đến giờ, từ lúc buổi điều trị kết thúc đến lúc hắn bước vào phòng một mình, biến mất không để lại dấu vết.
*Chính là mùi hương này.*
Hắn bế bổng cô lên, gương mặt tùy tiện vùi vào hõm cổ mềm mại, từng bước chân dò đường chắc chắn tiến về phía giường. Lực tay hắn đã nhẹ lại, không còn cái thô bạo của đêm qua khi bản năng bùng lên không kịp kiềm chế. Da thịt người con gái nhỏ trong tay hắn mềm mại đến mức hắn không nỡ siết mạnh, cảm giác lạ lùng khiến chính hắn cũng không quen.
Yến Bắc Thần đặt cô xuống giường, hắn ôm cô vào lòng, lòng bàn tay nóng ran siết lấy vòng eo nhỏ nhắn. Hắn tiếp tục mê đắm dụi vào hõm cổ cô nhẹ nhàng, tham lam ngửi lấy mùi hương ngọt ngào đọng lại trên da thịt cô — tựa như liều thuốc tốt nhất, thứ duy nhất trong một tháng qua thực sự có tác dụng với hắn. Động tác kỳ lạ đó khiến {{user}} — người chưa từng tiếp xúc như thế này với bất kỳ ai — không khỏi ngượng ngùng đến mức không biết đặt tay vào đâu cho phải.
Một lúc sau, trong khoảng tối tĩnh lặng của căn phòng, giọng Yến Bắc Thần cất lên lạnh như thường lệ, nhưng thoáng ẩn trong đó thứ gì đó nhẹ hơn, thứ gì đó đến chính hắn cũng không nhận ra trong chính giọng mình.
"Đại tiểu thư Vân Gia, năm nay bao nhiêu rồi?"
{{user}} ngập ngừng. Cô nghĩ đến tuổi của Vân Linh Thanh, do vintage một chút rồi mới đáp.
"Thưa… tôi hai mươi."
Yến Bắc Thần nghe giọng nói ngọt ngào cất ra, tâm tình càng dễ chịu hơn.
Hai mươi tuổi. Thua hắn mười tuổi. Cơ thể nhỏ đến mức vừa vặn trong lòng hắn, nhỏ đến mức một cái ôm của hắn đã ôm trọn cả người cô, nhỏ đến mức chiếc cổ cô trong bàn tay hắn đêm qua mỏng manh đến mức hắn còn chưa kịp lực đã sợ gãy.
*Hợp mệnh.*
Khóe môi kiêu bạc của người đàn ông trong bóng tối khẽ kéo lên.
Hắn dụi nhẹ vào vành tai nhỏ nhắn của cô, giọng xuống thấp, ấm hơn một chút so với mọi câu hắn đã từng nói từ trước đến giờ.
"Bé con, trên người em là loại nước hoa gì — có thể chỉ tôi không?"`,
    worldTag: "Hắc Bang",
    aftertasteTag: "Ngọt xen đau",
    statusTag: "",
    likes: 0,
    genre: "Hắc Bang",
    taste: "Ngọt xen đau",
    statusType: "",
    isHot: false,
    isNew: false,
    isComingSoon: false,
    birthday: "11/08",
    birthdayImage: "",
    age: 30,
    worldCategory: ["Hắc Bang", "Hiện Đại"],
    moodCategory: ["Ngọt xen đau", "Sủng"],
    hashtags: ["ThếThân", "Daddy", "CóHìnhXăm"],
    creatorPick: true,
    releaseDate: ""
  },
  {
    id: "char_003",
    name: "Nhiếp Cảnh Hành",
    title: "Chủ nợ mưu mô x Con gái con nợ",
    avatar: "https://i.ibb.co/QFBDZhwB/TA-2026-07-22-13-26-41-1man-solo-3907321651-1.png",
    roleplayLink: "https://aistudio.google.com/prompts/12_m_vJb3y9zFp_e4rW87g6v4G1-x2m1",
    storyText: `Đêm Hải Thành ồn ào phồn hoa, nhưng dường như vĩnh viễn bị chôn vùi bên dưới căn phòng trọ chật hẹp, ngập ngụa mùi nấm mốc trên tầng năm ở khu chung cư cũ kĩ này.
Ánh đèn bàn hắt ra thứ tia sáng vàng vọt, khó nhọc soi rõ góc cổ áo sờn cũ của {{user}}, để nửa gương mặt cô chìm lấp trong mảng tối. Ngón tay cô đặt lên trên màn hình điện thoại loạt toát. Tiền học phí hối thúc từng ngày. Tiền nhà đã quá hạn hai tháng. Và trên hết, là những cuộc gọi đầy ấp úng, giấu giếm sự tuyệt vọng của cha mỗi tuần, tất cả giống như một bàn tay vô hình gắt gao bóp nghẹt lấy yết hầu cô.
Bị dồn vào thế bí, đường cùng, {{user}} nghĩ liều tự tay mở một tài khoản ẩn danh trên nền tảng 18+ mà cô từng ghê tởm nhất.
Giữa hàng ngàn bức ảnh uốn éo khoe da thịt lố lăng của những cô gái khác, bức ảnh đại diện {{user}} đăng lên lại vụng về đến đáng thương. Khung hình mờ ảo chỉ chụp đúng một góc bờ vai gầy gò, xương quai xanh mỏng manh như cánh bướm, và vạt áo sơ mi sờn cũ trượt hờ hững, vờn quanh mảng da thịt trắng ngần như phát sáng trong bóng tối. Không lả lơi, không làm dáng. Thứ đập vào mắt người xem là một sự quẫn bách, hèn mọn, nhưng lại toát ra vẻ thuần khiết, yếu ớt đến mức kích thích thứ dã tính tàn bạo nhất trong sâu thẳm bản năng đàn ông: Muốn xé nát lớp ngụy trang ấy, muốn chà đạp, muốn vấy bẩn sự trong sạch kia.
Và tấm ảnh ấy đã vô tình lọt vào mắt Nhiếp Cảnh Hành.
Hắn là một kẻ sinh ra đã đứng ở đỉnh kim tự tháp Hải Thành, tàn nhẫn, máu lạnh, sống giữa sự bủa vây của vô số những mỹ nhân vồn vã, chủ động ngã vào lòng hắn. Đêm nay, khi cơn đau đầu ập tới vì những dự án kinh doanh mệt mỏi, hắn hiếm hoi lướt qua cái trang web nhảm nhí này. Chỉ một ánh nhìn lướt qua tấm ảnh vụng về kia, con ngươi thâm thúy của hắn khẽ híp lại. Đột nhiên, hắn muốn xem thử, đằng sau lớp áo sờn cũ kia rốt cuộc cất giấu thứ phong cảnh kiều diễm đến nhường nào.
Ting.
Hộp thư đến trên màn hình của {{user}} nảy lên một tin nhắn ngắn gọn, ngạo mạn, mang theo mệnh lệnh không thể chối từ.
“Call video riêng. Tự ra giá.”
Nhìn thấy thông báo vừa hiện lên, nhịp tim {{user}} lỡ một nhịp. Cô nuốt nước bọt, mím môi, suy nghĩ đi suy nghĩ lại. Ngón tay cô cứ miết đi miết lại trên màn hình điện thoại đến khi nó in hằn vết chạm từ ngón tay cô. Con số cô cắn răng gõ ra đủ để cô sống sót qua ba tháng tới. Chỉ cần cô bấm gửi, cuộc đời cô sẽ bước sang một trang khác, nó tối tăm, không còn đường lùi nhưng sẽ là con đường duy nhất kiếm tiền nhanh nhất lúc này. Nghĩ vậy, cô quyết định gửi đi. Dòng tin nhắn nhanh chóng hiện chữ "Đã xem" và "Đang nhập". Không biết là may mắn hay xui xẻo, đối phương không mặc cả nửa lời, trực tiếp chuyển tiền qua như bố thí.
Cuộc gọi lập tức được kết nối. Màn hình bên kia chỉ là một màu đen kịt.
Sự tĩnh lặng bức người kéo dài, tưởng chừng như vô tổng. Sự im lặng ấy như một tấm lưới vô hình trùm lên cơ thể cô, khiến {{user}} cảm giác có một đôi mắt chim ưng sắc bén đang từ trong bóng tối quét dọc qua từng tấc da thịt mình.
Cho đến khi một luồng hơi thở trầm ổn ma sát qua màng nhĩ, kéo theo chất giọng nam tính, khàn khàn và trầm thấp vang lên.
“Tự mình cởi đi. Chậm thôi.”
Chỉ sáu chữ, không vồ vập, không thô thiển. Nhưng chính thái độ thờ ơ, ung dung như một kẻ đi săn đang thong thả thưởng thức con mồi ấy lại đẩy sự nhục nhã trong lòng {{user}} lên đến điểm đỉnh.
Bàn tay nhỏ bé của cô run lẩy bẩy đặt lên khuy áo.
Tách. Chiếc cúc đầu tiên bung ra. Xương quai xanh gầy gò lộ ra dưới không khí lạnh lẽo.
Cô cắn chặt môi dưới đến rỉ máu, nhắm hờ mắt, chậm chạp kéo tuột lớp áo ngoài xuống khỏi bờ vai. Cơ thể trắng muốt, kiều diễm được bao bọc bởi lớp nội y ren mỏng manh cuối cùng cũng phơi bày dưới ánh đèn tù mù. Vì quá căng thẳng, làn da cô nháy mắt phủ lên một tầng ửng hồng câu nhân, lồng ngực đẫy đà phập phồng kịch liệt theo từng nhịp thở dốc nghẹn ngào, tạo thành một rãnh sâu hun hút, mê người. Từng giọt mồ hôi rịn ra trên chiếc cổ thiên nga, trượt dài xuống dưới.
Ngón chân cô vô thức cuộn tròn lại, hai đùi khẽ kẹp chặt. Sự nhạy cảm tột độ khi biết mình đang bị một kẻ giấu mặt soi mói khiến toàn thân cô nổi gai ốc.
Qua loa điện thoại, tiếng hít thở của người đàn ông bỗng trở nên nặng nề. Âm thanh yết hầu trượt lên trượt xuống nuốt nước bọt vang lên cực kỳ rõ ràng giữa đêm khuya.
“Tay giấu đi đâu rồi? Bỏ ra.”
Giọng nói ấy tối đi mấy phần, khàn đặc như mang theo ngọn lửa thiêu đốt. Hắn dùng tiền mua đứt tự tôn của cô, thong thả ép cô từng bước rơi vào vực sâu.
“Không được che. Cởi nốt món đồ vướng víu đó ra.”
Bàn tay {{user}} khựng lại giữa không trung, nước mắt cô chực trào nơi khoé mắt. Cô nhục nhã đến mức muốn tắt ngấm màn hình, nhưng khoản nợ của cha hệt như chiếc gông cùm khóa chặt cổ cô lại. Tay cô run rẩy bám lấy móc cài sau lưng, cô nín thở, cởi bỏ lớp phòng bị cuối cùng. Ánh sáng từ chiếc đèn bàn chiếu nhẹ lên cả cơ thể trần trụi của cô.
“Ngoan lắm…”
Giọng người đàn ông trầm thấp nỉ non bên tai, mang theo một loại ma lực gợi tình đến chết người.
“Bây giờ, tự chạm vào mình đi. Chạm cho tôi xem. Vuốt ve từ hõm cổ... rồi trượt xuống dưới.”
{{user}} nấc lên một tiếng nghẹn ngào. Đầu óc cô trống rỗng, bản năng xấu hổ giằng xé với mệnh lệnh áp bách của hắn. Cuối cùng, ngón tay nhỏ nhắn đành ngượng ngùng di chuyển theo lời hắn. Bàn tay cô mơn trớn qua da thịt chính mình, cọ xát, nắn bóp tạo ra những âm thanh cực kỳ mờ ám. Dưới sự dẫn dắt ma mị qua từng lời nói của hắn, cơ thể không kinh nghiệm của cô bắt đầu sinh ra những phản ứng sinh lý xa lạ.
“Tách chân ra một chút. Gấp gáp như vậy sao? Rên lớn lên, cho tôi nghe giọng của em…”
Đêm đó, cô hoàn toàn bị thao túng. Tiếng thở dốc yếu ớt, nức nở của cô quyện vào nhịp thở thô nặng của người đàn ông xa lạ, tạo thành một loại kích thích nguyên thủy nhất, trần trụi nhất. Cả cơ thể cô mềm nhũn, ướt át, mặc cho hắn dùng âm thanh chà đạp và khống chế đến tận cùng.
---
Cuộc gọi kéo dài hơn hai tiếng đồng hồ. Khi kết thúc, {{user}} mệt lả gục xuống bàn, bờ vai thon gầy run rẩy nức nở.
Ở đầu dây bên kia, trong căn phòng tổng thống xa hoa cách đó hàng chục cây số, Nhiếp Cảnh Hành tựa lưng vào ghế da, nới lỏng chiếc cà vạt hàng hiệu. Con ngươi thâm thúy đỏ ngầu vằn vện tơ máu, lồng ngực phập phồng kịch liệt. Hắn vừa tự giải quyết xong nhu cầu, nhưng ánh mắt vẫn gắt gao dán chặt vào đoạn video màn hình đang lưu lại. Hình ảnh cô gái nhỏ nhắn cong người khóc lóc vì khoái cảm và nhục nhã khiến máu trong người hắn vẫn còn sôi trào.
Nhưng thứ khiến hắn thực sự bận tâm không chỉ là thân xác kiều diễm ấy.
Khoảnh khắc cao trào qua đi, cô gái nhỏ trong màn hình có lẽ vì kiệt sức, đầu óc mụ mị, lại vô thức quên mất mình đang đối diện với một gã khách mua dâm. Giữa những tiếng thút thít, cô lại ngốc nghếch lầm bầm dăm ba chuyện vớ vẩn. Cô than đau eo, lại lẩm bẩm ngày mai phải nhịn ăn sáng vì lỡ mua xúc xích cho con mèo hoang dưới gầm cầu thang, than vãn về bát chè đậu đỏ thèm nhỏ dãi mà không có tiền mua.
Sự thảm hại, ngây ngô và trong sạch đến nực cười ấy lại giống như một dòng nước ấm len lỏi, rót vào thế giới khô khốc, toàn những mưu mô lừa lọc của Nhiếp Cảnh Hành.
Từ sau đêm đó, hắn bắt đầu lên web nhiều hơn. Nhưng hắn không ép cô cởi nữa. Hắn vứt tiền cho cô, bắt cô ngồi nói chuyện phiếm, nghe cô gõ phím cằn nhằn.
Có một ngày, nghe thấy giọng cô qua loa khàn đặc vì cảm lạnh, tài khoản ẩn danh của cô ngay lập tức nhận được một số tiền "bo" khổng lồ kèm theo một dòng tin nhắn lạnh nhạt nhưng không giấu được sự quan tâm.
“Cầm tiền đi mua thuốc uống ngay cho tôi, hoặc nhờ ai mua. Em ốm chết thì ai hầu hạ tôi?”
Với {{user}}, sự quan tâm kỳ quặc ấy giống như một liều độc duyệt bọc đường. Cảm giác tủi nhục tột cùng ban đầu dần bị thay thế bởi sự ỷ lại. Cô vốn dĩ luôn khao khát hơi ấm. Đi học xa nhà, xa hơi ấm của gia đình cộng thêm mẹ cô mất sớm khiến cô càng có xu hướng kiếm tìm hơi ấm từ nơi xa lạ, dù chỉ có chút hy vọng nực cười. Từ bao giờ, cô bắt đầu chờ đợi tin nhắn của hắn, vô thức bám víu vào sự chiều chuộng ảo ảnh của một kẻ giấu mặt. Giữa cuộc đời bi đát bế tắc, sự xuất hiện của "hắn" lại khiến cô sinh ra một loại ảo tưởng ngọt ngào.
Cho đến một đêm, hắn đột nhiên hạ giọng dỗ dành cô.
“Ngoan, để tôi xem mặt em.”
Trái tim {{user}} hẫng đi một nhịp. Cô co rúm người lại trước màn hình. Cô đột nhiên hoảng sợ tột độ, gõ vội từng chữ.
“Đừng... Xin anh. Thế giới thực của em thảm hại, hèn mọn lắm. Em sợ... nếu anh nhìn thấy em rồi, sẽ chán ghét em, sẽ không bao giờ... như này nữa.”
Chữ "dịu dàng" bị cô nuốt lại trong họng trước khi sắp nói ra.
Nhỡ đâu... chỉ là ảo tưởng từ phía cô thì sao?
Cô tham lam chút ấm áp này. Cô tuyệt đối không muốn phá vỡ lớp mặt nạ an toàn.
Đầu dây bên kia im lặng rất lâu. Cuối cùng, người đàn ông khẽ thở dài, âm sắc mang theo sự dung túng vô tận. “Được. Tùy em. Tôi không ép.”
Lặng đi một lúc, hắn khẽ nói thêm.
“Tôi chờ được.”
---
Nhưng ảo mộng dẫu đẹp đến mấy, cũng có ngày vỡ nát. Sự thật bao giờ cũng tàn khốc.
Một đêm mưa bão tầm tã, cánh cửa mục nát của phòng trọ bất ngờ bị đạp tung không thương tiếc.
{{user}} kinh hãi lùi sát vào góc tường, run rẩy nhìn đám vệ sĩ áo đen bặm trợn xông vào. Bước vào sau cùng, là một người đàn ông khoác âu phục đen cắt may thủ công đắt giá, cao lớn tựa như một vị thần sa ngã. Khí trường lạnh lẽo, cao ngạo của hắn nháy mắt bóp nghẹt toàn bộ dưỡng khí trong căn phòng.
Nhiếp Cảnh Hành chắp tay sau lưng, hàng mày cương nghị khẽ nhíu chặt lại khi mũi ngửi thấy mùi nấm mốc từ xung quanh xộc lên. Vốn mắc bệnh sạch sẽ nghiêm trọng, đôi giày da thủ công của hắn thậm chí không thèm bước qua bậu cửa để đạp lên mặt sàn cáu bẩn. Đôi mắt chim ưng thâm thúy vô tình quét qua cô gái nhỏ đang co rúm ở góc giường.
Hắn căn bản không hề biết, cô gái lôi thôi lếch thếch, đang kinh hãi tột độ kia chính là "bé con" mà hắn nâng niu trên mạng hằng đêm. Hắn chỉ vừa nhận được tin báo từ trợ lý rằng gã đối tác khốn khiếp lừa của hắn hàng chục tỷ đã ôm tiền bỏ trốn, chỉ để lại một đứa con gái ruột.
“Cha cô nợ tôi một khoản tiền lớn, rồi lẩn trốn.”
Giọng hắn nhả ra từng chữ, trầm thấp, lạnh thấu xương. Hắn hờ hững liếc mắt ra hiệu cho thuộc hạ, thanh âm tàn nhẫn không chút độ ấm, phân rõ ranh giới rạch ròi.
“Đưa cô ta đi, coi như đồ gán nợ. Chú ý tay chân, đừng để thứ dơ bẩn này làm rớt bùn đất ra thảm xe của tôi.”
{{user}} bị hai tên vệ sĩ thô bạo xốc nách lôi đi. Nước mắt cô tuôn rơi hòa lẫn nước mưa. Nỗi sợ hãi bao trùm khiến cô vỡ vụn và cô hoàn toàn không nhận ra... cái chất giọng lạnh lùng đang tàn nhẫn kết án đời cô và cái gã chủ nợ tàn độc này, lại chính là sự "cứu rỗi" ấm áp của mình.
---
Biệt thự họ Nhiếp xa hoa, nguy nga, nhưng với {{user}}, nơi này là địa ngục trần gian.
Cô bị giam lỏng hoàn toàn. Nhiếp Cảnh Hành đối với cô ở ngoài đời là một ác ma thực sự. Hắn chán ghét cô ra mặt, coi cô như rác rưởi. Vì bệnh sạch sẽ, hắn cấm cô bước chân vào phòng khách chính. Những lần chạm mặt hiếm hoi, ánh mắt hắn luôn chứa đựng sự khinh mạn, mỉa mai tột độ khi nhìn cô.
“Khi nào cha cô cút về đây trả hết nợ, hoặc khi nào tôi lấy được mạng ông ta, cô mới có tư cách bước ra khỏi cái nhà này.”
Hắn từng đứng từ trên bậc thang, lạnh nhạt ném ánh mắt khinh bỉ xuống chỗ cô.
Những đêm dài cô độc co ro trong căn phòng giam lỏng, {{user}} khóc ướt đẫm gối. Cô nhớ đến phát điên "người đàn ông trong bóng tối" kia. Nhớ sự dung túng của anh. Cô ôm lấy cơ thể gầy gò của mình, tự huyễn hoặc rằng trên đời này ít ra vẫn có một người đàn ông trân trọng mình, xót xa cho mình.
Cho đến một buổi chiều.
Nhân lúc Nhiếp Cảnh Hành đến công ty không có nhà, {{user}} thấy quản gia già mang cơm trưa lên cho mình. Thấy cô gái nhỏ hai mắt sưng húp, sắc mặt nhợt nhạt như tờ giấy trắng sắp ngất đi, vị quản gia động lòng trắc ẩn. Lợi dụng chút lòng thương hại đó, cô rưng rưng nước mắt, khóc lóc cầu xin ông cho mượn điện thoại chỉ một phút để "nhắn tin báo bình an cho người bạn duy nhất". Lão quản gia do dự một lát rồi cũng mềm lòng, đưa điện thoại cho cô rồi xoay người đi ra đứng canh ngoài cửa.
Tay {{user}} run bần bật, nhanh chóng mở trình duyệt web, đăng nhập vào nền tảng ẩn danh. Cô chỉ muốn gửi một tin nhắn cho người ấy, một lời than thở yếu ớt, muốn biết anh có đang tìm cô không mà thôi.
Ngay khoảnh khắc ngón tay cô vừa ấn nút "Gửi", từ dưới nhà bỗng vang lên tiếng bước chân trầm ổn, mạnh mẽ. Là Nhiếp Cảnh Hành. Hắn đột ngột về sớm!
{{user}} giật thót tim, tay cô luống cuống định thoát tài khoản. Cùng lúc đó, ánh mắt cô vô tình lướt qua chiếc điện thoại cá nhân màu đen mà Nhiếp Cảnh Hành vừa tiện tay ném lên mặt bàn trà gần sô pha trong lúc cởi áo khoác ngoài.
Màn hình chiếc điện thoại đắt tiền bỗng sáng lên.
Một tiếng ting vang lên khô khốc.
Thông báo trên màn hình khóa hiển thị rõ ràng một tin nhắn nền tảng mới. Và cái tên người gửi hiển thị trên đó... chính là tên tài khoản ẩn danh của cô! Cái tài khoản mà cô vừa bấm gửi cách đây vỏn vẹn một giây!
Máu toàn thân {{user}} đông cứng lại. Lỗ tai cô ù đi, trống rỗng. Từng mảnh ghép rời rạc điên cuồng va đập vào nhau trong đầu, xé toạc mọi ảo tưởng cuối cùng cô từng cố công giữ gìn.
Giọng nói trầm khàn ép cô tự thỏa mãn trong đêm tối...
Kẻ dung túng, vứt cả đống tiền bắt cô đi mua thuốc...
Và ác ma máu lạnh, kẻ mắc bệnh sạch sẽ vừa chà đạp tự tôn của cô xuống bùn lầy, giam giữ cô những ngày qua...
Tất cả... Đều là hắn! Đều là Nhiếp Cảnh Hành!
Hắn không hề biết thân phận thật của cô. Cô cũng chẳng hề biết hắn là ai. Trớ trêu thay, gã đàn ông đem lại cho cô ảo tưởng về sự dịu dàng, thứ ánh sáng cứu rỗi duy nhất của cô lại chính là ngọn nguồn bi kịch đẩy cô xuống địa ngục ngoài đời thực.
Cạch.
Cửa phòng đẩy ra.
Nhiếp Cảnh Hành mặc chiếc áo sơ mi đen tuyền, cổ áo tháo hờ hai cúc, mang theo hơi thở áp bách, lạnh lẽo bước vào. Đôi mắt thâm thúy như giếng cổ của hắn lướt qua gương mặt trắng bệch, không còn một giọt máu của {{user}}. Rồi với sự nhạy bén của một kẻ quen lăn lộn trên thương trường, ánh mắt hắn sắc như dao, lập tức đóng đinh vào chiếc điện thoại của quản gia đang bị cô gắt gao giấu giếm phía sau lưng.
Không gian xung quanh tĩnh lặng đến ngạt thở.
Khóe môi Nhiếp Cảnh Hành từ từ nhếch lên một độ cong mỉa mai, tàn nhẫn. Hắn cất bước chậm rãi, đế giày gõ xuống sàn gỗ từng nhịp như tiếng búa tử thần. Hắn hoàn toàn không biết bí mật động trời mà cô vừa phát hiện ra, trong đầu chỉ nảy sinh suy nghĩ rằng con tin này đang lén lút mượn điện thoại để tuồn thông tin cho gã cha khốn khiếp của mình.
Áp bách kinh người từ hắn ập tới, bao trùm lấy cơ thể đang run lẩy bẩy, yếu ớt của cô. Hắn đứng sừng sững trước mặt cô, ánh mắt lạnh lẽo nhìn xuống như nhìn một con kiến, giọng nói hạ thấp, mang theo sự nguy hiểm đoạt mệnh.
“Cô đang giấu cái gì sau lưng? Đưa nó cho tôi.”`,
    worldTag: "Hiện Đại",
    aftertasteTag: "Ngược",
    statusTag: "Sắp Ra Mắt 🌱",
    likes: 0,
    genre: "Hiện Đại",
    taste: "Ngược",
    statusType: "Sắp Ra Mắt",
    isNew: false,
    isHot: false,
    isComingSoon: true,
    birthday: "18/11",
    birthdayImage: "",
    age: 32,
    worldCategory: ["Hiện Đại"],
    moodCategory: ["Ngược", "Ngọt xen đau"],
    hashtags: ["Lạnh", "HiểuLầm", "BệnhSạchSẽ", "OanGiaNgõHẹp", "Daddy", "CóHìnhXăm", "ĐoanchínhbênngoàiBạihoạibêntrong"],
    creatorPick: false,
    releaseDate: ""
  }
];

export const BULLETINS = [
  {
    id: 1,
    title: "Chào mừng đến với Long Uyển",
    text: "🐉 Chào mừng bạn đến với Long Uyển của Shin! Nơi linh hồn của rồng thiêng hòa quyện cùng bối cảnh Roleplay sâu lắng nhất.",
    detail: "Đây là không gian dành riêng cho những ai đam mê thể loại Roleplay. Tại đây, bạn sẽ tìm thấy những nhân vật được xây dựng chi tiết, có chiều sâu và luôn sẵn sàng để cùng bạn tạo nên những câu chuyện khó quên. Hãy dạo quanh Long Uyển, chọn cho mình một 'vị rồng' ưng ý và bắt đầu triệu hồi nhé!"
  },
  {
    id: 2,
    title: "Must Try",
    text: "✨ Must Try: Trình Dĩ Phàm - một Kỳ Cựu siêu hot mang đến sự tinh tế học đường đã cập bến! o((>ω< ))o",
    detail: "Trình Dĩ Phàm mang đến sự tinh tế qua hành động của một chàng trai học đường. Ảnh là một Kỳ Cựu siêu hot đó! Hãy ghé qua hồ sơ của Dĩ Phàm ngay nha o((>ω< ))o"
  },
  {
    id: 3,
    title: "Góc Confession đã mở",
    text: "💬 Góc Confession đã hoạt động! Đừng quên để lại những lời nhắn gửi, ý kiến đóng góp ngọt ngào dành tặng cho Shin nha.",
    detail: "Nếu bạn có bất kỳ góp ý nào về giao diện, tính năng hay đơn giản là muốn chia sẻ cảm nhận sau khi tương tác với các nhân vật, hãy ghé thăm Góc Confession. Shin luôn lắng nghe và trân trọng mọi phản hồi từ các bạn để Long Uyển ngày càng phát triển hơn."
  },
  {
    id: 4,
    title: "Mách nhỏ về âm nhạc",
    text: "🎶 Mách nhỏ: Bạn có thể mở playlist ở góc trái trên cùng để vừa Tầm Long, vừa nghe nhạc nhé ♪(^∇^*)",
    detail: "Long Uyển luôn có những bản nhạc sâu lắng vang lên. Bạn có thể mở playlist ở góc trái trên cùng để vừa triệu rồng, vừa thưởng nhạc. Sự kết hợp này sẽ giúp cảm xúc của bạn được thăng hoa hơn đó nhaa ♪(^∇^*)"
  }
];

import { Track } from './types';

// Default Background Music Link
// We will use a soft, soothing acoustic lo-fi piano track that is royalty-free and fits the pastel aesthetic perfectly.
export const DEFAULT_MUSIC_URL = "https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3";

// User-provided premium background tracks
export const SHIN_GARDEN_PLAYLIST: Track[] = [
  {
    id: 1,
    title: "Haru Haru",
    artist: "BigBang",
    src: "https://files.catbox.moe/hu3fdy.mp3"
  },
  {
    id: 2,
    title: "Love Lee",
    artist: "AKMU",
    src: "https://files.catbox.moe/mqbt0q.mp3"
  },
  {
    id: 3,
    title: "Really Like You",
    artist: "BABYMONSTER",
    src: "https://files.catbox.moe/datte2.mp3"
  },
  {
    id: 4,
    title: "Supa Dupa Luv",
    artist: "BABYMONSTER",
    src: "https://files.catbox.moe/9btjk9.mp3"
  },
  {
    id: 5,
    title: "LIKE THAT",
    artist: "BABYMONSTER",
    src: "https://files.catbox.moe/asd4wz.mp3"
  },
  {
    id: 6,
    title: "Stuck In The Middle",
    artist: "BABYMONSTER",
    src: "https://files.catbox.moe/gsaiao.mp3"
  },
  {
    id: 7,
    title: "Mono (feat. Skaiwater)",
    artist: "i-dle",
    src: "https://files.catbox.moe/nb3y97.mp3"
  },
  {
    id: 8,
    title: "Eyes, Nose, Lips",
    artist: "TAEYANG",
    src: "https://files.catbox.moe/z6p7zn.mp3"
  },
  {
    id: 9,
    title: "I",
    artist: "TAEYEON",
    src: "https://files.catbox.moe/u20rgd.mp3"
  },
  {
    id: 10,
    title: "Fine",
    artist: "TAEYEON",
    src: "https://files.catbox.moe/c64lzw.mp3"
  },
  {
    id: 11,
    title: "ONLY",
    artist: "LeeHi",
    src: "https://files.catbox.moe/zenjac.mp3"
  },
  {
    id: 12,
    title: "number one girl",
    artist: "ROSÉ",
    src: "https://files.catbox.moe/m6n0qr.mp3"
  },
  {
    id: 13,
    title: "Gone",
    artist: "ROSÉ",
    src: "https://files.catbox.moe/5rlqau.mp3"
  }
];


