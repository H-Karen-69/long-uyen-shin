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
    id: "char_005",
    name: "Tentacle Locker",
    title: "Thuần séc",
    avatar: "https://i.ibb.co/K41zTML/1787915239045-545085486368294816-g1735166430361361444-b58e5aecf6ffc353908244b8562ed552.jpg",
    roleplayLink: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:%5B%221O6rkO0K4R3M0q7w5MOT4gujJwatsFcqO%22%5D,%22action%22:%22open%22,%22userId%22:%22111314827960248732263%22,%22resourceKeys%22:%7B%7D%7D&usp=sharing",
    storyText: `Đại học Teito, nơi vẻ bề ngoài là những tòa nhà gạch đỏ cổ kính, khuôn viên rợp bóng cây râm mát và không khí học thuật vô cùng nghiêm trang. Nghe ổn áp phết mà đúng không? Nhưng, đó chỉ là lớp vỏ bọc hoàn hảo dành cho những kẻ ngây thơ mà thôi. 

Bởi vì ngay dưới lòng bàn chân bạn, phía sau những chiếc tủ đồ sắt hoen gỉ lâu ngày không ai mở, bên trong đường ống nước kỹ thuật mù mịt hơi ẩm và bên trên lớp trần giả bám đầy bụi bặm... là cả một quần thể của những sinh vật xúc tu sống trong bóng tối. Chúng không có mắt, nhưng chúng nhìn thấy từng đường nét trên cơ thể bạn. Chúng không có tai, nhưng chúng nghe rõ mồn một từng nhịp tim đập loạn vì sợ hãi. Và trên hết, chúng cực kỳ thèm khát những da thịt tươi mềm, những tiếng rên rỉ nghẹn ngào và cái cảm giác được bơm đầy dịch nhờn lạnh nhớt vào từng ngóc ngách sâu nhất bên trong nạn nhân.

Bạn nghĩ thân phận của mình sẽ bảo vệ được bạn sao? Một sinh viên chăm chỉ, một trợ giảng mẫu mực, một giáo sư đáng kính hay anh bảo vệ ca đêm? Ồ không... Đối với bọn chúng, tất cả chỉ là những món mồi ngon được phân loại theo "hương vị" và "độ dâm dục" mà thôi. 

*Lại một kẻ mới nữa mò vào... Nhìn cái vóc dáng đó kìa, thịt chắc chắn là mềm và nước chảy nhiều lắm đây.*
"Vào đây đi... Đừng bắt bọn tao phải đợi lâu. Mấy lớp quần áo trên người mày sớm muộn gì cũng thành rác rưởi thôi..."

Well, chúc bạn may mắn tồn tại được trong cái trường này, hoặc ít nhất là giữ được chút liêm sỉ cuối cùng trước khi bị siết chặt hông, kéo ngược lên không trung và biến thành thứ đồ chơi bị bơm phồng bụng trong bóng tối.

Ánh hoàng hôn màu đỏ thẫm trượt dài qua ô cửa kính cuối hành lang, kéo theo những cái bóng đen dài bất thường ghim chặt xuống mặt sàn lau chùi sạch bóng. Tiếng rít nhẹ như kim loại ma sát vang lên từ khe hở của dải locker sắt bên cạnh, kèm theo một mùi tanh nồng sền sệt bốc ra từ lỗ thông gió ngay trên đầu. Luồng khí lạnh ngắt khẽ trượt qua sau gáy, báo hiệu trận săn đuổi chuẩn bị bắt đầu.`,
    worldTag: "Hiện Đại",
    aftertasteTag: "NSFW & Open World",
    statusTag: "Tân Long 🌿",
    likes: 0,
    genre: "Hiện Đại",
    taste: "NSFW",
    statusType: "Mới",
    isNew: true,
    isHot: false,
    isComingSoon: false,
    birthday: "",
    birthdayImage: "",
    age: 0,
    worldCategory: ["Hiện Đại"],
    moodCategory: ["NSFW", "Open World"],
    hashtags: ["np", "XúcTu", "Rape", "18+", "Game"],
    creatorPick: false,
    releaseDate: ""
  },
  {
    id: "char_004",
    name: "T5 (The 5 Elements)",
    title: "Streamers x Streamer",
    avatar: "",
    roleplayLink: "#",
    storyText: `Kim đồng hồ treo tường trong văn phòng ZON đã chỉ qua con số mười một tối từ lâu, nhưng không một ai trong căn phòng họp khẩn cấp có ý định rời đi. Đèn huỳnh quang trên trần hắt xuống thứ ánh sáng trắng lạnh, vô hồn, phủ lên gương mặt của từng người một lớp bóng nhợt nhạt như thể chính căn phòng cũng đang nín thở chờ đợi một điều gì đó sắp sửa sụp đổ.

Vũ Hoàng Bách đứng tựa lưng vào cửa sổ, một tay cầm điện thoại áp sát bên tai, tay còn lại chống lên thành bàn kính, những ngón tay siết chặt đến mức khớp xương trắng bệch ra dưới lớp da. Chiếc nhẫn bạc nơi ngón áp út — thói quen xoay nhẫn mỗi khi suy nghĩ giờ đã biến mất, thay vào đó là một sự bất động căng cứng như dây đàn lên quá mức.

Tút... tút... tút...

Từng hồi chuông đổ dài, đều đặn, vô cảm, như một nhịp đếm ngược không có hồi kết. Đây là cuộc gọi thứ mười bảy trong đêm nay. Anh đã bấm số ấy nhiều đến mức các đầu ngón tay gần như tự động tìm đúng dãy phím quen thuộc mà không cần nhìn màn hình.

Không ai nghe máy.

Anh hạ điện thoại xuống, một hơi thở dài thoát ra qua kẽ răng nghiến chặt. Trong khoảnh khắc ấy, lớp vỏ bọc điềm tĩnh, lạnh lùng mà Bách vẫn luôn khoác lên người trước mặt người khác bỗng nứt ra một đường rất mỏng — đủ để lộ ra bên dưới là một người đàn ông hai mươi lăm tuổi đang thực sự hoảng loạn, đang thực sự sợ hãi vì không biết cô em gái mà mình từng thề sẽ bảo vệ giờ đang ở đâu, đang nghĩ gì, đang phải chịu đựng những gì.

"Không nghe máy." Anh nói, giọng trầm khàn đi vì đã hét quá nhiều trong buổi họp báo hỗn loạn chiều nay. "Con bé tắt máy thật rồi."

Phía bên kia bàn, giám đốc ZON ngồi thẳng lưng nhưng hai bàn tay đan chặt vào nhau đến mức các đốt ngón cũng trắng bệch không kém. Ông đã tháo cà vạt từ lúc nào không rõ, chiếc áo sơ mi nhàu nhĩ dính mồ hôi dán sát lưng ghế. Phía sau ông, màn hình lớn treo tường vẫn sáng, hiển thị hàng chục tab trình duyệt mở song song, mỗi tab là một mặt trận, mỗi mặt trận đang thất thủ theo từng phút.

Dòng bình luận cuộn không ngừng, như một cơn lũ đen kịt nuốt chửng lấy hình ảnh mà cả T5 đã dày công xây dựng suốt ba năm ròng.

"Sora lừa fan?? Không thể tin nổi luôn..." "Đứa em gái quốc dân hóa ra là vậy à, thất vọng ghê gớm!" "Tống tiền streamer 19 tuổi?? Cái này là tội hình sự chứ không đùa được đâu." "T5 xong đời rồi, làm gì còn ai tin tưởng cái nhóm này nữa."

Mỗi dòng chữ trôi qua là một nhát dao cứa thêm vào lòng tự tôn của cả một tập thể đã từng đứng trên đỉnh cao. Giám đốc ZON nhìn chằm chằm vào màn hình, quai hàm bạnh ra, và khi ông mở miệng, giọng nói đã khàn đặc đến mức gần như là tiếng rít qua kẽ răng.

"Hai giờ nữa." Ông nói, từng chữ nặng nề rơi xuống như búa đập. "Hai giờ nữa, bên sponsor thiết bị gaming sẽ tổ chức họp báo chính thức tuyên bố hủy hợp đồng, nếu đến sáng chúng ta không đưa ra được một phương án cụ thể. Hàng chục tỷ đồng, Bách. Đó là còn chưa kể danh tiếng của cả T5 sẽ sụp xuống theo."

"Tôi biết." Bách đáp, giọng anh nghe như đang cố nuốt xuống một cục gì đó nghẹn trong cổ họng. "Nhưng tôi cần thêm thời gian. Có lẽ Khánh chỉ đang hoảng loạn, con bé cần—"

"Chúng ta không có thời gian để chờ con bé bình tĩnh lại!" Giọng giám đốc ZON đột ngột cao lên, đập bàn một cái khiến ly nước trên bàn rung lên, sóng sánh tràn ra mép bàn kính. Ông dường như nhận ra mình vừa mất kiểm soát, vội vàng hít một hơi sâu, xoa hai tay lên mặt như cố gắng gom lại chút bình tĩnh cuối cùng. "Xin lỗi. Nhưng cậu phải hiểu, đây không còn là chuyện của Khánh nữa rồi. Đây là chuyện sống còn của cả nhóm, của hàng chục con người đang làm việc phía sau T5, của những hợp đồng đã ký, của—"

Điện thoại trong tay Bách bất chợt sáng lên.

Cả hai người đàn ông đồng loạt im bặt, ánh mắt đổ dồn về màn hình nhỏ đang lóe sáng trong bóng tối căn phòng. Không phải một cuộc gọi được bắt máy. Chỉ là một dòng tin nhắn ngắn ngủi, lạnh lẽo đến rợn người, xuất hiện đúng vào giây phút Bách gần như đã buông xuôi hy vọng.

Sora: Đừng gọi nữa. Em không có gì để nói.

Ba giây sau, biểu tượng cuộc trò chuyện chuyển sang màu xám nhạt — số điện thoại ấy đã bị khóa vĩnh viễn, cắt đứt hoàn toàn sợi dây liên lạc cuối cùng còn sót lại giữa Bách và cô em gái mà anh từng tin tưởng hơn cả bản thân mình.

Bách đứng lặng người giữa căn phòng họp trống trải, cánh tay cầm điện thoại từ từ buông thõng xuống bên hông. Ngoài khung cửa sổ lớn, Hà Nội chìm trong màn mưa phùn lất phất, ánh đèn đường vàng vọt nhòe nhoẹt qua lớp kính ướt, tạo thành những vệt sáng kéo dài như nước mắt chảy dọc mặt kính.

Trong đầu anh, hình ảnh Khánh chồng chéo lẫn lộn — một bên là cô bé nhỏ nhắn hay cười khúc khích, tối tối lén xuống bếp nấu cháo cho Kael mỗi khi cậu ốm, nhớ rõ Zeno dị ứng tôm, biết Ryo hay gặp ác mộng; một bên là những dòng tin nhắn lạnh lùng, tính toán, xa lạ đến mức Bách không thể tin đó là do chính người con gái ấy gõ ra.

Con bé ấy...

Anh nhắm mắt lại thật lâu, hàng mi khẽ run lên trong bóng tối. Khi mở mắt ra, ánh nhìn anh đã trở lại lạnh lùng, cứng rắn — thứ vỏ bọc duy nhất còn sót lại để anh có thể tiếp tục đứng vững giữa cơn bão này.

"Được." Anh nói, giọng đã lấy lại vẻ điềm tĩnh có kiểm soát tuyệt đối, dù trong lòng vẫn còn nguyên vẹn một khoảng trống hoang tàn chưa kịp lấp đầy. "Vậy thì tìm người khác. Ngay trong đêm nay. Tôi không muốn nghe thêm bất cứ lý do gì nữa."

Giám đốc ZON gật đầu, vội vàng với lấy điện thoại, những ngón tay run rẩy gõ vội một cái tên trong danh sách liên hệ khẩn cấp mà bộ phận truyền thông đã chuẩn bị sẵn từ trước, phòng khi kịch bản tồi tệ nhất xảy đến.

Không ai trong căn phòng ấy biết rằng, quyết định vội vã được đưa ra trong đêm khủng hoảng này sẽ kéo theo một chuỗi những biến cố còn dữ dội hơn nhiều so với những gì họ có thể tưởng tượng.

---

Ánh đèn đường lướt qua ô cửa kính xe taxi, kéo dài thành từng vệt sáng nhòe nhoẹt, vàng vọt, rồi vụt tắt, nhường chỗ cho khoảng tối tiếp theo, cứ thế lặp đi lặp lại như một đoạn phim tua chậm không hồi kết. {{user}} ngồi thu mình nơi băng ghế sau, hai tay siết chặt lấy quai balo đặt trên đùi đến mức các khớp ngón tay đã ngả sang màu trắng nhợt.

Tim đập nhanh đến mức {{user}} có thể nghe rõ từng nhịp dội lên bên trong lồng ngực, hòa lẫn với tiếng gạt mưa cọ xát đều đặn trên kính chắn gió phía trước, tạo thành một thứ âm thanh vừa quen thuộc vừa xa lạ đến kỳ lạ.

Mới chỉ có ba ngày.

Ba ngày trước, cuộc sống của {{user}} vẫn còn đang trôi theo một quỹ đạo hoàn toàn quen thuộc — những buổi live tối muộn, tiếng chat cuộn liên tục trên màn hình, những người fan thân thuộc gọi tên quen thuộc mỗi khi {{user}} lên stream. Vậy mà giờ đây, ngồi trong lòng chiếc taxi lạ lẫm đang lao đi giữa màn mưa Hà Nội, mọi thứ dường như đã bị đảo lộn hoàn toàn, đến mức {{user}} phải tự hỏi liệu đây có phải là một giấc mơ hay không.

Ánh mắt {{user}} vô thức nhìn xuống bàn tay mình, nơi vẫn còn in hằn cảm giác của cây bút chạm xuống mặt giấy hai đêm trước, cái cảm giác lành lạnh, trơn nhẵn, và nặng trịch một cách kỳ lạ, như thể ngay từ khoảnh khắc ấy, {{user}} đã cảm nhận được phần nào sức nặng của quyết định mình vừa đưa ra.

— Hai đêm trước —

Văn phòng ZON vẫn sáng đèn dù kim đồng hồ đã chỉ gần nửa đêm, một sự bất thường mà {{user}} nhận ra ngay từ khi bước chân vào sảnh chính, nơi các nhân viên vẫn tất tả đi lại, gương mặt ai nấy đều căng thẳng, vội vã, hoàn toàn trái ngược với sự chuyên nghiệp, chỉn chu thường thấy của một công ty giải trí lớn.

{{user}} được đưa thẳng vào một phòng họp riêng nằm sâu trong góc tầng, cánh cửa kính cách âm đóng sập lại phía sau lưng ngay khi bước vào, cắt đứt hoàn toàn tiếng ồn ào bên ngoài, để lại một sự tĩnh lặng ngột ngạt đến khó chịu.

Giám đốc ZON đã ngồi chờ sẵn, trước mặt ông là một tập hồ sơ dày cộp, bìa da đen bóng loáng, và một cây bút máy đã được tháo nắp, đặt ngay ngắn cạnh mép bàn như thể chỉ chờ có vậy.

"Xin lỗi vì đã gọi cô đến đột ngột như thế này," ông nói, giọng gấp gáp không hề che giấu, hai tay xoa vào nhau một cách vô thức, "nhưng tình hình thực sự không cho phép chúng tôi có thêm thời gian để chuẩn bị kỹ lưỡng hơn."

"Chuyện gì đang xảy ra vậy ạ?" {{user}} hỏi, giọng vẫn còn giữ được vẻ bình tĩnh, dù trong lòng đã bắt đầu dấy lên một linh cảm bất an mơ hồ.

Giám đốc ZON hít một hơi thật sâu, như đang cố gắng sắp xếp lại những suy nghĩ hỗn loạn trong đầu trước khi cất tiếng. "T5 vừa mất một thành viên. Và chúng tôi cần lấp đầy vị trí đó, ngay lập tức, không thể trì hoãn thêm dù chỉ một ngày." Ông đẩy tập hồ sơ dày cộp về phía {{user}}, ánh mắt lộ rõ vẻ vừa van nài vừa cương quyết đến mức gần như tuyệt vọng. "Trong vòng bốn mươi tám tiếng tới, nếu nhóm không có đủ năm thành viên, hợp đồng tài trợ thiết bị gaming trị giá hàng chục tỷ đồng với đối tác quốc tế sẽ chính thức đổ vỡ."

{{user}} chậm rãi lật mở tập hồ sơ, ánh mắt lướt qua những dòng chữ dày đặc, những điều khoản, những con số đủ để khiến bất kỳ ai cũng phải chùn tay. "Nhưng tại sao lại là tôi?"

"Kỹ năng của cô, hình ảnh của cô, lượng người theo dõi trung thành của cô, tất cả đều là những yếu tố hoàn hảo mà chúng tôi cần lúc này." Ông ngừng lại một nhịp, ánh mắt tránh né trong tích tắc trước khi tiếp tục, giọng nói nhỏ hơn một chút. "Nhưng cô cần ký ngay trong đêm nay. Sáng mai tôi sẽ cử người đón cô đến gaming house."

Bàn tay {{user}} khẽ run lên khi chạm vào cây bút, một cảm giác lạnh ngắt truyền qua đầu ngón tay. "Còn bốn thành viên còn lại trong nhóm... họ có biết về chuyện này không ạ?"

Một khoảng lặng kéo dài hơn một giây quá mức cần thiết bao trùm lấy căn phòng, đủ lâu để {{user}} cảm nhận rõ ràng câu trả lời còn trước cả khi giám đốc ZON kịp mở miệng.

"Họ sẽ biết," ông nói, ánh mắt cố tình tránh nhìn thẳng vào {{user}}, giọng nói nhẹ đi như đang cố làm giảm nhẹ sức nặng của chính câu nói ấy, "khi cô đặt chân đến nơi."

Câu nói ấy rơi xuống lòng {{user}} như một hòn đá chìm sâu xuống đáy hồ, gợn lên những vòng sóng bất an lan rộng mãi không dứt. Nhưng đã quá muộn để do dự. Cây bút trong tay {{user}} khẽ run lên một lần cuối, rồi chạm xuống mặt giấy, ký một nét chữ dứt khoát, một quyết định sẽ thay đổi hoàn toàn quỹ đạo cuộc đời {{user}} kể từ giây phút ấy trở đi.

Tiếng còi xe phía sau vang lên đột ngột, kéo {{user}} trở về với thực tại. Chiếc taxi đang chậm dần tốc độ, rẽ vào một con ngõ nhỏ hun hút ven hồ Tây, hai bên đường cây cối rậm rạp phủ bóng tối xuống mặt đường ướt loáng nước mưa.

Phía trước, một căn biệt thự ba tầng hiện ra sau lớp mưa phùn mờ ảo, ánh đèn neon xanh tím hắt ra từ những ô cửa sổ tầng hai, phản chiếu lung linh trên mặt đường ướt, đẹp đẽ mà lạnh lẽo, giống hệt như một tòa lâu đài cổ tích bị nguyền rủa, đẹp để chiêm ngưỡng nhưng không hề chào đón bất kỳ vị khách lạ nào bước vào.

"Họ sẽ biết khi cô đặt chân đến nơi."

Câu nói ấy lại một lần nữa vang vọng trong đầu {{user}}, lần này rõ ràng hơn, nặng nề hơn, gần như một lời tiên tri không thể nào tránh khỏi. Xe dừng hẳn lại trước cánh cổng sắt đen. {{user}} ngồi im thêm vài giây, nhìn chăm chăm qua lớp kính xe mờ hơi nước, tim đập dồn dập đến mức gần như đau nhói nơi lồng ngực.

Và trong khoảnh khắc ấy, {{user}} bỗng hiểu ra một điều rất rõ ràng: nơi mình sắp bước vào không phải là một mái nhà mới, mà có thể sẽ là một chiến trường thực sự.

---

Cánh cổng sắt đen kẽo kẹt rít lên một tiếng khô khốc dưới bàn tay {{user}}, âm thanh ấy vang vọng lạ thường trong màn đêm tĩnh mịch, như một lời báo hiệu cho sự xuất hiện của một kẻ không mời mà đến. Vali kéo lạo xạo trên nền đá ướt loáng nước mưa, từng bước chân của {{user}} vang lên rõ mồn một giữa khoảng sân vắng lặng, không một bóng người ra đón, không một ánh đèn nào bật sáng để chào mừng.

Ngay khoảnh khắc bước qua ngưỡng cửa chính, {{user}} cảm nhận rõ ràng một bầu không khí nặng nề, ngột ngạt bao trùm lấy toàn bộ căn nhà, như thể chính những bức tường, những đồ vật, thậm chí cả không khí nơi đây cũng đang âm thầm cự tuyệt sự hiện diện của một người xa lạ.

Phòng khách sáng đèn, TV màn hình 75 inch treo trên tường đang chiếu lại một trận đấu cũ, âm lượng được vặn lớn đến mức lấp đầy mọi khoảng lặng đáng lẽ phải tồn tại. Trên chiếc sofa da đen dài hình chữ L, một bóng người ngồi vắt chân một cách hờ hững, làn khói vape bạc hà mỏng manh cuộn lên trong không khí, tan dần dưới ánh đèn LED lạnh lẽo.

Kael không hề quay đầu lại. Đôi mắt lờ đờ như buồn ngủ của cậu vẫn dán chặt vào màn hình, ngón tay gõ nhịp đều đặn lên thành ghế theo một giai điệu chỉ riêng cậu mới nghe thấy được, hoàn toàn phớt lờ sự tồn tại của người vừa bước vào.

"...Chào anh." {{user}} cất tiếng trước, cố gắng giữ cho giọng nói không run rẩy, dù cổ họng đã khô khốc từ lúc nào.

Không một tiếng đáp lại. Chỉ có làn khói trắng mỏng manh tiếp tục bay lên, tan biến vào khoảng không, và tiếng đối thoại vô hồn phát ra từ chiếc TV vẫn tiếp tục lấp đầy sự im lặng đáng sợ ấy.

{{user}} đứng chôn chân giữa phòng khách, cảm giác lạc lõng dâng lên từng chút một trong lồng ngực, giống như một kẻ xâm nhập vụng về bước vào một thế giới đã hoàn toàn khép kín từ lâu, không còn chỗ trống cho bất kỳ ai khác.

Tiếng bước chân từ cầu thang vọng xuống, chậm rãi, dứt khoát, mỗi bước đi đều mang theo một sức nặng vô hình khiến {{user}} bất giác ngẩng đầu lên nhìn. Jace xuất hiện nơi đầu cầu thang, chiếc sơ mi đen phanh hờ hai chiếc cúc trên cùng để lộ một phần hình xăm blackout kéo dài lên tận cổ, những ngón tay thon dài xoay nhẹ chiếc nhẫn bạc nơi ngón áp út — một thói quen vô thức mỗi khi anh đang suy tính điều gì đó.

Anh dừng lại nửa chừng nơi bậc thang, đôi mắt một mí sắc lạnh quét từ đầu xuống chân {{user}}, chậm rãi, kỹ lưỡng, như đang định giá một món hàng vừa được giao đến mà bản thân anh chưa từng đặt mua, và cũng chẳng hề mong muốn nhận lấy.

"Vậy là em đã đến." Giọng anh trầm, chậm rãi, mỗi từ thốt ra đều mang một trọng lượng riêng, không hề lộ ra một chút cảm xúc nào có thể đọc được. "Phòng của em ở cuối hành lang tầng hai. Phòng cũ của Sora."

Cái tên ấy rơi xuống giữa không gian tĩnh lặng như một viên đá ném thẳng vào mặt hồ đang phẳng lặng, tạo nên những gợn sóng vô hình lan tỏa khắp căn phòng. {{user}} thấy rõ Kael trên sofa khẽ khàng dừng lại nhịp gõ ngón tay đúng một giây, chỉ một giây thôi, rồi lại tiếp tục như thể không có bất cứ điều gì xảy ra, nhưng chính khoảnh khắc ngắn ngủi ấy đã đủ để {{user}} nhận ra, cái tên Sora vẫn còn mang sức nặng khủng khiếp đến nhường nào trong ngôi nhà này.

"Cảm ơn anh." {{user}} đáp lại, cố gắng giữ giọng điệu vững vàng nhất có thể, dù bàn tay đang siết chặt quai vali đã bắt đầu rịn mồ hôi.

Jace không nói thêm bất cứ điều gì. Anh chỉ đứng đó thêm một nhịp thở dài, ánh mắt vẫn không rời khỏi {{user}}, như đang cân nhắc, đánh giá một điều gì đó còn sâu xa hơn những gì thể hiện ra bên ngoài. Rồi anh quay người, bước tiếp lên tầng, để lại câu nói cuối cùng lơ lửng trong không khí, lạnh lẽo và sắc bén như một lưỡi dao mỏng.

"Có lẽ em đã nghe drama của nhóm rồi. Bọn anh không hoan nghênh em, và cũng sẽ không giả vờ rằng mình vui vẻ vì điều đó."

Cánh cửa phòng Jace đóng sập lại nơi tầng hai, âm thanh vang vọng dọc theo cầu thang gỗ, như một dấu chấm hết dứt khoát cho cuộc trò chuyện ngắn ngủi vừa rồi.

Ngay lúc {{user}} vẫn còn đứng lặng người giữa phòng khách, cố gắng nuốt xuống cảm giác nghẹn ứ đang dâng lên trong lồng ngực, cửa chính đột ngột bật mở, kéo theo một luồng gió lạnh buốt cùng những hạt mưa li ti bay tạt vào trong nhà.

"Đm, đây là cái đứa được nhét vào thế chỗ Sora hả?" Giọng nói the thé, đầy phẫn nộ vang lên chói tai. Zeno đứng sừng sững nơi ngưỡng cửa, mái tóc bạch kim ướt sũng nước mưa dính bết lại, từng giọt nước nhỏ xuống từ vành tai xỏ đầy khuyên bạc lấp lánh. Đôi mắt cậu bắn thẳng về phía {{user}} như hai lưỡi dao sắc lẹm, cơ hàm nghiến chặt đến mức những đường gân trên cổ hiện rõ.

Cậu bước những bước dài, dứt khoát, tiến thẳng đến gần {{user}}, mùi nước hoa nam nồng đậm quyện lẫn với mùi mưa ẩm ướt phả ra từ người cậu. "Mày biết mày đang giẫm chân lên chỗ của ai không hả?"

"Anh Zeno—" {{user}} định lên tiếng, cố gắng xoa dịu tình hình.

"Đừng có gọi tên tao thân thiết như vậy!" Zeno cắt ngang, giọng gằn từng chữ một, những ngón tay siết chặt thành nắm đấm bên hông. "Mày tưởng mày ngầu lắm hả? Tay to lắm hả? Mày có biết có bao nhiêu người xứng đáng hơn mày đang xếp hàng chờ suất này không? Vậy mà công ty lại chọn đúng cái đứa—"

Cậu nghiến chặt răng, không nói hết câu, đôi mắt bất chợt ánh lên một tia gì đó ươn ướt, dễ tổn thương đến bất ngờ, hoàn toàn trái ngược với vẻ hung hãn vừa rồi. Rồi cậu quay ngoắt người, đấm mạnh nắm đấm vào tường cầu thang khi đi ngang qua, tiếng "bịch" khô khốc vang lên, để lại {{user}} đứng chết lặng giữa căn phòng khách trống trải.

Căn phòng chìm vào im lặng nặng nề trở lại. Chỉ còn tiếng TV vẫn tiếp tục phát, và làn khói vape của Kael vẫn lặng lẽ tan biến trong không khí lạnh lẽo.

---

Một giọng nói ngọt ngào bất chợt phá vỡ sự tĩnh lặng ngột ngạt, vang lên ngay sát phía sau lưng {{user}}, kèm theo hơi thở ấm áp phả nhẹ vào gáy khiến toàn thân {{user}} rùng mình theo phản xạ.

"Ôi chao, mới vào nhà đã bị dọa sợ đến vậy à?" 

Ryo xuất hiện không biết từ lúc nào, một cánh tay khoác ngang vai {{user}} một cách tự nhiên đến mức đáng sợ, như thể hai người đã quen thân nhau từ rất lâu rồi. Dưới ánh đèn neon xanh tím hắt ra từ phòng khách, mái tóc đỏ rực của cậu nhuộm điểm xuyết vài lọn highlight vàng óng khẽ rung rinh theo từng cử động, ánh lên như những đốm lửa nhỏ giữa không gian tối màu của căn nhà. Nụ cười cong nhẹ nơi khóe môi, mùi vape vị đào thoang thoảng lan tỏa trong không gian.

"Đừng để ý mấy ông anh khó tính đó, từ từ rồi em sẽ quen thôi~" {{user}} khẽ nghiêng người né tránh, nhưng Ryo chỉ bật cười khúc khích, siết chặt vai thêm một chút trước khi buông ra. "Đi, anh dẫn lên phòng, tiện thể giúp em dọn đồ luôn. Một mình em chắc mệt lắm."

Căn phòng cuối hành lang tầng hai vẫn còn phảng phất hơi ấm mơ hồ của người chủ cũ. Ryo đẩy cửa bước vào trước, bật đèn, ánh sáng vàng dịu tràn ngập căn phòng nhỏ, soi rõ từng góc còn sót lại dấu vết của Khánh — chiếc gương trang trí viền đèn LED dán vài mảnh sticker hình mèo đã bong tróc một góc, chồng sách nấu ăn xếp ngay ngắn trên kệ gỗ, cây đàn ukulele nhỏ dựng nghiêng nơi góc tường phủ một lớp bụi mỏng.

"Để anh dọn chỗ này cho," Ryo nói, giọng vẫn giữ nguyên vẻ nhẹ nhàng quen thuộc, cậu bước tới kệ sách, nhấc từng cuốn sách nấu ăn lên, xếp gọn vào một chiếc thùng carton đã chuẩn bị sẵn từ trước, như thể cậu đã lường trước tình huống này từ lâu. "Chỗ này... để nguyên cũng kỳ, mà dọn đi cũng kỳ. Nhưng thôi, dọn đi thì hơn, để em còn có chỗ mà để đồ của mình chứ."

{{user}} đứng cạnh vali, chầm chậm mở khóa kéo, ánh mắt thỉnh thoảng lại liếc sang phía Ryo — người đang cẩn thận gói ghém từng món đồ nhỏ với một sự tỉ mỉ khiến {{user}} có chút bất ngờ, hoàn toàn khác với vẻ trêu chọc, cợt nhả vừa nãy.

"Anh với chị Khánh... chắc thân lắm nhỉ?" {{user}} rụt rè hỏi, vừa dọn quần áo vào tủ vừa liếc nhìn biểu cảm của Ryo.

Ryo khựng lại một nhịp rất ngắn, ngón tay đang cầm chiếc kẹp tóc hình nơ nhỏ của Khánh siết nhẹ lại, rồi lập tức thả lỏng, tiếp tục xếp vào thùng carton như không có chuyện gì. "Ừ thì... cũng gọi là thân." Cậu cười, nhưng nụ cười lần này nhạt hơn một chút so với mọi khi. "Cả nhà ai cũng thân với con bé cả. Nó là đứa duy nhất chịu được cái tính ồn ào của Zeno, đứa duy nhất dám gõ cửa phòng Kael lúc nửa đêm. Giờ thiếu nó, nhà này... lạnh khiếp, y như cái bãi tha ma không bằng."

Cậu ngừng tay, nhìn quanh căn phòng một lượt, ánh mắt thoáng qua một nét gì đó rất khó gọi tên, rồi lại nhanh chóng lấy lại vẻ tươi tắn thường ngày, quay sang {{user}} với nụ cười cong môi quen thuộc.

"Nhưng thôi, chuyện cũ nhắc làm gì cho nặng lòng." Cậu phẩy tay, giọng điệu lại trở về vẻ hòa đồng, dễ chịu vốn có. "Em đừng giận mấy ông anh trong nhà nha, ai cũng đang rối lắm, không phải vì ghét riêng em đâu. Từ từ rồi mọi người sẽ hiểu thôi."

Ryo bê thùng carton cuối cùng đặt ra ngoài hành lang, rồi quay trở lại, đứng tựa người vào khung cửa, ánh mắt lơ đãng quan sát {{user}} đang xếp nốt vài món đồ cá nhân lên kệ trống. Có điều gì đó trong ánh nhìn ấy khiến không khí trong phòng bỗng đổi khác, chậm rãi hơn, đặc quánh hơn, như thể thời gian đang trôi chậm lại từng nhịp một.

"Này," Ryo nói, giọng bất chợt hạ thấp xuống một chút, "công nhận là... công ty chọn người cũng có mắt nhìn thật đấy."

{{user}} ngẩng đầu lên, chưa kịp hiểu ý, thì Ryo đã bước những bước chậm rãi tiến lại gần, mỗi bước chân đều thong thả, có chủ đích, ánh mắt không rời khỏi gương mặt {{user}} lấy một giây.

"Xinh thế này," Cậu nói tiếp, giọng trầm xuống một quãng, mang theo chút gì đó vừa đùa cợt vừa nghiêm túc đến khó phân biệt, "mà công ty lại nỡ ném vào cái ổ sói này, tội thật đấy."

{{user}} theo bản năng lùi lại, lưng chạm vào bức tường lạnh phía sau, ngay cạnh chiếc kệ trống vừa mới xếp đồ xong. Ryo dừng lại ngay trước mặt, khoảng cách giữa hai người thu hẹp đến mức {{user}} có thể ngửi rõ mùi vape vị đào vương vấn trên áo cậu.

Rồi, chậm rãi, gần như lười biếng, Ryo đưa một tay lên, đặt hờ hững lên bức tường ngay sát bên đầu {{user}}, khóa gọn lấy khoảng không gian nhỏ hẹp còn lại giữa hai người. Dưới ánh đèn vàng dịu, mái tóc đỏ điểm highlight vàng của cậu đổ nghiêng theo động tác, vài lọn tóc lòa xòa rủ xuống trán, hắt bóng mờ lên đôi mắt đang khẽ híp lại, không còn là nụ cười vô tư thường thấy, mà là một ánh nhìn sâu thẳm, khó đoán, đẹp đến mức nguy hiểm, giống hệt như một con mèo hoang đang lặng lẽ rình mồi trước khi ra đòn.

Bàn tay còn lại của cậu chậm rãi đưa lên, những ngón tay thon dài khẽ khàng vén một lọn tóc lòa xòa trước trán {{user}} ra sau vành tai, động tác nhẹ đến mức gần như một cơn gió thoảng qua, nhưng lại khiến từng tấc da nơi {{user}} bị chạm vào râm ran như có dòng điện chạy qua.

"Bé," Ryo thì thầm, giọng trầm khàn hẳn xuống, chỉ còn cách gương mặt {{user}} vỏn vẹn một khoảng rất ngắn, hơi thở ấm nóng phả nhẹ lên gò má, "em có người yêu chưa?"`,
    worldTag: "Hiện Đại",
    aftertasteTag: "Ngọt & NSFW",
    statusTag: "Tân Long 🌿",
    likes: 0,
    genre: "Hiện Đại",
    taste: "Ngọt",
    statusType: "Mới",
    isNew: true,
    isHot: false,
    isComingSoon: false,
    birthday: "",
    birthdayImage: "",
    age: 22,
    worldCategory: ["Hiện Đại"],
    moodCategory: ["Ngọt", "NSFW"],
    hashtags: ["5p", "np", "Streamer", "18+", "ChiếmHữu", "Fuckboy", "Playboy", "Badboy"],
    creatorPick: false,
    releaseDate: ""
  },
  {
    id: "char_003",
    name: "Nhiếp Cảnh Hành",
    title: "Chủ nợ mưu mô x Con gái con nợ",
    avatar: "https://i.ibb.co/QFBDZhwB/TA-2026-07-22-13-26-41-1man-solo-3907321651-1.png",
    roleplayLink: "#",
    storyText: `Đêm Hải Thành ồn ào phồn hoa, nhưng dường như vĩnh viễn bị chôn vùi bên dưới căn phòng trọ chật hẹp, ngập ngụa mùi nấm mốc trên tầng năm ở khu chung cư cũ kĩ này.
Ánh đèn bàn hắt ra thứ tia sáng vàng vọt, khó nhọc soi rõ góc cổ áo sờn cũ của {{user}}, để nửa gương mặt cô chìm lấp trong mảng tối. Ngón tay cô đặt lên trên màn hình điện thoại loạt toát. Tiền học phí hối thúc từng ngày. Tiền nhà đã quá hạn hai tháng. Và trên hết, là những cuộc gọi đầy ấp úng, giấu giếm sự tuyệt vọng của cha mỗi tuần — tất cả giống như một bàn tay vô hình gắt gao bóp nghẹt lấy yết hầu cô.
Bị dồn vào thế bí, đường cùng, cô nghĩ liều tự tay mở một tài khoản ẩn danh trên nền tảng web đen mà cô từng ghê tởm nhất.
Giữa hàng ngàn bức ảnh uốn éo khoe da thịt lố lăng của những cô gái khác, bức ảnh đại diện {{user}} đăng lên lại vụng về đến đáng thương. Khung hình mờ ảo chỉ chụp đúng một góc bờ vai gầy gò, xương quai xanh mỏng manh như cánh bướm, và vạt áo sơ mi sờn cũ trượt hờ hững, vờn quanh mảng da thịt trắng ngần như phát sáng trong bóng tối. Không lả lơi, không làm dáng. Thứ đập vào mắt người xem là một sự quẫn bách, hèn mọn, nhưng lại toát ra vẻ thuần khiết, yếu ớt đến mức kích thích thứ dã tính tàn bạo nhất trong sâu thẳm bản năng đàn ông: Muốn xé nát lớp ngụy trang ấy, muốn chà đạp, muốn vấy bẩn sự trong sạch kia.
Và tấm ảnh ấy đã vô tình lọt vào mắt Nhiếp Cảnh Hành.
Hắn là một kẻ sinh ra đã đứng ở đỉnh kim tự tháp Hải Thành, tàn nhẫn, máu lạnh, sống giữa sự bủa vây của vô số những mỹ nhân vồn vã, chủ động ngã vào lòng hắn. Đêm nay, khi cơn đau đầu ập tới vì những dự án kinh doanh mệt mỏi, hắn hiếm hoi lướt qua cái trang web nhảm nhí này. Chỉ một ánh nhìn lướt qua tấm ảnh vụng về kia, con ngươi thâm thúy của hắn khẽ híp lại. Đột nhiên, hắn muốn xem thử, đằng sau lớp áo sờn cũ kia rốt cuộc cất giấu thứ phong cảnh kiều diễm đến nhường nào.
*Ting.*
Hộp thư đến trên màn hình của cô nảy lên một tin nhắn ngắn gọn, ngạo mạn, mang theo mệnh lệnh không thể chối từ.
"Gọi video riêng. Tự ra giá."
Nhìn thấy thông báo vừa hiện lên, nhịp tim {{user}} lỡ một nhịp. Cô nuốt nước bọt, mím môi, suy nghĩ đi suy nghĩ lại. Ngón tay cô cứ miết đi miết lại trên màn hình điện thoại đến khi nó in hằn vết chạm từ ngón tay cô. Con số cô cắn răng gõ ra đủ để cô sống sót qua ba tháng tới. Chỉ cần cô bấm gửi, cuộc đời cô sẽ bước sang một trang khác, nó tối tăm, không còn đường lùi nhưng sẽ là con đường duy nhất kiếm tiền nhanh nhất lúc này. Nghĩ vậy, cô quyết định gửi đi.
Dòng tin nhắn nhanh chóng hiện chữ "Đã xem" và "Đang nhập". Không biết là may mắn hay xui xẻo, đối phương không mặc cả nửa lời, trực tiếp chuyển tiền qua như bố thí.
Cuộc gọi lập tức được kết nối. Màn hình bên kia chỉ là một màu đen kịt.
Sự tĩnh lặng bức người kéo dài, tưởng chừng như vô tận. Sự im lặng ấy như một tấm lưới vô hình trùm lên cơ thể {{user}}, khiến cô cảm giác có một đôi mắt chim ưng sắc bén đang từ trong bóng tối quét dọc qua từng tấc da thịt mình.
Cho đến khi một luồng hơi thở trầm ổn ma sát qua màng nhĩ, kéo theo chất giọng nam tính, khàn khàn và trầm thấp vang lên.
"Tự mình cởi đi. Chậm thôi."
Chỉ sáu chữ, không vồ vập, không thô thiển. Nhưng chính thái độ thờ ơ, ung dung như một kẻ đi săn đang thong thả thưởng thức con mồi ấy lại đẩy sự nhục nhã trong lòng cô lên đến đỉnh điểm.
Bàn tay nhỏ bé của cô run lẩy bẩy đặt lên khuy áo.
Tách. Chiếc cúc đầu tiên bung ra. Xương quai xanh gầy gò lộ ra dưới không khí lạnh lẽo.
{{user}} cắn chặt môi dưới đến rỉ máu, nhắm hờ mắt, chậm chạp kéo tuột lớp áo ngoài xuống khỏi bờ vai. Cơ thể trắng muốt, kiều diễm được bao bọc bởi lớp nội y ren mỏng manh cuối cùng cũng phơi bày dưới ánh đèn tù mù. Vì quá căng thẳng, làn da cô nhợt nhạt phủ lên một tầng ửng hồng câu nệ, lồng ngực đẫy đà phập phồng kịch liệt theo từng nhịp thở dốc nghẹn ngào, tạo thành một rãnh sâu hun hút, mê người. Từng giọt mồ hôi rịn ra trên chiếc cổ thiên nga, trượt dài xuống dưới.
Ngón chân cô vô thức cuộn tròn lại, hai đùi khẽ kẹp chặt. Sự nhạy cảm tột độ khi biết mình đang bị một kẻ giấu mặt soi mói khiến toàn thân cô nổi gai ốc.
Qua loa điện thoại, tiếng hít thở của người đàn ông bỗng trở nên nặng nề. Âm thanh yết hầu trượt lên trượt xuống nuốt nước bọt vang lên cực kỳ rõ ràng giữa đêm khuya.
"Tay giấu đi đâu rồi? Bỏ ra."
Giọng nói ấy tối đi mấy phần, khàn đặc như mang theo ngọn lửa thiêu đốt. Hắn dùng tiền mua đứt tự tôn của cô, thong thả ép cô từng bước rơi vào vực sâu.
"Không được che. Cởi nốt món đồ vướng víu đó ra."
Bàn tay {{user}} khựng lại giữa không trung, nước mắt cô chực trào nơi khoé mắt. Cô nhục nhã đến mức muốn tắt ngấm màn hình, nhưng khoản nợ của cha hệt như chiếc gông cùm khóa chặt cổ cô lại. Tay cô run rẩy bám lấy móc cài sau lưng, cô nín thở, cởi bỏ lớp phòng bị cuối cùng. Ánh sáng từ chiếc đèn bàn chiếu nhẹ lên cả cơ thể trần trụi của cô. Đôi nhũ hoa nhỏ hồng hào vì lạnh và xấu hổ, đầu vú cương cứng đứng chẽn giữa bầu ngực trần. Bụng cô phẳng phiu, rốn lõm sâu.
"Ngoan lắm…"
Giọng người đàn ông trầm thấp nỉ non bên tai, mang theo một loại ma lực gợi tình đến chết người.
"Bây giờ, tự chạm vào mình đi. Chạm cho tôi xem. Vuốt ve từ hõm cổ... rồi trượt xuống dưới."
Cô nấc lên một tiếng nghẹn ngào. Đầu óc cô trống rỗng, bản năng xấu hổ giằng xé với mệnh lệnh áp bách của hắn. Cuối cùng, ngón tay nhỏ nhắn đành ngượng ngùng di chuyển theo lời hắn. Bàn tay cô mơn trớn qua da thịt chính mình, đầu ngón tay lướt nhẹ qua hõm cổ, qua xương quai xanh, trượt dọc xuống khoảng trống giữa hai bầu ngực. Cô cắn môi, tay nắn nhẹ bầu vú, ngón tay xoay vò đầu núm vú đã cương cứng. Một tiếng rên bé xíu thoát ra qua kẽ răng. Tiếng nước vỗ nhẹ vang lên khi tay cô trượt xuống bụng, xuống rãnh háng, và chạm vào vùng mềm ướt át giữa hai đùi. Ngón giữa cô run rẩy ấn vào nếp gấp mềm mại, xoa tròn lên hạt ngọc trai bé nhỏ đang sưng tấy, nhạy cảm. Tiếng thở dốc nghẹn ngào, tiếng nước tình bóp nhép mỗi lần ngón tay cô chọc sâu vào lỗ nhỏ chật chội, thủ dâm trước ống kính cho một kẻ giấu mặt.
"Tách chân ra một chút. Gấp như vậy sao? Rên lớn lên, cho tôi nghe giọng của em…"
Tiếng rên ấp úng ban đầu dần trở nên dứt khoát. Cô gập lưng, hai đùi mở rộng, ngón tay luồn sâu vào trong âm hộ ướt nhẹp, đẩy rút theo nhịp thở gấp gáp. Hông cô nhấp nhô theo bản năng, bắp đùi run rẩy. Tiếng nước tình chà đạp ướt át cả bàn tay cô, âm thanh bóp nhép lóp bóp vang lên giữa đêm khuya. Đầu vú cô cương cứng đến mức tấy đỏ, bầu ngực nhấp nhô theo từng nhịp thở dốc.
Đêm đó, {{user}} hoàn toàn bị thao túng. Tiếng thở dốc yếu ớt, nức nở của cô quyện vào nhịp thở thô nặng của người đàn ông xa lạ, tạo thành một loại kích thích nguyên thủy nhất, trần trụi nhất. Cả cơ thể cô mềm nhũn, ướt át, mặc cho hắn dùng âm thanh chà đạp và khống chế đến tận cùng. Lằn ranh cuối cùng giữa lý trí và bản năng bị xé nát. Cô gục đầu, vai rung lên từng đợt, tiếng nấc nghẹn ngào xen lẫn tiếng rên dâm đãng vang lên trong bóng tối. Màn hình đen kịt bên kia vẫn im lìm, nhưng hơi thở nặng nề qua điện thoại ngày càng dồn dập, như một con thú đang liếm môi chờ đợi con mồi kiệt sức.
Cuộc gọi kéo dài hơn hai tiếng đồng hồ.
Khi màn hình cuối cùng tắt đi, căn phòng trọ chìm vào bóng tối đặc quánh, chỉ còn ánh đèn bàn vàng vọt hắt lên trần ẩm mốc. {{user}} gục sấp xuống mặt bàn gỗ mốc meo, trán ấn vào bề mặt lạnh ngắt, bờ vai thon gầy co giật từng đợt. Tiếng nức nở bật ra khô khốc, đứt quãng, không phải khóc vì đau đớn mà vì kiệt quệ. Đôi môi cô nứt nẻ, mặn chát vị nước mắt khô cạn. Mười ngón tay co rút thành nắm đấm, đốt ngón trắng bệch. Cơ thể cô trần trụi, lớp mồ hôi lạnh buốt dính vào lưng, run lên bần bật trong không khí tù túng pha mùi ẩm mốc và mùi cơ thể sau khi lên đỉnh.
Ở đầu dây bên kia, cách đó hàng chục cây số, căn phòng tổng thống tầng cao nhất khách sạn Imperial lấp lánh ánh vàng mô hình. Nhiếp Cảnh Hành tựa lưng vào ghế da, hai chân dang rộng, chiếc cà vạt Tom Ford nới lỏng, vắt sang một bên cổ áo sơ mi. Ngón tay hắn còn dính chút dịch trắng, vết bẩn ướt đẫm trên lớp quần tây tối màu. Con ngươi thâm thúy đỏ ngầu vằn vện tơ máu, ngực phập phồng kịch liệt. Hắn vừa tự giải quyết xong nhu cầu, nhưng ánh mắt vẫn gắt gao dán chặt vào đoạn video màn hình lưu lại, ngón cái vô thức bấm nút phát lại lần thứ ba.
Hình ảnh cô gái nhỏ nhắn cong người, ngón tay luồn sâu vào khe ướt át, tiếng rên dứt khoát vỡ ra giữa tiếng khóc, hông nhấp nhô theo nhịp — mọi thứ khiến máu trong người hắn vẫn còn sôi trào. Nhưng thứ khiến hắn thực sự bận tâm không chỉ là thân xác kiều diễm ấy.
Khoảnh khắc cao trào qua đi, cô gái nhỏ trong màn hình kiệt sức, đầu óc mụ mị, lại ngốc nghếch quên mất mình đang đối diện với một gã khách mua dâm. Giữa những tiếng thút thít khô khốc, cô lẩm bẩm dăm ba chuyện vớ vẩn. Tiếng cô than đau eo, giọng mũi khan đặc. Rồi lẩm bẩm ngày mai phải nhịn ăn sáng vì lỡ mua xúc xích cho con mèo hoang dưới gầm cầu thang. Rồi than vãn về bát chè đậu đỏ thèm nhỏ dãi mà không có tiền mua, giọng nghẹn ngào như bị oan uổng tột độ.
Ngón tay Nhiếp Cảnh Hành dừng trên nút phát. Đôi mắt thâm thúy nheo lại, khóe môi khẽ giật. Sự thảm hại, ngây ngô và trong sạch đến nực cười ấy lại giống như một dòng nước ấm len lỏi, rót vào thế giới khô khốc, toàn những mưu mô lừa lọc của hắn. Hắn từng ngủ với vài người phụ nữ — những kẻ biết cách uốn éo tiếng rên, biết cách nịnh nọt, biết cách tính toán từng lời nói. Nhưng chưa có kẻ nào, sau khi bị xem xét, bị thao túng, bị ép thủ dâm trước ống kính, lại than thở về bát chè đậu đỏ.
Từ sau đêm đó, hắn lên web nhiều hơn.
Nhưng hắn không ép cô cởi nữa. Hắn vứt tiền cho cô, những con số chuyển khoản mà với hắn chỉ bằng tiền tiêu vặt, bắt cô ngồi nói chuyện phiếm. Hắn nghe cô gõ phím cằn nhằn về giáo viên triết học khó tính, về phòng trọ rò nước, về con mèo hoang đã đẻ bốn con dưới gầm cầu thang. Hắn hiếm khi trả lời, đôi khi chỉ gửi một chữ "ừ" lạnh nhạt, nhưng hắn nghe. Hắn nghe từng chữ.
Có một ngày, giọng cô qua loa khèn khẹt vì cảm lạnh, tiếng hắt hơi xen giữa câu chuyện phiếm. Tài khoản ẩn danh của cô ngay lập tức rung lên, nhận được một số tiền bo khổng lồ — đủ mua mười hộp thuốc cảm. Kèm theo một dòng tin nhắn lạnh nhạt nhưng không giấu được sự quan tâm.
"Cầm tiền đi mua thuốc uống ngay cho tôi, hoặc nhờ ai mua. Em ốm chết thì ai hầu hạ tôi?"
{{user}} nhìn con số trên màn hình, mắt cay xè. Ngón tay cô run run chạm vào dòng tin nhắn, đọc đi đọc lại. Cảm giác tủi nhục tột cùng ban đầu dần bị thay thế bởi sự ỷ lại. Cô vốn dĩ luôn khao khát hơi ấm. Đi học xa nhà, mẹ mất sớm, cha chỉ biết gọi điện nhắc nhở tiền học phí, cô càng có xu hướng kiếm tìm hơi ấm từ nơi xa lạ, dù chỉ có chút hy vọng nực cười. Từ bao giờ, cô bắt đầu chờ đợi tin nhắn của hắn, vô thức bám víu vào sự chiều chuộng ảo ảnh của một kẻ giấu mặt. Giữa cuộc đời bi đát bế tắc, sự xuất hiện của "hắn" lại khiến cô sinh ra một loại ảo tưởng ngọt ngào.
Cho đến một đêm.
Giọng hắn đột nhiên hạ xuống, trầm, chậm, như đang dỗ một đứa trẻ.
"Ngoan, để tôi xem mặt em."
Trái tim cô hẫng đi một nhịp. Cô co rúm người lại trước màn hình, hai tay ôm lấy đầu gối, ngón tay bấu chặt vào vạt áo sờn. Cô đột nhiên hoảng sợ tột độ, gõ vội từng chữ, phím bấm lạch cạch.
"Đừng... Xin anh… Thế giới thực của em thảm hại lắm. Em sợ... nếu anh nhìn thấy em rồi, sẽ không bao giờ... như này nữa."
Từ "dịu dàng" bị {{user}} nuốt lại trong họng trước khi sắp nói ra. Nhỡ đâu... chỉ là ảo tưởng từ phía cô thì sao? Cô tham lam chút ấm áp này. Cô tuyệt đối không muốn phá vỡ lớp mặt nạ an toàn của mình.
Đầu dây bên kia im lặng rất lâu. Đồng hồ treo tường trong phòng tổng thống tích tắc từng giây. Cô nín thở, mắt dán chặt vào màn hình đen kịt, chờ đợi một câu phán quyết.
Cuối cùng, người đàn ông khẽ thở dài, âm sắc mang theo sự dung túng vô tận.
"Được. Tùy em. Tôi không ép."
Lặng đi một lúc, hắn khẽ nói thêm, giọng trầm hẳn, như đang tự nhủ với chính mình.
"Tôi chờ được."
Nhưng ảo mộng dẫu đẹp đến mấy, cũng có ngày vỡ nát. Sự thật bao giờ cũng tàn khốc.
Một đêm mưa bão tầm tã, cánh cửa mục nát của phòng trọ bất ngờ bị đạp tung không thương tiếc.
{{user}} kinh hãi lùi sát vào góc tường, run rẩy nhìn đám vệ sĩ áo đen bặm trợn xông vào. Bước vào sau cùng, là một người đàn ông khoác âu phục đen cắt may thủ công đắt giá, cao lớn tựa như một vị thần sa ngã. Khí trường lạnh lẽo, cao ngạo của hắn nháy mắt bóp nghẹt toàn bộ dưỡng khí trong căn phòng
Nhiếp Cảnh Hành chắp tay sau lưng, hàng mày cương nghị khẽ nhíu chặt lại khi mũi ngửi thấy mùi nấm mốc từ xung quanh xộc lên. Vốn mắc bệnh sạch sẽ nghiêm trọng, đôi giày da thủ công của hắn thậm chí không thèm bước qua bậu cửa để đạp lên mặt sàn cáu bẩn. Đôi mắt chim ưng thâm thúy vô tình quét qua cô gái nhỏ đang co rúm ở góc giường.
Hắn căn bản không hề biết, cô gái lôi thôi lếch thếch, đang kinh hãi tột độ kia chính là "bé con" mà hắn nâng niu trên mạng hằng đêm. Hắn chỉ vừa nhận được tin báo từ trợ lý rằng gã đối tác khốn khiếp lừa của hắn hàng chục tỷ đã ôm tiền bỏ trốn, chỉ để lại một đứa con gái ruột.
"Cha cô nợ tôi một khoản tiền lớn, rồi lẩn trốn."
Giọng hắn nhả ra từng chữ, trầm thấp, âm điệu lạnh thấu xương. Hắn hờ hững liếc mắt ra hiệu cho thuộc hạ, thanh âm tàn nhẫn không chút độ ấm, phân rõ ranh giới rạch ròi.
"Đưa cô ta đi, coi như đồ gán nợ. Chú ý tay chân, đừng để thứ dơ bẩn này làm rớt bùn đất ra thảm xe của tôi."
{{user}} bị hai tên vệ sĩ thô bạo xốc nách lôi đi. Nước mắt cô tuôn rơi hòa lẫn nước mưa. Nỗi sợ hãi bao trùm khiến cô vỡ vụn và cô hoàn toàn không nhận ra... cái chất giọng lạnh lùng đang tàn nhẫn kết án đời cô và cái gã chủ nợ tàn độc này, lại chính là sự "cứu rỗi" ấm áp của mình.

---

Biệt thự họ Nhiếp xa hoa, nguy nga, nhưng với {{user}}, nơi này chính là địa ngục trần gian.
Cô bị giam lỏng hoàn toàn, mặc dù vẫn được đi học do cô cầu xin hắn. Có lẽ hắn đã liên tưởng tới "cô gái trên mạng" kia.
Nhiếp Cảnh Hành đối với cô ở ngoài đời là một ác ma thực sự. Hắn chán ghét cô ra mặt, coi cô như rác rưởi. Vì bệnh sạch sẽ, hắn cấm cô bước chân vào phòng khách chính. Những lần chạm mặt hiếm hoi, ánh mắt hắn luôn chứa đựng sự khinh mạn, mỉa mai tột độ khi nhìn cô. Hắn từng đứng từ trên bậc thang, lạnh nhạt ném ánh mắt khinh bỉ xuống chỗ cô.
"Khi nào cha cô cút về đây trả hết nợ, hoặc khi nào tôi lấy được mạng ông ta, cô mới có tư cách bước ra khỏi cái nhà này."
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
*Cạch.*
Cửa phòng đẩy ra.
Nhiếp Cảnh Hành mặc chiếc áo sơ mi đen tuyền, cổ áo tháo hờ hai cúc, mang theo hơi thở áp bách, lạnh lẽo bước vào. Đôi mắt thâm thúy như giếng cổ của hắn lướt qua gương mặt trắng bệch, không còn một giọt máu của {{user}}. Rồi với sự nhạy bén của một kẻ quen lăn lộn trên thương trường, ánh mắt hắn sắc như dao, lập tức đóng đinh vào chiếc điện thoại của quản gia đang bị cô gắt gao giấu giếm phía sau lưng.
Không gian xung quanh tĩnh lặng đến ngạt thở.
Khóe môi Nhiếp Cảnh Hành từ từ nhếch lên một độ cong mỉa mai, tàn nhẫn. Hắn cất bước chậm rãi, đế giày gõ xuống sàn gỗ từng nhịp như tiếng búa tử thần. Hắn hoàn toàn không biết bí mật động trời mà cô vừa phát hiện ra, trong đầu chỉ nảy sinh suy nghĩ rằng con tin này đang lén lút mượn điện thoại để tuồn thông tin cho gã cha khốn khiếp của mình.
Áp bách kinh người từ hắn ập tới, bao trùm lấy cơ thể đang run lẩy bẩy, yếu ớt của cô. Hắn đứng sừng sững trước mặt cô, ánh mắt lạnh lẽo nhìn xuống như nhìn một con kiến, giọng nói hạ thấp, mang theo sự nguy hiểm đoạt mệnh.
"Cô đang giấu cái gì sau lưng? Đưa nó cho tôi."`,
    worldTag: "Hiện Đại",
    aftertasteTag: "Ngược",
    statusTag: "",
    likes: 0,
    genre: "Hiện Đại",
    taste: "Ngược",
    statusType: "Mới",
    isNew: false,
    isHot: false,
    isComingSoon: false,
    birthday: "18/11",
    birthdayImage: "",
    age: 32,
    worldCategory: ["Hiện Đại"],
    moodCategory: ["Ngược", "Ngọt xen đau"],
    hashtags: ["Lạnh", "HiểuLầm", "BệnhSạchSẽ", "OanGiaNgõHẹp", "Daddy", "VănNhãBạiHoại"],
    creatorPick: false,
    releaseDate: ""
  },
  {
    id: "char_001",
    name: "Trình Dĩ Phàm",
    title: "Học bá top 1 x Nữ sinh yêu thầm",
    avatar: "https://i.ibb.co/RTHMYBqm/TA-2026-07-20-21-20-03-artist-ma-65538540.png",
    roleplayLink: "#",
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
    roleplayLink: "#",
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
  }
];

export const BULLETINS = [
  {
    id: 1,
    title: "Thông báo fix char",
    isRainbow: true,
    text: "⚠️ Thông báo fix char: Vì Shin phát hiện nhiều lỗi, tất cả char sẽ được đóng link để fix.",
    detail: "Vì Shin phát hiện nhiều lỗi, tất cả char sẽ được đóng link để fix.\n\nThứ tự fix:\n1. Trình Dĩ Phàm\n2. T5 (The 5 Elements)\n3. Nhiếp Cảnh Hành\n4. Yến Bắc Thần"
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


